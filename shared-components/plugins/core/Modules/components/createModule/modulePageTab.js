import React, { useEffect, useState } from 'react';
import { Grid, TextField, Typography, Paper, Button } from '@mui/material'
import Div from '../../../../../client/ui/@jumbo/shared/Div';
import ClearIcon from '@mui/icons-material/Clear';
import { useParams } from "react-router-dom"
import { styled } from '@mui/material/styles';
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import useProduct from "../../hooks/useProduct";
import useAuth from '../../../../../client/ui/hooks/useAuth';
import ProductMediaGallery from '../../../../included/product-admin/client/components/ProductMediaGallery';
import { IconButton, } from '@material-ui/core';
import ModuleTutors from './moduleContent/ModuleTutors';
import TutorsService from '../../../../../client/ui/graphql/services/tutors/tutors-service';
import { makeStyles } from '@mui/styles';
import AiServices from '../../../../../client/ui/appLayout/services/ai-services';
import { Tooltip } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import { BeatLoader } from "react-spinners";
import FileUpload from './moduleContent/FileUpload';
import PDFList from './moduleContent/PDF_List';
import ModulesService from '../../../../../client/ui/graphql/services/modules/modules-service';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: '15px',
  color: theme.palette.text.secondary,

}));

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



export default function ModulePageTab({ handleTabChange }) {

  const {
    onUpdateProduct,
    product,
    shopId
  } = useProduct();
  const routeParams = useParams();
  const productId = routeParams.product_id
  const [title, setTitle] = React.useState('')
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const [descriptionText, setDescriptionText] = React.useState('')
  const [tag, setTag] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [tutors, setTutors] = React.useState([])
  const [selectedTutors, setSelectedTutors] = React.useState([]);
  const { viewer } = useAuth()
  const classes = useStyles();
  const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
  const [prompt, setPrompt] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const [pdfFiles, setPDFFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState('')

  const handlePromptChange = (event) => {
    setPrompt(event.target.value)
  }

  const handleFileChange = (acceptedFiles) => {

    setFile(acceptedFiles[0]);
  };

  const handleUpload = async () => {
    const pdfData = {
      filename: file.name,
      path: file.path,
      size: file.size,
      mimetype: file.type
    }

    try {
      const data = await ModulesService.uploadPDF(shopId, productId, pdfData);
      alert('PDF uploaded successfully!');
      let pdfList = []
      for (let i = 0; i < data.length; i++) {
        let pdfListItem = { file: data[i].filename, path: data[i].path, type: data[i].mimetype, size: data[i].size }

        pdfList.push(pdfListItem)

      }

      setPDFFiles(pdfList)
    } catch (error) {
      alert('Error uploading PDF:', error);
    }
    setFile(null)
  };

  const onRemoveFile = (i) => {
    let data = [...pdfFiles]
    data.splice(i, 1)
    setPDFFiles(data)
  }

  const onSubmited = async () => {
    setIsSubmitting(true)
    const { data } = await AiServices.generateBio(prompt)

    if (data) {
      const html = `<p>${data}</p>`
      const contentBlock = convertFromHTML((html));
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState)
        const bioContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setDescriptionText(bioContent)
      }
      setIsTextFieldVisible(false);
      setIsSubmitting(false)
      setIsSubmitted(false)
    }

  };
  const handleButtonClick = () => {

    setIsTextFieldVisible(true);
  }


  let data = {};


  useEffect(async () => {
    if (product) {
      setTitle(product.title)
      setSelectedTutors(product.tutors)
      if (product.pdfs) {
        let pdfsData = []
        for (let i = 0; i < product.pdfs.length; i++) {
          const pdf = { fileName: product.pdfs[i].fileName, fileUrl: product.pdfs[i].fileUrl }
          pdfsData.push(pdf)
        }
        setPDFFiles(pdfsData)
      }

      if (product?.description) {
        const html = product?.description;
        setDescriptionText(html)
        const contentBlock = convertFromHTML(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState)
        }
      }
      if (product.title != "" && product?.description != "") {
        setIsButtonDisabled(false)
      }

    }

    const queryParams = { filterPrms: { status: "Approved" } }
    const tutorsData = await TutorsService.getTutors(shopId, { queryParams })
    if (tutorsData) {
      setTutors(tutorsData)
    }

    Editor = require('react-draft-wysiwyg').Editor;
  }, [product]);

  
  const onEditorChange = () => {
    const bioContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setDescriptionText(bioContent)
  }

  const onSubmit = () => {
    const tutorIds = []
    for (let i = 0; i < selectedTutors.length; i++) {
      tutorIds.push(selectedTutors[i]._id)
    }
    data = { title: title, description: descriptionText, tutorIds: tutorIds, pdfs: pdfFiles }

    onUpdateProduct({
      product: data,
    });

    handleTabChange()


  }

  const onCheckboxChange = (checked, value) => {

    const data = [...selectedTutors]
    const item = tutors.find(item => item._id.toString() === value);
    if (checked == true) {
      data.push(item)
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id.toString() == value) {
          data.splice(i, 1)
        }
      }
    }


    setSelectedTutors(data)
  };

  return (
    <Div sx={{ padding: "15px", marginTop: '-5px' }}>
      <Grid container spacing={2}>
        <Grid item xs={9} style={{ margin: 'auto' }}>

          <Item>
            <Grid container>

              <Grid item xs={8} sm={4} sx={{ margin: 'auto', borderRadius: '15px', }}>



                <ProductMediaGallery
                  editable={true}
                  media={product?.media}
                  productId={product?._id}
                  shopId={shopId}
                />


              </Grid>
            </Grid>
            <Typography sx={{ mb: 1 }}>Module title </Typography>
            <TextField
              fullWidth
              size='small'
              value={title}
              labe="Module title"
              onChange={(e) => { setTitle(e.target.value && e.target.value[0].toUpperCase() + e.target.value.slice(1)) }}
              sx={{ mb: 4 }}
            />

            <Div sx={{ mb: 2 }}>
              <Typography sx={{ mb: 1 }}>Module description</Typography>

              <Tooltip title={"Generate with AI"} color='primary'>
                <Button variant="contained"
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
                      fullwidth
                      placeholder={"Enter your Prompt"}
                      size={"large"}
                      sx={{ flex: 1, "& fieldset": { border: 'none', borderBottom: '1px solid black' } }}
                      disabled={isSubmitted}
                      onChange={handlePromptChange}
                    />
                    <Button disabled={isSubmitted || prompt.trim() === ''} sx={{ ml: 2 }} onClick={onSubmited}>
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
                    overflow: 'auto', maxHeight: '200px',
                    borderStyle: 'solid',
                    borderColor: 'lightgray',
                  }}
                  value={descriptionText}
                  onChange={onEditorChange}
                  editorState={editorState}
                  onEditorStateChange={editorState => {
                    setEditorState(editorState);
                    setDescriptionText(editorState)
                  }}
                />
              </div>
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" >pdf</a>
              <Typography variant='h3' sx={{ mb: 2, mt: 3, }}>Upload PDFs</Typography>
              <Div sx={{ border: '1px solid', padding: '10px' }}>
                <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
                  <Grid item xs={12} sm={6} sx={{ verticalAlign: 'middle' }}>
                    {file ? <Typography>{file?.name}  <IconButton sx={{ ml: 2, zIndex: 1 }} onClick={() => setFile(null)}><ClearIcon /></IconButton></Typography> :
                      <FileUpload handleFileChange={handleFileChange} />
                    }

                    <Button variant='contained' disabled={file ? false : true} onClick={handleUpload} sx={{ m: 2 }}>Upload</Button>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
                    {(pdfFiles.length > 0) &&
                      <PDFList pdfFiles={pdfFiles} onRemoveFile={onRemoveFile} />
                    }

                  </Grid>
                </Grid>
              </Div>
            </Div>
            {(viewer?.role == "Admin") && <Div sx={{ mt: 4 }}>
              <Typography sx={{ mb: 1 }}>Add tutors to module</Typography>
              <ModuleTutors selectedTutors={selectedTutors} onCheckboxChange={onCheckboxChange} tutors={tutors} />
            </Div>}

          </Item>
        </Grid>

      </Grid>
      <Div sx={{ marginTop: "30px", textAlign: "right" }}>
        <Button variant='contained' sx={{ textTransform: "none", fontWeight: "bold" }} disabled={(title == '' || descriptionText == "")} onClick={onSubmit}>Save & Next</Button>
      </Div>
    </Div>
  )

}