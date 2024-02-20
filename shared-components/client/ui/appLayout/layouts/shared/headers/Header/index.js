import React, { useEffect } from 'react';
import Stack from "@mui/material/Stack";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import { IconButton, Slide, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Logo from "../../../../shared/Logo";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Navigate, useLocation, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SIDEBAR_STYLES, SIDEBAR_VARIANTS } from "@jumbo/utils/constants";
import useJumboHeaderTheme from "@jumbo/hooks/useJumboHeaderTheme";
import { useNavigate } from 'react-router-dom';
import MarketPlaceDropdown from '../../../../shared/widgets/marketplaceDropdown/marketplaceDropdown';
import useAuth from '../../../../../hooks/useAuth';
import NotificationsDropdown from '../../../../shared/NotificationsDropdown'
import studentGroupQuery from '../../../../../graphql/services/studentGroups/queries/studentGroup';
import Div from '../../../../../@jumbo/shared/Div';


function Header() {
    const navigate = useNavigate()
    const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();
    const [dropdownSearchVisibility, setDropdownSearchVisibility] = React.useState(false);
    const { headerTheme } = useJumboHeaderTheme();
    const { viewer } = useAuth()
    const [groupName, setGroupName] = React.useState()
    const location = useLocation();
    const url = location.pathname;
    const segment = url.substring(url.lastIndexOf('/') + 1);
    let pageTitle = segment.charAt(0).toUpperCase() + segment.slice(1)
    const showDropdownSearch = useMediaQuery('(max-width:575px)');
    let arr = segment.match(/==/gi);
    if (arr?.length > 0) {
        pageTitle = '';
    }

    const groupId = localStorage.getItem('groupId')
    const { data, isLoading, refetch: refetchProduct } = useQuery(studentGroupQuery, {
        variables: {
            id: groupId
        }
    });

    if (segment == "myprograms") {
        pageTitle = "Enrolled Programs";
    }
    if (segment == "myprograms" && viewer?.role == "Admin") {
        pageTitle = "Programs";
    }
    if (segment == "jobmatches") {
        pageTitle = "Job Matches";
    }
    if (segment == "appliedjobs") {
        pageTitle = "Applied Jobs";
    }
    if (segment == "rejectedjobs") {
        pageTitle = "Rejected Jobs";
    }
    if (segment == "placedjobs") {
        pageTitle = "Placed Jobs";
    }
    if (segment == "addprogram") {
        pageTitle = "Add program";
    }
    if (segment == "editprogram") {
        pageTitle = "Edit Program";
    }
    if (segment == "inviteuser") {
        pageTitle = "Invite Tutor";
    }
    if (segment == "internships") {
        pageTitle = "Internships"
    }
    if (segment == "addmodule") {
        pageTitle = "Add module"
    }
    if (segment == "aicreate") {
        pageTitle = "AI Creation";
    }
    if (segment == "manualcreate") {
        pageTitle = "Manual Creation";
    }
    if (segment == "edit-profile") {
        pageTitle = "Edit Profile";
    }
    if (segment == "invite&Enrole") {
        pageTitle = "Invite Student";
    }
    if (segment == "acceptedData") {
        pageTitle = " Accepted Users"
    }
    if (segment == "eventData") {
        pageTitle = "Webinar Data"
    }
    if (segment == "groupList") {
        //  getGroupName()

        if (groupId == data?.studentGroup?._id) {

            pageTitle = (data) ? data?.studentGroup?.name : "Group List";
        } else {
            pageTitle = "Group List"
        }

    }
    if (segment == "new-institute") {
        pageTitle = "New Institute";
    }
    if (segment == "viewprofile") {
        pageTitle = "Profile";
    }
    if (segment == "myadmissions") {
        pageTitle = "Admissions";
    }
    if (segment == "collegeadmins") {
        pageTitle = "Colleges";
    }
    if (segment == "trainingpartners") {
        pageTitle = "Training Partners";
    }
    if (segment == "manualPayments") {
        pageTitle = "Manual Payments";
    }
    if (segment == "mycertificates") {
        pageTitle = "My Certificates";
    }
    if (segment == "todaysclass") {
        pageTitle = "Today's Class";
    }
    if (segment == "lesson-quiz") {
        pageTitle = "Quizzes";
    }
    if (segment == "programsList") {
        pageTitle = "program List";
    }
    if (segment == "createtechnical") {
        pageTitle = "Create  Technical";
    }

    if (segment == "createaptitude") {
        pageTitle = "Create  Aptitude";
    }

    if (segment == "editaptitude") {
        pageTitle = "Edit  Aptitude";
    }

    if (segment == "edittechnical") {
        pageTitle = "Edit  Technical";
    }

    if (segment == "modelpapers") {
        pageTitle = "Model Papers ";
    }
    if (segment == "entranceexam") {
        pageTitle = "Entrance Exam";
    }





    const onBackClick = () => {
        navigate(-1)
    }

    return (
        <React.Fragment>
            {
                (
                    sidebarOptions.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER
                    || sidebarOptions.variant === SIDEBAR_VARIANTS.TEMPORARY
                    || (sidebarOptions.variant === SIDEBAR_VARIANTS.PERSISTENT && !sidebarOptions.open)
                ) &&
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{
                        ml: sidebarOptions.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER ? -2 : 0,
                        mr: 2,
                    }}
                    onClick={() => setSidebarOptions({ open: !sidebarOptions.open })}
                >
                    {
                        sidebarOptions?.open ? <MenuOpenIcon /> : <MenuIcon />
                    }
                </IconButton>
            }
            <Div sx={{ display: { xs: 'block', sm: 'none' }, mr: 1 }}>
                <ArrowBackIcon onClick={onBackClick} sx={{ display: pageTitle == "Dashboard" ? "none" : 'block', color: '#50c2c9' }} />
            </Div>
            {pageTitle ? <Typography variant='h3' sx={{ fontWeight: 'bold', textTransform: "capitalize" }}>{pageTitle}</Typography> : ''}
            <Stack direction="row" alignItems="center" spacing={1.25} sx={{ ml: "auto" }}>


                {(viewer?.role == "College-Admin" || viewer?.role == "Student") && <MarketPlaceDropdown />}
                <NotificationsDropdown />
                {/*  <MessagesDropdown/> 

                <NotificationsDropdown/>
               <AuthUserDropdown/> */}
            </Stack>
        </React.Fragment>
    );
};

export default Header;
