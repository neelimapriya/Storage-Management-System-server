import { z } from "zod";

const userValidationSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "Name is Required" }).trim(),
      email: z.string().email({ message: "Email must be valid" }),
      password: z
        .string({ invalid_type_error: "Password must be string" })
        .max(20, { message: "Password can't be more than 20 characters" }),
      confirmPassword: z
        .string({ invalid_type_error: "Confirm Password must be string" })
        .max(20, { message: "Password can't be more than 20 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }),
});

export const userValidation = {
  userValidationSchema,
};
