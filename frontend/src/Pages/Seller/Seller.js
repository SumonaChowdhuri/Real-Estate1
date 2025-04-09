import { useEffect,useState } from "react";
import {FormControl,InputLabel,InputAdornment,Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton ,Modal, Box, Typography, Grid, TextField, Button ,TableContainer,Paper} from "@mui/material";
import { Visibility, Edit, Delete, Close as CloseIcon  } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { toast } from "react-toastify";
const SellerTable = () => {
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

  const [addModalOpen,setAddModalOpen]=useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSeller, setselectedSeller] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const[sellers, setSellers]=useState([])
  const[searchTerm, setSearchTerm]= useState("");
  const [apiSellers, setApiSellers] = useState([]);

  const [addFormData,setAddFormData]=useState({
    Name:"",
    Email:"",
    Address:"",
    Phone:"",
    PropertyID:"",
    ListedPrice:"",
    Status:"Available",
  });
  const getAllSellers=async()=>{
    try{
      const res = await axios.get(`http://localhost:3005/Seller/getAllSeller`)
      console.log(res.data);
      setSellers(res.data)
      setApiSellers(res.data)  
    }
    catch(error){
      console.log("error")
    }
  };
  useEffect(()=>{
    getAllSellers()
  },[])

  const handleView = (Seller) => {
    setselectedSeller(Seller);
    setViewModalOpen(true);
  };

  const handleEdit = (Seller) => {
    setselectedSeller(Seller);
    setEditFormData(Seller);
    setEditModalOpen(true);
  };

  const handleDelete = (Seller) => {
    setselectedSeller(Seller);
    setDeleteModalOpen(true);
  };

  const handleOpenAddModal = () => setAddModalOpen(true);
  const handleCloseAddModal = () => {
    console.log("hello");
    setAddModalOpen(false);
  }
  const handleCloseViewModal = () => setViewModalOpen(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleEditInputChange = (field) => (e) => {
    setEditFormData({ ...editFormData, [field]: e.target.value });
  };

  const handleAddInputChange = (field) => (e) => {
    setAddFormData({
      ...addFormData,[field]:e.target.value,
    });
  };
  const handleAddSeller=async()=>{
    try{
      const res=await axios.post(`http://localhost:3005/Seller/createSeller`,addFormData);
      if(res.data.success){
        toast.success("seller added successfully!");
        handleCloseAddModal();
        getAllSellers();
        //reset form data
        setAddFormData({
          Name:"",
          Email:"",
          Address:"",
          Phone:"",
          PropertyID:"",
          ListedPrice:"",
          Status:"Available"
        });
      }
    }catch(error){
      console.error("error adding Agent",error);
      toast.error(error.res?.data?.message||"failed to add property");
    }
    }
  const handleSearchChange = (e) => {
    console.log("target", e.target);

    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setSellers(apiSellers); // Reset to full list when search is empty
      return;
    }

    const filtered = apiSellers.filter((seller) => {
      return (
        seller.Name.toLowerCase().includes(value) ||   // Name = gfdgf.includes(gfdgf)
        seller.Address.toLowerCase().includes(value) 
      );
    });

    setSellers(filtered);
  };

  const handleUpdate = () => {
    console.log("Updating seller:", editFormData);
    // Here you would typically make an API call to update the property
    handleCloseEditModal();
  }

  const handleConfirmDelete = async () => {
    handleCloseDeleteModal();
    try {
      console.log("Deleting seller with ID:", selectedSeller._id);
      console.log("Selected Seller:", selectedSeller);
      console.log("Selected Seller ID:", selectedSeller?._id);

      const res = await axios.delete(`http://localhost:3005/Seller/deleteSeller/${selectedSeller._id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllSellers();
      }
    }
    catch (error) {
      console.error("Delete error:", error.response?.data); // 👈 shows backend error
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    
  };

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, Status: newStatus } : row))
    );
  };

  return (
    <div className="p-4">
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
          onClick={handleOpenAddModal}
          sx={{
            height: '50px',
            backgroundColor: 'rgb(4, 4,40)',
            color: '#ffffff',
            textTransform: 'capitalize',
          }}
        >
         Add Seller
        </Button>
      </Box>
      <TableContainer component={Paper} style={{ maxHeight: "400px", marginTop: "20px",overflow:"auto"  }}>
    <Table className="w-full border border-gray-300" >
      <TableHead sx={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}>
        <TableRow className="bg-gray-200">
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">id</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Name</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Email</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Address</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Phone</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Property ID</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Listed Price</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Status</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          {sellers.length>0 && sellers.map((seller,index) => (
            <TableRow key={seller.id} className="text-center">
              <TableCell  sx={{  fontSize: "15px" }} className="border p-2">{index+1}</TableCell>
              <TableCell  sx={{  fontSize: "15px" }} className="border p-2">{seller.Name}</TableCell>
              <TableCell  sx={{ fontSize: "15px" }} className="border p-2">{seller.Email}</TableCell>
              <TableCell  sx={{  fontSize: "15px" }} className="border p-2">{seller.Address}</TableCell>
              <TableCell  sx={{  fontSize: "15px" }} className="border p-2">{seller.Phone}</TableCell>
              <TableCell  sx={{  fontSize: "15px" }} className="border p-2">{seller.PropertyID}</TableCell>
              <TableCell  sx={{  fontSize: "15px" }} className="border p-2">{seller.ListedPrice}</TableCell>
              <TableCell sx={{  fontSize: "15px" }} className="border p-2">
                <Select
                  value={seller.Status}
                  onChange={(e) => handleStatusChange(seller.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="overview">Overview</MenuItem>
                </Select>
              </TableCell>
              <TableCell  sx={{ fontSize: "15px" }} className="border p-2">
              <TableCell className="border p-2">
                 <div    style={{ display: "flex", gap: "5px", justifyContent: "center"  }}>
                  <IconButton sx={{color:"blue"}} onClick={() => handleView(seller)}>
                    <Visibility />
                  </IconButton>
                  <IconButton sx={{color:"green"}} onClick={() => handleEdit(seller)}>
                    <Edit />
                  </IconButton>
                  <IconButton sx={{color:"red"}} onClick={() => handleDelete(seller)}>
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
            <Typography variant="h6">Seller Details</Typography>
            <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
          </Box>
          {selectedSeller && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedSeller).map(([key, value]) => (
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
            <Typography variant="h6">Edit Seller</Typography>
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
          <Typography my={2}>Are you sure you want to delete this Seller?</Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>CANCLE</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>DELETE</Button>
          </Box>
        </Box>
      </Modal>
      {/* Add property Modal  */}
      <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add New Seller</Typography>
            <IconButton onClick={handleCloseAddModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={3}>
          <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="Name"
                value={addFormData.Name}
                onChange={handleAddInputChange('Name')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="Email"
                value={addFormData.Email}
                onChange={handleAddInputChange('Email')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="Address"
                value={addFormData.Address}
                onChange={handleAddInputChange('Address')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="Phone"
                type="number"
                value={addFormData.Phone}
                onChange={handleAddInputChange('Phone')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="PropertyID"
                name="PropertyID"
                type="number"
                value={addFormData.PropertyID}
                onChange={handleAddInputChange('PropertyID')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ListedPrice"
                name="ListedPrice"
                type="number"
                value={addFormData.ListedPrice}
                onChange={handleAddInputChange('ListedPrice')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="Status">Status</InputLabel>
                <Select
                  labelId="Status"
                  name="status"
                  value={addFormData.Status}
                  onChange={handleAddInputChange('Status')}
                  required
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Sold">Sold</MenuItem>
                  <MenuItem value="Rented">Rented</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button 
                  variant="outlined" 
                  onClick={handleCloseAddModal}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleAddSeller}
                >
                  Save Agent
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
      </Modal>
    </div>
  );
};

export default SellerTable;
