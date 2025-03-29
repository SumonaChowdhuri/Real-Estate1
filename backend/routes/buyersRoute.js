import express from 'express';
import { createBuyers, getAllBuyers, getBuyersById, updateBuyers, deleteBuyers } from "../controllers/buyersController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createBuyers", createBuyers);
router.get("/getAllBuyers", getAllBuyers);
router.get("/getBuyersById/:id", getBuyersById);
router.put("/updateBuyers/:id",  updateBuyers);
router.delete("/deleteBuyers/:id", deleteBuyers);
export default router;