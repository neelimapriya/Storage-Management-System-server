import { Router } from "express";
import auth from "../../middleware/auth";
import { getMyStorage } from "./storage.controller";

const router = Router();
router.get("/", auth, getMyStorage);

export const storageRoute = router;
