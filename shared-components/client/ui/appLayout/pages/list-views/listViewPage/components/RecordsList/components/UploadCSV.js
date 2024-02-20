import React from 'react'
import Div from '../../../../../../../@jumbo/shared/Div/Div'
import { Button, Typography, Grid, TextField, IconButton } from '@mui/material'
import { useTheme } from "@mui/material/styles";
import { useParams } from 'react-router'
import CloseIcon from '@mui/icons-material/Close';
import AccountsService from '../../../../../../../graphql/services/accounts/accounts-service'
import './uploadCSV.css'
import useCurrentShopId from '../../../../../../../hooks/useCurrentShopId'
import { ToastContainer, toast } from 'react-toastify';


export default function UploadCSV({ setImportedEmails, onClose, groupId }) {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const label = { inputProps: { 'aria-label': "Switches" } }
  const params = useParams()
  const studentGroupId = groupId

  const { shopId } = useCurrentShopId()
  const theme = useTheme();
  const Download = () => {
    const csvHeader = 'email\n'; // Header row
    const csvContent = csvHeader;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users_upload_templete.csv';
    a.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleInvite = async () => {

    if (!selectedFile) {
      console.error('No file selected.'); // Handle the case when no file is selected
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      const content = e.target.result;
      const lines = content.split('\n');
      const emails = lines.slice(1).filter(email => email.trim() !== '');
      setImportedEmails(emails);

      const propdata = emails.map(email => ({
        email,
        studentGroupId: studentGroupId,
        role: "Student"
      }));
      const inputData = { studentData: propdata, shopId: shopId }
      const data = await AccountsService.inviteStudents(inputData)
      try {

        let isMounted = true;
        const data = await AccountsService.inviteStudents(inputData)
        toast.success('Invitations send Successfully', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          onClose();
        }, "3000");

        // hideDialogAndRefreshRecordsList()
      } catch (error) { }
      return ("Error in invitations")
    };
    reader.readAsText(selectedFile);
    onClose();

  };

  return (
    <Div sx={{ maxWidth: '1000px' }}>
      <IconButton
        style={{ position: 'absolute', top: 0, right: 0 }}
        onClick={onClose}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>

      <Typography variant='h3' style={{ fontWeight: 'bold', marginTop: '25px' }}>Invite Students via CSV
      </Typography>
      <Grid container spacing={1} marginTop={8}>
        <Grid item xs={1}>
          <div class="step-container">
            <div class="step">
              <div class="step-circle">1</div>
              <div class="step-connector"></div>
            </div>
            <div class="step">
              <div class="step-connector"></div>
              <div class="step-circle">2</div>
            </div>
          </div>
        </Grid>
        <Grid item xs={11}>
          <Grid container spacing={2}>
            <Grid item xs={12}>

              <Typography variant='h4' style={{ fontWeight: 'bold' }}>Prepare a list of Students</Typography>

              <Typography>Start with a blank template or a list of your exported Students. Inviting new Students can be done from either spreadsheet
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Button variant='outlined' onClick={Download}>Download template</Button>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '15px' }}>
              <Typography style={{ fontWeight: 'bold' }}>Upload Students</Typography>
              <Typography>Upload your edited Student list file.</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="outlined-basic"
                label="Select File"
                variant="outlined"
                value={selectedFile ? selectedFile.name : ''}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <label htmlFor="file-input">
                <Button variant="outlined" component="span">
                  Choose File
                </Button>
              </label>
              <input
                type="file"
                accept=".csv"
                id="file-input"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>

          </Grid>
          <Grid item xs={6}>
            <Button color='primary' variant='contained' onClick={handleInvite} style={{ position: 'absolute', bottom: 25, right: 20 }}
            >Upload</Button>
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Div >


  )
}
