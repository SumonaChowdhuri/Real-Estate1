import express from 'express';
import { createLease, getAllLease, getLeaseById, updateLease, deleteLease } from "../controllers/leaseController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createLease", createLease);
router.get("/getAllLease", getAllLease);
router.get("/getLeaseById/:id", getLeaseById);
router.put("/updateLease/:id",  updateLease);
router.delete("/deleteLease/:id", deleteLease);
export default router;