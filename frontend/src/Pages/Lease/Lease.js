import { useState } from "react";
import { Table,Select,MenuItem, TableHead, TableBody, TableRow, TableCell, IconButton, Modal, Box, Typography, Grid, TextField, Button} from "@mui/material";
import { Visibility, Edit, Delete, Close as CloseIcon } from "@mui/icons-material";

const Leasetable = () => {
  const [data, setData] = useState([
    { id: 1, Name: "Rahul Sharma",Email: "rahul@gmail.com", Phone: "23467889", Address: "Adityapur", StartDate: "1st jan", EndDate:" 1th april ", MonthlyRent:"5000", Deposit:"2000", status: "Pending",LeaseStatus:"Active" },
    { id: 2, Name: "Neha Verma",Email: "neha@gmail.com", Phone: "9876543210", Address: "Ranchi", StartDate: "2nd feb", EndDate:" 1th march ", MonthlyRent:"9000", Deposit:"5000", status: "Paid",LeaseStatus:"Terminated" },
    { id: 3, Name: "Amit Kumar",Email: "amit@gmail.com", Phone: "8765432109", Address: "Jamshedpur", StartDate: "1st jan", EndDate:" 1th april ", MonthlyRent:"5500", Deposit:"2000", status: "OverDue",LeaseStatus:"Expired"  },
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
    overflow: 'auto',

  };

  const deleteModalStyle = {
    ...modalStyle,
    width: 400,
    textAlign: 'center'
  };
 
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLease, setSelectedLease] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleView = (Lease) => {
    setSelectedLease(Lease);  // सही डेटा सेट कर रहे हैं
    setViewModalOpen(true);
  };
  
  const handleEdit = (Lease) => {
    setSelectedLease(Lease);
    setEditFormData(Lease);
    setEditModalOpen(true);
  };

  const handleDelete = (Lease) => {
    setSelectedLease(Lease);
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
    setData(data.filter(item => item.id !== selectedLease));
    handleCloseDeleteModal();
  };
  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, status: newStatus } : row))
    );
  };

  const handleLeaseStatusChange = (id, newLeaseStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, LeaseStatus: newLeaseStatus } : row))
    );
  };

  // const handleDelete = (id) => {
  //   setData((prevData) => prevData.filter((row) => row.id !== id));
  // };

  // const handleEdit = (id) => {
  //   alert(`Edit function triggered for ID: ${id}`);
  // };

  // const handleView = (id) => {
  //   alert(`View function triggered for ID: ${id}`);
  // };

  return (
    <div className="p-4">
      <Table className="w-full border border-gray-300">
        <TableHead sx={{ position: "sticky", top: 0, background: "white",zIndex: 2, fontWeight: "bold"}}>
          <TableRow className="bg-gray-200">
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">S.No</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Name</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Email</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Phone</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Address</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Start Date</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2"> End Date</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Monthly Rent</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Deposit</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Status</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">LeaseStatus</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {data.map((row) => (
            <TableRow key={row.id} className="text-center" sx={{fontWeight:"bold"}} >
             
              <TableCell   sx={{ padding: "4px", fontSize: "12px" , justifyItems:"center"}} className="border p-2">{row.id}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }}  className="border p-2">{row.Name}</TableCell>
              <TableCell   sx={{ padding: "4px", fontSize: "12px" }}className="border p-2">{row.email}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.Phone}</TableCell>
              <TableCell sx={{ padding: "4px", fontSize: "12px" }}  className="border p-2">{row.Address}</TableCell>
              <TableCell   sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.StartDate}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.EndDate}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }}className="border p-2">{row.MonthlyRent}</TableCell>
              <TableCell sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.Deposit}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }}className="border p-2">
                <Select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="OverDue">OverDue</MenuItem>
                </Select>
              </TableCell>
              <TableCell sx={{ padding: "2px", fontSize: "12px" }} className="border p-2">
                <Select
                  value={row.LeaseStatus}
                  onChange={(e) => handleLeaseStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Terminated">Terminated</MenuItem>
                  <MenuItem value="Expired">Expired</MenuItem>
                </Select>
              </TableCell>
              <TableCell  sx={{ fontWeight:"bolder" }} className="border p-2">
                <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                  <IconButton color="black" fontWeight="bolder" onClick={() => handleView(row)}>
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
            <Typography variant="h6">Lease Details</Typography>
            <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
          </Box>
          {selectedLease && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedLease).map(([key, value]) => (
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
            <Typography variant="h6">Edit Lease</Typography>
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
          <Typography my={2}>Are you sure you want to delete this Lease?</Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>CANCLE</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>DELETE</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Leasetable;
