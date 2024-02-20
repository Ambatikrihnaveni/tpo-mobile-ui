import { createBot } from "botui";
import React, { useEffect} from "react";
import { BotUI, BotUIAction, BotUIMessageList } from "@botui/react";
import AiServices from "/imports/client/ui/appLayout/services/ai-services";
import "./styles";
import { useCallback, useState } from "react";
import { BeatLoader } from "react-spinners";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Div from "@jumbo/shared/Div";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import SendIcon from '@mui/icons-material/Send';
import { IconButton, Typography } from "@mui/material";
import useAuth from "/imports/client/ui/hooks/useAuth";
import { useNavigate} from "react-router-dom";

const mybot = createBot();

export default ChatBot = () => {
  const [message, setMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isViewerLoading, viewer, data } = useAuth();
  const [user, setUser] = useState(viewer);
  const userdata = { ...viewer }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const onSubmit = useCallback(async () => {

    setIsSubmitting(true);
    setIsSubmitted(true)
  }, []);



  const onKeyDown = (event) => {
    const message = event.target.value.trim();
    if (event.key === 'Enter'&& message) {
      setIsSubmitting(true);
      setIsSubmitted(true)
    }
  };

  useEffect(async () => {
    if (message.length > 0 && isSubmitting) {
      mybot.message.add({
        text: message,
        human: true
      })
        .then(() => mybot.wait());
      setMessage("")
      const { data } = await AiServices.askQuestion(message);
      setAiResponse(data);
      mybot.next();
      mybot.message.add({ text: data });
      setIsSubmitting(false);
      setIsSubmitted(false)
    }
  }, [message, isSubmitting]);

  return (
    <BotUI bot={mybot}>
      <JumboScrollbar style={{
        height: "96%"
      }}
      >
        <Div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography className="typography" style={{ marginTop: '10px', marginLeft: '10px', fontSize: '18px' }}> Hello, Good Day</Typography>
          <Typography className="typography1" style={{ marginTop: '10px', marginLeft: '10px', fontSize: '18px' }}>What do you want to learn today?</Typography>
        </Div>
        <BotUIMessageList />

        <BotUIAction  />
      </JumboScrollbar>
      <Div
        sx={{
          display: "flex",
          Width: 19000,
          alignItems: "center",
          backgroundColor: '#fff',
          margin: '-43px 0px 0px 0px ',
          zIndex: 2,
          position: 'relative',
          justifyContent: 'space-between',
        }}
      >
        <TextField
          fullwidth
          value={message}
          placeholder={"Ask your question."}
          size={"large"}
          sx={{ flex: 1, "& fieldset": { border: 'none' }, }}
          disabled={isSubmitted}
          onKeyDown={onKeyDown}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button disabled={isSubmitted} sx={{ ml: 2 }} onClick={onSubmit}>
          {isSubmitting ? (
            <BeatLoader color="black" size={8} />
          ) : (

            <>
              <IconButton edge="end" color="inherit" aria-label="send" onClick={onSubmit} disabled={isSubmitted}>
                <SendIcon style={{ color: 'gray' }} />
              </IconButton>
            </>
          )}
        </Button>
      </Div>
      <Div style={{ backgroundColor: '#fff', textAlign: 'center', matginBottom: '5px', zIndex: 2 }}>
        <Typography >Powerd by  <span style={{ color: 'black', fontWeight: 'bold' }} > TPO.AI</span></Typography>
      </Div>
    </BotUI>
  );
};
