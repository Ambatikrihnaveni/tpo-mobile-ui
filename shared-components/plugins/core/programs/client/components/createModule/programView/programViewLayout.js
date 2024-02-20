import React, { useState } from 'react';
import JumboContentLayout from "@jumbo/components/JumboContentLayout";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import { Card, useMediaQuery, Button, IconButton, Drawer } from "@mui/material";
import ProgramViewSlider from './programViewSlider';
import ProgramViewSidebar from './programViewSidebar';
import useChatApp from '../../../../../../../client/ui/appLayout/pages/apps/chat/hooks/useChatApp';
import Div from "@jumbo/shared/Div";
import MenuIcon from '@mui/icons-material/Menu';

const ProgramViewLayout = ({ data }) => {
    ;
    const { theme } = useJumboTheme();
    const { activeConversation } = useChatApp();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const defaultProducts = (data?.products) ? data?.products[0] : '';
    const [products, setProducts] = useState(defaultProducts)
    const defaultLesson = (data?.products[0]?.lessonsDuration[0]?.lesson) ? (data?.products[0]?.lessonsDuration[0]?.lesson[0]) : {};
    const [lessonsDuration, setLessonsDurations] = useState(data?.products[0]?.lessonsDuration[0])
    const [lessons, setLessons] = useState(defaultLesson)
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
    const onProducts = (productData) => {
        setProducts(productData);
        setLessons(productData?.lessonsDuration[0]?.lesson[0])
    }
    const onLesson = (lessonData) => {

        setLessons(lessonData);
    }

    const onNextLesson = () => {
        
        for (let i = 0; i < data.products.length; i++) {
            if (data.products[i]?._id == products?._id) {

                for (let x = 0; x < data.products[i].lessonsDuration?.length; x++) {
                    // let lessonsDuration = module.lessonsDuration[i]
                    for (let y = 0; y < data.products[i].lessonsDuration[x]?.lesson.length; y++) {
                        if (data.products[i].lessonsDuration[x]?.lesson[y]._id == lessons?._id) {
                            if (data.products[i].lessonsDuration[x]?.lesson?.length > 1) {
                                if (data.products[i].lessonsDuration[x]?.lesson?.length == y + 1) {
                                    setLessons(data.products[i].lessonsDuration[x + 1]?.lesson[0])
                                    setLessonsDurations(data.products[i].lessonsDuration[x])
                                } else {
                                    setLessons(data.products[i].lessonsDuration[x]?.lesson[y + 1])
                                    setLessonsDurations(data.products[i].lessonsDuration[x])

                                }
                            } else {
                                setLessons(data.products[i].lessonsDuration[x + 1]?.lesson[0])
                                setLessonsDurations(data.products[i].lessonsDuration[x])
                            }
                        }
                    }
                }

            }
        }
    }

    const onPreLesson = () => {
        ;
        for (let i = 0; i < data.products.length; i++) {
            if (data.products[i]?._id == products?._id) {

                for (let x = 0; x < data.products[i].lessonsDuration?.length; x++) {
                    // let lessonsDuration = module.lessonsDuration[i]
                    for (let y = 0; y < data.products[i].lessonsDuration[x]?.lesson.length; y++) {
                        if (data.products[i].lessonsDuration[x]?.lesson[y]._id == lessons?._id) {

                            if (data.products[i].lessonsDuration[x]?.lesson?.length > 1) {
                                if (y == 0) {
                                    let lessonLength = data.products[i].lessonsDuration[x - 1]?.lesson.length
                                    setLessonsDurations(data.products[i].lessonsDuration[x])
                                    setLessons(data.products[i].lessonsDuration[x - 1]?.lesson[lessonLength - 1])
                                } else {
                                    setLessonsDurations(data.products[i].lessonsDuration[x])
                                    setLessons(data.products[i].lessonsDuration[x]?.lesson[y - 1])
                                }
                            } else {
                                setLessonsDurations(data.products[i].lessonsDuration[x])
                                setLessons(data.products[i].lessonsDuration[x - 1]?.lesson[0])
                            }

                        }
                    }

                }

            }
        }
    }

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
                    <ProgramViewSidebar data={data} onProducts={onProducts} onLesson={onLesson} click={click} isOpen={isOpen} lessons={lessons} />
                </Drawer>
            </Div>
            <JumboContentLayout
                sidebar={
                    <ProgramViewSidebar data={data} onProducts={onProducts} onLesson={onLesson} click={click} isOpen={isOpen} lessons={lessons} />
                }
                sx={{
                    border: 'none',
                    width: isOpen ? '300px' : '0',

                }}
            >
                <ProgramViewSlider lessons={lessons} data={data} onLesson={onLesson} click={click} isOpen={isOpen} />

                <Div>
                    <div direction="row" spacing={2} style={{ textAlign: "center", marginTop: "13px" }}>

                        <Button
                            variant="contained"
                            onClick={onPreLesson}
                            disabled={lessons === (products?.lessonsDuration[0].lesson[0])}
                        >
                            Back
                        </Button>

                        &nbsp;&nbsp;

                        <Button
                            variant="contained"
                            key={0}
                            onClick={onNextLesson}
                            disabled={lessons === (products?.lessonsDuration?.length > 1 ? (products?.lessonsDuration[products?.lessonsDuration.length - 1].lesson.length > 1 ? (products?.lessonsDuration[products?.lessonsDuration.length - 1].lesson.length - 1) : (products?.lessonsDuration[products?.lessonsDuration.length - 1].lesson[0])) : (lessonsDuration.lesson.length > 1) ? lessonsDuration?.lesson[lessonsDuration?.lesson.length - 1] : lessonsDuration?.lesson[0])}
                        >
                            Next
                        </Button>
                    </div>
                </Div>

            </JumboContentLayout>
        </Div>
    );
};

export default ProgramViewLayout;
