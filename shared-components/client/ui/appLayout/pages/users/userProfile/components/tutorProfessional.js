import React, { useState } from 'react';
import List from "@mui/material/List";
import { AvatarGroup, ListItem, ListItemIcon, ListItemText, Typography, Tooltip } from "@mui/material";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import JumboChipsGroup from "@jumbo/components/JumboChipsGroup";
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
import styled from "@emotion/styled";
import useAuth from "/imports/client/ui/hooks/useAuth";
import { ASSET_AVATARS } from "../../../../utils/constants/paths";
import { getAssetPath } from "../../../../utils/appHelpers";
import { makeStyles } from '@mui/styles';

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: 24,
    height: 48,
    width: 48,
    borderRadius: '50%',
    minWidth: 42,
    marginRight: 16,
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    border: `solid 1px ${theme.palette.divider}`
}));


const useStyles = makeStyles((theme) => ({
    customTooltip: {
        width: '180px',
        marginLeft: '50px'
    },
}));

const TutorProfessional = ({ record, props }) => {
    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = useState(viewer);
    const userdata = { ...viewer }
    const students = (props?.students) ? props?.students?.length : 0;
    const tutors = (props?.tutors) ? props?.tutors?.length : 0;

    const qualifications = userdata?.profile?.qualifications || [];
    const LastIndex = qualifications.length - 1;

    const [showCategoriesTooltip, setShowCategoriesTooltip] = useState(false);
    const classes = useStyles();

    const handleCategoriesHover = () => {
        setShowCategoriesTooltip(true);
    };

    const handleCategoriesLeave = () => {
        setShowCategoriesTooltip(false);
    };

    return (
        <div>
            <List
                disablePadding
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: theme => theme.spacing(0, -2),
                }}
            >
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <DvrOutlinedIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                            Course Category</Typography>}
                        secondary={
                            <div onMouseEnter={handleCategoriesHover} onMouseLeave={handleCategoriesLeave}>
                                <Typography variant="body1" color="text.primary">
                                    {
                                        userdata?.profile?.categories?.length === 0 ? null : (
                                            <JumboChipsGroup
                                                spacing={1}
                                                size={"small"}
                                                chips={userdata.profile.categories}
                                                mapKeys={{ label: "name", color: "color" }}
                                                max={1}
                                            />
                                        )}

                                    <Tooltip
                                        title={` ${userdata.profile.categories}`}
                                        open={showCategoriesTooltip}
                                        arrow
                                        classes={{ tooltip: classes.customTooltip }}
                                    />
                                </Typography>
                            </div>
                        }

                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <SchoolOutlinedIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>Qualification</Typography>}
                        secondary={
                            qualifications.length === 0 ? (
                                <Typography variant="body1" color="text.primary">{userdata.profile.qualification} </Typography>
                            ) : (
                                <div>
                                    <Typography variant="body1" color="text.primary">{qualifications[LastIndex].qualification}</Typography>
                                    <Typography variant="body1" color="text.primary">{qualifications[LastIndex].instituteName}</Typography>
                                    <Typography variant="body1" color="text.primary">{qualifications[LastIndex].field_of_study}</Typography>
                                    <Typography variant="body1" color="text.primary">{qualifications[LastIndex].year_of_passing}</Typography>
                                    <Typography variant="body1" color="text.primary">{qualifications[LastIndex].location}</Typography>
                                    <Typography variant="body1" color="text.primary">{qualifications[LastIndex].score}</Typography>
                                </div>
                            )
                        }
                    />

                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <ArticleOutlinedIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Experience</Typography>}
                        secondary={
                            userdata?.profile?.experiences.length === 0 ? (
                                <Typography variant="body1" color="text.primary">{userdata.profile.experience} </Typography>
                            ) : (
                                userdata?.profile?.experiences?.map((data, index) => (
                                    <div key={index}>
                                        <Typography variant="body1" color="text.primary">{data?.jobTitle}</Typography>
                                        <Typography variant="body1" color="text.primary">{data?.employer}</Typography>
                                        <Typography variant="body1" color="text.primary">{data?.company_location}</Typography>
                                        <Typography variant="body1" color="text.primary">{data?.start_month} {data?.start_year}</Typography>
                                        <Typography variant="body1" color="text.primary">{data?.end_month} {data?.end_year}</Typography>

                                    </div>
                                ))
                            )
                        } />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <LocalOfferOutlinedIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Price Per Hour</Typography>}
                        secondary={
                            <Typography variant="body1" color="text.primary">{userdata.profile.price}/h</Typography>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <DateRangeOutlinedIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Available Days</Typography>}
                        secondary={<Typography variant="body1" color="text.primary" style={{ display: 'flex', }}>
                            {userdata.profile.availableDays.map(day => day.slice(0, 3)).join(', ')}
                        </Typography>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <AccessTimeOutlinedIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Available Time</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">From {userdata.profile.selectedFromTime}- To {userdata.profile.selectedToTime}</Typography>}

                    />
                </ListItem>
            </List>


        </div >
    )
}

export default TutorProfessional