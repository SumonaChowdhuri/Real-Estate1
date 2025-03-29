import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const columns = [
  { id: 'SI_no', label: 'SI NO.', flex: 1 },
  { id: 'propertyTitle', label: 'Property Title', flex: 1, align: 'right' },
  { id: 'propertyType', label: 'Property Type', flex: 1, align: 'right' },
  { id: 'address', label: 'Address', flex: 1, align: 'right' },
  { id: 'price', label: 'Price', flex: 1, align: 'right', format: (value) => value.toFixed(2) },
  { id: 'areaSqft', label: 'Area sqft', flex: 1, align: 'right', format: (value) => value.toFixed(2) },
  { id: 'furnishing', label: 'Furnishing', flex: 1, align: 'right' },
  { id: 'status', label: 'Status', flex: 1, align: 'right' },
  { id: 'action', label: 'Action', flex: 1, align: 'center' },
];

function createData(SI_no, propertyTitle, propertyType, address, price, areaSqft, furnishing, status) {
  return { SI_no, propertyTitle, propertyType, address, price, areaSqft, furnishing, status };
}

const rows = [
  createData('1', 'Luxury', 'Apartment', 'Ranchi', 100000, 100, 'furnished', 'sold'),
  createData('2', 'Luxury', 'Apartment', 'Ranchi', 100000, 100, 'furnished', 'sold'),
  createData('3','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold'),
  createData('4','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold'),
  createData('5','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold'),
  createData('6','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold' ),
  createData('7','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold' ),
  createData('8','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold' ),
  createData('9','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold' ),
  createData('10','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold'),
  createData('11','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold' ),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to first page when rows per page changes
  };

  const handleDelete = (id) => {
    console.log('Delete item with ID:', id);
    // You can perform your delete logic here
  };

  const handleEdit = (id) => {
    console.log('Edit item with ID:', id);
    // You can open a modal or perform your edit logic here
  };

  const handleView = (id) => {
    console.log('View item with ID:', id);
    // You can show more details of the item here
  };

  return (
    <Paper sx={{ width: '100%',overflow: 'hidden' }}>
      <TableContainer className="table" sx={{ maxHeight: 440, fontSize: '12px', marginLeft: '20px', marginTop: '0px', marginRight: '20px' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bolder', fontSize: '14px' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Adjust row slice based on page and rowsPerPage
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.SI_no}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'action' ? (
                          <div>
                            <IconButton onClick={() => handleView(row.SI_no)} color="black">
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton onClick={() => handleEdit(row.SI_no)} color="black">
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(row.SI_no)} color="black">
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        ) : (
                          column.format && typeof value === 'number' ? column.format(value) : value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]} // Added more options for rows per page
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}