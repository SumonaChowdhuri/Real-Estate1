import { useState,useEffect } from "react";
import { InputAdornment,Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton  ,TableContainer,Paper, Modal, Box, Typography, Grid, TextField, Button, FormControl, InputLabel} from "@mui/material";
import { Visibility, Edit, Delete , Close as CloseIcon} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"
import { toast } from "react-toastify";
const FinanceTable = () => {
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
  const [selectedFinance, setSelectedFinance] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [finances,setFinance]=useState([]);

  const getAllFinance=async()=>{
    const res=await axios.get(`http://localhost:3005/finance/getAllFinance`)
    console.log(res.data)
    setFinance(res.data);
  }
  useEffect(()=>{
    getAllFinance()
  },[]);
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

  const handleCloseViewModal = () => setViewModalOpen(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleEditInputChange = (field) => (e) => {
    setEditFormData({ ...editFormData, [field]: e.target.value });
  };

  const handleUpdate = () => {
    setData(data.map(item => item.id === editFormData.id ? editFormData : item));
    handleCloseEditModal();
  };

  const handleConfirmDelete = async () => {
    handleCloseDeleteModal();
    try {
      const res = await axios.delete(`http://localhost:3005/Finance/deleteFinance/${selectedFinance._id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllFinance()
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };
  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, status: newStatus } : row))
    );
  };
  const handleLStatusChange = (id, newLStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, Lstatus: newLStatus } : row))
    );
  };
  const handleKStatusChange = (id, newKStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, Kstatus: newKStatus } : row))
    );
  };
  const handlePStatusChange = (id, newPStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, Pstatus: newPStatus } : row))
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
          sx={{
            height: '50px',
            backgroundColor: 'rgb(4, 4,40)',
            color: '#ffffff',
            textTransform: 'capitalize',
          }}
        >
        Add Finance
        </Button>
      </Box>
      <TableContainer className="" component={Paper} style={{ maxHeight: "400px", marginTop: "20px",overflow:"auto" }}>
      <Table className="min-w-full">
        <TableHead  sx={{ position: "sticky", top: 0, background: "white", zIndex: 2  }}>
          <TableRow>
          <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">id</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">Name</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">Amount</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">Transaction Type</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">Category</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">Payment Mode</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">Transaction Date</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">Status</TableCell>
            <TableCell sx={{ fontWeight:"bold"}} classBuyers="border p-2">Action</TableCell>
          </TableRow>
        </TableHead>     
        <TableBody>
          {finances.length>0 && finances.map((Finance,index) => (
            <TableRow key={Finance.id} className="text-center">
              <TableCell  sx={{ padding: "4px", fontSize: "15px" }} className="border p-2">{index+1}</TableCell>
              <TableCell   sx={{ padding: "4px", fontSize: "15px" }} className="border p-2">{Finance.name}</TableCell>
              <TableCell   sx={{ padding: "4px", fontSize: "15px" }} className="border p-2">{Finance.amount}</TableCell>
              <TableCell    className="border p-2">
                <Select
                  value={Finance.transactionType}
                  onChange={(e) => handleStatusChange(Finance.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Income">Income</MenuItem>
                  <MenuItem value="Expence">Expence</MenuItem>
            
                </Select>
             </TableCell>
             <TableCell    sx={{ padding: "4px", fontSize: "15px" }} className="border p-2">
                <Select
                  value={Finance.catogery}
                  onChange={(e) => handleLStatusChange(Finance.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Salary">Salary</MenuItem>
                  <MenuItem value="Payment Rent">Payment Rent</MenuItem>
                  <MenuItem value="Utilities">Utilities</MenuItem>
            
                </Select>
             </TableCell>
             <TableCell  sx={{ padding: "4px", fontSize: "15px" }} className="border p-2">
                <Select
                  value={Finance.PaymentMode}
                  onChange={(e) => handleKStatusChange(Finance.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="cash">cash</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value=" Debit Card">Debit Card</MenuItem>
                </Select>
             </TableCell>
             <TableCell  sx={{ padding: "4px", fontSize: "15px" }}    className="border p-2">{Finance.TransactionDate}</TableCell>
             <TableCell   className="border p-2">
                <Select
                  value={Finance.status}
                  onChange={(e) => handlePStatusChange(Finance.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed </MenuItem>
                  <MenuItem value="Cancled">Cancled</MenuItem>
                </Select>
             </TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "15px" }}  className="border p-2">
              <TableCell className="border p-2">
                 <div    style={{ display: "flex", gap: "5px", justifyContent: "center"   }}>
                  <IconButton sx={{color:"blue"}} onClick={() => handleView(Finance)}>
                    <Visibility />
                  </IconButton>
                  <IconButton sx={{color:"green"}} onClick={() => handleEdit(Finance)}>
                    <Edit />
                  </IconButton>
                  <IconButton sx={{color:"red"}} onClick={() => handleDelete(Finance)}>
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
                  <Typography variant="h6">Finance Details</Typography>
                  <IconButton onClick={handleCloseViewModal}><CloseIcon /></IconButton>
                </Box>
                {selectedFinance && (
                  <Grid container spacing={2} mt={2}>
                    {Object.entries(selectedFinance).map(([key, value]) => (
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
                  <IconButton onClick={handleCloseEditModal}><CloseIcon /></IconButton>
                </Box>
                <Grid container spacing={2} mt={2}>
                  {Object.keys(editFormData).map((field) => (
                    <Grid item xs={6} key={field}>
                     {field === "transactionType"?(
                  <FormControl fullWidth>
                    <InputLabel>transactionType</InputLabel>
                    <Select label="transactionType"
                     value={editFormData.transactionType||''}
                     onChange={handleEditInputChange("transactionType")}
                     >
                     <MenuItem value="Income">Income</MenuItem>
                     <MenuItem value="Expence">Expence</MenuItem>
                    </Select>
                  </FormControl>
                     ):field === "catogery"?(
                      <FormControl fullWidth>
                    <InputLabel>catogery</InputLabel>
                    <Select label="catogery"
                     value={editFormData.catogery||''}
                     onChange={handleEditInputChange("catogery")}
                     >
                     <MenuItem value="Salary">Salary</MenuItem>
                     <MenuItem value="Payment">Payment</MenuItem>
                     <MenuItem value="Utilities">Utilities</MenuItem>
                    </Select>
                  </FormControl>
                     ):field === "PaymentMode"?(
                      <FormControl fullWidth>
                      <InputLabel>PaymentMode</InputLabel>
                      <Select label="PaymentMode"
                       value={editFormData.PaymentMode||''}
                       onChange={handleEditInputChange("PaymentMode")}
                       >
                       <MenuItem value="cash">cash</MenuItem>
                       <MenuItem value="Bank-Transfer">Bank-Transfer</MenuItem>
                       <MenuItem value="UPI">UPI</MenuItem>
                       <MenuItem value="Credit">Credit</MenuItem>
                       <MenuItem value="Debit">Debit</MenuItem>
                      </Select>
                    </FormControl>
                       ):field === "status"?(
                        <FormControl fullWidth>
                      <InputLabel>status</InputLabel>
                      <Select label="status"
                       value={editFormData.status||''}
                       onChange={handleEditInputChange("status")}
                       >
                       <MenuItem value="Pending">Pending</MenuItem>
                       <MenuItem value="Completed">Completed</MenuItem>
                       <MenuItem value="Cancled">Cancled</MenuItem>
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
                <Typography my={2}>Are you sure you want to delete this Finance?</Typography>
                <Box display="flex" justifyContent="center" gap={2}>
                  <Button variant="outlined" onClick={handleCloseDeleteModal}>CANCLE</Button>
                  <Button variant="contained" color="error" onClick={handleConfirmDelete}>DELETE</Button>
                </Box>
              </Box>
            </Modal>
    </div>
  );
};

export default FinanceTable;
