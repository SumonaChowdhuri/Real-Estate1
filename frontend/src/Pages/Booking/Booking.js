import { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";

const TableWithDropdown = () => {
  const [data, setData] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "23467889", address: "Adityapur", checkIN: "2nd March", checkOut: "10th March", status: "pending", Bstatus: "confirmed" },
    { id: 2, name: "Neha Verma", email: "neha@gmail.com", phone: "9876543210", address: "Ranchi", checkIN: "5th March", checkOut: "12th March", status: "paid", Bstatus: "cancled" },
    { id: 3, name: "Amit Kumar", email: "amit@gmail.com", phone: "8765432109", address: "Jamshedpur", checkIN: "7th March", checkOut: "15th March", status: "overview", Bstatus: "complete" },
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
      <Table className="w-full border border-gray-300">
        <TableHead sx={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}>
          <TableRow className="bg-gray-200">
            {[
              "S.No",
              "Name",
              "Email",
              "Phone No.",
              "Address",
              "Check-IN Date",
              "Check-Out Date",
              "Payment Status",
              "Booking Status",
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
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.id}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.name}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.email}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.phone}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.address}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.checkIN}</TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.checkOut}</TableCell>
              <TableCell sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">
                <Select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="overview">Overview</MenuItem>
                </Select>
              </TableCell>
              <TableCell className="border p-2">
                <Select
                  value={row.Bstatus}
                  onChange={(e) => handleBStatusChange(row.id, e.target.value)}
                  className="border p-2 rounded"
                >
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="cancled">Canceled</MenuItem>
                  <MenuItem value="complete">Complete</MenuItem>
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
