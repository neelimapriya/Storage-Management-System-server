import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/profile",auth, userController.getProfile);

router.put("/profile",auth, userController.updateProfile);

export const UserRoute = router;
