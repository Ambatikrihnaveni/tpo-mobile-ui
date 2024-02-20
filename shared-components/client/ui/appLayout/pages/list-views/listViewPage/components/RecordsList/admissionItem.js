import React, { useState } from 'react';
import {
    ListItemText,
    ListItemAvatar,
    Card,
    CardHeader,
    CardContent,
    Tooltip,
    Button,
    Badge,
    Typography,
    Avatar,
    Stack,
    Grid,
    LinearProgress
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import { ToastContainer, toast } from 'react-toastify';
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import RecordDetail from "../RecordDetail";
import SettingsIcon from '@mui/icons-material/Settings';
import Chip from "@mui/material/Chip";
import { Meteor } from "meteor/meteor";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import Admissions from '../../../../../../graphql/services/admissions/admission-service';
import ProgramBatchDetails from './programbatchdetails.js';
import ProgramPreview from '../../../../../../../../plugins/core/library/client/components/LibraryPreview/programPreview';

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

const { filesBaseUrl } = Meteor.settings.public;


const AdmissionItem = (params) => {
    const { record, view, recordType } = params;
    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const onPreview = (record) => {
        ;
        showDialog({
            fullScreen: true,
            content: <ProgramPreview handleClose={hideDialog} record={record} data={record.program} />,
            sx: {
                borderRadius: 0
            }
        })
    }

    const deleteRecordMutation = useMutation(Admissions.delete, {
        onSuccess: () => {
            hideDialogAndRefreshRecordsList();
        }
    });

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    

    const handleClose = () => {
        setAnchorEl(null);
    };

    const hideDialogAndRefreshRecordsList = React.useCallback(() => {
        hideDialog();
        setRecordsListRefresh(true);
    }, [hideDialog, setRecordsListRefresh]);


    const handleItemAction = (menuItem) => {
        switch (menuItem.action) {
            case 'connect':
                //onEdit(menuItem)
                showDialog({
                    
                    content: <ProgramBatchDetails record={record} onSave={hideDialogAndRefreshRecordsList} onClose={hideDialog} tutors={record?.tutors} setRecordsListRefresh={setRecordsListRefresh} />,

                    sx: {
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                maxWidth: "1100px",
                                borderRadius: '15px',
                                // Set your width here
                            },
                        },
                    },
                });
                break;
            case 'delete':
                showDialog({
                    variant: 'confirm',
                    title: 'Are you sure about deleting this record?',
                    content: "You won't be able to recover this record later",
                    onYes: async () => {
                        try {
                            await deleteRecordMutation.mutateAsync(record?.id),
                                hideDialog();
                            toast.success('Admision deleted successfully');
                        } catch (error) {
                            hideDialog();
                            toast.error(error?.graphQLErrors?.length > 0 ? error?.graphQLErrors[0].message : error?.message);
                        }

                    },
                    onNo: hideDialog
                })
        }
    };
    const handleConnectWithoutContact = () => {
        showDialog({
            content: <ProgramBatchDetails record={record} onSave={hideDialogAndRefreshRecordsList} onClose={hideDialog} tutors={record?.tutors} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        maxWidth: "1200px",
                        borderRadius: '15px',
                        // Set your width here
                    },
                },
            },

        });
    };


    let completedLessons = [];

    for (let x = 0; x < record?.lessonsDuration?.length; x++) {
        if (record?.lessonsDuration[x]?.lessonStatus === "Complete") {
            completedLessons.push(record?.lessonsDuration[x])

        }

    }


    const totalLessons = record?.lessonsDuration?.length || 0;
    const completedLessonsCount = completedLessons.length || 0;
    const progressPercentage = (completedLessonsCount / totalLessons) * 100;
    const status = completedLessons.length === totalLessons ? "Completed" : "In Progress";

    let imageSrc = (record?.program) ? record?.program?.programMedia[0]?.URLs?.thumbnail : '';

    if (imageSrc === String(null)) return null;

    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    } else {
        imageSrc = "";
    }



    if (view === "grid") {
        return (
            <JumboGridItem xs={12} sm={6} md={3} >
                <Card sx={{ m: 2, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }} key={record._id}>
                    <CardHeader
                        avatar={
                            <Chip variant={"body1"}
                                sx={{
                                    color: status === "Completed" ? "white" : "white",
                                    backgroundColor: status === "Completed" ? "#28a745" : "#f29339",
                                    fontSize: '14px',
                                    padding: "4px 14px",
                                    borderRadius: "8px",
                                    display: "inline-block",
                                }} label={status} />

                        }
                        action={
                            <JumboDdMenu
                                icon={<SettingsIcon />}
                                menuItems={[

                                    { icon: <ConnectWithoutContactIcon />, title: "Connect ", action: 'connect', data: record },
                                    { icon: <DeleteIcon />, title: "Delete", action: "delete", data: record }
                                ]}
                                onClickCallback={handleItemAction}
                            />
                        }

                    >
                    </CardHeader>
                    <CardContent sx={{
                        pt: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignrecords: 'center',
                        textAlign: 'center'
                    }}>
                        <Div sx={{ mb: 3 }}>
                            <Badge overlap="circular" variant="dot"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                sx={{
                                    '.MuiBadge-badge': {
                                        border: '2px solid #FFF',
                                        height: '14px',
                                        width: '14px',
                                        borderRadius: '50%',

                                    }
                                }}
                            >
                                <Avatar sx={{ width: 82, height: 82, mt: '-10px' }} src={imageSrc} />

                            </Badge>
                        </Div>
                        <Div >
                            <Tooltip title={record?.name}
                                onClick={() => { onPreview(record) }}

                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    textDecoration: isHovered ? "underline" : "none",
                                    color: isHovered ? "#04bfa0" : "inherit",
                                    cursor: "pointer" // Optional: Change cursor to indicate interaction
                                }}
                            >
                                <Typography variant={"h6"} mb={2} sx={{ mb: 2, textTransform: 'capitalize' }}><b>{record?.name}</b></Typography>
                            </Tooltip>
                        </Div>
                        
                        <Div sx={{
                            display: 'flex',
                            minWidth: 0,
                            flexDirection: 'column',
                            alignrecords: 'center',
                            alignSelf: 'stretch',
                            p: 2,
                            maxWidth: '100%',
                        }}
                        >
                            <LinearProgress
                                variant={"determinate"}
                                color="success"
                                value={progressPercentage}
                                sx={{
                                    borderRadius: 4,
                                    height: 5,
                                    mb: 1,
                                    backgroundColor: '#E9EEEF',
                                }}
                            />
                            <Typography
                                variant={"body1"}
                                color={"text.secondary"}
                                mb={3}
                            >{`${(completedLessons?.length) ? completedLessons?.length : '0'} / ${record?.lessonsDuration?.length} lessons completed`}
                            </Typography>
                        </Div>

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <Typography
                                    variant={"h5"}
                                    color={"text.secondary"}
                                    mb={.25}
                                >{(record?.program?.price == "0") ? <b style={{ color: "#9c0587" }}>Free</b> :
                                    <> <b style={{ color: '#9c0587' }}>{record?.batch_max_limit}</b> Intake </>}

                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant={"h5"}
                                    color={"text.secondary"}
                                    mb={.25}

                                >
                                    {(record?.program?.price == "0") ? <><b style={{ color: '#27a603' }}>{record.seatsFilled}</b> Enrolled</> :
                                        <> <b style={{ color: '#27a603' }}>{record.seatsAvailable}</b> Available</>}
                                </Typography>
                            </Grid>
                            
                        </Grid>
                        
                        <Button style={{ marginTop: '20px', padding: '10px' }} variant={'contained'} size={"small"} onClick={handleConnectWithoutContact} >Access</Button>
                    </CardContent>
                </Card>
            </JumboGridItem>
        )
    }

    return (
        <JumboListItem
            componentElement={"div"}
            itemData={record}
            secondaryAction={
                <JumboDdMenu
                    icon={<MoreHorizIcon />}
                    menuItems={[
                        { icon: <ConnectWithoutContactIcon />, title: "Connect ", action: 'connect' },
                        { icon: <DeleteIcon />, title: "Delete", action: "delete" }
                    ]}
                    onClickCallback={handleItemAction}
                />
            }
            sx={{
                cursor: 'pointer',
                borderTop: 1,
                borderColor: 'divider',
                '&:hover': {
                    bgcolor: 'action.hover',
                }
            }}
        >


            <ListItemText
                // onClick={showtutorDetail}
                primary={
                    <Typography variant={"body1"} component={"div"}>
                        <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0, textAlign: 'center' }}>
                            <Item
                                sx={{
                                    display: 'flex',
                                    flexBasis: { xs: '100%', sm: '50%', md: '28%' },
                                    flexShrink: 0, px: 1,
                                }}
                            >
                                <ListItemAvatar

                                //  onClick={showtutorDetail}
                                >
                                    <Avatar sx={{ width: 42, height: 42 }} src={imageSrc} />


                                </ListItemAvatar>
                                <div>
                                    <Typography variant={"h5"} mb={.5}>{record?.name?.charAt(0).toUpperCase() + record?.name?.slice(1)}</Typography>

                                    {record?.program?.price !== '0' ? (
                                        <Typography fontSize={"12px"} variant={"body1"} fontWeight={"bold"} sx={{ color: '#0b7b5d' }}>
                                            <CalendarTodayOutlinedIcon
                                                size="small"
                                                sx={{ verticalAlign: 'middle', fontSize: '0.7rem', mt: -.25, color: '#0b7b5d' }} /> {record.startDate}
                                        </Typography>
                                    ) : null}
                                </div>

                            </Item>
                            <Item
                                sx={{
                                    flexBasis: { sm: '50%', md: '20%' },
                                    display: { xs: 'none', sm: 'block' }
                                }}
                            >
                                <Typography variant={"body1"} noWrap
                                    onClick={() => { onPreview(record) }}

                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    style={{
                                        textDecoration: isHovered ? "underline" : "none",
                                        color: isHovered ? "#04bfa0" : "inherit",
                                        cursor: "pointer" // Optional: Change cursor to indicate interaction
                                    }}
                                >{record.program?.name}</Typography>
                            </Item>
                            <Item
                                sx={{
                                    flexBasis: { md: '35%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                {`${(completedLessons?.length) ? completedLessons?.length : '0'} / ${record?.lessonsDuration?.length} Lessons Completed`}
                                <LinearProgress
                                    variant={"determinate"}
                                    color="success"
                                    value={progressPercentage}
                                    sx={{
                                        width: '92%',
                                        borderRadius: 4,
                                        height: 5,
                                        mb: 1,
                                        backgroundColor: '#E9EEEF',
                                        marginLeft: "20px"
                                    }}
                                />
                            </Item>
                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <Typography
                                    variant={"body1"}
                                    sx={{
                                        color: status === "Completed" ? "white" : "white",
                                        backgroundColor: status === "Completed" ? "#28a745" : "#f29339",
                                        fontSize: '16px',
                                        padding: "4px 14px",
                                        borderRadius: "8px",
                                        display: "inline-block",
                                    }}
                                >
                                    {status}
                                </Typography>
                            </Item>


                        </Stack>
                    </Typography>
                }
            />
            <Item
                sx={{
                    flexBasis: { md: '22%' },
                    display: { xs: 'none', md: 'block' }
                }}
            >

                <Stack spacing={2} direction={"row"} alignItems={"center"} sx={{ textAlign: 'center' }}>
                    {(record?.program?.price == "0") ?
                        <>
                            <Item> </Item>
                            <Item>
                                <Typography variant={"h6"} sx={{ color: "#9c0587" }}>Free</Typography>
                            </Item>
                            <Item>
                                <Typography variant={"body1"} sx={{ color: '#180494' }} mb={.5}>{record?.seatsFilled}</Typography>
                                <Typography variant={"h6"} color="text.warning">Enrolled</Typography>
                            </Item>
                        </> : <>
                            <Item>
                                <Typography variant={"body1"} sx={{ color: "#9c0587" }} mb={.5}>{record?.batch_max_limit}</Typography>
                                <Typography variant={"h6"} color="text.secondary">Intake</Typography>
                            </Item>
                            <Item>
                                <Typography variant={"body1"} sx={{ color: '#27a603' }} mb={.5}>{record?.seatsAvailable}</Typography>
                                <Typography variant={"h6"} color="text.secondary">Available</Typography>
                            </Item>
                            <Item>
                                <Typography variant={"body1"} sx={{ color: '#180494' }} mb={.5}>{record?.seatsFilled}</Typography>
                                <Typography variant={"h6"} color="text.warning">Enrolled</Typography>
                            </Item>
                        </>
                    }

                </Stack>
            </Item>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </JumboListItem>
    );
};
/* Todo record, view prop define */
export default AdmissionItem;