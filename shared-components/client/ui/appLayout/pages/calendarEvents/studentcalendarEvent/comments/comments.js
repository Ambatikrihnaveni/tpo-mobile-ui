import React from "react";
import {
    Grid,
    Typography,
    Divider
} from "@mui/material";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import { InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Div from '@jumbo/shared/Div';

export default function Comments() {
    const [comment, setComment] = React.useState('')
    return (
        <Grid>
            <Grid>
                <Typography sx={{ fontSize: 20, fontWeight: "bold", textAlign: "center", mt: 2 }}>Comments</Typography>
            </Grid>
            <Divider flexItem sx={{ mt: 2, width: "100%" }} />

            <Div sx={{ m: { sm: 1, md: 1, lg: 1 } }}>
                <JumboScrollbar
                    autoHeight
                    autoHeightMin={500}
                    autoHide
                    autoHideDuration={200}
                    autoHideTimeout={500}
                >

                </JumboScrollbar>

                <Div
                    sx={{
                        padding: '6px',
                        borderRadius: '6px',
                        boxShadow: '4px 4px 4px 4px rgba(0,0,0,0.3)',
                        display: 'flex'
                    }}>
                    <Grid container>
                        <Grid item xs={10}>
                            <InputBase
                                sx={{
                                    color: 'inherit',
                                    display: 'flex',
                                    borderRadius: 24,
                                    backgroundColor: theme => theme.jumboComponents.JumboSearch.background,

                                    '& .MuiInputBase-input': {
                                        padding: theme => theme.spacing(1, 1, 1, 0),
                                        // vertical padding + font size from searchIcon
                                        paddingLeft: theme => `calc(1em + ${theme.spacing(4)})`,
                                        transition: theme => theme.transitions.create('width'),
                                        width: '100%',
                                        height: 22
                                    },
                                }}
                                placeholder="Write a comment "
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton variant='contained' sx={{ textTransform: 'none', display: 'inline', ml: 1 }}>
                                <SendIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Div>
            </Div>
        </Grid>
    );
}