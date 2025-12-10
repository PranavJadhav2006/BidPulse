import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";
import { addItem } from "../controllers/sellerController.js";
import {allowRoles} from "../middleware/roleMiddleware.js";

const  router = express.Router();

router.post('/add-Item' ,
    authMiddleware,
    allowRoles("seller"),
    upload.single("image"),
    addItem
);

export default router;