import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

export const sendVerificationEmail = (userEmail, token) => {
  const url = `https://mern-blog-pt2t.onrender.com/verify-email?token=${token}`;
  transporter.sendMail(
    {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Email Verification",
      html: `<h3>Click <a href="${url}">here</a> to verify your email.</h3>`,
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};
