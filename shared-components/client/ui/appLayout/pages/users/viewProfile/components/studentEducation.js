import React, { useState } from 'react';
import List from "@mui/material/List";
import { ListItemIcon, Typography, Card } from "@mui/material";
import styled from "@emotion/styled";
import SchoolIcon from '@mui/icons-material/School';

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: 26,
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

const StudentEducation = ({viewer}) => {
   const [user, setUser] = useState(viewer);

    return (
        <div>
            <List
                disablePadding
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: theme => theme.spacing(0, -2),
                    '@media (max-width: 768px)': {
                        justifyContent: 'center',
                      },
                }}
            >
                {viewer?.profile?.qualifications?.map((data, index) => (
                    <Card
                        key={index}
                        elevation={3} 
                        sx={{
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            textAlign: 'center', 
                            width: "200px",
                            marginBottom: '16px', 
                            padding: '16px',
                            boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.4)',
                            margin: '10px',
                        }}
                    >
                        <StyledListItemIcon>
                            <SchoolIcon fontSize={"inherit"} />
                        </StyledListItemIcon>
                        <div>
                            <h4>{data?.qualification}</h4>
                            <Typography> {data?.instituteName}</Typography>
                            <Typography> {data?.location}</Typography>
                            <Typography> {data?.year_of_passing}</Typography>
                        </div>
                    </Card>
                ))}
            </List>
        </div>
    );
};

export default StudentEducation;