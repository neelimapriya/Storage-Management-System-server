import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

//confirmPassword
userSchema.virtual('confirmPassword')
  .set(function (this: any, value: string) {
    this._confirmPassword = value;
  })
  .get(function (this: any) {
    return this._confirmPassword;
  });

//validation
userSchema.pre('save', async function (next) {
  const user = this as any;

  if (user.isModified('password')) {
    if (user.password !== user.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    user.password = await bcrypt.hash(user.password, config.bcrypt_salt_round);
  }

  next();
});

// Static methods
userSchema.static('isUserExistsByEmail', async function (email: string) {
  return await User.findOne({ email }).select('+password');
});

userSchema.static('isUserPasswordMatched', async function (plainPassword: string, hashPassword: string) {
  return await bcrypt.compare(plainPassword, hashPassword);
});

userSchema.static('isUserBlocked', async function (status: string) {
  return status === 'blocked';
});

userSchema.static('isJWTissuedBeforePasswordChange', async function (passwordChangeTime: Date, JwtIssuedTime: number) {
  const passwordChangeAtTime = new Date(passwordChangeTime).getTime() / 1000;
  return passwordChangeAtTime > JwtIssuedTime;
});

export const User = model<IUser, UserModel>('User', userSchema);
