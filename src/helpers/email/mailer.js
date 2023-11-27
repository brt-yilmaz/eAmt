import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import {
  createVerifyEmailTemplate,
  createAmtEmailTemplate,
  createSubject,
} from "./emailMessages";

export const sendEmail = async ({
  email,
  emailType,
  userId,
  amtCode,
  locale,
  taxId,
  name,
}) => {
  let message = "";
  let subject = "";
  const hashedToken = await bcrypt.hash(process.env.JWT_SECRET_KEY, 10);

  try {
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
      message = createVerifyEmailTemplate(hashedToken, locale);
      subject = createSubject(emailType, locale);
    }

    if (emailType === "AMTCODE") {
      message = createAmtEmailTemplate(name, taxId, amtCode, locale);
      subject = createSubject(emailType, locale);
    }

    if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "eamt3306@gmail.com",
      to: email,
      subject: subject,
      html: message,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
