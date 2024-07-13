import express from "express";
import multer from "multer";
import path from "path";
import sharp from "sharp";

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

    // Define the output path
    const outputPath = `frontend/uploads/users/${
      req.file.fieldname
    }-${Date.now()}${path.extname(req.file.originalname)}`;

    try {
      // Use sharp to resize the image
      await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("png")
        .png({ quality: 90 })
        .toFile(outputPath);
      const resizedOutputPath = outputPath.replace("frontend/", "");
      res.status(200).send({
        message: "Image uploaded and resized successfully",
        image: `/${resizedOutputPath}`,
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
