import { Model } from "mongoose";

export interface IUser {
  _id?: any;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  passwordResetCode?: string;
  passwordResetExpires?: Date;
   passwordChangeAt?: Date;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser>;

  isUserPasswordMatched(
    planePassword: string,
    hashPassword: string
  ): Promise<boolean>;
  isJWTissuedBeforePasswordChange(
    passwordChangeTime: Date,
    JwtIssuedTime: number
  ): Promise<boolean>;
}
