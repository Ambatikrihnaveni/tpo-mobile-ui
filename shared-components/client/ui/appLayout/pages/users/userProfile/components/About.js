import React, { useState,useEffect } from 'react';
import TabContext from "@mui/lab/TabContext";
import Div from "@jumbo/shared/Div";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import List from "@mui/material/List";
import {  ListItemIcon,} from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import styled from "@emotion/styled";
import ProfileOverview from './profileOverview';
import AdminOverview from './adminOverView';
import ProfileCourses from './profileCourses';
import ProfileAchievements from './profileAchievements';
import ProfileStream from './profileStream';
import TutorOverview from './tutorOverview';
import StudentOverview from './studentOverview';
import StudentEducation from './studentEducation';
import StudentWork from './studentWork';
import TutorProfessional from './tutorProfessional';
import TutorInstitute from './tutorInstitute';
import { useQuery } from 'react-apollo';
import gql from "graphql-tag";
import useCurrentShopId from '../../../../../hooks/useCurrentShopId'
import TutorsService from '../../../../../graphql/services/tutors/tutors-service';
import ProfileBankDetails from './profileBankDetails';
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
      city
      isStatus
      isApproved
      availableDays
      picture
      categories
      selectedFromTime
      selectedToTime
      certificates
    }
    students
    programs {
        _id
        name
    }
  }
}
`;

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
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
const About = () => {
     
    const [value, setValue] = React.useState('1');
     
    const { data: viewerData } = useQuery(viewerQuery);
    let role = viewerData?.viewer.role;
    const [students, setStudents] = React.useState(viewerData?.viewer?.students)
    const [program, setProgram] = React.useState(viewerData?.viewer?.programs)
    const [tutors, setTutors] = React.useState([])
    const [isMobile, setIsMobile] = useState(false);
    const { shopId } = useCurrentShopId()
    const [tutorStudents, setTutorStudents]= useState(viewerData?.viewer?.students)
    React.useEffect(async () => {
        if (shopId) {
            let studentList = []
            let programList = []
            let tutorsList = []

          
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
                            {role==="Admin" &&(<Tab label="Bank Details" value="4"/>)}
                        </TabList>
                    </Div>
                </TabContext>
            }
            headerSx={{
                borderBottom: 1, borderColor: 'divider'
            }}
            sx={{ mb: 3.75 }}

        >
            {value === '1' && role === "College-Admin" && <ProfileOverview students={students} program={program} tutors={tutors} />}
            {value === '1' && role === "Admin" && <AdminOverview students={students} program={program} tutors={tutors} />}
            {value === '1' && role === "Tutor" && <TutorOverview tutorStudents={tutorStudents}/>}
            {value === '1' && role === "Student" && <StudentOverview program={program}/>}
            {value === '2' && role === "Admin" && <ProfileCourses />}
            {value === '2' && role === 'College-Admin' && < ProfileStream />}
            {value === '2' && role === "Student" && <StudentEducation />}
            {value === '2' && role === "Tutor" && <TutorProfessional />}
            {value === '3' && role === "College-Admin" && <ProfileAchievements />}
            {value === '3' && role === "Admin" && <ProfileAchievements />}
            {value === '3' && role === "Tutor" && <TutorInstitute />}
            {value === '3' && role === "Student" && <StudentWork />}
            {value === '4' && role === "Admin" && <ProfileBankDetails />}

          
        </JumboCardQuick>
    );
};

export default About;
