
import { useEffect, useState } from "react";
import { InputLabel, FormControl, InputAdornment, Table, Select, MenuItem, TableHead, TableBody, TableRow, TableCell, IconButton, Modal, Box, Typography, Grid, TextField, Button, TableContainer, Paper } from "@mui/material";
import { Visibility, Edit, Delete, Close as CloseIcon } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import TablePagination from "@mui/material/TablePagination";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SellerTable = () => {
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
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [Sellers, setSellers] = useState([])
  const [addFormData, setAddFormData] = useState({

    Name: "",
    Email: "",
    Phone: "",
    Address: "",
    PropertyID: "",
    ListedPrice: "",
    Status: "Active",

  });
  const [searchTerm, setSearchTerm] = useState("");
  const [apiSellers, setApiSellers] = useState([]);

  const navigate = useNavigate();
  const handleAddSeller = async () => {
    try {
      const res = await axios.post(`http://localhost:3005/seller/createSeller`, addFormData);
      if (res.data.success) {
        toast.success("Seller added successfully!");
        handleCloseAddModal();
        getAllSellers();
        //reset form data
        setAddFormData({
          Name: "",
          Email: "",
          Phone: "",
          Address: "",
          PropertyID: "",
          ListedPrice: "",
          Status: "Active",
        });
      }
    } catch (error) {
      console.error("error adding Seller", error);
      toast.error(error.res?.data?.message || "failed to add Seller");
    }
  }
  const getAllSellers = async () => {
    try {
      const res = await axios.get(`http://localhost:3005/seller/getAllSeller`);
      console.log("response", res.data);
      setSellers(res.data);
      setApiSellers(res.data)
    }
    catch (error) {
      console.log("error")
    }
  };
  useEffect(() => {
    getAllSellers()
  }, [])
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected Seller ", selectedSeller);

    try {
      const res = await axios.put(`http://localhost:3005/seller/updateSeller/${selectedSeller._id}`, editFormData);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllSellers();
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
      const res = await axios.delete(`http://localhost:3005/seller/deleteSeller/${selectedSeller._id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllSellers();
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };
  const handleView = (Seller) => {
    setSelectedSeller(Seller);
    setViewModalOpen(true);
  };

  const handleEdit = (Seller) => {
    setSelectedSeller(Seller);
    setEditFormData(Seller);
    setEditModalOpen(true);
  };

  const handleDelete = (Seller) => {
    setSelectedSeller(Seller);
    setDeleteModalOpen(true);
  };
  const handleOpenAddModal = () => setAddModalOpen(true);
  const handleCloseAddModal = () => { console.log("hello"); setAddModalOpen(false); }

  const handleCloseViewModal = () => setViewModalOpen(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleEditInputChange = (field) => (e) => {
    setEditFormData({ ...editFormData, [field]: e.target.value });
  };
  const handleAddInputChange = (field) => (e) => {
    setAddFormData({
      ...addFormData, [field]: e.target.value,
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
  //   SellerTitle: "Seller Title",
  //   SellerType: "Seller Type",
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
      setSellers(apiSellers); // Reset to full list when search is empty
      return;
    }

    const filtered = apiSellers.filter((Seller) => {
      return (
        Seller.Name.toLowerCase().includes(value) ||   // Name = gfdgf.includes(gfdgf)
        Seller.Address.toLowerCase().includes(value) ||
        Seller.Phone.toLowerCase().includes(value) ||
        Seller.Email.toString().toLowerCase().includes(value)
      );
    });

    setSellers(filtered);
  };

  return (
    <>
      <Box sx={{
        display: 'flex', justifyContent: 'flex-end', // always right align 
        flexWrap: 'wrap', // wrap on small screens
        gap: 2, mt: 4, mb: 4, px: 2 // padding for small screens
      }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>),
          }} sx={{
            maxWidth: '160px',
            width: '100%',
          }} />

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
          Add Seller
        </Button>
      </Box>

      <div className="table">
        <TableContainer component={Paper} style={{ marginTop: "20px", maxHeight: "400px", overflow: "auto" }}>
          <Table className="w-full border border-gray-300 " >
            <TableHead sx={{ top: 0, background: "#f5f7fa", zIndex: 2, position: "sticky", fontWeight: "bold", padding: "16px", whiteSpace: "nowrap" }}>
              {/* top:0 ka mtlb h ki table ke head ko upr rakhega and z index mtlb table container ke upr rakhega  */}
              <TableRow className="bg-gray-200" border="1px solid black" >
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  SI.No
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  E-mail
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Mobile No
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Address
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Property Id
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Listed Price
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Sellers.length > 0 && Sellers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((Seller, index) => (
                  <TableRow key={Seller.id} className="text-center" sx={{ fontWeight: "500", transition: "all 0.3s ease", "&:hover": { backgroundColor: "rgba(12, 12, 101, 0.05)" } }} >

                    <TableCell sx={{ padding: "16px", textAlign: "center", fontSize: "13px" }} className="border p-2">{index + 1}</TableCell>
                    <TableCell sx={{ padding: "16px", textAlign: "center", fontSize: "13px" }} className="border p-2">{Seller.Name}</TableCell>
                    <TableCell sx={{ padding: "16px", textAlign: "center", fontSize: "13px" }} className="border p-2">{Seller.Email}</TableCell>
                    <TableCell sx={{ padding: "16px", textAlign: "center", fontSize: "13px" }} className="border p-2">{Seller.Phone}</TableCell>
                    <TableCell sx={{ padding: "16px", textAlign: "center", fontSize: "13px" }} className="border p-2">{Seller.Address}</TableCell>
                    <TableCell sx={{ padding: "16px", textAlign: "center", fontSize: "13px" }} className="border p-2">{Seller.PropertyID}</TableCell>
                    <TableCell sx={{ padding: "16px", textAlign: "center", fontSize: "13px" }} className="border p-2">{Seller.ListedPrice}</TableCell>
                    <TableCell sx={{ padding: "16px", textAlign: "center", fontSize: "13px" }} className="border p-2">{Seller.Status}</TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }} className="border p-2">
                      <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                        <IconButton sx={{ color: "blue" }} onClick={() => handleView(Seller)}><Visibility />
                        </IconButton>
                        <IconButton sx={{ color: "grey" }} onClick={() => handleEdit(Seller)}><Edit />
                        </IconButton>
                        <IconButton sx={{ color: "red" }} onClick={() => handleDelete(Seller)}><Delete />
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
              <Typography sx={{ fontWeight: 'bold' }} variant="h6">Seller Details</Typography>
              <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
            </Box>
            {selectedSeller && (
              <Grid container spacing={2} mt={2}>
                {Object.entries(selectedSeller)
                  .filter(([key]) => key !== "__v" && key !== "_id" && key !== "updatedAt" && key !== "createdAt")
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
              <Typography variant="h6">Edit Seller</Typography>
              <IconButton onClick={handleCloseEditModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2} mt={2}>
              {Object.keys(editFormData)
                .filter((field) => field !== "__v" && field !== "_id" && field !== "updatedAt" && field !== "createdAt")
                .map((field) => (
                  <Grid item xs={6} key={field}>
                    {field === "Status" ? (
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={editFormData.Status || ""}
                          onChange={handleEditInputChange("Status")}
                          label="Status"
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    ) : field === "Name" ? (
                      <TextField
                        label="Name"
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                        fullWidth
                        variant="outlined"
                      />
                    ) : field === "Email" ? (
                      <TextField
                        label="E-mail"
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                        fullWidth
                        variant="outlined"
                      />
                    ) : field === "Phone" ? (
                      <TextField
                        label="Phone"
                        type="tel"
                        inputProps={{ maxLength: 10, pattern: "[0-9]{10}" }}
                        value={editFormData[field] || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d{0,10}$/.test(value)) {
                            handleEditInputChange(field)(e);
                          }
                        }}
                        fullWidth
                        variant="outlined"
                        required
                      />
                    )
                      : field === "Address" ? (
                        <TextField
                          label="Address"
                          value={editFormData[field] || ""}
                          onChange={(e) => {
                            let value = e.target.value;

                            if (field === "Address") {
                              // Allow blank or values starting with A-Za-z1-9
                              if (value === '' || /^[A-Za-z1-9]/.test(value)) {
                                // Auto-capitalize first letter
                                value = value.charAt(0).toUpperCase() + value.slice(1);
                              } else {
                                return; // Invalid input, ignore change
                              }
                            }

                            // Use updated value
                            handleEditInputChange(field)({
                              ...e,
                              target: { ...e.target, value }
                            });
                          }}
                          fullWidth
                          variant="outlined"
                        />

                      ) : field === "PropertyID" ? (
                        <TextField
                          label="PropertyID"
                          type="number"
                          value={editFormData[field] || ""}
                          onChange={handleEditInputChange(field)}
                          fullWidth
                          variant="outlined"
                        />
                      ) : field === "ListedPrice" ? (
                        <TextField
                          label="ListedPrice"
                          value={editFormData[field] || ""}
                          onChange={handleEditInputChange(field)}
                          fullWidth
                          variant="outlined"
                        />
                      ) : (
                        <TextField
                          label={field}
                          value={editFormData[field] || ""}
                          onChange={handleEditInputChange(field)}
                          fullWidth
                          variant="outlined"
                        />
                      )}
                  </Grid>
                ))}
            </Grid>
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button variant="standard" onClick={handleCloseEditModal} sx={{ backgroundColor: "grey", color: "white" }}>Cancel</Button>
              <Button variant="contained" onClick={handleUpdate} sx={{ ml: 2, backgroundColor: 'rgb(4, 4,40)' }}>Update</Button>
            </Box>
          </Box>
        </Modal>

        {/* Delete Modal */}
        <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
          <Box sx={deleteModalStyle}>
            <Typography variant="h6">Confirm Delete</Typography>
            <Typography my={2}>Are you sure you want to delete this Seller?</Typography>
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="standard" onClick={handleCloseDeleteModal} sx={{ color: "white", backgroundColor: "grey" }}>CANCLE</Button>
              <Button variant="contained" color="error" onClick={handleConfirmDelete}>DELETE</Button>
            </Box>
          </Box>
        </Modal>

        {/* Add Seller Modal  */}
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
                  sx={{
                    '& .MuiInputLabel-asterisk': {
                      color: 'red',
                    },
                  }}
                  fullWidth
                  label="Name"
                  name="Name"
                  value={addFormData.Name}
                  onChange={handleAddInputChange("Name")}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={{
                    '& .MuiInputLabel-asterisk': {
                      color: 'red',
                    },
                  }}
                  fullWidth
                  label="E-mail"
                  name="Email"
                  value={addFormData.Email}
                  onChange={handleAddInputChange("Email")}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={{
                    '& .MuiInputLabel-asterisk': {
                      color: 'red',
                    },
                  }}
                  fullWidth
                  label="Phone"
                  name="Phone"
                  required
                  inputProps={{ maxLength: 10 }}
                  value={addFormData.Phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      handleAddInputChange("Phone")(e);
                    }
                  }}

                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  sx={{
                    '& .MuiInputLabel-asterisk': {
                      color: 'red',
                    },
                  }}
                  label="Address"
                  name="Address"
                  value={addFormData.Address}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[A-Za-z1-9]/.test(value)) {
                      handleAddInputChange('Address')(e);
                    }
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
                  label="Property Id"
                  name="PropertyID"
                  // type="number"
                  value={addFormData.PropertyID}
                  onChange={handleAddInputChange("PropertyID")}
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
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || (Number(value) > 0)) {
                      handleAddInputChange('ListedPrice')(e);
                    }
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="furnishing-label">Status</InputLabel>
                  <Select
                    labelId="furnishing-label"
                    label="Status"
                    name="Status"
                    value={addFormData.Status}
                    onChange={handleAddInputChange("Status")}
                    required
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="standard"
                    onClick={handleCloseAddModal}
                    sx={{ color: "white", backgroundColor: "grey" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleAddSeller}
                    sx={{ color: "white", backgroundColor: "rgb(4,4,44)" }}
                  >
                    Save Seller
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
        count={Sellers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default SellerTable;