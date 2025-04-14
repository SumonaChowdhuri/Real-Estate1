import { useState,useEffect } from "react";
import { InputAdornment,Table,Select,MenuItem, TableHead, TableBody, TableRow, TableCell, IconButton, Modal, Box, Typography, Grid, TextField, Button,TableContainer,Paper, FormControl, InputLabel} from "@mui/material";
import { Visibility, Edit, Delete, Close as CloseIcon } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { toast } from "react-toastify";
const Leasetable = () => {
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
  const [leases,setLeases]=useState([])
  const [addModalOpen,setAddModalOpen]=useState(false);
  const [searchTerm,setSearchTerm]=useState("");
  const[apiLease,setapiLease]=useState([]);
  const [addFormData,setAddFormData]=useState({
    Name:"",
    Email:"",
    Address:"",
    Phone:"",
    CheckIN:"",
    CheckOut:"",
    Status:"paid",
    BookingStatus:"confirmed"
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
  const handleAddLease=async()=>{
    try{
      const res=await axios.post(`http://localhost:3005/Lease/createLease`,addFormData);
      if(res.data.success){
        toast.success("Lease added successfully!");
        handleCloseAddModal();
        getAllleases();
        //reset form data
        setAddFormData({
          Name:"",
          Email:"",
          Phone:"",
          Address:"",
          StartDate:"",
          EndDate:"",
          MonthlyRent:"",
          Deposit:"",
          Status:"paid",
          LeaseStatus:"confirmed"
        });
      }
    }catch (error) {
      console.error("Full error response:", error.response);
      toast.error(error.response?.data?.details || "Failed to add Booking");
    }
  };
  const getAllleases=async()=>{
    try{
      const res= await axios.get(`http://localhost:3005/lease/getAllLease`);
      console.log(res.data);
      setLeases(res.data);
      setapiLease(res.data);
    }
    catch(error){
      console.log("error");
    }
  }
  useEffect(()=>{
    getAllleases()
  },[])

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

  const handleSearchChange = (e) => {
    console.log("target", e.target);
    
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
        setLeases(apiLease); // Reset to full list when search is empty
        return;
    }

    const filtered = apiLease.filter((lease) => {
      return (
        lease.Name.toLowerCase().includes(value) ||   // Name = gfdgf.includes(gfdgf)
        lease.Address.toLowerCase().includes(value)
      );
    });

    setLeases(filtered);
};

const handleUpdate = async () => {
  handleCloseEditModal();
  try {
    const res = await axios.put(`http://localhost:3005/Lease/updateLease/${selectedLease._id}`,editFormData);
    if (res.data.success) {
      toast.success(res.data.message);
      getAllleases();
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
      const res = await axios.delete(`http://localhost:3005/Lease/deleteLease/${selectedLease._id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllleases()
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

  // const handleLeaseStatusChange = (id, newLeaseStatus) => {
  //   setData((prevData) =>
  //     prevData.map((row) => (row.id === id ? { ...row, LeaseStatus: newLeaseStatus } : row))
  //   );
  // };
  const dropdownfields=["Status","LeaseStatus"]
  const dropdownOptions={
    LeaseStatus:["Active" ,"Terminated","Expired"],
    Status:["Pending","Paid","Overdue"]
  }
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
         Add Lease
        </Button>
      </Box>
      <TableContainer component={Paper} style={{ maxHeight: "400px", marginTop: "20px",overflow:"auto" }}>
      <Table className="w-full border border-gray-300">
        <TableHead sx={{ position: "sticky", top: 0, background: "white", zIndex: 2,whiteSpace:"nowrap"}}>
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
          {leases.length>0 && leases.map((Lease,index) => (
            <TableRow key={Lease.id} className="text-center" sx={{fontWeight:"bold"}} >
             
              <TableCell   sx={{ padding: "4px", fontSize: "15px" , justifyItems:"center"}} className="border p-2">{index+1}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "15px" }}  className="border p-2">{Lease.Name}</TableCell>
              <TableCell   sx={{ padding: "4px", fontSize: "15px" }}className="border p-2">{Lease.Email}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "15px" }} className="border p-2">{Lease.Phone}</TableCell>
              <TableCell sx={{ padding: "4px", fontSize: "15px" }}  className="border p-2">{Lease.Address}</TableCell>
              <TableCell   sx={{ padding: "4px", fontSize: "15px" }} className="border p-2">{Lease.StartDate}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "15px" }} className="border p-2">{Lease.EndDate}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "15px" }}className="border p-2">{Lease.MonthlyRent}</TableCell>
              <TableCell sx={{ padding: "4px", fontSize: "15px" }} className="border p-2">{Lease.Deposit}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "15px" }}className="border p-2">{Lease.Status}</TableCell>
              <TableCell sx={{ padding: "2px", fontSize: "12px" }} className="border p-2">{Lease.LeaseStatus}</TableCell>
              <TableCell  sx={{ fontWeight:"bolder" }} className="border p-2">
              <TableCell className="border p-2">
                 <div    style={{ display: "flex", gap: "5px", justifyContent: "center"  }}>
                  <IconButton sx={{color:"blue"}} onClick={() => handleView(Lease)}>
                    <Visibility />
                  </IconButton>
                  <IconButton sx={{color:"green"}} onClick={() => handleEdit(Lease)}>
                    <Edit />
                  </IconButton>
                  <IconButton sx={{color:"red"}} onClick={() => handleDelete(Lease)}>
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
            <Typography variant="h6">Lease Details</Typography>
            <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
          </Box>
          {selectedLease && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedLease)
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
            <Typography variant="h6">Edit Lease</Typography>
            <IconButton onClick={handleCloseEditModal}><CloseIcon /></IconButton>
          </Box>
          <Grid container spacing={2} mt={2}>
            {Object.keys(editFormData)
            .filter((field) => field !== "createdAt" && field !== "updatedAt" && field !== "__v" && field!=="_id")
            .map((field) => (
              <Grid item xs={6} key={field}>
                {dropdownfields.includes(field)?(
                  <FormControl fullWidth>
                    <InputLabel>{field}</InputLabel>
                    <Select
                     label={field}
                    value={editFormData[field] || ''}
                    onChange={handleEditInputChange(field)}>
                {dropdownOptions[field].map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
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
          <Typography my={2}>Are you sure you want to delete this Lease?</Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>CANCLE</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>DELETE</Button>
          </Box>
        </Box>
      </Modal>

      {/* add modal */}
      <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add New Lease</Typography>
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
                label="StartDate"
                name="StartDate"
                value={addFormData.StartDate}
                onChange={handleAddInputChange('StartDate')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="EndDate"
                name="EndDate"
                value={addFormData.EndDate}
                onChange={handleAddInputChange('EndDate')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="MonthlyRent"
                name="MonthlyRent"
                value={addFormData.MonthlyRent}
                onChange={handleAddInputChange('MonthlyRent')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Deposit"
                name="Deposit"
                value={addFormData.Deposit}
                onChange={handleAddInputChange('Deposit')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="Status">Status</InputLabel>
                <Select
                  labelId="Status"
                  name="Status"
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
                <InputLabel id="LeaseStatus">Lease Status</InputLabel>
                <Select
                  labelId="LeaseStatus"
                  name="LeaseStatus"
                  value={addFormData.LeaseStatus}
                  onChange={handleAddInputChange('LeaseStatus')}
                  required
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Terminated">Terminated</MenuItem>
                  <MenuItem value="Expired">Expired</MenuItem>
                  
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
                  onClick={handleAddLease}
                >
                  Save Lease
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
      </Modal>
    </div>
  );
};

export default Leasetable;
