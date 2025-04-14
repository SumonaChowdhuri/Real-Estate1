import {useEffect, useState } from "react";
import {InputLabel, InputAdornment,Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton ,Modal, Box, Typography, Grid, TextField, Button ,TableContainer,Paper, FormControl} from "@mui/material";
import { Visibility, Edit, Delete, Close as CloseIcon  } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"; 
import { toast } from "react-toastify";
const BookingTable = () => {
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
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [Booking,setBooking]=useState([])
  const [addModalOpen,setAddModalOpen]=useState(false);
  const [searchTerm,setSearchTerm]=useState("");
  const[apiBooking,setapiBooking]=useState([]);

  const [addFormData,setAddFormData]=useState({
    Name:"",
    Email:"",
    Address:"",
    Phone:"",
    CheckIN:"",
    CheckOut:"",
    Status:"paid",
    Bookingstatus:"confirmed"
  })
   
  const handleAddInputChange = (field) => (e) => {
    setAddFormData({
      ...addFormData,[field]:e.target.value,
    });
  };
  const handleOpenAddModal=()=> setAddModalOpen(true);
  const handleCloseAddModal = () => { 
    console.log("hello");
    setAddModalOpen(false);
  }
  const handleAddBooking=async()=>{
    try{
      const res=await axios.post(`http://localhost:3005/Booking/createBooking`,addFormData);
      if(res.data.success){
        toast.success("Booking added successfully!");
        console.log("Form Data being sent:", addFormData);
        handleCloseAddModal();
        getAllBooking();
        //reset form data
        setAddFormData({
          Name:"",
          Email:"",
          Phone:"",
          Address:"",
          CheckIN:"",
          CheckOut:"",
          Status:"paid",
          Bookingstatus:"confirmed"
        });
      }
    }catch (error) {
      console.error("Full error response:", error.response);
      toast.error(error.response?.data?.details || "Failed to add Booking");
    }
  };
  
  const getAllBooking=async()=>{
    try{
      const res=await axios.get(`http://localhost:3005/booking/getAllbooking`)
      console.log(res.data);
      setBooking(res.data);
      setapiBooking(res.data);
    }
    catch(error){
      console.log("Error");
    }
  }
  useEffect(()=>{
      getAllBooking()
    },[]);

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

  const handleSearchChange = (e) => {
    console.log("target", e.target);
    
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
        setBooking(apiBooking); // Reset to full list when search is empty
        return;
    }

    const filtered = apiBooking.filter((Booking) => {
      return (
        Booking.Name.toLowerCase().includes(value) ||   // Name = gfdgf.includes(gfdgf)
        Booking.Address.toLowerCase().includes(value)
      );
    });

    setBooking(filtered);
};

