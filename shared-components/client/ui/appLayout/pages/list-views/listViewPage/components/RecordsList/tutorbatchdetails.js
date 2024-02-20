import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import Div from "@jumbo/shared/Div";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
 import TutorSettings from './tutorsettings';
import TutorBatchStudents from './tutorbatchstudents';
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

export default function TutorBatchDetails({onClose,onSave,record,tutors,setRecordsListRefresh}) {
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCancel = () => {
    onClose();
};

  return (
    <Box sx={{ width: '100%' }}>
        
        <Div style={{ float:'right'}}>
                    <IconButton
                        onClick={handleCancel}
                        aria-label="close"
            
                    >
                        <CloseIcon />
                    </IconButton>
                </Div>
        
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
         <Tab label="Schedule" {...a11yProps(0)} />
          <Tab label="Students" {...a11yProps(1)} />
          <Tab label="Settings" {...a11yProps(2)} />
        </Tabs>
      </Box>
    
      <CustomTabPanel value={value} index={0}>
        <AdmissionSchedule data={record} setRecordsListRefresh={setRecordsListRefresh}/>
      </CustomTabPanel>
  

      <CustomTabPanel value={value} index={1}>
        <TutorBatchStudents record={record}/>
      </CustomTabPanel>
  
      <CustomTabPanel value={value} index={2}>
        <TutorSettings/>
      </CustomTabPanel>


    </Box>
  );
}
