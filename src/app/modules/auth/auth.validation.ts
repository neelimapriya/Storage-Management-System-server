import { z } from "zod";

const signUpValidationSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "Name is required" }).trim(),
      email: z.string().email({ message: "Email must be valid" }),
      password: z
        .string({ invalid_type_error: "Password must be a string" })
        .max(20, { message: "Password can't be more than 20 characters" }),
      confirmPassword: z
        .string({ invalid_type_error: "Confirm Password must be a string" })
        .max(20, { message: "Password can't be more than 20 characters" }),
    })
    .refine((data) => data?.password === data?.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required!",
    }),
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old Password is Required" }),
    newPassword: z.string({ required_error: "New Password is Required" }),
    confirmPassword: z.string({ required_error: " Password does not matched" }),
  }),
});

// forget pass verify
const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Valid email is required" }),
  }),
});

// Verify Reset Code
const verifyResetCodeSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Valid email is required" }),
    code: z
      .string()
      .length(6, { message: "Verification code must be exactly 6 digits" }),
  }),
});

// reset pass schema
const resetPasswordSchema = z.object({
  body: z
    .object({
      email: z.string().email({ message: "Valid email is required" }),
      newPassword: z
        .string()
        .min(6, { message: "New password must be at least 6 characters" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Confirm password must be at least 6 characters" }),
    })
    .refine(
      (data) => data.newPassword === data.confirmPassword,
      {
        path: ["confirmPassword"],
        message: "Passwords do not match",
      }
    ),
});

export const AuthValidation = {
  signUpValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
  changePasswordValidationSchema,
  forgotPasswordSchema,
  verifyResetCodeSchema,
  resetPasswordSchema,
};
