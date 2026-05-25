require("dotenv").config();
import nodemailer from "nodemailer";

export async function verifyMail(token: string, email: string) {
  if (!email) {
    console.log("Email missing:", email);
    return;
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailConfigurations = {
    from: "ServicePro Support",
    to: email,
    subject: "Your OTP Verification Code",
    html: `
    <div style="font-family: Arial; padding: 10px;">
      <h2>ServicePro Verification</h2>
      <p>Your OTP code is:</p>
      <h1 style="color:#4f46e5;">${token}</h1>
      <p>This OTP is valid for <b>1 minute</b>.</p>
      <p>If you didn’t request this, ignore this email.</p>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailConfigurations);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Mail error:", error);
    throw error;
  }
}

// module.exports = {verifyMail};
