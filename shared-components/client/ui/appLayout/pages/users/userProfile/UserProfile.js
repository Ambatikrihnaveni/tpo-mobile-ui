import React,{useState} from 'react';
import Header from "./Header";
import JumboContentLayout from "@jumbo/components/JumboContentLayout";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import Events from "./components/Events";
import {alpha} from "@mui/material/styles";
import About from "./components/About";
import Biography from "./components/Biography";
import UserProfileSidebar from "./UserProfileSidebar";
import {ASSET_IMAGES} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";
import useAuth from "/imports/client/ui/hooks/useAuth";
import { Meteor } from "meteor/meteor";

const { filesBaseUrl } = Meteor.settings.public;

const UserProfile = () => {
    const {theme} = useJumboTheme();
    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = useState(viewer);
    const userdata = { ...viewer }

    let imageSrc = (userdata?.userMedia) ? (userdata?.userMedia[0]?.URLs?.large) : '';
    if (imageSrc === String(null)) return null;

    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    }

    React.useEffect(() => {
        Tracker.autorun((computation) => {
            if (viewer) {
                setUser(viewer);
            }
        });
    });

    return (
        <JumboContentLayout
            header={<Header/>}
            sidebar={<UserProfileSidebar/>}
            layoutOptions={{
                header: {
                    sx: {
                        mt: -4,
                        mb: -7.25,
                        mx: {xs: -4, lg: -6},
                        p: {xs: theme.spacing(2, 2, 4), lg: theme.spacing(2, 2, 4)},
                       background:  `url(${imageSrc})`,
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
                        width: {xs: '100%', lg: '33%'},
                        [theme.breakpoints.down('lg')]: {
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
            <About/>
            <Biography/>
           <Events sx={{mb: {xs: 3.75, lg: 0}}}/>
        </JumboContentLayout>
    );
};

export default UserProfile;
