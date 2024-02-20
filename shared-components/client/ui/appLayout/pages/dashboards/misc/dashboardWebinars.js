import React, { useState } from 'react'
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import { useMutation, useQuery } from "@apollo/react-hooks";
import useCurrentShopId from '../../../../hooks/useCurrentShopId';
import { Avatar, Typography, } from "@mui/material";
import Button from "@mui/material/Button";
import useAuth from '../../../../hooks/useAuth';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';
import acceptedWebinar from '../../../../graphql/services/webinarservices/mutations/acceptedWebinar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardContent, IconButton } from '@mui/material';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function DashboardWebinars() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: window.innerWidth >= 768 ? 3 : 1,  // Adjust this based on screen width
    slidesToScroll: 1,
    prevArrow: <ArrowBackIosNewIcon color="primary" sx={{ fontSize: '25px', fontWeight: "600" }} />,
    nextArrow: <ArrowForwardIosIcon color="primary" sx={{ fontSize: '25px', fontWeight: "600" }} />
  };

  const { shopId } = useCurrentShopId()
  const [userShopId, setUserShopId] = React.useState(shopId !== "undefined" ? shopId : null);
  const today = new Date().toISOString().split('T')[0];
  const [deniedEvents, setDeniedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [todayEvents, setTodayEvents] = useState([])
  const { viewer } = useAuth()
  const [acceptWebinarMutation] = useMutation(acceptedWebinar);

  React.useEffect(async () => {
    if (viewer?.role != "Master-Admin") {
      const queryData = await MyDashboardService.getEvents(shopId);

      if (queryData) {
        const currentDate = new Date();
        let filteredEvents = queryData.filter((event) => event.deny !== true);
        filteredEvents = filteredEvents.filter(event => new Date(event.date) >= currentDate);

        setTodayEvents(filteredEvents);
      }

    }
  }, [userShopId,deniedEvents] )

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const handleDenyClick = async (eventTitle, eventId) => {
    setDeniedEvents([...deniedEvents, eventTitle]);
    try {
      await acceptWebinarMutation({
        variables: {
          input: {
            id: eventId,
            userId: viewer?._id,
            deny: true,
            accept: false
          }
        }

      })
    } catch (error) {
      console.log(error)
    }
  };

  const handleAcceptClick = async (eventTitle, eventId) => {
    setJoinedEvents([...joinedEvents, eventTitle]);
    try {
      await acceptWebinarMutation({
        variables: {
          input: {
            id: eventId,
            userId: viewer?._id,
            deny: false,
            accept: true
          }
        }

      })
    } catch (error) {
      console.log(error)
    }
  };

  const handleJoinClick = (eventUrl) => {
    window.open(eventUrl, '_blank');
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (

    <>
      {todayEvents && todayEvents.length > 0 && (
        <div style={{ background: 'linear-gradient(90deg, rgba(1, 112, 153, 0.7) 0%, rgba(3, 202, 151, 0.7) 100%)', padding: '5px', minHeight: '100px', maxHeight: '400px' }}>
          {/*           <Typography variant='h2' fontWeight={"bold"} color="white">Webinars</Typography>
 */}
          {todayEvents.length >= 3 ? (
            <Slider {...settings}>
              {todayEvents
                .filter(webinar => !deniedEvents.includes(webinar.title))
                .map(webinar => {
                  const isEventJoined = joinedEvents.includes(webinar.title);
                  return (
                    <div key={webinar.id} >
                      <Card key={webinar.id} sx={{
                        minWidth: 150, margin: '10px', maxHeight: '200px', boxShadow: '4px 4px 4px', backgroundColor: '#F5F7FA',
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 21,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                      }} marginLeft={6}>
                        <CardContent>
                          <div style={{ display: 'flex', marginBottom: '15px' }}>
                            <Avatar alt="Remy Sharp" sx={{ width: 52, height: 52, boxShadow: 1, marginRight: '10px' }} />
                            <Typography variant="h5" component="div" style={{ fontWeight: 'bold', marginTop: '10px' }}>
                              {truncateText(webinar.title, 100)}
                            </Typography>
                          </div>
                          <div style={{ paddingBottom: '7px' }}>

                            <Typography
                              variant="body2"
                              style={{ color: "#2E475D" }}
                              marginBottom={1.5}
                              dangerouslySetInnerHTML={{ __html: truncateText(webinar.description, 50) }}
                            />                  </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography fontSize={"12px"} variant={"body1"} fontWeight={"bold"} color='#2e475d'>
                              <CalendarTodayOutlinedIcon
                                size="small"
                                sx={{ verticalAlign: 'middle', fontSize: '0.7rem', mt: -.25, }} color="#2e475d" /> {formatDate(webinar.date)}
                            </Typography>

                            <div>
                              {isEventJoined || webinar.accept === true ? (
                                <Button variant='contained' onClick={() => handleJoinClick(webinar.url)}>
                                  Join
                                </Button>
                              ) : (
                                <Button variant='contained' style={{ backgroundColor: '#5856d6' }} onClick={() => handleAcceptClick(webinar.title, webinar._id)}>
                                  Accept
                                </Button>
                              )}
                              <Button variant='contained' style={{ backgroundColor: '#D73E68', marginLeft: '10px' }} onClick={() => handleDenyClick(webinar.title, webinar._id)} >
                                Deny
                              </Button>
                            </div>
                          </div>

                        </CardContent>
                      </Card>
                    </div>
                  );
                })
              }
            </Slider>
          ) : (
            <div style={{ display: 'flex', gap: '20px' }}>
              {todayEvents
                .filter(webinar => !deniedEvents.includes(webinar.title))
                .map(webinar => {
                  const isEventJoined = joinedEvents.includes(webinar.title);

                  return (

                    <Card key={webinar.id} sx={{
                      minWidth: 200, margin: '10px', maxHeight: '200px', boxShadow: '4px 4px 4px', maxWidth: 450, backgroundColor: '#F5F7FA',
                      borderBottomLeftRadius: 5,
                      borderBottomRightRadius: 21,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                    }} marginLeft={6}>
                      <CardContent>
                        <div style={{ display: 'flex', marginBottom: '15px' }}>
                          <Avatar alt="Remy Sharp" sx={{ width: 52, height: 52, boxShadow: 1, marginRight: '10px' }} />
                          <Typography variant="h5" component="div" style={{ fontWeight: 'bold', marginTop: '10px' }}>
                            {truncateText(webinar.title, 100)}
                          </Typography>
                        </div>
                        <div style={{ paddingBottom: '7px' }}>
                          <Typography
                            variant="body2"
                            style={{ color: "#2E475D" }}
                            marginBottom={1.5}
                            dangerouslySetInnerHTML={{ __html: truncateText(webinar.description, 50) }}
                          />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography fontSize={"12px"} variant={"body1"} fontWeight={"bold"} color='#2e475d'>
                            <CalendarTodayOutlinedIcon
                              size="small"
                              sx={{ verticalAlign: 'middle', fontSize: '0.7rem', mt: -.25, }} color="#2e475d" /> {formatDate(webinar.date)}
                          </Typography>

                          <div>
                            {isEventJoined || webinar.accept === true ? (
                              <Button variant='contained' onClick={() => handleJoinClick(webinar.url)}>
                                Join
                              </Button>
                            ) : (
                              <Button variant='contained' style={{ backgroundColor: '#5856d6' }} onClick={() => handleAcceptClick(webinar.title, webinar._id)}>
                                Accept
                              </Button>
                            )}
                            <Button variant='contained' style={{ backgroundColor: '#D73E68', marginLeft: '10px' }} onClick={() => handleDenyClick(webinar.title, webinar._id)}>
                              Deny
                            </Button>
                          </div>
                        </div>

                      </CardContent>
                    </Card>

                  )
                })
              }
            </div>
          )}
        </div>

      )}
    </>
  )
}


