import React, { useState } from 'react';
import List from "@mui/material/List";
import { ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
import styled from "@emotion/styled";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

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

const ProfileBankDetails = (viewer) => {
    const [user, setUser] = useState(viewer);
    const accountName = viewer?.viewer?.profile?.accountName
    const accountNumber = viewer?.viewer?.profile?.accountNumber
    const branch = viewer?.viewer?.profile?.branch
    const ifscCode = viewer?.viewer?.profile?.ifscCode
    const bankName = viewer?.viewer?.profile?.bankName

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
                        <LocalLibraryOutlinedIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                            Name</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">
                            {accountName}</Typography>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <AccountBalanceIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Bank Name</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">{bankName}</Typography>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <PersonIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Account Number</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">{accountNumber}</Typography>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <DvrOutlinedIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>IFSC Code</Typography>}
                        secondary={
                            <Typography variant="body1" color="text.primary">{ifscCode}</Typography>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <LocationOnOutlinedIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Branch</Typography>}
                        secondary={
                            <Typography variant="body1" color="text.primary">{branch}</Typography>}
                    />
                </ListItem>

            </List>
        </div>
    )
}

export default ProfileBankDetails