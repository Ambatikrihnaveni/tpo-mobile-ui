import React, { useState } from 'react';
import { Card, Button, Typography,} from "@mui/material";
import Div from "@jumbo/shared/Div";
import * as yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import Profile from './profile';
import Address from './address';
import Course from './course';
import Achieve from './achievements'
import SocialMedia from './SocialMedia'
import { useSnackbar } from "notistack";
import useAuth from '../../../../hooks/useAuth';
import gql from "graphql-tag";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';
import AccountsService from '../../../../graphql/services/accounts/accounts-service';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BankDetails from './bankDetails';
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
    1: <AccountCircleIcon />,
    2: <LocationOnIcon />,
    3: <SchoolIcon />,
    4: <StarIcon />,
    5: <GroupIcon />,
    6:<AccountBalanceIcon/>
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


const steps = ['Profile', 'Address', 'Courses', 'Achievements', 'Social Media', 'Bank Details'];




function AdminEditProfile() {
  const { viewer } = useAuth()
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [website, setWebsite] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [course, setCourse] = React.useState('');
  const [achieve, setAchieve] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [link, setLink] = React.useState('');
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar();
  const [id, setId] = React.useState('')
  const classes = useStyles();
  const [courseList, setCourseList] = useState([{ course: "" }]);
  const [achieveList, setAchieveList] = useState([{ achieve: '' }]);
  const [mediaList, setMediaList] = useState([{ account: '', link: '' }])
  const [accountName, setAccountName] = useState('')
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [ifscCode, setIfscCode] = useState('')
  const [branch, setBranch] = useState('')

  React.useEffect(() => {
    if (viewer) {
      setEmail(viewer.primaryEmailAddress)
      setName(viewer.name)
      setNumber(viewer.phoneNumber)
      setId(viewer._id)
      setWebsite(viewer.profile.website)
      setAddress(viewer.profile?.address)
      setCity(viewer.profile?.city)
      setCountry(viewer.profile?.country)
      setState(viewer.profile?.state)
      setBio(viewer.profile?.bio)
      setAccountName(viewer.profile?.accountName)
      setBankName(viewer.profile?.bankName)
      setAccountNumber(viewer.profile?.accountNumber)
      setIfscCode(viewer.profile?.ifscCode)
      setBranch(viewer.profile?.branch)
      let coursesOfferedData = []
      let achievements = []
      let socialAccount = []
      for (let i = 0; i < viewer?.profile?.coursesOffered?.length; i++) {
        coursesOfferedData.push({ course: viewer?.profile.coursesOffered[i] })

      }
      setCourseList(coursesOfferedData)

      for (let i = 0; i < viewer?.profile?.achievements?.length; i++) {
        achievements.push({ achieve: viewer?.profile.achievements[i] })

      }
      setAchieveList(achievements)

      for (let i = 0; i < viewer.profile?.socialMediaLinks?.length; i++) {
        socialAccount.push({ account: viewer?.profile.socialMediaLinks[i].socialMediaAccount, link: viewer?.profile.socialMediaLinks[i].link })

      }
      setMediaList(socialAccount)

    }
  }, [viewer]);

  const handleAddClick = () => {
    setCourseList([...courseList, { course: "" }]);
  };
  const handleAddAchieve = () => {
    setAchieveList([...achieveList, { achieve: '' }]);
  };

  const handleAddMedia = () => {
    setMediaList([...mediaList, { account: '', link: '' }])
  }


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
    setBio(event)
  }
  const addWebsite = (event) => {
    setWebsite(event.target.value)
  }
  const addCourse = (e, index) => {

    const { value } = e.target;
    const updatedList = [...courseList];
    updatedList[index].course = value.charAt(0).toUpperCase() + value.slice(1);;
    setCourseList(updatedList);
  }

  const addAchieve = (e, index) => {

    const { value } = e.target;
    const updatedList = [...achieveList];
    updatedList[index].achieve = value.charAt(0).toUpperCase() + value.slice(1);;
    setAchieveList(updatedList);
  }
  const handleDeleteMedia = (index) => {
    const updatedMediaList = [...mediaList];
    updatedMediaList.splice(index, 1);
    setMediaList(updatedMediaList);
  };
  const handleDeleteCourse = (index) => {
    const updatedCourseList = [...courseList];
    updatedCourseList.splice(index, 1);
    setCourseList(updatedCourseList);
  }
  const handleDeleteAchieve = (index) => {
    updatedAchieveList = [...achieveList];
    updatedAchieveList.splice(index, 1);
    setAchieveList(updatedAchieveList);
  }

  const handleAccountNameChange = (event) => {
    setAccountName(event.target.value && event.target.value[0].toUpperCase() + event.target.value.slice(1))
  }

  const handleAccountNumber = (event) => {
    setAccountNumber(event.target.value)
  }
  const handleBankNameChange = (event) => {
    setBankName(event.target.value && event.target.value[0].toUpperCase() + event.target.value.slice(1))
  }
  const handleIfscCodeChange = (event) => {
    setIfscCode(event.target.value)
  }
  const handleBranchChange = (event) => {
    setBranch(event.target.value && event.target.value[0].toUpperCase() + event.target.value.slice(1))
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
  const onSubmit = async () => {

    const courses = []
    const achieves = []
    const media = []
    for (let i = 0; i < courseList.length; i++) {
      courses.push(courseList[i]?.course)
    }
    for (let j = 0; j < achieveList.length; j++) {
      achieves.push(achieveList[j]?.achieve)
    }

    setAchieveList(achieves)
    setCourseList(courses)
    const { data } = await AccountsService.updateAccount({
      name, email, number, id, website, courses, achieves, bio, address, city, state, country,
      mediaList, accountName, accountNumber, bankName, ifscCode, branch
    });

    setOpen(true)
    enqueueSnackbar('Profile updated Successfully', { variant: 'success' });
    navigate('/profile')
  }


  const handleStepChange = (step) => {
    switch (step) {
      case 0:
        return (
          name !== '' &&
          email !== '' &&
          number !== ''


        );
      case 1:
        return (
          address !== '' &&
          city !== '' &&
          country !== '' &&
          state !== ''
        );

      default:
        return true;
    }
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
        return <Profile name={name}
          email={email}
          number={number}
          addName={addName}
          addEmail={addEmail}
          addNumber={addNumber}
          website={website}
          addWebsite={addWebsite}
          bio={bio}
          addBio={addBio} />;
      case 1:
        return <Address address={address}
          addAddress={addAddress}
          city={city}
          state={state}
          country={country}
          addCity={addCity}
          addState={addState}
          addCountry={addCountry}
        />;
      case 2:
        return <Course
          course={course}
          addCourse={addCourse}
          handleAddClick={handleAddClick}
          courseList={courseList}
          handleDeleteCourse={handleDeleteCourse}
        />;
      case 3:
        return <Achieve
          achieve={achieve}
          addAchieve={addAchieve}
          handleAddAchieve={handleAddAchieve}
          achieveList={achieveList}
          handleDeleteAchieve={handleDeleteAchieve}
        />;
      case 4:
        return <SocialMedia
          addAccount={addAccount}
          account={account}
          link={link}
          addLink={addLink}
          mediaList={mediaList}
          handleAddMedia={handleAddMedia}
          handleDeleteMedia={handleDeleteMedia}
        />;
      case 5:
        return <BankDetails
          handleAccountNameChange={handleAccountNameChange}
          handleAccountNumber={handleAccountNumber}
          handleBankNameChange={handleBankNameChange}
          handleBranchChange={handleBranchChange}
          handleIfscCodeChange={handleIfscCodeChange}
          accountName={accountName}
          accountNumber={accountNumber}
          bankName={bankName}
          branch={branch}
          ifscCode={ifscCode}
        />

      default:
        return null;
    }
  };


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

              {activeStep === 5 && (
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
      </Box>
    </Div>
  );
}
export default AdminEditProfile;