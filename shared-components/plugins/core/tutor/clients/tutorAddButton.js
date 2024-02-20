import React from 'react';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    InputLabel,
    Select,
    Switch
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Div from "@jumbo/shared/Div";

const AddButtons = () => {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("sm");
    return (
       
            <Div>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Add New 
                </Button>
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <DialogTitle>Add New</DialogTitle>
                    <DialogContent>
                        <Div
                            // noValidate
                            // component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content',
                            }}
                        >
                            <FormControl sx={{mt: 2, minWidth: 120}}>

                            </FormControl>
                            
                        </Div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Add</Button>
                    </DialogActions>
                </Dialog>
            </Div>
    );
};

export default AddButtons;





