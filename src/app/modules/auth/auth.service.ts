import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { ChangePasswordPayload, ILoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";

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

export const AuthService = {
  signUpUser,
  loginUser,
  refreshToken,
  changePassword,
};
