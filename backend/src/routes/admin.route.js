import { Router } from "express";
import {
    getPendingInstitutions,
    verifyInstitution,
    getPendingSuppliers,
    verifySupplier,
    manuallyConfirmUser,
    updateUserRole,
    checkGstinDetails
} from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const router = Router();

const adminOnly = [authMiddleware, adminMiddleware];

router.get("/institutions/pending", adminOnly, getPendingInstitutions);
router.put("/institutions/:institutionId/verify", adminOnly, verifyInstitution);

router.get("/suppliers/pending", adminOnly, getPendingSuppliers);
router.put("/suppliers/:supplierId/verify", adminOnly, verifySupplier);

router.put('/users/:userId/role', adminOnly, updateUserRole);

router.post('/users/confirm', adminOnly, manuallyConfirmUser);

router.post('/verify/gstin', adminOnly, checkGstinDetails);

export default router;
