import React, { useState } from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Link from "@mui/material/Link";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

const Contacts = ({ viewer }) => {
    const [user, setUser] = useState(viewer);
    const userdata = { ...viewer }
    return (
        <JumboCardQuick title={"Contact"} noWrapper>
            <List disablePadding sx={{ mb: 2 }}>
                <ListItem alignItems="flex-start" sx={{ p: theme => theme.spacing(.5, 3) }}>
                    <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                        <EmailOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="body1" color="text.secondary">Email</Typography>}
                        secondary={<Link variant="body1" href="#" underline="none">{userdata?.primaryEmailAddress}</Link>}
                    />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ p: theme => theme.spacing(.5, 3) }}>
                    <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                        <InsertLinkOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="body1" color="text.secondary">Web page</Typography>}
                        secondary={<Link variant="body1" href={userdata.profile?.website} underline="none" target="_blank">
                            {userdata.profile?.website}
                        </Link>}
                    />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ p: theme => theme.spacing(.5, 3) }}>
                    <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                        <LocalPhoneOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="body1" color="text.secondary">Phone</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">{userdata.phoneNumber}</Typography>}
                    />
                </ListItem>
            </List>
        </JumboCardQuick>
    );
};

export default Contacts;
