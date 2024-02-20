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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { Avatar, Grid, Stack } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { AvatarGroup } from "@mui/material";
import Slider from '@mui/material/Slider';
import Div from "@jumbo/shared/Div";
import JumboSearch from './tutorSearch';
import MoreVertIcon from '@mui/icons-material/MoreVert';


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
  createData('Website SEO', 'Jayden', 'HTML5,CSS', '80%'),
  createData('Social Bernners', 'Ezra', 'JAVA,JAVASCRIPT', '80%', 4.9),
  createData('Luca', 'Luca', 'GRAPHQL', '80%', 6.0),
  createData('Social Bernners', 'Rowan', 'HTML,CSS', '80%', 4.0),
  createData('Ginger Bread', 'Ginger', 'REACT', '80%', 3.9),
  createData('Kayden.', 'Kayden', 'NODE,EXPRESS', '80%', 6.5),
  createData('Social Bernners', 'Finn', 'BOOSTRAP,JAVASCRIPT', '80%', 4.3),
  createData('Jelly Bean', 'Jelly Bean', 'MANGODB', '80%', 0.0),
  createData('Isabella.', 'Isabella', 'JAVASCRIPT', '80%', 7.0),
  createData('Website SEO', 'Amelia', 'HTML,CSS', '80%', 0.0),
  createData('Marshma', 'Marshma', 'JAVA,JAVASCRIPT', '80%', 2.0),
  createData('Nougat', 'Nougat', 'REACT', '80%', 37.0),
  createData('Social Bernners', 'Oreo', 'HTML,CSS', '80%', 4.0),
];
const valuetext = (value) => {
  return `${value}°C`;
};

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
    label: 'Name',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Leader',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Team',
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

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
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

  const handleChangePage = (event, newPage) => {
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
            <Grid item xs={2} sm={4} md={8} sx={{ pl: 3 }}>
              <h4>Projects</h4>
            </Grid>

            <Grid sx={{ mt: 0.6 }}>
              <JumboSearch />
            </Grid>
          </Grid>

          <Table
            sx={{ minWidth: 750 }}
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
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />

                      </TableCell>

                      <TableCell
                      >
                        <Stack direction="row" spacing={1}  >
                          <Avatar
                            sx={{ bgcolor: deepOrange[500], display: 'flex', mr: .6 }}
                            alt={row.name}
                            src="/broken-image.jpg"
                          /> <div style={{ marginTop: '10px' }}>{row.name}</div>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{row.calories}</TableCell>
                      <TableCell align="left">
                        <AvatarGroup total={24}>
                          <Avatar alt="Remy Sharp" src={`/avatar11.jpg`} />
                          <Avatar alt="Travis Howard" src={`/avatar9.jpg`} />
                          <Avatar alt="Agnes Walker" src={`/avatar4.jpg`} />
                          <Avatar alt="Trevor Henderson" src={`/avatar5.jpg`} />
                        </AvatarGroup>
                      </TableCell>
                      <TableCell align="left">
                        <Div sx={{ width: 100, maxWidth: '100%' }}>
                          <Slider
                            aria-label="Small steps"
                            defaultValue={0.00000005}
                            getAriaValueText={valuetext}
                            step={0.00000001}
                            marks
                            min={-0.00000005}
                            max={0.0000001}
                            valueLabelDisplay="auto"
                          />
                        </Div>
                      </TableCell>
                      <TableCell align="center" style={{ fontSize: 'large' }}><MoreVertIcon /></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
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