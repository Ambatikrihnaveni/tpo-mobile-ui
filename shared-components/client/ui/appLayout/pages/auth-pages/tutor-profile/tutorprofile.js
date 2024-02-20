import React, { useState } from 'react'
import { Grid, } from '@material-ui/core'
import { TextField, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Autocomplete } from "@mui/material";
import Div from "../../../../@jumbo/shared/Div";
import { Card, CardContent, InputLabel,} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { Form, Formik, FieldArray } from "formik";
import JumboSelectField from "@jumbo/components/JumboFormik/JumboSelectField";
import { useDropzone } from "react-dropzone";
import DndWrapper from "../../../../../ui/appLayout/pages/extensions/dropzone/components/DndWrapper";
import List from "@mui/material/List";
import { useQuery } from "@apollo/react-hooks";
import { ListItem } from "@mui/material";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import "./tutorprofile.css";
import { CheckCircle } from '@material-ui/icons';
import { css } from '@emotion/react';
import { BounceLoader } from 'react-spinners';
import useSwalWrapper from "../../../../@jumbo/vendors/sweetalert2/hooks";
import * as yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import 'react-datepicker/dist/react-datepicker.css';
import ProfileMediaGallery from '../../../shared/widgets/AuthUserDropdown/profileMediaGallery';
import useAuth from '../../../../hooks/useAuth';


const validationSchema = yup.object().shape({
    qualification: yup
        .string("Select your qualification")
        .required("Qualification is required"),
    experience: yup
        .string("Select your experience")
        .required("Select your Experience"),
    price: yup
        .string("Price is required")
        .required("Price is required"),

});

const institutesList = gql`
  query defaultShops($query: String) {
    defaultShops(query: $query) {
        _id
        name
    }
  }
`

const updateTutorMutation = gql`
    mutation updateTutor($input: UpdateTutorProfileInput!) {
        updateTutor(input: $input)
    }
`
const days = {
    assets: [],
};

const courseCategoryData = [
    {
        label: "MERN Stack",
        value: "MERN Stack",
    },
    {
        label: "Frontend Development",
        value: "Frontend Development",
    },
    {
        label: "Wordpress Development",
        value: "Wordpress Development",

    },
    {
        label: "Manual Testing",
        value: "Manual Testing",
    },
    {
        label: "Digital Marketing",
        value: "Digital Marketing",

    },
    {
        label: "ITES Non-Voice or BPO Non-Voice",
        value: "ITES Non-Voice or BPO Non-Voice",
    },
    {
        label: "Banking and Financial",
        value: "Banking and Financial"
    },

]
const categoriesData = [
    {
        label: "MERN Stack",
        value: "MERN Stack",
    },
    {
        label: "Frontend Development",
        value: "Frontend Development",
    },
    {
        label: "Wordpress Development",
        value: "Wordpress Development",
    },
    {
        label: "Manual Testing",
        value: "Manual Testing",
    },
    {
        label: "Digital Marketing",
        value: "Digital Marketing",
    },
    {
        label: "ITES Non-Voice or BPO Non-Voice",
        value: "ITES Non-Voice or BPO Non-Voice",
    },
    {
        label: "Banking and Financial",
        value: "Banking and Financial"
    },
    {
        label: <strong style={{ fontSize: '16px' }}>Programming Language:-</strong>,
        value: "Programming Language",
        isTitle: true,
    },
    "Python",
    "Java",
    "JavaScript",
    "C",
    "C++",
    "C#",
    "Ruby",
    "Swift",
    "Kotlin",
    "Go (Golang)",
    "PHP",
    "R",
    "MATLAB",
    "SQL",
    "HTML",
    "CSS",
    "Bash",
    "TypeScript",
    "Objective-C",
    "Rust",
    {
        label: <strong style={{ fontSize: '16px' }}>Web Technologies:-</strong>,
        value: "Web Technologies",
        isTitle: true,
    },
    "HTML",
    "CSS",
    "JavaScript",
    "DOM(Document Object Module)",
    "Ajax (Asynchronous JavaScript and XML)",
    "JSON (JavaScript Object Notation)",
    "RESTful APIs (Representational State Transfer)",
    "Web Servers (e.g., Apache, Nginx)",
    "Web Browsers (e.g., Chrome, Firefox, Safari)",
    "Node.js",
    "React.js",
    "Angular",
    "Vue.js",
    "WebSockets",
    "Responsive Web Design",
    "WebAssembly (Wasm)",
    "GraphQL",
    "Content Management Systems (CMS)",
    "SSL/TLS (Secure Socket Layer/Transport Layer Security)",
    {
        label: <strong style={{ fontSize: '16px' }}>Framework's:-</strong>,
        value: "Framework's",
        isTitle: true,
    },
    " Django (Python)",
    "Ruby on Rails (Ruby)",
    "Express.js (JavaScript - Node.js)",
    "Spring Boot (Java)",
    " Flask (Python)",
    "Angular (JavaScript/TypeScript)",
    "React (JavaScript)",
    "Vue.js (JavaScript)",
    "React Native (JavaScript)",
    " Flutter (Dart)",
    "Xamarin (C#)",
    "FastAPI (Python)",
    "TensorFlow (Python)",
    "PyTorch (Python)",
    "Scikit-Learn (Python)",
    "Unity (C#)",
    "Unreal Engine (C++)",
    {
        label: <strong style={{ fontSize: '16px' }}>Testing Related Technologies:-</strong>,
        value: "Testing Related Technologies",
        isTitle: true,
    },
    "Selenium",
    "JUnit",
    "TestNG ",
    " Pytest ",
    "Mocha (JavaScript) ",
    "Jasmine (JavaScript) ",
    "Jest (JavaScript)",
    " NUnit (C#)",
    "xUnit (Multiple languages) ",
    " Appium ",
    " TestComplete ",
    "Protractor ",
    "Cypress (JavaScript) ",
    " Apache JMeter",
    " SoapUI ",
    " Postman ",
    " JIRA",
    " TestRail",
    " Appium",
    " Robot Framework",

];


