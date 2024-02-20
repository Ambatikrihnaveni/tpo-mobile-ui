import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails, } from '@mui/material';
import Div from '@jumbo/shared/Div'
import Grid from "@mui/material/Grid";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';



export default function FAQS(record) {
    
    const [value, setValue] = useState('1');
    const [expanded, setExpanded] = React.useState(false)

    const handleChange = (event, newValue) => {
        
        setValue(newValue);
    };


    return (
        <Div className="container">
            <Grid sx={{ textAlign: "center" }}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Training Prerequisites" value="Training Prerequisites" sx={{ fontWeight: 'bold', fontSize: '15px', color: '#2E475D' }} />
                                <Tab label="Placement Assistance" value="Placement Assistance" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px', color: '#2E475D' }} />
                                <Tab label="Need Further Assistance" value="Need Further Assistance" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px', color: '#2E475D' }} />
                            </TabList>
                        </Box>

                        <TabPanel value="Training Prerequisites">
                            {record?.record?.faqs?.map((item, itemIndex) => (
                              <> 
                              {item.faqType === "Training Specific" ? 
                                    <>
                                     {item.qAndA.map((qa, qaIndex) => (
                                      <Accordion
                                        key={qaIndex}
                                        onChange={() => setExpanded(!expanded)}>
                                        <AccordionSummary
                                          expandIcon={expanded ? <CloseIcon /> : <AddIcon />}>
                                          <Typography variant="h6">{qa.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Typography variant="body1">{qa.answer}</Typography>
                                        </AccordionDetails>
                                      </Accordion>
                                    ))}
                                  </>:''
                                }
                               </>
                                ))}
                        </TabPanel>

                        <TabPanel value="Placement Assistance">
                            {record?.record?.faqs?.map((item, itemIndex) => (
                              <> 
                              {item.faqType === "Training Prerequisites" ? 
                                    <>
                                     {item.qAndA.map((qa, qaIndex) => (
                                      <Accordion
                                        key={qaIndex}
                                        onChange={() => setExpanded(!expanded)}>
                                        <AccordionSummary
                                          expandIcon={expanded ? <CloseIcon /> : <AddIcon />}>
                                          <Typography variant="h6">{qa.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Typography variant="body1">{qa.answer}</Typography>
                                        </AccordionDetails>
                                      </Accordion>
                                    ))}
                                  </>:''
                                }
                               </>
                                ))}
                        </TabPanel>

                        <TabPanel value="Need Further Assistance">
                            {record?.record?.faqs?.map((item, itemIndex) => (
                              <> 
                              {item.faqType === "Need Further Assistance" ? 
                                    <>
                                     {item.qAndA.map((qa, qaIndex) => (
                                      <Accordion
                                        key={qaIndex}
                                        onChange={() => setExpanded(!expanded)}>
                                        <AccordionSummary
                                          expandIcon={expanded ? <CloseIcon /> : <AddIcon />}>
                                          <Typography variant="h6">{qa.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Typography variant="body1">{qa.answer}</Typography>
                                        </AccordionDetails>
                                      </Accordion>
                                    ))}
                                  </>:''
                                }
                               </>
                                ))}
                        </TabPanel>
                    </TabContext>
                </Box>
            </Grid>
        </Div>
    );
};