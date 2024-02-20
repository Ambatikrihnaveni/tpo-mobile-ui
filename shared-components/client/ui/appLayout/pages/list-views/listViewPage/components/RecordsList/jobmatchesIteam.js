import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Tooltip,
    Typography,
    Stack,
    Button
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import IconButton from "@mui/material/IconButton";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import styled from "@emotion/styled";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import { recordService } from "../../../../../services/record-services";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import RecordForm from "../RecordForm";
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import JobmatchesDetail from '../RecordDetail/jobmatchesDetail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SportsScoreIcon from '@mui/icons-material/SportsScore';


const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

const JobmatchesItem = ({ record, view }) => {
    ;
    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const recordType = "Placements";
    const deleteTutor = { record, recordType }
    const buttonText = record?.postStatus;

    const deleteRecordMutation = useMutation(recordService.delete, {
        onSuccess: () => {

            hideDialogAndRefreshRecordsList();
        }
    });

    const updataStatusMutation = useMutation(recordService.updateTutorStatus, {
        onSuccess: () => {
            refreshRecordsList();
        }
    });

    const refreshRecordsList = React.useCallback(() => {
        setRecordsListRefresh(true);
    }, [setRecordsListRefresh]);

    const hideDialogAndRefreshRecordsList = React.useCallback(() => {
        hideDialog();
        setRecordsListRefresh(true);
    }, [hideDialog, setRecordsListRefresh]);

    ;
    const showtutorDetail = React.useCallback(() => {
        showDialog({
            content: <JobmatchesDetail record={record} onClose={hideDialog} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "1200px",  // Set your width here
                        borderRadius: '15px'
                    },
                },
            }

        })
    }, [showDialog, record]);

    const handleItemAction = (menuItem) => {

        switch (menuItem.action) {
            case 'edit':
                showDialog({
                    title: 'Update Tutor',
                    content: <RecordForm record={record} onSave={hideDialogAndRefreshRecordsList} />
                });
                break;
            case 'delete':
                showDialog({
                    variant: 'confirm',
                    title: 'Are you sure about deleting this record?',
                    content: "You won't be able to recover this record later",
                    onYes: () => deleteRecordMutation.mutate(deleteTutor),
                    onNo: hideDialog
                })
        }
    };

    const string = record.jobTitle
    const truncateString = (str = '', maxLength = 20) => str.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const truncateName = truncateString(string, 7);

    const emLength = record?.email
    const lengthOfEmail = (str = '', maxLength = 20) => str.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const emailLength = lengthOfEmail(emLength, 21);


    if (view === "grid") {
        return (
            <JumboGridItem xs={12} sm={6} md={6} lg={4}>
                <Card variant="outlined" elevation={0}>
                    <CardHeader
                        
                        action={
                            <React.Fragment>
                                {
                                    favorite ?
                                        (
                                            <Tooltip title={"Starred"}>
                                                <StarIcon
                                                    fontSize={"small"}
                                                    sx={{ color: 'warning.main', verticalAlign: 'middle', mr: 1 }}
                                                    onClick={() => setFavorite(!favorite)}
                                                />
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title={"Not starred"}>
                                                <StarBorderIcon
                                                    fontSize={"small"}
                                                    sx={{ color: 'text.secondary', verticalAlign: 'middle', mr: 1 }}

                                                    onClick={() => setFavorite(!favorite)}
                                                />
                                            </Tooltip>
                                        )
                                }
                                <IconButton>
                                    <JumboDdMenu
                                        icon={<MoreHorizIcon />}
                                        menuItems={[
                                            { icon: <EditIcon />, title: "Edit", action: "edit" },
                                            { icon: <DeleteIcon />, title: "Delete", action: "delete" }
                                        ]}
                                        onClickCallback={handleItemAction}
                                    />
                                </IconButton>
                            </React.Fragment>
                        }
                        title={
                            <Typography
                                color={"text.primary"}
                                mb={.25}
                                sx={{ fontWeight: "bold" }}
                            >
                                {truncateName}
                            </Typography>}
                        subheader={
                            <Typography
                                variant={"body1"}
                                color={"text.secondary"}
                            >
                                {record.designation}
                            </Typography>}
                    />
                    <CardContent sx={{ pt: 0 }}>

                        <Divider sx={{ mb: 2 }} />
                        <List disablePadding>

                            <ListItem sx={{ px: 1.5 }}>
                                <LocationOnIcon sx={{ minWidth: 50, color: "#50c2c9" }}>
                                    <AlternateEmailIcon />
                                </LocationOnIcon>
                                <ListItemText
                                    primary={<Typography variant={"body1"}>{record.location}</Typography>}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 1.5 }}>
                                <IntegrationInstructionsIcon sx={{ minWidth: 50, color: "#50c2c9" }}>
                                    <PhoneIcon />
                                </IntegrationInstructionsIcon>
                                <ListItemText
                                    primary={record.platform}
                                />
                            </ListItem >
                            <ListItem sx={{ px: 1.5 }}>
                                <SportsScoreIcon sx={{ minWidth: 50, color: "#50c2c9", marginTop: "-70px" }}>
                                    <CalendarMonthIcon />
                                </SportsScoreIcon>
                                <ListItemText
                                    sx={{
                                        minHeight: "100px",

                                    }}
                                    primary={record.score}
                                />
                            </ListItem>
                            <ListItem style={{ marginTop: "-80px" }}>
                                <CalendarMonthIcon sx={{ minWidth: 50, color: "#50c2c9", marginTop: "-70px" }}>
                                    <CalendarMonthIcon />
                                </CalendarMonthIcon>
                                <ListItemText
                                    sx={{
                                        minHeight: "100px",

                                    }}
                                    primary={record.matchedAt}
                                />
                            </ListItem>
                        </List>
                        <Divider />
                        <Div
                            sx={{
                                display: 'flex',
                                minWidth: 0,
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Item
                                sx={{
                                    flexBasis: { md: '22%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <Button variant="contained" color={buttonText == "Placed" ? "success" : buttonText == "Apply" ? "warning" : buttonText == "Applied" ? "primary" : 'error'} onClick={showtutorDetail} style={{ textTransform: 'none', borderRadius: '15px', minWidth: '100px',marginTop:"15px"}}>{buttonText}</Button>
                            </Item>
                        </Div>
                    </CardContent>
                </Card>
            </JumboGridItem>
        )
    }
    return (
        <React.Fragment>
            <JumboListItem
                componentElement={"div"}
                itemData={record}
                secondaryAction={
                    <JumboDdMenu
                        icon={<MoreHorizIcon />}
                        menuItems={[
                            { icon: <EditIcon />, title: "Edit", action: "edit" },
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
                <ListItemIcon sx={{ minWidth: 40 }}>
                    {
                        favorite ?
                            (
                                <Tooltip title={"Starred"}>
                                    <StarIcon
                                        fontSize={"small"}
                                        sx={{ color: 'warning.main' }}
                                        onClick={() => setFavorite(!favorite)}
                                    />
                                </Tooltip>
                            ) : (
                                <Tooltip title={"Not starred"}>
                                    <StarBorderIcon
                                        fontSize={"small"}
                                        sx={{ color: 'text.secondary' }}
                                        onClick={() => setFavorite(!favorite)}
                                    />
                                </Tooltip>
                            )
                    }
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant={"body1"} component={"div"}>
                            <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0 }}>
                            <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{record.CandidateName}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                                    }}
                                >
                                    <Typography variant={"h5"} fontSize={14} lineHeight={1.25} mb={0} onClick={showtutorDetail}
                                        noWrap style={{ color: "#5ea4cc" }}>{record.jobTitle}</Typography>
                                    <Typography
                                        variant={"body1"}
                                        noWrap
                                        color={'text.secondary'}
                                        sx={{
                                            display: { sm: 'none' }
                                        }}
                                    >
                                        {record.company}
                                    </Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{record.location}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{record.platform}</Typography>
                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { md: '22%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{record.score}</Typography>

                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { md: '22%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{record.matchedAt}</Typography>

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
                    <Button variant="contained" color={buttonText == "Placed" ? "success" : buttonText == "Apply" ? "warning" : buttonText == "Applied" ? "primary" : 'error'} onClick={showtutorDetail} style={{ textTransform: 'none', borderRadius: '15px', minWidth: '100px', marginLeft: "60px" }}>{buttonText}</Button>
                </Item>

            </JumboListItem>
        </React.Fragment>
    );
};
export default JobmatchesItem;
