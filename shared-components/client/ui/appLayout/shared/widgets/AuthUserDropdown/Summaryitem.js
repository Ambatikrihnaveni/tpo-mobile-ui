import * as React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from "@mui/material/Divider";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Typography,Card } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';

const style = {
    width: '100%',
    maxWidth: '100%',
    bgcolor: 'background.paper',
};
function Summaryitem({ recentItem, key }) {
    ;

    const [checkedItemId, setCheckedItemId] = useState(null);

    const handleClick = (itemId) => {
        setCheckedItemId(itemId === checkedItemId ? null : itemId);
    };


    return (

        <List sx={style} component="nav" aria-label="mailbox folders">

            {
                recentItem?.summaryData.map((item, i) => (
                    <Stack direction="row" spacing={1} key={item.dataId}>
                        <Card>
                        <ListItem >

                            <Button variant="contained" style={{
                                backgroundColor: '#5462e8', padding: '2px 0px', borderRadius: '5px', minWidth: "35px",
                                color: 'white', display: 'flex', alignItems: 'center', cursor: 'pointer', textTransform: "none"
                            }} onClick={() => handleClick(item.dataId)}  >
                                {checkedItemId === item.dataId ? <CheckIcon /> : 'Add'}
                            </Button> 
                            <ListItemText primary={item.data} style={{ color: '#5462e8',paddingLeft:'20px' }} />
                            
                        </ListItem>
                        <Divider style={{ color: 'black' }} />
                        </Card>
                    </Stack>

                ))
            }

        </List>
    )
}

export default Summaryitem