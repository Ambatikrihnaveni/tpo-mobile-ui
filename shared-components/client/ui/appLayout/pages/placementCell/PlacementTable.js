/* import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from '@mui/material/Select';


function createData(
    name, calories, fat, carbs, protein
) {
    return { name, calories, fat, carbs, protein };
}


const rows = [
    {
        id: 1,
        jobTitle: "MERN Stack Developer",
        company: "TCS",
        location: "Hyderabad",
        platform: "LinkedIn",
        isApply: false,
        matchedAt: "Wed Jun 14 2023",
        action:''
    },
    {
        id: 2,
        jobTitle: "Frontend Developer",
        company: "Wipro",
        location: "Chennai",
        platform: "Monster",
        isApply: false,
        matchedAt: "Wed Jun 14 2023",
        action:''
    },
    {
        id: 3,
        jobTitle: "Nodejs Developer",
        company: "Infosys",
        location: "Mumbai",
        platform: "Glass Door",
        isApply: false,
        matchedAt: "Wed Jun 14 2023",
        action:''
    },
    {
        id: 4,
        jobTitle: "Backend Developer",
        company: "Capgemini",
        location: "Banglore",
        platform: "LinkedIn",
        isApply: false,
        matchedAt: "Wed Jun 14 2023",
        action:''
    },
    {
        id: 5,
        jobTitle: "Java Backend Developer",
        company: "Accenture",
        location: "Hyderabad",
        platform: "Monster",
        isApply: false,
        matchedAt: "Wed Jun 14 2023",
        action:''
    },
    {
        id: 6,
        jobTitle: "MERN Stack Developer",
        company: "TCS",
        location: "Delhi",
        platform: "Naukri",
        isApply: false,
        matchedAt: "Wed Jun 14 2023",
        action:''
    },
    {
        id: 7,
        jobTitle: "React Developer",
        company: "HCL",
        location: "Chennai",
        platform: "Freshers World",
        isApply: false,
        matchedAt: "Wed Jun 14 2023",
        action:''
    },
    {
        id: 8,
        jobTitle: "GraphQL Developer",
        company: "Accenture",
        location: "Kolkatta",
        platform: "Naukri",
        isApply: false,
        matchedAt: "Wed Jun 14 2023",
        action:''
    },
    {
        id: 9,
        jobTitle: "Database Engineer",
        company: "Paytm",
        location: "Banglore",
        platform: "LinkedIn",
        isApply: false,
        matchedAt: "Wed Jun 14 2023",
        action:''
    },
    {
        id: 10,
        jobTitle: "Deployment Engineer",
        company: "Phone pay",
        location: "Pune",
        platform: "LinkedIn",
        isApply: false,
        matchedAt: "Wed Jun 14 2023",
        action:''
    }
];

export default function PlacementTable() {

    return (
        <Card>
            <Box>
                <Grid container spacing={0} >
                    <Grid item xs={4}>
                        <FormControl sx={{ m: 1, minWidth: 350 }}>
                            <InputLabel id="demo-simple-select-helper-label">Filter</InputLabel>
                            <Select
                                label="Filter"
                            >
                                <MenuItem value="">
                                </MenuItem>
                                <MenuItem value={10}>All matches</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl sx={{ m: 1, minWidth: 350 }}>
                            <InputLabel id="demo-simple-select-helper-label">Platforms</InputLabel>
                            <Select
                                label="Platforms"
                            >
                                <MenuItem value="">
                                </MenuItem>
                                <MenuItem value={10}>Platforms</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl sx={{ m: 1, minWidth: 350 }}>
                            <InputLabel id="demo-simple-select-helper-label">Filters Compaonies</InputLabel>
                            <Select
                                label="Filters Compaonies"
                            >
                                <MenuItem value="">
                                </MenuItem>
                                <MenuItem value={10}>Filters Compaonies</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid>
                <TextField sx={{margin:"10px"}} variant="filled" />
                </Grid>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>JobTitle</TableCell>
                                <TableCell align="right">Company</TableCell>
                                <TableCell align="right">Location</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Platform</TableCell>
                                <TableCell align="right">MatchedAt</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.jobTitle}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 },textAlign:"justify"}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.jobTitle}
                                    </TableCell>
                                    <TableCell align="right">{row.company}</TableCell>
                                    <TableCell align="right">{row.location}</TableCell>
                                    <TableCell align="right">{row.isApply}</TableCell>
                                    <TableCell align="right">{row.platform}</TableCell>
                                    <TableCell align="right">{row.matchedAt}</TableCell>
                                    <TableCell align="right">{row.action}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Card>
    );
}
 */
import { Card } from "@mui/material";
import React from "react";

export default function PlacementTable(){
    return(
        <Card>
            hello
        </Card>
    )
}