import React, { useState } from 'react';
import { Button,  Typography, } from "@mui/material";
import Div from "@jumbo/shared/Div";
import * as yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import CollegeInformation from './collegeinformation';
import AdminDetails from './admindetails';
import CollegeAddress from './collegeaddress';
import CollegeSocialMedia from './collegeSocialMedia';
import CollegeAchieve from './collegeAchieve'
import CollageStream from './collageStream'
import useAuth from '../../../../../hooks/useAuth';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";
import useCurrentShopId from '../../../../../hooks/useCurrentShopId';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useSnackbar } from "notistack";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import { makeStyles } from '@mui/styles';



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
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Enter a valid email"
     )
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
    2: <BusinessIcon />,
    3: <LocationOnIcon />,
    4: <SchoolIcon />,
    5: <StarIcon />,
    6: <GroupIcon />,
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


const steps = ['College Details', 'Admin Details', 'College Address', 'Streams', 'Achievements', 'Social Media'];


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
];


const degreeFields = [
  'Bachelor of Technology',
  'Master of Technology',
  'B.E', 'Master of Engineering (M.E)', 'Bachelor of Science (B.Sc)', 'Master of Science (M.Sc)', 'Bachelor of Commerce (B.Com)', 'Master of Commerce (M.Com)', 'Bachelor of Arts (B.A)', 'Master of Arts (M.A)', 'BCA', 'MCA',
  'Bachelor of Business Administration (BBA)', 'Master of Business Administration (MBA)',
  'B.Pharmacy', 'M.pharmacy', 'B.Arch', 'M.Arch', 'Polytechnic Diploma', 'ITI', 'Other',
]

