
import { useEffect, useState } from "react";
import {InputLabel,FormControl, InputAdornment, Table, Select, MenuItem, TableHead, TableBody, TableRow, TableCell, IconButton, Modal, Box, Typography, Grid, TextField, Button, TableContainer, Paper } from "@mui/material";
import { Visibility, Edit, Delete, Close as CloseIcon } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import TablePagination from "@mui/material/TablePagination";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

const FinanceTable = () => {
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
  const [selectedFinance, setSelectedFinance] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [Finances, setFinances] = useState([])
  const [addFormData,setAddFormData]=useState({
    
    name:"",
    amount:"",
    transactionType:"",
    catogery:"",
    PaymentMode:"",
    TransactionDate:"",
    status: "",
  
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [apiFinances, setApiFinances] = useState([]);
  
  const navigate = useNavigate();
  const handleAddFinance=async()=>{
    try{
      const res=await axios.post(`http://localhost:3005/finance/createFinance`,addFormData);
      if(res.data.success){
        toast.success("Finance added successfully!");
        handleCloseAddModal();
        getAllFinances();
        //reset form data
        setAddFormData({
          name:"",
          amount:"",
          transactionType:"",
          catogery:"",
          PaymentMode:"",
          TransactionDate:"",
          status: "",
        });
      }
    }catch(error){
      console.error("error adding Finance",error);
      toast.error(error.res?.data?.message||"failed to add Finance");
    }
    }
  const getAllFinances = async () => {
    try {
      const res = await axios.get(`http://localhost:3005/finance/getAllFinance`);
      console.log(res.data);
      setFinances(res.data);
      setApiFinances(res.data)
    }
    catch (error) {
      console.log("error")
    }
  };
  useEffect(() => {
    getAllFinances()
  }, [])
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected Finance ", selectedFinance);
    
    try {
      const res = await axios.put(`http://localhost:3005/finance/updateFinance/${selectedFinance._id}`, editFormData);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllFinances();
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
      const res = await axios.delete(`http://localhost:3005/finance/deleteFinance/${selectedFinance._id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllFinances();
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };
  const handleView = (Finance) => {
    setSelectedFinance(Finance);
    setViewModalOpen(true);
  };

  const handleEdit = (Finance) => {
    setSelectedFinance(Finance);
    setEditFormData(Finance);
    setEditModalOpen(true);
  };

  const handleDelete = (Finance) => {
    setSelectedFinance(Finance);
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
      setFinances(apiFinances); // Reset to full list when search is empty
      return;
    }

    const filtered = apiFinances.filter((Finance) => {
      return (
        Finance.name.toLowerCase().includes(value) ||   // Name = gfdgf.includes(gfdgf)
        Finance.amount.toLowerCase().includes(value) ||
        Finance.TransactionDate.toString().toLowerCase().includes(value)
      );
    });

    setFinances(filtered);
  };
  
  // const handlestatusChange = (id, newstatus) => {
  //   setData((prevData) =>
  //     prevData.map((row) => (row.id === id ? { ...row, status: newstatus } : row))
  //   );
  // };
//   const dropdownFields = ["status", "Furnishing", "FinanceType"]; // edit model mein drop down ke liye ye easy pdega

// const dropdownOptions = {
//   status: ["Available", "Sold", "Rented","Pending"],
//   Furnishing: ["Furnished", "Semi-Furnished", "Unfurnished"],
//   FinanceType: ["Apartment", "House", "Commercial","Land","Villa","Office"],
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
    Add Finance
  </Button>
</Box>

    <div className="table">
      <TableContainer component={Paper} style={{ marginTop: "20px", maxHeight: "400px", overflow: "auto" }}>
        <Table className="w-full border border-gray-300 " >
          <TableHead sx={{ background: "white", position: "sticky", fontWeight: "bold", top: 0, zIndex: 2 }}>
            {/* top:0 ka mtlb h ki table ke head ko upr rakhega and z index mtlb table container ke upr rakhega  */}
            <TableRow className="bg-gray-200" border="1px solid black" >
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">S.No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">Transaction Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">Catogery</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">Payment Mode</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">Transaction Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Finances.length > 0 && Finances.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((Finance, index) => (
              <TableRow key={Finance.id} className="text-center" sx={{ fontWeight: "bold",transition: "all 0.3s ease","&:hover": {backgroundColor: "rgba(12, 12, 101, 0.05)"} }} >

                <TableCell sx={{ fontSize: "12px" ,textAlign: "center",padding: "16px"}} className="border p-2">{index + 1}</TableCell>
                <TableCell sx={{ padding: "16px",textAlign: "center", fontSize: "12px" }} className="border p-2">{Finance.name}</TableCell>
                <TableCell sx={{ padding: "16px",textAlign: "center",fontSize: "12px" }} className="border p-2">{Finance.amount}</TableCell>
                <TableCell sx={{  padding: "16px",textAlign: "center",fontSize: "12px" }} className="border p-2">{Finance.transactionType}</TableCell>
                <TableCell sx={{  padding: "16px",textAlign: "center",fontSize: "12px" }} className="border p-2">{Finance.catogery}</TableCell>
                <TableCell sx={{  padding: "16px",textAlign: "center",fontSize: "12px" }} className="border p-2">{Finance.PaymentMode}</TableCell>
                <TableCell sx={{  padding: "16px",textAlign: "center",fontSize: "12px"}} className="border p-2">{Finance.TransactionDate}</TableCell>
                <TableCell sx={{  padding: "16px",textAlign: "center",fontSize: "12px" }} className="border p-2">{Finance.status}</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }} className="border p-2">
                  <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                    <IconButton sx={{ color: "blue" }} onClick={() => handleView(Finance)}><Visibility />
                    </IconButton>
                    <IconButton sx={{ color: "grey" }} onClick={() => handleEdit(Finance)}><Edit />
                    </IconButton>
                    <IconButton sx={{ color: "red" }} onClick={() => handleDelete(Finance)}><Delete />
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
            <Typography sx={{fontWeight:'bold'}} variant="h6">Finance Details</Typography>
            <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
          </Box>
          {selectedFinance && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedFinance)
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
      <Typography variant="h6">Edit Finance</Typography>
      <IconButton onClick={handleCloseEditModal}>
        <CloseIcon />
      </IconButton>
    </Box>
    <Grid container spacing={2} mt={2}>
      {Object.keys(editFormData)
      .filter((field) => field!=="__v" && field !== "_id"&& field!=="updatedAt" && field!=="createdAt")
      .map((field) => (
        <Grid item xs={6} key={field}>
        {field === "status" ? (
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                        label="status"
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Cancled">Cancled</MenuItem>
                      </Select>
                    </FormControl>
                  ) : field === "catogery" ? (
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                        label="Category"
                      >
                        <MenuItem value="Salary">Salary</MenuItem>
                        <MenuItem value="PaymentRent">Payment Rent</MenuItem>
                        <MenuItem value="Utilities">Utilities</MenuItem>
                      </Select>
                    </FormControl>
                  ) : 
                  field === "PaymentMode" ? (
                    <FormControl fullWidth>
                      <InputLabel>Payment Mode</InputLabel>
                      <Select
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                        label="Payment Mode"
                      >
                        <MenuItem value="Cash">Cash</MenuItem>
                        <MenuItem value="Bank">Bank Transfer</MenuItem>
                        <MenuItem value="Upi">UPI</MenuItem>
                        <MenuItem value="CreditCard">Credit Card</MenuItem>
                        <MenuItem value="DebitCard">Debit Card</MenuItem>

                      </Select>
                    </FormControl>
                  ) : 
                  field === "transactionType" ? (
                    <FormControl fullWidth>
                      <InputLabel>Transaction Type</InputLabel>
                      <Select
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                        label="Transaction Type"
                      >
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
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
          <Typography my={2}>Are you sure you want to delete this Finance?</Typography>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="standard" onClick={handleCloseDeleteModal} sx={{color:"white",backgroundColor:"grey"}}>CANCLE</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>DELETE</Button>
          </Box>
        </Box>
      </Modal>

      {/* Add Finance Modal  */}
      <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add New Finance</Typography>
            <IconButton onClick={handleCloseAddModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={addFormData.name}
                  onChange={handleAddInputChange("name")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
            <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  value={addFormData.amount}
                  onChange={handleAddInputChange("amount")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  label="Transaction Type"
                  name="transactionType"
                  value={addFormData.transactionType}
                  onChange={handleAddInputChange('transactionType')}
                  required
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Sold">Sold</MenuItem>
                  <MenuItem value="Rented">Rented</MenuItem>
                </Select>
              </FormControl>
            </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Catogery</InputLabel>
                <Select
                  label="catogery"
                  name="catogery"
                  value={addFormData.catogery}
                  onChange={handleAddInputChange('catogery')}
                  required
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Sold">Sold</MenuItem>
                  <MenuItem value="Rented">Rented</MenuItem>
                </Select>
              </FormControl>
            </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Payment Mode</InputLabel>
                <Select
                  label="Payment Mode"
                  name="PaymentMode"
                  value={addFormData.PaymentMode}
                  onChange={handleAddInputChange('PaymentMode')}
                  required
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Sold">Sold</MenuItem>
                  <MenuItem value="Rented">Rented</MenuItem>
                </Select>
              </FormControl>
            </Grid>
              <Grid item xs={12} sm={6}>
            <TextField
                  fullWidth
                  label="Transaction Date"
                  name="TransactionDate"
                  value={addFormData.TransactionDate}
                  onChange={handleAddInputChange("TransactionDate")}
                  required
                />
              </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
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
                  onClick={handleAddFinance}
                  sx={{color:"white",backgroundColor:"rgb(4,4,44)"}}
                >
                  Save Finance
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
        count={Finances.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default FinanceTable;