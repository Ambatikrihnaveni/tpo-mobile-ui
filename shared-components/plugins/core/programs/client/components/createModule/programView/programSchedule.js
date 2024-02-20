import React, {  useEffect, useState } from 'react';
import { Button, List, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import {  ThemeProvider } from "@mui/material";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import ProgramScheduleItem from './programScheduleItem';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { alpha, ListItemText, Select, MenuItem, ListItem, } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import MyProgramService from '../../../../../../../client/ui/graphql/services/programs/myProgram-services';

export default function ProgramSchedule(params) {

    const program = params?.data
    const { theme } = useJumboTheme()
    const [showSettings] = useState(false)
    const shopId = localStorage.getItem('accounts:shopId')
    const [batchName, setBatchName] = useState(program?.batches ? (program?.batches[0]?.name):'');
    const [batchID, setBatchID] = useState(program?.batches ? (program?.batches[0]?._id):''); 
    const [batch, setBatch] = useState({});
    const [allLessons, setAllLessons] = useState([])
    const batchStartTime = batch?.batch?.batch?.batchStartTime
    const batchEndTime = batch?.batch?.batch?.batchEndTime
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [avatarMenuAnchor, setAvatarMenuAnchor] = useState(null);
    const [assignTutorToLesson, setAssignTutorToLesson] = useState()
    const[tutorList,setTutorList]=useState(null)

    const handleAvatarClick = async(tutor) => {
        const programId = batch?.batch?.batch?.programId
        const batchID = batch?.batch?.batch?._id
        const tutorId=tutor._id
        const productId=assignTutorToLesson?.lessons[0].product._id
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

        const batchData = await MyProgramService.assignTutorToLesson(shopId, programId, batchID, productId, lessonIds, tutorId);

        setAllLessons(data)
    };



    const openAvatarMenu = (event, lesson) => {

        setAvatarMenuAnchor(event.currentTarget);
        setAssignTutorToLesson(lesson)
        setTutorList(lesson.lessons[0].product.tutors)
    };

    const closeAvatarMenu = () => {
        setAvatarMenuAnchor(null);
    };



    const products = params?.data?.products
    const productIds = []
    for (x = 0; x < products?.length; x++) {
        productIds.push(products[x]?._id)
    }



    const handleChange = (event) => {
        const Batch = event.target.value;
        setBatchName(Batch);
        const selectedBatch = program?.batches?.find((batch) => batch.name === Batch);
        setBatchID(selectedBatch?._id);

    };


    useEffect(async () => {

        const programId = program?.id;
        const data = await MyProgramService.getProgramBatch(shopId, programId, batchID);
        setBatch(data);
        let lessonsData = []
        const lessonsDuration = data.batch?.batch?.lessonsDuration
        if (lessonsDuration && lessonsDuration.length > 0) {
            let cumulativeStartDate = new Date(data?.batch?.batch.startDate);
            cumulativeStartDate.setDate(cumulativeStartDate.getDate() + 1);

            for (i = 0; i < lessonsDuration.length; i++) {
                const lessonDuration = parseFloat(lessonsDuration[i].lessonDuration);
                const newStartDate = new Date(cumulativeStartDate); 
                cumulativeStartDate.setDate(cumulativeStartDate.getDate() + lessonDuration);

                lessonsData.push({
                    lessons: lessonsDuration[i].lesson,
                    lessonsDuration: newStartDate,
                    lessonStatus: lessonsDuration[i].lessonStatus,
                    tutor: lessonsDuration[i].tutor?lessonsDuration[i].tutor:{}
                });
            }
        }

        setAllLessons(lessonsData)

    }, [batchID]);

    return (
        <ThemeProvider theme={theme}>
            <JumboDdPopover
                triggerButton={<Button variant='outlined'>Schedule</Button>}
                disableInsideClick
            >


                {
                    showSettings ?
                        <Div sx={{ width: 580, maxWidth: '100%' }}>

                        </Div>
                        :
                        <Div sx={{ width: 760, maxWidth: '100%' }}>
                            <JumboCardQuick
                                title={<Div sx={{ display: 'flex', mt: 1, color: 'white' }}>
                                    <Select
                                        value={batchName}
                                        size="small"
                                        sx={{
                                            '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
                                            color: 'black',
                                            borderRadius: '10px',
                                            width: 'auto',
                                            height: '30px',
                                            fontSize: 12,
                                            textAlign: 'center',
                                            paddingLeft: '3px',
                                            minWidth: '100px',
                                            backgroundColor: 'white',
                                        }}
                                        inputProps={{ IconComponent: () => null }}
                                        onChange={(event) => handleChange(event)}
                                    >
                                        {program?.batches?.map((batch, index) => (
                                            <MenuItem value={batch.name}>{batch.name}</MenuItem>
                                        ))}
                                    </Select>



                                    <AccessTimeIcon sx={{ marginLeft: '60%' }} />
                                    <Typography sx={{ mb: 2, ml: 1 }}>
                                        {batchStartTime} - {batchEndTime}
                                    </Typography>

                                </Div>

                                }


                                headerSx={{ borderBottom: 1, borderBottomColor: 'divider', background: 'linear-gradient(90deg, #3ba15d, #3b81cc)' }}
                                wrapperSx={{ p: 0 }}
                            >
                                <React.Fragment>
                                    <ListItemButton
                                        component={"li"}
                                        sx={{
                                            transition: 'all 0.2s',
                                            borderBottom: 1,
                                            borderBottomColor: 'divider',
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
                                        <ListItemText
                                            variant="body1"
                                            sx={{ width: '72%', varticalAlign: "middle", }}
                                            primary={<Typography
                                                sx={{
                                                    mt: 1,
                                                    textOverflow: "ellipsis",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: "1",
                                                    paddingLeft: '15%',
                                                    lineHeight: "0.8",
                                                }}
                                            ><b>Lesson Name</b></Typography>}
                                        />

                                        <ListItemText
                                            variant="body1"
                                            sx={{ width: '25%', varticalAlign: "middle", }}
                                            primary={<Typography
                                                sx={{
                                                    mt: 1,
                                                    textOverflow: "ellipsis",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: "1",
                                                    lineHeight: "0.8",
                                                }}
                                            ><b>Date</b></Typography>}
                                        />
                                        <ListItem sx={{ width: "18%", varticalAlign: "middle", }}>
                                            <Typography
                                                sx={{
                                                    mt: 1,
                                                    textOverflow: "ellipsis",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: "1",
                                                    lineHeight: "0.8",
                                                }}
                                            ><b>Tutor</b></Typography>
                                        </ListItem>
                                        <ListItem sx={{ width: "20%", varticalAlign: "middle" }}>
                                            <Typography
                                                sx={{
                                                    mt: 1,
                                                    textOverflow: "ellipsis",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: "1",
                                                    lineHeight: "0.8",

                                                }}
                                            ><b>Status</b></Typography>
                                        </ListItem>
                                    </ListItemButton>
                                </React.Fragment>
                                <JumboScrollbar
                                    autoHeight autoHeightMin={390}
                                    autoHide
                                    autoHideDuration={200}
                                    autoHideTimeout={500}
                                >

                                    <List disablePadding>

                                        {
                                            allLessons?.map((lesson, index) => (
                                                <ProgramScheduleItem
                                                    key={index}
                                                    index={index}
                                                    day={index + 1}
                                                    lesson={lesson}
                                                    batch={batch}
                                                    productId={productIds}
                                                    selectedAvatar={selectedTutor}
                                                    handleAvatarClick={handleAvatarClick}
                                                    avatarMenuAnchor={avatarMenuAnchor}
                                                    openAvatarMenu={openAvatarMenu}
                                                    closeAvatarMenu={closeAvatarMenu}
                                                    tutorList={tutorList}
                                                />

                                            ))
                                        }
                                    </List>

                                </JumboScrollbar>

                            </JumboCardQuick>
                        </Div>
                }
            </JumboDdPopover>
        </ThemeProvider>
    )
}
