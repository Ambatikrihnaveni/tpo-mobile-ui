import React,{useState} from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Tooltip,
    Typography,
    Avatar,
    Badge,
    Grid,
    Button,
    LinearProgress
} from "@mui/material";
import AvatarGroup from '@mui/material/AvatarGroup';
import DeleteIcon from "@mui/icons-material/Delete";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from "@jumbo/shared/Div";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import RecordDetail from "../RecordDetail";
import AccordionSummary from "@mui/material/AccordionSummary";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Accordion, AccordionDetails } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Chip from "@mui/material/Chip";
import { getAssetPath, ASSET_AVATARS } from '../../../../../utils/appHelpers';
import MyProgramService from '../../../../../../graphql/services/programs/myProgram-services';
import useAuth from '../../../../../../hooks/useAuth';
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId.js";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import SettingsIcon from '@mui/icons-material/Settings';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { ToastContainer, toast } from 'react-toastify';
const team = [
    {
        name: "Julia Robert",
        profilePic: getAssetPath(`${ASSET_AVATARS}/avatar5.jpg`, "40x40"),
        status: {
            label: "Not Started"
        },
    },
    {
        name: "Joe Lee",
        profilePic: getAssetPath(`${ASSET_AVATARS}/avatar7.jpg`, "40x40"),
        label: "Complete"
    },
    {
        name: "Chang Lee",
        profilePic: getAssetPath(`${ASSET_AVATARS}/avatar5.jpg`, "40x40"),
        label: "Pending"
    },
    {
        name: "Mickey Arthur",
        profilePic: getAssetPath(`${ASSET_AVATARS}/avatar6.jpg`, "40x40"),

    }
    ,
    {
        name: "Mickey Arthur",
        profilePic: getAssetPath(`${ASSET_AVATARS}/avatar6.jpg`, "40x40"),
    },
    {
        name: "Mickey Arthur",
        profilePic: getAssetPath(`${ASSET_AVATARS}/avatar6.jpg`, "40x40"),
    }
]
const { filesBaseUrl } = Meteor.settings.public;

