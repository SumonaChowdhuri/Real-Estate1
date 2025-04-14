import express from 'express';
import { createSite,getSite,getSideById,updateSite,deleteSite } from '../controllers/siteVisitController.js';
const router = express.Router();

router.post("/createSite", createSite);
router.get("/getSite", getSite);
router.get("/getSideById/:id", getSideById);
router.put("/updateSite/:id",  updateSite);
router.delete("/deleteSite/:id", deleteSite);
export default router;