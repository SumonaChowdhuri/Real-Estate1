import express from 'express';
import { createProperty, getAllProperty, getPropertyById, updateProperty, deleteProperty } from "../controllers/propertyController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createProperty", createProperty);
router.get("/getAllProperty", getAllProperty);
router.get("/getPropertyById/:id", getPropertyById);
router.put("/updateProperty/:id",  updateProperty);
router.delete("/deleteProperty/:id", deleteProperty);
export default router;