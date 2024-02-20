import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import InputLabel from "@material-ui/core/InputLabel";
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="down" ref={ref} {...props} />;
});
const CourseBuilder = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <Div>
            <Button style={{ 'height': '35px' }} variant="outlined" onClick={() => setOpen(true)}>
                <AddCircleOutlineTwoToneIcon /> Topic
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle><Typography variant="h5">Add topic</Typography></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <InputLabel htmlFor="email"><Typography variant="h6">Topic Name</Typography>
                        </InputLabel>
                        <TextField style={{ 'width': '400px' }}
                            id="outlined-multiline-static"
                            multiline
                            rows={2} /><br></br>
                        <InfoTwoToneIcon />Topic titles are displayed publicly wherever required. Each topic may<br></br>
                        contain one or more lessons, quiz and assignments.
                        <InputLabel htmlFor="email"><Typography variant="h6">Topic Summary</Typography></InputLabel>
                        <TextField style={{ 'width': '400px' }}
                            id="outlined-multiline-static"
                            multiline
                            rows={10} /><br></br>
                        <InfoTwoToneIcon /> Add a summary of short text to prepare students for the activities for the<br></br>
                        topic. The text is shown on the course page beside the tooltip beside the topic name.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ 'marginRight': '220px' }} variant="outlined" onClick={() => setOpen(false)}>Cencel</Button>
                    <Button variant="outlined" onClick={() => setOpen(false)}>Add Topic</Button>
                </DialogActions>
            </Dialog>
        </Div>
    );
};
export default CourseBuilder; 