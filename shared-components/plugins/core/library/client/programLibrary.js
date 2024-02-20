import React from 'react';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import Div from "@jumbo/shared/Div";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Typography} from "@mui/material";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Div sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Div>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ProgramLibrary = () => {
    const [value, setValue] = React.useState(0);
    return (
        <JumboDemoCard title={"Library"}  wrapperSx={{backgroundColor: 'background.paper', pt: 0}}>
            <Div sx={{width: '100%'}}>
                <Div sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
                        <Tab label="Coueses" {...a11yProps(0)} />
                        <Tab label="Internships" {...a11yProps(1)} />
                        <Tab label="Projects" {...a11yProps(2)} />
                    </Tabs>
                </Div>
                <TabPanel value={value} index={0}>
                    Coueses
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Internships
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Projects
                </TabPanel>
            </Div>
        </JumboDemoCard>
    );
};

export default ProgramLibrary;