const ProjectItem = ({ record, view }) => {

    const [progress, setProgress] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const {shopId} = useCurrentShopId();
    const { isViewerLoading, viewer, data } = useAuth();
    const { showDialog, hideDialog } = useJumboDialog();
    const [isHovered, setIsHovered] = useState(false)
    const { setRecordsListRefresh } = useListViewPage();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const navigate = useNavigate();
    const recordType = "Module";
    let thumbnailImage = (record?.userMedia) ? record?.userMedia[0]?.URLs?.thumbnail : '';
    if (thumbnailImage) {
        thumbnailImage = `${filesBaseUrl}${thumbnailImage}`;
    }
    let userShopId=""
    if(viewer?.role=="Master-Admin" ||viewer?.role=="Admin" ){
        userShopId=shopId
    }else{
        userShopId=viewer?.shopId
    }
    const deletePrms = { record, recordType,shopId };

    const handleClick = () => {
        if (Projectdata.find((product) => product.id === record.id))
            setExpanded(!expanded);
    }

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 50);
            });
        },);

        return () => {
            clearInterval(timer);
        };
    }, []);
    const handleItemAction = (menuItem) => {
        switch (menuItem.action) {
            case 'connect':
                //onEdit(menuItem)
                showDialog({
                    //content: <CreateProgramBatchForm record={record} onSave={hideDialogAndRefreshRecordsList} onClose={hideDialog}/>,
                    content: <ProgramBatchDetails record={record} onSave={hideDialogAndRefreshRecordsList} onClose={hideDialog} tutors={record?.tutors} />,

                    sx: {
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                maxWidth: "700px",
                                borderRadius: '15px',
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
                    onYes: async () => {
                        try {
                            await deleteRecordMutation.mutateAsync(record?.id);
                            hideDialog();
                            toast.success('Group deleted successfully');
                        } catch (error) {
                            hideDialog();
                            toast.error(error?.graphQLErrors?.length>0 ? error?.graphQLErrors[0].message:error?.message);
                        }
                    },
                    onNo: hideDialog
                })
        }
    };

    




    const deleteRecordMutation = useMutation(MyProgramService.remove, {
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
            content: <RecordDetail record={record} onClose={hideDialog} />
        })
    }, [showDialog, record]); 

    const onEdit = React.useCallback(async (menuItem) => {
        const programId = menuItem?.data._id;
        navigate(`/programs/${programId}/editprogram`);
    }, [navigate]);

    const onRowClick = React.useCallback(async (record) => {
        const programId = record?._id;
        navigate(`/programs/${programId}/editprogram`);
    }, [navigate]);

    const handlerecordAction = (menurecord) => {

        switch (menurecord.action) {
            case 'edit':
                onEdit(menurecord)
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
    const handleConnectWithoutContact = () => {
        showDialog({
            content: <ProgramBatchDetails record={record} onSave={hideDialogAndRefreshRecordsList} onClose={hideDialog} tutors={record?.tutors} />,
              sx: {
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                maxWidth: "700px",
                                borderRadius: '15px',
                                // Set your width here
                            },
                        },
                    },
            
        });
    };
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const string = record?.name
    const truncateString = (str = '', maxLength = 50) => str.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const truncateName = truncateString(string, 15);
    let completedLessons=[];
         
        for(let x=0; x< record?.lessonsDuration?.length;x++){
            if(record?.lessonsDuration[x]?.lessonStatus === "Complete"){
                completedLessons.push(record?.lessonsDuration[x])
    
            }
        
        }
    
    const totalLessons = record?.lessonsDuration?.length || 0;
    const completedLessonsCount = completedLessons.length || 0;
    const progressPercentage = (completedLessonsCount / totalLessons) * 100;


    if (view === "grid") {
        return (
            <JumboGridItem xs={12} sm={6} md={4} >
            <Card  sx={{ m: 2, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',minWidth:'300px'}} key={record._id}>
                <CardHeader
                    avatar={
                        <Chip color="success" size={"small"} label="In Progress" />

                    }
                    action={
                        <JumboDdMenu
                            icon={<SettingsIcon />}
                            menuItems={[

                                { icon: <ConnectWithoutContactIcon />, title: "Connect ", action: 'connect', data: record },
                                { icon: <DeleteIcon />, title: "Delete", action: "delete", data: record }
                            ]}
                            onClickCallback={handleItemAction}
                        />
                    }

                >
                </CardHeader>
                <CardContent sx={{
                    pt: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignrecords: 'center',
                    textAlign:'center'
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
                                  
                               }
                           }}
                    >
                            <Avatar sx={{ width: 72, height: 72 }} src={record?.img} />
                       
                            </Badge>
                </Div>
                <Div >
                        <Tooltip title={record?.name}
                            onClick={() => { onPreview(record) }}

                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                textDecoration: isHovered ? "underline" : "none",
                                color: isHovered ? "#04bfa0" : "inherit",
                                cursor: "pointer" // Optional: Change cursor to indicate interaction
                            }}
                        >
                            <Typography variant={"h6"} mb={2} sx={{ mb: 2,textTransform:'capitalize' }}><b>{record?.name}</b></Typography>
                        </Tooltip>
                        </Div>
                        <Div sx={{ mb: 2 ,textAlign:"center",marginRight:'45%'}}>

                            <AvatarGroup max={3}  >
                                {record?.tutors?.map((tutor) => (
                                    <Tooltip title={tutor.name}>
                                        <Avatar alt={tutor.name} src={`${filesBaseUrl}${tutor.userMedia[0]?.URLs?.thumbnail}`} />
                                    </Tooltip>
                                ))}


                            </AvatarGroup>

                        </Div>
                        <Div sx={{
                            display: 'flex',
                            minWidth: 0,
                            flexDirection: 'column',
                            alignrecords: 'center',
                            alignSelf: 'stretch',
                            p:2,
                            maxWidth: '100%',
                        }}
                        >
                            <LinearProgress
                                variant={"determinate"}
                                color="success"
                                value={progressPercentage} 
                                    sx={{
                                    borderRadius: 4,
                                    height: 5,
                                    mb: 1,
                                    backgroundColor: '#E9EEEF',
                                }}
                            />
                            <Typography
                                variant={"body1"}
                                color={"text.secondary"}
                                mb={3}
                            >{`${(completedLessons?.length)? completedLessons?.length:'0' } / ${record?.lessonsDuration?.length} lessons completed`}
                            </Typography>
                        </Div>
                   
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <Typography
                                variant={"h5"}
                                color={"text.secondary"}
                                mb={.25}
                            >
                                <b style={{color:'#9c0587'}}>{record?.batch_max_limit}</b> Intake
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant={"h5"}
                                color={"text.secondary"}
                                mb={.25}
                                
                            >
                                <b style={{color:'#27a603'}}>{record.seatsAvailable}</b> Available
                            </Typography>
                        </Grid>
                      
                    </Grid>
                  
                     <Button style={{marginTop:'20px',padding:'10px'}} variant={'contained'} size={"small"}  onClick={handleConnectWithoutContact} >Access</Button>
                </CardContent>
            </Card>
            </JumboGridItem>
        )
    }
    return (
        <Card sx={{ mb: 1 }}>
            <Accordion expanded={expanded} onChange={handleClick} square sx={{ borderRadius: 2 }}>
                <AccordionSummary
                    expandIcon={expanded ? <RemoveIcon /> : <AddIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{
                        px: 3,
                        flexDirection: 'row-reverse',

                        '& .MuiAccordionSummary-content': {
                            alignrecords: 'center',

                            '&.Mui-expanded': {
                                margin: '12px 0',
                            }
                        },
                        '.MuiAccordionSummary-expandIconWrapper': {
                            borderRadius: 1,
                            border: 1,
                            color: 'text.secondary',
                            borderColor: 'divider',
                            transform: 'none',
                            height: 28,
                            width: 28,
                            alignrecords: 'center',
                            justifyContent: 'center',
                            mr: 1,

                            '&.Mui-expanded': {
                                transform: 'none',
                                color: 'primary.main',
                                borderColor: 'primary.main',
                            },

                            '& svg': {
                                fontSize: '1.25rem',
                            }
                        }
                    }}
                >
                    <Div sx={{ flexShrink: 0, px: 1 }}>
                        <Avatar sx={{ width: 52, height: 52 }} alt={record.name} src={record.img} variant="rounded" />
                    </Div>
                    <Div
                        sx={{
                            width: { xs: 'auto', lg: '26%' },
                            flexShrink: 0,
                            px: 1,
                            flex: { xs: '1', lg: '0 1 auto' },
                        }}
                    >
                        <Typography variant={"h5"} mb={.5} fontSize={16}>{record.name && record.name.charAt(0).toUpperCase() + record.name.slice(1)}</Typography>
                        <Typography fontSize={"12px"} variant={"body1"} color={"text.secondary"}>
                            <CalendarTodayOutlinedIcon
                                sx={{
                                    verticalAlign: 'middle',
                                    fontSize: '1rem',
                                    mt: -.25,
                                    mr: 1
                                }}
                            />
                            15/06/2023
                        </Typography>
                    </Div>
                    <Div sx={{ display: { xs: 'none', lg: 'block' }, width: '20%', flexShrink: 0, px: 2 }}>
                        <LinearProgress
                            variant={"determinate"}
                            color="success"
                            value="78"
                            sx={{
                                height: 6,
                                borderRadius: 2,
                                backgroundColor: '#E9EEEF'
                            }}
                        />
                    </Div>
                    <Div sx={{ display: { xs: 'none', lg: 'block' }, width: '16%', flexShrink: 0, px: 1 }}>
                        <Typography
                            fontSize={"12px"}
                            variant={"h6"}
                            color={"text.secondary"}
                            mb={.25}
                        >
                            Deadline
                        </Typography>
                        <Typography variant={"body1"}>23/8/2023</Typography>
                    </Div>
                    <Div sx={{ flex: { xs: '0 1 auto', lg: 1 }, flexShrink: 0, px: 1 }}>
                        <Typography
                            fontSize={"12px"}
                            variant={"h6"}
                            color={"text.secondary"}
                            mb={.25}
                            sx={{
                                display: { xs: 'none', lg: 'block' }
                            }}
                        >
                            Status
                        </Typography>
                        <Chip color="success" size={"small"} label="in progress" />
                    </Div>
                    <AvatarGroup max={3} sx={{ display: { xs: 'none', lg: 'flex' },marginRight:"50px" }}>

                        {
                            team.map((projectData, index) => (
                                <Avatar key={index} alt={projectData.name} src={projectData.profilePic} />
                            ))
                        }
                    </AvatarGroup>
                    <JumboDdMenu
                       // icon={<MoreHorizIcon />}
                        menuItems={[
                            //{ icon: <EditIcon />, title: "Edit", action: "edit", data: record },
                            { icon: <DeleteIcon />, title: "Delete", action: "delete", data: record }
                        ]}
                        onClickCallback={handlerecordAction}
                    />

                </AccordionSummary>
                <AccordionDetails sx={{ borderTop: 1, borderColor: 'divider', p: theme => theme.spacing(2, 2, 2, 8.25) }}>
                    <Typography variant={"h5"}>Description</Typography>
                    <Div
                        sx={{
                            display: { xs: 'flex', lg: 'none' },
                            minWidth: 0,
                            flexDirection: 'column'
                        }}
                    >
                        <Div
                            sx={{
                                display: 'flex',
                                minWidth: 0,
                                alignrecords: 'center',
                                justifyContent: 'space-between',
                                mt: 1,
                                mb: 2,
                            }}
                        >
                            <Div>
                                <Typography
                                    fontSize={"12px"}
                                    variant={"h6"}
                                    color={"text.secondary"}
                                    mb={.25}
                                >
                                    Deadline
                                </Typography>
                                <Typography variant={"body1"}>23/8/2023</Typography>
                            </Div>

                            

                        </Div>
                        <Div sx={{ mb: 3, maxWidth: 280 }}>
                            <Typography
                                fontSize={"12px"}
                                variant={"h6"}
                                color={"text.secondary"}
                                mb={1}
                            >
                            </Typography>
                            <LinearProgress
                                variant={"determinate"}
                                color="success"
                                value="87"
                                sx={{
                                    height: 6,
                                    borderRadius: 2,
                                    backgroundColor: '#E9EEEF'
                                }}
                            />
                        </Div>
                    </Div>
                    <Typography variant={"body1"} color={"text.secondary"}>
                    <div dangerouslySetInnerHTML={{ __html: record?.program_content }} />
                    </Typography>
                </AccordionDetails>
            </Accordion>
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
        </Card>
    );
};
/* Todo record, view prop define */
export default ProjectItem;