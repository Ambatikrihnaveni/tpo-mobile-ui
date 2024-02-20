
import InfoIcon from '@mui/icons-material/Info';
import React, { useEffect, useState } from 'react';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { Grid, Typography } from '@material-ui/core';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AttachmentIcon from '@mui/icons-material/Attachment';

let Editor = () => <React.Fragment />;

const LessonForm = () => {
  //playback time
  const [value, setValue] = React.useState(dayjs('2022-04-07'));


  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    Editor = require('react-draft-wysiwyg').Editor;
    setEditorState(EditorState.createEmpty());
  }, []);

  return (
    <Grid>
      <Grid>
        <Typography variant={'h2'} style={{ marginBottom: "25px", background: "white" }} >
          Lesson
        </Typography>
      </Grid>
      <Grid>
        <Typography variant={'h3'} style={{ marginBottom: "25px" }}>
          Lesson Name
        </Typography>
        <Typography style={{ marginBottom: "5%" }}>
          <input type="text" style={{ width: "100%", padding: "10px", border: "none" }} placeholder="Draft Lesson" />
          <p><InfoIcon />  Lesson titles are  displayed publicaly wherever required.</p>
        </Typography>
        <Typography>
        </Typography>
      </Grid>
      <Grid style={{ marginBottom: "1%" }}>
        <Button variant="contained" component="label">
          Add Media
          <input hidden accept="image/*" multiple type="file" />
        </Button>
      </Grid>

      <JumboDemoCard>

        <Editor
          editorStyle={{
            width: '100%',
            minHeight: 100,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'lightgray',
          }}
          editorState={editorState}
          onEditorStateChange={editorState => setEditorState(editorState)}
        />

      </JumboDemoCard>
      <Grid>
        <p style={{ marginBottom: "10%" }}><InfoIcon />  The idea of a summary is a short text to prepare students for the activities within the topic or week.
          The text is shown on the course page underthe topic name. </p>
      </Grid>
      <Grid item xs={12} style={{ marginBottom: "5%" }}>
        <Typography variant={'h2'} style={{ marginBottom: "2%" }}>
          Feature image
        </Typography>
        {<JumboDemoCard
          title={"Upload button"}
          wrapperSx={{ backgroundColor: 'background.paper', pt: 10 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="contained" component="label">
              Upload Image
              <input hidden accept="image/*" multiple type="file" />
            </Button>
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </Stack>
        </JumboDemoCard>}
      </Grid>

      <Grid>
        <Typography variant={'h2'} style={{ marginBottom: "2%" }}>
          Video Source
        </Typography>
        <Typography style={{ marginBottom: "5%" }}>
          <input type="text" style={{ width: "100%", padding: "10px", border: "none" }} placeholder="HTML 5 (MP4)" />
        </Typography>
      </Grid>
      <Grid style={{ marginBottom: "5%" }}>
        <JumboDemoCard
          title={"Upload button"}
          wrapperSx={{ backgroundColor: 'background.paper', pt: 10 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="contained" component="label">
              Upload Video
              <input hidden accept="image/*" multiple type="file" />
            </Button>
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </Stack>
        </JumboDemoCard>
      </Grid>
      <Grid >
        <Typography style={{ marginBottom: "2%" }}> Video Playback Time </Typography>
        <Typography style={{ marginBottom: "3%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Stack spacing={3} >
              <Grid item xs={2} sm={2} lg={2}>
                <TimePicker
                  ampm={false}
                  openTo="hours"
                  views={['hours']}
                  inputFormat="HH"
                  mask="__"
                  label="Hours"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={2} sm={2} lg={2}>
                <TimePicker
                  ampmInClock
                  views={['minutes']}
                  inputFormat="mm"
                  mask="__"
                  label="Minutes"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={2} sm={2} lg={2}>
                <TimePicker
                  ampmInClock
                  views={['seconds']}
                  inputFormat="ss"
                  mask="__"
                  label="Seconds"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Stack>
          </LocalizationProvider>
        </Typography>

      </Grid>
      <Grid>
        <Typography style={{ marginBottom: "2%" }}> Upload exercise files to the Lesson</Typography>
      </Grid>

      <Grid>
        <Button variant="contained" component="label">
          <AttachmentIcon /> &nbsp; Upload Attachments
          <input hidden accept="image/*" multiple type="file" />
        </Button>
      </Grid>


    </Grid>
  );
};

export default LessonForm;