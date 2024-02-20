import React, { useState } from 'react';
import {
    ListItemText,
    ListItemAvatar,
    Typography,
    Avatar,
    AvatarGroup,
    Stack,
    Button,
    Grid,
    Tooltip
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import getPDPUrl from '../../../../../../../../plugins/included/product-admin/client/utils/getPDPUrl';
import { recordService } from "../../../../../services/record-services";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import RecordDetail from "../RecordDetail";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import ModulePreview from '../../../../../../../../plugins/core/Modules/components/moduleView/modulePreview';
import Popover from "@mui/material/Popover";
import useAuth from '../../../../../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));



const { filesBaseUrl } = Meteor.settings.public;
;
const ModuleItem = ({ record, view, i }) => {
    const { viewer } = useAuth()
    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false)
    const recordType = "Module";
    const deletePrms = { record, recordType };
    let imageSrc = (record?.media) ? record?.media[0]?.URLs?.thumbnail : '';
    let smallImage = (record?.media) ? record?.media[0]?.URLs?.medium : '';
    let date = record?.createdAt;
    let truncateDate = date?.slice(0, 10);


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const showtutorDetail = React.useCallback(() => {
        navigate(`/${record?.id}/viewprofile`)

    }, [showDialog, record]);

    const open = Boolean(anchorEl);
    const id = open ? "avatar-popover" : undefined;



    // If there is no img src, then render nothing
    if (imageSrc === String(null)) return null;

    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    } else {
        imageSrc = "";
    }

    // If there is no img src, then render nothing
    if (smallImage === String(null)) return null;

    if (smallImage) {
        smallImage = `${filesBaseUrl}${smallImage}`;
    } else {
        smallImage = "";
    }

    const deleteRecordMutation = useMutation(recordService.delete, {

        onSuccess: () => {
            hideDialogAndRefreshRecordsList();
        }
    });
    ;
    const hideDialogAndRefreshRecordsList = React.useCallback(() => {
        hideDialog();
        setRecordsListRefresh(true);
    }, [hideDialog, setRecordsListRefresh]);

    const viewProfile = (id) => {
        navigate(`/${id}/viewprofile`)
    }

    const showRecordDetail = React.useCallback(() => {
        showDialog({
            content: <RecordDetail record={record} onClose={hideDialog} />
        })
    }, [showDialog, record]);

    const onPreview = (record) => {
        showDialog({
            fullScreen: true,
            content: <ModulePreview onClose={hideDialog} module={record} />,
            sx: {
                borderRadius: 0
            }
        })
    }

    const onEdit = React.useCallback(async (menuItem) => {
        const href = getPDPUrl({ productId: menuItem.data.id });
        navigate(href);
    }, [navigate]);

    const onRowClick = React.useCallback(async (record) => {

        ;
        const href = getPDPUrl({ productId: record.id });
        navigate(href);
    }, [navigate]);

    const handleItemAction = (menuItem) => {
        switch (menuItem.action) {
            case 'edit':
                onEdit(menuItem)
                break;
            case 'delete':
                showDialog({
                    variant: 'confirm',
                    title: 'Are you sure about deleting this module?',
                    content: "You won't be able to recover this module later",
                    onYes: async () => {
                        try {
                            await deleteRecordMutation.mutateAsync(deletePrms);
                            hideDialog();
                            toast.success('Module Deleted successfully');
                        } catch (error) {
                            hideDialog();
                            toast.error(error?.graphQLErrors?.length > 0 ? error?.graphQLErrors[0].message : error?.message);
                        }
                    },
                    onNo: hideDialog
                })
        }
    };


    const string = record?.title
    const truncateString = (str = '', maxLength = 50) => str.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const truncateName = truncateString(string, 15);

    if (view === "grid") {
        const [isHovered, setHover] = React.useState(-1);

        return (

            <JumboGridItem style={{ display: "flex", flexWrap: "wrap", flexDecoration: "none" }} xs={12} sm={4} md={4} lg={3}>
                <Div style={{ width: '325px', minHeight: '420px' }}>
                    <JumboCardQuick noWrapper sx={{ mb: 0, ml: 1, mr: 1, mt: 2, height: '400px' }}
                        onMouseOver={() => setHover(i)}
                        onMouseLeave={() => setHover(-1)}
                        style={{ boxShadow: isHovered !== i ? '' : '4px 2px 6px rgba(0,0,0,0.3)' }}
                    >
                        <div
                            className="imageContainer"
                        >
                            <div style={{ backgroundImage: (smallImage) ? `url(${smallImage})` : 'url("https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/cb/3c4030d65011e682d8b14e2f0915fa/shutterstock_226881610.jpg?auto=format%2Ccompress&dpr=1")', backgroundSize: "cover", minHeight: "160px", verticalAlign: "center", textAlign: "center" }}>
                                <div style={{ display: `${isHovered == i ? "block" : 'none'}` }}>
                                    <Button style={{ backgroundColor: 'white', padding: '10px', marginTop: "60px", textAlign: "center", verticalAlign: "center" }} onClick={() => { onPreview(record) }}> Preview</Button>
                                </div>
                            </div>
                        </div>


                        <Tooltip title={record?.title}>
                            <Typography style={{ fontSize: '1.25rem', lineHeight: '1.625rem', fontWeight: 600, marginTop: '10px', marginLeft: '12px' }} className="custom-tooltip-title" >
                                {truncateName}
                            </Typography>
                        </Tooltip>
                        <Typography variant={"h5"} sx={{ marginTop: "15px", marginLeft: "10px" }}>Content by <span style={{ fontWeight: 'bold', color: 'blue' }}> TPO.AI </span>
                        </Typography>

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
                            }}>
                            <div dangerouslySetInnerHTML={{ __html: record?.description }} />
                        </Typography>


                        <Grid container spacing={1} style={{ marginLeft: '2px', marginTop: '1px' }}>
                            <Grid item xs={12} >
                                <Stack direction="row" spacing={2}>
                                    <AvatarGroup max={4}>
                                        {record?.tutors?.map((tutor, index) => (
                                            <Tooltip key={index} title={tutor.name} placement="bottom">
                                                <Avatar alt={tutor.name} src={`${filesBaseUrl}${tutor.userMedia[0]?.URLs?.thumbnail}`} sx={{ height: '40px', width: '40px' }} />
                                            </Tooltip>
                                        ))}
                                    </AvatarGroup>

                                </Stack>
                            </Grid>

                        </Grid>


                        <Grid container spacing={2} style={{ marginTop: '5px' }}>
                            <Grid item xs={6} >
                                <Typography variant='h5' style={{ paddingLeft: '10px', marginTop: "-11px", fontSize: '0.875rem', fontWeight: 600 }}> Lesson :{(record?.lessons) ? record?.lessons?.length : 0}</Typography>

                                {/*                                 <Typography style={{ paddingLeft: "5px",marginTop:"-11px",fontWeight:"bold" }}> Lesson :{record?.lessons.length}</Typography> */}
                            </Grid>
                            <Grid item xs={6} >
                            </Grid>
                          
                        </Grid>
                    </JumboCardQuick>
                </Div>
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
                
                <ListItemAvatar onClick={() => { onPreview(record) }}>
                    <Avatar alt={record?.title} src={imageSrc} />
                </ListItemAvatar>
                <ListItemText

                    primary={
                        <Typography variant={"body1"} component={"div"}>
                            <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0 }}>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '22%' }
                                    }} onClick={() => { onPreview(record) }}
                                >
                                    <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0}
                                        noWrap>{record.title}</Typography>
                                    
                                </Item>
                                <Item
                                    sx={{
                                        ml:viewer?.role == "Tutor"? -10 :"-50px",
                                        flexBasis: { sm: '50%', md: '15%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap> {(record?.lessons) ? record?.lessons?.length : 0} </Typography>
                                </Item>
                                {
                                    viewer.role === "Tutor" &&
                                    <Item
                                        sx={{
                                            marginLeft: "50px",
                                            flexBasis: { md: '18%' },
                                            display: { xs: 'none', md: 'block' }
                                        }}
                                        onClick={() => viewProfile(record?.account?._id)}
                                    >
                                        <Tooltip key={i} title={record?.account?.name} placement='bottom'>
                                            <Typography variant={"body1"} noWrap
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                style={{
                                                    textDecoration: isHovered ? "underline" : "none",
                                                    color: isHovered ? "#04bfa0" : "inherit",
                                                    cursor: "pointer" // Optional: Change cursor to indicate interaction
                                                }}>{record?.account?.name}</Typography>
                                        </Tooltip>
                                    </Item>
                                }
                                {
                                    viewer.role === "Admin" &&
                                    <Item
                                        sx={{
                                            flexBasis: { md: '23%' },
                                            display: { xs: 'none', md: 'block' },
                                            marginLeft:'80px'
                                        }}
                                    //onClick={()=>viewProfile(record?.account._id)}
                                    >
                                        <Tooltip key={i} title={record?.account?.name} placement='bottom'>
                                            <Typography variant={"body1"} noWrap
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                style={{
                                                    // textDecoration: isHovered ? "underline" : "none",
                                                    color: isHovered ? "#04bfa0" : "inherit",
                                                    cursor: "pointer" // Optional: Change cursor to indicate interaction
                                                }}>{record?.account?.name}</Typography>
                                        </Tooltip>
                                    </Item>
                                }

                                <Item
                                    sx={{
                                        ml:13,
                                        flexBasis: { md: '18%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{truncateDate}</Typography>
                                </Item>
                                {viewer?.role == "Admin" &&
                                    <Item
                                        sx={{
                                            ml:10,
                                            flexBasis: { md: '25%' },
                                            display: { xs: 'none', md: 'block' },

                                        }}
                                    >
                                        <ListItemAvatar style={{ display: 'flex', flexDirection: 'row',marginLeft:'60px' }}>
                                            <AvatarGroup max={3}>
                                                {record?.tutors?.map((tutor, index) => (
                                                    <Tooltip key={index} title={tutor.name} placement='bottom'>
                                                        <Avatar alt={tutor.name} src={`${filesBaseUrl}${tutor.userMedia[0]?.URLs?.thumbnail}`} />
                                                    </Tooltip>
                                                ))}
                                            </AvatarGroup>

                                        </ListItemAvatar>
                                        <Popover
                                            id={id}
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={handlePopoverClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <Div style={{ padding: '10px'}} >
                                                {record?.tutors?.map((tutor, index) => (
                                                    <Div key={index} style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
                                                        <Avatar alt={tutor.name} src={`${filesBaseUrl}${tutor.userMedia[0]?.URLs?.thumbnail}`} />
                                                        <Span style={{ marginLeft: '10px' }}>{tutor.name}</Span>
                                                    </Div>
                                                ))}
                                            </Div>
                                        </Popover>
                                    </Item>
                                }
                               
                            </Stack>
                        </Typography>
                    }
                />
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
            </JumboListItem>
        </React.Fragment>
    );
};
/* Todo record, view prop define */
export default ModuleItem;