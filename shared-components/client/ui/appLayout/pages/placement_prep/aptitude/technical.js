import React, { useState } from 'react';
import {

    ListItemText,
    ListItemAvatar,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Avatar,
    Button,
    ButtonGroup,
    IconButton,
    Badge,
    CardActions,
    Stack

} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { Meteor } from "meteor/meteor";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import Chip from '@mui/material/Chip';
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import { useNavigate } from 'react-router';
import ProgramView from '../../../../../../plugins/core/programs/client/components/createModule/programView/programView';
import { useMutation } from '@apollo/react-hooks';
import deleteInterviewPrepMutation from '../../../../graphql/services/placement-prep/mutations/deleteInterviewPrep';
import { ToastContainer, toast } from 'react-toastify';
import useListViewPage from '../../list-views/listViewPage/hooks/useListViewPage';


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

const Item1 = ({ children, sx }) => (
    <Div sx={{ textAlign: 'center', flexBasis: '33.33%', p: theme => theme.spacing(1, 2), ...sx }}>
        {children}
    </Div>
);

const { filesBaseUrl } = Meteor.settings.public;
const Technical = ({ record, view, i }) => {
    ;
    const navigate = useNavigate();
    const [previewData, setPreviewData] = useState({})
    const { showDialog, hideDialog } = useJumboDialog();
    const [deleteInterviewPrep] = useMutation(deleteInterviewPrepMutation)
    const { setRecordsListRefresh } = useListViewPage();

    const interviewPrepId = (record?.id) ? record.id : null


    const onEdit = React.useCallback(async (menuItem) => {
        const technicalId = menuItem.data.id;
        navigate(`/placementpreep/technical/${technicalId}/edittechnical`);
    }, [navigate]);

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
                            const technicaIdToDelete = [menuItem.data.id];
                            await deleteInterviewPrep({
                                variables: {
                                    interviewPrepIds: technicaIdToDelete,
                                },
                            });
                            toast.success('Deleted successfully', {
                                position: 'bottom-right',
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: 'colored',
                            });
                            setRecordsListRefresh(true)
                        } catch (error) {
                            toast.error('Unable to delete', {
                                position: 'bottom-right',
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: 'colored',
                            });
                        } finally {
                            hideDialog();
                        }
                    },
                    onNo: hideDialog
                });
                break;
        }
    };
    const handleDetailsClick = () => {
        navigate(`/technical/${interviewPrepId}/quizes`)

    }

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



    if (view === "grid") {

        return (

            <JumboGridItem xs={12} sm={6} md={4} lg={3} >

                <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <JumboDdMenu
                                    icon={<MoreHorizIcon />}
                                    menuItems={[
                                        { icon: <EditIcon />, title: "Edit", action: "edit", data: record },
                                        { icon: <DeleteIcon />, title: "Delete", action: "delete", data: record }
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
                                <Avatar sx={{ width: 72, height: 72, mt: '-30px', justifyContent: 'center', display: "flex" }} alt={record?.title} />
                            </Badge>
                        </Div>
                        <Typography variant={"h5"} mb={.75} style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '-10px', justifyContent: 'center' }}>{record.title}</Typography>

                        <Stack direction={"row"} alignSelf="stretch">
                            <Item1>
                                <Typography variant={"h6"} mb={.5} style={{ color: '#9c0587' }}>{record?.lessons}</Typography>
                                <Typography variant={"body1"} color="#9c0587" fontSize={13}>Lessons</Typography>
                            </Item1>
                            <Item1 sx={{ ml: 5 }}>
                                <Typography variant={"h6"} mb={.5} style={{ color: '#27a603' }}>{record?.quizes}</Typography>
                                <Typography variant={"body1"} color="#27a603" fontSize={13}>Quizes</Typography>
                            </Item1>

                        </Stack>
                    </CardContent>
                    <CardActions sx={{ p: 0, mx: '-1px' }}>
                        <ButtonGroup size="large" fullWidth variant="outlined">
                            <ActionButton onClick={() => { onPreview(record) }}>Learn</ActionButton>
                            <ActionButton onClick={handleDetailsClick}>Practice</ActionButton>

                        </ButtonGroup>

                    </CardActions>
                </Card>
            </JumboGridItem>
        )
    }
    ;
    return (
        <React.Fragment>
            <JumboListItem
                componentElement={"div"}
                itemData={record}
                secondaryAction={
                    <JumboDdMenu
                        icon={<MoreHorizIcon />}
                        menuItems={[
                            { icon: <EditIcon />, title: "Edit", action: "edit", data: record },
                            { icon: <DeleteIcon />, title: "Delete", action: "delete", data: record }
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

                <ListItemAvatar>
                    <Avatar alt={""} />
                </ListItemAvatar>
                <ListItemText

                    primary={
                        <Typography variant={"body1"} component={"div"}>
                            <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0 }}>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '22%' }
                                    }}
                                >
                                    <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0}
                                        noWrap>{record.title}</Typography>

                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '15%' },
                                        display: { xs: 'none', sm: 'block' },
                                        ml: 5
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap> {(record?.lessonsCount) ? record?.lessonsCount : "0"} </Typography>
                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '15%' },
                                        display: { xs: 'none', sm: 'block' },
                                        ml: 5
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap> {(record?.quizesCount) ? record?.quizesCount : "0"} </Typography>
                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '15%' },
                                        display: { xs: 'none', sm: 'block' },
                                        ml: 2
                                    }}
                                >
                                    <Chip label="Start" onClick={() => { onPreview(record) }} style={{ backgroundColor: '#7492a3', color: 'white' }} />
                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '15%' },
                                        display: { xs: 'none', sm: 'block' },
                                        ml: 2
                                    }}
                                >
                                    <Chip label="Start Quiz" onClick={handleDetailsClick} style={{ backgroundColor: '#3a82f0', color: 'white' }} />
                                </Item>

                            </Stack>
                        </Typography>
                    }
                />

                <ToastContainer
                    position="top-right"
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
        </React.Fragment>
    );
};
/* Todo record, view prop define */
export default Technical;
