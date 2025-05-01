
import { useEffect, useState } from "react";
import {InputLabel,FormControl, InputAdornment, Table, Select, MenuItem, TableHead, TableBody, TableRow, TableCell, IconButton, Modal, Box, Typography, Grid, TextField, Button, TableContainer, Paper } from "@mui/material";
import { Visibility, Edit, Delete, Close as CloseIcon } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import TablePagination from "@mui/material/TablePagination";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

const BuyerTable = () => {
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
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [Buyers, setBuyers] = useState([])
  const [addFormData,setAddFormData]=useState({
    
    Buyers:"",
    Email:"", 
    Phone:"", 
    Address:"", 
    Room:"", 
    Status:""
  
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [apiBuyers, setApiBuyers] = useState([]);
  
  const navigate = useNavigate();
  const handleAddBuyer=async()=>{
    try{
      const res=await axios.post(`http://localhost:3005/buyers/createBuyers`,addFormData);
      if(res.data.success){
        toast.success("Buyer added successfully!");
        handleCloseAddModal();
        getAllBuyers();
        //reset form data
        setAddFormData({
          Buyers:"",
          Email:"", 
          Phone:"", 
          Address:"", 
          Room:"", 
          Status:""
        });
      }
    }catch(error){
      console.error("error adding Buyer",error);
      toast.error(error.res?.data?.message||"failed to add Buyer");
    }
    }
  const getAllBuyers = async () => {
    try {
      const res = await axios.get(`http://localhost:3005/buyers/getAllBuyers`);
      console.log(res.data);
      setBuyers(res.data);
      setApiBuyers(res.data)
    }
    catch (error) {
      console.log("error")
    }
  };
  useEffect(() => {
    getAllBuyers()
  }, [])
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected Buyer ", selectedBuyer);
    
    try {
      const res = await axios.put(`http://localhost:3005/buyers/updateBuyers/${selectedBuyer._id}`, editFormData);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllBuyers();
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
      const res = await axios.delete(`http://localhost:3005/buyers/deleteBuyers/${selectedBuyer._id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllBuyers();
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };
  const handleView = (Buyer) => {
    setSelectedBuyer(Buyer);
    setViewModalOpen(true);
  };

  const handleEdit = (Buyer) => {
    setSelectedBuyer(Buyer);
    setEditFormData(Buyer);
    setEditModalOpen(true);
  };

  const handleDelete = (Buyer) => {
    setSelectedBuyer(Buyer);
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
    
    
  const handleSearchChange = (e) => {
    console.log("target", e.target);

    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setBuyers(apiBuyers); // Reset to full list when search is empty
      return;
    }

    const filtered = apiBuyers.filter((Buyer) => {
      return (
        Buyer.Buyers.toLowerCase().includes(value) ||   // Name = gfdgf.includes(gfdgf)
        Buyer.Email.toLowerCase().includes(value) ||
        Buyer.Address.toLowerCase().includes(value) ||
        Buyer.Room.toString().toLowerCase().includes(value)
      );
    });

    setBuyers(filtered);
  };
  
  // const handlestatusChange = (id, newstatus) => {
  //   setData((prevData) =>
  //     prevData.map((row) => (row.id === id ? { ...row, status: newstatus } : row))
  //   );
  // };
//   const dropdownFields = ["status", "Furnishing", "BuyerType"]; // edit model mein drop down ke liye ye easy pdega

// const dropdownOptions = {
//   status: ["Available", "Sold", "Rented","Pending"],
//   Furnishing: ["Furnished", "Semi-Furnished", "Unfurnished"],
//   BuyerType: ["Apartment", "House", "Commercial","Land","Villa","Office"],
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
    Add Buyer
  </Button>
</Box>

    <div className="table">
      <TableContainer component={Paper} style={{ marginTop: "20px", maxHeight: "400px", overflow: "auto" }}>
        <Table className="w-full border border-gray-300 " >
          <TableHead sx={{ background: "white", position: "sticky", fontWeight: "bold", top: 0, zIndex: 2 }}>
            {/* top:0 ka mtlb h ki table ke head ko upr rakhega and z index mtlb table container ke upr rakhega  */}
            <TableRow className="bg-gray-200" border="1px solid black" >
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">S.No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">Buyers</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">Address</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">Room</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Buyers.length > 0 && Buyers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((Buyer, index) => (
              <TableRow key={Buyer.id} className="text-center" sx={{ fontWeight: "bold",transition: "all 0.3s ease","&:hover": {backgroundColor: "rgba(12, 12, 101, 0.05)"} }} >

                <TableCell sx={{ fontSize: "12px" ,textAlign: "center",padding: "16px"}} className="border p-2">{index + 1}</TableCell>
                <TableCell sx={{ padding: "16px",textAlign: "center", fontSize: "12px" }} className="border p-2">{Buyer.Buyers}</TableCell>
                <TableCell sx={{ padding: "16px",textAlign: "center",fontSize: "12px" }} className="border p-2">{Buyer.Email}</TableCell>
                <TableCell sx={{  padding: "16px",textAlign: "center",fontSize: "12px" }} className="border p-2">{Buyer.Phone}</TableCell>
                <TableCell sx={{  padding: "16px",textAlign: "center",fontSize: "12px" }} className="border p-2">{Buyer.Address}</TableCell>
                <TableCell sx={{  padding: "16px",textAlign: "center",fontSize: "12px" }} className="border p-2">{Buyer.Room}</TableCell>
                <TableCell sx={{  padding: "16px",textAlign: "center",fontSize: "12px" }} className="border p-2">{Buyer.Status}</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }} className="border p-2">
                  <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                    <IconButton sx={{ color: "blue" }} onClick={() => handleView(Buyer)}><Visibility />
                    </IconButton>
                    <IconButton sx={{ color: "grey" }} onClick={() => handleEdit(Buyer)}><Edit />
                    </IconButton>
                    <IconButton sx={{ color: "red" }} onClick={() => handleDelete(Buyer)}><Delete />
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
            <Typography sx={{fontWeight:'bold'}} variant="h6">Buyer Details</Typography>
            <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
          </Box>
          {selectedBuyer && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedBuyer)
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
      <Typography variant="h6">Edit Buyer</Typography>
      <IconButton onClick={handleCloseEditModal}>
        <CloseIcon />
      </IconButton>
    </Box>
    <Grid container spacing={2} mt={2}>
      {Object.keys(editFormData)
      .filter((field) => field!=="__v" && field !== "_id"&& field!=="updatedAt" && field!=="createdAt")
      .map((field) => (
        <Grid item xs={6} key={field}>
        {field === "Status" ? (
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                        label="Status"
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="InActive">InActive</MenuItem>
                      </Select>
                    </FormControl>
                  ) :  (
                    <TextField
                      label={field}
                      value={editFormData[field] || ""}
                      onChange={handleEditInputChange(field)}
                      fullWidth
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
          <Typography my={2}>Are you sure you want to delete this Buyer?</Typography>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="standard" onClick={handleCloseDeleteModal} sx={{color:"white",backgroundColor:"grey"}}>CANCLE</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>DELETE</Button>
          </Box>
        </Box>
      </Modal>

      {/* Add Buyer Modal  */}
      <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add New Buyer</Typography>
            <IconButton onClick={handleCloseAddModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
                  fullWidth
                  label="Buyers"
                  name="Buyers"
                  value={addFormData.Buyers}
                  onChange={handleAddInputChange("Buyers")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
            <TextField
                  fullWidth
                  label="Email"
                  name="Email"
                  value={addFormData.Email}
                  onChange={handleAddInputChange("Email")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
            <TextField
                  fullWidth
                  label="Phone"
                  name="Phone"
                  value={addFormData.Phone}
                  onChange={handleAddInputChange("Phone")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
            <TextField
                  fullWidth
                  label="Address"
                  name="Address"
                  value={addFormData.Address}
                  onChange={handleAddInputChange("Address")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
            <TextField
                  fullWidth
                  label="Room"
                  name="Room"
                  value={addFormData.Room}
                  onChange={handleAddInputChange("Room")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  name="Status"
                  value={addFormData.Status}
                  onChange={handleAddInputChange('Status')}
                  required
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
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
                  onClick={handleAddBuyer}
                  sx={{color:"white",backgroundColor:"rgb(4,4,44)"}}
                >
                  Save Buyer
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
        count={Buyers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default BuyerTable;