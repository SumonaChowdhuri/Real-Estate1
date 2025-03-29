import { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, IconButton } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";

const TableWithDropdown = () => {
  const [data, setData] = useState([
    { id: 1, name: "Rahul Sharma",amount:"500000",transactionType:"Income",catogery:"Salary",PaymentMode:"cash",TransactionDate:"21st march",status: "Pending" },
    { id: 2, name: "Neha Verma", amount:"800000", transactionType:"Expence",catogery:"Payment Rent",PaymentMode:"UPI",TransactionDate:"1st feb" ,status: "Completed"},
    { id: 3, name: "Amit Kumar",amount:"45000", transactionType:"Expence",catogery:"Utilities",PaymentMode:"Credit Card", TransactionDate:"6th jan", status: "Cancled" },
  ]);

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
        <TableHead  sx={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}>
          <TableRow className="bg-gray-200">
            {[
              "S.No",
              "Name",
              "Amount",
              "TransactionType",
              "Catogery",
              " Payment Mode",
              "Transaction Date",
              "Status",
              "Action",
            ].map((header) => (
              <TableCell key={header} className="border p-2" sx={{ fontWeight: "bold"  ,flex:"1"}}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="text-center">
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.id}</TableCell>
              <TableCell   sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.name}</TableCell>
              <TableCell   sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">{row.amount}</TableCell>
              <TableCell    className="border p-2">
                <Select
                  value={row.transactionType}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Income">Income</MenuItem>
                  <MenuItem value="Expence">Expence</MenuItem>
            
                </Select>
             </TableCell>
             <TableCell    sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">
                <Select
                  value={row.catogery}
                  onChange={(e) => handleLStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Salary">Salary</MenuItem>
                  <MenuItem value="Payment Rent">Payment Rent</MenuItem>
                  <MenuItem value="Utilities">Utilities</MenuItem>
            
                </Select>
             </TableCell>
             <TableCell  sx={{ padding: "4px", fontSize: "12px" }} className="border p-2">
                <Select
                  value={row.PaymentMode}
                  onChange={(e) => handleKStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="cash">cash</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value=" Debit Card">Debit Card</MenuItem>
                </Select>
             </TableCell>
             <TableCell  sx={{ padding: "4px", fontSize: "12px" }}    className="border p-2">{row.TransactionDate}</TableCell>
             <TableCell   className="border p-2">
                <Select
                  value={row.status}
                  onChange={(e) => handlePStatusChange(row.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed </MenuItem>
                  <MenuItem value="Cancled">Cancled</MenuItem>
                </Select>
             </TableCell>
              <TableCell  sx={{ padding: "4px", fontSize: "12px" }}  className="border p-2">
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
