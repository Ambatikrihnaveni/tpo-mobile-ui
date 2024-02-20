import React from 'react'
import Div from "@jumbo/shared/Div";
import {Button, Popover,List,ListItem,Checkbox,Typography,AvatarGroup,Avatar} from "@mui/material";


const { filesBaseUrl } = Meteor.settings.public;


export default function ModuleTutors({selectedTutors,onCheckboxChange,tutors}) {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  return (
    <Div sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: theme => theme.spacing(1, 3),
    }}>
        {
            selectedTutors.length > 0 ? (
                <AvatarGroup max={4}>
                    {selectedTutors.map((tutor, index) => (
                        <Avatar key={index} alt={tutor.name} src={`${filesBaseUrl}${tutor?.userMedia[0]?.URLs?.thumbnail}`} />
                    ))}
                </AvatarGroup>
            ) : (
                <Avatar alt="Tutor" src={""} />
            )
        }
        <Button variant="outlined" disableElevation sx={{textTransform: 'none'}} onClick={(e) => setAnchorEl(e.currentTarget)}>+Add Tutors</Button>
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            <List sx={{minWidth: 160}}>
                {tutors.length > 0 ? (
                    tutors.map((tutor, index) => {
                        const itemSelected = selectedTutors.filter(product => product._id === tutor._id);

                        return (
                            <ListItem key={index}>
                                <Checkbox
                                    checked={!!itemSelected.length}
                                    onChange={(event) => onCheckboxChange(event.target.checked, event.target.value)}
                                    name={"products"}
                                    value={tutor._id}
                                    sx={{my: -1, ml: -1}}
                                />
                                <Avatar alt={tutor.name} src={`${filesBaseUrl}${tutor?.userMedia[0]?.URLs?.thumbnail}`} />
                                <Typography variant={'body1'} style={{marginLeft: '8px'}}>{tutor.name}</Typography>
                            </ListItem>
                        );
                    })
                ) : (
                    <ListItem>
                        <Typography variant={'body1'} style={{marginLeft: '8px'}}>No tutors</Typography>
                    </ListItem>
                )}
            </List>
        </Popover>
    </Div>
  )
}
