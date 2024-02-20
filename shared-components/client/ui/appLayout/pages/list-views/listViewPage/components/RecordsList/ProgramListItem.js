import React, { useState } from 'react';
import {
    ListItemText,
    ListItemIcon,
    ListItemAvatar,
    Typography,
    Grid,
    alpha,
    Button, Slide,
    Avatar,
    Stack,
    MenuItem,
    Select
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import styled from "@emotion/styled";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import MyProgramService from '../../../../../../graphql/services/programs/myProgram-services';
import Tooltip from '@material-ui/core/Tooltip';
import ProgramView from '../../../../../../../../plugins/core/programs/client/components/createModule/programView/programView';
import useAuth from '../../../../../../hooks/useAuth';
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId.js";
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import ProgramPreview from '../../../../../../../../plugins/core/library/client/components/LibraryPreview/programPreview';

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

const { filesBaseUrl } = Meteor.settings.public;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProgramListItem = ({ record, view, i }) => {
    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const navigate = useNavigate();
    const [isHoveredm, setIsHoveredm] = useState(false)
    const [isHovered, setHover] = React.useState(-1);
    const recordType = "programList";
    const [previewData, setPreviewData] = useState({})
    const [open, setOpen] = React.useState(false)
    const { isViewerLoading, viewer, data } = useAuth();
    const [status, setStatus] = useState(record.status)
    const { shopId } = useCurrentShopId();
    let userShopId = ""
    if (viewer?.role == "Master-Admin" || viewer?.role == "Admin") {
        userShopId = shopId
    } else {
        userShopId = viewer?.shopId
    }
    const deletePrms = { record, recordType, userShopId };
    const date = record?.createdAt;
    const truncateDate = date?.slice(0, 10)

    const handleMouseEnter = () => {
        setIsHoveredm(true);
    };

    const handleMouseLeave = () => {
        setIsHoveredm(false);
    };


    let removeLastLetter = record?.type?.slice(0, -1);
    let changeToUpperCase = removeLastLetter?.charAt(0).toUpperCase() + removeLastLetter?.slice(1);

    let createdBy = record?.createdBy;
    let imageSrc = record?.programMedia ? record?.programMedia[0]?.URLs?.small : '';

    if (imageSrc === String(null)) return null;

    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    } else {
        imageSrc = "";
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

    const onProgramPreview = (data) => {
        showDialog({
            fullScreen: true,
            content: <ProgramPreview handleClose={hideDialog} record={record} data={data} />,
            sx: {
                borderRadius: 0
            }
        })
    }
    const currencySymbols = {
        USD: '$',
        EUR: '€',
        INR: '₹',
        // Add more currencies as needed
    };
    const currencyCode = record?.currencyCode || 'INR';



    const handleStatusChange = (event) => {
        const programStatus = event.target.value;
        const data = { id: record.id, status: programStatus }
        updateStatusMutation.mutate(data)
    }


    const updateStatusMutation = useMutation(MyProgramService.updateProgramStatus, {
        onSuccess: () => {
            refreshRecordsList();
        }
    });

    const refreshRecordsList = React.useCallback(() => {
        setRecordsListRefresh(true);
    }, [setRecordsListRefresh]);

    const string = record?.name
    const truncateString = (str = '', maxLength = 50) => str.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const truncateName = truncateString(string, 15);

    const viewProfile = (id) => {
        navigate(`/${id}/viewprofile`)
    }

    if (view === "grid") {
         
        const [isHovered, setHover] = React.useState(-1);
        return (

            <JumboGridItem xs={12} sm={4} md={4} lg={3}>
                <Div style={{ marginTop: "-20px", minWidth: "263px", minHeight: "300px" }}>
                    <JumboCardQuick noWrapper sx={{
                        mb: 1, ml: 1, mt: 1, mr: 1, '&:hover': {
                            boxShadow: `0 3px 10px 0 ${alpha('#000', 0.2)}`,
                            transform: 'translateY(-4px)',
                            borderBottomColor: 'transparent',
                        }, height: "370px"
                    }}
                        onMouseOver={() => setHover(i)}
                        onMouseLeave={() => setHover(-1)}
                    >

                        <div
                            className="imageContainer"
                        >
                            <div style={{ backgroundImage: (imageSrc) ? `url(${imageSrc})` : 'url("https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/cb/3c4030d65011e682d8b14e2f0915fa/shutterstock_226881610.jpg?auto=format%2Ccompress&dpr=1")', backgroundSize: "cover", minHeight: "160px", verticalAlign: "center", textAlign: "center" }}>
                                <div style={{ display: `${isHovered == i ? "block" : 'none'}` }}> <Button style={{ backgroundColor: 'white', padding: '10px', marginTop: "60px", textAlign: "center", verticalAlign: "center" }} onClick={() => { onPreview(record) }}> Preview</Button></div>
                            </div>
                        </div>
                        <Typography variant={"h5"} sx={{ marginTop: "15px", marginLeft: "10px" }}>Content by <span style={{ fontWeight: 'bold', color: 'blue' }}>{record?.account?.name}</span>
                        </Typography>
                        <Tooltip title={record?.name} >
                            <Typography style={{ fontSize: '1.25rem', lineHeight: '1.625rem', fontWeight: 600, marginTop: '10px', marginLeft: '12px' }} className="custom-tooltip-title" >
                                {truncateName && truncateName.charAt(0).toUpperCase() + truncateName.slice(1)} </Typography>
                        </Tooltip>

                        <Typography
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                WebkitBoxOrient: "vertical",
                                marginTop: "15px",
                                marginLeft: "10px",
                                marginRight: "5px",
                                minHeight: 42
                            }} dangerouslySetInnerHTML={{ __html: record?.program_content }}/>
                        <Grid container spacing={2} style={{ marginTop: '17px', padding: "5px" }}>
                            <Grid item xs={6} >
                                <Typography style={{ paddingLeft: '5px', marginTop: "-11px", fontWeight: ' bold' }}> Lessons: {record?.products?.length}</Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography style={{ marginLeft: "70px", marginTop: "-10px" }}> <StarIcon style={{ color: "gold" }} fontSize="inherit" />4.5 </Typography>
                            </Grid>
                        </Grid>
                    </JumboCardQuick>
                </Div>
            </JumboGridItem>
        )
    }

    /*  */
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
                <ListItemIcon sx={{ minWidth: 40 }}>
                   
                </ListItemIcon>
                <ListItemAvatar>
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
                                /*  onClick={() => { onPreview(record) }} */

                                >
                                    <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0}>
                                    <Tooltip title={record?.name} >
                                        <label>
                                        {truncateName && truncateName.charAt(0).toUpperCase() + truncateName.slice(1)}
                                        </label>
                                    </Tooltip>
                                        <Tooltip title="Click for Preview">
                                            <VisibilityIcon style={{ marginLeft: '20px', fontSize: '16px' }} onClick={() => {onProgramPreview(record) }} />
                                        </Tooltip>
                                        {(viewer?.role === 'Master-Admin' || viewer?.role == "Admin") &&
                                            <Tooltip title="Click for View">
                                                <PlayLessonIcon style={{ marginLeft: '20px', fontSize: '16px' }} onClick={() => { onPreview(record) }} />
                                            </Tooltip>
                                        }
                                    </Typography>

                                </Item>


                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography style={{marginLeft:'40px'}} variant={"body1"} noWrap> {changeToUpperCase} </Typography>
                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography style={{marginLeft:'40px'}} variant={"body1"} noWrap> {record?.price === '0' ? "Free" : `${currencySymbols[currencyCode]}${record?.price}`}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        marginRight: "25px",
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                    onClick={() => viewProfile(record?.account._id)}

                                >
                                    <Typography variant={"body1"} noWrap
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            textDecoration: isHoveredm ? "underline" : "none",
                                            color: isHoveredm ? "#04bfa0" : "inherit",
                                            cursor: "pointer"
                                        }}>{record?.account?.name}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        marginRight: "32px",
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}

                                >
                                    <Typography variant={"body1"} noWrap>{truncateDate}</Typography>
                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { md: '22%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}

                                >
                                    <Select
                                        value={record.status}
                                        size="small"
                                        sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 }, color: "white", borderRadius: "30px", width: "auto", height: "30px", fontSize: 12, textAlign: "center", backgroundColor: record.status === 'Approved' ? '#28a745' : record.status === 'Pending' ? '#f29339' : '#e73145', paddingLeft: '3px', minWidth: '100px' }}
                                        inputProps={{ IconComponent: () => null }}
                                        onChange={handleStatusChange}>
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Approved">Approved</MenuItem>
                                        <MenuItem value="Reject">Reject</MenuItem>
                                    </Select>

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
export default ProgramListItem;