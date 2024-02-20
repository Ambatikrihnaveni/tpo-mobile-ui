import React, { useState } from 'react';
import JumboContentLayout from "@jumbo/components/JumboContentLayout";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import { Card, useMediaQuery, Button, Drawer, IconButton } from "@mui/material";
import Div from '../../../../../client/ui/@jumbo/shared/Div/Div';
import useChatApp from '../../../../../client/ui/appLayout/pages/apps/chat/hooks/useChatApp';
import ModuleViewSlider from './moduleViewSlider';
import ModuleViewSidebar from './moduleViewSidebar';
import MenuIcon from '@mui/icons-material/Menu';

const ModuleViewLayout = ({ module, onClose }) => {

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
                    <ModuleViewSidebar module={module} onLesson={onLesson} click={click} isOpen={isOpen} lesson={lesson} />
                </Drawer>
            </Div>
            <JumboContentLayout
                sidebar={
                    <ModuleViewSidebar module={module} onLesson={onLesson} click={click} isOpen={isOpen} lesson={lesson} />
                }
                sx={{
                    border: 'none',
                    width: isOpen ? '300px' : '0',
                }}
            >
                <Div>
                    <ModuleViewSlider lesson={lesson} module={module} onLesson={onLesson} onClose={onClose} />
                    <div direction="row" spacing={2} style={{ textAlign: "center", marginTop: "13px" }}>

                        <Button
                            variant="contained"
                            onClick={onPreLesson}
                            disabled={lesson === module?.lessons[0]}
                        >
                            Back
                        </Button>

                        &nbsp;&nbsp;

                        <Button
                            variant="contained"
                            key={0}
                            onClick={onNextLesson}
                            disabled={lesson === module?.lessons[module?.lessons?.length - 1]}
                        >
                            Next
                        </Button>
                    </div>
                </Div>
            </JumboContentLayout>
        </Div>
    );
};

export default ModuleViewLayout;
