import { useState } from "react";
import { Table,Select,MenuItem, TableHead, TableBody, TableRow, TableCell, IconButton, Modal, Box, Typography, Grid, TextField, Button ,TableContainer,Paper} from "@mui/material";
import { Visibility, Edit, Delete, Close as CloseIcon } from "@mui/icons-material";

const PropertyTable = () => {
  const [data, setData] = useState([
    { id: 1, Name: "Luxury", PropertyType: "Apartment", Address: "Ranchi",  Price: 100000, AreaSqft: 100, Furnishing: "furnished", Status: "Active" },
    { id: 2, Name: "2bhk", PropertyType: "Apartment", Address: "Kolkata",  Price: 100000, AreaSqft: 100, Furnishing: "furnished", Status: "Active" },
    { id: 3, Name: "1bhk", PropertyType: "Apartment", Address: "MP",  Price: 100000, AreaSqft: 100, Furnishing: "furnished", Status: "InActive" },
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
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleView = (property) => {
    setSelectedProperty(property);
    setViewModalOpen(true);
  };

  const handleEdit = (property) => {
    setSelectedProperty(property);
    setEditFormData(property);
    setEditModalOpen(true);
  };

  const handleDelete = (property) => {
    setSelectedProperty(property);
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
    setData(data.filter(item => item.id !== selectedProperty));
    handleCloseDeleteModal();
  };
  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, Status: newStatus } : row))
    );
  };
  return (
    <div className="p-4">
      <TableContainer component={Paper} style={{ maxHeight: "400px", marginTop: "20px", justifyContent:"center" }}>
      <Table className="w-full border border-gray-300" >
        <TableHead sx={{  background: "white", position: "sticky", fontWeight: "bold"}}>
          <TableRow className="bg-gray-200" border= "1px solid black">
            <TableCell sx={{ fontWeight:"bold" }} className="border p-2">S.No</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Property Title</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Property Type</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Address</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2"> Price</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Area(Sqft)</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2"> Furnishing</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Status</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="text-center" sx={{ fontWeight: "bold" }} >
                     
              <TableCell  sx={{ marginLeft:"4px", fontSize: "15px" }} className="border p-2">{row.id}</TableCell>
              <TableCell   sx={{ marginLeft:"4px", fontSize: "15px" }} className="border p-2">{row.Name}</TableCell>
              <TableCell    sx={{  marginLeft:"4px", fontSize: "15px" }} className="border p-2">{row.PropertyType}</TableCell>
              <TableCell   sx={{  marginLeft:"4px", fontSize: "15px" }}  className="border p-2">{row.Address}</TableCell>
              <TableCell     sx={{  marginLeft:"4px", fontSize: "15px" }} className="border p-2">{row.Price}</TableCell>
              <TableCell  sx={{  marginLeft:"4px", fontSize: "15px"}}  className="border p-2">{row.AreaSqft}</TableCell>
              <TableCell  sx={{  marginLeft:"4px", fontSize: "15px" }}  className="border p-2">{row.Furnishing}</TableCell>
              <TableCell    sx={{  marginLeft:"4px", fontSize: "15px" }} className="border p-2">
                <Select
                  value={row.Status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
                </Select>
              </TableCell>
              <TableCell  sx={{ fontWeight:"bolder" }} className="border p-2">
                <div style={{ display: "flex", gap: "5px" }}>
                  <IconButton color="blue"  fontweight="bolder" onClick={() => handleView(row)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="black" fontweight="bolder"  onClick={() => handleEdit(row)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="black" fontweight="bolder"  onClick={() => handleDelete(row)}>
                    <Delete />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>

      {/* View Modal */}
      <Modal open={viewModalOpen} onClose={handleCloseViewModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Property Details</Typography>
            <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
          </Box>
          {selectedProperty && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedProperty).map(([key, value]) => (
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
            <Typography variant="h6">Edit Property</Typography>
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
          <Typography my={2}>Are you sure you want to delete this property?</Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>CANCLE</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>DELETE</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PropertyTable;