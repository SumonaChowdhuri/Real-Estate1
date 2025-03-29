import express from 'express';
import { createBooking, getAllBooking, getBookingById, updateBooking, deleteBooking } from "../controllers/bookingController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createBooking", createBooking);
router.get("/getAllBooking", getAllBooking);
router.get("/getBookingById/:id", getBookingById);
router.put("/updateBooking/:id",  updateBooking);
router.delete("/deleteBooking/:id", deleteBooking);
export default router;