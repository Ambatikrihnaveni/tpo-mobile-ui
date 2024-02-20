import React from 'react';
import List from "@mui/material/List";
import { ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import styled from "@emotion/styled";

const StyledListItemIcon = styled(ListItemIcon)(({theme}) => ({
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


function TutorInstitute({viewer}) {
     ;
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
                        width: {xs: '100%', sm: '50%', xl: '33.33%'},
                        paddingLeft:'85px'
                    }}
                >
                    <StyledListItemIcon>
                        <DvrOutlinedIcon fontSize={"inherit"}/>
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                           Institutes</Typography> 
                           }
                    />
                </ListItem>
            
                
            </List>
            {viewer?.shopId?.map((shop,index)=>(
            <div variant="body1"  color="text.primary" style={{paddingLeft:'85px',display:'flex'}}>
           
           <BusinessOutlinedIcon fontSize='small' style={{marginRight:'3px',margin:'10px',color:'#08d1c4'}}/>
              <Typography sx={{marginTop:'9px'}}>
             {shop?.name}
             </Typography>
           
             </div>
             ))}
                           
    </div>
  )
}

export default TutorInstitute