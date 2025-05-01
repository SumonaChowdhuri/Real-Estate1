
import { useEffect, useState } from "react";
import {InputLabel,FormControl, InputAdornment, Table, Select, MenuItem, TableHead, TableBody, TableRow, TableCell, IconButton, Modal, Box, Typography, Grid, TextField, Button, TableContainer, Paper } from "@mui/material";
import { Visibility, Edit, Delete, Close as CloseIcon } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import TablePagination from "@mui/material/TablePagination";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

const PropertyTable = () => {
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
    // textAlign: 'center'
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen,setAddModalOpen]=useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [properties, setProperties] = useState([])
  const [addFormData,setAddFormData]=useState({
    
    Name:"",
    PropertyType:"",
    Address:"",
    Price:"",
    AreaSqft:"",
    Furnishing:"",
    status:"Available",
  
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [apiProperties, setApiProperties] = useState([]);
  
  const navigate = useNavigate();
  const handleAddProperty=async()=>{
    try{
      const res=await axios.post(`http://localhost:3005/Property/createProperty`,addFormData);
      if(res.data.success){
        toast.success("property added successfully!");
        handleCloseAddModal();
        getAllProperties();
        //reset form data
        setAddFormData({
          Name:"",
          PropertyType:"",
          Address:"",
          Price:"",
          AreaSqft:"",
          Furnishing:"",
          status:"Available"
        });
      }
    }catch(error){
      console.error("error adding property",error);
      toast.error(error.res?.data?.message||"failed to add property");
    }
    }
  const getAllProperties = async () => {
    try {
      const res = await axios.get(`http://localhost:3005/Property/getAllProperty`);
      console.log(res.data);
      setProperties(res.data);
      setApiProperties(res.data)
    }
    catch (error) {
      console.log("error")
    }
  };
  useEffect(() => {
    getAllProperties()
  }, [])
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected property ", selectedProperty);
    
    try {
      const res = await axios.put(`http://localhost:3005/Property/updateProperty/${selectedProperty._id}`, editFormData);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllProperties();
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
      const res = await axios.delete(`http://localhost:3005/Property/deleteProperty/${selectedProperty._id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllProperties();
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };
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
  const handleOpenAddModal = () => setAddModalOpen(true);
  const handleCloseAddModal = () => {console.log("hello");setAddModalOpen(false);}
    
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };
  // const fieldLabels = {
  //   propertyTitle: "Property Title",
  //   propertyType: "Property Type",
  //   address: "Address",
  //   price: "Price",
  //   areaSqft: "Area Sqft",
  //   furnishing: "furnishing",
  //   status: "Status",


  //   // Add all other fields you want to show with custom labels
  // };
  
    
  const handleSearchChange = (e) => {
    console.log("target", e.target);

    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setProperties(apiProperties); // Reset to full list when search is empty
      return;
    }

    const filtered = apiProperties.filter((property) => {
      return (
        property.Name.toLowerCase().includes(value) ||   // Name = gfdgf.includes(gfdgf)
        property.Address.toLowerCase().includes(value) ||
        property.PropertyType.toLowerCase().includes(value) ||
        property.Price.toString().toLowerCase().includes(value)
      );
    });

    setProperties(filtered);
  };
  
  // const handlestatusChange = (id, newstatus) => {
  //   setData((prevData) =>
  //     prevData.map((row) => (row.id === id ? { ...row, status: newstatus } : row))
  //   );
  // };
//   const dropdownFields = ["status", "Furnishing", "PropertyType"]; // edit model mein drop down ke liye ye easy pdega

// const dropdownOptions = {
//   status: ["Available", "Sold", "Rented","Pending"],
//   Furnishing: ["Furnished", "Semi-Furnished", "Unfurnished"],
//   PropertyType: ["Apartment", "House", "Commercial","Land","Villa","Office"],
// };
  return (
    <> 
    <Box sx={{display: 'flex',justifyContent: 'flex-end', // always right align 
      flexWrap: 'wrap', // wrap on small screens
      gap: 2,mt: 4,mb: 4,px: 2 // padding for small screens
    }}>
    <TextField
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearchChange}
      InputProps={{startAdornment: (
        <InputAdornment position="start">
        <SearchIcon />
        </InputAdornment>),
    }}sx={{
      maxWidth: '160px',
      width: '100%',}}/>
  
  <Button
    variant="contained"
    startIcon={<AddIcon />}
    onClick={handleOpenAddModal}
    sx={{
      // height: '50px',
      maxWidth: '160px',
      width: '100%',
      backgroundColor: 'rgb(4, 4,40)',
      color: '#ffffff',
      textTransform: 'capitalize',
      whiteSpace: 'nowrap',
    }}
  >
    Add Property
  </Button>
</Box>

    <div className="table">
      <TableContainer component={Paper} style={{ marginTop: "20px", maxHeight: "400px", overflow: "auto",maxWidth: 1350, whiteSpace: "nowrap" }}>
        <Table className="w-full border border-gray-300 " >
          <TableHead sx={{ background: "white", position: "sticky", fontWeight: "bold", top: 0, zIndex: 2 }}>
            {/* top:0 ka mtlb h ki table ke head ko upr rakhega and z index mtlb table container ke upr rakhega  */}
            <TableRow className="bg-gray-200" border="1px solid black" >
              <TableCell sx={{ fontWeight: "bold" ,textAlign: "center"}} className="border p-2">S.No</TableCell>
              <TableCell sx={{ fontWeight: "bold",textAlign: "center" }} className="border p-2">Property Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" ,textAlign: "center"}} className="border p-2">Property Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" ,textAlign: "center"}} className="border p-2">Address</TableCell>
              <TableCell sx={{ fontWeight: "bold" ,textAlign: "center"}} className="border p-2"> Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" ,textAlign: "center"}} className="border p-2">Area(Sqft)</TableCell>
              <TableCell sx={{ fontWeight: "bold" ,textAlign: "center"}} className="border p-2"> Furnishing</TableCell>
              <TableCell sx={{ fontWeight: "bold" ,textAlign: "center"}} className="border p-2">status</TableCell>
              <TableCell sx={{ fontWeight: "bold" ,textAlign: "center"}} className="border p-2">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.length > 0 && properties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((property, index) => (
              <TableRow key={property.id} className="text-center" sx={{ fontWeight: "bold",transition: "all 0.3s ease","&:hover": {backgroundColor: "rgba(12, 12, 101, 0.05)"} }} >

                <TableCell sx={{ fontSize: "12px" ,textAlign: "center",padding: "4px"}} className="border p-2">{index + 1}</TableCell>
                <TableCell sx={{ padding: "4px",textAlign: "center", fontSize: "12px" }} className="border p-2">{property.Name}</TableCell>
                <TableCell sx={{ padding: "4px",textAlign: "center",fontSize: "12px" }} className="border p-2">{property.PropertyType}</TableCell>
                <TableCell sx={{  padding: "4px",textAlign: "center",fontSize: "12px" }} className="border p-2">{property.Address}</TableCell>
                <TableCell sx={{  padding: "4px",textAlign: "center",fontSize: "12px" }} className="border p-2">{property.Price}</TableCell>
                <TableCell sx={{  padding: "4px",textAlign: "center",fontSize: "12px" }} className="border p-2">{property.AreaSqft}</TableCell>
                <TableCell sx={{  padding: "4px",textAlign: "center",fontSize: "12px"}} className="border p-2">{property.Furnishing}</TableCell>
                <TableCell sx={{  padding: "4px",textAlign: "center",fontSize: "12px" }} className="border p-2">{property.status}</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }} className="border p-2">
                  <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                    <IconButton sx={{ color: "blue" }} onClick={() => handleView(property)}><Visibility />
                    </IconButton>
                    <IconButton sx={{ color: "grey" }} onClick={() => handleEdit(property)}><Edit />
                    </IconButton>
                    <IconButton sx={{ color: "red" }} onClick={() => handleDelete(property)}><Delete />
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
            <Typography sx={{fontWeight:'bold'}} variant="h6">Property Details</Typography>
            <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
          </Box>
          {selectedProperty && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedProperty)
              .filter(([key]) => key!=="__v" && key !== "_id"&& key!=="updatedAt" && key!=="createdAt")
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
      <Typography variant="h6">Edit Property</Typography>
      <IconButton onClick={handleCloseEditModal}>
        <CloseIcon />
      </IconButton>
    </Box>
    <Grid container spacing={2} mt={2}>
      {Object.keys(editFormData)
      .filter((field) => field!=="__v" && field !== "_id"&& field!=="updatedAt" && field!=="createdAt")
      .map((field) => (
        <Grid item xs={6} key={field}>
          {field === "Name"? (
            <FormControl fullWidth>
              <InputLabel>Property Title</InputLabel>
          <Select
            label="Property Title"
            value={editFormData[field] || ""}
            onChange={handleEditInputChange(field)}
          >
            <MenuItem value="Luxury">Luxury</MenuItem>
            <MenuItem value="3BHK">3BHK</MenuItem>
            <MenuItem value="Apartment">Apartment</MenuItem>
          </Select>
        </FormControl>
      ) : field === "PropertyType" ? (
        <FormControl fullWidth>
          <InputLabel>Property Type</InputLabel>
          <Select
            label="Property Type"
            value={editFormData[field] || ""}
            onChange={handleEditInputChange(field)}
          >
            <MenuItem value="Apartment">Apartment</MenuItem>
            <MenuItem value="House">House</MenuItem>
            <MenuItem value="Commercial">Commercial</MenuItem>
            <MenuItem value="Land">Land</MenuItem>
            <MenuItem value="Office">Office</MenuItem>
            <MenuItem value="Villa">Villa</MenuItem>
          </Select>
        </FormControl>
      ) : field === "Furnishing" ? (
        <FormControl fullWidth>
          <InputLabel>Furnishing</InputLabel>
          <Select
            label="Furnishing"
            value={editFormData[field] || ""}
            onChange={handleEditInputChange(field)}
          >
            <MenuItem value="Furnished">Furnished</MenuItem>
            <MenuItem value="Semi-Furnished">Semi-Furnished</MenuItem>
            <MenuItem value="Unfurnished">Unfurnished</MenuItem>
          </Select>
        </FormControl>
      ) : field === "status" ? (
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={editFormData[field] || ""}
            onChange={handleEditInputChange(field)}
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Sold">Sold</MenuItem>
            <MenuItem value="Rented">Rented</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <TextField 
        type={field === "Price" || field === "AreaSqft" ? "number" : "text"}
        label={
          field === "AreaSqft"
            ? "Area (Sqft)"
            : field.charAt(0).toUpperCase() + field.slice(1)
        }
        value={editFormData[field] || ""}
        onChange={(e) => {
          let value = e.target.value;
      
          if (field === "Address") {
            // Address ke liye: should start with A-Za-z1-9
            if (value === '' || /^[A-Za-z1-9]/.test(value)) {
              // Auto-capitalize first letter
              value = value.charAt(0).toUpperCase() + value.slice(1);
              handleEditInputChange(field)({ ...e, target: { ...e.target, value } });
            }
          } else if (field === "Price") {
            // Price ke liye: greater than 0
            if (value === '' || (Number(value) > 0)) {
              handleEditInputChange(field)(e);
            }
          } else if (field === "AreaSqft") {
            // Price ke liye: greater than 0
            if (value === '' || (Number(value) > 0)) {
              handleEditInputChange(field)(e);
            }
          } 
          else {
            // Baaki fields normal
            handleEditInputChange(field)(e);
          }
        }}
        fullWidth
        required
      />
          )}
        </Grid>
      ))}
    </Grid>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="standard" onClick={handleCloseEditModal} sx={{backgroundColor:"grey",color:"white"}}>Cancel</Button>
            <Button variant="contained" onClick={handleUpdate} sx={{ ml: 2 , backgroundColor: 'rgb(4, 4,40)'}}>Update</Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <Box sx={deleteModalStyle}>
          <Typography variant="h6">Confirm Delete</Typography>
          <Typography my={2}>Are you sure you want to delete this property?</Typography>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="standard" onClick={handleCloseDeleteModal} sx={{color:"white",backgroundColor:"grey"}}>CANCLE</Button>
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="propertyTitle">Property Title</InputLabel>
                <Select
                  label="Property Title"
                  name="Name"
                  value={addFormData.Name}
                  onChange={handleAddInputChange('Name')}
                  required
                >
                  <MenuItem value="Luxury">Luxury</MenuItem>
                  <MenuItem value="3BHK">3BHK</MenuItem>
                  <MenuItem value="Apartment">Apartment</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="PropertyType">Property Type</InputLabel>
                <Select
                  label="Property Type"
                  name="PropertyType"
                  value={addFormData.PropertyType}
                  onChange={handleAddInputChange('PropertyType')}
                  required
                >
                  <MenuItem value="Apartment">Apartment</MenuItem>
                  <MenuItem value="House">House</MenuItem>
                  <MenuItem value="Commercial">Commercial</MenuItem>
                  <MenuItem value="Land">Land</MenuItem>
                  <MenuItem value="Office">Office</MenuItem>
                  <MenuItem value="Villa">Villa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{
                  '& .MuiInputLabel-asterisk': {
                    color: 'red',},
                }}
                fullWidth
                label="Address"
                name="Address"
                value={addFormData.Address}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[A-Za-z1-9]/.test(value)) {
                  handleAddInputChange('Address')(e);}
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{
                  '& .MuiInputLabel-asterisk': {
                    color: 'red',
                  },
                }}
                fullWidth
                label="Price"
                name="Price"
                type="number"
                value={addFormData.Price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) > 0)) {
                  handleAddInputChange('Price')(e);}
                }}
              required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{
                  '& .MuiInputLabel-asterisk': {
                    color: 'red',
                  },
                }}
                fullWidth
                label="Area (Sqft)"
                name="AreaSqft"
                type="number"
                value={addFormData.AreaSqft}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) > 0)) {
                  handleAddInputChange('AreaSqft')(e);}
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="Furnishing">Furnishing</InputLabel>
                <Select
                  sx={{
                    '& .MuiInputLabel-asterisk': {
                      color: 'red',
                    },
                  }}
                  label="Furnishing"
                  name="Furnishing"
                  value={addFormData.Furnishing}
                  onChange={handleAddInputChange('Furnishing')}
                  required
                >
                  <MenuItem value="Furnished">Furnished</MenuItem>
                  <MenuItem value="Semi-Furnished">Semi-Furnished</MenuItem>
                  <MenuItem value="Unfurnished">Unfurnished</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  label="Status"
                  name="status"
                  value={addFormData.status}
                  onChange={handleAddInputChange('status')}
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
                  variant="standard" 
                  onClick={handleCloseAddModal}
                  sx={{color:"white",backgroundColor:"grey"}}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  onClick={handleAddProperty}
                  sx={{color:"white",backgroundColor:"rgb(4,4,44)"}}
                >
                  Save Property
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
    <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={properties.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default PropertyTable;