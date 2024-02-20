import React,{ useState,useEffect} from 'react';
import TabContext from "@mui/lab/TabContext";
import Div from "@jumbo/shared/Div";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import { ListItemIcon,  } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import styled from "@emotion/styled";
import ProfileOverview from './profileOverview';
import AdminOverview from './profileOverview';
import ProfileCourses from './profileCourses';
import ProfileAchievements from './profileAchievements';
import ProfileStream from './profileStream';
import TutorOverview from './tutorOverview';
import TutorProfessional from './tutorProfessional';
import TutorInstitute from '../components/tutorInstitute';
import { useQuery } from 'react-apollo';
import useCurrentShopId from '../../../../../hooks/useCurrentShopId';
import StudentWork from '../components/studentwork';
import StudentOverview from '../components/studentOverview';
import StudentEducation from '../components/studentEducation';
import MyDashboardService from '../../../../../graphql/services/dashboard/dashboard-services';
import TutorsService from '../../../../../graphql/services/tutors/tutors-service';
import MyProgramService from '../../../../../graphql/services/programs/myProgram-services';
import gql from "graphql-tag";
import BankDetails from './profileBankDetils';
import useAuth from '../../../../../hooks/useAuth';
const viewerQuery = gql`
query getViewer {
  viewer {
    _id
    firstName
    language
    lastName
    name
    primaryEmailAddress
    adminUIShops {
      _id
      brandAssets {
        navbarBrandImage {
          large
        }
      }
      name
      shopLogoUrls {
        primaryShopLogoUrl
      }
    }
    role
    shopId{
        _id
        name
    }
    phoneNumber
    isProfile
    profile{
      bio
      address
      qualification
      experience
      price
      isStatus
      isApproved
      availableDays
      picture
      categories
      selectedFromTime
      selectedToTime
      certificates
      accountName
      accountNumber
      branch
      ifscCode
      bankName
    }
  }
}
`;

const StyledListItemIcon = styled(ListItemIcon)(({theme}) => ({
    color: theme.palette.primary.main,
    fontSize: 24,
    height: 48,
    width: 48,
    borderRadius: '50%',
    minWidth: 42,
    marginRight: 16,
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    border: `solid 1px ${theme.palette.divider}`
}));
const About = ({viewer}) => {
    const [value, setValue] = React.useState('1');
    const {data : viewerData} = useQuery(viewerQuery)
    let role = viewer?.role;
    const [students, setStudents] = React.useState([])
    const [program, setProgram] = React.useState([])
    const [tutors, setTutors] = React.useState([])
    const { shopId } = useCurrentShopId()
    const [tutorStudents, setTutorStudents]= useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const user= useAuth()
    const userData= user?.viewer
    const useRole= userData?.role
    React.useEffect(async () => {
        if (shopId) {
            let studentList = []
            let programList = []
            let tutorsList = []

            MyDashboardService.instituteStudents(shopId).then(data => {
                setStudents(data);
            }).catch(err => {
                console.log(err);
            });
            
            MyDashboardService.tutorStudents().then(data => {
                setTutorStudents(data);
            }).catch(err => {
                console.log(err);
            });
            const programs = await MyProgramService.getRecords(shopId, {});
            setProgram(programs)
            const queryParams = { filterPrms: { status: "" } }
            const tutorsData = await TutorsService.getTutors(shopId, { queryParams })
            setTutors(tutorsData)
        }

    }, [shopId])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        function handleResize() {
          setIsMobile(window.innerWidth <= 768);
        }
    
        window.addEventListener('resize', handleResize);
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    return (
        <JumboCardQuick
            title={isMobile ? "" : "About"}
            action={
                <TabContext value={value}>
                    <Div
                        sx={{
                            marginTop: -2.25,
                            marginBottom: -2.5,

                            '& .MuiTab-root': {
                                py: 2.5
                            }
                        }}
                    >
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Overview" value="1" />
                            {role === "College-Admin" && (<Tab label="Streams" value="2" />)}
                            {role === "Admin" && (<Tab label="Courses" value="2" />)}
                            {role === "Tutor" && (<Tab label="Professional" value="2" />)}
                            {role === "Student" && (<Tab label="Education" value="2" />)}
                            {role === "Admin" && (<Tab label="Achievements" value="3" />)}
                            {role === "College-Admin" && (<Tab label="Achievements" value="3" />)}
                            {role === "Tutor" && (<Tab label="Institutes" value="3" />)}
                            {role === "Student" && (<Tab label="Work" value="3" />)}
                            {useRole === "Master-Admin" && role === "Admin" && <Tab label="Bank Details" value="4" />}

                        </TabList>
                    </Div>
                </TabContext>
            }
            headerSx={{
                borderBottom: 1, borderColor: 'divider'
            }}
            sx={{mb: 3.75}}

        >
            {value === '1' && role==="College-Admin" && <ProfileOverview  viewer={viewer} tutors={tutors} />}
            {value === '1' && role==="Admin" && <AdminOverview viewer={viewer} tutors={tutors}  program={program}/>}
            {value === '1' && role==="Tutor" && <TutorOverview viewer={viewer}/>}
            {value === '1' && role === "Student" && <StudentOverview viewer={viewer}/>}
            {value === '2' && role==="Admin" && <ProfileCourses viewer={viewer}/>}
            {value === '2' && role==='College-Admin' &&< ProfileStream viewer={viewer}/>}
            {value === '2' && role === "Student" && <StudentEducation  viewer={viewer}/>}
            {value === '2' && role==="Tutor" && <TutorProfessional viewer={viewer}/>}
            {value === '3' && role==="College-Admin" && <ProfileAchievements viewer={viewer} />}
            {value === '3' && role==="Admin" && <ProfileAchievements viewer={viewer} />}
            {value === '3' && role==="Tutor" && <TutorInstitute viewer={viewer} />}
            {value === '3' && role === "Student" && <StudentWork viewer={viewer} />}
            {value === '4' && role === "Admin" && <BankDetails viewer={viewer} />}
            
        </JumboCardQuick>
    );
};

export default About;
