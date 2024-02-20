import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemAvatar,
    Card,
    CardHeader,
    CardContent,
    Checkbox,
    Divider,
    Tooltip,
    Typography,
    Avatar,
    Stack,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import IconButton from "@mui/material/IconButton";
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import styled from "@emotion/styled";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import {recordService} from "../../../../../services/record-services";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import JumboChipsGroup from "@jumbo/components/JumboChipsGroup";
import {useJumboDialog} from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import useListViewPage from "../../hooks/useListViewPage";
import {useMutation} from "react-query";
import RecordDetail from "../RecordDetail";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import StudentForm from '../../../../../../../../plugins/core/Students/clients/studentForm';
const Item = styled(Span)(({theme}) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

const ReportItem = ({record, view}) => {
    
    const {showDialog, hideDialog} = useJumboDialog();
    const {setRecordsListRefresh} = useListViewPage();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const recordType="Student";
    const deletePrms ={record,recordType};
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
        showDialog({
            content: <RecordDetail record={record} onClose={hideDialog}/>
        })
    }, [showDialog, record]);


    const handleItemAction = (menuItem) => {
        switch (menuItem.action) {
            case 'edit':
                showDialog({
                    title: 'Update Account',
                    content: <StudentForm record={record} onSave={hideDialogAndRefreshRecordsList}/>
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

    if (view === "grid") {
        return (
            <JumboGridItem xs={12} sm={6} md={6}lg={4}>
                <Card variant="outlined" elevation={0}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{width: 48, height: 48}} alt={record.name} src={record.profile_pic}/>
                         }
                        action={
                            <React.Fragment>
                                {
                        favorite ?
                            (
                                <Tooltip title={"Starred"}>
                                    <StarIcon
                                        fontSize={"small"}
                                        sx={{color: 'warning.main', verticalAlign: 'middle', mr: 1}}
                                        onClick={() => setFavorite(!favorite)}
                                    />
                                </Tooltip>
                                ) : (
                                    <Tooltip title={"Not starred"}>
                                        <StarBorderIcon
                                            fontSize={"small"}
                                            sx={{color: 'text.secondary', verticalAlign: 'middle', mr: 1}}

                                            onClick={() => setFavorite(!favorite)}
                                        />
                                    </Tooltip>
                                )
                                 }
                                <IconButton>
                                <JumboDdMenu
                        icon={<MoreHorizIcon/>}
                        menuItems={[
                            {icon: <EditIcon/>, title: "Edit", action: "edit"},
                            {icon: <DeleteIcon/>, title: "Delete", action: "delete"}
                        ]}
                        onClickCallback={handleItemAction}
                    />
                                </IconButton>
                            </React.Fragment>
                        }
                        title={
                            <Typography
                                variant={"h6"}
                                color={"text.primary"}
                                mb={.25}
                                sx={{fontWeight:"bold"}}
                            >
                                {record.name}
                            </Typography>}
                        subheader={
                            <Typography
                                variant={"body1"}
                                color={"text.secondary"}
                            >
                                {record.designation}
                            </Typography>}
                    />
                    <CardContent sx={{pt: 0}}>
                        <Divider sx={{mb: 2}}/>
                        <List disablePadding>
                          
                            <ListItem sx={{px: 1.5}}>
                                <ListItemIcon sx={{minWidth: 40}}>
                                    <AlternateEmailIcon sx={{color:"#50c2c9"}}/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={record.email}
                                />
                            </ListItem>
                            <ListItem sx={{px: 1.5}}>
                                <ListItemIcon sx={{minWidth: 40}}>
                                    <PhoneIcon sx={{color:"#50c2c9"}}/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={record.phoneNumber}
                                />
                            </ListItem>
                        </List>
                        <Divider sx={{my: 2}}/>
                        <Div
                            sx={{
                                display: 'flex',
                                minWidth: 0,
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Checkbox sx={{my: -.5}}/>
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
                        icon={<MoreHorizIcon/>}
                        menuItems={[
                            {icon: <EditIcon/>, title: "Edit", action: "edit"},
                            {icon: <DeleteIcon/>, title: "Delete", action: "delete"}
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
                <ListItemIcon sx={{minWidth: 40}}>
                    {
                        favorite ?
                            (
                                <Tooltip title={"Starred"}>
                                    <StarIcon
                                        fontSize={"small"}
                                        sx={{color: 'warning.main'}}
                                        onClick={() => setFavorite(!favorite)}
                                    />
                                </Tooltip>
                            ) : (
                                <Tooltip title={"Not starred"}>
                                    <StarBorderIcon
                                        fontSize={"small"}
                                        sx={{color: 'text.secondary'}}
                                        onClick={() => setFavorite(!favorite)}
                                    />
                                </Tooltip>
                            )
                    }
                </ListItemIcon>
                <ListItemAvatar onClick={showRecordDetail}>
                    <Avatar alt={record.name} src={record.profile_pic}/>
                </ListItemAvatar>
                <ListItemText
                    onClick={showRecordDetail}
                    primary={
                        <Typography variant={"body1"} component={"div"}>
                            <Stack direction={"row"} alignItems={"center"} sx={{minWidth: 0}}>
                                <Item
                                    sx={{
                                        flexBasis: {xs: '100%', sm: '50%', md: '25%'}
                                    }}
                                >
                                    <Typography variant={"h5"} fontSize={14} lineHeight={1.25} mb={0}
                                                noWrap>{record.name}</Typography>
                                    <Typography
                                        variant={"body1"}
                                        noWrap
                                        color={'text.secondary'}
                                        sx={{
                                            display: {sm: 'none'}
                                        }}
                                    >
                                        {record.email}
                                    </Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: {sm: '50%', md: '28%'},
                                        display: {xs: 'none', sm: 'block'}
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{record.email}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: {md: '25%'},
                                        display: {xs: 'none', md: 'block'}
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{record.phoneNumber}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: {md: '22%'},
                                        display: {xs: 'none', md: 'block'}
                                    }}
                                >
                                    <JumboChipsGroup
                                        chips={record.groups}
                                        mapKeys={{label: "name"}}
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
export default ReportItem;