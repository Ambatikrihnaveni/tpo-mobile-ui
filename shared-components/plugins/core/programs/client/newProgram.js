import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import { useParams } from "react-router-dom"
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import ProgramPageTab from "./programPageTab"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useProgram from './hooks/useProgram';


export default function NewProgram() {

  const { theme } = useJumboTheme();
  const routeParams = useParams();
  const programId = routeParams.program_id
  const [moduleIds, setModuleIds] = useState([])
  const navigate = useNavigate()
  const {
    onUpdateProgram,
    program,
    shopId
  } = useProgram({ programId });
  const [title, setTitle] = React.useState('');
  const [editorState, setEditorState] = React.useState('');
  const [type, setType] = React.useState('');
  const [titleErr, setTitleErr] = React.useState('');
  const [typeErr, setTypeErr] = React.useState('');
  const [field, setField] = React.useState('')
  const [fieldErr, setFieldErr] = React.useState('')

  const onEditorChange = (editorState) => {
    setEditorState(editorState)
  }

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const onTypeChange = (e) => {
    setType(e.target.value)
  }
  const onFieldChange = (e) => {
    setField(e.target.value)
  }

  const handleToggle = (itemId) => {

    const currentIndex = moduleIds.indexOf(itemId);
    const newChecked = [...moduleIds];

    if (currentIndex === -1) {
      newChecked.push(itemId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setModuleIds(newChecked);
  };

  React.useEffect(() => {
    if (program) {
      setTitle(program.name)
      setType(program.type)
      setField(program.field)
      for (let i = 0; i <= program.products.length; i++) {
        moduleIds.push(program.products[i]?._id)
      }
      if (program?.program_content) {
        const html = program?.program_content;
        const contentBlock = convertFromHTML(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState)
        }
      }

    }

  }, [program]);


  const onSubmit = async () => {

    if (type == "" || type == null) {
      setTypeErr("Please select type")
    } else if (title == "" || title == null) {
      setTitleErr("Please enter program title")
    } else if (field == "" || field == null) {
      setFieldErr("Please select Field of study")
    } else {
      const text = editorState?.getCurrentContent()?.getPlainText('\u0001')
      data = { type: type, field: field, title: title, description: text, modules: moduleIds, id: programId }
      try {
        await onUpdateProgram({
          program: data
        })
        navigate('/myprograms')
        setTitleErr('');
        setTypeErr("");
        setFieldErr("");
        onClose()

        toast.success('updated successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {

      }
    }


  }

  return (
    <JumboCardQuick
      title={
        <Typography
          component={"div"}
          sx={{
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
              flexWrap: 'wrap'
            }
          }}
        >Program</Typography>
      }
      action={
        <Button variant="contained" onClick={onSubmit}> Save</Button>
      }
      headerSx={{
        borderBottom: 1,
        borderBottomColor: 'divider',
        '& .MuiCardHeader-action': {
          my: -.75
        }
      }}
      wrapperSx={{
        p: 0,
        '&:last-child': {
          pb: 2
        },
        '& .MuiCollapse-entered:last-child': {
          '& .MuiListItemButton-root': {
            borderBottom: 0,
            borderBottomColor: 'transparent',
          }
        }
      }}
    >

      <JumboScrollbar
        autoHeight
        autoHeightMin={447}
        autoHide
        autoHideDuration={200}
        autoHideTimeout={500}
      >
        <ProgramPageTab
          handleToggle={handleToggle}
          onEditorChange={onEditorChange}
          onTitleChange={onTitleChange}
          onTypeChange={onTypeChange}
          onFieldChange={onFieldChange}
          fieldErr={fieldErr}
          editorState={editorState}
          title={title}
          titleErr={titleErr}
          type={type}
          field={field}
          typeErr={typeErr}
          program={program}
          moduleIds={moduleIds}
        />
      </JumboScrollbar>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </JumboCardQuick>
  )
}
