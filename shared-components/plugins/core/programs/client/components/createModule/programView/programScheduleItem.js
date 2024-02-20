import React, { useState } from 'react';
import { alpha, Avatar, IconButton, ListItemAvatar, ListItemText, Typography, Tooltip, Select, MenuItem, ListItem, FormControl, Menu } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Div from '@jumbo/shared/Div';
import { Meteor } from "meteor/meteor";
import useAuth from '../../../../../../../client/ui/hooks/useAuth';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import moment from 'moment';
import MyProgramService from '../../../../../../../client/ui/graphql/services/programs/myProgram-services';

const { filesBaseUrl } = Meteor.settings.public;

const ProgramScheduleItem = (params) => {

    const { viewer } = useAuth();
    const shopId = localStorage.getItem('accounts:shopId')
    const [status, setStatus] = useState(params?.lesson?.lessonStatus);
    const lessonId = params?.lesson.lessons[0]._id


    const date = new Date("2023-08-1")

    const programId = params?.batch?.batch?.batch?.programId
    const batchID = params?.batch?.batch?.batch?._id
    const lessonIds = []
    for (i = 0; i < params.lesson.lessons.length; i++) {
        lessonIds.push(params.lesson.lessons[i]?._id)
    }
    const productId = params?.productId[0]
    const handleChange = async (event) => {
        const lessonStatus = event.target.value;
        setStatus(lessonStatus)
        const data = await MyProgramService.updateLessonStatus(shopId, programId, batchID, productId, lessonIds, lessonStatus);

    };


    return (
        <React.Fragment>
            <ListItemButton
                component={"li"}
                sx={{
                    // p: theme => theme.spacing(1, 3),
                    transition: 'all 0.2s',
                    borderBottom: 1,
                    borderBottomColor: 'divider',
                    '&:hover': {
                        boxShadow: `0 3px 10px 0 ${alpha('#000', 0.2)}`,
                        transform: 'translateY(-4px)',

                        '& .MuiChip-animation': {
                            width: 'auto',
                            height: 22,
                            fontSize: 12
                        }
                    }
                }}
            >
                <ListItemText
                    variant={"body1"}
                    sx={{ width: '40%' }}
                    primary={<>
                        <Div sx={{ display: "flex" }}>
                            <IconButton color='primary'><PlayCircleIcon /></IconButton>
                            <Div>

                                <Div >
                                    <Typography
                                        sx={{
                                            mt: 1,
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            WebkitLineClamp: "1",
                                        }}
                                    >
                                        {params.lesson.lessons[0]?.name}
                                    </Typography>
                                    <Div sx={{ display: "flex" }}>
                                        <Typography><SchoolOutlinedIcon style={{ color: '#08d1c4', fontSize: '0.925rem', fontWeight: '700', lineHeight: '0.85rem', }} /></Typography>
                                        <Typography style={{ fontSize: '0.825rem', fontWeight: '700', lineHeight: '0.75rem', color: 'rgb(0, 186, 255)', paddingTop: '3px', paddingLeft: '3px' }}>
                                            {params.lesson.lessons[0]?.product.title}
                                        </Typography>
                                    </Div>
                                </Div>

                            </Div>
                        </Div>
                    </>
                    }
                />
                <ListItemText
                    variant={"body1"}
                    sx={{ width: '20%' }}
                    primary={<Div sx={{ display: "flex", varticalAlign: "middle" }}>
                        <IconButton color='primary'><CalendarMonthIcon /></IconButton>
                        <Typography sx={{ mt: 1 }} > {moment(params.lesson?.lessonsDuration).format("DD MMMM YY")}</Typography>
                    </Div>
                    }
                />
                <ListItemAvatar>
                    <Tooltip title={params.lesson?.tutor?.name}>
                        <Avatar onClick={(event) => params.openAvatarMenu(event, params.lesson)} src={params.lesson?.tutor.userMedia ? `${filesBaseUrl}${params.lesson?.tutor?.userMedia[0]?.URLs?.thumbnail}` : ''} alt="Avatar" />
                    </Tooltip>
                </ListItemAvatar>
                <Menu
                    anchorEl={params.avatarMenuAnchor}
                    open={Boolean(params.avatarMenuAnchor)}
                    onClose={params.closeAvatarMenu}

                >
                    {params.tutorList?.map((tutor, index) => (
                        <MenuItem key={tutor._id} onClick={() => params.handleAvatarClick(tutor, params.lesson.lessons[0]._id)}>
                            <Avatar src={`${filesBaseUrl}${tutor.userMedia[0]?.URLs?.thumbnail}`} alt={tutor.name} />
                            <Typography style={{ marginLeft: '5px' }}>{tutor?.name}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
                <ListItem
                    sx={{ width: "20%" }}
                >
                    <FormControl sx={{ m: 1, minWidth: 120 }} disabled={viewer?.role == "Student" ? true : false}>
                        <Select
                            value={status}
                            size="small"
                            sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 }, color: "white", borderRadius: "30px", width: "auto", height: "30px", fontSize: 12, textAlign: "center", backgroundColor: status === 'Complete' ? '#28a745' : '#f29339', paddingLeft: '3px', minWidth: '100px' }}
                            inputProps={{ IconComponent: () => null }}
                            onChange={handleChange}

                        >
                            <MenuItem value="Complete">Complete</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>

                        </Select>
                    </FormControl>
                </ListItem>
            </ListItemButton>
        </React.Fragment>
    );
};
/* Todo project props */
export default ProgramScheduleItem;
