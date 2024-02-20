import React, { useState } from 'react';
import {
    ListItemText,
    ListItemAvatar,
    Typography,
    Card,
    CardHeader,
    Badge,
    ButtonGroup,
    Button, Slide,
    Avatar,
    AvatarGroup,
    CardContent,
    CardActions,
    Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import styled from "@emotion/styled";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import { Dialog, DialogContent } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import RecordDetail from "../RecordDetail";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import MyProgramService from '../../../../../../graphql/services/programs/myProgram-services';
import Tooltip from '@material-ui/core/Tooltip';
import ProgramView from '../../../../../../../../plugins/core/programs/client/components/createModule/programView/programView';
import useAuth from '../../../../../../hooks/useAuth';
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId.js";
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ProgramPreview from '../../../../../../../../plugins/core/library/client/components/LibraryPreview/programPreview';
import StudentAssignToProgram from './studentassignedprogram';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

const { filesBaseUrl } = Meteor.settings.public;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StudentProgramItem = ({ record, view, i, user, recordType }) => {

    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false)
    const recordTypes = "Module";
    const [previewData, setPreviewData] = useState({})
    const [open, setOpen] = React.useState(false)
    const { isViewerLoading, viewer, data } = useAuth();
    const role = viewer?.role
    const { shopId } = useCurrentShopId();
    const { selectedRecords, setSelectedRecords, setRecordsListRefresh1, } = useListViewPage();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialog, setIsDialog] = useState(false);
    const { showDialog1, hideDialog1 } = useJumboDialog();

    let programLessons = []
    for (let i = 0; i < record?.products?.length; i++) {
        for (let x = 0; x < record?.products[i].lessonsDuration?.length; x++) {
            for (let y = 0; y < record?.products[i].lessonsDuration[x]?.lesson?.length; y++) {
                programLessons.push(record?.products[i].lessonsDuration[x].lesson[y])
            }
        }
    }

    let userShopId = ""
    if (viewer?.role == "Master-Admin" || viewer?.role == "Admin") {
        userShopId = shopId
    } else {
        userShopId = viewer?.shopId
    }
    const deletePrms = { record, recordTypes, userShopId };


    const handleClickOpen = (data) => {

        setPreviewData(data)
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    let removeLastLetter = record?.type?.slice(0, -1);
    let changeToUpperCase = removeLastLetter?.charAt(0).toUpperCase() + removeLastLetter?.slice(1);

    let imageSrc = record?.programMedia ? record?.programMedia[0]?.URLs?.small : '';

    // If there is no img src, then render nothing
    if (imageSrc === String(null)) return null;

    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    } else {
        imageSrc = "";
    }
    const deleteRecordMutation = (viewer?.role == "Admin") ? (useMutation(MyProgramService.delete, {
        onSuccess: () => {
            hideDialogAndRefreshRecordsList();
        }
    })) : (useMutation(MyProgramService.removeProgram, {
        onSuccess: () => {
            hideDialogAndRefreshRecordsList();
        }
    })
    )
    const hideDialogAndRefreshRecordsList = React.useCallback(() => {
        hideDialog();
        setRecordsListRefresh(true);
    }, [hideDialog, setRecordsListRefresh]);


    const showRecordDetail = React.useCallback(() => {
        showDialog({
            content: <RecordDetail record={record} onClose={hideDialog} />
        })
    }, [showDialog, record]);

    const onEdit = React.useCallback(async (menuItem) => {

        const programId = menuItem?.data.id;
        navigate(`/programs/${programId}/editprogram`);
    }, [navigate]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };



    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    const handleOk = () => {
        setIsDialog(false)
    }

    const handleChange = (event) => {

        setAction(event.target.value);
        if (event.target.value === 'Assign To Program') {
            handleOpenDialog();
        }
    };



    const onPreview = (data) => {
        setPreviewData(data)
        showDialog({
            fullScreen: true,
            content: <ProgramView data={data} onClose={hideDialog} />,
            sx: {
                borderRadius: 0
            }
        })
    }

    const onQuiz = (data) => {
        const programId = data?.id
        navigate(`/${programId}/lesson-quiz`)
    }

    const onProgramPreview = (record) => {

        showDialog({
            fullScreen: true,
            content: <ProgramPreview handleClose={hideDialog} record={record} data={record} />,
            sx: {
                borderRadius: 0
            }
        })
    }

    const nameLength = (name) => {
        if (name?.length > 10) {
            return name.substring(0, 10) + '...';
        }
        return name;
    };

    /* const onRowClick = React.useCallback(async (record) => {
        const programId = record?._id ;
        navigate(`/programs/${programId}/editprogram`);
    }, [navigate]); */

    const handleItemAction = (menuItem) => {

        switch (menuItem.action) {
            /* case 'connect':
                setIsDialogOpen(true);
                break; */
            case 'connect':
                setIsDialogOpen(true);
                break;
            case 'delete':
                showDialog({
                    variant: 'confirm',
                    title: <b>Are you sure about deleting this record?</b>,
                    content: "You won't be able to recover this record later",
                    onYes: () => deleteRecordMutation.mutate(deletePrms.record.id),
                    onNo: hideDialog
                })
        }
    };
    const ActionButton = styled(Button)(({ theme }) => ({
        padding: theme.spacing(1.5, 2),
        borderBottom: 'none',
        borderRadius: 0,
        textTransform: 'none',
        letterSpacing: 0,
        borderColor: theme.palette.divider,
        color: theme.palette.text.secondary,

        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            borderBottom: 'none',
        },
    }));

    const Item1 = ({ children, sx }) => (
        <Div sx={{ textAlign: 'center', flexBasis: '33.33%', p: theme => theme.spacing(1, 2), ...sx }}>
            {children}
        </Div>
    );
    const currencySymbols = {
        USD: '$',
        EUR: '€',
        INR: '₹',
        // Add more currencies as needed
    };
    const currencyCode = record?.currencyCode || 'INR';



    const string = record?.name
    const truncateString = (str = '', maxLength = 50) => str?.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const truncateName = truncateString(string, 15);

    /*  const viewProfile = (id) => {
          
         navigate(`/${id}/viewprofile`)
     } */



    const viewProfile = React.useCallback(() => {
        navigate(`/${record?.account?._id}/viewprofile`)

    }, [showDialog, record]);


    if (view === "grid") {

        const [isHovered, setHover] = React.useState(-1);
        return (
            <JumboGridItem xs={12} sm={6} md={4} lg={3} >
                <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth
                    maxWidth="lg"

                    BackdropClick="static" // This prevents closing on backdrop click
                    aria-labelledby="dialog-title"
                    PaperProps={{
                        sx: {
                            maxHeight: 1800,
                            borderRadius: '15px',
                            minWidth: '400px',
                            overflowX: 'scroll'
                        }
                    }}
                >
                    <DialogContent>
                        <StudentAssignToProgram selectedRecords={selectedRecords} onClose={handleCloseDialog} setSelectedRecords={setSelectedRecords} style={{ borderRadius: '15px' }} setIsDialog={setIsDialog} handleOk={handleOk} record={record} />
                    </DialogContent>
                </Dialog>
                <Dialog open={isDialog}
                    PaperProps={{
                        sx: {
                            minHeight: 300,
                            minWidth: 400,
                            borderRadius: '15px'
                        }
                    }}>

                    <DialogContent>
                        <Div style={{ marginLeft: '50px', marginTop: '40px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <CheckCircleOutlineIcon style={{ width: '50px', height: '50px', color: 'green', marginLeft: '80px' }} />
                                <Typography style={{ fontSize: '1.2rem' }}> Students Assigned successfully</Typography>
                            </div>
                            <Button variant='contained' style={{ marginLeft: '80px' }} onClick={handleOk}>OK</Button>
                        </Div>
                    </DialogContent>
                </Dialog>

                <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <JumboDdMenu
                                    icon={<SettingsIcon />}
                                    menuItems={[
                                        { icon: <ConnectWithoutContactIcon />, title: "Pay&Enroll ", action: 'connect', data: record },
                                        { icon: <DeleteIcon />, title: "Delete", action: "delete" }
                                    ]}
                                    onClickCallback={handleItemAction}
                                />
                            </IconButton>
                        }
                        sx={{ pb: 0 }}
                    >
                    </CardHeader>
                    <CardContent sx={{
                        pt: 0,
                        minHeight: '250px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
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
                                <Avatar sx={{ width: 72, height: 72, mt: '-30px' }} alt={record?.name} src={imageSrc} />
                            </Badge>
                        </Div>
                        <Typography variant={"h5"} mb={.75} style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '-10px' }}>{record?.name && record?.name.charAt(0).toUpperCase() + record?.name.slice(1)}</Typography>
                        <Div sx={{ mb: 1 }}>
                            {(record?.tutors?.length > 0) ?
                                <AvatarGroup max={3}>
                                    {record?.tutors?.map((tutor) => (
                                        <Tooltip title={tutor.name}>
                                            <Avatar alt={tutor.name} src={`${filesBaseUrl}${tutor.userMedia[0]?.URLs?.thumbnail}`} />
                                        </Tooltip>
                                    ))}

                                </AvatarGroup> : <Avatar src={''} alt={'NoTutor'} />

                            }

                        </Div>
                        <Stack direction={"row"} alignSelf="stretch">
                            <Item1>
                                <Typography variant={"h6"} mb={.5} style={{ color: '#9c0587' }}>{record?.products?.length}</Typography>
                                <Typography variant={"body1"} color="#9c0587" fontSize={13}>Modules</Typography>
                            </Item1>
                            <Item1>
                                <Typography variant={"h6"} mb={.5} style={{ color: '#27a603' }}>{programLessons?.length}</Typography>
                                <Typography variant={"body1"} color="#27a603" fontSize={13}>Lessons</Typography>
                            </Item1>
                            <Item1>
                                <Typography variant={"h6"} mb={.5} style={{ color: '#e39905' }}>{record.price ? record.price : '0'}</Typography>
                                <Typography variant={"body1"} color="#e39905" fontSize={13}>Price</Typography>
                            </Item1>
                        </Stack>
                    </CardContent>
                    <CardActions sx={{ p: 0, mx: '-1px' }}>
                        <ButtonGroup size="large" fullWidth variant="outlined">
                            <ActionButton onClick={() => { onProgramPreview(record) }}>Preview</ActionButton>
                            {(role === 'Student' && record?.price === '0') && (
                                <ActionButton onClick={() => { onPreview(record) }}>View</ActionButton>
                            )}
                        </ButtonGroup>
                    </CardActions>
                </Card>
            </JumboGridItem>
        )
    }
    /*  */
    return (
        <React.Fragment>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth
                maxWidth="lg"
                BackdropClick="static" // This prevents closing on backdrop click
                aria-labelledby="dialog-title"
                PaperProps={{
                    sx: {
                        maxHeight: 1800,
                        borderRadius: '15px'
                    }
                }}
            >
                <DialogContent>
                    <StudentAssignToProgram selectedRecords={selectedRecords} onClose={handleCloseDialog} setSelectedRecords={setSelectedRecords} style={{ borderRadius: '15px' }} setIsDialog={setIsDialog} handleOk={handleOk} record={record} />
                </DialogContent>
            </Dialog>
            <Dialog open={isDialog}
                PaperProps={{
                    sx: {
                        minHeight: 300,
                        minWidth: 400,
                        borderRadius: '15px'
                    }
                }}>

                <DialogContent>
                    <Div style={{ marginLeft: '50px', marginTop: '40px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <CheckCircleOutlineIcon style={{ width: '50px', height: '50px', color: 'green', marginLeft: '80px' }} />
                            <Typography style={{ fontSize: '1.2rem' }}> Students Assigned successfully</Typography>
                        </div>
                        <Button variant='contained' style={{ marginLeft: '80px' }} onClick={handleOk}>OK</Button>
                    </Div>
                </DialogContent>
            </Dialog>
            <JumboListItem
                componentElement={"div"}
                itemData={record}
                recordType={recordType}
                secondaryAction={
                    <Item sx={{ display: "flex" }}>

                        <Button
                            onClick={() => handleItemAction({ action: 'connect' })}
                            sx={{
                                color: record?.isPayment ? '#ffffff' : '#0d64b3',
                                backgroundColor: record?.isPayment && record?.price !== '0' ? '#4CAF50' : '',
                                cursor: record?.isPayment ? 'not-allowed' : 'pointer',
                            }}
                            disabled={record?.price === '0' || record?.isPayment}
                        >
                            {record?.price !== '0' && record?.isPayment ? 'Paid' : 'Pay & Enroll'}
                        </Button>

                        <Button onClick={() => handleItemAction({ action: 'delete' })} sx={{ ml: 4, color: '#9d2c44' }}>Remove</Button>

                    </Item>
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
                
                <ListItemAvatar
                >
                    <Avatar alt={record?.name} src={imageSrc} />
                </ListItemAvatar>
                <ListItemText


                    primary={
                        <Typography variant={"body1"} component={"div"}>

                            <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0 }}>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                                    }}
                                >

                                    <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0}
                                        noWrap>
                                        <Tooltip title={record?.name}>
                                            <label>
                                                {truncateName}
                                            </label>
                                        </Tooltip>
                                        <Tooltip title="Click for Preview">
                                            <VisibilityIcon style={{ marginLeft: '20px', fontSize: '16px' }} onClick={() => { onProgramPreview(record) }} />
                                        </Tooltip>
                                        {role === 'College-Admin' ? null : (
                                            role === 'Student' && (record?.isPayment || record?.price === '0') ? (
                                                <>
                                                    <Tooltip title="Click for view">
                                                        <PlayLessonIcon style={{ fontSize: '16px', marginLeft: '20px' }} onClick={() => { onPreview(record) }} />
                                                    </Tooltip>
                                                    {record?.price === '0' && (
                                                        <Tooltip title="Quizzes">
                                                            <PsychologyAltIcon style={{ marginLeft: '20px', fontSize: '16px' }} onClick={() => { onQuiz(record) }} />
                                                        </Tooltip>
                                                    )}
                                                </>
                                            ) : null
                                        )}


                                    </Typography>

                                </Item>



                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '20%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap> {record.products?.length} </Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>  {record?.price === '0' ? "Free" : `${currencySymbols[currencyCode]}${record?.price}`} </Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' },
                                        ml: "-10%"
                                    }}
                                    // onClick={()=>viewProfile(record?.account._id)}
                                    onClick={viewProfile}
                                >
                                    <Typography variant={"body1"} noWrap
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        sx={{
                                            textDecoration: isHovered ? "underline" : "none",
                                            color: isHovered ? "#04bfa0" : "inherit",
                                            textTransform: 'capitalize',
                                            cursor: "pointer"
                                        }}>{record.account?.name}</Typography>
                                </Item>
                            </Stack>
                        </Typography>
                    }
                />
            </JumboListItem>
        </React.Fragment>

    );
};
/* Todo record, view prop define */
export default StudentProgramItem;