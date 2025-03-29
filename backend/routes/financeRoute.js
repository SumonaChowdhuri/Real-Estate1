import express from 'express';
import { createFinance, getAllFinance, getFinanceById, updateFinance, deleteFinance } from "../controllers/financeController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createFinance", createFinance);
router.get("/getAllFinance", getAllFinance);
router.get("/getFinanceById/:id", getFinanceById);
router.put("/updateFinance/:id",  updateFinance);
router.delete("/deleteFinance/:id", deleteFinance);
export default router;