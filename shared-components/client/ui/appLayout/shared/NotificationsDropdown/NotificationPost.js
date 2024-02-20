import React from 'react';
import {notificationIcons} from "./notificationIcons";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import {Typography} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import {getDateElements} from "@jumbo/utils";
import Span from "@jumbo/shared/Span";
import {useNavigate } from 'react-router-dom';
import { Meteor } from "meteor/meteor";

const { filesBaseUrl } = Meteor.settings.public;


const NotificationPost = ({item,handleClose}) => {
    
const navigate= useNavigate()

let imageSrc = (item?.from?.userMedia) ? item?.from?.userMedia[0]?.URLs?.thumbnail : '';

if (imageSrc === String(null)) return null;

if (imageSrc) {
    imageSrc = `${filesBaseUrl}${imageSrc}`;
} else {
    imageSrc = "";
}

    const viewPost=()=>{
        navigate(`/notifications/${item.id}/notification`)
        handleClose()
    }
    return (
        <ListItemButton component={"li"} alignItems={"flex-start"} onClick={viewPost}>
            <ListItemAvatar>
                <Avatar src={imageSrc} alt={item?.from?.name}/>
            </ListItemAvatar>
            <ListItemText>
                <Link underline={"none"} to={`/notifications/${item.id}`}>{item?.from?.name}</Link> has recently messaged you
                <Typography component="span" sx={{
                    display: 'flex',
                    fontSize: '90%',
                    mt: .5,
                }}>
                    {notificationIcons['POSTING']}
                    <Span sx={{color: 'text.secondary', ml: 1}}>{getDateElements(item.date).time}</Span>
                </Typography>
            </ListItemText>
        </ListItemButton>
    );
};

export default NotificationPost;
