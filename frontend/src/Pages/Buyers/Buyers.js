import { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";

const TableWithDropdown = () => {
  const [data, setData] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "23467889", address: "Adityapur", Room: "Normal",  status: "Active" },
    { id: 2, name: "Neha Verma", email: "neha@gmail.com", phone: "9876543210", address: "Ranchi", Room: "Delux", status: "InActive"},
    { id: 3, name: "Amit Kumar", email: "amit@gmail.com", phone: "8765432109", address: "Jamshedpur",Room : "luxury", status: "Active" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, status: newStatus } : row))
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
      <Table className="w-full border border-gray-300">
        <TableHead sx={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}>
          <TableRow className="bg-gray-200">
            {[
              "S.No",
              "Name",
              "Email",
              "Phone No.",
              "Address",
              "Room No.",
              "Status",
              "Action",
            ].map((header) => (
              <TableCell key={header} className="border p-2" sx={{ fontWeight: "bold" }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="text-center">
              <TableCell   sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.id}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.name}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.email}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.phone}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.address}</TableCell>
              <TableCell sx={{ padding: "4px", fontSize: "12px" }}  className="border p-2">{row.Room}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">
                <Select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
            
                </Select>
             </TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">
                <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
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
