import { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton ,Modal, Box, Typography, Grid, TextField, Button} from "@mui/material";
import { Visibility, Edit, Delete,Close as CloseIcon } from "@mui/icons-material";

const AgentTable = () => {
  const [data, setData] = useState([
    { id: 1, Name: "Rahul Sharma", Email: "rahul@gmail.com", Phone: "23467889", Address: "Adityapur", License: "2243567", Experience: "10 y", Rate: "5000", Status: "Active" },
    { id: 2, Name: "Neha Verma", Email: "neha@gmail.com", Phone: "9876543210", Address: "Ranchi", License: "567889", Experience: "9 y", Rate: "3000", Status: "InActive" },
    { id: 3, Name: "Amit Kumar", Email: "amit@gmail.com", Phone: "8765432109", Address: "Jamshedpur", License: "756653", Experience: "15 y", Rate: "6500", Status: "Active" },
  ]);
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
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [editFormData, setEditFormData] = useState({});

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

  const handleConfirmDelete = () => {
    setData(data.filter(item => item.id !== selectedAgent));
    handleCloseDeleteModal();
  }
  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, Status: newStatus } : row))
    );
  };
  return (
    <div className="p-4">
      <Table className="w-full border border-gray-300" >
        <TableHead sx={{  top: 0, background: "white", zIndex: 2 , position: "sticky",fontWeight:"bolder"}}>
          <TableRow className="bg-gray-200">
            <TableCell  sx={{  fontSize: "12px" ,whiteSpace:"nowrap" }} className="border p-2">S.No</TableCell>
            <TableCell  sx={{  fontSize: "12px" ,whiteSpace:"nowrap"  }} className="border p-2">Name</TableCell>
            <TableCell  sx={{  fontSize: "12px" }} className="border p-2">Email</TableCell>
            <TableCell  sx={{  fontSize: "12px" }} className="border p-2">Phone No.</TableCell>
            <TableCell  sx={{  fontSize: "12px" }} className="border p-2">Address</TableCell>
            <TableCell   sx={{  fontSize: "12px" }}className="border p-2">License no.</TableCell>
            <TableCell sx={{  fontSize: "12px" }}  className="border p-2">Experience</TableCell>
            <TableCell  sx={{  fontSize: "12px" }} className="border p-2">Commition Rate</TableCell>
            <TableCell   sx={{ fontSize: "12px" }}className="border p-2">Status</TableCell>
            <TableCell  sx={{  fontSize: "12px" }} className="border p-2">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="text-center" >
              <TableCell className="border p-2">{row.id}</TableCell>
              <TableCell className="border p-2">{row.Name}</TableCell>
              <TableCell className="border p-2">{row.Email}</TableCell>
              <TableCell className="border p-2">{row.Phone}</TableCell>
              <TableCell className="border p-2">{row.Address}</TableCell>
              <TableCell className="border p-2">{row.License}</TableCell>
              <TableCell className="border p-2">{row.Experience}</TableCell>
              <TableCell className="border p-2">{row.Rate}</TableCell>
              <TableCell className="border p-2">
                <Select
                  value={row.Status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
                </Select>
              </TableCell>
              <TableCell className="border p-2">
                 <div    style={{ display: "flex", gap: "5px", justifyContent: "center" , marginRight:"900px"  }}>
                  <IconButton color="black" onClick={() => handleView(row)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="black" onClick={() => handleEdit(row)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="black" onClick={() => handleDelete(row)}>
                    <Delete />
                  </IconButton>
                 
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
            <Typography variant="h6">Edit Agent</Typography>
            <IconButton onClick={handleCloseEditModal}><CloseIcon /></IconButton>
          </Box>
          <Grid container spacing={2} mt={2}>
            {Object.keys(editFormData).map((field) => (
              <Grid item xs={6} key={field}>
                <TextField
                  label={field}
                  value={editFormData[field] || ''}
                  onChange={handleEditInputChange(field)}
                  fullWidth
                />
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
    </div>
  );
};
export default AgentTable;

