import { useState ,useEffect} from "react";
import {InputLabel,FormControl, InputAdornment,Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton ,Modal, Box, Typography, Grid, TextField, Button,TableContainer,Paper} from "@mui/material";
import { Visibility, Edit, Delete,Close as CloseIcon } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { toast } from "react-toastify";
// import {useNavigate} from "react-router-dom";
const SiteTable = () => {
  

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
  const [selectedSite, setSelectedSite] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  
  const [Sites,setSites]=useState([]);
  const [searchTerm,setSearchTerm]=useState("");
  const[apiSites,setApiSites]=useState([]);
  
  const [addFormData,setAddFormData]=useState({
    propertyId :"",
    visitorsName:"",
    contactNo:"",
    agentId:"",
    scheduleDate:"",
    visitStatus:"Scheduled",
  });
  const handleAddSite=async()=>{
    try{
      const res=await axios.post(`http://localhost:3005/SiteVisit/createSite`,addFormData);
      if(res.data.success){
        toast.success("Site added successfully!");
        handleCloseAddModal();
        getAllSites();
        //reset form data
        setAddFormData({
            propertyId :"",
            visitorsName:"",
            contactNo:"",
            agentId:"",
            scheduleDate:"",
            visitStatus:"Scheduled",
        });
      }
    }catch(error){
      console.error("error adding Site",error);
      toast.error(error.res?.data?.message||"failed to add Site");
    }
    }
  const getAllSites=async()=>{
    try{
      const res=await axios.get(`http://localhost:3005/SiteVisit/getSite`)
      console.log(res.data);
      setSites(res.data);
      setApiSites(res.data);
    }
    catch(error){
      console.log("Error");
    }
  }
  useEffect(()=>{
    getAllSites()
  },[]);
  const handleView = (Site) => {
    setSelectedSite(Site);
    setViewModalOpen(true);
  };

  const handleEdit = (Site) => {
    setSelectedSite(Site);
    setEditFormData(Site);
    setEditModalOpen(true);
  };

  const handleDelete = (Site) => {
    setSelectedSite(Site);
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
        setSites(apiSites); // Reset to full list when search is empty
        return;
    }

    const filtered = apiSites.filter((Site) => {
      return (
        Site.Name.toLowerCase().includes(value) ||   // Name = gfdgf.includes(gfdgf)
        Site.Address.toLowerCase().includes(value) ||
        Site.License.toLowerCase().includes(value) ||
        Site.Rate.toString().toLowerCase().includes(value)
      );
    });

    setSites(filtered);
};

const handleUpdate = async () => {
  handleCloseEditModal();
  try {
    const res = await axios.put(`http://localhost:3005/SiteVisit/updateSite/${selectedSite._id}`,editFormData);
    if (res.data.success) {
      toast.success(res.data.message);
      getAllSites();
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
      const res = await axios.delete(`http://localhost:3005/SiteVisit/deleteSite/${selectedSite._id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllSites()
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };

  return (
    <div className="p-4">Site Table
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
        Add Site
        </Button>
      </Box>
      <TableContainer component={Paper} style={{ maxHeight: "400px", marginTop: "20px",overflow:"auto"}}>
      <Table className="w-full border border-gray-300"  sx={{ whiteSpace:"nowrap"}}>
        <TableHead sx={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}>
          <TableRow className="bg-gray-200">
            <TableCell  sx={{  fontWeight:"bold" ,whiteSpace:"nowrap" }} className="border p-2">S.No</TableCell>
            <TableCell  sx={{  fontWeight:"bold" ,whiteSpace:"nowrap"  }} className="border p-2">Property ID</TableCell>
            <TableCell  sx={{  fontWeight:"bold"}} className="border p-2">Visitors Name</TableCell>
            <TableCell  sx={{  fontWeight:"bold" }} className="border p-2">Contact No</TableCell>
            <TableCell  sx={{  fontWeight:"bold" }} className="border p-2">Agent Id</TableCell>
            <TableCell   sx={{  fontWeight:"bold" }}className="border p-2">Schedule Date</TableCell>
            <TableCell   sx={{ fontWeight:"bold"}}className="border p-2">Visit Status</TableCell>
            <TableCell  sx={{  fontWeight:"bold" }} className="border p-2">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Sites.length>0 && Sites.map((Site,index) => (
            <TableRow key={Site.id} className="text-center" >
              <TableCell className="border p-2">{index+1}</TableCell>
              <TableCell className="border p-2">{Site.propertyId}</TableCell>
              <TableCell className="border p-2">{Site.visitorsName}</TableCell>
              <TableCell className="border p-2">{Site.contactNo}</TableCell>
              <TableCell className="border p-2">{Site.agentId}</TableCell>
              <TableCell className="border p-2">{Site.scheduleDate}</TableCell>
              <TableCell className="border p-2">{Site.visitStatus}</TableCell>
              <TableCell className="border p-2">
                 <div    style={{ display: "flex", gap: "5px", justifyContent: "center"  }}>
                  <IconButton sx={{color:"blue"}} onClick={() => handleView(Site)}>
                    <Visibility />
                  </IconButton>
                  <IconButton sx={{color:"green"}} onClick={() => handleEdit(Site)}>
                    <Edit />
                  </IconButton>
                  <IconButton sx={{color:"red"}} onClick={() => handleDelete(Site)}>
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
            <Typography variant="h6">Site Details</Typography>
            <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
          </Box>
          {selectedSite && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedSite)
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
      <Typography variant="h6">Edit Site</Typography>
      <IconButton onClick={handleCloseEditModal}>
        <CloseIcon />
      </IconButton>
    </Box>
    <Grid container spacing={2} mt={2}>
      {Object.keys(editFormData)
      .filter((field) => field !== "createdAt" && field !== "updatedAt" && field !== "__v" && field!=="_id")
      .map((field) => (
        <Grid item xs={6} key={field}>
          {field === "visitStatus" ? (
            <FormControl fullWidth>
              <InputLabel>Visit Status</InputLabel>
              <Select
                label="visitStatus"
                value={editFormData.visitStatus || ''}
                onChange={handleEditInputChange("visitStatus")}
              >
                <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="Cancled">Cancled</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
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
          <Typography my={2}>Are you sure you want to delete this Site?</Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>CANCLE</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>DELETE</Button>
          </Box>
        </Box>
      </Modal>

       {/* Add Site Modal  */}
       <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add New Site</Typography>
            <IconButton onClick={handleCloseAddModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="propertyId"
                name="propertyId"
                value={addFormData.propertyId}
                onChange={handleAddInputChange('propertyId')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="visitorsName"
                name="visitorsName"
                value={addFormData.visitorsName}
                onChange={handleAddInputChange('visitorsName')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact No"
                name="contactNo"
                type="tel"
                // pattern="[0-9]{10}" 
                // maxLength="10" 
                value={addFormData.contactNo}
                onChange={handleAddInputChange('contactNo')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Agent Id"
                name="agentId"
                type="number"
                value={addFormData.agentId}
                onChange={handleAddInputChange('agentId')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Schedule Date"
                name="scheduleDate"
                type="date"
                value={addFormData.scheduleDate}
                variant="Standard"
                onChange={handleAddInputChange('scheduleDate')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="visitStatus">Visit Status</InputLabel>
                <Select
                  labelId="Visit Status"
                  name="visitStatus"
                  value={addFormData.visitStatus}
                  onChange={handleAddInputChange('visitStatus')}
                  required
                >
                  <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="Cancled">Cancled</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                  
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
                  onClick={handleAddSite}
                >
                  Save Site
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
      </Modal>
    </div>
  );
};
export default SiteTable;

