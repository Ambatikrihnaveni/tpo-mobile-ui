import React, { useState } from 'react';
import { Button, Grid, TextField, Typography, Select, MenuItem, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Div from "@jumbo/shared/Div";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from "@mui/x-date-pickers";
import Stack from '@mui/material/Stack';
import MyProgramService from '../../../../../../graphql/services/programs/myProgram-services';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useCurrentShopId from '../../../../../../hooks/useCurrentShopId';
import Admissions from '../../../../../../graphql/services/admissions/admission-service';



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


const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"), 
    name: yup.string("enter your name").required('Batch Name is required'),

});


function CollegeInfo({ onClose, record, onSave }) {
    
    const { shopId } = useCurrentShopId()
    const [batchName, setBatchName] = useState('')
    const [programtype, setProgramtype] = useState('')
    const [program, setProgram] = useState({})
    const [startDate, setStartDate] = useState('')
    const [selectedFromTime, setSelectedFromTime] = useState('')
    const [selectedToTime, setSelectedToTime] = useState('')
    const [batchCount, setBatchCount] = useState('')
    const [programsData, setProgramsData] = React.useState(null)
    const [open, setOpen] = React.useState();
    const [error, setError] = React.useState("")
    const [programtypeError, setProgramtypeError] = useState('');
    const [programError, setProgramError] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [batchCountError, setBatchCountError] = useState('');
    const [fromTimeError, setFromTimeError] = useState('');
    const [toTimeError, setToTimeError] = useState('')



    React.useEffect(() => {
        if (record) {
            setBatchName(record.name)
            setProgramtype(record.program.type)
            setProgram(record.program)
            setStartDate(record.startDate)
            setSelectedFromTime(record.batchStartTime)
            setSelectedToTime(record.batchEndTime)
            setBatchCount(record.batch_max_limit)
        }
    }, [])

    const handleCancel = () => {
        onClose();
    };

    const handleFromTimeChange = (e) => {
        setSelectedFromTime(e.target.value);
    };

    const handleToTimeChange = (e) => {
        setSelectedToTime(e.target.value);
    };



    const handleProgramTypeChange = async (event) => {
        
        setProgramtype(event.target.value);

        if (shopId) {
            const type = event.target.value
            const records = await MyProgramService.getRecords(shopId, {}, type);

            if (type == "internships") {
                //  data.programtype.programs = records?.internships
                setProgramsData(records?.internships)
            } else if (type == "courses") {
                //  data.programtype.programs = records?.courses
                setProgramsData(records?.courses)
            } else if (type == "projects") {
                setProgramsData(records?.projects)
                //   data.programtype.programs = records?.projects
            }
        }


    };

    const handleProgramChange = (event) => {

        setProgram(event.target.value);

    };

    const handleInputChange = (e) => {

        setBatchName(e.target.value)


    }

    const handlelStartDateChange = (e) => {
        setStartDate(e.target.value)
    };


    const onCreateBatch = async () => {

        let propdata = []

        if (batchName == "") {
            setError("Please enter Batch Name")
        } else if (programtype == "") {
            setProgramtypeError("Please select Program Type")
        } else if (program == {}) {
            setProgramError("Please Select Program")
        } else if (batchCount == "") {
            setBatchCountError("Pleasect Batch")
        }
        else if (startDate == "") {
            setStartDateError("Please select Valid Date")
        } else if (selectedFromTime == "") {
            setFromTimeError("Please select Start Time")
        } else if (selectedToTime == "") {
            setToTimeError("Please select End Time")
        }
        const inputData = {
            name: batchName,
            programType: programtype,
            programId: program.id,
            startDate: startDate,
            batchStartTime: selectedFromTime,
            batchEndTime: selectedToTime,
            batch_max_limit: batchCount,
            shopId: shopId
        }
        if (record) {
            editProgramBatch()
        } else {
            try {
                const data = await MyProgramService.createProgramBatch(inputData)

                onClose()
                toast.success("Program Batch Created Successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                onSave()
            } catch (error) {
                toast.error(error.graphQLErrors[0].message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            }
        }

    }



    const editProgramBatch = async() => {
        const inputData = {
            name: batchName,
            programType: programtype,
            programId: program.id,
            startDate: startDate,
            batchStartTime: selectedFromTime,
            batchEndTime: selectedToTime,
            batch_max_limit: batchCount,
            id: record?._id
        }
        try {
            const data = await Admissions.updataBatch(inputData)

            onClose()
            onSave()
            toast.success("Program Batch Updated Successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
           
        } catch (error) {
            toast.error(error.graphQLErrors[0].message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });


        }
    }

    return (
        <Formik
            validateOnChange={true}
            initialValues={{
                batchName: '',
                programtype: '',
                program: {},
                batchCount: '',
                batchStartTime: '',
                batchEndTime: '',
                startDate: ''
            }}

            validationSchema={validationSchema}
            //   onSubmit={onInvit}
            enableReinitialize

        >{({ }) => (
            <Form>


                <Div sx={{ p: 2 }}>
                    <Div sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
                        <Typography variant='h2' sx={{ fontWeight: 'bold' }} >Create Program Batch</Typography>
                    </Div>
                    <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                        <Grid item xs={6} >
                            <Typography sx={{ padding: '3px 3px' }}><b> Batch Name</b></Typography>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                name="batchName"
                                label="Enter Batch Name"
                                value={batchName}
                                // onChange={(e)=> handleInputChange(e)}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    setError("");
                                }}
                            />
                            {error && <Div sx={{ color: "red" }} >{error}</Div>}
                        </Grid>

                        <Grid item xs={6} >
                            <Typography sx={{ padding: '3px 3px' }}> <b> Program Type</b></Typography>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" style={{ marginBottom: '4px' }}>Program type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={programtype}
                                    label="Program Type"
                                    onChange={(event) => { handleProgramTypeChange(event); setProgramtypeError("") }}

                                >

                                    <MenuItem value={"internships"}>Internships</MenuItem>
                                    <MenuItem value={"courses"}>Courses</MenuItem>
                                    <MenuItem value={"projects"}>Projects</MenuItem>
                                </Select>
                                {programtypeError && <Div sx={{ color: "red" }} >{programtypeError}</Div>}

                            </FormControl>


                        </Grid>
                    </Grid>
                    <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                        <Grid item xs={6} sx={{ mt: 2 }}>
                            <Typography sx={{ padding: '3px 3px' }}> <b> Program</b> </Typography>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label"
                                >Program</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={program}
                                    label="Program"
                                    onChange={(event) => { handleProgramChange(event); setProgramError(""); }}
                                    sx={{ paddingTop: '5px' }}
                                >
                                    {programsData?.map((program, index) => (
                                        <MenuItem key={index} value={program}>{program.name}</MenuItem>
                                    ))}
                                </Select>
                                {programError && <Div sx={{ color: "red" }} >{programError}</Div>}

                            </FormControl>


                        </Grid>

                        <Grid item xs={6} sx={{ mt: 2 }} >
                            <Typography sx={{ padding: '3px 3px' }}> <b> Batch Count</b></Typography>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                value={batchCount}
                                label="Batch Count"
                                type='number'
                                onChange={(event) => { setBatchCount(event.target.value); setBatchCountError("") }}
                            />

                            {batchCountError && <Div sx={{ color: "red" }} >{batchCountError}</Div>}

                        </Grid>
                    </Grid>
                    <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                        <Grid item xs={6} sx={{ mt: 2 }} >
                            <Typography sx={{ padding: '3px 3px' }}> <b> Start Date</b></Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3} fullWidth size='small'>
                                    <TextField
                                        id="date"
                                        label="Start Date"
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => { handlelStartDateChange(e,); setStartDateError("") }}

                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    {startDateError && <Div sx={{ color: "red" }} >{startDateError}</Div>}

                                </Stack>
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={3} sx={{ mt: 2 }}>
                            <Typography sx={{ padding: '3px 3px' }}> <b> Time</b></Typography>
                            <TextField
                                id="time"
                                label=" Start Time"
                                type="time"
                                fullWidth
                                value={selectedFromTime}
                                onChange={(e) => { handleFromTimeChange(e); setFromTimeError("") }}
                                selected={selectedFromTime}
                                defaultValue="00:00"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}

                            />
                            {fromTimeError && <Div sx={{ color: "red" }} >{fromTimeError}</Div>}

                        </Grid>
                        <Grid item xs={3} sx={{ mt: 2 }} >
                            <TextField
                                id="time"
                                label=" End Time"
                                type="time"
                                fullWidth
                                value={selectedToTime}
                                onChange={(e) => { handleToTimeChange(e); setToTimeError("") }}
                                selected={selectedToTime}
                                defaultValue="00:00"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                sx={{ marginTop: '27px' }}

                            />
                            {toTimeError && <Div sx={{ color: "red" }} >{toTimeError}</Div>}

                        </Grid>


                    </Grid>
                </Div>



                <Div sx={{ mt: 4, padding: '30px', textAlign: 'center' }}>

                    <Button variant='contained' onClick={onCreateBatch}>Save</Button>&nbsp;&nbsp;
                    <Button variant='outlined' onClick={handleCancel}>Cancel</Button>

                </Div>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
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
    );
}

export default CollegeInfo