const streamFields = [
  'Computer Science and Engineering (CSE)', 'Electrical Engineering (EE)', 'Mechanical Engineering (ME)', 'Civil Engineering (CE)',
  'Electronics and Communication Engineering (ECE)', 'Information Technology (IT)', 'Chemical Engineering (ChE)',
  'Structural Engineering', 'Transportation Engineering', 'Environmental Engineering', 'Geotechnical Engineering',
  'Digital Business', 'Blockchain and Cryptocurrency', 'Cybersecurity Management', 'Innovation and Technology Management',

  ' Structural Engineering', 'ransportation Engineering', 'nvironmental Engineering',
  'eotechnical Engineering', 'ater Resources Engineering', 'ower Systems Engineering', 'ontrol Systems Engineering',
  'ower Electronics and Drives', 'ommunication Systems', 'LSI Design', 'mbedded Systems', 'omputer Science and Engineering',
  'oftware Engineering', 'ata Science and Analytics', 'rtificial Intelligence', 'ybersecurity', 'echanical Engineering',
  'hermal Engineering', 'anufacturing Engineering', 'achine Design', 'ndustrial Engineering', 'obotics and Automation',
  'erospace Engineering', 'echatronics', 'lectronics and Communication Engineering', 'igital Electronics and Communication',
  'ireless Communication', 'ignal Processing', 'nstrumentation and Control Engineering', 'hemical Engineering',
  'rocess Control and Instrumentation', 'iotechnology', 'nvironmental Management', 'anotechnology', 'aterials Science and Engineering',
  'enewable Energy', 'omputer-Aided Design (CAD)', 'omputer-Aided Manufacturing (CAM)', 'nformation Technology',
  'yber-Physical Systems', 'rtificial Intelligence and Machine Learning', 'ata Analytics', 'Other',
  'Civil Engineering (CE)', 'Mechanical Engineering (ME)', 'Computer Science and Engineering (CSE)', 'Electronics and Communication Engineering (ECE)',
  'Electrical Engineering (EE)', 'Information Technology (IT)', 'Chemical Engineering (ChE)', 'Aerospace Engineering',
  'Biotechnology', 'Environmental Engineering', 'Petroleum Engineering', 'Metallurgical Engineering', 'Robotics Engineering',
  'Instrumentation Engineering', 'Industrial Engineering', 'Textile Engineering', 'Agricultural Engineering',
  'Marine Engineering', 'Automotive Engineering', 'Food Technology', 'Genetic Engineering', 'Materials Science and Engineering',
  'Ceramic Engineering', 'Power Engineering', 'Mechatronics Engineering', 'Energy Engineering', 'Biomedical Engineering',
  'Systems Engineering', 'Geotechnical Engineering', 'Structural Engineering', 'Water Resources Engineering',
  'Telecommunication Engineering', 'Mining Engineering', 'Fire Safety Engineering',
  'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'Statistics', 'Electronics',
  'Environmental Science', 'Geology', 'Agriculture', 'Biotechnology', 'Biochemistry', 'Microbiology', 'Botany',
  'Zoology', 'Food Science and Nutrition', 'Forensic Science', 'Home Science', 'Applied Physics', 'Applied Chemistry',
  'Applied Mathematics', 'Applied Biology', 'Information Technology', 'Data Science', 'Genetics', 'Polymer Science',
  'Oceanography', 'Astronomy', 'Nanotechnology', 'Industrial Chemistry', 'Horticulture', 'Plant Pathology',
  'Sericulture', 'Aquaculture', 'Wildlife Science', 'Biomedical Science', 'Marine Biology', 'Astronomy and Astrophysics',
  'Pharmaceutical Sciences', 'Fermentation Technology', 'Instrumentation', 'Geography', 'Radiography', 'Herbal Science',
  'Environmental Management',
  'General', 'Honours', 'Accounting and Finance', 'Banking and Insurance', 'Corporate Secretaryship',
  'Cost Accounting', 'Taxation', 'Management Studies', 'Marketing', 'Human Resource Management (HRM)', 'Entrepreneurship',
  'E-Commerce', 'Computer Applications (B.Com CA)', 'International Business', 'Financial Markets', 'Supply Chain Management',
  'Business Analytics', 'Digital Marketing', 'Corporate Accounting', 'Retail Management', 'Auditing', 'Business Economics',
  'Hospitality and Tourism Management', 'Event Management',
  'English', 'History', 'Political Science', 'Economics', 'Sociology', 'Psychology', 'Philosophy',
  'Geography', 'Fine Arts', 'Music', 'Dance', 'Communication Studies', 'Anthropology', 'Archaeology',
  'Social Work', 'Education', 'Languages', 'Linguistics', 'Religious Studies', 'Environmental Studies',
  'Cultural Studies', 'Media Studies', 'Womens Studies', 'Theater and Performing Arts',
  'Development Studies', 'International Relations', 'Public Administration', 'Social Entrepreneurship',
  'Heritage Management', 'Human Rights',
  'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Electronics Engineering',
  'Computer Science and Engineering', 'Information Technology (IT)', 'Electrical and Electronics Engineering (EEE)',
  'Automobile Engineering', 'Mechatronics Engineering', 'Aeronautical Engineering', 'Chemical Engineering',
  'Textile Technology', 'Instrumentation and Control Engineering', 'Production Engineering',
  'Environmental Engineering', 'Biotechnology', 'Mining Engineering', 'Metallurgical Engineering',
  'Interior Design and Decoration', 'Computer Applications (DCA)', 'Architectural Assistantship',
  'Mechanical and Computer-Aided Design (MCAD)', 'Food Technology', 'Diploma in Business Management (DBM)',
  'Diploma in Hotel Management and Catering Technology', 'Film and Television Production', 'Interior Decoration and Design',
  'Textile Design and Printing', 'Garment Technology', 'Beauty and Hair Care',
  'Electrician', 'Fitter', 'Machinist', 'Welder', 'Plumber', 'Carpenter', 'Mechanic (Motor Vehicle)',
  'Diesel Mechanic', 'Refrigeration and Air Conditioning (RAC) Technician', 'Computer Operator and Programming Assistant (COPA)', 'Electronics Mechanic',
  'Draughtsman (Mechanical)', 'Instrument Mechanic', 'Machinist Grinder', 'Turner', 'Tool and Die Maker',
  'Foundryman', 'Sheet Metal Worker', 'Welding (Gas and Electric)', 'Painter (General)', 'Wireman',
  'Dressmaking', 'Cutting and Sewing', 'Interior Decoration and Designing', 'Hair and Skin Care',
  'Health Sanitary Inspector', 'Baker and Confectioner', 'Craftsman Food Production (General)',
  'Stenography (English/Hindi)', 'Catering and Hospitality Assistant', 'Mechanic (Consumer Electronics Appliances)',
  'Surveyor', 'CNC Operator', 'Advanced Welding', 'Dress Designing and Tailoring', 'Fireman', 'Marine Engine Fitter',
  'Marine Fitter', 'Pump Operator-Cum-Mechanic', 'Leather Goods Maker', 'Footwear Maker',
  'Cutting and Sewing (Coconut Fiber and Coir Products)', 'Sanitary Hardware Fitter',
  'Textile Mechatronics', 'Electronic Mechanic (Repair and Maintenance of Consumer Electronics)',
  'Mechanic (Tractor)', 'Mechanic (Refrigeration and Air Conditioning)', 'Turner (Non-engineering Trades)',
  'Marketing', 'Finance', 'Human Resource Management (HRM)', 'International Business',
  'Entrepreneurship', 'Supply Chain Management', 'Information Technology (IT) Management',
  'Hospitality Management', 'Sports Management', 'Retail Management', 'Healthcare Management',
  'Event Management', 'Real Estate Management', 'Digital Marketing', 'E-commerce',
  'Aviation Management', 'Fashion Business', 'Financial Services', 'Luxury Brand Management',
  'Nonprofit Management', 'Data Analytics', 'Artificial Intelligence (AI) and Machine Learning',
  'Environmental Management', 'Agribusiness Management', 'Media and Entertainment Management',
  'Social Entrepreneurship', 'Digital Business', 'Blockchain and Cryptocurrency',
  'Cybersecurity Management', 'Innovation and Technology Management',
]

