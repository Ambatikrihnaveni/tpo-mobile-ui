import React, { useState,useEffect } from 'react';
import Div from "@jumbo/shared/Div";
import { Step, StepLabel, Stepper, Button } from "@mui/material";
import {  Typography } from '@material-ui/core'
import ProfileBasic from './profilebasic';
import ProfileQualification from './profilequalification';
import ProfileProfessional from './profileProfessional';
import ProfileExperience from './profileexperience';
import ProfileSkills from './profileskills';
import ProfileSummary from './profilesummary';
import ProfileSocial from './profileSocial';
import { FaUser,  FaGraduationCap,  FaTools, FaFileAlt, FaLink } from 'react-icons/fa';
import { styled } from '@mui/material/styles';
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import * as yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import { useSnackbar } from "notistack";
import useAuth from '../../../../hooks/useAuth';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Check from '@mui/icons-material/Check';



const createShopMutation = gql`
mutation createShop($input: CreateShopInput!) {
  createShop(input: $input) {
    shop {
      _id
    }
  }
}
`;

const updateAccountMutation = gql`
    mutation updateAccount($input: UpdateAccountInput!) {
        updateAccount(input: $input){
          account{
            name
          }
        }
    }`


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
const useStyles = makeStyles((theme) => ({
  stepIcon: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    color: theme.palette.common.white,
  },
}));
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 20,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 7,
    height: 7,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {

  active: PropTypes.bool,
  className: PropTypes.string,

  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 20,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(119, 230, 237) 0%,rgb(119, 230, 237) 50%,rgb(119, 230, 237) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(23, 198, 209) 0%,rgb(23, 198, 209) 50%,rgb(23, 198, 209) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(119, 230, 237) 0%, rgb(119, 230, 237) 50%, rgb(119, 230, 237) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(23, 198, 209) 0%, rgb(23, 198, 209) 50%, rgb(23, 198, 209) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <FaUser />,
    2: <FaGraduationCap />,
    3: <BsFillCreditCard2FrontFill />,
    4: <FaGraduationCap />,
    5: <FaTools />,
    6: <FaFileAlt />,
    7: <FaLink />,
  };



  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {

  active: PropTypes.bool,
  className: PropTypes.string,

  completed: PropTypes.bool,

  icon: PropTypes.node,
};


const steps = ['Personal', 'Education', 'Experience', 'Professional', 'Skills', 'About', 'Social Media'];


