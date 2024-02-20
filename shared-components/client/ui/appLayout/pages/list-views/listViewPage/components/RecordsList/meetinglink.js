import React, { useState } from 'react'
import { TextField, Button, Typography, IconButton } from '@mui/material';
import Div from "@jumbo/shared/Div";
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Formik, Form } from 'formik'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import Admissions from '../../../../../../graphql/services/admissions/admission-service';
import { ToastContainer, toast } from 'react-toastify';

export default function MeetingLink({ onClose, batchId, productId, lessonIds, setRecordsListRefresh, viewer, data }) {
  const [formData, setFormData] = useState({
    startDate: null,
    link: '',
    recordLink: '',
    platform: '',
  });

  const handleDateChange = (date) => {
    setFormData({ ...formData, startDate: date });
  };

  const handleLinkChange = (event) => {
    setFormData({ ...formData, link: event.target.value });
  };

  const handleRecordLinkChange = (event) => {
    setFormData({ ...formData, recordLink: event.target.value });
  };

  const handlePlatFormChange = (event) => {
    setFormData({ ...formData, platform: event.target.value });
  };

  React.useEffect(async() => {
    if(data) {
      let date = data?.meetingDate ? data?.meetingDate : '';
      let meetingDate = new Date(date);
      setFormData({...formData, startDate: meetingDate, link: data?.link, recordLink: data?.recordedLink, platform: data?.platform});
    }
  }, [data])

  const handleSubmit = async () => {
    if (formData.startDate && formData.link && formData.platform) {
      if(data?.link) {
        try {
          // Send to Backend with Admission-service
          const res = await Admissions.addRecordingLinkToLesson(formData, { batchId, productId, lessonIds });
          toast.success('Recording Link Details updated Successfully', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
          setRecordsListRefresh(true);
          setTimeout(() => {
            onClose();
          }, 2500);
        } catch (error) {
          //console.error('Error:', error);
          toast.error('Failed to Update Recording Link Details', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
          setRecordsListRefresh(true);
          setTimeout(() => {
            onClose();
          }, 2500);
        }
      }else{
        try {
          // Send to Backend with Admission-service
          const res = await Admissions.addMeetingDetailsToLesson(formData, { batchId, productId, lessonIds });
          toast.success('Meeting Link Details Sent Successfully', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
          setRecordsListRefresh(true);
          setTimeout(() => {
            onClose();
          }, 2500);
        } catch (error) {
          //console.error('Error:', error);
          toast.error('Failed to send Meeting Link Details', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
          setRecordsListRefresh(true);
          setTimeout(() => {
            onClose();
          }, 2500);
        }
      }
    } else {
      toast.error('Please fill Start Date, Link, and Platform fields', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };




  return (
    <Div>

      <Formik
      >{({ values }) => (
        <Form>


          <Div>

            <Div style={{ borderBottom: '2px solid rgb(211, 215, 236)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0px 24px', height: '3.8rem', position: 'relative', }}>
              <Typography variant='h5' style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", fontSize: '25px' }}>Class Invite</Typography>
              <IconButton
                //edge="end"
                onClick={onClose}
                sx={{ marginLeft: '20px' }}

              >
                <CloseIcon />
              </IconButton>
            </Div>


            <Div sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', gap: '7px', marginBottom: '15px' }}>
              <Typography style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", display: 'block', padding: '10px', fontSize: '16px', marginBottom: '5px' }}> Start Date</Typography>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label=" Select Start Date "
                    inputFormat="dd/MM/yyyy"
                    value={formData?.startDate}
                    //onChange={(date) => setStartDate(date)}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>

            </Div>
          </Div>


          <Div sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', gap: '7px', marginTop: '4px', marginBottom: '10px' }}>
            <Typography style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", display: 'block', padding: '10px', fontSize: '16px', marginBottom: '5px' }}>Platform</Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">PlatForm</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData?.platform}
                label="PlatForm"
                onChange={handlePlatFormChange}
              >
                <MenuItem value="GoogleMeet">Google Meet</MenuItem>
                <MenuItem value="Zoom">Zoom</MenuItem>
                <MenuItem value="Others">Others</MenuItem>

              </Select>
            </FormControl>
          </Div>

          <Div sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', gap: '7px', marginTop: '4px', marginBottom: '10px' }}>
            <Typography style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", display: 'block', padding: '10px', fontSize: '16px', marginBottom: '5px' }}>Link</Typography>
            <TextField id="outlined-basic" placeholder="Enter Location / Link" variant="outlined" value={formData?.link}
              onChange={handleLinkChange} />
          </Div>




          <Div sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', gap: '7px', marginTop: '4px', marginBottom: '10px' }}>
            <Typography style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", display: 'block', padding: '10px', fontSize: '16px', marginBottom: '5px' }}> Class Record Link</Typography>
            <Typography style={{ display: 'block', padding: '10px', marginBottom: '10px' }}>After your meeting is complete you can add a link to the recording for lerners to re-watch</Typography>
            <TextField id="outlined-basic" placeholder="Ex:www.tpo.ai" variant="outlined" value={formData?.recordLink}
              onChange={handleRecordLinkChange} />
          </Div>



          <Div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: '10px',
            //borderTop: '2px solid rgb(211, 215, 236)',
            height: '3.8rem',
            
          }}>
            <Button  variant="contained" style={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }} onClick={handleSubmit}>Send</Button>

          </Div>

          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

        </Form>
      )}
      </Formik>
    </Div>
  )
}
