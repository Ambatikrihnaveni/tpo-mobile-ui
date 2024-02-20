import React, { useState } from 'react';
import { Card, Button, Typography, } from "@mui/material";
import Div from "@jumbo/shared/Div";
import 'react-toastify/dist/ReactToastify.css';
import CollegeInformation from './collegeinformation';
import AdminDetails from './admindetails';
import CollegeAddress from './collegeaddress';
import useAuth from '../../../../hooks/useAuth';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";
import useCurrentShopId from '../../../../hooks/useCurrentShopId';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const createShopMutation = gql`
  mutation createShop($input: CreateShopInput!) {
    createShop(input: $input) {
      shop {
        _id
      }
    }
  }
`;

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

const steps = ['College Details', 'Admin Details', 'College Address'];


const initialField = [
    'Engineering',
    'Pharmacy',
    'Degree',
    'Diploma',
    'Intermediate',
    'Nursing',
    'ITI',
    'PG',
    'Other'
    // Add your custom options here
];


function CollegeDetails() {
    ;
    const [createShop] = useMutation(createShopMutation, { ignoreResults: true });
    const { viewer, refetchViewer } = useAuth()
    const { setShopId } = useCurrentShopId()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [overview, setOverView] = useState('')
    const [website, setWebsite] = useState('')
    const [collegeAdmin, setCollegeAdmin] = useState('')
    const [adminEmail, setAdminEmail] = useState('')
    const [designation, setDesignation] = useState('')
    const [specalization, setSpecalization] = useState([])
    const navigate = useNavigate();
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [field, setField] = useState(initialField)
    const [selectedFields, setSelectedFields] = useState([]);

    React.useEffect(() => {
        if (viewer) {
            setName(viewer?.name)
            setEmail(viewer?.primaryEmailAddress)
            setPhone(viewer?.phoneNumber)
            setWebsite(viewer?.website)
        }
    }, [viewer])


    const handleFieldChange = (e) => {
        setSelectedFields(e.target.value);
    };



    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handelEmailChange = (e) => {
        setEmail(e.target.value)
    };
    const handelPhoneChange = (e) => {
        setPhone(e.target.value)
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
    const handelSpacalChange = (e, newInputValue, index) => {

        if (!specalization.includes(newInputValue)) {
            setSpecalization(newInputValue);

        }
    };



    const handelAddresChange = (e) => {
        setAddress(e.target.value)
    };
    const handelCityChange = (e) => {
        setCity(e.target.value)
    };
    const handelStateChange = (e) => {
        setState(e.target.value)
    };
    const handelCountryChange = (e) => {
        setCountry(e.target.value)
    };


    const onSubmit = async () => {

        const inputData = {
            name: name,
            description: overview,
            website: website,
            phone: phone,
            address: address,
            streams: specalization,
            emailAddress: email,
            adminName: collegeAdmin,
            adminEmailAddress: adminEmail,
            adminDesignation: designation,
            city: city,
            state: state,
            country: country,
        }
        createShop({ variables: { input: inputData } }).then((data) => {


            if (data?.data?.createShop?.shop?._id) {

                const id = data?.data?.createShop?.shop?._id
                setShopId(id)
                refetchViewer()

                navigate('/dashboard')
            };
        }).catch((error) => {

        })
    }

    const handleStepChange = (step) => {
        switch (step) {
            case 0:
                return (
                    name !== '' &&
                    email !== '' &&
                    phone !== '' &&
                    overview !== '' &&
                    website !== ''
                );
            case 1:
                return (
                    collegeAdmin !== '' &&
                    adminEmail !== '' &&
                    designation !== '' &&
                    specalization !== ''
                );
            case 2:
                return (
                    address !== '' &&
                    city !== '' &&
                    state !== '' &&
                    country !== ''
                );
            default:
                return true;
        }
    };



    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };



    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return <CollegeInformation
                    name={name}
                    handleNameChange={handleNameChange}
                    email={email}
                    handelEmailChange={handelEmailChange}
                    phone={phone}
                    handelPhoneChange={handelPhoneChange}
                    overview={overview}
                    handelOverViewChange={handelOverViewChange}
                    website={website}
                    viewer={viewer}
                    handelWebsiteChange={handelWebsiteChange}
                />;
            case 1:
                return <AdminDetails
                    collegeAdmin={collegeAdmin}
                    handelCollegeChange={handelCollegeChange}
                    adminEmail={adminEmail}
                    handelAdminChange={handelAdminChange}
                    designation={designation}
                    handelDesinChange={handelDesinChange}
                    specalization={specalization}
                    handelSpacalChange={handelSpacalChange}
                    viewer={viewer}
                    field={field}
                    handleFieldChange={handleFieldChange}
                />;
            case 2:
                return <CollegeAddress
                    address={address}
                    handelAddresChange={handelAddresChange}
                    city={city}
                    handelCityChange={handelCityChange}
                    state={state}
                    handelStateChange={handelStateChange}
                    country={country}
                    handelCountryChange={handelCountryChange}


                />
            default:
                return null;
        }
    };


    return (
        <Div className="bg-gradiant" style={{ backgroundImage: `url("/images/authBg.png")` }}>

            <Box sx={{ width: '100%', p: 2 }}>
                <Card sx={{ width: { xs: "100%", md: "60%" }, alignSelf: 'center', margin: '0 auto', marginTop: '50px', p: { xs: 2, md: 5 }, boxShadow: "3px 6px 6px 4px rgba(0, 0, 0, 0.4)" }}>
                    <Stepper activeStep={1} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>


                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {renderStepContent()}
                            <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
                                <Button
                                    color="inherit"
                                    variant='outlined'
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />

                                {activeStep === 2 && (
                                    <Button variant="contained" style={{ marginRight: '10px' }}
                                        disabled={!handleStepChange(activeStep)}
                                        onClick={onSubmit}>
                                        Save
                                    </Button>
                                )}
                                {activeStep < steps.length - 1 && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        style={{ marginLeft: '10px' }}
                                        disabled={!handleStepChange(activeStep)}

                                    >

                                        Next
                                    </Button>
                                )}
                            </Box>
                        </React.Fragment>
                    )}
                </Card>
            </Box>
        </Div>
    );
}
export default CollegeDetails;