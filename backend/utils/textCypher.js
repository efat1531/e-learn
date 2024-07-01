import { randomBytes, createCipheriv, createDecipheriv } from "crypto";

function encrypt(text) {
  // Secret key for encryption
  const secretKey = process.env.CRYPTO_SECRET_KEY;

  // Generate IV
  const iv = randomBytes(16);

  // Algorithm for encryption
  const algorithm = process.env.CRYPTO_SECRET_ALGORITHM;

  const cipher = createCipheriv(algorithm, Buffer.from(secretKey, "hex"), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${encrypted}-${iv.toString("hex")}`;
}

// Decrypt the email
const decryptEmail = (hashedEmail) => {
  const iv = hashedEmail.split("-")[1];
  const encryptedEmail = hashedEmail.split("-")[0];
  const email = decrypt(encryptedEmail, iv);
  return email;
};

// Function to decrypt text
function decrypt(encryptedData, iv) {
  // Secret key and algorithm from environment variables
  const secretKey = process.env.CRYPTO_SECRET_KEY;
  const algorithm = process.env.CRYPTO_SECRET_ALGORITHM;

  // Convert hex to Buffer for iv and encryptedData
  const ivBuffer = Buffer.from(iv, "hex");
  const encryptedText = Buffer.from(encryptedData, "hex");

  // Create decipher
  const decipher = createDecipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    ivBuffer
  );

  // Decrypt the data
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

// Export the functions
export { encrypt, decrypt, decryptEmail };
