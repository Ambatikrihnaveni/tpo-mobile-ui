import React from "react";
import { Grid,  TextField, Typography,Button } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { Tooltip } from '@material-ui/core';
import Div from "../../../../../@jumbo/shared/Div";
import { IconButton, } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { BeatLoader } from "react-spinners";
import ProductMediaGallery from "../../../../../../../plugins/included/product-admin/client/components/ProductMediaGallery";
import {  EditorState, ContentState, convertFromHTML } from 'draft-js';

let Editor = () => <React.Fragment />;
const useStyles = makeStyles({
  button: {
    background: 'linear-gradient(270deg, #3fa1a9, #79f1a4)', // Replace these colors as desired
    color: 'white', // White text color suits this background
    '& .MuiIcon-root': {
      color: 'white', // White icon color to match the text
    },
  },
});

export default function TitleForm(params) {
  const [isTextFieldVisible, setIsTextFieldVisible] = React.useState(false);
    const classes = useStyles();
      const {title,
        descriptionText,
        onEditorChange,
        onSubmited,
        editorState,
        setEditorState
        ,setTitle,
        setDescriptionText,
        isSubmitted,
        handlePromptChange,
        isSubmitting,
        prompt,
      } = params
      const handleButtonClick = () => {
        setIsTextFieldVisible(true);
      };
      React.useEffect(() => {
        if (descriptionText) {
            const trimmedHtml = descriptionText 
            const contentBlock = convertFromHTML(trimmedHtml);

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    }

   

    Editor = require('react-draft-wysiwyg').Editor;

    }, [descriptionText]);

    const handleEditorChange = (editorState) => {
      const content = editorState.getCurrentContent();
      const rawText = content.getPlainText();
      onEditorChange(rawText); // Pass the raw text to the onEditorChange function
      setEditorState(editorState);
    }


    return (
        <Grid>
          <Grid container>

                <Grid item xs={8} sm={4} sx={{ margin: 'auto', borderRadius: '15px', }}>

                  <ProductMediaGallery
                    editable={true}
                  />


                </Grid>
                </Grid>

            <Typography sx={{ mb: 1 }}>Title </Typography>
            <TextField
                fullWidth
                size='small'
                value={title}
                label="Module title"
                onChange={(e) => { setTitle(e.target.value && e.target.value[0].toUpperCase() + e.target.value.slice(1)) }}
                sx={{ mb: 4 }}
            />
            <Typography>Description</Typography>
            <Tooltip title={"Generate with AI"} color='primary'>
                <Button variant="contained"
                    disabled={isSubmitting == true}
                    className={classes.button}
                    style={{ fontWeight: 'bolder', float: 'right', marginTop: '20px', marginLeft: '10px' }}
                    onClick={handleButtonClick}>
                    AI
                </Button>
            </Tooltip>

            <Div
                sx={{
                    display: "flex",
                    alignItems: "center",
                    maxWidth: 1000,
                    margin: '-43px 0px 0px 0px ',
                    zIndex: 2,
                    position: 'relative',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                    marginLeft: '10px'
                }}
            >
                {isTextFieldVisible && (
                    <>
                        <TextField
                            fullWidth
                            placeholder={"Enter your Prompt"}
                            size={"large"}
                            sx={{ flex: 1, "& fieldset": { border: 'none', borderBottom: '1px solid black' } }}
                            disabled={isSubmitted}
                            onChange={handlePromptChange}
                        />
                        <Button disabled={isSubmitted || !prompt.trim() === '' } sx={{ ml: 2 }} onClick={onSubmited}>
                            {isSubmitting ? (
                                <BeatLoader color="black" size={8} />
                            ) : (
                                <IconButton edge="end" color="inherit" aria-label="send" onClick={onSubmited} disabled={isSubmitted}>
                                    <SendIcon style={{ color: 'gray' }} />
                                </IconButton>
                            )}
                        </Button>
                    </>
                )}
            </Div>

      <div>
        <Editor
          editorStyle={{
            width: '100%',
            minHeight: 200,
            borderWidth: 1,
            overflow: 'auto',
            maxHeight: '200px',
            borderStyle: 'solid',
            borderColor: 'lightgray',
          }}
          value={descriptionText}
          onChange={handleEditorChange}
          editorState={editorState}
          onEditorStateChange={editorState => setEditorState(editorState)}

        />
      </div>

      
    </Grid>
  )
}