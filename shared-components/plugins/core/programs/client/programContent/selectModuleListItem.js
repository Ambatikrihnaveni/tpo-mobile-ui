import React from 'react';
import { alpha, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import { Schedule } from "@mui/icons-material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Chip from "@mui/material/Chip";
import { Meteor } from "meteor/meteor";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Span from "@jumbo/shared/Span";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";


const { filesBaseUrl } = Meteor.settings.public;

const SelectModuleListItem = ({ item }) => {
    
    const { theme } = useJumboTheme();
    const [currentSlide, setCurrentSlide] = React.useState(0);


    let imageSrc = item?.image;

    // If there is no img src, then render nothing
    if (imageSrc === String(null)) return null;

    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    } else {
        imageSrc = "";
    }
    return (
        <ListItemButton
            disableRipple
            alignItems="flex-start"
            sx={{
                p: 3,
                transition: 'all 0.2s',
                borderBottom: 1,
                borderBottomColor: 'divider',
                [theme.breakpoints.down('md')]: {
                    flexWrap: 'wrap'
                },
                '&:hover': {
                    boxShadow: `0 3px 10px 0 ${alpha('#000', 0.2)}`,
                    transform: 'translateY(-4px)',
                    borderBottomColor: 'transparent',
                }
            }}
        >
            <ListItemAvatar
                sx={{
                    width: 184,
                    mt: 0,
                    mr: 3,

                    [theme.breakpoints.down('md')]: {
                        width: '100%',
                        mr: 0,
                        mb: 3
                    }
                }}
            >
                <Carousel
                    width={'100%'}
                    showArrows={false}
                    showStatus={false}
                    //  onChange={updateCurrentSlide}
                    selectedItem={currentSlide}
                    showThumbs={false}
                    verticalSwipe={'natural'}
                >

                    <Avatar
                        src={imageSrc}
                        variant={"rounded"}
                        sx={{
                            width: '100%',
                            height: 128,
                            [theme.breakpoints.down('md')]: {
                                height: 320,
                            }
                        }}
                    />

                </Carousel>
            </ListItemAvatar>
            <ListItemText>
                <Typography component={"div"}>
                    {
                        item.availability === 'sale' ?
                            <Chip label={'For Sale'} size={'small'} color={'warning'} sx={{ mb: 1 }} />
                            : <Chip label={'For Rent'} size={'small'} color={"success"} sx={{ mb: 1 }} />
                    }
                    <Typography variant={"h4"} mb={1.25}>{item.title}</Typography>
                    <Typography
                        variant={"h6"}
                        color={'text.primary'}
                        mb={.5}
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                        }}>
                        <div dangerouslySetInnerHTML={{ __html: item.description }} /> </Typography>
                    <Typography variant={"body1"} color={"text.secondary"} mb={.5}>
                        lessons: <Span sx={{ color: 'text.primary', mr: 1 }}>{item?.lessons?.length}</Span>

                    </Typography>
                    <Stack color={'text.secondary'} direction={'row'} spacing={2} alignItems={"center"}>
                        <Span sx={{ display: 'inline-flex', fontSize: 13 }}><PersonOutlineOutlinedIcon
                            sx={{ fontSize: 16, mr: 1 }} />TPO.AI</Span>
                        <Span sx={{ display: 'inline-flex', fontSize: 13 }}><Schedule
                            sx={{ fontSize: 16, mr: 1 }} />12/05/2023</Span>
                    </Stack>
                </Typography>
            </ListItemText>

        </ListItemButton>
    );
};
/* Todo properties item prop */
export default SelectModuleListItem;
