import express from 'express';
import {createUser, deleteuser, getAlluser, getuserById, updateuser } from "../controllers/userController.js";
const router = express.Router();

router.post("/createuser",createUser);
router.get("/getAlluser", getAlluser);
router.get("/getuserById/:id", getuserById);
router.put("/updateuser/:id",  updateuser);
router.delete("/deleteuser/:id", deleteuser);
export default router; 