import React from 'react';
import Div from '@jumbo/shared/Div'
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Grid } from '@mui/material';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import { MdOutlineCancel } from "react-icons/md";


const QuestionTypeData = [
    {label:"Training Specific",value:"Training Specific"},
    {label:"Training Prerequisites",value:"Training Prerequisites"},
    {label:"Placement Assistance",value:"Placement Assistance"},
    {label:"Time & Mode of Delivery",value:"Time & Mode of Delivery"},
    {label:"Payment",value:"Payment"},
    {label:"Certificate",value:"Certificate"},
    {label:"Need Further Assistance",value:"Need Further Assistance"},
   
]

export default function PlacementFAQ({ FAQdata, handleFaqQuestionChange, handleFaqanswerChange, handleFaqTypeChange, handleAddFAQ, handleDeleteUser, handleAddQuestion, handleDeleteFAQ,recordType }) {
    
    return (
        <Div>
            <Div style={{marginTop:recordType? "":'-100px', height: '450px',marginLeft:'60px' }}>

                <JumboScrollbar
                    autoHide
                    autoHideDuration={200}
                    autoHideTimeout={500}
                    autoHeightMin={500}
                >
                    <Typography variant='h3' style={{ color: 'black', fontSize: '25px', fontWeight: 'bold', textTransform: 'none' }}> FAQ's</Typography>

                    <Typography style={{ fontSize: '14px', color: '#8595A6', textTransform: 'none', fontWeight: '350', marginBottom: '10px' }}>Provide any frequently asked questions(FAQs) related to the training program</Typography>
                    <Div style={{ marginTop: '20px' }}>

                        {FAQdata?.map((data, index) => (
                            <React.Fragment key={index}>
                                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                    <Grid item xs={6} md={4} sx={{display:'flex'}}>
                                    {FAQdata.length > 1 && (
                                            <Button onClick={() => handleDeleteUser(index)} color="error" sx={{height:'50px'}}  >
                                                <DeleteOutlineIcon />
                                            </Button>
                                        )}
                                        <FormControl fullWidth >
                                            <InputLabel id={`demo-simple1-select-label-${index}`}>
                                                Select Type
                                            </InputLabel>
                                            <Select
                                                labelId={`demo-simple1-select-label-${index}`}
                                                id={`demo-simple1-select-${index}`}
                                                name="type"
                                                label="Program Type"
                                                size="small"
                                                value={data.faqType}
                                                onChange={(e) => handleFaqTypeChange(index, e)} // Pass the index of the FAQ
                                            >
                                                {QuestionTypeData.map((menuData)=>(
                                                      <MenuItem value={menuData.value} disabled={FAQdata?.some((faq)=>faq.faqType==menuData.value)}>{menuData.label}</MenuItem>
                                                ))}
                                               
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={8} md={8}  >
                                        {data.qAndA.map((faqData, i) => (
                                            <React.Fragment key={index}>
                                                <Grid container sx={{ mb: 1}}>
                                                    <Grid item>
                                                        <TextField
                                                            id={`outlined-basic-${index}`}
                                                            label="Question"
                                                            variant="outlined"
                                                            placeholder="write your question here"
                                                            sx={{ m: 1, mt: 0,width: '410px' }}
                                                            size='small'
                                                            value={faqData.question} 
                                                            name="question"
                                                            onChange={(e) => handleFaqQuestionChange(index, i, e)} // Pass the index of the FAQ
                                                        />
                                                    </Grid>

                                                    <Grid item >
                                                        <TextField
                                                            sx={{ width: '410px',ml:"7px" }}
                                                            id={`outlined-multiline-static-${index}`}
                                                            label="Answer"
                                                            multiline
                                                            rows={2}
                                                            placeholder="Write your answer here"
                                                            value={faqData.answer}
                                                            name="answer"

                                                            onChange={(e) => handleFaqanswerChange(index, i, e)} // Pass the index of the FAQ
                                                        />
                                                        
                                                        <Button
                                                            onClick={() => handleAddQuestion(index)}
                                                            style={{ mt:1, background: 'none' }}
                                                            color="primary"
                                                        >
                                                            <AddIcon />
                                                           {/*  Add New Question */}
                                                        </Button>
                                                        {data.qAndA.length > 1 && (
                                                            <Button onClick={() => handleDeleteFAQ(index, i)} color='error'>
                                                                <MdOutlineCancel style={{ fontSize: '20px', marginTop: '15px', marginLeft: '-30px' }} /></Button>)}


                                                    </Grid>
                                              


                                                </Grid>
                                            </React.Fragment>
                                        ))}
                                    </Grid>
                                    
                                </Grid>
                            </React.Fragment>
                        ))}

                    </Div>

                    <Button onClick={handleAddFAQ} variant="contained" style={{ marginTop: '10px' }}>
                        <AddIcon />
                        Add New FAQ
                    </Button>
                </JumboScrollbar>

            </Div>
        </Div>

    );
}