const handleUpdate = async () => {
  handleCloseEditModal();
  try {
    const res = await axios.put(`http://localhost:3005/Booking/updateBooking/${selectedBooking._id}`,editFormData);
    if (res.data.success) {
      toast.success(res.data.message);
      getAllBooking();
      setEditFormData({});
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};
  const handleConfirmDelete = async () => {
    handleCloseDeleteModal();
    try {
      const res = await axios.delete(`http://localhost:3005/Booking/deleteBooking/${selectedBooking._id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllBooking()
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };

  // const handleStatusChange = (id, newStatus) => {
  //   setData((prevData) =>
  //     prevData.map((row) => (row.id === id ? { ...row, Status: newStatus } : row))
  //   );
  // };

  // const handleBookingstatusChange = (id, newBookingstatus) => {
  //   setData((prevData) =>
  //     prevData.map((row) => (row.id === id ? { ...row, Bookingstatus: newBookingstatus } : row))
  //   );
  // };

  

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
         Add Booking
        </Button>
      </Box>
      <TableContainer component={Paper} style={{ maxHeight: "400px", marginTop: "20px",overflow:"auto"  }}>
    <Table className="w-full border border-gray-300" >
      <TableHead sx={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}>
        <TableRow className="bg-gray-200">
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">id</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Name</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Email</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2"> Phone</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Address</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">CheckIN</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2"> CheckOut</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Status</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Bookingtatus</TableCell>
          <TableCell sx={{ fontWeight:"bold"}} className="border p-2">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          {Booking.length>0 && Booking.map((Booking,index) => (
            <TableRow key={Booking.id} className="text-center">
              <TableCell  sx={{  fontSize: "15px" }} className="border p-2">{index+1}</TableCell>
              <TableCell  sx={{  fontSize: "15px" }} className="border p-2">{Booking.Name}</TableCell>
              <TableCell  sx={{ fontSize: "15px" }} className="border p-2">{Booking.Email}</TableCell>
              <TableCell  sx={{  fontSize: "15px" }} className="border p-2">{Booking.Phone}</TableCell>
              <TableCell  sx={{  fontSize: "15px" }} className="border p-2">{Booking.Address}</TableCell>
              <TableCell  sx={{  fontSize: "15px" }} className="border p-2">{Booking.CheckIN}</TableCell>
              <TableCell  sx={{  fontSize: "15px" }} className="border p-2">{Booking.CheckOut}</TableCell>
              <TableCell sx={{  fontSize: "15px" }} className="border p-2">{Booking.Status}</TableCell>
              <TableCell sx={{  fontSize: "15px" }} className="border p-2">{Booking.Bookingstatus}</TableCell>
              <TableCell  sx={{ fontSize: "15px" }} className="border p-2">
              <TableCell className="border p-2">
                 <div    style={{ display: "flex", gap: "5px", justifyContent: "center"  }}>
                  <IconButton sx={{color:"blue"}} onClick={() => handleView(Booking)}>
                    <Visibility />
                  </IconButton>
                  <IconButton sx={{color:"green"}} onClick={() => handleEdit(Booking)}>
                    <Edit />
                  </IconButton>
                  <IconButton sx={{color:"red"}} onClick={() => handleDelete(Booking)}>
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
            <Typography variant="h6">Booking Details</Typography>
            <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
          </Box>
          {selectedBooking && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedBooking)
              .filter(([key]) => key!=="__v" && key !== "_id" )
              .map(([key, value]) => (
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
            {Object.keys(editFormData)
            .filter((field) => field !== "createdAt" && field !== "updatedAt" && field !== "__v" && field!=="_id")
            .map((field) => (
              
              <Grid item xs={6} key={field}>
                 
                {field === "Status"?(
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select label="Status"
                     value={editFormData.Status||''}
                     onChange={handleEditInputChange("Status")}
                     >
                     <MenuItem value="pending">pending</MenuItem>
                  <MenuItem value="paid">paid</MenuItem>
                  <MenuItem value="overview">overview</MenuItem>
                    </Select>
                  </FormControl>
                ):field === "Bookingstatus"?(
                  <FormControl fullWidth>
                    <InputLabel>Bookingstatus</InputLabel>
                    <Select label="Bookingstatus"
                     value={editFormData.Status||''}
                     onChange={handleEditInputChange("Bookingstatus")}
                     >
                     <MenuItem value="confirmed">confirmed</MenuItem>
                  <MenuItem value="canceled">canceled</MenuItem>
                  <MenuItem value="complete">complete</MenuItem>
                    </Select>
                  </FormControl>
                ):(
                  
                <TextField
                  label={field}
                  value={editFormData[field] || ''}
                  onChange={handleEditInputChange(field)}
                  fullWidth
                />
            )}
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
      {/* Add Booking Modal  */}
      <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add New Booking</Typography>
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
                label="Phone"
                name="Phone"
                value={addFormData.Phone}
                onChange={handleAddInputChange('Phone')}
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
                label="CheckIN"
                name="CheckIN"
                type="number"
                value={addFormData.CheckIN}
                onChange={handleAddInputChange('CheckIN')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CheckOut"
                name="CheckOut"
                type="number"
                value={addFormData.CheckOut}
                onChange={handleAddInputChange('CheckOut')}
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
                  <MenuItem value="pending">pending</MenuItem>
                  <MenuItem value="paid">paid</MenuItem>
                  <MenuItem value="overview">overview</MenuItem>
                  
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="Bookingstatus">Bookingstatus</InputLabel>
                <Select
                  labelId="Bookingstatus"
                  name="Bookingstatus"
                  value={addFormData.Bookingstatus}
                  onChange={handleAddInputChange('Bookingstatus')}
                  required
                >
                  <MenuItem value="confirmed">confirmed</MenuItem>
                  <MenuItem value="cancled">Canceled</MenuItem>
                  <MenuItem value="complete">complete</MenuItem>
                  
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
                  onClick={handleAddBooking}
                >
                  Save Booking
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
      </Modal>
    </div>
  );
};

export default BookingTable;
