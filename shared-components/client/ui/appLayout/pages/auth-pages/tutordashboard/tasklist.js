import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import MultipleSelectPlaceholder from './tutorSelect';
import { Avatar, Grid, Stack } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import EditButtons from './tutorButton';
import JumboSearch from './tutorSearch';

function createData(name, calories, fat, carbs, protein, gold) {
  return {

    name,
    calories,
    fat,
    carbs,
    protein,
    gold,
  };
}

const rows = [
  createData('Jayden', 'Dlam lorem dolem', '01 NOV 21', '80%'),
  createData('Ezra', 'Est sea erath at katd', '12 OCT 21', '80%', 4.9),
  createData('Luca', 'Sit said kathid ka inmedenta', '21 NOV 21', '80%', 6.0),
  createData('Rowan', 'Dlam lorem dolem', '20 OCT 21', '80%', 4.0),
  createData('Ginger Bread', 'Est sea erath at katd', '23 NOV 21', '80%', 3.9),
  createData('Kayden.', 'Sit said kathid ka inmedenta', '12 NOV 21', '80%', 6.5),
  createData('Finn', 'Sit said kathid ka inmedenta', '14 OCT 21', '80%', 4.3),
  createData('Jelly Bean', 'Sit said kathid ka inmedenta', '11 NOV 21', '80%', 0.0),
  createData('Isabella.', 'Sit said kathid ka inmedenta', '19 NOV 21', '80%', 7.0),
  createData('Amelia', 'Sit said kathid ka inmedenta', '9 OCT 21', '80%', 0.0),
  createData('Marshma', 'Sit said kathid ka inmedenta', '10 NOV 21', '80%', 2.0),
  createData('Nougat', 'Est sea erath at katd', '5 OCT 21', '80%', 37.0),
  createData('Oreo', 'Dlam lorem dolem', '3 NOV 21', '80%', 4.0),
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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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

const headCells = [

  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Assigned To',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Task',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Project',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Due Date',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'gold',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
];

function Tasklist(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

Tasklist.propTypes = {
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
    <div>

    </div>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Grid container >
            <Grid item xs={2} sm={4} md={9} sx={{ pl: 3 }}>
              <h4>Task List</h4>
            </Grid>

            <Grid sx={{ mt: 0.6 }}>
              <JumboSearch />
            </Grid>
          </Grid>

          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          // size={dense ? 'small' : 'medium'}
          >
            <Tasklist
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}

                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >


                      <TableCell

                      >
                        <Stack direction="row" spacing={1}  >
                          <Avatar
                            sx={{ bgcolor: deepOrange[500], display: 'flex', mr: 6 }}
                            alt={row.name}
                            src="/broken-image.jpg"
                          /> <div style={{ marginTop: '10px' }}>{row.name}</div>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{row.calories}</TableCell>
                      <TableCell align="left">
                        Dashboard UI
                      </TableCell>
                      <TableCell align="left" style={{ color: "red" }}>{row.fat}</TableCell>

                      <TableCell align="left" style={{ fontSize: 'large' }}><MultipleSelectPlaceholder /></TableCell>
                      <TableCell align="center" style={{ fontSize: 'large' }}><EditButtons /></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow

                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}