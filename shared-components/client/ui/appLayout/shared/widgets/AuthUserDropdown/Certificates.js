import React, {useEffect, useState} from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import Button from '@mui/material/Button';
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Snackbar, Alert } from '@mui/material';


let Editor = () => <React.Fragment/>;

const Certificates = ({certificates,addCertificates,handleCheck,handleCloseCertificatesDialog}) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());


    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSave = () => {

        setOpenSnackbar(true);

        setTimeout(() => {
          handleCloseCertificatesDialog();
          }, 500);
            };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        // Close the Snackbar
        setOpenSnackbar(false);
    };
    useEffect(() => {
        if (certificates) {
          const html = certificates;
    
          const contentBlock = convertFromHTML((html));
          if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState)
          }
        }
    
          Editor = require('react-draft-wysiwyg').Editor;
         
      }, []);
    
    const onEditorChange=()=>{
        const bioContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        addCertificates(bioContent)
      }

      
      
    return (
        <div>
         <h2 style={{ width: '100%', color: '#475259', paddingLeft: '30px', paddingTop:'30px',fontFamily: '"Domine",Georgia,serif', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem' }}>Certificates</h2>
         <h4 style={{ color: '#475259', paddingLeft: '30px', }}>Add anything else you want employers to know</h4>
        <JumboDemoCard style={{margin:'2px 40px'}} >
            <Editor
                editorStyle={{
                    width: '100%',
                    minHeight: 180,
                    borderWidth: 1,
                    overflow: 'auto', maxHeight: '180px',
                    borderStyle: 'solid',
                    borderColor: 'lightgray',
                    
                }}
                value={certificates}
                onChange={onEditorChange}
                editorState={editorState}
                onEditorStateChange={editorState => setEditorState(editorState)}
            />
        </JumboDemoCard>
        <Button variant="contained" style={{float:'right',marginTop:'2%'}} onClick={handleSave}>Save</Button>
        <Snackbar
                    open={openSnackbar}
                    autoHideDuration={500}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{
            backgroundColor: '#4CAF50', 
            color: 'white',  '& .MuiSvgIcon-root': { color: 'white' },          
        }}>
                        Save Successfully
                    </Alert>
                </Snackbar>
        </div>
    );
};

export default Certificates;
