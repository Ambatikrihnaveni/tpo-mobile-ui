import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import InputAdornment from '@mui/material/InputAdornment';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[1500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function QuizQestions() {

  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const card = (
    <React.Fragment>
      <CardContent>
        <Button variant="outlined" onClick={handleClickOpen}>
          + Add Question
        </Button>
      </CardContent>
    </React.Fragment>
  );


  return (

    <Box
      sx={{
        width: "100%",
        maxWidth: '100%',
        '& > :not(style)': { m: 2 },
      }}
    >
      {card}

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Quiz
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Button> <ArrowBackIcon />Back</Button>
          <CardContent>

            <label> Write your question here</label>
            <input fullWidth placeholder=" who is the founder of softwear " style={{ height: 50, width: "100%" }} />

            <FormControl >
              <label>Select your question type</label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                startAdornment={
                  <InputAdornment position="start">
                    <HourglassEmptyIcon />
                  </InputAdornment>
                }
                value={age}
                label="Age"
                style={{ width: 500, height: 50 }}
                onChange={handleChange}
              >
                <MenuItem value={1}> Single Choise </MenuItem>
                <MenuItem value={2}> Multiple choice</MenuItem>
                <MenuItem value={3}> True or False</MenuItem>

              </Select>
            </FormControl>
          </CardContent>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>

    </Box>
  )
}

