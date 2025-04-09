import { useState,useEffect } from "react";
import { InputAdornment,Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton ,Modal, Box, Typography, Grid, TextField, Button ,TableContainer,Paper} from "@mui/material";
import { Visibility, Edit, Delete, Close as CloseIcon  } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"
import { toast } from "react-toastify";
const BuyersTable = () => {
  const [data, setData] = useState([]);
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
  const [selectedBuyers, setSelectedBuyers] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [buyers,setBuyers]=useState([]);
  
  const getAllBuyers=async()=>{
    const res=await axios.get(`http://localhost:3005/buyers/getAllBuyers`)
    console.log(res.data)
    setBuyers(res.data);
  }
  useEffect(()=>{
    getAllBuyers()
  },[]);

  const handleView = (Buyers) => {
    setSelectedBuyers(Buyers);
    setViewModalOpen(true);
  };

  const handleEdit = (Buyers) => {
    setSelectedBuyers(Buyers);
    setEditFormData(Buyers);
    setEditModalOpen(true);
  };

  const handleDelete = (Buyers) => {
    setSelectedBuyers(Buyers);
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

  const handleConfirmDelete = async () => {
    handleCloseDeleteModal();
    try {
      const res = await axios.delete(`http://localhost:3005/Buyers/deleteBuyers/${selectedBuyers._id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllBuyers()
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };
  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, status: newStatus } : row))
    );
  };

 
 
  return (
    <div classBuyers="p-4">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // center horizontally
          gap: 3, // gap between TextField and Button
          marginTop: 4,
          marginBottom:4,
          marginLeft:100
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: '260px' }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            height: '50px',
            backgroundColor: 'rgb(4, 4,40)',
            color: '#ffffff',
            textTransform: 'capitalize',
          }}
        >
         Add Buyers
        </Button>
      </Box>
      <TableContainer component={Paper} style={{ maxHeight: "400px", marginTop: "20px",overflow:"auto"  }}>
      <Table classBuyers="w-full border border-gray-300">
        <TableHead sx={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}>
          <TableRow classBuyers="bg-gray-200">
          <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">id</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">Buyers</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">Email</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2"> Phone</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">Address</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">Room</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">Status</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">Action</TableCell>
          </TableRow>
        </TableHead>     
        <TableBody>
          {buyers.length>0 && buyers.map((Buyers,index) => (
            <TableRow key={Buyers.id} classBuyers="text-center">
              <TableCell   sx={{ padding: "4px", fontSize: "15px" }} classBuyers="border p-2">{index+1}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "15px" }} classBuyers="border p-2">{Buyers.Buyers}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "15px" }} classBuyers="border p-2">{Buyers.Email}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "15px" }} classBuyers="border p-2">{Buyers.Phone}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "15px" }} classBuyers="border p-2">{Buyers.Address}</TableCell>
              <TableCell sx={{ padding: "4px", fontSize: "15px" }}  classBuyers="border p-2">{Buyers.Room}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "15px" }} classBuyers="border p-2">
                <Select
                  value={Buyers.status}
                  onChange={(e) => handleStatusChange(Buyers.id, e.target.value)}
                  classBuyers="border p-1 rounded"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
            
                </Select>
             </TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "15px" }} classBuyers="border p-2">
              <TableCell className="border p-2">
                 <div    style={{ display: "flex", gap: "5px", justifyContent: "center"  }}>
                  <IconButton sx={{color:"blue"}} onClick={() => handleView(Buyers)}>
                    <Visibility />
                  </IconButton>
                  <IconButton sx={{color:"green"}} onClick={() => handleEdit(Buyers)}>
                    <Edit />
                  </IconButton>
                  <IconButton sx={{color:"red"}} onClick={() => handleDelete(Buyers)}>
                    <Delete />
                  </IconButton>
                 
                </div>
              </TableCell>
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

export default BuyersTable;
