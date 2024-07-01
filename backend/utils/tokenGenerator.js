import crypto from "crypto";
import tokenModel from "../models/tokenModel.js";

const otpGenerator = (length) => {
  const randomBuffer = crypto.randomBytes(4);
  const randomNumber = randomBuffer.readUInt32BE(0);
  const dateTimeNow = new Date().toISOString();
  const hash = crypto
    .createHash("sha256")
    .update(`${randomNumber}${dateTimeNow}`)
    .digest("hex");
  const otpPortion = hash.substring(0, length);
  const otp = (parseInt(otpPortion, 16) % 900000) + 100000;
  return otp.toString().substring(0, 6);
};

const generateOTPToken = async (user, useCase) => {
  const len = useCase === "verify" ? 6 : 16;
  const otp = otpGenerator(len);
  const token = await tokenModel.create({
    token: otp,
    email: user.email,
    validTo: new Date(Date.now() + 10 * 60 * 1000),
    TokenType: useCase,
  });
  return otp;
};

export { generateOTPToken };
