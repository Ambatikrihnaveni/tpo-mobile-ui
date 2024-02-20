import React from 'react';
import Drawer from "@mui/material/Drawer";
import Div from "@jumbo/shared/Div";
import useApp from "/imports/client/ui/appLayout/hooks/useApp";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ChatBot from './components/ChatBot';

const ChatWidget = () => {
    const { chatWidgetVisibility, setChatWidgetVisibility } = useApp();
    return (
        <Drawer
            anchor={"right"}
            open={chatWidgetVisibility}
            onClose={() => setChatWidgetVisibility(false)}
            sx={{
                zIndex: (theme) =>
                Math.max.apply(Math, Object.values(theme.zIndex)) + 1,

                '& .MuiDrawer-paper': {
                    width: '32%',
                    height: '97%',
                    borderRadius: '15px',
                    marginTop:2,
                    marginRight: 3,
                    backgroundColor: 'rgb(234, 238, 243)'


                }
            }}
        >
            <Div
                sx={{
                    display: 'flex',
                    minWidth: 0,
                    position: 'relative',
                    zIndex: 2,
                    p: theme => theme.spacing(1.5, 3),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: 25,
                    backgroundColor: 'white'
                }}
            >    <Div style={{ display: "flex", alignItems: "center" }}>
                    <img src="/logo192.png" alt="TPO.AILogo" style={{ marginRight: "20px", width: '100px', height: '30px', aspectRatio: 'auto 100/30' }} />
                    <Typography variant={"h3"} mb={0} style={{
                        fontWeight: 'bold', fontSize: 25, background: 'linear-gradient(#03ce97, #00619a)',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color': 'transparent',
                        fontFamily:"CustomFont" , fontStyle:'italic'
                    }}>Ask - Learn</Typography>
                </Div>
                <IconButton aria-label="close" onClick={() => setChatWidgetVisibility(false)}>
                    <CloseIcon />
                </IconButton>
            </Div>
            <ChatBot />
        </Drawer>
    );
};

export default ChatWidget;
