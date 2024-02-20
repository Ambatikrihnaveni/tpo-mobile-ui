import React, { useState } from 'react';
import {
    ListItemText,
    ListItemAvatar,
    Card,
    CardHeader,
    CardContent,
    Button,
    Tooltip,
    Typography,
    Avatar,
    Stack,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IconButton from "@mui/material/IconButton";
import styled from "@emotion/styled";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import RecordDetail from "../RecordDetail";
import CreateGroup from './components/CreateGroup';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import InviteStudent from './InviteStudent'
import { useNavigate } from "react-router-dom";
import { CollegeAdmin } from '../../../../../../graphql/services/college-admin/collegeAdmin-services';
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import GroupBatchDetails from './groupbatchdetails';
import useAuth from '../../../../../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));
const { filesBaseUrl } = Meteor.settings.public;

const StudentGroupItem = ({ record, view, recordType, item }) => {
    ;
    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const [expanded, setExpanded] = React.useState(false);
    const [isHovered, setIsHovered] = useState(false)
    const { viewer } = useAuth();
    const [isCopied, setIsCopied] = useState(false);
    const groupId = record?.id;
    let thumbnailImage = (record?.userMedia) ? record?.userMedia[0]?.URLs?.thumbnail : '';
    if (thumbnailImage) {
        thumbnailImage = `${filesBaseUrl}${thumbnailImage}`;
    }
    const deleteRecordMutation = useMutation(CollegeAdmin.deleteStudentGroup, {
        onSuccess: () => {
            hideDialogAndRefreshRecordsList();
        }
    });
    const dateObject = new Date(record?.createdAt)
    const formatted = dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();

    const handleClickPreview = () => {
        localStorage.removeItem('groupId')
        localStorage.setItem('groupId', groupId)
        navigate(`/groups/${groupId}/groupList`)
    }
    const hideDialogAndRefreshRecordsList = React.useCallback(() => {
        hideDialog();
        setRecordsListRefresh(true);
    }, [hideDialog, setRecordsListRefresh]);

    const groups = record.groupPrograms || []; // Assuming you have the program list here

    const showRecordDetail = React.useCallback(() => {
        showDialog({
            /* fullScreen: true, */
            content: <RecordDetail record={record} onClose={hideDialog} style={{ borderRadius: '15px' }} thumbnailImage={thumbnailImage} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "1000px",
                        maxWidth: "1000px",
                        borderRadius: '15px'
                        // Set your width here
                    },
                },
            },
        })
    }, [showDialog, record]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    const handleItemAction = (menuItem) => {
        switch (menuItem.action) {

            case 'connect':
                //onEdit(menuItem)
                showDialog({
                    content: <GroupBatchDetails record={record} onSave={hideDialogAndRefreshRecordsList} onClose={hideDialog} tutors={record?.tutors} />,

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
                break;

            case 'edit':
                showDialog({
                    title: '',
                    content: <CreateGroup record={record} onClose={hideDialog} setRecordsListRefresh={setRecordsListRefresh} hideDialogAndRefreshRecordsList={hideDialogAndRefreshRecordsList} />,
                    sx: {
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                width: "1000px",
                                height: " 500px",
                                maxWidth: "1000px",
                                borderRadius: '15px',
                                marginLeft: '10px'
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
                    //onYes: () => deleteRecordMutation.mutate(record?.id),
                    onYes: async () => {
                        try {
                            await deleteRecordMutation.mutateAsync(record?.id);
                            hideDialog();
                            toast.success('Group deleted successfully');
                        } catch (error) {
                            hideDialog();
                            toast.error(error?.graphQLErrors?.length > 0 ? error?.graphQLErrors[0].message : error?.message);
                        }
                    },
                    onNo: hideDialog
                })

                break;
            case "Invite Student":
                showDialog({
                    /* fullScreen: true, */
                    content: <InviteStudent onClose={hideDialog} style={{ borderRadius: '15px' }} record={record} setRecordsListRefresh={setRecordsListRefresh} />,
                    sx: {
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                width: "800px",
                                height: '600px',
                                maxWidth: "1000px",
                                borderRadius: '15px',
                                marginLeft: '10px'
                                // Set your width here
                            },
                        },
                    },
                })
        }
    };
    const handleClick1 = () => {
        if (Projectdata.find((product) => product.id === record.id))
            setExpanded(!expanded);
    }
    const viewProfile = (id) => {
        navigate(`/${id}/viewprofile`)
    }

    const handleCopy = () => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 10000); // Reset the "Copied" state after 10 seconds
    };

    if (view === "grid") {
        return (
            <JumboGridItem xs={12} sm={6} md={6} lg={4}>

                <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>
                    <CardHeader
                        avatar={
                            <div>

                                <Typography style={{ color: '#50C2C9', fontSize: '14px', marginLeft: '5px' }} variant="body1">{record?.stream}</Typography>
                                {viewer?.role == "Student" && ""}
                                {viewer?.role == <Typography style={{ marginTop: '3px', marginLeft: '5px', fontSize: '14px' }} variant="body2">{record?.selectedStartYear}-{record?.selectedEndYear}</Typography>}

                            </div>

                        }
                        action={
                            <IconButton aria-label="settings">
                                {viewer?.role !== "Student" &&
                                    <JumboDdMenu
                                        icon={<MoreHorizIcon />}
                                        menuItems={[
                                            { icon: <ConnectWithoutContactIcon />, title: "Connect ", action: 'connect' },
                                            { icon: <EditIcon />, title: "Edit", action: "edit" },
                                            { icon: <PersonAddAlt1Icon />, title: "Invite Student", action: "Invite Student" },
                                            { icon: <DeleteIcon />, title: "Delete", action: "delete" }
                                        ]}
                                        onClickCallback={handleItemAction}
                                    />}

                            </IconButton>
                        }
                    >
                    </CardHeader>
                    <CardContent sx={{
                        pt: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Div sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            textAlign: 'center'
                        }}
                        >
                            <Div sx={{ display: 'flex', mb: 2 }}>
                                <Avatar sx={{ width: 52, height: 52 }} alt={record.name} src={record.img} style={{ marginTop: '-30px' }} />
                            </Div>
                            <Typography variant={"h6"} mb={2} sx={{ mb: 2 }} style={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'capitalize' }}>{viewer?.role == "Student" ? record.name : record.groupName}</Typography>
                            {viewer?.role == "Student" && ""}
                            {viewer?.role == "College-Admin" && " "
                                /* <Div sx={{ mb: 2 }}>
                                    <AvatarGroup max={3}>
                                        <Avatar alt="React" src="/static/images/avatar/1.jpg" />
                                        <Avatar alt="Node.js" src="/static/images/avatar/2.jpg" />
                                        <Avatar alt="HTml" src="/static/images/avatar/3.jpg" />
                                        <Avatar alt="JavaScript" src="/static/images/avatar/4.jpg" />
                                        <Avatar alt="Css" src="/static/images/avatar/5.jpg" />
                                    </AvatarGroup>
                                </Div> */
                            }
                            <Div sx={{
                                display: 'flex',
                                minWidth: 0,
                                flexDirection: 'column',
                                alignItems: 'center',
                                alignSelf: 'stretch',
                                width: '240px',
                                maxWidth: '100%',
                            }}
                            >
                               
                                {viewer?.role == "Student" && <Typography
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    style={{
                                        textDecoration: isHovered ? "underline" : "none",
                                        color: isHovered ? "#04bfa0" : "inherit",
                                        cursor: "pointer"
                                    }}
                                    variant={"body1"}
                                    color={"text.secondary"}
                                    mb={3}
                                > {record?.account?.name}

                                </Typography>}

                                {viewer?.role == "College-Admin" && <Typography
                                    variant={"body1"}
                                    color={"text.secondary"}
                                    mb={3}
                                > {record?.students?.length}/{record.enrolled}
                                    Students
                                </Typography>
                                }
                            </Div>
                            <Button variant={'contained'} size={"small"} onClick={handleClickPreview} >Access</Button>
                        </Div>
                    </CardContent>
                </Card>
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
            </JumboGridItem>
        )
    }

    return (
        <JumboListItem
            componentElement={"div"}
            itemData={record}
            recordType={recordType}
            secondaryAction={
                viewer?.role !== "Student" && <JumboDdMenu
                    icon={<MoreHorizIcon />}
                    menuItems={[
                        { icon: <ConnectWithoutContactIcon />, title: "Connect ", action: 'connect' },
                        { icon: <EditIcon />, title: "Edit", action: "edit" },
                        { icon: <PersonAddAlt1Icon />, title: "Invite Student", action: "Invite Student" },
                        { icon: <DeleteIcon />, title: "Delete", action: "delete" }
                    ]}
                    onClickCallback={handleItemAction}
                />}


            sx={{
                cursor: 'pointer',
                borderTop: 1,
                borderColor: 'divider',
                '&:hover': {
                    bgcolor: 'action.hover',
                }
            }}
        >

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

            <ListItemText


                // onClick={showtutorDetail}
                primary={
                    <Typography variant={"body1"} component={"div"}>
                        <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0, textAlign: 'center' }}>
                            <Item
                                sx={{
                                    display: 'flex',
                                    flexBasis: { xs: '50%', sm: '25%', md: '18%' },
                                    flexShrink: 0, px: 1,
                                }}
                                onClick={handleClickPreview}
                            >
                                <ListItemAvatar
                                //  onClick={showtutorDetail}

                                >
                                    <Avatar alt={record.name} src={record.img} variant="rounded" />
                                </ListItemAvatar>
                                <div>
                                    <Typography variant={"h5"} mb={.5} sx={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: "1",
                                        WebkitBoxOrient: "vertical",
                                        textTransform: 'capitalize'
                                    }} >{viewer?.role == "Student" ? record.name : record.groupName}</Typography>
                                    
                                </div>
                            </Item>
                            <Item
                                sx={{
                                    marginRight:" 50px",
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                <Typography variant={"body1"} noWrap

                                >{formatted}</Typography>
                            </Item>

                            <Item
                                sx={{
                                    marginRight:"50px",
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                                onClick={() => viewProfile(record.account._id)}
                            >
                                <Typography variant={"body1"}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    style={{
                                        textDecoration: isHovered ? "underline" : "none",
                                        color: isHovered ? "#04bfa0" : "inherit",
                                        cursor: "pointer",
                                        marginLeft: "45px",
                                    }}
                                >{(viewer?.role == "Student") ? record?.account?.name : record?.studentEmails?.length}
                                </Typography>
                            </Item>

                            <Item
                                sx={{
                                    marginRight:"60px",
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <Tooltip
                                    title={
                                        <ul>
                                            {groups.map((program, index) => (
                                                <li key={index}>{program?.name}</li>
                                            ))}
                                        </ul>
                                    }
                                >
                                    <Typography variant={"body1"}>{record?.groupPrograms?.length}</Typography>
                                </Tooltip>
                            </Item>
                            {
                                viewer?.role == "College-Admin" &&
                                (
                                    <Item
                                        sx={{
                                            ml:10,
                                            textAlign: 'center',
                                            flexBasis: { md: '25%' },
                                            display: { xs: 'none', md: 'block' }
                                        }}
                                    >
                                        <CopyToClipboard text={record?.inviteLink} onCopy={handleCopy}>
                                            <Button variant="outlined" startIcon={<ContentCopyIcon />} disabled={isCopied}>{isCopied ? 'Copied!' : 'Copy'}</Button>
                                        </CopyToClipboard>
                                    </Item>
                                )
                            }
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

            </Item>
        </JumboListItem>
    );
};
/* Todo record, view prop define */
export default StudentGroupItem;