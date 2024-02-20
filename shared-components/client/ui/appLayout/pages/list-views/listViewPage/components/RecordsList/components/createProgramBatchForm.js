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
import MyProgramService from '../../../../../../../graphql/services/programs/myProgram-services';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Checkbox from '@mui/material/Checkbox';
import useCurrentShopId from '../../../../../../../hooks/useCurrentShopId';
import Admissions from '../../../../../../../graphql/services/admissions/admission-service';
import CertificatesServices from '../../../../../../../graphql/services/certificates/certificates-services';
import CertificateSlides from './certificateSlides';
import CloseIcon from '@mui/icons-material/Close';

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


function CreateProgramBatchForm({ onClose, record, setRecordsListRefresh }) {

    const { shopId } = useCurrentShopId()
    const [batchName, setBatchName] = useState('')
    const [programtype, setProgramtype] = useState('')
    const [program, setProgram] = useState('')
    const [programPrice, setProgramPrice] = useState('')
    const [startDate, setStartDate] = useState('');
    const [enrolementStartDate, setEnrolementStartDate] = useState('');
    const [enrolementEndDate, setEnrolementEndDate] = useState('');
    const [selectedFromTime, setSelectedFromTime] = useState('')
    const [selectedToTime, setSelectedToTime] = useState('')
    const [batchCount, setBatchCount] = useState('')
    const [programsData, setProgramsData] = React.useState(null)
    const [open, setOpen] = React.useState();
    const [error, setError] = React.useState("")
    const [programtypeError, setProgramtypeError] = useState('');
    const [programError, setProgramError] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [enrolementStartDateError, setEnrolementStartDateError] = useState('');
    const [enrolementEndDateError, setEnrolementEndDateError] = useState('');
    const [batchCountError, setBatchCountError] = useState('');
    const [fromTimeError, setFromTimeError] = useState('');
    const [toTimeError, setToTimeError] = useState('');
    const [checked, setChecked] = React.useState([false, false, false,]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedMode, setSelectedMode] = useState(null);
    const trainingModes = ['Online', 'Offline', 'Self-paced'];
    const [certificates, setCertificates] = React.useState([])
    const [selectCertificate, setSelectCertificate] = React.useState()
    const availableDay = (day) => {

        if (selectedDays?.includes(day)) {
            setSelectedDays(selectedDays?.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };


    const handleCheckboxChange = (mode) => {
        setSelectedMode(mode);
    };



    React.useEffect(async () => {
        const certificatesData = await CertificatesServices.getCertificates(shopId)
        if (certificatesData) {
            setCertificates(certificatesData)
        }
        if (record) {
            setBatchName(record.name)
            setProgramtype(record.program.type)
            setProgram(record?.program?._id)
            setStartDate(record.startDate)
            setEnrolementStartDate(record?.enrolementStartDate);
            setEnrolementEndDate(record?.enrolementEndDate);
            setSelectedFromTime(record.batchStartTime)
            setSelectedToTime(record.batchEndTime)
            setBatchCount(record.batch_max_limit)
            setSelectedMode(record.mode)
            if (record?.certificate) {
                setSelectCertificate(record?.certificate)
            }
            if (record.availableDays) {
                setSelectedDays(record.availableDays)
            }
            const type = record.program.type
            const records = await MyProgramService.getRecords(shopId, {}, record.program.type);
            let data = []
            for (let i = 0; i < records?.[type].length; i++) {
                data.push({
                    id: records?.[type][i].id,
                    duration: records?.[type][i].duration,
                    name: records?.[type][i].name,
                    price:records?.[type][i].price
                })
            }
            setProgramsData(data)

            const  filteredProgram = data?.find(program=> program?.id== record?.program?._id)
            setProgramPrice(filteredProgram?.price)
        }

    }, [record])

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

                let data = []
                for (let i = 0; i < records?.internships.length; i++) {
                    data.push({
                        id: records?.internships[i].id,
                        duration: records?.internships[i].duration,
                        name: records?.internships[i].name,
                        price:records?.[type][i].price
                    })
                }
                setProgramsData(data)
            } else if (type == "courses") {

                let data = []
                for (let i = 0; i < records?.courses.length; i++) {
                    data.push({
                        id: records?.courses[i].id,
                        duration: records?.courses[i].duration,
                        name: records?.courses[i].name,
                        price:records?.[type][i].price
                    })
                }
                setProgramsData(data)
            } else if (type == "projects") {

                let data = []
                for (let i = 0; i < records?.projects.length; i++) {
                    data.push({
                        duration: records?.projects[i].duration,
                        id: records?.projects[i].id,
                        name: records?.projects[i].name,
                        price:records?.[type][i].price
                    })
                }
                
                setProgramsData(data)
            }
        }


    };

    const handleProgramChange = (event) => {

        setProgram(event.target.value);

        let data = programsData.find(program=>program.id == event.target.value )
        setProgramPrice(data.price)
if(data.price== '0'){
    setSelectedMode('Self-paced')
}
    };

    const handleInputChange = (e) => {

        setBatchName(e.target.value && e.target.value[0].toUpperCase() + e.target.value.slice(1) )


    }

    const handlelStartDateChange = (e) => {
        setStartDate(e.target.value)
    };

    const handlelEnrolementStartDateChange = (e) => {
        setEnrolementStartDate(e.target.value)
    };

    const handlelEnrolementEndDateChange = (e) => {
        setEnrolementEndDate(e.target.value)
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };


    const onCreateBatch = async () => {
        
        let propdata = []
        setError('');
        setProgramtypeError('');
        setProgramError('');
        setBatchCountError('');
        setStartDateError('');
        setEnrolementStartDateError('');
        setEnrolementEndDateError('');
        setFromTimeError('');
        setToTimeError('');


        if ((programPrice != "0") && (!batchName || !programtype || !program || !batchCount || !startDate || !selectedFromTime || !selectedToTime)) {
            // Set error messages for the empty fields
            if (!batchName) setError('Please enter Batch Name');
            if (!programtype) setProgramtypeError('Please select Program Type');
            if (!program) setProgramError('Please Select Program');
            if (!batchCount) setBatchCountError('Please enter Batch Count');
            if (!startDate) setStartDateError('Please select Valid Date');
            if (!enrolementStartDate) setEnrolementStartDateError('Please select Valid Enrolement Start Date');
            if (!enrolementEndDate) setEnrolementEndDateError('Please select Valid Enrolement End Date');
            if (!selectedFromTime) setFromTimeError('Please select Start Time');
            if (!selectedToTime) setToTimeError('Please select End Time');
            return; // Don't proceed with submission
        }

        const inputData = {
            name: batchName,
            programType: programtype,
            programId: program,
            startDate: startDate,
            enrolementStartDate: enrolementStartDate,
            enrolementEndDate: enrolementEndDate,
            batchStartTime: selectedFromTime,
            batchEndTime: selectedToTime,
            batch_max_limit: batchCount,
            certificateId: selectCertificate?._id,
            shopId: shopId,
            mode: selectedMode,
            availableDays: selectedDays

        }
        if (record) {
            editProgramBatch()
        } else {
            try {
                const data = await MyProgramService.createProgramBatch(inputData)
                toast.success("Admission Created Successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    onClose()
                }, "1000");

            } catch (errors) {
                toast.error((errors?.message) ? errors?.message : "Unable to Create Admission", {
                    position: "top-right",
                    autoClose: 3000,
                    // hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
        setRecordsListRefresh(true)
    }


    const editProgramBatch = async () => {
        const inputData = {
            name: batchName,
            programType: programtype,
            programId: program,
            startDate: startDate,
            enrolementStartDate: enrolementStartDate,
            enrolementEndDate: enrolementEndDate,
            batchStartTime: selectedFromTime,
            batchEndTime: selectedToTime,
            batch_max_limit: batchCount,
            certificateId: selectCertificate?._id,
            id: record?.id,
            mode: selectedMode,
            availableDays: selectedDays
        }
        try {
            const data = await Admissions.updataBatch(inputData)

            toast.success("Admission Updated Successfully", {
                position: "top-right",
                autoClose: 3000,
                // hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                onClose()
            }, "1000");


        } catch (errors) {
            toast.error((errors?.message) ? errors?.message : "Unable to Update Admission", {
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
        <>
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
                        <CloseIcon  onClick={onClose} sx={{float:'right',mt:1,fontSize:'20px'}}/>
                        <Div sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
                            <Typography variant='h2' sx={{ fontWeight: 'bold' }} >Create Admission</Typography>
                        </Div>
                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item xs={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b> Admission Name</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="batchName"
                                    label="Enter Admission Name"
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
                                        {programsData?.map((program) => (
                                            <MenuItem key={program.id} value={program.id}>{program.name}  -  ({program.duration})</MenuItem>
                                        ))}
                                    </Select>
                                    {programError && <Div sx={{ color: "red" }} >{programError}</Div>}

                                </FormControl>


                            </Grid>

                            <Grid item xs={6} sx={{ mt: 2,display:(programPrice == "0")? "none":"block"  }} >
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
                            <Grid item xs={6} sx={{ mt: 2 ,display:(programPrice == "0")? "none":"block" }} >
                                <Typography sx={{ padding: '3px 3px' }}> <b> Program Start Date</b></Typography>
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

                            <Grid item xs={3} sx={{ mt: 2,display:(programPrice == "0")? "none":"block" }}>
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
                            <Grid item xs={3} sx={{ mt: 2 ,display:(programPrice == "0")? "none":"block" }} >
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
                            <Grid item xs={6} sx={{ mt: 2,display:(programPrice == "0")? "none":"block"  }} >
                                <Typography sx={{ padding: '3px 3px' }}> <b>Enrollment Start Date</b></Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3} fullWidth size='small'>
                                        <TextField
                                            id="date"
                                            label="Enrollment Start Date"
                                            type="date"
                                            value={enrolementStartDate}
                                            onChange={(e) => { handlelEnrolementStartDateChange(e,); setEnrolementStartDateError("") }}

                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        {enrolementStartDateError && <Div sx={{ color: "red" }} >{enrolementStartDateError}</Div>}

                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6} sx={{ mt: 2,display:(programPrice == "0")? "none":"block"  }} >
                                <Typography sx={{ padding: '3px 3px' }}> <b>Enrollment Last Date</b></Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3} fullWidth size='small'>
                                        <TextField
                                            id="date"
                                            label="Enrollment End Date"
                                            type="date"
                                            value={enrolementEndDate}
                                            onChange={(e) => { handlelEnrolementEndDateChange(e,); setEnrolementEndDateError("") }}

                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        {enrolementEndDateError && <Div sx={{ color: "red" }} >{enrolementEndDateError}</Div>}

                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6} sx={{ mt: 2 }}>
                                
                                <Grid sx={{ display: 'flex',display:(programPrice == "0")? "none":"block" }}>
                                <Typography sx={{ padding: '3px 3px' }}>
                                    <b>Training Mode</b>
                                </Typography>
                                    {trainingModes.map((mode) => (
                                        <div key={mode} sx={{ display: 'flex', ml: 8 }}>
                                            <Grid sx={{ display: "flex" }}>
                                                <Checkbox
                                                    checked={selectedMode === mode}
                                                    onChange={() => handleCheckboxChange(mode)}
                                                    inputProps={{ 'aria-label': mode }}
                                                />
                                                <Typography variant={'h5'} sx={{ mt: 1.5 }} >
                                                    {mode}
                                                </Typography>
                                            </Grid>
                                        </div>
                                    ))}
                                </Grid>

                                <Typography sx={{ padding: '3px 3px', mt: 3 }}>
                                    <b>Add Certificate</b>
                                </Typography>
                                <Div sx={{ p: 2, mt: 2, cursor: 'pointer', display: 'inline' }} onClick={handleClickOpen}>
                                    <img
                                        src={selectCertificate ? selectCertificate.templateImage : '/certificateTemplates/dummyCertificateBanner.jpg'}
                                        alt='Certificate'
                                        width='150px'
                                    />
                                    {!selectCertificate && <Typography sx={{ ml: 6, mt: -12 }}>Attach here</Typography>}
                                </Div>
                            </Grid>

                            <Grid item xs={6} sx={{ mt: 2 ,display:(programPrice == "0")? "none":"block" }} >
                                <Typography sx={{ padding: '3px 3px' }}> <b> Available Days</b></Typography>
                                <Grid sx={{ display: "flex" }}>
                                    <Div sx={{ display: "flex", }}>
                                        <Checkbox
                                            checked={selectedDays?.includes('Sunday')}
                                            onChange={() => availableDay('Sunday')}
                                            inputProps={{ 'aria-label': 'Sunday' }}
                                        />
                                        <Typography
                                            variant={"h5"}
                                            sx={{ mt: 1.5 }}
                                        >Sunday</Typography>
                                    </Div>
                                    <Div sx={{ display: "flex", }}>
                                        <Checkbox
                                            checked={selectedDays?.includes('Monday')}
                                            onChange={() => availableDay('Monday')}
                                            inputProps={{ 'aria-label': 'Monday' }} />
                                        <Typography
                                            variant={"h5"}
                                            sx={{ mt: 1.5 }}
                                        >Monday</Typography>
                                    </Div>
                                    <Div sx={{ display: "flex", }}>
                                        <Checkbox
                                            checked={selectedDays?.includes('Tuesday')}
                                            onChange={() => availableDay('Tuesday')}
                                            inputProps={{ 'aria-label': 'Tuesday' }}
                                        />
                                        <Typography
                                            variant={"h5"}
                                            sx={{ mt: 1.5 }}
                                        >Tuesday</Typography>
                                    </Div>
                                    <Div sx={{ display: "flex", }}>
                                        <Checkbox
                                            checked={selectedDays?.includes('Wednesday')}
                                            onChange={() => availableDay('Wednesday')}
                                            inputProps={{ 'aria-label': 'Wednesday' }}
                                        />
                                        <Typography
                                            variant={"h5"}
                                            sx={{ mt: 1.5 }}
                                        > Wednesday</Typography>
                                    </Div>
                                </Grid>
                                <Grid item xs={6} sx={{ mt: 2, display: "flex" }} >
                                    <Div sx={{ display: "flex", }}>
                                        <Checkbox
                                            checked={selectedDays?.includes('Thursday')}
                                            onChange={() => availableDay('Thursday')}
                                            inputProps={{ 'aria-label': 'Thursday' }} />
                                        <Typography
                                            variant={"h5"}
                                            sx={{ mt: 1.5 }}
                                        >Thursday</Typography>
                                    </Div>

                                    <Div sx={{ display: "flex", }}>
                                        <Checkbox
                                            checked={selectedDays?.includes('Friday')}
                                            onChange={() => availableDay('Friday')}
                                            inputProps={{ 'aria-label': 'Friday' }}
                                        />
                                        <Typography
                                            variant={"h5"}
                                            sx={{ mt: 1.5 }}
                                        >Friday</Typography>
                                    </Div>
                                    <Div sx={{ display: "flex", }}>
                                        <Checkbox
                                            checked={selectedDays?.includes('Saturday')}
                                            onChange={() => availableDay('Saturday')}
                                            inputProps={{ 'aria-label': 'Saturday' }} />
                                        <Typography
                                            variant={"h5"}
                                            sx={{ mt: 1.5 }}
                                        >Saturday</Typography>
                                    </Div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Div>

                    <Div sx={{ mt: 4, padding: '30px', textAlign: 'center' }}>
                        <Button variant='contained' onClick={onCreateBatch} disabled={(!batchName || !programtype || !program)? true:false }>Save</Button>&nbsp;&nbsp;
                        <Button variant='outlined' onClick={handleCancel}>Cancel</Button>

                    </Div>

                </Form>

            )}

            </Formik>
            <CertificateSlides
                open={open}
                handleClose={handleClose}
                certificates={certificates}
                setSelectCertificate={setSelectCertificate}
            />
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
        </>
    );
}

export default CreateProgramBatchForm