import React, { useEffect, useState } from 'react';
import { List, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { alpha, ListItemText, ListItem,} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import MyProgramService from '../../../../../../graphql/services/programs/myProgram-services';
import useAuth from '../../../../../../hooks/useAuth';
import AdmissionScheduleItem from './admissionscheduleitem';


export default function AdmissionSchedule(params) {
    
    const batchdata = params?.data
    const {setRecordsListRefresh} =params
    const shopId = localStorage.getItem('accounts:shopId')
    const [batchName, setBatchName] = useState(batchdata?.name);
    const [batchID, setBatchID] = useState(batchdata?.id); // Initialize with an empty string
    const [batch, setBatch] = useState(batchdata);
    const [allLessons, setAllLessons] = useState([])
    const batchStartTime = batchdata?.batchStartTime
    const batchEndTime = batchdata?.batchEndTime
    const [forceUpdate, setForceUpdate] = useState(false);
    const { viewer } = useAuth();
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [avatarMenuAnchor, setAvatarMenuAnchor] = useState(null);
    const [assignTutorToLesson, setAssignTutorToLesson] = useState()
    const [tutorList, setTutorList] = useState(null)

    const handleAvatarClick = async (tutor) => {
          
        const programId = batchdata?.programId
        const batchID = batchdata?.id
        const tutorId = tutor._id
        const productId = assignTutorToLesson?.lessons[0].product._id
        const lessonIds = []
        for (i = 0; i < assignTutorToLesson.lessons.length; i++) {
            lessonIds.push(assignTutorToLesson.lessons[i]?._id)
        }
        setSelectedTutor(tutor);
        let data = [...allLessons]
        for (let i = 0; i < data.length; i++) {
            if (data[i].lessons[0]._id == assignTutorToLesson?.lessons[0]._id) {
                data[i].tutor = tutor
            }
        }
        setRecordsListRefresh(true)
        const batchData = await MyProgramService.assignTutorToLesson(shopId, programId, batchID, productId, lessonIds, tutorId);
        setAllLessons(data)
        // setAvatarListVisible(false);
    };



    const openAvatarMenu = (event, lesson) => {
           
        setAvatarMenuAnchor(event.currentTarget);
        setAssignTutorToLesson(lesson)
        setTutorList(lesson.tutors)
        setRecordsListRefresh(true)

    };

    const closeAvatarMenu = () => {
        setAvatarMenuAnchor(null);
    };



    const products = params?.data?.products
    const productIds = [];
    for (x = 0; x < products?.length; x++) {
        productIds.push(products[x]?._id)
    }


    useEffect(async () => {
       
        let lessonsData = []
        const lessonsDuration = batchdata?.lessonsDuration
       
        if (lessonsDuration && lessonsDuration.length > 0) {

            for (i = 0; i < lessonsDuration.length; i++) {
                const lessonDuration = parseFloat(lessonsDuration[i].lessonDuration);
              
                lessonsData.push({
                    lessons: lessonsDuration[i].lesson,
                    lessonsDuration: lessonDuration,
                    startDate:lessonsDuration[i].lessonScheduleDate,
                    lessonStatus: lessonsDuration[i].lessonStatus,
                    tutor: lessonsDuration[i].tutor ? lessonsDuration[i].tutor : {},
                    tutors: lessonsDuration[i].tutors,
                    meetingInfo: lessonsDuration[i].meetingInfo ? lessonsDuration[i].meetingInfo : {}
                });
            }
        }

        setAllLessons(lessonsData)
        // setForceUpdate(prev => !prev);

    }, [batchID]);

    return (
        <Div >
            <JumboCardQuick
                title={<Div sx={{ display: 'flex', mt: 1, color: 'white'}}>
                    <Typography sx={{ textTransform: 'capitalize',width:{xs:'50%',sm:'80%'} }}>{batchName}</Typography>
                    <Div sx={{textAlign:'right',display:'flex'}}>
                    <AccessTimeIcon />
                    <Typography sx={{ mb: 2, ml: 1 }}>
                        {batchStartTime}-{batchEndTime}
                    </Typography>
                    </Div>

                </Div>

                }


                headerSx={{ borderBottom: 1, borderBottomColor: 'divider', background: 'linear-gradient(90deg, #3ba15d, #3b81cc)', minHeight: '50px',p:1,display:'flex',minWidth:"400px"  }}
                wrapperSx={{ p: 0 }}
                sx={{ overflowX: 'scroll' }}
            >
                <React.Fragment>
                    <ListItemButton
                        component={"li"}
                        sx={{
                            // p: theme => theme.spacing(1, 3),
                            transition: 'all 0.2s',
                            borderBottom: 1,
                            borderBottomColor: 'divider',
                            minWidth:'400px',
                            '&:hover': {
                                boxShadow: `0 3px 10px 0 ${alpha('#000', 0.2)}`,
                                transform: 'translateY(-4px)',

                                '& .MuiChip-animation': {
                                    width: 'auto',
                                    height: 20,
                                    fontSize: 12
                                }
                            }
                        }}
                    >
                      {(batchdata?.program.price != "0") &&
                       <ListItemText
                       variant="body1"
                       sx={{ width: '20%', varticalAlign: "middle", }}
                       primary={<Typography
                           sx={{
                               mt: 1,
                               textOverflow: "ellipsis",
                               display: "-webkit-box",
                               WebkitLineClamp: "1",
                               lineHeight: "0.8",
                           }}
                       ><b>Start Date</b></Typography>}
                   />
                      } 

                        <ListItemText
                            variant="body1"
                            sx={{ width: '45%', varticalAlign: "middle", }}
                             primary={<Typography
                                sx={{
                                    mt: 1,
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "1",
                                    lineHeight: "0.8",
                                    ml:4
                                }}
                            ><b>Lesson Name</b></Typography>}
                        />
                        <ListItem sx={{ width: "15%", varticalAlign: "middle",textAlign:'center' }}>
                            <Typography
                                sx={{
                                    mt: 1,
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "1",
                                    lineHeight: "0.8",
                                    textAlign:'center',
                                    ml:2

                                }}
                            ><b>Duration(Days)</b></Typography>
                        </ListItem>
                        &nbsp;  &nbsp;  &nbsp;

                       {(batchdata?.program.price != "0")&&
                       <ListItem sx={{ width: "18%", varticalAlign: "middle", }}>
                       <Typography
                           sx={{
                               mt: 1,
                               textOverflow: "ellipsis",
                               display: "-webkit-box",
                               WebkitLineClamp: "1",
                               lineHeight: "0.8",
                               ml:6
                           }}
                       ><b>Tutor</b></Typography>
                   </ListItem>
                       } 
                        <ListItem sx={{ width: "20%", varticalAlign: "middle" }}>
                            <Typography
                                sx={{
                                    mt: 1,
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "1",
                                    lineHeight: "0.8",
                                    ml:5

                                }}
                            ><b>Status</b></Typography>
                        </ListItem>
                       { viewer?.role === "Tutor" &&
                        <ListItem sx={{ width: "20%", varticalAlign: "middle" }}>
                            <Typography
                                sx={{
                                    mt: 1,
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "1",
                                    lineHeight: "0.8",
                                    ml:4

                                }}
                            ><b>Actions</b></Typography>
                        </ListItem>}
                    </ListItemButton>
                </React.Fragment>

                <List disablePadding>

                    {
                        allLessons?.map((lesson, index) => (
                            <AdmissionScheduleItem
                                key={index}
                                index={index}
                                day={index + 1}
                                lesson={lesson}
                                batchdata={batchdata}
                                batch={batch}
                                productId={productIds}
                                selectedAvatar={selectedTutor}
                                handleAvatarClick={handleAvatarClick}
                                avatarMenuAnchor={avatarMenuAnchor}
                                openAvatarMenu={openAvatarMenu}
                                closeAvatarMenu={closeAvatarMenu}
                                tutorList={tutorList}
                                setRecordsListRefresh={setRecordsListRefresh}
                            />

                        ))
                    }
                </List>
            </JumboCardQuick>
        </Div>
    )
}
