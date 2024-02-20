import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Div from "@jumbo/shared/Div";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateProgramBatchForm from './components/createProgramBatchForm';
import ProgramAdmin from './programadmin';
import ProgramStudents from './programstudents';
import ProgramTutors from './programtutors';
import ProgramSettings from './programsettings';
import AdmissionSchedule from './admissionschedule';

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
        <Box sx={{ p: 3 }}>
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

export default function ProgramBatchDetails({onClose,onSave,record,tutors,params,setRecordsListRefresh}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h4' > <b> Admissions</b></Typography>

      <Div style={{ float: 'right' }}>
        <IconButton
          onClick={handleCancel}
          aria-label="close"

        >
          <CloseIcon />
        </IconButton>
      </Div>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab style={{color:'#2e475D',fontWeight:'bold'}} label="Info" {...a11yProps(0)} />
          <Tab  style={{color:'#2e475D',fontWeight:'bold',marginLeft:'20px'}} label="Schedule" {...a11yProps(1)} />
          <Tab  style={{color:'#2e475D',fontWeight:'bold',marginLeft:'20px'}} label="Students" {...a11yProps(2)} />
          <Tab  style={{color:'#2e475D',fontWeight:'bold',marginLeft:'20px',display: record?.program?.price == "0" ? "none": "block" }} label="Admin" {...a11yProps(3)} />
          <Tab  style={{color:'#2e475D',fontWeight:'bold',marginLeft:'20px',display: record?.program?.price == "0" ? "none": "block" }} label="Tutors" {...a11yProps(4)} />
          <Tab  style={{color:'#2e475D',fontWeight:'bold',marginLeft:'20px'}} label="Settings" {...a11yProps(5)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <CreateProgramBatchForm onClose={onClose} record={record} onSave={onSave} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
           <AdmissionSchedule data={record} setRecordsListRefresh={setRecordsListRefresh}/>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <ProgramStudents record={record} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
        <ProgramAdmin record={record} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={4}>
        <ProgramTutors record={record} tutors={tutors} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={5}>
        <ProgramSettings />
      </CustomTabPanel>

    </Box>
  );
}
