import React from 'react';
import {
    ListItemText,
    ListItemAvatar,
    Card,
    CardContent,
    Typography,
    Button,
    ButtonGroup,
    Avatar,
    CardActions,
    Stack,
} from "@mui/material";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import { recordService } from '../../../../../services/record-services';
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog"
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import StudentForm from '../../../../../../../../plugins/core/Students/clients/studentForm';
import InviteStudent from './InviteStudent'
import { useNavigate } from "react-router-dom";
import TutorBatchDetails from './tutorbatchdetails';
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import ProgramView from '../../../../../../../../plugins/core/programs/client/components/createModule/programView/programView';
import useAuth from '../../../../../../hooks/useAuth';

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));
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

const { filesBaseUrl } = Meteor.settings.public;
const CollegeAdminItem = ({ record, view }) => {
    ;
    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const [expanded, setExpanded] = React.useState(false);
    const recordType = "Student";
    const deletePrms = { record, recordType };
    const firstLetter = record?.name?.charAt(0).toUpperCase();
    const [isHovered, setIsHovered] = React.useState(false)
    const [previewData, setPreviewData] = React.useState({})
    const { isViewerLoading, viewer, data } = useAuth();
    let thumbnailImage = (record?.userMedia) ? record?.userMedia[0]?.URLs?.thumbnail : '';
    if (thumbnailImage) {
        thumbnailImage = `${filesBaseUrl}${thumbnailImage}`;
    }
    const deleteRecordMutation = useMutation(recordService.delete, {
        onSuccess: () => {
            hideDialogAndRefreshRecordsList();
        }
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
        navigate('/groups/groupList')
    }
    const hideDialogAndRefreshRecordsList = React.useCallback(() => {
        hideDialog();
        setRecordsListRefresh(true);
    }, [hideDialog, setRecordsListRefresh]);
    const handleClickOpen = (data) => {
        setPreviewData(data)
        setOpen(true);
    };
    const showRecordDetail = React.useCallback(() => {
       
        navigate(`/${record?.id}/viewprofile`)


    }, [showDialog, record]);

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
    const handleItemAction = (menuItem) => {
        switch (menuItem.action) {
            case 'connect':
                showDialog({
                    content: <TutorBatchDetails record={record} onSave={hideDialogAndRefreshRecordsList} onClose={hideDialog} />,
                    sx: {
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                maxWidth: "700px",
                                borderRadius: '15px',
                            },
                        },
                    },
                });
                break;
            case 'edit':
                showDialog({
                    title: 'Update Account',
                    content: <StudentForm record={record} onSave={hideDialogAndRefreshRecordsList} />
                });
                break;
            case 'delete':
                showDialog({
                    variant: 'confirm',
                    title: 'Are you sure about deleting this record?',
                    content: "You won't be able to recover this record later",
                    onYes: () => deleteRecordMutation.mutate(deletePrms),
                    onNo: hideDialog
                })
                break;
            case "Invite Student":
                showDialog({
                    content: <InviteStudent onClose={hideDialog} style={{ borderRadius: '15px' }} setRecordsListRefresh={setRecordsListRefresh} />,
                    sx: {
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                width: "700px",
                                maxWidth: "1000px",
                                borderRadius: '15px',
                                marginLeft: '10px'
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
    if (view === "grid") {
        return (
            <JumboGridItem xs={12} sm={6} md={4} lg={3} >

                <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>
                    <div style={{ marginTop: '30px', marginLeft: '160px' }}>
                        <Avatar src={''} alt={record?.name} />
                    </div>
                    <CardContent sx={{
                        pt: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                        minHeight: '270px'
                    }}>


                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>College Name :</Typography>
                            <Typography variant={"h5"} sx={{ textTransform: 'capitalize', ml: 1 }}>{record.institute}</Typography>
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Registered Date :</Typography>
                            <Typography sx={{ ml: 1 }}>{record?.date?.slice(0, 10)} </Typography>
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Location :</Typography>
                            <Typography sx={{ ml: 1 }}> {record?.city} </Typography>
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Contact :</Typography>
                            <Typography sx={{ ml: 1 }}>   {record?.contact}</Typography>
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}> Students :</Typography>
                            <Typography sx={{ ml: 1 }}>  {record?.students}</Typography>
                        </div>


                    </CardContent>
                    <CardActions sx={{ p: 0, mx: '-1px' }}>
                        <ButtonGroup size="large" fullWidth variant="outlined">
                            <ActionButton onClick={showRecordDetail}>View</ActionButton>
                        </ButtonGroup>
                    </CardActions>
                </Card>
            </JumboGridItem>
        )
    }
    return (
        <JumboListItem
            componentElement={"div"}
            itemData={record}

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
                                    onClick={showRecordDetail}
                                >
                                    <Avatar src={''} alt={record?.name} />
                                </ListItemAvatar>
                                <div >
                                    <Typography variant={"h5"} sx={{
                                        textTransform: 'capitalize', '&:hover': {
                                            textDecoration: 'underline',
                                            color: '#50C2C9',
                                            cursor: 'pointer',
                                        },
                                    }} onClick={showRecordDetail}>{record.institute}</Typography>

                                </div>
                            </Item>
                            <Item
                                sx={{
                                    marginLeft: '-5%',
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                    textTransform: 'capitalize'
                                }}
                            >
                                <Typography variant={"h5"} color={"text.primary"}>
                                    {/*  <CalendarTodayOutlinedIcon
                                        size="small"
                                        sx={{ verticalAlign: 'middle', fontSize: '0.7rem', mt: -.25 }} /> */} {record?.date?.slice(0, 10)}
                                </Typography>
                            </Item>
                            <Item
                                sx={{
                                    marginLeft: '-5%',
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                    textTransform: 'capitalize'
                                }}
                            >
                                <Typography variant={"h5"} color={"text.primary"}>
                                    {record?.city}
                                </Typography>
                            </Item>
                            <Item
                                sx={{
                                    marginLeft: '-5%',
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                    textTransform: 'capitalize'
                                }}
                            >
                                <Typography variant={"h5"} color={"text.primary"}>
                                    {record?.contact}
                                </Typography>
                            </Item>
                            <Item
                                sx={{
                                    marginLeft: '-5%',
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                    textTransform: 'capitalize'
                                }}
                            >
                                <Typography variant={"h5"} color={"text.primary"}>
                                    {record?.students}
                                </Typography>
                            </Item>

                        </Stack>
                    </Typography>
                }
            />

        </JumboListItem>
    );
};
export default CollegeAdminItem;