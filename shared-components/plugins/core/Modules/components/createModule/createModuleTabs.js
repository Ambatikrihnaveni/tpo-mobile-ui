import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import { useLocation } from "react-router-dom";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ModulePageTab from "./modulePageTab"
import ModuleContent from "./moduleContent/moduleContent"
import useProduct from '../../hooks/useProduct';

export default function CreateModuleTabs() {
  const {
    onUpdateProduct,
    product,
    shopId
  } = useProduct();
  const [value, setValue] = React.useState('1');
  const scrollingHighr = (33 / 100) * screen.height;
  const location = useLocation();
  const url = location.pathname;
  const segment = url.substring(url.lastIndexOf('/') + 1);

  const handleTabChange = (event, newValue) => {

    setValue(newValue);
    //setValue("2")
  };

  const handleChange = (event, newValue) => {

    setValue("2")
  };

  const handleback = (event, newValue) => {

    // setValue(newValue);
    setValue("1")
  };
  ;
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderColor: 'divider', bgcolor: 'background.paper' }}>
          <TabList aria-label="lab API tabs example" onChange={(product?.title != "") ? handleTabChange : ''} value={value}>
            <Tab label="Module" value="1" />
            <Tab label="Builder" value="2" />

          </TabList>
        </Box>
        <TabPanel value="1">

          <ModulePageTab handleTabChange={handleChange} />
        </TabPanel>

        <TabPanel value="2">

          <ModuleContent handleTabChange={handleback} createState={segment} />
        </TabPanel>

      </TabContext>
    </Box>
  );
}