import React from "react";
import { Box, Typography, ListItemText, Stack } from "@mui/material";
import Div from '@jumbo/shared/Div';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import Span from "@jumbo/shared/Span";
import styled from "@emotion/styled";

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

export default function UserData({ webinarData }) {
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Div className="container">
            <Div >
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Users" value="1" sx={{ fontWeight: 'bold', fontSize: '15px' }} />

                            </TabList>
                        </Box>

                        <TabPanel value="1">
                            <Div sx={{ marginBottom: '40px' }}>
                                <JumboListItem
                                >
                                    <ListItemText

                                        primary={
                                            <Typography variant={"body1"} component={"div"}>
                                                <Stack direction={"row"} alignItems={"center"} >

                                                    <Item
                                                        sx={{
                                                            //display: 'flex',
                                                            flexBasis: { xs: '50%', sm: '20%', md: '30%' },
                                                            flexShrink: 0, px: 1,
                                                        }}
                                                    >
                                                        <Typography variant={"h4"} mb={.5} sx={{ fontWeight: 'bold' }} >SI.No</Typography>

                                                    </Item>
                                                    <Item
                                                        sx={{
                                                            //display: 'flex',
                                                            flexBasis: { xs: '50%', sm: '20%', md: '20%' },
                                                            flexShrink: 0, px: 1,
                                                        }}
                                                    >
                                                        <Typography variant={"h4"} mb={.5} sx={{ fontWeight: 'bold' }} >Name</Typography>

                                                    </Item>

                                                    <Item
                                                        sx={{
                                                            //display: 'flex',
                                                            flexBasis: { xs: '50%', sm: '30%', md: '30%' },
                                                            flexShrink: 0, px: 1,
                                                        }}
                                                    >
                                                        <Typography variant={"h4"} mb={.5} sx={{ fontWeight: 'bold' }} >Email</Typography>

                                                    </Item>

                                                    <Item
                                                        sx={{
                                                            //display: 'flex',
                                                            flexBasis: { xs: '50%', sm: '30%', md: '30%' },
                                                            flexShrink: 0, px: 1,
                                                        }}
                                                    >
                                                        <Typography variant={"h4"} mb={.5} sx={{ fontWeight: 'bold' }} >Role</Typography>

                                                    </Item>
                                                </Stack>
                                            </Typography>
                                        }
                                    />
                                </JumboListItem>
                                <JumboScrollbar
                                    autoHeight
                                    autoHeightMin={350}
                                    autoHide
                                    autoHideDuration={200}
                                    autoHideTimeout={500}
                                >
                                    {webinarData?.userData?.length === 0 ? (
                                        <Typography variant={"body1"} component={"div"}>No users accepted the webinar.</Typography>
                                    ) : (
                                        webinarData?.userData?.map((user, index) => (

                                            <JumboListItem>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant={"body1"} component={"div"}>
                                                            <Stack direction={"row"} alignItems={"center"} >
                                                                <Item
                                                                    sx={{
                                                                        //display: 'flex',
                                                                        flexBasis: { xs: '50%', sm: '30%', md: '30%' },
                                                                        flexShrink: 0, px: 1,
                                                                    }}
                                                                >

                                                                    <Typography variant={"h4"} mb={.5} >{index + 1}</Typography>


                                                                </Item>
                                                                <Item
                                                                    sx={{
                                                                        //display: 'flex',
                                                                        flexBasis: { xs: '50%', sm: '20%', md: '20%' },
                                                                        flexShrink: 0, px: 1,
                                                                    }}
                                                                >

                                                                    <Typography variant={"h4"} mb={.5} >{user?.name}</Typography>


                                                                </Item>

                                                                <Item
                                                                    sx={{
                                                                        //display: 'flex',
                                                                        flexBasis: { xs: '50%', sm: '30%', md: '30%' },
                                                                        flexShrink: 0, px: 1,
                                                                    }}
                                                                >

                                                                    <Typography variant={"h4"} mb={.5} >{user?.email}</Typography>


                                                                </Item>
                                                                <Item
                                                                    sx={{
                                                                        //display: 'flex',
                                                                        flexBasis: { xs: '50%', sm: '30%', md: '30%' },
                                                                        flexShrink: 0, px: 1,
                                                                    }}
                                                                >

                                                                    <Typography variant={"h4"} mb={.5} >{user?.role}</Typography>


                                                                </Item>
                                                            </Stack>
                                                        </Typography>

                                                    }
                                                />
                                            </JumboListItem>
                                        ))
                                    )}

                                </JumboScrollbar>


                            </Div>
                        </TabPanel>


                    </TabContext>
                </Box>
            </Div>
        </Div>
    );
};
