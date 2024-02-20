import React from 'react';
import Header from "./Header";
import JumboContentLayout from "@jumbo/components/JumboContentLayout";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import Events from "./components/Events";
import { alpha } from "@mui/material/styles";
import About from "./components/About";
import Biography from "./components/Biography";
import UserProfileSidebar from "./UserProfileSidebar";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import { useParams } from 'react-router-dom';
import AccountsService from '../../../../graphql/services/accounts/accounts-service';


const UserProfile = () => {

    const { userId } = useParams()
    const [viewer, setViewer] = React.useState({})

    React.useEffect(async () => {
        const { viewProfile } = await AccountsService.viewProfile(userId)
        setViewer(viewProfile)
    }, [viewer])

    const { theme } = useJumboTheme();
    return (
        <JumboContentLayout
            header={<Header viewer={viewer} />}
            sidebar={<UserProfileSidebar viewer={viewer} />}
            layoutOptions={{
                header: {
                    sx: {
                        mt: -4,
                        mb: -7.25,
                        mx: { xs: -4, lg: -6 },
                        p: { xs: theme.spacing(2, 2, 4), lg: theme.spacing(2, 2, 4) },
                        background: `#002447 url(${getAssetPath(`${ASSET_IMAGES}/profile-bg.jpg`, "1920x580")}) no-repeat center`,
                        backgroundSize: 'cover',
                        color: 'common.white',
                        position: 'relative',

                        '&::after': {
                            display: 'inline-block',
                            position: 'absolute',
                            content: `''`,
                            inset: 0,
                            backgroundColor: alpha(theme.palette.common.black, .65)
                        }
                    }
                },
                sidebar: {
                    sx: {
                        mr: 3.75,
                        width: { xs: '100%', md: '33%' },
                        [theme.breakpoints.down('md')]: {
                            minHeight: 0,
                            mr: 0,
                            order: 2
                        }
                    }
                },
                wrapper: {
                    sx: {
                        [theme.breakpoints.down('lg')]: {
                            flexDirection: 'column'
                        }
                    }
                },
                main: {
                    sx: {
                        [theme.breakpoints.down('lg')]: {
                            minHeight: 0
                        }
                    }
                }
            }}
        >
            <About viewer={viewer} />
            <Biography viewer={viewer} />
            {(viewer?.role == "Admin" || viewer?.role == "Student" || viewer?.role === "Tutor") &&
                <Events sx={{ mb: { xs: 3.75, lg: 0 } }} viewer={viewer} />
            }

        </JumboContentLayout>
    );
};

export default UserProfile;
