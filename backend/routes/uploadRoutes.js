import express from "express";
import multer from "multer";
import path from "path";
import sharp from "sharp";
import fs from "fs";
import { encode } from "blurhash";

const router = express.Router();
// Use memoryStorage to store the file in memory
const storage = multer.memoryStorage();

// File filter remains the same
function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/user", (req, res) => {
  uploadSingleImage(req, res, async function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    // Define the output paths
    const timestamp = Date.now();
    const ext = path.extname(req.file.originalname);
    const baseOutputPath = `frontend/uploads/users/${req.file.fieldname}-${timestamp}`;
    const avatarOutputPath = `${baseOutputPath}-avatar${ext}`;
    const profileOutputPath = `${baseOutputPath}-profile${ext}`;
    const blurhashOutputPath = `${baseOutputPath}-blurhash${ext}`;

    try {
      // Use sharp to resize the image for avatar
      await sharp(req.file.buffer)
        .resize(50, 50)
        .toFormat("png")
        .png({ quality: 90 })
        .toFile(avatarOutputPath);

      // Use sharp to resize the image for profile picture
      await sharp(req.file.buffer)
        .resize(150, 150)
        .toFormat("png")
        .png({ quality: 90 })
        .toFile(profileOutputPath);

      // Generate blurhash
      const image = await sharp(req.file.buffer)
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true });
      const blurhash = encode(
        new Uint8ClampedArray(image.data),
        image.info.width,
        image.info.height,
        4,
        4
      );
      const avatarResizedOutputPath = avatarOutputPath.replace("frontend/", "");
      const profileResizedOutputPath = profileOutputPath.replace(
        "frontend/",
        ""
      );

      res.status(200).send({
        message: "Images uploaded and resized successfully",
        avatar: `/${avatarResizedOutputPath}`,
        profile: `/${profileResizedOutputPath}`,
        blurhash: blurhash,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
});

router.post("/course", (req, res) => {
  uploadSingleImage(req, res, async function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    // Define the output path
    const outputPath = `uploads/courses/${
      req.file.fieldname
    }-${Date.now()}${path.extname(req.file.originalname)}`;

    try {
      // Use sharp to resize the image
      await sharp(req.file.buffer)
        .resize(704, 528)
        .toFormat("png")
        .png({ quality: 90 })
        .toFile(outputPath);

      res.status(200).send({
        message: "Image uploaded and resized successfully",
        image: `/${outputPath}`,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
});

export default router;
