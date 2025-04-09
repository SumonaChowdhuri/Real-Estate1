import express from 'express';
import { createSeller, getAllSeller, getSellerById, updateSeller, deleteSeller } from "../controllers/sellerController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createSeller", createSeller);
router.get("/getAllSeller", getAllSeller);
router.get("/getSellerById/:id", getSellerById);
router.put("/updateSeller/:id",  updateSeller);
router.delete("/deleteSeller/:id", deleteSeller);
export default router;