import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";
import config from "../config";
import { User } from "../modules/user/user.model";

export const auth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token?.startsWith("Bearer")) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Authorization token missing or malformed"
      );
    }

    const extractedToken = token.split(" ")[1];

    const decoded = jwt.verify(
      extractedToken,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { email, iat, exp } = decoded;

    const authUser = await User.isUserExistsByEmail(email);

    if (!authUser) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }

    req.user = {
      email,
      _id: authUser._id.toString(),
      iat,
      exp,
    };

    next();
  }
);

export default auth;
