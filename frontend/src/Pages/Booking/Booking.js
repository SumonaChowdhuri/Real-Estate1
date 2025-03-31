import { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton ,Modal, Box, Typography, Grid, TextField, Button} from "@mui/material";
import { Visibility, Edit, Delete, Close as CloseIcon  } from "@mui/icons-material";

const BookingTable = () => {
  const [data, setData] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "23467889", address: "Adityapur", checkIN: "2nd March", checkOut: "10th March", status: "pending", Bookingstatus: "confirmed" },
    { id: 2, name: "Neha Verma", email: "neha@gmail.com", phone: "9876543210", address: "Ranchi", checkIN: "5th March", checkOut: "12th March", status: "paid", Bookingstatus: "cancled" },
    { id: 3, name: "Amit Kumar", email: "amit@gmail.com", phone: "8765432109", address: "Jamshedpur", checkIN: "7th March", checkOut: "15th March", status: "overview", Bookingstatus: "complete" },
  ]);
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    maxHeight: '90vh',
    overflow: 'auto'
  };

  const deleteModalStyle = {
    ...modalStyle,
    width: 400,
    textAlign: 'center'
  };

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleView = (Booking) => {
    setSelectedBooking(Booking);
    setViewModalOpen(true);
  };

  const handleEdit = (Booking) => {
    setSelectedBooking(Booking);
    setEditFormData(Booking);
    setEditModalOpen(true);
  };

  const handleDelete = (Booking) => {
    setSelectedBooking(Booking);
    setDeleteModalOpen(true);
  };

  const handleCloseViewModal = () => setViewModalOpen(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleEditInputChange = (field) => (e) => {
    setEditFormData({ ...editFormData, [field]: e.target.value });
  };

  const handleUpdate = () => {
    setData(data.map(item => item.id === editFormData.id ? editFormData : item));
    handleCloseEditModal();
  };

  const handleConfirmDelete = () => {
    setData(data.filter(item => item.id !== selectedBooking));
    handleCloseDeleteModal();
  };

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, status: newStatus } : row))
    );
  };

  const handleBookingstatusChange = (id, newBookingstatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, Bookingstatus: newBookingstatus } : row))
    );
  };

  

  return (
    <div className="p-4">
    <Table className="w-full border border-gray-300" >
      <TableHead sx={{ top: 0, background: "white", zIndex: 2, position: "sticky", fontWeight: "bold" }}>
        <TableRow className="bg-gray-200">
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">id</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">name</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">email</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">address</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2"> phone</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">checkIn</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2"> checkOut</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Status</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Bookingstatus</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="text-center">
              <TableCell  sx={{  fontSize: "12px" }} className="border p-2">{row.id}</TableCell>
              <TableCell  sx={{  fontSize: "12px" }} className="border p-2">{row.name}</TableCell>
              <TableCell  sx={{ fontSize: "12px" }} className="border p-2">{row.email}</TableCell>
              <TableCell  sx={{  fontSize: "12px" }} className="border p-2">{row.address}</TableCell>
              <TableCell  sx={{  fontSize: "12px" }} className="border p-2">{row.phone}</TableCell>
              <TableCell  sx={{  fontSize: "12px" }} className="border p-2">{row.checkIN}</TableCell>
              <TableCell  sx={{  fontSize: "12px" }} className="border p-2">{row.checkOut}</TableCell>
              <TableCell sx={{  fontSize: "12px" }} className="border p-2">
                <Select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="overview">Overview</MenuItem>
                </Select>
              </TableCell>
              <TableCell className="border p-2">
                <Select
                  value={row.Bookingstatus}
                  onChange={(e) => handleBookingstatusChange(row.id, e.target.value)}
                  className="border p-2 rounded"
                >
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="cancled">Canceled</MenuItem>
                  <MenuItem value="complete">Complete</MenuItem>
                </Select>
              </TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">
                <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                  <IconButton color="black" onClick={() => handleView(row)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="black" onClick={() => handleEdit(row)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="black" onClick={() => handleDelete(row)}>
                    <Delete />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* View Modal */}
      <Modal open={viewModalOpen} onClose={handleCloseViewModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Booking Details</Typography>
            <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
          </Box>
          {selectedBooking && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedBooking).map(([key, value]) => (
                <Grid item xs={6} key={key}>
                  <Typography><strong>{key}:</strong> {value}</Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={handleCloseEditModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Edit Booking</Typography>
            <IconButton onClick={handleCloseEditModal}><CloseIcon /></IconButton>
          </Box>
          <Grid container spacing={2} mt={2}>
            {Object.keys(editFormData).map((field) => (
              <Grid item xs={6} key={field}>
                <TextField
                  label={field}
                  value={editFormData[field] || ''}
                  onChange={handleEditInputChange(field)}
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="outlined" onClick={handleCloseEditModal}>Cancel</Button>
            <Button variant="contained" onClick={handleUpdate} sx={{ ml: 2 }}>Update</Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <Box sx={deleteModalStyle}>
          <Typography variant="h6">Confirm Delete</Typography>
          <Typography my={2}>Are you sure you want to delete this Booking?</Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>CANCLE</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>DELETE</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BookingTable;
