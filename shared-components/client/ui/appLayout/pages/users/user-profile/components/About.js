import React, { useState } from 'react';
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import List from "@mui/material/List";
import {  ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Stack from "@mui/material/Stack";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import styled from "@emotion/styled";
import useAuth from "/imports/client/ui/hooks/useAuth";
import ContactsIcon from '@mui/icons-material/Contacts';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CastForEducationRoundedIcon from '@mui/icons-material/CastForEducationRounded';

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
const About = () => {
    const [value, setValue] = useState('personal');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = useState(viewer);
    const userdata = { ...viewer }
    React.useEffect(() => {
        Tracker.autorun((computation) => {
            if (viewer) {
                setUser(viewer);
            }
        });
    });
    const Personal = () => {
        return (
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
                        width: { xs: '100%', sm: '50%', xl: '50%' }
                    }}
                >
                    <StyledListItemIcon>
                        <ApartmentIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                            Full Name</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">
                            {userdata.name && userdata.name.charAt(0).toUpperCase() + userdata.name.slice(1)}</Typography>}
                    />
                </ListItem>

                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '50%' }
                    }}
                >
                    <StyledListItemIcon>
                        <HomeIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Address
                        </Typography>}
                        secondary={
                            <Typography component={"div"} variant={'body1'}>
                                <Stack
                                    direction={"row"}
                                    flexWrap={"wrap"}
                                    sx={{}}
                                >{userdata.profile.address}
                                </Stack>
                            </Typography>
                        }
                    />
                </ListItem>
                {userdata.role === "Tutor" && (
                    <>
                        <ListItem
                            sx={{
                                width: { xs: '100%', xl: '50%' }

                            }}
                        >

                            <StyledListItemIcon>
                                <CastForEducationRoundedIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Qualification
                                </Typography>}
                                secondary={
                                    <Typography component={"div"} variant={'body1'}>
                                        <Stack
                                            direction={"row"}
                                            flexWrap={"wrap"}
                                            sx={{}}
                                        >{userdata.profile.qualification}
                                        </Stack>
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            sx={{
                                width: { xs: '100%', xl: '50%' }

                            }}
                        >

                            <StyledListItemIcon>
                                <CastForEducationRoundedIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Experience
                                </Typography>}
                                secondary={
                                    <Typography component={"div"} variant={'body1'}>
                                        <Stack
                                            direction={"row"}
                                            flexWrap={"wrap"}
                                            sx={{}}
                                        >{userdata.profile.experience}
                                        </Stack>
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            sx={{
                                width: { xs: '100%', xl: '50%' }

                            }}
                        >

                            <StyledListItemIcon>
                                <CastForEducationRoundedIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Available Week Days
                                </Typography>}
                                secondary={
                                    <Typography component={"div"} variant={'body1'}>
                                        <Stack
                                            direction={"row"}
                                            flexWrap={"wrap"}
                                            sx={{}}
                                        >{userdata.profile.availableDays}
                                        </Stack>
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            sx={{
                                width: { xs: '100%', xl: '50%' }

                            }}
                        >

                            <StyledListItemIcon>
                                <CastForEducationRoundedIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Price P/H
                                </Typography>}
                                secondary={
                                    <Typography component={"div"} variant={'body1'}>
                                        <Stack
                                            direction={"row"}
                                            flexWrap={"wrap"}
                                            sx={{}}
                                        >{userdata.profile.price}
                                        </Stack>
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            sx={{
                                width: { xs: '100%', xl: '50%' }

                            }}
                        >

                            <StyledListItemIcon>
                                <CastForEducationRoundedIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Bio
                                </Typography>}
                                secondary={
                                    <Typography component={"div"} variant={'body1'}>
                                        <Stack
                                            direction={"row"}
                                            flexWrap={"wrap"}
                                            sx={{}}
                                        >---
                                        </Stack>
                                    </Typography>
                                }
                            />
                        </ListItem>

                    </>
                )}
            </List>
        )
    }
    const Institute = () => {
        return (
            <List
                disablePadding
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: theme => theme.spacing(0, -2),
                }}
            >
                {(userdata.role === 'Admin' || userdata.role == 'Master-Admin')&& (
                    <>
                        <ListItem
                            sx={{
                                width: { xs: '100%', xl: '50%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <ApartmentIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                                    Institue Name</Typography>}
                                secondary={<Typography variant="body1" color="text.primary">
                                    <Stack
                                        direction={"row"}
                                        flexWrap={"wrap"}
                                        sx={{}}
                                    >{userdata.adminUIShops[0].name && userdata.adminUIShops[0].name.charAt(0).toUpperCase() + userdata.adminUIShops[0].name.slice(1)}
                                    </Stack>
                                </Typography>}
                            />
                        </ListItem>

                        <ListItem
                            sx={{
                                width: { xs: '100%', xl: '50%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <GroupsOutlinedIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>No.of Users
                                </Typography>}
                                secondary={
                                    <Typography component={"div"} variant={'body1'}>
                                        <Stack
                                            direction={"row"}
                                            flexWrap={"wrap"}
                                            sx={{}}
                                        >1388
                                        </Stack>
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            sx={{
                                width: { xs: '100%', xl: '50%' }

                            }}
                        >
                            <StyledListItemIcon>
                                <LocationOnIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Location
                                </Typography>}
                                secondary={
                                    <Typography component={"div"} variant={'body1'}>
                                        <Stack
                                            direction={"row"}
                                            flexWrap={"wrap"}
                                            sx={{}}
                                        >USA
                                        </Stack>
                                    </Typography>
                                }
                            />
                        </ListItem>

                        <ListItem
                            sx={{
                                width: { xs: '100%', xl: '50%' }

                            }}
                        >
                            <StyledListItemIcon>
                                <ContactsIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Contact Name
                                </Typography>}
                                secondary={
                                    <Typography component={"div"} variant={'body1'}>
                                        <Stack
                                            direction={"row"}
                                            flexWrap={"wrap"}
                                            sx={{}}
                                        >{userdata.name && userdata.name.charAt(0).toUpperCase() + userdata.name.slice(1)}
                                        </Stack>
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            sx={{
                                width: { xs: '100%', xl: '50%' }
                            }}
                        >
                            <StyledListItemIcon>
                                <LocalPhoneIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Contact Number
                                </Typography>}
                                secondary={
                                    <Typography component={"div"} variant={'body1'}>
                                        <Stack
                                            direction={"row"}
                                            flexWrap={"wrap"}
                                            sx={{}}
                                        >{userdata.number}
                                        </Stack>
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            sx={{
                                width: { xs: '100%', xl: '50%' }

                            }}
                        >
                            <StyledListItemIcon>
                                <HomeIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Address
                                </Typography>}
                                secondary={
                                    <Typography component={"div"} variant={'body1'}>
                                        <Stack
                                            direction={"row"}
                                            flexWrap={"wrap"}
                                            sx={{}}
                                        >USA
                                        </Stack>
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            sx={{
                                width: { xs: '100%', xl: '50%' }

                            }}
                        >
                            <StyledListItemIcon>
                                <CastForEducationRoundedIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Courses Offered
                                </Typography>}
                                secondary={
                                    <Typography component={"div"} variant={'body1'}>
                                        <Stack
                                            direction={"row"}
                                            flexWrap={"wrap"}
                                            sx={{}}
                                        >HTMl
                                        </Stack>
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </>
                )}
            </List>

        )
    }
    return (
        <JumboCardQuick
            title={"About"}
            headerSx={{
                borderBottom: 1, borderColor: 'divider'
            }}
            sx={{ mb: 3.75 }}
            action={
                (userdata.role === 'Admin' || userdata.role == 'Master-Admin') && (
                    <TabContext value={value}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab value="personal" label="Personal" />
                            <Tab value="institute" label="Institute" />
                        </TabList>
                    </TabContext>
                )
            }
        >
            {(userdata.role === 'Admin' || userdata.role == 'Master-Admin') && value === 'personal' && <Personal />}
            {(userdata.role === 'Admin' || userdata.role == 'Master-Admin') && value === 'institute' && <Institute />}
            {userdata.role === 'Tutor' && value === 'personal' && <Personal />}


        </JumboCardQuick>
    );
};

export default About;
