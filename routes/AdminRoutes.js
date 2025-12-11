import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getPendingItems, approveItems, RejectItems } from "../controllers/AdminController.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/pendingItems" ,
    authMiddleware,
    allowRoles("admin"),
    getPendingItems
);

router.patch("/approveItems/:itemId",
    authMiddleware,
    allowRoles("admin"),
    approveItems
);

router.patch("/rejectItems/:itemId",
    authMiddleware,
    allowRoles("admin"),
    RejectItems
);

export default router;
