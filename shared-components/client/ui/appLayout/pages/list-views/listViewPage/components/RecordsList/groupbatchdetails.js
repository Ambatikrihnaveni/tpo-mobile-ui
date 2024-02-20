import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Div from "@jumbo/shared/Div";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GroupStudents from './groupstudents';
import GroupSettings from './groupsettings';
import GroupTrainingPartner from './grouptrainingpartner';



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

export default function GroupBatchDetails({onClose,onSave,record,tutors}) {
     ;
  const [value, setValue] = React.useState(0);

  const handleChange = ( newValue) => {
    setValue(newValue);
  };

  const handleCancel = () => {
    onClose();
};

  return (
    <Box sx={{ width: '100%',height:'80vh' }}>
        <Typography variant='h4' > <b> Groups</b></Typography>
        
        <Div style={{ float:'right'}}>
                    <IconButton
                        onClick={handleCancel}
                        aria-label="close"
            
                    >
                        <CloseIcon />
                    </IconButton>
                </Div>
        
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Students" {...a11yProps(0)} />
          <Tab label="Training Partner" {...a11yProps(1)} />
          <Tab label="Settings" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
      <GroupStudents record={record}/>
      </CustomTabPanel>
  
      <CustomTabPanel value={value} index={1}>
      <GroupTrainingPartner record={record}/>
      </CustomTabPanel>


      <CustomTabPanel value={value} index={2}>
        <GroupSettings/>
      </CustomTabPanel>

    </Box>
  );
}
