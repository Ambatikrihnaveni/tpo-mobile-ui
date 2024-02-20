import React from 'react';
import {
    ListItemText,
    ListItemAvatar,
    Card,
    CardHeader,
    ButtonGroup,
    Button,
    CardActions,
    CardContent,
    Typography,
    Avatar,
    Stack,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import styled from "@emotion/styled";
import { useNavigate } from 'react-router-dom'
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import { recordService } from "../../../../../services/record-services";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import JumboChipsGroup from "@jumbo/components/JumboChipsGroup";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import StudentForm from '../../../../../../../../plugins/core/Students/clients/studentForm';
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Badge from "@mui/material/Badge";
import useAuth from '../../../../../../hooks/useAuth';

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));
const Item1 = ({ children, sx }) => (
    <Div sx={{ textAlign: 'center', flexBasis: '33.33%', p: theme => theme.spacing(1, 2), ...sx }}>
        {children}
    </Div>
);
const { filesBaseUrl } = Meteor.settings.public;
const StudentItem = ({ record, view, user }) => {
    
    const navigate = useNavigate()
    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const recordType = "Student";
    const deletePrms = { record, recordType };
    const { viewer } = useAuth()
    const firstLetter = record?.name?.charAt(0).toUpperCase();
    let thumbnailImage = (record?.userMedia) ? record?.userMedia[0]?.URLs?.thumbnail : '';
    if (thumbnailImage) {
        thumbnailImage = `${filesBaseUrl}${thumbnailImage}`;
    }
    const deleteRecordMutation = useMutation(recordService.delete, {
        onSuccess: () => {
            hideDialogAndRefreshRecordsList();
        }
    });

    const hideDialogAndRefreshRecordsList = React.useCallback(() => {
        hideDialog();
        setRecordsListRefresh(true);
    }, [hideDialog, setRecordsListRefresh]);


    const showRecordDetail = React.useCallback(() => {
        navigate(`/${record?.id}/viewprofile`)
        
    }, [showDialog, record]);


    const handleItemAction = (menuItem) => {
        ;
        switch (menuItem.action) {
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

    if (view === "grid") {
        return (
            <JumboGridItem xs={12} sm={6} md={6} lg={4}>
                <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>
                    <CardHeader
                       
                        /* action={
                            <IconButton aria-label="settings">
                                <JumboDdMenu
                                    icon={<MoreHorizIcon />}
                                    menuItems={[
                                        { icon: <EditIcon />, title: "Edit", action: "edit" },
                                        { icon: <DeleteIcon />, title: "Delete", action: "delete" }
                                    ]}
                                    onClickCallback={handleItemAction}
                                />
                            </IconButton>
                        } */
                        sx={{ pb: 0 }}
                    >
                    </CardHeader>
                    <CardContent sx={{
                        pt: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: '250px',
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
                                        bgcolor: user ? "success.main" : "#757575"
                                    }
                                }}
                            >
                                <Avatar sx={{ width: 72, height: 72 }} alt={record.name} src={thumbnailImage} />
                            </Badge>
                        </Div>
                        <Typography variant={"h5"} mb={.75} style={{ fontWeight: 'bold' }}>{record.name}</Typography>
                        <Typography fontSize={"12px"} variant={"body1"} color="text.secondary" mb={2}>{record.email}</Typography>
                        <Typography variant={"h6"} color="text.secondary" mb={.5} style={{ marginTop: '-10px' }}>{record.qualification}</Typography>

                        <Stack direction={"row"} color={"text.secondary"} mb={1}>
                            {record?.socialMediaLinks?.map((link) => (
                                link.socialMediaAccount == "Facebook" ? <a href={link.link} target='_blank' ><IconButton color="inherit" aria-label="Facebook">
                                    <FacebookIcon style={{ color: '#3366cc' }} fontSize={"small"} ></FacebookIcon>
                                </IconButton> </a> : link.socialMediaAccount == "LinkedIn" ? <a href={link.link} target='_blank' ><IconButton color="inherit" aria-label="LinkedIn">
                                    <LinkedInIcon style={{ color: '#4471c9' }} fontSize={"small"} />
                                </IconButton> </a> : link.socialMediaAccount == "twitter" ? <a href={link.link} target='_blank'><IconButton color="inherit" aria-label="Twitter">
                                    <TwitterIcon style={{ color: '#588aed' }} fontSize={"small"} />
                                </IconButton> </a> : link.socialMediaAccount == "GitHub" ? <a href={link.link} target='_blank'><IconButton color='inherit' aria-label='GitHub'>
                                    <GitHubIcon style={{ color: '#8b04b8' }} fontSize={"small"} />
                                </IconButton> </a> : link.socialMediaAccount == "Youtube" ? <a href={link.link} target='_blank'><IconButton color='inherit' aria-label='Youtube'>
                                    <YouTubeIcon style={{ color: '#ff5029' }} fontSize={"small"} />
                                </IconButton> </a> : link.socialMediaAccount == "Instagram" ? <a href={link.link} target='_blank'><IconButton color='inherit' aria-label='Instagram'>
                                    <InstagramIcon style={{ color: '#ff5733' }} fontSize={"small"} />
                                </IconButton> </a> : ''
                            ))}

                        </Stack>
                        <Stack direction={"row"}>
                            <Item1>
                                <Typography variant={"body1"} color="text.secondary" fontSize={14}>Programs:<b style={{ color: '#9c0587' }}>{(record?.programs?.length > 0) ? record?.programs?.length : 0}</b></Typography>
                            </Item1>
                        </Stack>
                    </CardContent>
                    <CardActions sx={{ p: 0, mx: '-1px' }}>
                        <ButtonGroup size="large" fullWidth variant="outlined">
                            {/* <ActionButton>Follow</ActionButton> */}
                            <ActionButton onClick={showRecordDetail}>View Profile</ActionButton>
                        </ButtonGroup>
                    </CardActions>
                </Card>
            </JumboGridItem>
        )
    }
    return (
        <React.Fragment>
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
        
                <ListItemAvatar onClick={showRecordDetail}>
                    {(thumbnailImage) ? <Avatar src={thumbnailImage} /> : <Avatar>{firstLetter}</Avatar>}
                </ListItemAvatar>
                <ListItemText
                    onClick={showRecordDetail}
                    primary={
                        <Typography variant={"body1"} component={"div"}>
                            <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0 }}>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                                    }}
                                >
                                    <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0}
                                        noWrap>{record.name && record.name.charAt(0).toUpperCase() + record.name.slice(1)} </Typography>
                                    
                                </Item>
                                <Item
                                    sx={{
                                        marginLeft: "80px",
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{record.email}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        marginLeft: '80px',
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                   
                                        <Typography style={{ marginLeft: viewer.role =="Tutor"? '60px':'30px' }} variant={"body1"}>{(viewer?.role === "Tutor") ? (record?.programs?.length) : (record?.phoneNumber)}</Typography>
                                 
                                </Item>

                                <Item
                                    sx={{
                                        marginLeft: "80px",
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },
                                    }}
                                >
                                    {record?.colleges?.map((college, index) => (
                                        <Typography variant={"body1"} noWrap key={index}>{college?.name}</Typography>
                                    ))}

                                </Item>


                                <Item
                                    sx={{
                                        flexBasis: { md: '22%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <JumboChipsGroup
                                        chips={record.groups}
                                        mapKeys={{ label: "name" }}
                                        spacing={1}
                                        size={"small"}
                                        max={1}
                                    />
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
export default StudentItem;