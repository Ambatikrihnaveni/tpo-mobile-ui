import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
function createData(id, course,amount,status, date) {
  return {id, course,amount,status, date };
}
const rows = [
  createData(1,'Python', "$900", "completed", "Feb 13,2023",24 ),
  createData(2,'PHP', "$800", "Pending", "Feb 13,2023",37),
  createData(3,'Express'," $1000", "Pending", "Feb 13,2023",24),
  createData(4,'Node', "$1100", "completed", "Feb 13,2023",67),
  createData(5,'React', "$1200", "completed","Feb 13,2023", 49),
  createData(1,'Html', "$900", "completed", "Feb 13,2023",24 ),
  createData(2,'Css', "$800", "Pending", "Feb 13,2023",37),
  createData(3,'Mangodb'," $1000", "Pending", "Feb 13,2023",24),
  createData(4,'Javascript', "$900", "Pending", "Feb 13,2023",67),
  createData(5,'Java', "$1200", "completed","Feb 13,2023", 49),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  style={{color:"#1999dd",fontSize:"15px"}}align="center">Id</TableCell>
            <TableCell style={{color:"#1999dd",fontSize:"15px"}}align="center">Course</TableCell>
            <TableCell style={{color:"#1999dd",fontSize:"15px"}}align="center">Amount</TableCell>
            <TableCell style={{color:"#1999dd",fontSize:"15px"}}align="center">Status</TableCell>
            <TableCell style={{color:"#1999dd",fontSize:"15px"}}align="center">Date</TableCell>
            <TableCell></TableCell>
</TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"align="center">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.course}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="center"><Button variant="contained" color= {row.status=='completed'? "success": "secondary"} style={{minHeight:"20px",minWidth:"100px"}}>{row.status}</Button></TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center"><MoreHorizIcon/></TableCell>
</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}