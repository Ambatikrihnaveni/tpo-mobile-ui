import React, { useState } from 'react';
import JumboContentLayout from "@jumbo/components/JumboContentLayout";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import { Card, useMediaQuery } from "@mui/material";
import useChatApp from '../../../../../../client/ui/appLayout/pages/apps/chat/hooks/useChatApp';
import ProgramListViewSlider from './ProgramListViewSlider';
import ProgramListViewSidebar from './ProgramListViewSidebar';
const ProgramListViewLayout = ({ data }) => {

    const { theme } = useJumboTheme();
    const { activeConversation } = useChatApp();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const defaultProducts = (data?.products) ? data?.products[0] : '';
    const [products, setProducts] = useState(defaultProducts)
    const defaultLesson = (data?.products?.lessonsDuration?.lesson) ? data?.products[0]?.lessonsDuration[0]?.lesson[0] : {};
    const [lessons, setLessons] = useState(defaultLesson)
    const [isOpen, setIsOpen] = useState(true);

    const click = () => {
        setIsOpen(!isOpen);
    };

    const onProducts = (productData) => {
        setLessons(productData);
    }
    const onLesson = (lessonData) => {

        setLessons(lessonData);
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
        <JumboContentLayout
            sidebar={
                <ProgramListViewSidebar data={data} onProducts={onProducts} onLesson={onLesson} click={click} isOpen={isOpen} />
            }
            sx={{
                border: 'none',
                width: isOpen ? '300px' : '0',
            }}
        >
            <ProgramListViewSlider lessons={lessons} />
        </JumboContentLayout>
    );
};

export default ProgramListViewLayout;