const btechFields = [
  'Computer Science and Engineering (CSE)', 'Electrical Engineering (EE)', 'Mechanical Engineering (ME)', 'Civil Engineering (CE)',
  'Electronics and Communication Engineering (ECE)', 'Information Technology (IT)', 'Chemical Engineering (ChE)',
  'Aerospace Engineering', 'Biotechnology', ' Environmental Engineering', ' Petroleum Engineering',
  'Metallurgical Engineering', ' Robotics Engineering', ' Nanotechnology', ' Instrumentation Engineering',
  'Industrial Engineering', ' Textile Engineering', ' Agricultural Engineering', ' Marine Engineering',
  'Automotive Engineering', ' Food Technology', ' Genetic Engineering', ' Material Science and Engineering', ' Ceramic Engineering',
  'Power Engineering', ' Mechatronics Engineering', ' Energy Engineering', ' Biomedical Engineering',
  'Systems Engineering', ' Geotechnical Engineering', ' Structural Engineering', ' Water Resources Engineering',
  'Telecommunication Engineering', ' Mining Engineering', ' Fire Safety Engineering', 'Other',
]
const mtechFields = [' Structural Engineering', 'ransportation Engineering', 'nvironmental Engineering',
  'eotechnical Engineering', 'ater Resources Engineering', 'ower Systems Engineering', 'ontrol Systems Engineering',
  'ower Electronics and Drives', 'ommunication Systems', 'LSI Design', 'mbedded Systems', 'omputer Science and Engineering',
  'oftware Engineering', 'ata Science and Analytics', 'rtificial Intelligence', 'ybersecurity', 'echanical Engineering',
  'hermal Engineering', 'anufacturing Engineering', 'achine Design', 'ndustrial Engineering', 'obotics and Automation',
  'erospace Engineering', 'echatronics', 'lectronics and Communication Engineering', 'igital Electronics and Communication',
  'ireless Communication', 'ignal Processing', 'nstrumentation and Control Engineering', 'hemical Engineering',
  'rocess Control and Instrumentation', 'iotechnology', 'nvironmental Management', 'anotechnology', 'aterials Science and Engineering',
  'enewable Energy', 'omputer-Aided Design (CAD)', 'omputer-Aided Manufacturing (CAM)', 'nformation Technology',
  'yber-Physical Systems', 'rtificial Intelligence and Machine Learning', 'ata Analytics', 'Other'
]
const BeFields = [
  'Civil Engineering (CE)', 'Mechanical Engineering (ME)', 'Computer Science and Engineering (CSE)', 'Electronics and Communication Engineering (ECE)',
  'Electrical Engineering (EE)', 'Information Technology (IT)', 'Chemical Engineering (ChE)', 'Aerospace Engineering',
  'Biotechnology', 'Environmental Engineering', 'Petroleum Engineering', 'Metallurgical Engineering', 'Robotics Engineering',
  'Instrumentation Engineering', 'Industrial Engineering', 'Textile Engineering', 'Agricultural Engineering',
  'Marine Engineering', 'Automotive Engineering', 'Food Technology', 'Genetic Engineering', 'Materials Science and Engineering',
  'Ceramic Engineering', 'Power Engineering', 'Mechatronics Engineering', 'Energy Engineering', 'Biomedical Engineering',
  'Systems Engineering', 'Geotechnical Engineering', 'Structural Engineering', 'Water Resources Engineering',
  'Telecommunication Engineering', 'Mining Engineering', 'Fire Safety Engineering', 'Other'
]
const MeFieds = [
  'Structural Engineering', 'Transportation Engineering', 'Environmental Engineering', 'Geotechnical Engineering',
  'Water Resources Engineering', 'Power Systems Engineering', 'Control Systems Engineering', 'Power Electronics and Drives',
  'Communication Systems', 'VLSI Design', 'Embedded Systems', 'Computer Science and Engineering', 'Software Engineering',
  'Data Science and Analytics', 'Artificial Intelligence', 'Cybersecurity', 'Mechanical Engineering',
  'Thermal Engineering', 'Manufacturing Engineering', 'Machine Design', 'Industrial Engineering', 'Robotics and Automation',
  'Aerospace Engineering', 'Mechatronics', 'Electronics and Communication Engineering', 'Digital Electronics and Communication',
  'Wireless Communication', 'Signal Processing', 'Instrumentation and Control Engineering', 'Chemical Engineering',
  'Process Control and Instrumentation', 'Biotechnology', 'Environmental Management', 'Nanotechnology',
  'Materials Science and Engineering', 'Renewable Energy', 'Computer Aided Design (CAD)', 'Computer Aided Manufacturing (CAM)',
  'Information Technology', 'Cyber Physical Systems', 'Artificial Intelligence and Machine Learning',
  'Data Analytics', 'Other'
]
const BscFields = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'Statistics', 'Electronics',
  'Environmental Science', 'Geology', 'Agriculture', 'Biotechnology', 'Biochemistry', 'Microbiology', 'Botany',
  'Zoology', 'Food Science and Nutrition', 'Forensic Science', 'Home Science', 'Applied Physics', 'Applied Chemistry',
  'Applied Mathematics', 'Applied Biology', 'Information Technology', 'Data Science', 'Genetics', 'Polymer Science',
  'Oceanography', 'Astronomy', 'Nanotechnology', 'Industrial Chemistry', 'Horticulture', 'Plant Pathology',
  'Sericulture', 'Aquaculture', 'Wildlife Science', 'Biomedical Science', 'Marine Biology', 'Astronomy and Astrophysics',
  'Pharmaceutical Sciences', 'Fermentation Technology', 'Instrumentation', 'Geography', 'Radiography', 'Herbal Science',
  'Environmental Management', 'Other'
]
const MscFields = [
  'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'Environmental Science', 'Geology',
  'Agriculture', 'Biotechnology', 'Biochemistry', 'Microbiology', 'Food Science and Nutrition', 'Forensic Science',
  'Home Science', 'Statistics', 'Nursing', 'Pharmaceutical Sciences', 'Horticulture', 'Marine Biology', 'Wildlife Science',
  'Astronomy and Astrophysics', 'Space Science', 'Materials Science', 'Radiography', 'Nanotechnology', 'Herbal Science',
  'Industrial Chemistry', 'Oceanography', 'Renewable Energy', 'Textile Chemistry', 'Water Resources Management',
  'Cybersecurity', 'Agriculture Economics', 'Space Science and Technology', 'Computational Science', 'Remote Sensing and Geographic Information System (GIS)',
  'Cognitive Science', 'Neuroscience', 'Artificial Intelligence and Machine Learning', 'Cyber-Physical Systems',
  'Data Science and Analytics', 'Other'
]
const bcomFields = [
  'General', 'Honours', 'Accounting and Finance', 'Banking and Insurance', 'Corporate Secretaryship',
  'Cost Accounting', 'Taxation', 'Management Studies', 'Marketing', 'Human Resource Management (HRM)', 'Entrepreneurship',
  'E-Commerce', 'Computer Applications (B.Com CA)', 'International Business', 'Financial Markets', 'Supply Chain Management',
  'Business Analytics', 'Digital Marketing', 'Corporate Accounting', 'Retail Management', 'Auditing', 'Business Economics',
  'Hospitality and Tourism Management', 'Event Management', 'Other']

