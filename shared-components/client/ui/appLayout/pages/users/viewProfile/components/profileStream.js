import React from 'react';
import List from "@mui/material/List";
import { ListItem, ListItemIcon, ListItemText, Typography, } from "@mui/material";
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
import styled from "@emotion/styled";

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


function ProfileStream({ viewer }) {

    return (
        <div>
           
            <div>
                <List disablePadding sx={{ marginTop: '-40px' }}>
                    {viewer?.profile?.streams?.map((stream, index) => (
                        <ListItem key={index}>
                            <StyledListItemIcon>
                                <DvrOutlinedIcon fontSize={"inherit"} />
                            </StyledListItemIcon>
                            <ListItemText
                                sx={{ marginTop: '50px' }}
                                primary={
                                    <Typography variant="4" color="text.secondary" mb={0.5} sx={{ fontWeight: 'bold' }} >
                                        {`Courses Offered: ${stream?.streamType}`}
                                    </Typography>
                                }
                                secondary={
                                    <ul style={{ paddingLeft: '0', marginLeft: '15px' }}>
                                        {stream?.streamsOffered?.map((streams, innerIndex) => (
                                            <li key={innerIndex}>
                                                {`${streams}`}
                                            </li>
                                        ))}
                                    </ul>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </div>

        </div>
    )
}

export default ProfileStream