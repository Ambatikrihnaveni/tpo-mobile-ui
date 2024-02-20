import { Grid, Typography} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { InputLabel,} from "@mui/material";
import Div from "@jumbo/shared/Div";
import { Form, Formik,  FieldArray } from "formik";
import * as yup from "yup";
import IconButton from "@mui/material/IconButton";
import {  ListItem, } from "@mui/material";
import List from "@mui/material/List";
import React, {  useState } from 'react'
import {  Autocomplete } from "@mui/material";
import useJumboAuth from "../../../../@jumbo/hooks/useJumboAuth";
import { useDropzone } from "react-dropzone";
import DndWrapper from "../../../../../ui/appLayout/pages/extensions/dropzone/components/DndWrapper";
import { useQuery } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";
import "./tutorprofile.css";
import { css } from '@emotion/react';
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import 'react-datepicker/dist/react-datepicker.css';

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

export default function ProfileProfessional(params) {
    const { institute, categories, starttime, endtime, price, addInstitute, addCategories, addStarttime, addEndtime, addPrice, handleCheckboxChange, selectedDays } = params
    const [uploadedCertificates, setUploadedCertificates] = useState([]);

    const [selectedFromTime, setSelectedFromTime] = React.useState('');
    const [selectedToTime, setSelectedToTime] = React.useState('');
    const [certificates, setCertificates] = useState(null)
    const { setAuthToken, refetchViewer } = useJumboAuth();
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { loading, data: institutesData, refetch } = useQuery(institutesList);
    const [updateTutor] = useMutation(updateTutorMutation, { ignoreResults: true });
    const [selectedInstitutes, setSelectedInstitutes] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [displayError, setDisplayError] = useState("")
    let d = new Date();
    //setTime();
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
    const [labelShrink, setLabelShrink] = useState(false);

    const handleInputChange = (event) => {
        if (event.target.value !== '') {
            setLabelShrink(true);
        } else {
            setLabelShrink(false);
        }
    };


    const override = css`
  display: block;
  margin: 0 auto;
`;

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setUploadedCertificates([...uploadedCertificates, ...acceptedFiles]);
        },
    });
 

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
        const { data } = await updateTutor({
            variables: {
                input: {
                    qualification,
                    experience,
                    price,
                    categories: selectedOptions,
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

    const removeCertificate = (index) => {
        const updatedCertificates = [...uploadedCertificates];
        updatedCertificates.splice(index, 1);
        setUploadedCertificates(updatedCertificates);
    };

    return (
        <Div>
            <h2 style={{ width: '100%', color: '#2e475D', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem', paddingRight: '350px', paddingLeft: '50px' }}>Tell us about your professional</h2>
            <p style={{ color: '#2e475D', fontSize: ' 1.5rem', margin: '5px', paddingLeft: '50px' }}>We’ll start there and work backward.
            </p>
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

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Div sx={{ mt: 3, mb: 3 }}>

                                    <Autocomplete
                                        multiple
                                        size="small"
                                        options={institutesData ? institutesData?.defaultShops : []}
                                        //onChange={handleInstitutesChange}
                                        onChange={addInstitute}
                                        getOptionLabel={(option) => option?.name}
                                        //value={selectedInstitutes}
                                        value={institute ? institute : []}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Institutes *"

                                            />
                                        )}
                                    />
                                    <Typography color={"red"}>{displayError}</Typography>
                                </Div>
                            </Grid>
                            <Grid item xs={6}>
                                <Div sx={{ mt: 3, mb: 3 }}>

                                    <Autocomplete
                                        multiple
                                        value={categories ? categories : []}
                                        onChange={addCategories}
                                        options={categoriesData}
                                        size='small'
                                        renderInput={(params) => (
                                            <TextField {...params} label="Course category *" variant="outlined" />
                                        )}
                                    />
                                </Div>
                            </Grid>
                        </Grid>

                        <Div>
                            <InputLabel id="demo-select-small" >Available week days *</InputLabel>
                            <br />

                            <FieldArray
                                name="assets"
                                render={(arrayHelpers) => (
                                    <Grid container>
                                        {assets?.map((asset, idx) => (
                                            <Grid item sm={3} xs={6}>
                                                <label >
                                                    <input
                                                        name="selectedDays"
                                                        type="checkbox"
                                                        value={asset}
                                                        checked={selectedDays?.includes(asset)}
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
                                        //onChange={handleFromTimeChange}
                                        value={starttime}
                                        onChange={addStarttime}
                                        selected={selectedFromTime}
                                        defaultValue="00:00"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300,
                                        }}

                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="time"
                                        label=" End Time"
                                        type="time"
                                        fullWidth
                                        //onChange={handleToTimeChange}
                                        value={endtime}
                                        onChange={addEndtime}
                                        selected={selectedToTime}
                                        defaultValue="00:00"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300,
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

                            <List>
                                {uploadedCertificates.map((file, index) => (
                                    <ListItem key={index}>
                                        {file.name} - {file.size} bytes
                                        <IconButton onClick={() => removeCertificate(index)} color="secondary">
                                            Remove
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Div>
                        <Div sx={{ mt: 1, mb: 3 }}>
                            <TextField
                                fullWidth
                                name="price"
                                label="Price per Hour *"
                                size="small"
                                value={price}
                                onChange={addPrice}
                            />
                        </Div>
                    </Form>
                )}
            </Formik>

        </Div>

    );
};


