import * as React from 'react';
import Typography from '@mui/material/Typography';
import Div from "@jumbo/shared/Div";
import MuiAccordion from '@mui/material/Accordion';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const data = [
    {
        lesson: "introduction Tags"
    },
    {
        lesson: "introduction Html"
    },
    {
        lesson: "React js"
    },
    {
        lesson: "Javascript Loops"
    },
    {
        lesson: "Java introduction"
    },
    {
        lesson: "Angulear"
    }
];

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

export default function Syllabus(record) {
    
    const [expanded, setExpanded] = React.useState(false);

    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };

    const Syllabus = record?.record?.syllabus

    return (
        <div>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
            >
                <AccordionSummary
                    expandIcon={expanded === 'panel1' ? <ExpandLessIcon /> : <ArrowForwardIosIcon fontSize='small' />}

                >
                    <Div sx={{ display: "flex", flexDirection: "column", textAlign: 'left' }}>
                        {record?.record?.products.map((product) => (
                            <>
                                <Typography sx={{ fontWeight: 'bold', color: '#035961', textTransform: 'capitalize' }} >{product.title}</Typography>

                                <Div sx={{ display: 'flex', flexDirection: 'row', p: 1 }}>
                                    <TextSnippetIcon />
                                    <Typography sx={{ ml: 1 }}> {product.title} </Typography>
                                </Div>
                            </>
                        ))}
                        {/*                         <Typography sx={{ fontWeight: 'bold', color: '#035961', textTransform: 'capitalize' }} >introduction React js</Typography>*/}
                    </Div>
                </AccordionSummary>
                {record?.record?.products.map((product, index) => (
                    <React.Fragment key={index}>
                        {product?.lessonsDuration?.map((lessons) => (
                            <>
                            {lessons?.lesson?.map((lesson)=>(
                                <AccordionDetails key={lesson._id}>
                                <Typography>
                                    <li style={{ margin: '10px', textAlign: 'left', textTransform: 'capitalize' }}>{lesson.name}</li>
                                </Typography>
                            </AccordionDetails>
                            ))}

                            </> 
                        ))}
                    </React.Fragment>
                ))}
            </Accordion>
        </div>
    );
}