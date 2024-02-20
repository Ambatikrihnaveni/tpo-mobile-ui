import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import SelectModuleListItem from './selectModuleListItem';


export default function ModulesList({modules,moduleIds}) {
  
  const [checked, setChecked] = React.useState(moduleIds? moduleIds:[]);
  const[program,setProgram]=React.useState([])

  const handleToggle = (module) => () => {
    
    const currentIndex = checked.indexOf(module.id);
    const currentIndexModule = checked.indexOf(module);
    const newChecked = [...checked];
    const newCheckedModule = [...program];
    if (currentIndex === -1) {
      newChecked.push(module.id);
      newCheckedModule.push(module);
    } else {
      newChecked.splice(currentIndex, 1);
      newCheckedModule.splice(currentIndexModule, 1);
    }

    setChecked(newChecked);
    setProgram(newCheckedModule);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
      <JumboScrollbar
                        autoHeight
                        autoHeightMin= {347}  
                        autoHide
                        autoHideDuration={200}
                        autoHideTimeout={500}
                    >
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {modules?.map((module) => {
        const labelId = `checkbox-list-label-${module.id}`;

        return (
          <ListItem
            key={module.id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(module)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(module.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={module.title} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </JumboScrollbar>
    </Grid>
    <Grid item xs={12} sm={6}>
   
    <JumboScrollbar
                        autoHeight
                        autoHeightMin= {347}  
                        autoHide
                        autoHideDuration={200}
                        autoHideTimeout={500}
                    >
      {program?.map((item)=>(
         <SelectModuleListItem item={item} />
       
      ))}
</JumboScrollbar>
    </Grid>
    
    </Grid>
  );
 
}