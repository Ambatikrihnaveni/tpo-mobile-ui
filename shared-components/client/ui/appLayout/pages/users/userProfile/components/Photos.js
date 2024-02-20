import React, { useState } from 'react';
import List from "@mui/material/List";
import { ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import GitHubIcon from '@mui/icons-material/GitHub';
import styled from "@emotion/styled";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { getAssetPath } from "../../../../utils/appHelpers";
import useAuth from '../../../../../hooks/useAuth';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    fontSize: 24,
    height: 48,
    width: 48,
    borderRadius: '50%',
    backgroundColor: '#dfeff5',
    minWidth: 42,
    marginRight: 16,
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    border: `solid 1px ${theme.palette.divider}`
}));

const iconColors = {
    instagram: '#C13584',
    facebook: '#1877F2',
    youtube: 'red',
    github: 'purple',
    pinterest: '#BD081C',
    linkedin:'#42b0f5'
};

const Photos = () => {
    
    const [instagram, setInstagram] = React.useState('')
    const [facebook, setFacebook] = React.useState('')
    const [youtube, setYoutube] = React.useState('');
    const [github, setGithub] = React.useState('');
    const [pinterest, setPinterest] = React.useState('');
    const [linkedin, setLinkedIn] = React.useState('')

    const { viewer } = useAuth()
    const socialMediaLinks= viewer?.profile?.socialMediaLinks
    React.useEffect(() => {

        const instagrams = []
        const facebooks = []
        const githubs = []
        const linkedins = []
        const pinterests = []
        const youtubes = []
        for (i = 0; i <  socialMediaLinks?.length; i++) {
            if ( socialMediaLinks[i].socialMediaAccount === 'Instagram') {
                instagrams.push( socialMediaLinks[i].link)
            }
            if ( socialMediaLinks[i].socialMediaAccount === 'Facebook') {
                facebooks.push( socialMediaLinks[i].link);
            }
            if ( socialMediaLinks[i].socialMediaAccount === "GitHub") {
                githubs.push( socialMediaLinks[i].link);
            }
            if ( socialMediaLinks[i].socialMediaAccount === 'LinkedIn') {
                linkedins.push( socialMediaLinks[i].link)
            }
            if ( socialMediaLinks[i].socialMediaAccount === 'Pinterese') {
                pinterests.push( socialMediaLinks[i].link)
            }
            if ( socialMediaLinks[i].socialMediaAccount === 'Youtube') {
                youtubes.push( socialMediaLinks[i].link)
            }
        }
        setInstagram(instagrams[0])
        setFacebook(facebooks[0])
        setYoutube(youtubes[0]);
        setGithub(githubs[0]);
        setPinterest(pinterests[0]);
        setLinkedIn(linkedins[0])
    }, [ socialMediaLinks]);
    return (
        <JumboCardQuick title={"Social"} noWrapper wrapperSx={{ pt: 0 }} style={{ minHeight: '150px' }} >
            {socialMediaLinks?.length >0 ?
            (<List
                disablePadding
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: theme => theme.spacing(0, -2),
                    marginLeft: '15px'
                }}
            >
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '100%' }
                    }}
                >
                    <StyledListItemIcon>
                        <InstagramIcon fontSize={"inherit"} style={{ color: iconColors.instagram }} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography color="text.primary">
                            Instagram</Typography>}
                        secondary={<a href={`${instagram?.startsWith('http://') ? instagram : 'http://' + instagram}`} target='_blank' >{instagram}</a>}
                        />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '100%' }
                    }}
                >
                    <StyledListItemIcon>
                        <FacebookOutlinedIcon fontSize={"inherit"} style={{ color: iconColors.facebook }} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography color="text.primary">
                            Facebook</Typography>}
                        secondary={<a href={`${facebook?.startsWith('http://') ? facebook : 'http://' + facebook}`} target='_blank'>{facebook}</a>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '100%' }
                    }}
                >
                    <StyledListItemIcon>
                        <YouTubeIcon fontSize={"inherit"} style={{ color: iconColors.youtube }} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography color="text.primary">
                            Youtube</Typography>}
                       secondary={<a href={`${youtube?.startsWith('http://') ? youtube : 'http://' + youtube}`} target='_blank'>{youtube}</a>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '100%' }
                    }}
                >
                    <StyledListItemIcon>
                        <PinterestIcon fontSize={"inherit"} style={{ color: iconColors.pinterest }} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography color="text.primary">
                            Pinterest</Typography>}
                        secondary={<a href={`${pinterest?.startsWith('http://') ? pinterest : 'http://' + pinterest}`} target='_blank'>{pinterest}</a>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '100%' }
                    }}
                >
                    <StyledListItemIcon>
                        <LinkedInIcon fontSize={"inherit"} style={{ color: iconColors.linkedin }} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography color="text.primary">
                            LinkedIn</Typography>}
                        secondary={<a href={`${linkedin?.startsWith('http://') ? linkedin : 'http://' + linkedin}`} target='_blank'>{linkedin}</a>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '100%' }
                    }}
                >
                    <StyledListItemIcon>
                        <GitHubIcon fontSize={"inherit"} style={{ color: iconColors.github }} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography color="text.primary" >
                            GitHub</Typography>}
                        secondary={<a href={`${github?.startsWith('http://') ? github : 'http://' + github}`} target='_blank' >{github}</a>}
                    />
                </ListItem>
            </List>):
            (<Typography style={{verticalAlign:'center',textAlign:'center',marginTop:'60px',marginBottom:'60px'}}> No data available</Typography>)
                }
        </JumboCardQuick>
    );
};

export default Photos;
