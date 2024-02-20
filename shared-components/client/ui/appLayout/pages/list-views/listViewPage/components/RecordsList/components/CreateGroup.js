import React from 'react'
import { Formik, Form } from 'formik'
import Div from '../../../../../../../@jumbo/shared/Div/Div'
import { Button, Typography, TextField, IconButton, Alert, Snackbar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import useCurrentShopId from '../../../../../../../hooks/useCurrentShopId';
import { CollegeAdmin } from '../../../../../../../graphql/services/college-admin/collegeAdmin-services';
import { ToastContainer, toast } from 'react-toastify';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


export default function CreateGroup({ onClose, record, setIsDialog,setRecordsListRefresh }) {
    const [groupName, setGroupName] = useState('');
    const { shopId } = useCurrentShopId()
    const [selectedStartYear, setSelectedStartYear] = React.useState(null);
    const [selectedEndYear, setSelectedEndYear] = React.useState(null);
    const [stream, setStream] = useState()
    const [open, setOpen] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [value, setValue] = React.useState(new Date('2022-06-04T21:11:54'));

    const yearOptions = [];

    const currentYear = new Date().getFullYear();
    for (let year = 2000; year <= currentYear; year++) {
        yearOptions.push(
            <option key={year} >
                {year}
            </option>
        );
    }

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };

    const handleStreamChange = (event) => {
        setStream(event.target.value)
    }


    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    React.useEffect(() => {
        if (record) {
            setGroupName(record?.groupName)
            setStream(record?.stream)
            setSelectedStartYear(record?.selectedStartYear)
            setSelectedEndYear(record?.selectedEndYear)
        }
    }, [record])

    const handleInvite = async () => {
          
        if(record){
            const groupId = record?.id
            try {

                let isMounted = true;
                const group = await CollegeAdmin.updateStudentGroup(groupName, shopId, stream, selectedStartYear, selectedEndYear,groupId);
    
                toast.success('Update Group Successfully', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                setTimeout(() => {
                    onClose();
                }, "2500");
                setRecordsListRefresh(true);

                
                // hideDialogAndRefreshRecordsList()
            } catch (error) { }
    
            
        }else{
            try {

                let isMounted = true;
    
                const group = await CollegeAdmin.createStudentGroup(groupName, shopId, stream, selectedStartYear, selectedEndYear);
    
                toast.success('Group created Successfully', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setRecordsListRefresh(true);

                setTimeout(() => {
                    onClose();
                }, "2500");
    
            } catch (error) { }
        }
    }

   



    return (
        <div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={1500}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">

                    Group created Successfully
                </Alert>


            </Snackbar>

            <Formik
            >{({ }) => (
                <Form>

                    <Div sx={{ borderColor: "rgb(211, 215, 236)" }}>
                        <Div style={{ borderBottom: '2px solid rgb(211, 215, 236)', display: 'flex', alignItems: 'center', padding: '0px 24px', height: '3.8rem', position: 'relative', gap: '465px' }}>
                            <Typography variant='h5' style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", fontSize: '18px' }}>Create Group</Typography>
                            <IconButton
                                edge="end"
                                onClick={onClose}
                                aria-label="close"
                                sx={{
                                    marginLeft: '300px',
                                    marginTop: '-20px'
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Div>
                        <Div sx={{ display: 'flex' }}>
                            <Div sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', gap: '7px', width: '50%', marginTop: '7px', marginBottom: '10px' }}>
                                <Typography style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", display: 'block', padding: '10px', fontSize: '16px', marginBottom: '10px' }}>Group Name</Typography>
                                <TextField id="outlined-basic" placeholder="Ex:B.Tech-CSE (2021-25)" variant="outlined" value={groupName}
                                    onChange={handleGroupNameChange} />
                            </Div>
                            &nbsp; &nbsp;&nbsp;

                            <Div sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', gap: '7px', width: '50%', marginTop: '7px', marginBottom: '10px' }}>
                                <Typography style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", display: 'block', padding: '10px', fontSize: '16px', marginBottom: '10px' }}> Stream  </Typography>
                                <TextField id="outlined-basic" placeholder="Ex: Computer Science Engineering" variant="outlined" value={stream}
                                    onChange={handleStreamChange}



                                />
                            </Div>
                        </Div>

                        <Div sx={{ display: 'flex' }}>
                            <Div sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', gap: '7px', width: '80%', marginBottom: '50px' }}>
                                <Typography style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", display: 'block', padding: '10px', fontSize: '16px', marginBottom: '10px' }}>Start Year</Typography>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label=" Select Start Year"
                                            inputFormat="yyyy"
                                            value={selectedStartYear}
                                            onChange={(date) => setSelectedStartYear(date)}
                                            renderInput={(params) => <TextField {...params} format="yyyy" helperText="" />}
                                        />
                                    </Stack>
                                </LocalizationProvider>


                            </Div>
                            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;

                            <Div sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', gap: '7px', width: '80%', marginBottom: '50px' }}>
                                <Typography style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", display: 'block', padding: '10px', fontSize: '16px', marginBottom: '10px' }}> End year</Typography>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label=" Select End Year "
                                            inputFormat="yyyy"
                                            value={selectedEndYear}
                                            onChange={(date) => setSelectedEndYear(date)}
                                            renderInput={(params) => <TextField {...params} format={'yyyy'} helperText="" />}
                                        />
                                    </Stack>
                                </LocalizationProvider>

                            </Div>
                        </Div>

                        <Div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            width: '100%',
                            gap: '10px',
                            borderTop: '2px solid rgb(211, 215, 236)',
                            height: '3.8rem'
                        }}>
                            <Button style={{ color: '#50C2C9', fontWeight: 'bold' }} onClick={onClose}>Cancel</Button>
                            {record ? (
                                <Button
                                    variant='contained'
                                    style={{
                                        borderRadius: '10px',
                                    }}
                                    onClick={handleInvite}
                                >
                                    Update Group
                                </Button>
                            ) : (
                                <Button
                                    variant='contained'
                                    style={{
                                        borderRadius: '10px',
                                    }}
                                    onClick={handleInvite}
                                    disabled={!groupName || groupName.trim() === '' || !stream || stream.trim() === '' || !selectedStartYear || !selectedEndYear}
                                >
                                    Create Group
                                </Button>
                            )}
                        </Div>
                    </Div>
                    <ToastContainer
                        position="top-right"
                        autoClose={1500}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </Form>
            )}
            </Formik>
        </div>

    )
}
