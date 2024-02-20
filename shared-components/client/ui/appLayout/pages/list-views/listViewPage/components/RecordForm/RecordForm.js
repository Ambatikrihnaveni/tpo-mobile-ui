import React, { useState } from 'react';
import * as yup from "yup";
import { Form, Formik, FieldArray } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import JumboAvatarField from "@jumbo/components/JumboFormik/JumboAvatarField";
import Div from "@jumbo/shared/Div";
import { useDropzone } from "react-dropzone";
import { TextField, Typography, FormControl, InputLabel } from "@mui/material";
import JumboSelectField from "@jumbo/components/JumboFormik/JumboSelectField";
import MenuItem from "@mui/material/MenuItem";
import { Grid, } from '@material-ui/core'
import DndWrapper from "../../../../../../../../../imports/client/ui/appLayout/pages/extensions/dropzone/components/DndWrapper";
import List from "@mui/material/List";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Alert, Stack } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import ListItem from "@mui/material/ListItem";

const editTutorMutation = gql`
    mutation editTutor($input: EditTutorProfileInput!) {
        editTutor(input: $input)
    }
`
const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});
const initialValues = {
    name: "",
    phoneNumber: "",
    email: "",
    picture: "",
    experience: "",
    availableDays: "",
    qualification: "",
    bio: "",
    address: "",
};
const categoriesData = [
    "MERN", "Python", "HTML", "Nodejs", "Wordpress"
]
const RecordForm = ({ record, onSave }) => {
    const [open, setOpen] = useState(false);
    const [editTutor] = useMutation(editTutorMutation, { ignoreResults: true });
    const [error, setError] = useState("")
    const [selectedDays, setSelectedDays] = useState(record.availableDays)
    const [experience, setExperience] = useState(record.experience)
    const handleSelectYear = (event,value) => {
        setExperience(value);
    }
    const assets = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    const [selectedOptions, setSelectedOptions] = useState(record.categories? record.categories:[]);
    const { showDialog, hideDialog } = useJumboDialog();
    const handleAutocompleteChange = (event, value) => {
        setSelectedOptions(value);
    };

    const [selectedToTime, setSelectedToTime] = useState(record.selectedToTime)
    const [selectedFromTime, setSelectedFromTime] = useState(record.selectedFromTime)
    const handleFromTimeChange = (event) => {
        setSelectedFromTime(event.target.value);

    }
    const handleToTimeChange = (event) => {
        setSelectedToTime(event.target.value);
    }; 

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedDays([...selectedDays, value]);
        } else {
            setSelectedDays(selectedDays?.filter((day) => day !== value));
        }
    };



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
    const userId = record.userId
    const updateProfile = (email, address, name, phoneNumber, qualification, experience, price, bio, availableDays, picture, categories, selectedToTime, selectedFromTime) => {
        editTutor({
            variables: {
                input: {
                    userId,
                    qualification,
                    experience,
                    price: price.toString(),
                    availableDays: selectedDays,
                    email,
                    address,
                    name,
                    phoneNumber: phoneNumber.toString(),
                    bio,
                    picture,
                    categories: selectedOptions,
                    selectedToTime,
                    selectedFromTime
                }
            }
        }).then((data) => {
            onSave();
        }).catch((err) => {
            setError(err)
        })
    }
    const onRecordSave = (data, { setSubmitting }) => {

        setSubmitting(true);
        updateProfile(data.email, data.address, data.name, data.phoneNumber, data.qualification, data.experience, data.price, data.bio, data.availableDays, data.picture, data.categories);
        setSubmitting(false);
    };
    return (
        <Formik
            validateOnChange={true}
            initialValues={record?.id ? record : initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={onRecordSave}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form noValidate autoComplete="off">
                    <Div
                        sx={{
                            '& .MuiTextField-root': {
                                mb: 3
                            },
                        }}
                    >
                        <JumboAvatarField
                            name={"picture"}
                            alt={"user profile pic"}
                            onFileSelection={(file) => setFieldValue("picture", file)}
                            sx={{ width: 60, height: 60, margin: '0 auto 24px' }}
                        />
                        <Grid container spacing={1}>
                            <Grid item xs={6}>

                                <JumboTextField fullWidth size="small" variant="outlined" name="name" label="Name" />
                            </Grid>
                            <Grid item xs={6}>
                                <JumboTextField fullWidth size="small" variant="outlined" name="email" label="Email" />
                            </Grid>
                            <Grid item xs={6}>
                                <JumboTextField
                                    fullWidth
                                    type="number"
                                    size="small"
                                    variant="outlined"
                                    name="phoneNumber"
                                    label="Phone Number"
                                    sx={{
                                        '& input[type=number]': {
                                            '-moz-appearance': 'textfield'
                                        },
                                        '& input[type=number]::-webkit-outer-spin-button': {
                                            '-webkit-appearance': 'none',
                                            margin: 0
                                        },
                                        '& input[type=number]::-webkit-inner-spin-button': {
                                            '-webkit-appearance': 'none',
                                            margin: 0
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <JumboTextField fullWidth size="small" variant="outlined" name="address" label="Address" />
                            </Grid>
                        </Grid>
                        <Div sx={{ mt: 3, mb: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple1-select-label">Qualification</InputLabel>

                                <JumboSelectField
                                    fullWidth
                                    labelId="demo-simple1-select-label"
                                    id="demo-simple1-select"
                                    name="qualification"
                                    defaultValue={record.qualification}
                                    label="Qualification"
                                    size="small"
                                >

                                    <MenuItem value="MTECH">MTECH</MenuItem>
                                    <MenuItem value="BTECH">BTECH</MenuItem>
                                    <MenuItem value="PG">PG</MenuItem>
                                    <MenuItem value="Bcom">Bcom</MenuItem>

                                </JumboSelectField>
                            </FormControl>

                        </Div>
                        <Div sx={{ mt: 1, mb: 3 }}>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Experience</InputLabel>

                                <JumboSelectField
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="experience"
                                    label="Experience"
                                    onChange={handleSelectYear}
                                    defaultValue={record.experience}
                                    size="small"
                                    value={experience}
                                >
                                    <MenuItem value="" disabled>
                                        Select Experience
                                    </MenuItem>
                                    <MenuItem value="0">No-Experience</MenuItem>
                                    <MenuItem value="1">1 Year</MenuItem>
                                    <MenuItem value="1-2">1-2 Years</MenuItem>
                                    <MenuItem value="2-3">2-3 Years</MenuItem>
                                    <MenuItem value="5-10">5-10 Years</MenuItem>
                                    <MenuItem value=">10">Above 10 Years</MenuItem>
                                    <MenuItem value="<1">Just started</MenuItem>

                                </JumboSelectField>

                            </FormControl>
                        </Div>
                        <Div sx={{ width: 500, maxWidth: '100%' }}>
                            <Autocomplete
                                multiple
                                options={categoriesData}
                                onChange={handleAutocompleteChange}
                                value={selectedOptions}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Course Category"
                                    />
                                )}
                            />

                        </Div>
                        <Div sx={{ mt: 1, mb: 3 }}>
                            <InputLabel id="demo-select-small">Available week days</InputLabel>
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
                                                        style={{marginLeft:'-8px'}}
                                                        value={asset}
                                                        checked={selectedDays?.includes(asset)}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <span className="mx-2" style={{paddingLeft:'5px'}}>{asset}</span>
                                                </label>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                            />
                        </Div>

                        <Div>
                            <InputLabel id="demo-select-small" >Available Timings</InputLabel>
                            <br />
                            <Grid container spacing={2} style={{ display: 'flex' }} >
                                <Grid item xs={6}>
                                    <TextField
                                        id="time"
                                        label=" From "
                                        type="time"
                                        fullWidth
                                        onChange={handleFromTimeChange}
                                        value={selectedFromTime}
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
                                        label=" To"
                                        type="time"
                                        fullWidth
                                        onChange={handleToTimeChange}
                                        value={selectedToTime}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}

                                    />
                                </Grid>
                            </Grid>
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
                                label="Price per Hour"
                                size="small"
                            />

                        </Div>
                        <JumboTextField fullWidth size="small" variant="outlined" name="bio" label="Bio" />

                        <LoadingButton
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ mb: 3 }}
                            loading={isSubmitting}
                        >Save</LoadingButton>
                        <div>{error}</div>
                        {open &&

                            <Stack sx={{ width: '100%' }} spacing={2} open={open}>
                                <Alert
                                    severity="success">Profile Updated successfully!</Alert>
                            </Stack>
                        }
                    </Div>
                </Form>
            )
            }
        </Formik >
    );
};
RecordForm.defaultProps = {
    onSave: () => {
    }
};
export default RecordForm;
