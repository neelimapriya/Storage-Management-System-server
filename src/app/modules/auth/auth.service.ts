import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { ChangePasswordPayload, ILoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import {
  createToken,
  sendVerificationCodeToUserEmail,
  verifyToken,
} from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";
import crypto from "crypto";

const signUpUser = async (payload: IUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "This user is already exist!");
  }

  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Email and password are required"
    );
  }
  // checking if the user is exist
  const userCheck = await User.isUserExistsByEmail(email as string);

  if (!userCheck) {
    throw new AppError(StatusCodes.NOT_FOUND, "This user is not found!");
  }

  const isUserPasswordMatched = await bcrypt.compare(
    password,
    userCheck.password as string
  );

  if (!isUserPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Password is Incorrect");
  }
  const jwtPayload = {
    email: userCheck.email as string,
  };
  const token = await createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiresIn as string
  );
  const refreshToken = await createToken(
    jwtPayload,
    config.refresh_access_secret as string,
    config.refresh_access_expiresIn as string
  );

  const user = await User.findOne({ email: userCheck.email });
  return {
    token,
    user,
    refreshToken,
  };
};

//   refresh token
const refreshToken = async (token: string) => {
  // verify token

  const decoded = await verifyToken(
    token,
    config.refresh_access_secret as string
  );

  const { user } = decoded as JwtPayload;

  const DBUser = await User.findById(user);

  // checking if the user is exists
  if (!DBUser) {
    throw new AppError(StatusCodes.NOT_FOUND, "The user is not found");
  }

  const jwtPayload = { email: DBUser.email };

  const accessToken = await createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiresIn as string
  );

  return {
    accessToken,
  };
};
const changePassword = async (
  userData: JwtPayload,
  payload: ChangePasswordPayload
): Promise<void> => {
  const { oldPassword, newPassword, confirmPassword } = payload;

  if (newPassword !== confirmPassword) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "New password and confirm password do not match"
    );
  }

  const user = await User.findById(userData.user).select("+password");
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  const isMatch = await User.isUserPasswordMatched(oldPassword, user.password);
  if (!isMatch) {
    throw new AppError(StatusCodes.FORBIDDEN, "Old password is incorrect");
  }
  if (!userData?.user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid user session");
  }

  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round)
  );

  await User.findOneAndUpdate(
    { _id: userData.user },
    {
      password: newHashedPassword,
      needChangePassword: false,
      passwordChangeAt: new Date(),
    }
  );

  return;
};

// Forget password services starts from here

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "User not found , try with another email."
    );
  }

  // code generate
  const verificationCode = crypto.randomInt(100000, 999999).toString();
  user.passwordResetCode = verificationCode;
  user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendVerificationCodeToUserEmail(email, verificationCode);

  return true;
};

const verifyResetCode = async (email: string, code: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  if (!user.passwordResetCode) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "No verification code found for this user"
    );
  }

  if (user.passwordResetCode !== code) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Verification code is incorrect"
    );
  }

  if (!user.passwordResetExpires) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "No expiration time set for the code"
    );
  }

  if (user.passwordResetExpires < new Date()) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Verification code has expired"
    );
  }

  return true;
};


const resetPassword = async (
  email: string,
  newPassword: string,
  confirmPassword: string
) => {
  // 1. Checking new pass with confirm pass
  if (newPassword !== confirmPassword) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Passwords do not match");
  }

  // 2. Find user and reset code and expiry fields
  const user = await User.findOne({ email }).select("+passwordResetCode +passwordResetExpires");

  // 3. Checking is this exist or not
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  // 4. Checking reset code
  if (!user.passwordResetCode) {
    throw new AppError(StatusCodes.BAD_REQUEST, "No reset code found for this user");
  }

  // 5. Checking reset code expiry date
  if (!user.passwordResetExpires) {
    throw new AppError(StatusCodes.BAD_REQUEST, "No expiry time set for the reset code");
  }

  // 6. Checking code validation
  if (user.passwordResetExpires < new Date()) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Reset code has expired");
  }

  // 7. Hashing new pass
  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round)
  );

  // 8. Updating user pass
  user.password = hashedPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangeAt = new Date();

  // 9. Save and update user pass
  await user.save();

  return true;
};


export const AuthService = {
  signUpUser,
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  verifyResetCode,
  resetPassword
};
