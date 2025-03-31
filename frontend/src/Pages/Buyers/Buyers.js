import { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton ,Modal, Box, Typography, Grid, TextField, Button} from "@mui/material";
import { Visibility, Edit, Delete, Close as CloseIcon  } from "@mui/icons-material";

const BuyersTable = () => {
  const [data, setData] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "23467889", address: "Adityapur", Room: "Normal",  status: "Active" },
    { id: 2, name: "Neha Verma", email: "neha@gmail.com", phone: "9876543210", address: "Ranchi", Room: "Delux", status: "InActive"},
    { id: 3, name: "Amit Kumar", email: "amit@gmail.com", phone: "8765432109", address: "Jamshedpur",Room : "luxury", status: "Active" },
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
  const [selectedname, setSelectedname] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleView = (name) => {
    setSelectedname(name);
    setViewModalOpen(true);
  };

  const handleEdit = (name) => {
    setSelectedname(name);
    setEditFormData(name);
    setEditModalOpen(true);
  };

  const handleDelete = (name) => {
    setSelectedname(name);
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
    setData(data.filter(item => item.id !== selectedname));
    handleCloseDeleteModal();
  };
  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, status: newStatus } : row))
    );
  };

 
 
  return (
    <div className="p-4">
      <Table className="w-full border border-gray-300">
        <TableHead sx={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}>
          <TableRow className="bg-gray-200">
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">id</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Name</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Email</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2"> Phone</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Address</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Room</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Status</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Action</TableCell>
          </TableRow>
        </TableHead>     
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="text-center">
              <TableCell   sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.id}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.name}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.email}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.phone}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.address}</TableCell>
              <TableCell sx={{ padding: "4px", fontSize: "12px" }}  className="border p-2">{row.Room}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">
                <Select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
            
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
            <Typography variant="h6">Buyers Details</Typography>
            <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
          </Box>
          {selectedBuyers && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedBuyers).map(([key, value]) => (
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
            <Typography variant="h6">Edit Buyers</Typography>
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
          <Typography my={2}>Are you sure you want to delete this Buyers?</Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>CANCLE</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>DELETE</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BuyersTable;
