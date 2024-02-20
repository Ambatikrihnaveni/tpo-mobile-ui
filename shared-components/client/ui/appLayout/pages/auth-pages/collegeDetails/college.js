
import React, { useState } from 'react';
import { Card, Button, Grid, TextField, Typography,  } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { Form, Formik } from "formik";
import * as yup from "yup";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProgramService from '../../../../graphql/services/programs/myProgram-services';
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


function College() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddres] = useState('')
    const [overview, setOverView] = useState('')
    const [website, setWebsite] = useState('')
    const [collegeAdmin, setCollegeAdmin] = useState('')
    const [adminEmail, setAdminEmail] = useState('')
    const [designation, setDesignation] = useState('')
    const [specalization, setSpecalization] = useState('')
    const [batchCount, setBatchCount] = useState('')
    const [programsData, setProgramsData] = React.useState(null)
    const [open, setOpen] = React.useState();
    const [error, setError] = React.useState("")
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addresError, setAddresError] = useState('');
    const [overViewError, setOverViewError] = useState('');
    const [websiteError, setWebsiteError] = useState('');
    const [collegeError, setCollegeError] = useState('');
    const [adminError, setAdminError] = useState('');
    const [designationError, setDesignationError] = useState('')
    const [specalizationError, setSpecalizationError] = useState('')
    const [inputList, setInputList] = useState([])
    const [formData, setFormData] = useState([])

   
    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handelEmailChange = (e) => {
        setEmail(e.target.value)
    };
    const handelPhoneChange = (e) => {
        setPhone(e.target.value)
    };
    const handelAddresChange = (e) => {
        setAddres(e.target.value)
    };
    const handelOverViewChange = (e) => {
        setOverView(e.target.value)
    };
    const handelWebsiteChange = (e) => {
        setWebsite(e.target.value)
    };
    const handelCollegeChange = (e) => {
        setCollegeAdmin(e.target.value)
    };
    const handelAdminChange = (e) => {
        setAdminEmail(e.target.value)
    };
    const handelDesinChange = (e) => {
        setDesignation(e.target.value)
    };
    const handelSpacalChange = (e) => {
        setSpecalization(e.target.value)
    };

    const handleCancel = () => {
        setName('');
        setEmail('');
        setPhone('');
        setAddres('');
        setOverView('');
        setWebsite('');
        setCollegeAdmin('');
        setAdminEmail('');
        setDesignation('');
        setSpecalization('');
        setError('');
        setEmailError('');
        setPhoneError('');
        setAddresError('');
        setOverViewError('');
        setWebsiteError('');
        setCollegeError('');
        setAdminError('');
        setDesignationError('');
        setSpecalizationError('');
    };



    const onCreateCollegeDetails = async () => {
        
        let propdata = []

        if (name == "") {
            setError("Please enter  Name")
        } else if (email == "") {
            setEmailError("Please enter Email")
        } else if (phone == "") {
            setPhoneError("Please enter phone number")
        } else if (address == "") {
            setAddresError("Please enter valied addres")
        }
        else if (overview == "") {
            setOverViewError("Please enter overview")
        } else if (website == "") {
            setWebsiteError("Please select website")
        } else if (collegeAdmin == "") {
            setCollegeAdmin("Please select college admi")
        } else if (adminEmail == "") {
            setAdminEmail("Please select admin email")
        }
        else if (designation == "") {
            setDesignationError("Please select your designation")
        } else if (specalization == "") {
            setSpecalizationError("Please select your specalization")
        }
        const inputData = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            overview: overview,
            website: website,
            collegeAdmin: collegeAdmin,
            adminEmail: adminEmail,
            designation: designation,
            specalization: specalization,
            //shopId: shopId
        }
        setInputList((prevInputList) => [...prevInputList, inputData]);
        setFormData((prevFormData) => [...prevFormData, inputData]);


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
                name: '',
                email: '',
                phone: '',
                addres: '',
                overview: '',
                website: '',
                collegeAdmin: '',
                adminEmail: '',
                designation: '',
                specalization: ''
            }}

            validationSchema={validationSchema}
            enableReinitialize

        >{({ }) => (
            <Form style={{
                background: `url(${'https://us.123rf.com/450wm/yganko/yganko2304/yganko230402801/202538372-graduation-cap-with-books-illustration-generative-ai.jpg?ver=6'})`,
                   backgroundSize: 'cover', 
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    display: 'flex',
                    height: '100vh',
                    alignItems: 'center',
                    justifyContent: 'center',
            }}>
                <Card sx={{ width: {xs:'100%',md:'60%'}, alignSelf: 'center', margin: '0 auto', marginTop: '20px', }}>
                    <Div sx={{ p:{xs:2,md:5}}}>
                        <Div sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant='h2' sx={{ fontWeight: 'bold' }} >College Details</Typography>
                        </Div>
                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item xs={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b>Name</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="name"
                                    size="small"
                                    label="Enter  name"
                                    value={name}
                                    onChange={(e) => {
                                        handleNameChange(e);
                                        setError("");
                                    }}
                                />
                                {error && <Div sx={{ color: "red" }} >{error}</Div>}
                            </Grid>

                            <Grid item xs={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b> Email</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="email"
                                    label="Enter email"
                                    size="small"
                                    value={email}
                                    onChange={(e) => {
                                        handelEmailChange(e);
                                        setEmailError("");
                                    }}
                                />
                                {emailError && <Div sx={{ color: "red" }} >{emailError}</Div>}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '2px' }}>
                            <Grid item xs={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b>Phone Number</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    type='number'
                                    variant="outlined"
                                    name="phone"
                                    size="small"
                                    label="Enter Phone Number"
                                    value={phone}
                                    onChange={(e) => {
                                        handelPhoneChange(e);
                                        setPhoneError("");
                                    }}
                                />
                                {phoneError && <Div sx={{ color: "red" }} >{phoneError}</Div>}
                            </Grid>

                            <Grid item xs={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b> Address</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="addres"
                                    size="small"
                                    label="Enter Address"
                                    value={address}
                                    onChange={(e) => {
                                        handelAddresChange(e);
                                        setAddresError("");
                                    }}
                                />
                                {addresError && <Div sx={{ color: "red" }} >{addresError}</Div>}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '2px' }}>
                            <Grid item xs={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b>OverView</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="overview"
                                    size="small"
                                    label="Enter overview"
                                    value={overview}
                                    onChange={(e) => {
                                        handelOverViewChange(e);
                                        setOverViewError("");
                                    }}
                                />
                                {overViewError && <Div sx={{ color: "red" }} >{overViewError}</Div>}
                            </Grid>

                            <Grid item xs={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b> Website</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="website"
                                    size="small"
                                    label="Enter website"
                                    value={website}
                                    onChange={(e) => {
                                        handelWebsiteChange(e);
                                        setWebsiteError("");
                                    }}
                                />
                                {websiteError && <Div sx={{ color: "red" }} >{websiteError}</Div>}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '2px' }} >
                            <Grid item xs={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b>College Admin</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="college admin"
                                    size="small"
                                    label=" college admin name"
                                    value={collegeAdmin}
                                    onChange={(e) => {
                                        handelCollegeChange(e);
                                        setCollegeError("");
                                    }}
                                />
                                {collegeError && <Div sx={{ color: "red" }} >{collegeError}</Div>}
                            </Grid>

                            <Grid item xs={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b> Admin Email</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="admin email"
                                    size="small"
                                    label=" admin email"
                                    value={adminEmail}
                                    onChange={(e) => {
                                        handelAdminChange(e);
                                        setAdminError("");
                                    }}
                                />
                                {adminError && <Div sx={{ color: "red" }} >{adminError}</Div>}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '2px' }}>
                            <Grid item xs={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b>Designation</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="designation"
                                    size="small"
                                    label="admin designation"
                                    value={designation}
                                    onChange={(e) => {
                                        handelDesinChange(e);
                                        setDesignationError("");
                                    }}
                                />
                                {designationError && <Div sx={{ color: "red" }} >{designationError}</Div>}
                            </Grid>

                            <Grid item xs={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b>Specialization</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    name="spacalization"
                                    label="admin specialization"
                                    value={specalization}
                                    onChange={(e) => {
                                        handelSpacalChange(e);
                                        setSpecalizationError("");
                                    }}
                                />
                                {specalizationError && <Div sx={{ color: "red" }} >{specalizationError}</Div>}
                            </Grid>
                        </Grid>


                    </Div>



                    <Div sx={{ mt: 4, padding: '30px', textAlign: 'center' }}>

                        <Button variant='contained' onClick={onCreateCollegeDetails}>Save</Button>&nbsp;&nbsp;
                        <Button variant='outlined' onClick={handleCancel}>Cancel</Button>

                    </Div>
                </Card>
            </Form>

        )}
        </Formik>
    );
}
export default College;