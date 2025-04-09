import { useState ,useEffect} from "react";
import {InputLabel,FormControl, InputAdornment,Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton ,Modal, Box, Typography, Grid, TextField, Button,TableContainer,Paper} from "@mui/material";
import { Visibility, Edit, Delete,Close as CloseIcon } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
const AgentTable = () => {
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
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  
  const [Agents,setAgents]=useState([]);
  const [searchTerm,setSearchTerm]=useState("");
  const[apiAgents,setApiAgents]=useState([]);
  
  const [addFormData,setAddFormData]=useState({
    Name:"",
    Email:"",
    Address:"",
    License:"",
    Experience:"",
    Rate:"",
    Status:"Available",
  });
  const getAllAgents=async()=>{
    try{
      const res=await axios.get(`http://localhost:3005/Agent/getAllAgent`)
      console.log(res.data);
      setAgents(res.data);
      setApiAgents(res.data);
    }
    catch(error){
      console.log("Error");
    }
  }
  useEffect(()=>{
    getAllAgents()
  },[]);
  const handleView = (Agent) => {
    setSelectedAgent(Agent);
    setViewModalOpen(true);
  };

  const handleEdit = (Agent) => {
    setSelectedAgent(Agent);
    setEditFormData(Agent);
    setEditModalOpen(true);
  };

  const handleDelete = (Agent) => {
    setSelectedAgent(Agent);
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
  
  const handleAddAgent=async()=>{
    try{
      const res=await axios.post(`http://localhost:3005/Agent/createAgent`,addFormData);
      if(res.data.success){
        toast.success("Agent added successfully!");
        handleCloseAddModal();
        getAllAgents();
        //reset form data
        setAddFormData({
          Name:"",
          Email:"",
          Address:"",
          License:"",
          Experience:"",
          Rate:"",
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
        setAgents(apiAgents); // Reset to full list when search is empty
        return;
    }

    const filtered = apiAgents.filter((Agent) => {
      return (
        Agent.Name.toLowerCase().includes(value) ||   // Name = gfdgf.includes(gfdgf)
        Agent.Address.toLowerCase().includes(value) ||
        Agent.License.toLowerCase().includes(value) ||
        Agent.Rate.toString().toLowerCase().includes(value)
      );
    });

    setAgents(filtered);
};

  const handleUpdate = () => {
    console.log("Updating Agent:", editFormData);
    // Here you would typically make an API call to update the Agent
    handleCloseEditModal();
  }

  const handleConfirmDelete = async () => {
    handleCloseDeleteModal();
    try {
      const res = await axios.delete(`http://localhost:3005/Agent/deleteAgent/${selectedAgent._id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllAgents()
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
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
        Add Agent
        </Button>
      </Box>
      <TableContainer component={Paper} style={{ maxHeight: "400px", marginTop: "20px",overflow:"auto"}}>
      <Table className="w-full border border-gray-300"  sx={{ whiteSpace:"nowrap"}}>
        <TableHead sx={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}>
          <TableRow className="bg-gray-200">
            <TableCell  sx={{  fontWeight:"bold" ,whiteSpace:"nowrap" }} className="border p-2">S.No</TableCell>
            <TableCell  sx={{  fontWeight:"bold" ,whiteSpace:"nowrap"  }} className="border p-2">Name</TableCell>
            <TableCell  sx={{  fontWeight:"bold"}} className="border p-2">Email</TableCell>
            <TableCell  sx={{  fontWeight:"bold" }} className="border p-2">Phone No.</TableCell>
            <TableCell  sx={{  fontWeight:"bold" }} className="border p-2">Address</TableCell>
            <TableCell   sx={{  fontWeight:"bold" }}className="border p-2">License no.</TableCell>
            <TableCell sx={{  fontWeight:"bold" }}  className="border p-2">Experience</TableCell>
            <TableCell  sx={{  fontWeight:"bold" }} className="border p-2">Rate</TableCell>
            <TableCell   sx={{ fontWeight:"bold"}}className="border p-2">Status</TableCell>
            <TableCell  sx={{  fontWeight:"bold" }} className="border p-2">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Agents.length>0 && Agents.map((Agent,index) => (
            <TableRow key={Agent.id} className="text-center" >
              <TableCell className="border p-2">{index+1}</TableCell>
              <TableCell className="border p-2">{Agent.Name}</TableCell>
              <TableCell className="border p-2">{Agent.Email}</TableCell>
              <TableCell className="border p-2">{Agent.Phone}</TableCell>
              <TableCell className="border p-2">{Agent.Address}</TableCell>
              <TableCell className="border p-2">{Agent.License}</TableCell>
              <TableCell className="border p-2">{Agent.Experience}</TableCell>
              <TableCell className="border p-2">{Agent.Rate}</TableCell>
              <TableCell className="border p-2">
                <Select
                  value={Agent.Status}
                  onChange={(e) => handleStatusChange(Agent.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
                </Select>
              </TableCell>
              <TableCell className="border p-2">
                 <div    style={{ display: "flex", gap: "5px", justifyContent: "center"  }}>
                  <IconButton sx={{color:"blue"}} onClick={() => handleView(Agent)}>
                    <Visibility />
                  </IconButton>
                  <IconButton sx={{color:"green"}} onClick={() => handleEdit(Agent)}>
                    <Edit />
                  </IconButton>
                  <IconButton sx={{color:"red"}} onClick={() => handleDelete(Agent)}>
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
            <Typography variant="h6">Agent Details</Typography>
            <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
          </Box>
          {selectedAgent && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedAgent).map(([key, value]) => (
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
      <IconButton onClick={handleCloseEditModal}>
        <CloseIcon />
      </IconButton>
    </Box>
    <Grid container spacing={2} mt={2}>
      {Object.keys(editFormData).map((field) => (
        <Grid item xs={6} key={field}>
          {field === "Status" ? (
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={editFormData.Status || ''}
                onChange={handleEditInputChange("Status")}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="InActive">InActive</MenuItem>
              </Select>
            </FormControl>
          ) : (
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
          <Typography my={2}>Are you sure you want to delete this Agent?</Typography>
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
            <Typography variant="h6" fontWeight="bold">Add New Property</Typography>
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
                label="License"
                name="License"
                type="number"
                value={addFormData.License}
                onChange={handleAddInputChange('License')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Experience"
                name="Experience"
                type="number"
                value={addFormData.Experience}
                onChange={handleAddInputChange('Experience')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rate"
                name="Rate"
                type="number"
                value={addFormData.Rate}
                onChange={handleAddInputChange('Rate')}
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
                  onClick={handleAddAgent}
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
export default AgentTable;

