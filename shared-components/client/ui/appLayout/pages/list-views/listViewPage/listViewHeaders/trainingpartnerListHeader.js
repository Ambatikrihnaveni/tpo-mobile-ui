import React, { useState } from 'react';
import {
   
    ListItemText,
    Typography,
    Stack,
} from "@mui/material";

import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

const TrainingPartnerListHeader = ({ record, view, item, recordType }) => {
    
    return (
        <JumboListItem
        componentElement={"div"}
        itemData={record}
        sx={{
            cursor: 'pointer',
            borderTop: 1,
            borderColor: 'divider',
            '&:hover': {
                bgcolor: 'action.hover',
            },
            marginBottom: '8px', // Add margin to create equal spacing between items
        }}
    >
        
        <ListItemText
            primary={
                <Typography variant={"body1"} component={"div"}>
                    <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0, textAlign: 'center' }}>


                        <Item
                            sx={{
                                flexBasis: { sm: '50%', md: '28%' },
                                display: { xs: 'none', sm: 'block' },
                                marginLeft:'30px'
                            }}
                        >
                            <Typography variant={"body1"} noWrap><b>Institute</b></Typography>
                        </Item>
                        <Item
                            sx={{
                                flexBasis: { sm: '50%', md: '28%' },
                                display: { xs: 'none', sm: 'block' },
                            }}
                        >
                            <Typography variant={"body1"} noWrap><b> Reg Date</b></Typography>
                        </Item>
                        <Item
                            sx={{
                                flexBasis: { xs: '100%', sm: '50%', md: '28%' },
                                flexShrink: 0, px: 1,
                            }}
                        >
                            <Typography variant={"h5"} mb={.5} sx={{ textTransform: 'capitalize' }}><b>Location</b></Typography>
                        </Item>
                        <Item
                            sx={{
                                textAlign: 'center',
                                flexBasis: { md: '25%' },
                                display: { xs: 'none', md: 'block' }
                            }}
                        >
                            <Typography variant={"body1"}><b>Contact</b></Typography>
                        </Item>
                    </Stack>
                </Typography>
            }
        />
    </JumboListItem>
    );
};
export default TrainingPartnerListHeader;