const mcomFiedls = [
  'General', 'Accounting and Finance', 'Banking and Finance', 'Corporate Governance', 'Cost Accounting',
  'Taxation', 'Management', 'Marketing', 'Human Resource Management (HRM)', 'Entrepreneurship',
  'E-Commerce', 'Computer Applications (M.Com CA)', 'International Business', 'Financial Markets',
  'Supply Chain Management', 'Business Analytics', 'Financial Management', 'Business Economics',
  'Auditing', 'Retail Management', 'Corporate Accounting', 'Hospitality and Tourism Management',
  'Financial Analysis', 'Risk Management', 'Other'
]
const baFields = [
  'English', 'History', 'Political Science', 'Economics', 'Sociology', 'Psychology', 'Philosophy',
  'Geography', 'Fine Arts', 'Music', 'Dance', 'Communication Studies', 'Anthropology', 'Archaeology',
  'Social Work', 'Education', 'Languages', 'Linguistics', 'Religious Studies', 'Environmental Studies',
  'Cultural Studies', 'Media Studies', 'Global Studies', 'Womens Studies', 'Theater and Performing Arts', 'Other'
]
const mafieds = [
  'English', 'History', 'Political Science', 'Economics', 'Sociology', 'Psychology', 'Philosophy',
  'Geography', 'Fine Arts', 'Music', 'Dance', 'Communication Studies', 'Anthropology', 'Archaeology',
  'Social Work', 'Education', 'Languages', 'Linguistics', 'Religious Studies', 'Environmental Studies',
  'Cultural Studies', 'Media Studies', 'Womens Studies', 'Theater and Performing Arts',
  'Development Studies', 'International Relations', 'Public Administration', 'Social Entrepreneurship',
  'Heritage Management', 'Human Rights', 'Other'
]
const deplomaFields = [
  'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Electronics Engineering',
  'Computer Science and Engineering', 'Information Technology (IT)', 'Electrical and Electronics Engineering (EEE)',
  'Automobile Engineering', 'Mechatronics Engineering', 'Aeronautical Engineering', 'Chemical Engineering',
  'Textile Technology', 'Instrumentation and Control Engineering', 'Production Engineering',
  'Environmental Engineering', 'Biotechnology', 'Mining Engineering', 'Metallurgical Engineering',
  'Interior Design and Decoration', 'Computer Applications (DCA)', 'Architectural Assistantship',
  'Mechanical and Computer-Aided Design (MCAD)', 'Food Technology', 'Diploma in Business Management (DBM)',
  'Diploma in Hotel Management and Catering Technology', 'Film and Television Production', 'Interior Decoration and Design',
  'Textile Design and Printing', 'Garment Technology', 'Beauty and Hair Care', 'Other'
]
const itiFields = [
  'Electrician', 'Fitter', 'Machinist', 'Welder', 'Plumber', 'Carpenter', 'Mechanic (Motor Vehicle)',
  'Diesel Mechanic', 'Refrigeration and Air Conditioning (RAC) Technician', 'Computer Operator and Programming Assistant (COPA)', 'Electronics Mechanic',
  'Draughtsman (Mechanical)', 'Instrument Mechanic', 'Machinist Grinder', 'Turner', 'Tool and Die Maker',
  'Foundryman', 'Sheet Metal Worker', 'Welding (Gas and Electric)', 'Painter (General)', 'Wireman',
  'Dressmaking', 'Cutting and Sewing', 'Interior Decoration and Designing', 'Hair and Skin Care',
  'Health Sanitary Inspector', 'Baker and Confectioner', 'Craftsman Food Production (General)',
  'Stenography (English/Hindi)', 'Catering and Hospitality Assistant', 'Mechanic (Consumer Electronics Appliances)',
  'Surveyor', 'CNC Operator', 'Advanced Welding', 'Dress Designing and Tailoring', 'Fireman', 'Marine Engine Fitter',
  'Marine Fitter', 'Pump Operator-Cum-Mechanic', 'Leather Goods Maker', 'Footwear Maker',
  'Cutting and Sewing (Coconut Fiber and Coir Products)', 'Sanitary Hardware Fitter',
  'Textile Mechatronics', 'Electronic Mechanic (Repair and Maintenance of Consumer Electronics)',
  'Mechanic (Tractor)', 'Mechanic (Refrigeration and Air Conditioning)', 'Turner (Non-engineering Trades)', 'Other'
]
const bbaFields = [
  'Marketing', 'Finance', 'Human Resource Management (HRM)', 'International Business',
  'Entrepreneurship', 'Supply Chain Management', 'Information Technology (IT) Management',
  'Hospitality Management', 'Sports Management', 'Retail Management', 'Healthcare Management',
  'Event Management', 'Real Estate Management', 'Digital Marketing', 'E-commerce',
  'Aviation Management', 'Fashion Business', 'Financial Services', 'Luxury Brand Management',
  'Nonprofit Management', 'Data Analytics', 'Artificial Intelligence (AI) and Machine Learning',
  'Environmental Management', 'Agribusiness Management', 'Media and Entertainment Management',
  'Social Entrepreneurship', 'Digital Business', 'Blockchain and Cryptocurrency',
  'Cybersecurity Management', 'Innovation and Technology Management', 'Other'
]
const mbaFieds = [
  'Marketing', 'Finance', 'Human Resource Management (HRM)', 'Operations Management',
  'Information Technology (IT) Management', 'International Business', 'Entrepreneurship',
  'Healthcare Management', 'Rural Management', 'Energy Management', 'Business Analytics',
  'Supply Chain Management', 'Retail Management', 'Digital Business', 'Sports Management',
  'Media and Entertainment Management', 'Luxury Management', 'Marketing Communication',
  'Hospitality Management', 'Environment Management', 'Other'
] 


