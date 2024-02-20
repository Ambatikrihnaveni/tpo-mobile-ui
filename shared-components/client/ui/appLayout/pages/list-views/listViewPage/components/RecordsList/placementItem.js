import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Card,
    CardHeader,
    CardContent,
    Checkbox,
    Divider,
    Tooltip,
    Typography,
    Select,
    MenuItem,
    Grid
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
import JumboChipsGroup from "@jumbo/components/JumboChipsGroup";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import TutorDetails from '../RecordDetail/TutorDetails';


const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

const PlacementItem = ({ record, view }) => {
    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const recordType = "Placements";
    const deleteTutor = { record, recordType }
    
    const handleChange = (event) => {
        const status = event.target.value;
        data = { status: status, id: record.id, userId: record.userId, recordType }
        updataStatusMutation.mutate(data)
    };


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


    const showtutorDetail = React.useCallback(() => {
        showDialog({
            content: <TutorDetails record={record} onClose={hideDialog} />,
            sx:{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "1200px",  // Set your width here
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
                    //content: <RecordForm record={record} onSave={hideDialogAndRefreshRecordsList} />
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
    
    const string =record?.jobTitle
    const truncateString = (str = '', maxLength = 10) => str.length > maxLength ? `${str.substring(0, maxLength)}…`: str;
    const truncateName = truncateString(string, 7);
   
    const emLength = record?.email
    const lengthOfEmail =(str = '', maxLength = 50)=> str.length >  maxLength ? `${str.substring(0,maxLength)}…`:str;
    const emailLength = lengthOfEmail(emLength,21);
  

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
                        <Grid container spacing={1} sx={{ mt: -2, mb: 1 }}>
                            
                            <Grid item xs={6}>
                                <Div sx={{ textAlign: "right" }}>
                                    <Select
                                        value={record.status}
                                        size="small"
                                        sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 }, color: "white", borderRadius: "20px", width: "auto", height: "30px", fontSize: 12, textAlign: "center", backgroundColor: record.status === 'Approved' ? '#28a745' : record.status === 'Pending' ? '#f29339' : '#e73145', paddingLeft: '3px' }}
                                        inputProps={{ IconComponent: () => null }}
                                        onChange={handleChange}

                                    >
                                        <MenuItem value="Approved">Approved</MenuItem>
                                        <MenuItem value="Reject">Reject</MenuItem>
                                        <MenuItem value="Pending">Pending</MenuItem>

                                    </Select>
                                </Div>
                            </Grid>
                        </Grid>

                        <Divider sx={{ mb: 2 }} />
                        <List disablePadding>

                            <ListItem sx={{ px: 1.5 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <AlternateEmailIcon sx={{color:"#50c2c9"}} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant={"body1"}>{emailLength}</Typography>}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 1.5 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <PhoneIcon sx={{color:"#50c2c9"}} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={record.phoneNumber}
                                />
                            </ListItem >
                            <ListItem sx={{ px: 1.5 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CalendarMonthIcon sx={{color:"#50c2c9",marginTop:"-49px"}} />
                                </ListItemIcon>
                                <ListItemText
                                sx={{
                                    minHeight:"100px",
                                    
                                }}
                                    primary={
                                        <Grid container sx={{minHeight:43}}>
                                        {record?.availableDays?.length == 0 ? null : (
                                        record?.availableDays?.map(day => (
                                            <Grid  sx={{ml:1}}>{day}</Grid>
                                        ))
                                    )}
                                    </Grid>
                                    }


                                />
                            </ListItem>
                        </List>
                        <Divider sx={{ my: 2 }} />
                        <Div
                            sx={{
                                display: 'flex',
                                minWidth: 0,
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Checkbox sx={{ my: -.5 }} />
                            {
                                record?.categories?.length == 0 ? null : (
                                    <JumboChipsGroup
                                        chips={record.categories}
                                        mapKeys={{ label: "name" }}
                                        spacing={1}
                                        size={"small"}
                                        max={2}
                                    />
                                )
                            }
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
                {/* <ListItemAvatar onClick={showtutorDetail}>
                    <Avatar alt={record.name} src={record.profile_pic} />
                </ListItemAvatar> */}
                <ListItemText
                    onClick={showtutorDetail}
                    primary={
                        <Typography variant={"body1"} component={"div"}>
                            <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0 }}>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                                    }}
                                >
                                    <Typography variant={"h5"} fontSize={14} lineHeight={1.25} mb={0}
                                        noWrap>{record.jobTitle}</Typography>
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
                                    <JumboChipsGroup
                                        chips={record.categories}
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
                <Item
                    sx={{
                        flexBasis: { md: '22%' },
                        display: { xs: 'none', md: 'block' }
                    }}
                >
                    <Select
                        value={record.status}
                        size="small"
                        sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 }, color: "white", borderRadius: "30px", width: "auto", height: "30px", fontSize: 12, textAlign: "center", backgroundColor: record.status === 'Approved' ? '#28a745' : record.status === 'Pending' ? '#f29339' : '#e73145', paddingLeft: '3px' }}
                        inputProps={{ IconComponent: () => null }}
                        onChange={handleChange}

                    >
                        <MenuItem value="Approved">Approved</MenuItem>
                        <MenuItem value="Reject">Reject</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>

                    </Select>
                </Item>
            </JumboListItem>
        </React.Fragment>
    );
};
/* Todo record, view prop define */
export default PlacementItem;