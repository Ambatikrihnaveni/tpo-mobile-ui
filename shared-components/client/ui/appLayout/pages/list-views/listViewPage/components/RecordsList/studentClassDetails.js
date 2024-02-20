import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Div from "@jumbo/shared/Div";
import { Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TutorSettings from './tutorsettings';
import AdmissionSchedule from './admissionschedule'
import StudentClassTutor from './studentClassTutor';
import html2canvas from 'html2canvas';
import useAuth from '../../../../../../hooks/useAuth';
import Certificate from '../../../../../../../../plugins/core/certificates/TP_certificate/components/certificate';


function CustomTabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { sm: 3, xs: 0 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function StudentClassDetails({ onClose, record, setRecordsListRefresh }) {

const {viewer} = useAuth()
  const [value, setValue] = React.useState(0);

  const studentName= viewer? viewer.name : '';
  const trainingpartnerName= record?.program?.account?.name;
  const programName=record?.program?.name;
  const programType = record?.program?.type;
  const startDate=record?.startDate;
  const endDate = record?.endDate;
  



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleDownload = async () => {
    
    const reactComponent = document.getElementById('certificate-template');

    // Convert the React component to an image.
    html2canvas(reactComponent).then((canvas) => {
      // Get the image data from the canvas.
      const imageData = canvas.toDataURL('image/png');

      // Create a link to download the image.
      const downloadLink = document.createElement('a');
      downloadLink.href = imageData;
      downloadLink.download = `${programName} certificate.png`;

      // Append the link to the document.
      document.body.appendChild(downloadLink);

      // Click the link to download the image.
      downloadLink.click();
    });
  }


  return (
    <Box sx={{ width: '100%', }}>

      <Div style={{ float: 'right' }}>
        <IconButton
          onClick={handleCancel}
          aria-label="close"

        >
          <CloseIcon />
        </IconButton>
      </Div>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          <Tab label="Schedule" {...a11yProps(0)} />
          <Tab label="Tutors" {...a11yProps(1)} />
          <Tab label="Certificate" {...a11yProps(2)} />
          <Tab label="Settings" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <AdmissionSchedule data={record} setRecordsListRefresh={setRecordsListRefresh} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <StudentClassTutor record={record} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2} sx={{textAlign:'center'}}>
      <React.Fragment>
        <Grid container spacing={2} sx={{display:(record?.certificate?.logo)? 'block':'none'}}>
          <Grid item xs={12} md={8} sx={{margin:'auto',boxShadow:'blur'}}>
          <Certificate 
        record={record}
        logo={record?.certificate?.logo}
        authority={record?.certificate?.authority}
        template={record?.certificate?.template}
        certifiTemp={record?.certificate?.certifiTemp}
        studentName={studentName}
        trainingpartnerName={trainingpartnerName}
        programName={programName}
        startDate={startDate}
        endDate={endDate}
        programType={programType}
        />
       
          </Grid>
         
        </Grid>
        <Div sx={{textAlign:'center',mt:4,mb:2}}>
        <Button variant='contained' disabled={(record?.isCourseComplete==false) ? true: false } sx={{ textTransform: 'none',textAlign:'center', }}
            onClick={() => {
              handleDownload();
            }}
          >Download
          </Button>
          </Div>
          <Div>
          
          </Div>
          </React.Fragment>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
        <TutorSettings />
      </CustomTabPanel>


    </Box>
  );
}
