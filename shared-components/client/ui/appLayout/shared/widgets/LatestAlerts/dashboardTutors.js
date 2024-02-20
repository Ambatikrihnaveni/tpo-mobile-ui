import React from 'react';
import Chip from "@mui/material/Chip";
import { CardActions, Link } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import Divider from "@mui/material/Divider";
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Span from "@jumbo/shared/Span";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import { useTranslation } from "react-i18next";
import MessagesList from "./components/FeedMessages/MessagesList";
import FeedsList from "./components/FeedsList";
import InvitationsList from "./components/InvitationsList";
import { useNavigate } from 'react-router-dom';
import TutorsService from '../../../../graphql/services/tutors/tutors-service';
import useCurrentShopId from '../../../../hooks/useCurrentShopId';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';
import { getDateElements } from "@jumbo/utils";
import moment from 'moment';


const NotificationListComponents = {
    "MESSAGES": MessagesList,
    "FEEDS": FeedsList,
    "INVITATIONS": InvitationsList
};
const { filesBaseUrl } = Meteor.settings.public;

const DashboardTutors = ({ scrollHeight }) => {

    const { shopId } = useCurrentShopId()
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [tutors, setTutors] = React.useState([])
    const [value, setValue] = React.useState("notification");
    const [tutorStatus, setTutorStatus] = React.useState(false)



    React.useEffect(async () => {

        const tutorsData = await MyDashboardService.dashbordTutors(shopId)
        if (tutorsData) {

            const pendingTutors = tutorsData.filter(tutor => tutor?.profile?.isStatus === "Pending");

            setTutors(pendingTutors)
        }

    }, [shopId, tutorStatus])



    const handleSeeMoreClick = () => {
        navigate('/tutors');
    };

    const onAccept = async (tutor) => {

        const input = { userId: tutor.userId, shopId: shopId, status: "Approved" }
        const data = await TutorsService.updateStatus(input)
        setTutorStatus(!tutorStatus)
    }

    const onReject = async (tutor) => {

        const data = await TutorsService.updateStatus({ userId: tutor.userId, shopId: shopId, status: "Reject" })
        setTutorStatus(!tutorStatus)

    }


    const showtutorDetail = React.useCallback((tutor) => {
        navigate(`/${tutor?._id}/viewprofile`)

    }, []);



    return (
        <JumboCardQuick
            noWrapper
            title={
                <span style={{ fontWeight: 'bold' }}>{t('Registered Tutors')}</span>
            }
            action={<Chip size={"small"} label={`${(tutors?.length > 0) ? tutors.length : 0} New`} color={"secondary"} />}
        >
            <TabContext value={value}>


                <Divider sx={{ width: "100%", backgroundColor: '#7352c7', height: "2px" }} />

                <TabPanel value="notification" sx={{ p: 0 }}>
                    <JumboScrollbar
                        autoHeight
                        autoHeightMin={scrollHeight ? scrollHeight : 448}
                        autoHide
                        autoHideDuration={200}
                        InvitationsList autoHideTimeout={500}
                    >
                        {tutors.length > 0 ? (
                            tutors.map((tutor, index) => (
                                <ListItem alignItems={"flex-start"} sx={{ px: 3 }} key={tutor.userId}>
                                    <ListItemAvatar sx={{ minWidth: 65 }}>
                                        <Avatar sx={{ width: 52, height: 52, boxShadow: 1 }} alt={tutor.name}
                                            src={`${filesBaseUrl}${tutor?.userMedia[0]?.URLs?.thumbnail}`} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                variant={"h6"}
                                                color={"text.secondary"}
                                            >
                                                {getDateElements(tutor.createdAt).time} &nbsp;
                                                {moment(tutor?.createdAt).format("MMMM DD, YYYY")}

                                            </Typography>
                                        }
                                        secondary={
                                            <Typography component={"div"}>
                                                <Typography color={"text.primary"} mb={2}>
                                                    <Span sx={{ color: 'primary.main', cursor: 'pointer', }} onClick={() => showtutorDetail(tutor)}>{tutor.name} </Span>
                                                    {"has applied to join as a tutor, review now"}
                                                </Typography>
                                                <Stack direction={"row"} spacing={1}>
                                                    <Button variant={"contained"} size={"small"} onClick={() => onAccept(tutor)}>Accept</Button>
                                                    <Button variant={"contained"} color={"inherit"} size={"small"} onClick={() => onReject(tutor)}>Reject</Button>
                                                </Stack>
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant="body2" sx={{ margin: 'auto', textAlign: 'center', marginTop: '50px' }}>
                                {t('No Data available.')}
                            </Typography>
                        )}
                    </JumboScrollbar>
                </TabPanel>

            </TabContext>
            <Divider />
            <CardActions sx={{ py: theme => theme.spacing(1.5) }}>
                <Link href={"#/"} underline={"none"} lineHeight={1.2} onClick={handleSeeMoreClick} style={{ color: '#f27474' }}> More</Link>
            </CardActions>
        </JumboCardQuick>
    );
};

export default DashboardTutors;