function TutorEditProfile() {
  const { viewer } = useAuth()
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [website, setWebsite] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [qualification, setQualification] = React.useState('');
  const [schoolcollname, setSchoolcollname] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [score, setScore] = React.useState('');
  const [passedyear, setPassedyear] = React.useState('');
  const [fieldofstudy, setFieldofstudy] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [institute, setInstitute] = useState([]);
  const [categories, setCategories] = useState([]);
  const [days, setDays] = useState([]);
  const [starttime, setStarttime] = React.useState('');
  const [endtime, setEndtime] = React.useState('');
  const [certificates, setCertificates] = useState(null);
  const [price, setPrice] = useState('');
  const [course, setCourse] = React.useState('');
  const [achieve, setAchieve] = React.useState('');
  const navigate = useNavigate();
  const [bio, setBio] = React.useState('');
  const [open, setOpen] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar();
  const [selectedDays, setSelectedDays] = useState([]);
  const [allQualificationsValid, setAllQualificationsValid] = useState(true);
  const [areRequiredFieldsFilled, setAreRequiredFieldsFilled] = useState(false);
  const classes = useStyles();
  const [qualificationList, setQualificationList] = useState([{ qualification: '', fieldofstudy: '', schoolcollname: '', location: '', score: '', passedyear: '' }])
  const [experienceList, setExperienceList] = useState([{ title: '', employer: '', joblocation: '', startmonth: '', startyear: '', endmonth: '', endyear: '' }])
  const [skillsList, setSkillsList] = useState([{ skill: '', rating: '' }]);
  const [mediaList, setMediaList] = useState([{ account: '', link: '' }])

  const [updateAccount] = useMutation(updateAccountMutation, { ignoreResults: true });




  React.useEffect(() => {
    if (viewer) {
      setEmail(viewer?.primaryEmailAddress)
      setName(viewer?.name)
      setNumber(viewer?.phoneNumber)
      setWebsite(viewer?.profile?.website)
      setAddress(viewer?.profile?.address)
      setBio(viewer?.profile?.bio)
      setCity(viewer?.profile?.city)
      setCountry(viewer?.profile?.country)
      setState(viewer?.profile?.state)
      setPrice(viewer?.profile?.price)
      setCategories(viewer?.profile?.categories)
      setStarttime(viewer?.profile?.selectedFromTime)
      setEndtime(viewer?.profile?.selectedToTime)
      setSelectedDays(viewer?.profile?.availableDays)
      let streamsData = []
      let achievements = []
      let socialAccount = []
      let qualificationView = []
      for (let i = 0; i < viewer.profile?.qualifications?.length; i++) {
        qualificationView?.push({ qualification: viewer?.profile?.qualifications[i].qualification, fieldofstudy: viewer?.profile?.qualifications[i].field_of_study, schoolcollname: viewer?.profile?.qualifications[i].instituteName, location: viewer?.profile?.qualifications[i].location, passedyear: viewer?.profile?.qualifications[i].year_of_passing, score: viewer?.profile?.qualifications[i].score })
      }
      setQualificationList(qualificationView)
      let experienceView = []
      for (var j = 0; j < viewer.profile?.experiences?.length; j++) {
        experienceView?.push({ title: viewer?.profile?.experiences[j]?.jobTitle, employer: viewer.profile?.experiences[j]?.employer, joblocation: viewer.profile?.experiences[j]?.company_location, startmonth: viewer.profile?.experiences[j]?.start_month, startyear: viewer.profile?.experiences[j]?.start_year, endmonth: viewer.profile?.experiences[j]?.end_month, endyear: viewer.profile?.experiences[j]?.end_year })
      }
      setExperienceList(experienceView)
      let skillView = []
      for (var k = 0; k < viewer?.profile?.skills?.length; k++) {
        skillView?.push({ skill: viewer?.profile?.skills[k]?.skill, rating: viewer?.profile?.skills[k]?.skill_rating })
      }
      setSkillsList(skillView)
      for (let i = 0; i < viewer.profile?.socialMediaLinks?.length; i++) {
        socialAccount?.push({ account: viewer?.profile?.socialMediaLinks[i]?.socialMediaAccount, link: viewer?.profile?.socialMediaLinks[i]?.link })
      }
      setMediaList(socialAccount)
      let institutesData = []
      for (let i = 0; i < viewer?.shopId?.length; i++) {
        institutesData?.push({ _id: viewer?.shopId[i]?._id, name: viewer?.shopId[i]?.name })
      }
      setInstitute(institutesData)
    }
  }, [viewer]);



  const addName = (event) => {
    setName(event.target.value && event.target.value[0].toUpperCase() + event.target.value.slice(1))
  }

  const addEmail = (event) => {
    setEmail(event.target.value)
  }

  const addNumber = (event) => {
    setNumber(event.target.value)
  }
  const addAddress = (event) => {
    setAddress(event.target.value && event.target.value[0].toUpperCase() + event.target.value.slice(1))
  }
  const addWebsite = (event) => {
    setWebsite(event.target.value)
  }
  const addCity = (event) => {
    setCity(event.target.value && event.target.value[0].toUpperCase() + event.target.value.slice(1))
  }
  const addState = (event) => {
    setState(event.target.value && event.target.value[0].toUpperCase() + event.target.value.slice(1))
  }
  const addCountry = (event) => {
    setCountry(event.target.value && event.target.value[0].toUpperCase() + event.target.value.slice(1))
  }
  const addBio = (event) => {
    setBio( event)
  }
  

  const addQualification = (e, index) => {

    const { value } = e.target;

    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

    const updatedList = [...qualificationList];
    updatedList[index].qualification = capitalizedValue;
    setQualificationList(updatedList);
  }
  const addFieldofstudy = (e, index) => {

    const { value } = e.target;

    const FieldOfStudy = value.charAt(0).toUpperCase() + value.slice(1)

    const updatedList = [...qualificationList];
    updatedList[index].fieldofstudy = FieldOfStudy;
    setQualificationList(updatedList);
  }
  const addSchoolcollname = (e, index) => {

    const { value } = e.target;

    const SchoolOrCollageName = value.charAt(0).toUpperCase() + value.slice(1)

    const updatedList = [...qualificationList];
    updatedList[index].schoolcollname = SchoolOrCollageName;
    setQualificationList(updatedList);
  }
  const addLocation = (e, index) => {

    const { value } = e.target;

    const location = value.charAt(0).toUpperCase() + value.slice(1)

    const updatedList = [...qualificationList];
    updatedList[index].location = location;
    setQualificationList(updatedList);
  }
  const addScore = (e, index) => {

    const { value } = e.target;
    const updatedList = [...qualificationList];
    updatedList[index].score = value;
    setQualificationList(updatedList);
  }
  const addPassedyear = (e, index) => {

    const { value } = e.target;
    const updatedList = [...qualificationList];
    updatedList[index].passedyear = value;
    setQualificationList(updatedList);
  }
  const addTitle = (e, index) => {

    const { value } = e.target;
    const updatedList = [...experienceList];
    updatedList[index].title = value;
    setExperienceList(updatedList);
  }
  const addJoblocation = (e, index) => {

    const { value } = e.target;
    const updatedList = [...experienceList];
    updatedList[index].joblocation = value;
    setExperienceList(updatedList);
  }
  const addEmployer = (e, index) => {

    const { value } = e.target;
    const updatedList = [...experienceList];
    updatedList[index].employer = value;
    setExperienceList(updatedList);
  }
  const addStartyear = (e, index) => {

    const { value } = e.target;
    const updatedList = [...experienceList];
    updatedList[index].startyear = value;
    setExperienceList(updatedList);
  }
  const addEndyear = (e, index) => {

    const { value } = e.target;
    const updatedList = [...experienceList];
    updatedList[index].endyear = value;
    setExperienceList(updatedList);
  }
  const addStartmonth = (e, index) => {

    const { value } = e.target;
    const updatedList = [...experienceList];
    updatedList[index].startmonth = value;
    setExperienceList(updatedList);
  }
  const addEndmonth = (e, index) => {

    const { value } = e.target;
    const updatedList = [...experienceList];
    updatedList[index].endmonth = value;
    setExperienceList(updatedList);
  }
  const addInstitute = (event, value) => {

    setInstitute(value)
  }
  const addCategories = (event, value) => {
    setCategories(value);
  };
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedDays([...selectedDays, value]);
    } else {
      setSelectedDays(selectedDays.filter((day) => day !== value));
    }
  };

  const addDays = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setDays([...days, value]);
    } else {
      setDays(days.filter((day) => day !== value));
    }
  };
  const addStarttime = (e) => {
    setStarttime(e.target.value);

  }
  const addEndtime = (event) => {
    setEndtime(event.target.value)
  }

  const addCertificates = (e, value) => {
    setCertificates(value);
  };
  const addPrice = (event) => {
    setPrice(event.target.value)
  }

  const addSkill = (e, index) => {

    const { value } = e.target;

    const SkillUpperCase = value.charAt(0).toUpperCase() + value.slice(1)

    const updatedList = [...skillsList];
    updatedList[index].skill = SkillUpperCase;
    setSkillsList(updatedList);
  }
  const addRating = (e, index) => {

    const { value } = e.target;

    const addRatingUpperCase = value.charAt(0).toUpperCase() + value.slice(1)

    const updatedList = [...skillsList];
    updatedList[index].rating = addRatingUpperCase;
    setSkillsList(updatedList);
  }
  const addAccount = (e, index) => {

    const { value } = e.target;
    const updatedList = [...mediaList];
    updatedList[index].account = value;
    setMediaList(updatedList);
  };
  const addLink = (e, index) => {

    const { value } = e.target;
    const updatedList = [...mediaList];
    updatedList[index].link = value;
    setMediaList(updatedList);
  };

  const changeCourse = (event) => {
    setCourse(event.target.value)
  }
  const addAchieve = (event) => {
    setAchieve(event.target.value)
  }
  const handleAddQualification = () => {
    setQualificationList([...qualificationList, { qualification: '', fieldofstudy: '', schoolcollname: '', location: '', score: '', passedyear: '' }])
  }
  const handleAddExperience = (formData) => {
   setExperienceList([...experienceList, formData])
  }

  const handleEditExperience=(formData,index)=>{
   let data= [...experienceList]
    for(let i=0;i<data?.length;i++){
      if(i==index){
       data[i] = formData
      }
      setExperienceList(data)
    }
  
  }
  const handleAddSkills = () => {
    setSkillsList([...skillsList, { skill: '', rating: '' }])
  }
  const handleDeleteSkills = (index) => {
    const updatedSkillsList = [...skillsList];
    updatedSkillsList.splice(index, 1);
    setSkillsList(updatedSkillsList);
  };
  const handleDeleteMedia = (index) => {
    const updatedMediaList = [...mediaList];
    updatedMediaList.splice(index, 1);
    setMediaList(updatedMediaList);
  };
  const handleDeleteExperience = (index) => {
    const updatedList = [...experienceList];
    updatedList.splice(index, 1);
    setExperienceList(updatedList);
  };
  const handleDeleteQualification = (index) => {
    const updatedList = [...qualificationList];
    updatedList.splice(index, 1);
    setQualificationList(updatedList);
  };
  const handleAddMedia = () => {
    setMediaList([...mediaList, { account: '', link: '' }])
  }



  const onSubmit = async () => {
    let qualificationData = []
    let experienceData = []
    for (let i = 0; i < experienceList.length; i++) {
      experienceData.push({
        jobTitle: experienceList[i].title, employer: experienceList[i].employer,
        company_location: experienceList[i].joblocation,
        start_month: experienceList[i].startmonth,
        start_year: experienceList[i].startyear.toString(),
        end_month: experienceList[i].endmonth,
        end_year: experienceList[i].endyear.toString(),
      })
    }
    for (let j = 0; j < qualificationList.length; j++) {
      qualificationData?.push({
        qualification: qualificationList[j].qualification,
        instituteName: qualificationList[j].schoolcollname,
        field_of_study: qualificationList[j].fieldofstudy,
        location: qualificationList[j].location,
        score: qualificationList[j].score,
        year_of_passing: qualificationList[j].passedyear.toString()
      })
    }
    let socialMediaAccounts = []
    for (let i = 0; i < mediaList?.length; i++) {
      let data = { socialMediaAccount: mediaList[i].account, link: mediaList[i].link }
      socialMediaAccounts?.push(data)
    }
    let skillsData = []
    for (let i = 0; i < skillsList?.length; i++) {
      let data = { skill: skillsList[i]?.skill, skill_rating: skillsList[i]?.rating }
      skillsData?.push(data)
    }
    let instituteData = []
    for (let i = 0; i < institute.length; i++) {
      instituteData?.push(institute[i]._id)
    }


    const { data } = await updateAccount({
      variables: {
        input: {
          name,
          email,
          phoneNumber: number,
          website,
          state,
          price: price.toString(),
          experiences: experienceData,
          qualifications: qualificationData,
          availableDays: selectedDays,
          selectedFromTime: starttime,
          selectedToTime: endtime,
          address,
          city,
          bio,
          country,
          categories,
          socialMediaLinks: socialMediaAccounts,
          skills: skillsData,
          shopId: instituteData
        }
      }
    })
    setOpen(true)
    enqueueSnackbar('Profile updated Successfully', { variant: 'success' });
    navigate('/profile')
  }

  const handleStepChange = (step) => {
    switch (step) {
      case 0:
        return (
          name !== '' &&
          email !== ''
        );
      case 1:
      /* return (
          address == ''
      );  */ return allQualificationsValid;
      case 2:
      /* return (
        course == ''
      ); */
      case 3:
        return (
          achieve == ''
        );
      case 4:
      /* return (
        link == ''
      ); */
      default:
        return true;
    }
  };


 
  const isQualificationValid = (qualification) => {
    return (
      qualification.qualification !== '' &&
      qualification.schoolcollname !== '' &&
      qualification.location !== '' &&
      qualification.score !== '' &&
      qualification.passedyear !== ''
    );
  };
  
  

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onStepClick=(i)=>{
    setActiveStep(i)
    }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <ProfileBasic name={name}
          email={email} number={number} website={website} address={address}
          city={city} state={state} country={country} addName={addName} addEmail={addEmail}
          addNumber={addNumber} addWebsite={addWebsite} addAddress={addAddress} addCity={addCity}
          addState={addState} addCountry={addCountry}
        />;
      case 1:
        return <ProfileQualification
          qualification={qualification} fieldofstudy={fieldofstudy} schoolcollname={schoolcollname}
          location={location} score={score} passedyear={passedyear} addQualification={addQualification}
          addFieldofstudy={addFieldofstudy} addSchoolcollname={addSchoolcollname} addLocation={addLocation}
          addScore={addScore} addPassedyear={addPassedyear} qualificationList={qualificationList}
          handleAddQualification={handleAddQualification} handleDeleteQualification={handleDeleteQualification} />;
      case 2:
        return <ProfileExperience
          addTitle={addTitle} addJoblocation={addJoblocation} addEmployer={addEmployer}
          addStartmonth={addStartmonth} addStartyear={addStartyear} addEndmonth={addEndmonth}
          addEndyear={addEndyear} experienceList={experienceList}
          handleAddExperience={handleAddExperience} handleDeleteExperience={handleDeleteExperience} handleEditExperience={handleEditExperience}/>;
      case 3:
        return <ProfileProfessional
          institute={institute} categories={categories} starttime={starttime} endtime={endtime}
          price={price} selectedDays={selectedDays} handleCheckboxChange={handleCheckboxChange}
          addInstitute={addInstitute} addCategories={addCategories} addStarttime={addStarttime}
          addEndtime={addEndtime} addPrice={addPrice} />;
      case 4:
        return <ProfileSkills
          addSkill={addSkill} addRating={addRating} handleAddSkills={handleAddSkills} skillsList={skillsList}
          handleDeleteSkills={handleDeleteSkills} />;
      case 5:
        return <ProfileSummary bio={bio} addBio={addBio} />;

      case 6:
        return <ProfileSocial
          addAccount={addAccount}
          addLink={addLink}
          mediaList={mediaList}
          handleAddMedia={handleAddMedia}
          handleDeleteMedia={handleDeleteMedia} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const isValid = qualificationList.every((qualification) => isQualificationValid(qualification));
    setAllQualificationsValid(isValid);
  }, [qualificationList]);
  useEffect(() => {
    const areFieldsFilled = number !== '' && city !== '' && country !== '' && address !== '';
    setAreRequiredFieldsFilled(areFieldsFilled);
  }, [number, city, country, address]);



  return (
    <Div className="bg-gradiant">

      <Box sx={{ width: '100%', p: 2 }}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} style={{ paddingBottom: '25px' }}>
          {steps.map((label, index) => (
            <Step key={index} onClick={()=>onStepClick(index)} sx={{cursor:'pointer'}}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
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
              {/*               <Button onClick={handleReset}>Reset</Button>
     */}            </Box>
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

              {activeStep === 6 && (
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
                  disabled={ 
                  !handleStepChange(activeStep) ||
                  !areRequiredFieldsFilled ||
                  !allQualificationsValid}

                >

                  Next
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Div>
  );

};

export default TutorEditProfile;

