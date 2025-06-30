import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post(
  "/sign-up",
  validateRequest(AuthValidation.signUpValidationSchema),
  AuthController.signUpUser
);

router.post(
  "/login",

  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.logIn
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.signUpUser
);

router.patch(
  "/change-password",auth,
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword
);

router.post(
  "/forgot-password",
  validateRequest(AuthValidation.forgotPasswordSchema),
  AuthController.forgotPassword
);

router.post(
  "/verify-reset-code",
  validateRequest(AuthValidation.verifyResetCodeSchema),
  AuthController.verifyResetCode
);

router.post(
  "/reset-password",
  validateRequest(AuthValidation.resetPasswordSchema),
  AuthController.resetPassword
);


export const AuthRoute = router;
