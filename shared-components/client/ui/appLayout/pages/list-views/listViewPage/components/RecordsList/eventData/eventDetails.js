import React from 'react'
import Div from '../../../../../../../@jumbo/shared/Div'
import { Typography, Grid, Button } from '@mui/material'
import { useParams } from 'react-router'
import { WebinarServicess } from '../../../../../../../graphql/services/webinarservices/webinarservices'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        maxWidth: 1000,
        margin: 'auto',
        marginTop: theme.spacing(4),
        backgroundImage: 'url("/webinar1.jpg")',
        backgroundSize: 'cover',
        padding: theme.spacing(3),
        borderRadius: theme.spacing(2),
    },
    content: {
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
    },
    details: {
        fontSize: 16,
        marginBottom: theme.spacing(2),
    },
    joinButton: {
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
}));
export default function EventDetails() {
    const params = useParams()
    const [eventData, setEventData] = React.useState({})
    const eventId = params

    React.useEffect(async () => {
        const data = await WebinarServicess.getWebinar(eventId?.eventId)
        setEventData(data)
    }, [])

    const classes = useStyles();


    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" className={classes.title} color={'white'}>
                    {eventData.title}
                </Typography>
                <Typography variant="body1" className={classes.details} color={'white'}>
                    <span dangerouslySetInnerHTML={{ __html: eventData.description }} />
                </Typography>
                <Typography variant="body1" className={classes.details} color={'white'}>
                    Date: {eventData.date} | Time: {eventData.startTime} - {eventData.endTime}
                </Typography>

                <Button variant="contained" className={classes.joinButton}>
                    Join Now
                </Button>
            </CardContent>
        </Card>

    )
}