const EditProfileUI = () => {

    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = React.useState(viewer);
    const [selectedFromTime, setSelectedFromTime] = React.useState('');
    const [selectedToTime, setSelectedToTime] = React.useState('');
    const [certificates, setCertificates] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { loading, data: institutesData, refetch } = useQuery(institutesList);
    const [updateTutor] = useMutation(updateTutorMutation, { ignoreResults: true });
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedInstitutes, setSelectedInstitutes] = useState([])
    const [displayError, setDisplayError] = useState("")
    let d = new Date();

    React.useEffect(() => {
        if (viewer) {
            setUser(viewer);
        }
    }, [viewer]);

    const assets = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleAutocompleteChange = (event, value) => {
        setSelectedOptions(value);
    };
    const handleInstitutesChange = (event, value) => {

        setSelectedInstitutes(value)
    }

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedDays([...selectedDays, value]);
        } else {
            setSelectedDays(selectedDays.filter((day) => day !== value));
        }
    };

    const override = css`
  display: block;
  margin: 0 auto;
`;

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const files = acceptedFiles.map(file => (
        <ListItem selected key={file.path} sx={{ width: 'auto', mr: 1 }}>
            {file.path} - {file.size} bytes
        </ListItem>
    ));


    const handleFileChange = (event) => {
        setCertificates(event.target.value);
    };

    const Transition = React.forwardRef((props, ref) => {
        return <Slide direction="down" ref={ref} {...props} />;
    });

    const handleFromTimeChange = (e) => {
        setSelectedFromTime(e.target.value);

    }
    const handleToTimeChange = (event) => {
        setSelectedToTime(event.target.value)
    }

    const submit = async (qualification, experience, price, files, selectedDays, courseCategory, selectedFromTime, selectedToTime) => {
        if (selectedInstitutes.length === 0) {
            setDisplayError("Please select at least one Institute")
        }

        const institutes = []
        for (let selectedInstituteData of selectedInstitutes) {
            let shopId = selectedInstituteData?._id;
            institutes.push(shopId);
        }
        const categories = selectedOptions?.map((itm) => itm.value);
        const { data } = await updateTutor({
            variables: {
                input: {
                    qualification,
                    experience,
                    price,
                    categories: categories,
                    shopIds: institutes,
                    availableDays: selectedDays,
                    selectedFromTime: selectedFromTime,
                    selectedToTime: selectedToTime,
                }
            }
        });
        if (data.updateTutor == true) {
            navigate(`/user/profile-setup-success`)
        }
    }

    const Swal = useSwalWrapper();
    const sweetAlerts = () => {
        Swal.fire({
            icon: 'success',

            title: 'Success',
            text: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
        });
    }


    return (
        <Div className="bg-gradiant" style={{ backgroundImage: `url("/images/authBg.png")` }}>
            <Div
                style={{
                    width: 800,
                    maxWidth: "100%",
                    margin: "auto",
                    boxShadow: "3px 6px 6px 4px rgba(0, 0, 0, 0.4)"

                }}>
                <Card
                    style={{
                        display: "flex",
                        minWidth: "100px",
                        flexDirection: { xs: "column", md: "row" },
                        minHeight: 400
                    }}
                >
                    <CardContent
                        sx={{
                            flex: 1,
                            p: 4,
                            backgroundColor: "white"
                        }}>
                       
                        <Div sx={{ mt: "auto", mb: 3 }}>
                            <Link href="#" underline="none" sx={{ display: "inline-flex" }}>
                                <img src="/logo192.png" alt="tpo.aiLogo" width="120px" />
                            </Link>

                            <ProfileMediaGallery
                                editable={true}
                                media={user?.userMedia}
                                userId={user?._id}
                            />

                        </Div>
                        <Typography variant="body" sx={{ color: '#50C2C9', fontSize: '20px' }}>Complete your Profile</Typography>
                        <Formik
                            validateOnChange={true}
                            initialValues={{
                                qualification: '',
                                experience: "",
                                price: "",
                                selectedDays,
                                selectedOptions: [],
                                selectedInstitutes: [],
                                selectedFromTime: "",
                                selectedToTime: ""


                            }}
                            validateOnBlur={false}
                            validationSchema={validationSchema}
                            onSubmit={(data, { setSubmitting }) => {
                                setSubmitting(true);
                                submit(data.qualification, data.experience, data.price, files, selectedDays, data.courseCategory, selectedFromTime, selectedToTime);
                                setSubmitting(false);
                            }}
                            sx={{ color: '#263238' }}
                        >
                            {({ isSubmitting, errors, touched, props }) => (
                                <Form >
                                    {open &&
                                        <Dialog
                                            open={open}
                                            onClose={() => setOpen(false)}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <CheckCircle color="primary" style={{ marginRight: '0.5em' }} />
                                                    <span>Success</span>
                                                    <div style={{ marginLeft: '0.5em' }}>
                                                        <BounceLoader color="#4CAF50" loading={true} css={override} size={24} />
                                                    </div>
                                                </div>
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">

                                                    You have successfully applied for Tutor, Admin will review your application and send result to your email
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button ><Link to="/user/login">OK</Link></Button>
                                                <Button onClick={() => setOpen(false)}>Back</Button>


                                            </DialogActions>
                                        </Dialog>
                                    }
                                    <Div sx={{ mt: 3, mb: 3 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple1-select-label" style={{ marginTop: -1 }}>Qualification *</InputLabel>

                                            <JumboSelectField
                                                fullWidth
                                                labelId="demo-simple1-select-label"
                                                id="demo-simple1-select"
                                                name="qualification"
                                                label="Qualification"
                                                size="small"
                                            >
                                                <MenuItem value="PG">PG</MenuItem>
                                                <MenuItem value="B-Tech">B-Tech</MenuItem>
                                                <MenuItem value="M-Tech">M-Tech</MenuItem>
                                            </JumboSelectField>
                                        </FormControl>

                                    </Div>
                                    <Div sx={{ mt: 1, mb: 3 }}>

                                        <Autocomplete
                                            multiple
                                            value={selectedOptions}
                                            onChange={handleAutocompleteChange}
                                            options={categoriesData}
                                            size='small'
                                            renderInput={(params) => (
                                                <TextField {...params} label="Course category *" variant="outlined" />
                                            )}
                                        />
                                    </Div>
                                    <Div sx={{ mt: 1, mb: 3 }}>

                                        <Autocomplete
                                            multiple
                                            size="small"
                                            options={institutesData ? institutesData.defaultShops : []}
                                            onChange={handleInstitutesChange}
                                            getOptionLabel={(option) => option?.name}
                                            value={selectedInstitutes}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Institutes *"

                                                />
                                            )}
                                        />
                                        <Typography color={"red"}>{displayError}</Typography>
                                    </Div>
                                    <Div sx={{ mt: 1, mb: 3 }}>

                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label"
                                                style={{ marginTop: -1 }}>Experience *</InputLabel>

                                            <JumboSelectField
                                                fullWidth
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="experience"
                                                label="Experience"
                                                size="small"
                                            >
                                                <MenuItem value="" disabled>
                                                    Select Experience
                                                </MenuItem>
                                                <MenuItem value="No-Experience">No-Experience</MenuItem>
                                                <MenuItem value="1 Year">1 Year</MenuItem>
                                                <MenuItem value="1-2 Years">1-2 Years</MenuItem>
                                                <MenuItem value="2-3 Years">2-3 Years</MenuItem>
                                                <MenuItem value="5-10 Years">5-10 Years</MenuItem>
                                                <MenuItem value="Above 10 Years">Above 10 Years</MenuItem>
                                                <MenuItem value="0-1 Year">Just started</MenuItem>

                                            </JumboSelectField>

                                        </FormControl>
                                    </Div>
                                    <Div>
                                        <InputLabel id="demo-select-small" >Available week days *</InputLabel>
                                        <br />

                                        <FieldArray
                                            name="assets"
                                            render={(arrayHelpers) => (
                                                <Grid container>
                                                    {assets.map((asset, idx) => (
                                                        <Grid item sm={3} xs={6}>
                                                            <label>
                                                                <input
                                                                    name="selectedDays"
                                                                    type="checkbox"
                                                                    value={asset}
                                                                    checked={selectedDays.includes(asset)}
                                                                    onChange={handleCheckboxChange}
                                                                />
                                                                <span className="mx-2" style={{ paddingLeft: '5px' }}>{asset}</span>
                                                            </label>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            )}
                                        />
                                    </Div>
                                    <br />
                                    <Div>
                                        <InputLabel id="demo-select-small" >Available Timings *</InputLabel>
                                        <br />

                                        <Grid container spacing={2} style={{ display: 'flex' }} >
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="time"
                                                    label=" Start Time"
                                                    type="time"
                                                    fullWidth
                                                    onChange={handleFromTimeChange}
                                                    selected={selectedFromTime}
                                                    defaultValue="00:00"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        step: 300, // 5 min
                                                    }}

                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="time"
                                                    label=" End Time"
                                                    type="time"
                                                    fullWidth
                                                    onChange={handleToTimeChange}
                                                    selected={selectedToTime}
                                                    defaultValue="00:00"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        step: 300, // 5 min
                                                    }}

                                                />
                                            </Grid>
                                        </Grid>
                                        <br></br>
                                       
                                    </Div>

                                    <br />
                                    <Div>
                                        <InputLabel id="demo-select-small">Certificates</InputLabel>

                                        <DndWrapper style={{ height: '5px' }}>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Typography variant={"body1"} onChange={handleFileChange}>Click here to Select your file</Typography>
                                            </div>
                                        </DndWrapper>
                                       
                                        <List disablePadding sx={{ display: 'flex' }}>
                                            {files}
                                        </List>

                                    </Div>
                                    <Div sx={{ mt: 1, mb: 3 }}>
                                        <JumboTextField
                                            fullWidth
                                            name="price"
                                            label="Price per Hour *"
                                            size="small"
                                        />

                                    </Div>

                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        size="large"

                                        sx={{ mb: 3, mt: 1, ml: 38 }}
                                        loading={isSubmitting}
                                    >Complete</LoadingButton>
                                    <Typography variant={"body1"} sx={{ ml: 30, mt: 2, fontSize: '20px' }}>
                                        Alreay have an account?{" "}
                                        <Link
                                            to={"/user/login"}
                                            style={{ color: 'blue' }}
                                        >Login</Link></Typography>
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>
            </Div>
        </Div>

    )
}
export default EditProfileUI;
