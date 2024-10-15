import nodemailer from "nodemailer";
import {
  welcomeVerificationEmailTemplate,
  otpResendEmailTemplate,
  resetPasswordEmailTemplate,
  instructorApprovalEmailTemplate,
  instructorRejectionEmailTemplate,
} from "./emailTemplate.js";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const sendWelcomeEmail = async (email, name, otp, url) => {
  const transporter = createTransporter();

  const emailBody = welcomeVerificationEmailTemplate(name, otp, url);

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Welcome to our platform. Please verify your email",
    html: emailBody,
  };
  await transporter.sendMail(mailOptions);
};

const resendVerificationEmail = async (email, name, otp) => {
  const transporter = createTransporter();

  const emailBody = otpResendEmailTemplate(name, otp);
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Resend Verification Email",
    html: emailBody,
  };
  await transporter.sendMail(mailOptions);
};

const sendResetPasswordEmail = async (email, name, url) => {
  const transporter = createTransporter();

  const emailBody = resetPasswordEmailTemplate(name, url);
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Password",
    html: emailBody,
  };
  await transporter.sendMail(mailOptions);
};

const sendInstructorApprovalEmail = async (email, name) => {
  const transporter = createTransporter();

  const emailBody = instructorApprovalEmailTemplate(name);
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Instructor Request Approved",
    html: emailBody,
  };
  await transporter.sendMail(mailOptions);
};

const sendInstructorRejectionEmail = async (email, name) => {
  const transporter = createTransporter();

  const emailBody = instructorRejectionEmailTemplate(name);
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Instructor Request update!",
    html: emailBody,
  };
  await transporter.sendMail(mailOptions);
};

export {
  sendWelcomeEmail,
  resendVerificationEmail,
  sendResetPasswordEmail,
  sendInstructorApprovalEmail,
  sendInstructorRejectionEmail,
};
