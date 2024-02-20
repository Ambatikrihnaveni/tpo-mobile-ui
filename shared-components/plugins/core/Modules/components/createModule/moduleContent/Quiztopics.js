import React, { useState } from 'react';
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import { Card, useMediaQuery, Button, Drawer, IconButton, Divider } from "@mui/material";
import Div from '../../../../../../client/ui/@jumbo/shared/Div';
import useChatApp from '../../../../../../client/ui/appLayout/pages/apps/chat/hooks/useChatApp';
import MenuIcon from '@mui/icons-material/Menu';
import QuizSlider from './QuizSlider';

const QuizTopics = ({ module }) => {

    const { theme } = useJumboTheme();
    const { activeConversation } = useChatApp();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const defaultLesson = (module?.lessons) ? module?.lessons[0] : '';
    const [lesson, setLesson] = useState(defaultLesson)
    const [isOpen, setIsOpen] = useState(true);
    const [open, setOpen] = useState(false)

    const click = () => {
        setIsOpen(!isOpen);
        setOpen(!open)
    };

    const toggleDrawer = () => {
        setOpen(true)
        setIsOpen(true);
    }
    const onLesson = (lessonData) => {
        setLesson(lessonData);
    }

    const onNextLesson = () => {
        for (let i = 0; i < module.lessons.length; i++) {
            if (module.lessons[i]._id == lesson._id) {
                setLesson(module.lessons[i + 1])
            }

        }
    }

    const onPreLesson = () => {
        for (let i = 0; i < module.lessons.length; i++) {
            if (module.lessons[i]._id == lesson._id) {
                setLesson(module.lessons[i - 1])
            }

        }
    }

    const layoutOptions = React.useMemo(() => ({
        sidebar: {
            sx: (md && activeConversation) ? { display: 'none' } : {
                width: 280,
                marginRight: 0,
                borderRight: 1,
                borderRightColor: theme => theme.palette.divider,
                [theme.breakpoints.down('md')]: {
                    width: 'auto',
                    border: 'none',
                },
            }
        },
        wrapper: {
            component: Card,
            sx: {
                [theme.breakpoints.down('md')]: {
                    flexDirection: 'column'
                },
            }
        },
    }), [theme, md, activeConversation]);
    return (
        <Div>
            <Div sx={{ display: { xs: 'block', sm: 'none' } }}>
                <IconButton color="primary" onClick={toggleDrawer} sx={{ display: open ? 'none' : 'block', marginTop: '40px' }}>
                    <MenuIcon />
                </IconButton>
                <Drawer
                    sx={{ height: '100%' }}
                    variant="persistent"
                    anchor='left'
                    open={open}
                    onClose={() => { setOpen(false) }}
                >
                </Drawer>
            </Div>

            <Div>
                <QuizSlider lesson={lesson} module={module} onLesson={onLesson} />
                <div direction="row" spacing={2} style={{ textAlign: "center", marginTop: "13px" }}>

                    <Button
                        variant="contained"
                        onClick={onPreLesson}

                    >
                        Back
                    </Button>

                    &nbsp;&nbsp;

                    <Button
                        variant="contained"
                        key={0}
                        onClick={onNextLesson}

                    >
                        Next
                    </Button>
                </div>
            </Div>

        </Div>
    );
};

export default QuizTopics;
