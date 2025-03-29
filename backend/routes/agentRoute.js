import express from 'express';
import { createAgent, getAllAgent, getAgentById, updateAgent, deleteAgent } from "../controllers/agentController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createAgent", createAgent);
router.get("/getAllAgent", getAllAgent);
router.get("/getAgentById/:id", getAgentById);
router.put("/updateAgent/:id",  updateAgent);
router.delete("/deleteAgent/:id", deleteAgent);
export default router;