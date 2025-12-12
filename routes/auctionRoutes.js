import express from "express";
import authMiddleWare from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js";
import {
    createAuction,
    getAuctionByStatus,
    getAuctionById,
} from "../controllers/AuctionController.js";

const router = express.Router();

router.post("/create", authMiddleWare, allowRoles("admin" , "seller"), createAuction);

router.get("/" , getAuctionByStatus);

router.get("/:auctionId" , getAuctionById);

export default router;
