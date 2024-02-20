import React, { useState } from 'react';
import {
    ListItemText,
    ListItemAvatar,
    Typography,
    Card,
    CardHeader,
    Badge,
    ButtonGroup,
    Button,
    Slide,
    Avatar,
    AvatarGroup,
    CardContent,
    CardActions,
    Stack,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import styled from "@emotion/styled";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
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
import ProgramPreview from '../../../../../../../../plugins/core/library/client/components/LibraryPreview/programPreview';
import { ToastContainer, toast } from 'react-toastify';


const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

const { filesBaseUrl } = Meteor.settings.public;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProgramItem = ({ record, view, i, user }) => {

    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false)
    const recordType = "Module";
    const [previewData, setPreviewData] = useState({})
    const [open, setOpen] = React.useState(false)
    const { viewer } = useAuth();
    const { shopId } = useCurrentShopId();
    const role = viewer?.role

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
    const deletePrms = { record, recordType, shopId };


    const handleClickOpen = (data) => {

        setPreviewData(data)
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    let removeLastLetter = record?.type?.slice(0, -1);
    let changeToUpperCase = removeLastLetter?.charAt(0).toUpperCase() + removeLastLetter?.slice(1);
    let authorName = record?.account?.name;
    let imageSrc = record?.programMedia ? record?.programMedia[0]?.URLs?.medium : '';

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
    })) : (useMutation(MyProgramService.remove, {
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

    const onProgramPreview = (record) => {
        ;
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
            case 'edit':
                onEdit(menuItem)
                break;
            case 'delete':
                showDialog({
                    variant: 'confirm',
                    title: 'Are you sure about deleting this record?',
                    content: "You won't be able to recover this record later",
                    onYes: async () => {
                        try {
                            await deleteRecordMutation.mutateAsync(viewer?.role == "Admin" ? record.id : deletePrms);
                            // hideDialog();
                            toast.success('Program deleted successfully', {
                                position: "bottom-right",
                                autoClose: 1500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                            setTimeout(() => {
                                hideDialog();
                            }, "2500");
                        } catch (error) {
                            //hideDialog();
                            toast.error(error?.graphQLErrors?.length > 0 ? error?.graphQLErrors[0].message : error?.message, {
                                position: "bottom-right",
                                autoClose: 1500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                            setTimeout(() => {
                                hideDialog();
                            }, "2500");
                        }
                    },
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
    const truncateName = truncateString(string, 25);

    const viewProfile = (id) => {

        navigate(`/${id}/viewprofile`)
    }


    if (view === "grid") {
        const [isHovered, setHover] = React.useState(-1);
        return (
            <JumboGridItem xs={12} sm={6} md={4} lg={3} >

                <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <JumboDdMenu
                                    icon={<SettingsIcon />}
                                    menuItems={viewer?.role == "Admin" ? [
                                        { icon: <EditIcon />, title: "Edit", action: "edit", data: record },
                                        { icon: <DeleteIcon />, title: "Delete", action: "delete", data: record }
                                    ] : [
                                        { icon: <DeleteIcon />, title: "Remove", action: "delete", data: record }
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
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: '270px'
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
                                <Avatar sx={{ width: 72, height: 72, mt: '-30px', justifyContent: 'center', display: "flex" }} alt={record?.name} src={imageSrc} />
                            </Badge>
                        </Div>
                        <Typography variant={"h5"} mb={.75} style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '-10px', justifyContent: 'center' }}>{record?.name && record?.name.charAt(0).toUpperCase() + record?.name.slice(1)}</Typography>
                        <Div sx={{ mb: 1, justifyContent: 'center' }}>
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
                                <Typography variant={"h6"} mb={.5} style={{ color: '#e39905' }}> {currencySymbols[record.priceType]}{record.price ? record.price : '0'}</Typography>
                                <Typography variant={"body1"} color="#e39905" fontSize={13}>Price</Typography>
                            </Item1>
                        </Stack>
                    </CardContent>
                    <CardActions sx={{ p: 0, mx: '-1px' }}>
                        <ButtonGroup size="large" fullWidth variant="outlined">
                            <ActionButton onClick={() => { onProgramPreview(record) }}>Preview</ActionButton>
                            {(role === 'Master-Admin' || role === 'Admin') && (
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
            <JumboListItem
                componentElement={"div"}
                itemData={record}
                secondaryAction={
                    <JumboDdMenu
                        icon={<MoreHorizIcon />}
                        menuItems={viewer?.role == "Admin" ? [
                            { icon: <EditIcon />, title: "Edit", action: "edit", data: record },
                            { icon: <DeleteIcon />, title: "Delete", action: "delete", data: record }
                        ] : [
                            { icon: <DeleteIcon />, title: "Remove", action: "delete", data: record }
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

                                    <Typography variant={"h5"} fontSize={16} lineHeight={("24px")} mb={0}
                                    >
                                        <Tooltip title={record?.name}>
                                            <label>
                                                {(truncateName && truncateName.charAt(0).toUpperCase() + truncateName.slice(1))}
                                            </label>
                                        </Tooltip>
                                        {
                                            truncateName == "" ? ("") : (
                                                <Tooltip title="Click for Preview">
                                                    <VisibilityIcon style={{ marginLeft: '10px', fontSize: '16px' }} onClick={() => { onProgramPreview(record) }} />
                                                </Tooltip>
                                            )
                                        }
                                        {
                                            truncateName == "" ? ("") : (
                                                (role === 'Master-Admin' || role == "Admin") &&
                                                <Tooltip title="Click for View">
                                                    <PlayLessonIcon style={{ marginLeft: '20px', fontSize: '16px' }} onClick={() => { onPreview(record) }} />
                                                </Tooltip>
                                            )
                                        }

                                    </Typography>

                                </Item>



                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography sx={{ marginLeft: "50px" }} variant={"body1"} noWrap> {changeToUpperCase} </Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography sx={{ marginLeft: "50px" }} variant={"body1"} noWrap>  {record?.price === '0' ? "Free" : `${currencySymbols[currencyCode]}${record?.price}`} </Typography>
                                </Item>

                                <Item
                                    sx={{
                                        marginRight: 5,
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },
                                    }}
                                >
                                    {record?.modes ? (
                                        <Typography style={{ marginLeft: '20px' }} variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                                            {record.modes.join(' , ')}
                                        </Typography>
                                    ) : null}
                                </Item>

                                {
                                    viewer?.role === "College-Admin" &&
                                    <Item
                                        sx={{
                                            flexBasis: { md: '25%' },
                                            display: { xs: 'none', md: 'block' }
                                        }}
                                        onClick={() => viewProfile(record?.account._id)}
                                    >
                                        <Tooltip key={i} title={authorName?.charAt(0).toUpperCase() + authorName?.slice(1)} placement='bottom'>
                                            <Typography variant={"body1"} noWrap onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                style={{
                                                    textDecoration: isHovered ? "underline" : "none",
                                                    color: isHovered ? "#04bfa0" : "inherit",
                                                    cursor: "pointer",
                                                }}>{authorName?.charAt(0).toUpperCase() + authorName?.slice(1)}</Typography>
                                        </Tooltip>
                                    </Item>
                                }
                                {
                                    viewer?.role === "Admin" &&
                                    <Item
                                        sx={{
                                            flexBasis: { md: '25%' },
                                            display: { xs: 'none', md: 'block' }
                                        }}
                                    >
                                        <Tooltip key={i} title={authorName?.charAt(0).toUpperCase() + authorName?.slice(1)} placement='bottom'>
                                            <Typography variant={"body1"} noWrap onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                style={{
                                                    // textDecoration: isHovered ? "underline" : "none",
                                                    color: isHovered ? "#04bfa0" : "inherit",
                                                    cursor: "pointer",
                                                }}>{authorName?.charAt(0).toUpperCase() + authorName?.slice(1)}</Typography>
                                        </Tooltip>
                                    </Item>
                                }

                                {viewer?.role == "Admin" && <Item
                                    sx={{
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap sx={{ color: record?.isApproved ? "#04851e" : "#bf890b", ml: 4 }}>{record?.isApproved ? "Approved" : "Pending"}</Typography>
                                </Item>}

                            </Stack>
                        </Typography>
                    }
                />
                <ToastContainer
                    position="top-right"
                    autoClose={1500}
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
        </React.Fragment>
    );
};
/* Todo record, view prop define */
export default ProgramItem;