function CollegeAdminDetails() {

  const [createShop] = useMutation(createShopMutation, { ignoreResults: true });
  const [updateAccount] = useMutation(updateAccountMutation, { ignoreResults: true });

  const { viewer, refetchViewer } = useAuth()
  const { setShopId } = useCurrentShopId()
  const [insError, setInsError] = useState('')
  const [data, setData] = useState({})
  const [name, setName] = useState(viewer?.name)
  const [email, setEmail] = useState(viewer?.primaryEmailAddress)
  const [phone, setPhone] = useState('')
  const [overview, setOverView] = useState(viewer?.profile?.bio)
  const [website, setWebsite] = useState(viewer?.profile?.website)

  const [collegeAdmin, setCollegeAdmin] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [designation, setDesignation] = useState('')
  const [specalization, setSpecalization] = useState('')
  const [degree1, setDegree1] = useState('')
  const [stream1, setStream1] = useState('')
  const navigate = useNavigate();
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [open, setOpen] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar();
  const [achieve, setAchieve] = React.useState('');
  const [achieveList, setAchieveList] = useState([{ achieve: '' }])


  const [inputList, setInputList] = useState([])
  const [formData, setFormData] = useState([])


  const [account, setAccount] = React.useState('');
  const [field, setField] = useState(initialField)
  const [degree, setDegree] = useState(degreeFields)
  const [stream, setStream] = useState(streamFields);
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectDegree, setSelectDegree] = useState('');
  const [selectStream, setSelectStream] = useState('');
  const [programTitle, setProgramTitle] = useState('');
  const [streamList, setStreamList] = useState([{ degree: "", stream: [] }]);
  const [link, setLink] = React.useState('');
  const [mediaList, setMediaList] = useState([{ account: '', link: '' }])

  React.useEffect(() => {
  
    if (viewer) {
      setName(viewer?.name)
      setEmail(viewer?.primaryEmailAddress)
      setPhone(viewer?.phoneNumber)
      setOverView(viewer?.profile?.bio)
      setWebsite(viewer?.profile?.website)
      setCollegeAdmin(viewer?.profile?.collegeAdminName)
      setAdminEmail(viewer?.profile?.collegeAdminEmail)
      //setSelectedFields(viewer?.profile?.collegeSpecializations)
      setDesignation(viewer?.profile?.collegeAdmindesignation)
      setSelectedFields((viewer?.profile?.collegeSpecializations)? viewer?.profile?.collegeSpecializations:[] )
      setAddress(viewer?.profile?.address)
      setCity(viewer?.profile?.city)
      setState(viewer?.profile?.state)
      setCountry(viewer?.profile?.country)
      let streamsData = []
      let achievements = []
      let socialAccount = []


      for (let i = 0; i < viewer.profile?.streams?.length; i++) {
        streamsData.push({ degree: viewer?.profile.streams[i].streamType, stream: viewer?.profile.streams[i].streamsOffered })
      }
      setStreamList(streamsData)

      for (let i = 0; i < viewer?.profile?.achievements?.length; i++) {
        achievements.push({ achieve: viewer?.profile.achievements[i] })

      }
      setAchieveList(achievements)

      for (let i = 0; i < viewer.profile?.socialMediaLinks?.length; i++) {
        socialAccount.push({ account: viewer?.profile.socialMediaLinks[i].socialMediaAccount, link: viewer?.profile.socialMediaLinks[i].link })

      }
      setMediaList(socialAccount)


    }
  }, [])
  const handleAddMedia = () => {
    setMediaList([...mediaList, { account: '', link: '' }])
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
  const handleDeleteMedia = (index) => {
    const updatedMediaList = [...mediaList];
    updatedMediaList.splice(index, 1); 
    setMediaList(updatedMediaList);
  };

  const handleAddAchieve = () => {
    setAchieveList([...achieveList, { achieve: "", }]);
  };
  const handleDeleteAchieve  = (index) => {
    const updatedList = [...achieveList];
    updatedList.splice(index, 1); 
    setAchieveList(updatedList);
  };


  const addAchieve = (e, index) => {

    const { value } = e.target;
    const updatedList = [...achieveList];
    updatedList[index].achieve = value.charAt(0).toUpperCase() + value.slice(1);
    setAchieveList(updatedList);
  }

  const handleFieldChange = (e) => {
    setSelectedFields(e.target.value);
  };
  const handleFieldChange1 = (e) => {
    setSelectDegree(e.target.value);
  };
  const handleFieldChange2 = (e) => {
    setSelectStream(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value && e.target.value[0].toUpperCase() + e.target.value.slice(1))
  }

  const handelEmailChange = (e) => {
    setEmail(e.target.value)
  };
  const handelPhoneChange = (e) => {
    setPhone(e.target.value)
  };

  const handelOverViewChange = (event) => {
    setOverView( event)
  };
  
  const handelWebsiteChange = (e) => {
    setWebsite(e.target.value)
  };


  const handelCollegeChange = (e) => {
    setCollegeAdmin(e.target.value && e.target.value[0].toUpperCase() + e.target.value.slice(1))
  };
  const handelAdminChange = (e) => {
    setAdminEmail(e.target.value)
    
  };
  const handelDesinChange = (e) => {
    setDesignation(e.target.value && e.target.value[0].toUpperCase() + e.target.value.slice(1))
  };
  const handelSpacalChange = (event, newInputValue) => {
    
    if (!selectedFields?.includes(newInputValue)) {
      //setSelectedFields([...selectedFields, newInputValue]);
      setSelectedFields(newInputValue);

    }
  };
  const handelSpacalChange1 = (event, newInputValues, index) => {
    ;
    if (!selectDegree?.includes(newInputValues)) {
      const updatedList = [...streamList];
      updatedList[index].degree = newInputValues;
      setStreamList(updatedList);
    }
  };
  const handelSpacalChange2 = (e, newInputValues, index) => {
    ;
    if (!selectStream?.includes(newInputValues)) {
      /*       setSelectStream(newInputValues);
       */
      const updatedList = [...streamList];
      updatedList[index].stream = newInputValues;
      setStreamList(updatedList);
    }
  };
  const handleAddClick = () => {
    setStreamList([...streamList, { degree: "", stream: [] }]);
  };
  const handleDeleteStream = (index) => {
    const updatedList = [...streamList];
    updatedList.splice(index, 1); 
    setStreamList(updatedList);
  };



  const handelAddresChange = (e) => {
    setAddress(e.target.value && e.target.value[0].toUpperCase() + e.target.value.slice(1))
  };
  const handelCityChange = (e) => {
    setCity(e.target.value && e.target.value[0].toUpperCase() + e.target.value.slice(1))
  };
  const handelStateChange = (e) => {
    setState(e.target.value && e.target.value[0].toUpperCase() + e.target.value.slice(1))
  };
  const handelCountryChange = (e) => {
    setCountry(e.target.value && e.target.value[0].toUpperCase() + e.target.value.slice(1))
  };



  const onSubmit = async () => {

    const achieves = []
    for (let j = 0; j < achieveList.length; j++) {
      achieves.push(achieveList[j].achieve)
    }

    let socialMediaAccounts = []

    for (let i = 0; i < mediaList?.length; i++) {
      let data = { socialMediaAccount: mediaList[i].account, link: mediaList[i].link }
      socialMediaAccounts.push(data)
    }
    let streamData=[]
    for (let i=0; i<streamList?.length; i++){
      let data = {streamType: streamList[i]?.degree,streamsOffered: streamList[i]?.stream }
      streamData.push(data)
    }

    const { data } = await updateAccount({
      variables: {
        input: {
          name,
          email,
          phoneNumber: phone,
          website,
          bio: overview,
          collegeAdminName: collegeAdmin,
          collegeAdminEmail: adminEmail,
          collegeSpecializations: selectedFields,
          collegeAdmindesignation: designation,
          state,
          country,
          city,
          address,
          //degree : selectDegree,
          streams: streamData,
          achievements: achieves,
          socialMediaLinks: socialMediaAccounts,
        }
      }
    });
    setOpen(true)
    enqueueSnackbar('Profile updated Successfully', { variant: 'success' });
    navigate('/profile')
  }

const isValidEmail = (email) => {
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const endsWithGmail = email?.toLowerCase().endsWith("gmail.com");

  return emailRegex.test(email) && endsWithGmail;

};

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
               adminEmail !== '' && isValidEmail(adminEmail)
           
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

  const onStepClick=(i)=>{
    setActiveStep(i)
    }

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
          selectedFields={selectedFields}
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
      case 3:
        return <CollageStream
          handleFieldChange1={handleFieldChange1}
          degree={degree}
          handelSpacalChange1={handelSpacalChange1}
          selectDegree={selectDegree}
          degree1={degree1}
          handleFieldChange2={handleFieldChange2}
          stream={stream}
          handelSpacalChange2={handelSpacalChange2}
          selectStream={selectStream}
          stream1={stream1}
          handleAddClick={handleAddClick}
          streamList={streamList}
          handleDeleteStream={handleDeleteStream}
        />

      case 4:
        return <CollegeAchieve
        achieve={achieve}
        addAchieve={addAchieve}
        handleAddAchieve={handleAddAchieve}
        achieveList={achieveList}
        handleDeleteAchieve={handleDeleteAchieve}
        />

      case 5:
        return <CollegeSocialMedia
          addAccount={addAccount}
          account={account}
          link={link}
          addLink={addLink}
          mediaList={mediaList}
          handleAddMedia={handleAddMedia}
          handleDeleteMedia={handleDeleteMedia}
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
export default CollegeAdminDetails;