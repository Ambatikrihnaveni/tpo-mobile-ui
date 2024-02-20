import React, {useCallback} from 'react';
import ReactDOM from "react-dom";
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import Fab from "@mui/material/Fab";
import useApp from "/imports/client/ui/appLayout/hooks/useApp";

const ChatButton = () => {
    const {chatWidgetVisibility, setChatWidgetVisibility} = useApp();

    const toggleCustomizerVisibility = useCallback(() => {
        
        setChatWidgetVisibility(!chatWidgetVisibility)
    }, [setChatWidgetVisibility, chatWidgetVisibility]);
    return (
        ReactDOM.createPortal(
            <Fab
                size={"medium"}
                color="primary"
                aria-label="add"
                onClick={toggleCustomizerVisibility}
                sx={{
                    position: "fixed",
                    top: '90%',
                    right: 20,
                    zIndex: 101,
                    width: 60,
                    height: 55,
                    p: theme => theme.spacing(1, 1, 1, 1.5),
                    borderRadius: '15px',
                    backgroundImage: theme => `linear-gradient(-135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,

                    '&:hover': {
                        backgroundImage: theme => `linear-gradient(-135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                    }
                }}>
                <ChatTwoToneIcon />
            </Fab>,
            document.getElementsByTagName('body')[0]
        )
    );
};

export default ChatButton;