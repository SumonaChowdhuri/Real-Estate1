import { useState ,useEffect} from "react";
import {InputLabel,FormControl, InputAdornment,Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton ,Modal, Box, Typography, Grid, TextField, Button,TableContainer,Paper} from "@mui/material";
import { Visibility, Edit, Delete,Close as CloseIcon } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { toast } from "react-toastify";
const ProjectTable = () => {

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
  const [selectedproject, setSelectedproject] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  
  const [projects,setproject]=useState([]);
  const [searchTerm,setSearchTerm]=useState("");
  const[apiproject,setApiproject]=useState([]);
  
  const [addFormData,setAddFormData]=useState({
    projectName:"",
    location:"",
    developerName:"",
    startDate:"",
    endDate:"",
    totalUnits:"",
    status:"Completed",
  });
  const handleAddproject=async()=>{
    try{
      const res=await axios.post(`http://localhost:3005/project/createproject`,addFormData);
      if(res.data.success){
        toast.success("project added successfully!");
        handleCloseAddModal();
        getAllproject();
        //reset form data
        setAddFormData({
          projectName:"",
          location:"",
          developerName:"",
          startDate:"",
          endDate:"",
          totalUnits:"",
          status:"Completed",
        });
      }
    }catch (error) {
      console.error("error adding project", error);
      toast.error(error.response?.data?.message || "Failed to add project");
    }
    }
  const getAllproject=async()=>{
    try{
      const res=await axios.get(`http://localhost:3005/project/getproject`)
      console.log(res.data);
      setproject(res.data);
      setApiproject(res.data);
    }
    catch(error){
      console.log("error");
    }
  }
  useEffect(()=>{
    getAllproject()
  },[]);
  const handleView = (project) => {
    setSelectedproject(project);
    setViewModalOpen(true);
  };

  const handleEdit = (project) => {
    setSelectedproject(project);
    setEditFormData(project);
    setEditModalOpen(true);
  };

  const handleDelete = (project) => {
    setSelectedproject(project);
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
  
  
  const handleSearchChange = (e) => {
    console.log("target", e.target);
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
        setApiproject(apiproject); // Reset to full list when search is empty
        return;
    }

    const filtered = apiproject.filter((project) => {
      return (
        project.projectName.toLowerCase().includes(value) ||   // Name = gfdgf.includes(gfdgf)
        project.developerName.toLowerCase().includes(value) ||
        project.location.toLowerCase().includes(value) ||
        project.totalUnits.toString().toLowerCase().includes(value)
      );
    });

    setproject(filtered);
};

const handleUpdate = async () => {
  handleCloseEditModal();
  try {
    const res = await axios.put(`http://localhost:3005/project/updateproject/${selectedproject._id}`,editFormData);
    if (res.data.success) {
      toast.success(res.data.message);
      getAllproject();
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
      const res = await axios.delete(`http://localhost:3005/project/deleteproject/${selectedproject._id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllproject()
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-4">Project Table
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
        Add Project
        </Button>
      </Box>
      <TableContainer component={Paper} style={{ maxHeight: "400px", marginTop: "20px",overflow:"auto"}}>
      <Table className="w-full border border-gray-300"  sx={{ whiteSpace:"nowrap"}}>
        <TableHead sx={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}>
          <TableRow className="bg-gray-200">
            <TableCell  sx={{  fontWeight:"bold" ,whiteSpace:"nowrap" }} className="border p-2">S.No</TableCell>
            <TableCell  sx={{  fontWeight:"bold" ,whiteSpace:"nowrap"  }} className="border p-2">Project Name</TableCell>
            <TableCell  sx={{  fontWeight:"bold"}} className="border p-2">Location</TableCell>
            <TableCell  sx={{  fontWeight:"bold" }} className="border p-2">Developer Name</TableCell>
            <TableCell  sx={{  fontWeight:"bold" }} className="border p-2">Start Date</TableCell>
            <TableCell  sx={{  fontWeight:"bold" }}className="border p-2">End Date</TableCell>
            <TableCell  sx={{  fontWeight:"bold" }}  className="border p-2">Total Units</TableCell>
            <TableCell  sx={{ fontWeight:"bold"}}className="border p-2">Status</TableCell>
            <TableCell  sx={{  fontWeight:"bold" }} className="border p-2">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.length>0 && projects.map((project,index) => (
            <TableRow key={project.id} className="text-center" >
              <TableCell className="border p-2">{index+1}</TableCell>
              <TableCell className="border p-2">{project.projectName}</TableCell>
              <TableCell className="border p-2">{project.location}</TableCell>
              <TableCell className="border p-2">{project.developerName}</TableCell>
              <TableCell className="border p-2">{project.startDate}</TableCell>
              <TableCell className="border p-2">{project.endDate}</TableCell>
              <TableCell className="border p-2">{project.totalUnits}</TableCell>
              <TableCell className="border p-2">{project.status}</TableCell>
              <TableCell className="border p-2">
                 <div    style={{ display: "flex", gap: "5px", justifyContent: "center"  }}>
                  <IconButton sx={{color:"blue"}} onClick={() => handleView(project)}>
                    <Visibility />
                  </IconButton>
                  <IconButton sx={{color:"green"}} onClick={() => handleEdit(project)}>
                    <Edit />
                  </IconButton>
                  <IconButton sx={{color:"red"}} onClick={() => handleDelete(project)}>
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
            <Typography variant="h6">Project Details</Typography>
            <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
          </Box>
          {selectedproject && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedproject)
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
      <Typography variant="h6">Edit project</Typography>
      <IconButton onClick={handleCloseEditModal}>
        <CloseIcon />
      </IconButton>
    </Box>
    <Grid container spacing={2} mt={2}>
      {Object.keys(editFormData)
      .filter((field) => field !== "createdAt" && field !== "updatedAt" && field !== "__v" && field!=="_id")
      .map((field) => (
        <Grid item xs={6} key={field}>
          {field === "status" ? (
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={editFormData.status || ''}
                onChange={handleEditInputChange("status")}
              >
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Upcoming">Upcoming</MenuItem>
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
          <Typography my={2}>Are you sure you want to delete this project?</Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>CANCLE</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>DELETE</Button>
          </Box>
        </Box>
      </Modal>

       {/* Add projecteloper Modal  */}
       <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add New Project</Typography>
            <IconButton onClick={handleCloseAddModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={3}>
          <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Name"
                name="projectName"
                value={addFormData.projectName}
                onChange={handleAddInputChange('projectName')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={addFormData.location}
                onChange={handleAddInputChange('location')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Developer Name"
                name="developerName"
                value={addFormData.developerName}
                onChange={handleAddInputChange('developerName')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Start Date"
                name="Start Date"
                value={addFormData.startDate}
                onChange={handleAddInputChange('startDate')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="endDate"
                value={addFormData.endDate}
                onChange={handleAddInputChange('endDate')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Units"
                name="totalUnits"
                value={addFormData.totalUnits}
                onChange={handleAddInputChange('totalUnits')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="Status"
                  name="status"
                  value={addFormData.status}
                  onChange={handleAddInputChange('status')}
                  required
                >
                 <MenuItem value="Ongoing">Ongoing</MenuItem>
                 <MenuItem value="Completed">Completed</MenuItem>
                 <MenuItem value="Upcoming">Upcoming</MenuItem> 
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
                  onClick={handleAddproject}
                >
                  Save Project
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
      </Modal>
    </div>
  );
};
export default ProjectTable;

