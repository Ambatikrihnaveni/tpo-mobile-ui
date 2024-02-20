import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Typography } from '@mui/material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Div from "@jumbo/shared/Div";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function AptitudeSyllabus({ record }) {
    const [expanded, setExpanded] = React.useState({});
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded({ ...expanded, [panel]: newExpanded });
    };
    
    return (
        <Div sx={{ textAlign: "center", marginTop: "40px" }} >

            {record.products.map((product, i) => {
                ;
                const { id, heading, secondaryHeading, details } = product;
                return (
                    <Accordion
                    expanded={expanded[id]}
                    onChange={handleChange(id)}
                    >
                        <AccordionSummary
                            expandIcon={expanded === 'panel1' ? <ExpandLessIcon fontSize='small' /> : <ArrowForwardIosIcon fontSize='small' />}
                        >
                            <Div sx={{ display: "flex", flexDirection: "column", textAlign: 'left' }}>
                                <Typography sx={{ fontWeight: 'bold', color: '#035961', textTransform: 'capitalize' }} >{product.title}</Typography>
                                <Div sx={{ display: 'flex', flexDirection: 'row', p: 1 }}>
                                    <TextSnippetIcon />
                                    <Typography sx={{ ml: 1 }}> {product?.title} lessons</Typography>
                                </Div>

                            </Div>
                        </AccordionSummary>
                        {product?.lessonsDuration?.map((lessons, index) => (
                            lessons?.lesson?.map((lesson) => (
                                <AccordionDetails key={index} >
                                    <li key={i} style={{ margin: '10px', textAlign: 'left', textTransform: 'capitalize' }} >{lesson.name}</li>
                                </AccordionDetails>
                            ))

                        ))}
                    </Accordion>
                    
                );
            })}
        </Div>
    )
}