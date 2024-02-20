import React, { useEffect, useState } from 'react';
import Div from '../../../../../../../@jumbo/shared/Div';
import StudentsService from '../../../../../../../graphql/services/students/students-service';
import useAuth from '../../../../../../../hooks/useAuth';
import useCurrentShopId from '../../../../../../../hooks/useCurrentShopId';
import { Grid } from '@material-ui/core';
import { Typography, IconButton, Button, TextField, InputAdornment } from '@mui/material'; // Import InputAdornment for the search icon
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import SearchIcon from '@mui/icons-material/Search'; // Import the SearchIcon

export default function ExistingStudents({ onClose, groupId,setRecordsListRefresh }) {
    const { viewer } = useAuth();
    const role = viewer?.role;
    const { shopId } = useCurrentShopId();
    const [studentEmail, setStudentEmail] = useState([]);
    const [studentId, setStudentId] = useState([]);
    const [checked, setChecked] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
   

    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            setStudentId(prevStudentIds => [...prevStudentIds, id]);
        } else {
            setStudentId(prevStudentIds => prevStudentIds.filter(studentId => studentId !== id));
        }
    }

    useEffect(async () => {
        const studentMail = [];
        const { students } = await StudentsService.getStudents(shopId);
        for (let i = 0; i < students?.length; i++) {
            studentMail.push({ email: students[i]?.emailRecords[0].address, name: students[i]?.name, id: students[i]?._id });
        }
        setStudentEmail(studentMail);
    }, [groupId]);

    const filteredStudents = studentEmail.filter(student =>
        student?.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        student?.email?.toLowerCase().includes(searchQuery?.toLowerCase())
    );



    const handleAdd = async () => {
        const { existingData } = await StudentsService.existingStudentsToGroup(groupId, studentId);
        onClose();
        setRecordsListRefresh(true)


    }

    return (
        <Div>
            <Div style={{ borderBottom: '2px solid rgb(211, 215, 236)', display: 'flex', alignItems: 'center', padding: '0px 24px', height: '3.8rem', position: 'relative', gap: '465px', marginBottom: '10px' }}>
                <Typography variant='h5' edge="start" style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", fontSize: '18px' }}>Add Existing Students</Typography>
                <IconButton
                    edge="end"
                    onClick={onClose}
                    aria-label="close"
                    sx={{
                        marginLeft: '20px'
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Div>

            {/* Search Box */}
            <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                placeholder="Search Students"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Div style={{ border: '1px solid lightgray', borderRadius: '10px', minHeight: '400px', maxHeight: '350px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', alignItems: 'center' }} sx={{ margin: "20px" }}>
                            <Grid item xs={2}>

                            </Grid>
                            <Grid item xs={5}>
                                <Typography style={{ fontWeight: "bold" }}>Name</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography style={{ fontWeight: "bold" }}>Email</Typography>

                            </Grid>
                        </div>

                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {filteredStudents?.map((student, index) => (
                        <Grid item xs={12} key={index}>
                            <Typography>
                                <div key={index} style={{ display: 'flex', alignItems: 'center' }} sx={{ margin: "20px" }}>
                                    <Grid item xs={2}>
                                        <Checkbox name="students"
                                            {...label}
                                            onChange={(event) => handleCheckboxChange(event, student.id)} />
                                    </Grid>
                                    <Grid item xs={5}>
                                        {student?.name}
                                    </Grid>
                                    <Grid item xs={5}>
                                        {student?.email}
                                    </Grid>
                                </div>
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
                <Button variant='contained' style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    margin: '40px'
                }}
                    onClick={handleAdd}
                // disabled={studentId.length === 0} 
                >Add To Group</Button>

            </Div>
        </Div>
    )
}
