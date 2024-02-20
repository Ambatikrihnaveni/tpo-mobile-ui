import React, { useEffect, useState } from 'react';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Card, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Div from "@jumbo/shared/Div";
import { TextField } from "@mui/material";
import Attechment from './Attachment';

let Editor = () => <React.Fragment />;

const WysiwygEditorExample = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        Editor = require('react-draft-wysiwyg').Editor;
        setEditorState(EditorState.createEmpty());
    }, []);

    return (
        <Card sx={{ m: 3, p: 3, }} title={"WYSIWYG"} >
            <Grid>

                <Div sx={{
                    mt: 5,
                    Height: 50,
                    width: 500,
                    maxWidth: '100%',
                }}
                >
                    <TextField sx={{
                        width: 500,
                        maxWidth: '100%',
                    }} />
                </Div>
            </Grid>

            <Stack direction="row" alignItems="center" >
                <Button sx={{ mt: 2 }} variant="contained" component="label">
                    Add Media
                </Button>
            </Stack>
            <Grid item xs={12} md={4} sm={4} lg={2} sx={{ mt: -5, float: 'right', alignItems: 'right', }} >
                <Button sx={{ mr: 2, }} variant="contained" component="label">
                    visual
                </Button>
                <Button variant="contained" component="label">
                    Text
                </Button>
            </Grid>

            <Editor
                editorStyle={{
                    width: '100%',
                    minHeight: 100,
                    borderWidth: 1,
                    overflow: 'auto', maxHeight: '100px',
                    borderStyle: 'solid',
                    borderColor: 'lightgray',
                }}
                editorState={editorState}
                onEditorStateChange={editorState => setEditorState(editorState)}
            />
            <Attechment />

        </Card>
    );
};

export default WysiwygEditorExample;