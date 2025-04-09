import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {//controller hai
    try {// use for  catch error

        const {Name,Email,Phone,Address,CheckIN ,CheckOut,Status,BussinessStatus} = req.body;
        if(!Name || !Email || !Phone|| !Address || !CheckIN|| !CheckOut || !Status|| !BussinessStatus) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Booking.create({Name, Email, Phone, Address, CheckIN, CheckOut, Status, BussinessStatus})
        res.status(201).json({
            success:true,
            message: 'Booking created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Booking', details: error.message });
    }
};

export const getAllBooking = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getBookingById = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking id not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateBooking = async (req, res) => {
    try {
        const { Name, Email, Phone, Address, CheckIN, CheckOut, Status, BussinessStatus } = req.body;
        const bookingId = req.params.id; 

        const existingBooking = await Booking.findById(bookingId);
        if (!existingBooking) {
            return res.status(404).json({ message: 'booking not found' });
        }

        const updateData = {
            Name, Email, Phone, Address, CheckIN, CheckOut, Status, BussinessStatus
        };

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'Booking updated successfully',
            booking: updatedBooking
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id; 
        const deletedBooking = await Booking.findByIdAndDelete(bookingId); 
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({
            success:true, 
            message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};