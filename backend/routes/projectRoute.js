import express from "express";

import {createproject,getproject,getprojectById,updateproject,deleteproject} from "../controllers/projectController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createproject", createproject);
router.get("/getproject", getproject);
router.get("/getprojectById/:id", getprojectById);
router.put("/updateproject/:id",  updateproject);
router.delete("/deleteproject/:id", deleteproject);
export default router;