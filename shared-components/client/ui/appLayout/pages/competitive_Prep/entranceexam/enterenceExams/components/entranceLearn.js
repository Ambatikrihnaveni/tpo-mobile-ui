import React, { useEffect } from 'react'
import {
  Box, Typography, Grid, MenuItem, Select, FormControl, OutlinedInput, InputLabel, TextField,
  Accordion, AccordionSummary, AccordionDetails, Button, Checkbox, ListItemText, Chip
} from '@mui/material'
import Div from '@jumbo/shared/Div'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import ClearIcon from '@mui/icons-material/Clear';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function EntranceLearn(params) {
         ;
  const { modulesData,
    selectedModule,
    handleChange,
    addRow,
    handleRemoveClick,
    addlessonCell,
    handleRemoveLessonCell,
    onLessonsAdd,
    addDuration,
    selectedLessons,
    recordType,
  
  } = params




  const availableModules = modulesData?.filter((module) => {
    return !selectedModule?.some((selected) => selected.module === module);
  });



  return (
    <Div>
      <Box sx={{ marginTop: recordType ? "" : '-80px', height: '200px',mt:2 }}>
        <JumboScrollbar
          autoHide
          autoHideDuration={200}
          autoHideTimeout={500}
          autoHeightMin={500}
        >
          <Typography style={{ fontSize: '14px', color: '#8595A6', textTransform: 'none', fontWeight: '350', marginBottom: '25px' }}>Add a list of modules and lessons that will be covered in the program.
          </Typography>

          <Div>
            {selectedModule.map((data, i) => (
              <Grid container spacing={1} key={i}>
                <Grid item xs={10} md={3} sx={{ p: 1 }}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-standard-label">Modules</InputLabel>
                    <Select
                      fullWidth
                      displayEmpty
                      value={data?.productId || ''}
                      onChange={(e) => { handleChange(e, i) }}
                      label={`Module ${i}`}
                      defaultValue={data?.productId}

                    >
                      {availableModules.length === modulesData?.length && (
                        <MenuItem value="" disabled>
                          {/* <em>None</em> */}
                        </MenuItem>
                      )}
                      {modulesData?.map((module, i) => (
                        <MenuItem key={i} value={module.id} disabled={selectedModule.some((selected) => selected.productId === module.id)} >{module.title}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={11} md={8} sx={{ p: 1, marginTop: '7px' }} >
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Lessons</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {selectedModule[i]?.productLessons?.map((lesson, index) => (
                          <Grid container key={index}>

                            <Grid item xs={6} md={8} sx={{ m: 1 }}>

                            
                              <FormControl sx={{ m: 1, minWidth: 180 }}>
                                <InputLabel id="demo-multiple-checkbox-label">Lessons</InputLabel>
                                <Select
                                  fullWidth
                                  labelId="demo-multiple-checkbox-label"
                                  id="demo-multiple-checkbox"
                                  multiple
                                  value={lesson.lessonIds ? lesson.lessonIds : []}
                                  onChange={(e, value) => {
                                    onLessonsAdd(e, value, i, index)
                                  }}
                                  input={<OutlinedInput label="Lessons" />}
                                  renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                      {selected.map((lessonId) => (
                                        <Chip key={lessonId} label={selectedModule[i]?.module?.lessons?.find(e => e._id === lessonId)?.name} />
                                      ))}
                                    </Box>
                                  )}
                                  MenuProps={MenuProps}
                                >
                                  {selectedModule[i]?.module?.lessons?.map((lessons) => (
                                    <MenuItem key={lessons._id} value={lessons._id}>
                                      <Checkbox checked={selectedLessons?.indexOf(lessons._id) > -1} />
                                      <ListItemText primary={lessons.name} />
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={5} md={2} sx={{ m: 1 }}>

                              <TextField
                                fullWidth
                                type="number"
                                id="standard-basic"
                                label="Duration"
                                placeholder='No.of days'
                                variant="standard"
                                value={selectedModule[i].productLessons[index].lessonDuration}
                                onChange={(e) => addDuration(e, i, index)}
                              />

                            </Grid>
                            <Button variant='contained' color='error' disabled={selectedModule[i].productLessons.length > 1 ? false : true} sx={{ minWidth: "10px", maxHeight: '20px', borderRadius: '20px', verticalAlign: 'bottom' }} onClick={() => { handleRemoveLessonCell(i, index) }}>X</Button>
                          </Grid>

                        ))}

                        <Button variant='contained' sx={{ textTransform: 'none' }} onClick={() => addlessonCell(i)}>Add Lessons</Button>
                      </Div>
                    </AccordionDetails>
                  </Accordion>


                </Grid>
                <Grid item xs={1}>

                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => handleRemoveClick(i)}
                    aria-label="close"
                    disabled={selectedModule.length > 1 ? false : true}
                    sx={{ minWidth: '10px', maxHeight: '30px', ml: 1, borderRadius: '30px' }}
                  >
                    <ClearIcon />
                  </Button>
                </Grid>
              </Grid>
            ))}

            <Button variant="contained" onClick={addRow} sx={{ textTransform: 'none' }} >Add More</Button>

          </Div>
        </JumboScrollbar>
      </Box>
    </Div>
  )
}
