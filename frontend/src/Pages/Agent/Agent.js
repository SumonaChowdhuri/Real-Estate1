import { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";

const TableWithDropdown = () => {
  const [data, setData] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "23467889", address: "Adityapur", license: "2243567", Experience: "10 y", Rate: "5000", status: "Active" },
    { id: 2, name: "Neha Verma", email: "neha@gmail.com", phone: "9876543210", address: "Ranchi", license: "567889", Experience: "9 y", Rate: "3000", status: "InActive" },
    { id: 3, name: "Amit Kumar", email: "amit@gmail.com", phone: "8765432109", address: "Jamshedpur", license: "756653", Experience: "15 y", Rate: "6500", status: "Active" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, status: newStatus } : row))
    );
  };

  const handleBStatusChange = (id, newBStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, Bstatus: newBStatus } : row))
    );
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((row) => row.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit function triggered for ID: ${id}`);
  };

  const handleView = (id) => {
    alert(`View function triggered for ID: ${id}`);
  };

  return (
    <div className="p-4">
      <Table className="w-full border border-gray-300" >
        <TableHead sx={{  top: 0, background: "white", zIndex: 2 , position: "sticky",fontWeight:"bolder"}}>
          <TableRow className="bg-gray-200">
            <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">S.No</TableCell>
            <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">Name</TableCell>
            <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">Email</TableCell>
            <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">Phone No.</TableCell>
            <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">Address</TableCell>
            <TableCell   sx={{ padding: "4px", fontSize: "12px" }}className="border p-2">License no.</TableCell>
            <TableCell sx={{ padding: "4px", fontSize: "12px" }}  className="border p-2">Experience</TableCell>
            <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">Commition Rate</TableCell>
            <TableCell   sx={{ padding: "4px", fontSize: "12px" }}className="border p-2">Status</TableCell>
            <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="text-center" >
              <TableCell className="border p-2">{row.id}</TableCell>
              <TableCell className="border p-2">{row.name}</TableCell>
              <TableCell className="border p-2">{row.email}</TableCell>
              <TableCell className="border p-2">{row.phone}</TableCell>
              <TableCell className="border p-2">{row.address}</TableCell>
              <TableCell className="border p-2">{row.license}</TableCell>
              <TableCell className="border p-2">{row.Experience}</TableCell>
              <TableCell className="border p-2">{row.Rate}</TableCell>
              <TableCell className="border p-2">
                <Select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
                </Select>
              </TableCell>
              <TableCell className="border p-2">
                 <div    style={{ display: "flex", gap: "5px", justifyContent: "center" , marginRight:"900px"  }}>
                  <IconButton color="black" onClick={() => handleView(row.id)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="black" onClick={() => handleEdit(row.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="black" onClick={() => handleDelete(row.id)}>
                    <Delete />
                  </IconButton>
                 
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableWithDropdown;
