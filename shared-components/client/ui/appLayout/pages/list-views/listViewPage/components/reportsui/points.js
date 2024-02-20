import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Div from "@jumbo/shared/Div";
import MoreVertIcon from '@mui/icons-material/MoreVert';
function createData(name,number,point,button, points,data,table,enter,value) {
  return {name,number,point,button, points,data,table,enter,value};
}
const rows = [
  createData('Nagur','76%','83%','72%','89%','78%','72%','66%','72%'),
  createData('Rajiya','89%','88%','77%','85%','92%','87%','92%','89%'),
  createData('Swarna','84%','85%','75%','89%','72%','77%','92%','79%'),
  createData('Sunny','80%','85%','66%','82%','72%','78%','82%','89%'),
  createData('Selva','81%','85%','76%','80%','52%','77%','92%','69%'),
  createData('Sai','84%','80%','76%','80%','72%','73%','92%','79%'),
  createData('Koti','87%','83%','74%','81%','72%','76%','92%','79%'),  
  createData('Ravindra','84%','63%','81%','69%','62%','76%','82%','89%'),

];
export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"sx={{borderStyle:"solid"}}><b>Competencies</b></TableCell>
            <TableCell align="right"sx={{borderStyle:"solid",color:"blue"}}><b>Frontend Developer</b></TableCell>
            <TableCell align="right"sx={{borderStyle:"solid",color:"blue"}}><b>HTML 5</b></TableCell>
            <TableCell align="right"sx={{borderStyle:"solid",color:"blue"}}><b>Backend</b></TableCell>
            <TableCell align="right"sx={{borderStyle:"solid",color:"blue"}}><b>Full stack</b></TableCell>
            <TableCell align="right"sx={{borderStyle:"solid",color:"blue"}}><b>Frontend</b> </TableCell>
            <TableCell align="right"sx={{borderStyle:"solid",color:"blue"}}><b>HTML</b></TableCell>
            <TableCell align="right"sx={{borderStyle:"solid",color:"blue"}}><b>Backend developer</b></TableCell>
            <TableCell align="right"sx={{borderStyle:"solid",color:"blue"}}><b>Full Stack developer</b></TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right"sx={{borderStyle:"solid"}}><b>Code</b></TableCell>
            <TableCell align="center"sx={{borderStyle:"solid"}}><b>1</b></TableCell>
            <TableCell align="center"sx={{borderStyle:"solid"}}><b>1.1</b></TableCell>
            <TableCell align="center"sx={{borderStyle:"solid"}}><b>1.2</b></TableCell>
            <TableCell align="center"sx={{borderStyle:"solid"}}><b>1.3</b></TableCell>
            <TableCell align="center"sx={{borderStyle:"solid"}}><b>2</b></TableCell>
            <TableCell align="right"sx={{borderStyle:"solid"}}><b>2.1</b></TableCell>
            <TableCell align="center"sx={{borderStyle:"solid"}}><b>2.2</b></TableCell>
            <TableCell align="center"sx={{borderStyle:"solid"}}><b >2.3</b></TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center"sx={{borderStyle:"solid"}}>Students</TableCell>
            <TableCell align="center"sx={{borderStyle:"solid"}}>Average</TableCell>
            <TableCell align="center"sx={{borderStyle:"solid"}}><span style={{backgroundColor:'#d68c58', padding:'4px 16px', borderRadius:'6px'}}>83%</span></TableCell>
            <TableCell align="center"sx={{borderStyle:"solid"}}><span style={{backgroundColor:'#d68c58', padding:'4px 16px', borderRadius:'6px'}}>75%</span></TableCell>
            <TableCell align="center"sx={{borderStyle:"solid"}}><span style={{backgroundColor:'#d68c58', padding:'4px 16px', borderRadius:'6px'}}>80%</span></TableCell>
            <TableCell align="center"sx={{borderStyle:"solid"}}><span style={{backgroundColor:'#d68c58', padding:'4px 16px', borderRadius:'6px'}}>60%</span></TableCell>
            <TableCell align="right"sx={{borderStyle:"solid"}}><span style={{backgroundColor:'#d68c58', padding:'4px 16px', borderRadius:'6px'}}>56%</span></TableCell>
            <TableCell align="center"sx={{borderStyle:"solid"}}><span style={{backgroundColor:'#d68c58', padding:'4px 16px', borderRadius:'6px'}}>59%</span></TableCell>
            <TableCell align="center"sx={{borderStyle:"solid"}}><span style={{backgroundColor:'#d68c58', padding:'4px 16px', borderRadius:'6px'}}>60%</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Stack direction="row" spacing={1}>
              <Avatar
  alt="Remy Sharp"
  src="/static/images/avatar/1.jpg"
  sx={{ width: 24, height: 24 ,backgroundColor:"red"}}
/><Div sx={{pl:2}}>{row.name}</Div><Div sx={{pl:2}}><MoreVertIcon/></Div></Stack>
              </TableCell>
              <TableCell align="center"sx={{borderStyle:"solid"}}><span style={{backgroundColor:'#d68c58', padding:'4px 16px', borderRadius:'6px'}}>{row.number}</span></TableCell>
              <TableCell align="center"sx={{borderStyle:"solid"}}><span style={{backgroundColor:'#68d975', padding:'4px 16px', borderRadius:'6px'}}>{row.point}</span></TableCell>
              <TableCell align="center"sx={{borderStyle:"solid"}}><span style={{backgroundColor:'#d68c58', padding:'4px 16px', borderRadius:'6px'}}>{row.button}</span></TableCell>
              <TableCell align="center"sx={{borderStyle:"solid"}}><span style={{backgroundColor:'#68d975', padding:'4px 16px', borderRadius:'6px'}}>{row.points}</span></TableCell>
              <TableCell align="center"sx={{borderStyle:"solid"}}><span style={{backgroundColor:'#d45d8f', padding:'4px 16px', borderRadius:'6px'}}>{row.data}</span></TableCell>
              <TableCell align="right"sx={{borderStyle:"solid"}}><span style={{backgroundColor:'#d68c58', padding:'4px 16px', borderRadius:'6px'}}>{row.table}</span></TableCell>
              <TableCell align="center"sx={{borderStyle:"solid"}}><span style={{backgroundColor:'#d45d8f', padding:'4px 16px', borderRadius:'6px'}}>{row.enter}</span></TableCell>
              <TableCell align="center"sx={{borderStyle:"solid"}}><span style={{backgroundColor:'#68d975', padding:'4px 16px', borderRadius:'6px'}}>{row.value}</span></TableCell>
</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}