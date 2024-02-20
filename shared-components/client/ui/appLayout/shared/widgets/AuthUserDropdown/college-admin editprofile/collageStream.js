import React from 'react'
import TextField from '@mui/material/TextField';
import {  Button, Grid } from "@mui/material";
import { Autocomplete, Checkbox, } from '@mui/material';
import { FormControlLabel, ListItemText } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';



function CollageStream(params) {

    ;
    return (
        <div>
            <h2 style={{ width: '100%', color: '#2e475D', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem' }}>Provide your academic streams.</h2>
            <br />
            {params?.streamList?.map((list, index) => (
                <Grid key={index} container spacing={3} style={{ marginTop: '5px' }}>
                    <Grid item xs={5}>
                        <Autocomplete
                            fullWidth
                            size='small'
                            value={list?.degree}
                            options={params?.degree}
                            freeSolo
                            onChange={(e, value)=>params.handelSpacalChange1(e, value, index)}
                            renderOption={(props, option) => (
                                <li {...props}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={<ListItemText primary={option} />}
                                    />
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField style={{ marginTop: '10px' }} {...params} label="Select Degree or enter your own" variant="outlined" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>

                
                        <Autocomplete
                            size='small'
                            multiple
                            id={`tags-standard-${i}`}
                            limitTags={3}
                            options={params?.stream}
                            defaultValue={list.stream}
                            getOptionLabel={(option) => option}
                            onChange={(e, value)=>params.handelSpacalChange2(e, value, index)}
                            renderOption={(props, option) => (
                                <li {...props}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={<ListItemText primary={option} />}
                                    />
                                </li>
                            )} 
                            renderInput={(params) => (
                                <TextField
                                sx={{marginTop:'10px'}}
                                    {...params}
                                    label="Select Stream or enter your own"
                                    variant="outlined"
                                />
                            )}
                        />

                    </Grid>
                    <Grid item xs={1}>
                           {params?.streamList?.length > 1 && (
                           <DeleteOutlineOutlinedIcon style={{color:'#f24b64',marginTop:'20px',fontSize:'25px'}} onClick={() => params?.handleDeleteStream(index)}/>
                           )}
                           </Grid>
                </Grid>))}

            <Button variant="text" onClick={params?.handleAddClick}>+ Add Stream</Button>

        </div>
    )
}

export default CollageStream