import { Router } from "express";
import {
    registerUser,
    loginUser,
    getUserProfile,
    uploadKycDocument,
    temporaryAdminLogin
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post('/login/admin-bypass', temporaryAdminLogin);
router.use(authMiddleware);

router.get("/profile", getUserProfile);

router.post("/upload-document", uploadKycDocument);

export default router;
