import React from 'react'
import {  Typography, Accordion, AccordionSummary, AccordionDetails, Tab, } from '@mui/material';
import Div from "@jumbo/shared/Div";
import AddIcon from '@mui/icons-material/Add';
import './programFAQ.css';
import TabList from '@mui/lab/TabList';
import CloseIcon from '@mui/icons-material/Close';
import TabContext from '@mui/lab/TabContext';
import { makeStyles } from "@material-ui/core/styles";

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
export default function ProgramFAQS({ data }) {
      
    const [value, setValue] = React.useState(0);
    const [selectedTab, setSelectedTab] = React.useState(0);
    
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);


    let TrainingPrerequisites = []
    let PlacementAssistance = []
    let TrainingSpecific = []
    let Payment = []
    let Certificate = []
    let TimeModeOfDelivery = []

    for (let i = 0; i <= data?.faqs?.length; i++) {
        if (data?.faqs[i]?.faqType == "Training Prerequisites") {
            TrainingPrerequisites = data.faqs[i].qAndA
        } else if (data?.faqs[i]?.faqType == "Placement Assistance") {
            PlacementAssistance = data.faqs[i].qAndA
        } else if (data?.faqs[i]?.faqType == "Training Specific") {
            TrainingSpecific = data.faqs[i].qAndA
        } else if (data?.faqs[i]?.faqType == "Payment") {
            Payment = data.faqs[i].qAndA
        } else if (data?.faqs[i]?.faqType == "Certificate") {
            Certificate = data.faqs[i].qAndA
        } else if (data?.faqs[i]?.faqType == "Time & Mode of Delivery") {
            TimeModeOfDelivery = data?.faqs[i]?.qAndA
        }
    }
    const handleTabClick = (index) => {
        setSelectedTab(index);
    };

    return (
        <div>
             <TabContext value={selectedTab}>
                            <Div sx={{ borderBottom: 1, borderColor: 'divider', fontWeight: "bold", marginTop: "10px" }}>
                                <TabList value={selectedTab} onChange={(_, newValue) => handleTabClick(newValue)}  variant="scrollable" scrollButtons allowScrollButtonsMobile>
                                    <Tab label=" Training Specific" sx={{fontSize:"15px",color: '#333', textTransform: 'none'}} {...a11yProps(0)} />
                                    <Tab label=" Prerequisites" sx={{fontSize:"15px",color: '#333', textTransform: 'none'}} {...a11yProps(1)} />
                                    <Tab label=" Time & Mode of Delivery" sx={{fontSize:"15px",color: '#333', textTransform: 'none'}} {...a11yProps(2)} />
                                    <Tab label=" Placement Assistance" sx={{fontSize:"15px",color: '#333', textTransform: 'none'}} {...a11yProps(3)} />
                                    <Tab label=" Payment" sx={{fontSize:"15px",color: '#333', textTransform: 'none'}} {...a11yProps(4)} />
                                    <Tab label=" Certificate" sx={{fontSize:"15px",color: '#333', textTransform: 'none'}} {...a11yProps(5)} />
                                </TabList>
                            </Div>
                            <TabPanel value={selectedTab} index={0}>
                                <Div sx={{ flex: 1 }}>
                                    {TrainingSpecific?.map((data, index) => (
                                        <>
                                            <Accordion
                                            onChange={() => setExpanded(!expanded)}
                                            >
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
                                            onChange={() => setExpanded(!expanded)}
                                            >
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
                                            onChange={() => setExpanded(!expanded)}
                                            >
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
                                    {PlacementAssistance?.map((data, index) => (
                                        <>
                                            <Accordion
                                            onChange={() => setExpanded(!expanded)}
                                            >
                                                <AccordionSummary
                                                    expandIcon={expanded ? <CloseIcon /> : <AddIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header">
                                                    <Typography>{data?.question}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>
                                                        <li style={{ margin: '10px', textAlign: 'left', textTransform: 'capitalize' }} >{data?.answer}</li>                                            </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        </>
                                    ))}
                                </Div>
                            </TabPanel>
                            <TabPanel value={selectedTab} index={4}>
                                <Div sx={{ flex: 1 }}>
                                    {Payment?.map((data, index) => (
                                        <>
                                            <Accordion
                                            onChange={() => setExpanded(!expanded)}
                                            >
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
                            <TabPanel value={selectedTab} index={5}>
                                <Div sx={{ flex: 1 }}>
                                    {Certificate.map((data, index) => (
                                        <>
                                            <Accordion
                                            onChange={() => setExpanded(!expanded)}
                                            >
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

    )

}

