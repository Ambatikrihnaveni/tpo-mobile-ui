import React, {useState } from "react";
import {  Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails,} from '@mui/material';
import Div from '@jumbo/shared/Div'
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from "@material-ui/core/styles";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import CloseIcon from '@mui/icons-material/Close';
import Tab from '@mui/material/Tab';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    }
}));
function TabPanel(props) {
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
                <Div sx={{ p: 3 }}>
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

export default function AptitudeFaqs({ record }) {
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [expanded, setExpanded] = useState(false);
    
    let TrainingPrerequisites = []
    let TrainingSpecific = []
    let TimeModeOfDelivery = []
    let NeedFurtherAssistance = []

    for (let i = 0; i <= record?.faqs?.length; i++) {
        if (record?.faqs[i]?.faqType == "Training Prerequisites") {
            TrainingPrerequisites = record.faqs[i].qAndA
        }  else if (record?.faqs[i]?.faqType == "Training Specific") {
            TrainingSpecific = record.faqs[i].qAndA
        }  else if (record?.faqs[i]?.faqType == "Time & Mode of Delivery") {
            TimeModeOfDelivery = record?.faqs[i]?.qAndA
        } else if (record?.faqs[i]?.faqType == "Need Further Assistance") {
            NeedFurtherAssistance = record?.faqs[i]?.qAndA
        }
    }
    const handleTabClick = (index) => {
        setSelectedTab(index);
    };
    return (
        <div style={{marginLeft:"7px"}}>
            <TabContext value={selectedTab}>
                <Div sx={{ borderBottom: 1, borderColor: 'divider', fontWeight: "bold", marginTop: "10px" }}>
                    <TabList value={selectedTab} onChange={(_, newValue) => handleTabClick(newValue)} variant="scrollable" scrollButtons allowScrollButtonsMobile>
                        <Tab label=" Training Specific" sx={{ fontSize: "17px", color: '#333', textTransform: 'none' }} {...a11yProps(0)} />
                        <Tab label=" Prerequisites" sx={{ fontSize: "17px", color: '#333', textTransform: 'none' }} {...a11yProps(1)} />
                        <Tab label=" Time & Mode of Delivery" sx={{ fontSize: "17px", color: '#333', textTransform: 'none' }} {...a11yProps(2)} />
                        <Tab label="Need Further Assistance? " sx={{ fontSize: "17px", color: '#333', textTransform: 'none' }} {...a11yProps(3)} />
                    </TabList>
                </Div>
                <TabPanel value={selectedTab} index={0}>
                    <Div sx={{ flex: 1 }}>
                        {TrainingSpecific?.map((data, index) => (
                            
                            <>
                                <Accordion
                                onChange={() => setExpanded(!expanded)}>
                                    <AccordionSummary
                                        expandIcon={expanded ? <CloseIcon /> : <AddIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                        <Typography>{data?.question}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {data?.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </>
                        ))}


                    </Div>
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>

                    <Div sx={{ flex: 1 }}>
                        {TrainingPrerequisites?.map((data, index) => (
                            <>
                                <Accordion
                                onChange={() => setExpanded(!expanded)}>
                                    <AccordionSummary
                                        expandIcon={expanded ? <CloseIcon /> : <AddIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                        <Typography>{data?.question}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <li style={{ margin: '10px', textAlign: 'left', textTransform: 'capitalize' }} >{data?.answer}</li>
                                    </AccordionDetails>
                                </Accordion>
                            </>
                        ))}
                    </Div>

                </TabPanel>
                <TabPanel value={selectedTab} index={2}>
                    <Div sx={{ flex: 1 }}>
                        {TimeModeOfDelivery?.map((data, index) => (
                            <>
                                <Accordion
                                onChange={() => setExpanded(!expanded)}>
                                    <AccordionSummary
                                        expandIcon={expanded ? <CloseIcon /> : <AddIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                        <Typography>{data?.question}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {data?.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </>
                        ))}
                    </Div>


                </TabPanel>
               
                <TabPanel value={selectedTab} index={3}>
                    <Div sx={{ flex: 1 }}>
                        {NeedFurtherAssistance.map((data, index) => (
                            <>
                                <Accordion
                                onChange={() => setExpanded(!expanded)}>
                                    <AccordionSummary
                                        expandIcon={expanded ? <CloseIcon /> : <AddIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                        <Typography>{data?.question}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {data?.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </>
                        ))}
                    </Div>
                </TabPanel>

            </TabContext>

        </div>
    );
};