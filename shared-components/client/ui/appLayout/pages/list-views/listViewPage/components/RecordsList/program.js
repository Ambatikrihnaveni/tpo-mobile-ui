import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Div from "@jumbo/shared/Div";


const rows = [
  
  {
    id:1,
    name:'vinay',
    path:'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSyuHCGDUN6vGolF8KZPl-7PQN81qzk-bdCgukv8X8d-D45ii94Uxz3JfprlT9kW7bBO3qA2wt1wHyw-Eg'
  },
  {
    id:2,
    name:'mosha',
    path:'https://assets.telegraphindia.com/telegraph/2023/May/1685319810_virat.gif'
  },
  {
    id:3,
    name:'koti',
    path:'https://c.ndtvimg.com/2023-08/udvef5t8_virat-kohli-806_625x300_18_August_23.jpg?im=FeatureCrop,algorithm=dnn,width=806,height=605'
  },
  {
    id:4,
    name:'ramesh',
    path:'https://images.newindianexpress.com/uploads/user/imagelibrary/2022/2/18/w900X450/Virat_Kohli_AP.jpg?w=400&dpr=2.6',
  },
  {
    id:5,
    name:'mastan',
    path:'https://crictoday.com/wp-content/uploads/2023/05/virat-1-1-1024x576-1.jpg'
  },
  {
    id:6,
    name:'virat',
    path:'https://crictoday.com/wp-content/uploads/2023/05/virat-1-1-1024x576-1.jpg'
  },

  {
    id:7,
    name:'ramesh',
    path:'https://images.newindianexpress.com/uploads/user/imagelibrary/2022/2/18/w900X450/Virat_Kohli_AP.jpg?w=400&dpr=2.6',
  },
  {
    id:8,
    name:'mastan',
    path:'https://crictoday.com/wp-content/uploads/2023/05/virat-1-1-1024x576-1.jpg'
  },
  {
    id:9,
    name:'virat',
    path:'https://crictoday.com/wp-content/uploads/2023/05/virat-1-1-1024x576-1.jpg'
  },
  
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}



function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
    const [searchKeywords, setSearchKeywords] = React.useState("");

 
  return (
    <TableHead >
    <TableRow>
      <TableCell padding="checkbox">
      <Checkbox
        color="primary"
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={onSelectAllClick}
        inputProps={{
          "aria-label": "select all desserts"
        }}
      />
   
   </TableCell>
   <TableCell>
   <Div sx={{
            color: 'inherit',
            display: 'flex',
            borderRadius: 30,
            backgroundColor: theme => theme.jumboComponents.JumboSearch.background,
            width:'200px'
           
        }}>
            <Div sx={{alignItems: 'center',
                justifyContent: 'center',}}>
            <SearchIcon  sx={{ml:1,mt:1,mr:1}}/>
            </Div>
    
            <InputBase
                placeholder="Search Anything"
                inputProps={{'aria-label': 'search'}}
                onChange={(e) => setSearchKeywords(e.target.value)}
            />
            <IconButton
                    paddingLeft="20px"
                    component="label"
                >
                <CancelIcon />
            </IconButton> 
        </Div>
    </TableCell>
    </TableRow>
  </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar

    >
    
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
           
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function ProgramTutors() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  
  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
 
  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{marginTop:'-30px'}}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                    <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{ display: "flex", marginTop: "4px" }}
                    >
                      <Avatar src={row.path} sx={{ marginTop: "5px" }} />
                      <h5 style={{ marginLeft: "10px" }}> {row.name}</h5>
                    </TableCell>
                  </TableRow>
                );
              })}
             
            </TableBody>
          </Table>
        </TableContainer>
         
    </Box>
  );
}