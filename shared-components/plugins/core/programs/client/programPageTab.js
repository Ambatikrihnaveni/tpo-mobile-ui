import React, { useEffect } from 'react';
import { Grid, Card, TextField, Box, Typography, Paper, Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material'
import Div from '../../../../client/ui/@jumbo/shared/Div';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams } from "react-router-dom"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from '@mui/material/styles';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import ModulesService from '../../../../client/ui/graphql/services/modules/modules-service'
import FormHelperText from "@mui/material/FormHelperText";
import ProgramMediaGallery from './components/createModule/programMediaGallery';
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import useProgram from './hooks/useProgram';
import Cards from "./components/createModule/Cards"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: '15px',
  color: theme.palette.text.secondary,

}));

let Editor = () => <React.Fragment />;


export default function ProgramPageTab(
  { handleToggle,
    onEditorChange,
    onTypeChange,
    onFieldChange,
    onTitleChange,
    title,
    type,
    moduleIds,
    titleErr,
    typeErr,
    editorState,
    program,
    fieldErr,
    field
  }) {

  const { shopId } = useProgram();
  const routeParams = useParams();
  const programId = routeParams.program_id
  const { theme } = useJumboTheme();
  const [modules, setModules] = React.useState([])
  const [tag, setTag] = React.useState([]);
  const [category, setCategory] = React.useState([]);


  let data = {};

  useEffect(async () => {

    const { modules } = await ModulesService.getRecords(shopId)

    setModules(modules);
    Editor = require('react-draft-wysiwyg').Editor;
  }, [])
  const tagHandleChange = (event) => {
    setTag(state => ([
      ...state,
      event.target.name
    ]));
  };
  const categoryHandleChange = (event) => {
    setCategory(state => ([
      ...state,
      event.target.name
    ]));
  };
  return (
    <Div sx={{ padding: "15px" }}>

      <Grid container spacing={2}>
        <Grid item xs={8} >
          <Card>
            <Item>
              <Typography sx={{ mb: 1 }}>Program type </Typography>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  size="small"
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  onChange={(e) => { onTypeChange(e) }}
                  required
                  error={typeErr.length == 0 ? false : true}
                // helperText={typeErr}
                >
                  <MenuItem value={"internships"}>Internships</MenuItem>
                  <MenuItem value={"courses"}>Courses</MenuItem>
                  <MenuItem value={"projects"}>Projects</MenuItem>
                </Select>
                {typeErr && <FormHelperText sx={{ color: "#ff3333" }}>{typeErr}</FormHelperText>}

              </FormControl>
              <Typography sx={{ mb: 1 }}>Field of study </Typography>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={field}
                  size="small"
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  onChange={(e) => { onFieldChange(e) }}
                  required
                  error={fieldErr.length == 0 ? false : true}
                // helperText={typeErr}
                >
                  <MenuItem value={"mechanical"}>Mechanical</MenuItem>
                  <MenuItem value={"computerScience"}>Computer Science</MenuItem>
                  <MenuItem value={"electronics"}>Electronics</MenuItem>
                  <MenuItem value={"it"}>IT</MenuItem>

                </Select>
                {fieldErr && <FormHelperText sx={{ color: "#ff3333" }}>{fieldErr}</FormHelperText>}

              </FormControl>
              <Typography sx={{ mb: 1 }}>Program title </Typography>
              <TextField
                fullWidth
                size='small'
                value={title}
                labe="Module title"
                onChange={(e) => { onTitleChange(e) }}
                error={titleErr.length == 0 ? false : true}
                helperText={titleErr}
                sx={{ mb: 4 }}
              />
              <Box sx={{ mb: 4, border: 1, borderColor: 'grey.500', p: 2, borderRadius: '15px', display: 'flex' }}>

                <ProgramMediaGallery
                  editable={true}
                  media={program?.programMedia}
                  programId={programId}
                  shopId={shopId}
                />

              </Box>
              <Div sx={{ mb: 2 }}>
                <Typography sx={{ mb: 1 }}>Program description</Typography>
                <Editor
                  editorStyle={{
                    width: '100%',
                    minHeight: 100,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'lightgray',
                  }}
                  editorState={editorState}
                  onEditorStateChange={editorState => onEditorChange(editorState)}
                />
              </Div>
            </Item>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <JumboDemoCard title={"Categories"}>
            <Div sx={{ flex: 1 }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Tags</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormGroup>
                      {tag.map((item) => (
                        <FormControlLabel
                          control={
                            <Checkbox value={item.tag} id={item.tag} onChange={tagHandleChange} name={item.tag} />
                          }
                          label={item.tag}
                        />
                      ))}


                    </FormGroup>
                    <FormHelperText><Button sx={{ textTransform: "none" }}>Add tag</Button></FormHelperText>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Categories</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormGroup>
                      {category.map((item) => (
                        <FormControlLabel
                          control={
                            <Checkbox value={item.category} id={item.category} onChange={categoryHandleChange} name={item.category} />
                          }
                          label={item.category}
                        />
                      ))}


                    </FormGroup>
                    <FormHelperText><Button sx={{ textTransform: "none" }}>Add category</Button></FormHelperText>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
            </Div>
          </JumboDemoCard>
        </Grid>
      </Grid>
      <Div sx={{ mt: 3 }}>
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
            >Selected modules</Typography>
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
            <Cards module={modules} handleToggle={handleToggle} moduleIds={moduleIds} />
          </JumboScrollbar>
        </JumboCardQuick>
      </Div>
    </Div>
  )
}
