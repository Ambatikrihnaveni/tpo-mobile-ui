import React from 'react';
import {
    ListItemText,
    ListItemIcon,
    ListItemAvatar,
    ButtonGroup,
    Card,
    Button,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Avatar,
    Stack,
    Select,
    MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import styled from "@emotion/styled";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import { recordService } from "../../../../../services/record-services";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import JumboChipsGroup from "@jumbo/components/JumboChipsGroup";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import RecordForm from "../RecordForm";
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import useCurrentShopId from '../../../../../../hooks/useCurrentShopId';
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Badge from "@mui/material/Badge";
import { useNavigate } from 'react-router-dom';
import useJumboContentLayout from "@jumbo/hooks/useJumboContentLayout";


const { filesBaseUrl } = Meteor.settings.public;

const iconColors = {
    instagram: '#C13584',
    facebook: '#1877F2',
    youtube: 'red',
    github: 'purple',
    pinterest: '#BD081C',
};

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

const Item1 = ({children, sx}) => (
    <Div sx={{textAlign: 'center', flexBasis: '33.33%', p: theme => theme.spacing(1, 2), ...sx}}>
        {children}
    </Div>
);

const TutorItem = ({ record, view,user }) => {
    ;
    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const {shopId} = useCurrentShopId();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const recordType = "Tutor";
    
    const removeTutor = { 
        record, 
        recordType,
        shopId
    };
    const contentLayout = useJumboContentLayout();
const navigate= useNavigate()

    const handleChange = (event) => {
        
        const status = event.target.value;
        data = { status: status, id: record.id, userId: record.userId, recordType, shopId }
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
        navigate(`/${record?.id}/viewprofile`)
        
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
                    onYes: () => deleteRecordMutation.mutate(removeTutor),
                    onNo: hideDialog
                })
        }
    };
    
    const string =record?.name
    const truncateString = (str = '', maxLength = 50) => str.length > maxLength ? `${str.substring(0, maxLength)}…`: str;
    const truncateName = truncateString(string, 7);
   
    const emLength = record?.email
    const lengthOfEmail =(str = '', maxLength = 50)=> str.length >  maxLength ? `${str.substring(0,maxLength)}…`:str;
    const emailLength = lengthOfEmail(emLength,21);

    const firstLetter = string?.charAt(0).toUpperCase();
    
    let thumbnailImage = record?.userMedia ? record?.userMedia[0]?.URLs?.thumbnail : '';
    if(thumbnailImage) {
        thumbnailImage = `${filesBaseUrl}${thumbnailImage}`;
    }
    const ActionButton = styled(Button)(({theme}) => ({
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
                 <Card sx={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)'}}>
            <CardHeader
               
                action={
                    <IconButton aria-label="settings">
                         <JumboDdMenu
                                        icon={<MoreHorizIcon />}
                                        menuItems={[
                                           
                                            { icon: <DeleteIcon />, title: "Delete", action: "delete" }
                                        ]}
                                        onClickCallback={handleItemAction}
                                    />
                    </IconButton>
                }
                sx={{pb: 0}}
            >
            </CardHeader>
            <CardContent sx={{
                pt: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight:'300px'
            }}>
                <Div sx={{mb: 3}}>
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
                <Typography variant={"h5"} mb={.75} style={{fontWeight:'bold',fontSize:'18px'}}>{record.name}</Typography>
                <Typography fontSize={"14px"} variant={"body1"} color="text.secondary" mb={2} style={{color:'#588aed'}}>{record.email}</Typography>
                <Typography variant={"h6"} color="text.secondary" mb={.5} style={{marginTop:'-10px',fontSize:'16px'}}>{record.qualification}</Typography>
                <Stack direction={"row"} color={"text.secondary"} mb={1}>
                    {record?.socialMediaLinks?.map((link)=>(
                        link.socialMediaAccount=="Facebook" ? <a href={link.link} target='_blank' ><IconButton color="inherit" aria-label="Facebook">
                        <FacebookIcon style={{color:'#3366cc'}} fontSize={"small"} ></FacebookIcon>
                    </IconButton> </a> : link.socialMediaAccount=="LinkedIn" ?  <a href={link.link} target='_blank' ><IconButton color="inherit" aria-label="LinkedIn">
                        <LinkedInIcon style={{color:'#4471c9'}}  fontSize={"small"}/>
                    </IconButton> </a>:  link.socialMediaAccount=="twitter" ?  <a  href={link.link} target='_blank'><IconButton color="inherit" aria-label="Twitter">
                        <TwitterIcon style={{color:'#588aed'}} fontSize={"small"}/>
                    </IconButton> </a>: link.socialMediaAccount=="GitHub" ?  <a href={link.link} target='_blank'><IconButton color='inherit' aria-label='GitHub'>
                        <GitHubIcon style={{color:'#8b04b8'}}  fontSize={"small"} />
                    </IconButton> </a>: link.socialMediaAccount == "Youtube" ?  <a href={link.link} target='_blank'><IconButton  color='inherit' aria-label='Youtube'>
                        <YouTubeIcon style={{color:'#ff5029'}}  fontSize={"small"}/> 
                    </IconButton> </a>: link.socialMediaAccount == "Instagram"  ? <a href={link.link} target='_blank'><IconButton color='inherit' aria-label='Instagram'> 
                    <InstagramIcon  style={{ color: iconColors.instagram }}  />
                    </IconButton> </a>:''
                    ))}        
                </Stack>
                <Stack direction={"row"} alignSelf="stretch">
                    <Item1>
                        <Typography variant={"h6"} mb={.5}>{record?.modules ? record?.modules.length:'0'} </Typography>
                        <Typography variant={"body1"} color="text.secondary" fontSize={13}>Modules</Typography>
                    </Item1>
                    <Item1>
                        <Typography variant={"h6"} mb={.5}>{record.experience}</Typography>
                        <Typography variant={"body1"} color="text.secondary" fontSize={13}>Experience</Typography>
                    </Item1>
                    <Item1>
                        <Typography variant={"h6"} mb={.5}>{record.price}</Typography>
                        <Typography variant={"body1"} color="text.secondary" fontSize={13}>Price</Typography>
                    </Item1>
                </Stack>
            </CardContent>
            <CardActions sx={{p: 0, mx: '-1px'}}>
                <ButtonGroup size="large" fullWidth variant="outlined">
                   
                    <ActionButton onClick={showtutorDetail}>View Profile</ActionButton>
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
                secondaryAction={
                    <JumboDdMenu
                        icon={<MoreHorizIcon />}
                        menuItems={[
                           // { icon: <EditIcon />, title: "Edit", action: "edit" },
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
              
                </ListItemIcon>
                <ListItemAvatar onClick={showtutorDetail}>
                    { (thumbnailImage) ? <Avatar src={thumbnailImage} /> : <Avatar>{firstLetter}</Avatar>}
                </ListItemAvatar>
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
                                    <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0}
                                        noWrap> {record.name && record.name.charAt(0).toUpperCase() + record.name.slice(1)}                                        </Typography>
                                    <Typography
                                        variant={"body1"}
                                        noWrap
                                        color={'text.secondary'}
                                        sx={{
                                            display: { sm: 'none' }
                                        }}
                                    >
                                        {record.email}
                                    </Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{record.email}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { md: '24%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{record.phoneNumber}</Typography>
                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { md: '22%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <JumboChipsGroup
                                       style={{minWidth:'100px',padding:"12px 0px"}}
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
                        flexBasis: { md: '20%' },
                        display: { xs: 'none', md: 'block' }
                    }}
                >
                    <Select
                        value={record.status}
                        size="small"
                        sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 }, color: "white", borderRadius: "30px", width: "auto", height: "30px", fontSize: 12, textAlign: "center", backgroundColor: record.status === 'Approved' ? '#28a745' : record.status === 'Pending' ? '#f29339' : '#e73145', paddingLeft: '3px',minWidth:'100px' }}
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
export default TutorItem;