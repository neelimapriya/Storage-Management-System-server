import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../../config";
import nodemailer from "nodemailer";

export const createToken = async (
  jwtPayload: object,
  secret: string,
  expiresIn: string | number
): Promise<string> => {
  const token = jwt.sign(jwtPayload, secret, { expiresIn } as SignOptions);
  return token;
};

export const verifyToken = async (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

// send verification code utils
export const sendVerificationCodeToUserEmail = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.email_user,
      pass: config.email_pass,
    },
  });
  const mailOptions = {
    from: `"${config.email_from_name}" <${config.email_from}>`,
    to: email,
    subject: "Your Password Reset Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2>Reset Your Password</h2>
        <p>Your 6-digit verification code is:</p>
        <div style="font-size: 24px; font-weight: bold; margin: 10px 0;">
          ${code}
        </div>
        <p>This code is valid for 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <br />
        <p>— SparkTech Agency</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Sent verification code ${code} to ${email}`);
};
