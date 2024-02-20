import React from 'react'
import { Card, Grid, Typography, Divider, Tabs, Tab,Box,IconButton } from '@mui/material'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import StudentsList from './components/studentsList';
import AssignmentsList from './components/assignmentsList';
import TabPanel from './components/tabPannel';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentService from '../../../../graphql/services/assignment-services/assignmentServices';
import useAuth from '../../../../hooks/useAuth';
import MyProgramService from '../../../../graphql/services/programs/myProgram-services';
import Comments from './components/comments';


const options = ['complete', 'pending'];

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

export default function TutorCalendarEvents() {

    const {eventId:lessonId} = useParams()
    const {batchId}= useParams()
    const {viewer} = useAuth()
    const account_id = viewer?._id
    const shopId = localStorage.getItem('accounts:shopId')
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const navigate = useNavigate()
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [lessonStatus,setLessonStatus] = React.useState()
    const [value, setValue] = React.useState(0);
    const [calendarEvent,setCalendarEvent]= React.useState({})
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleMenuItemClick = async(option, index) => {
        
        setLessonStatus(option)
        let lessonIds = lessonId;
        let lessonStatus  = option;
        let batchID= calendarEvent.batchId;
        let programId='';
        let productId = calendarEvent.productId
        const data = await MyProgramService.updateLessonStatus(shopId, programId, batchID, productId, lessonIds, lessonStatus);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

React.useEffect(async()=>{

const data = await AssignmentService.getTutorCalendarEvent(account_id,batchId,lessonId)
if(data){
    setCalendarEvent(data)
    setLessonStatus(data.status)

}

},[])

    return (
        <Card sx={{ p: 2 }}>
            <Grid container >
                <Grid item xs={12} sm={8.5}>
                    <div style={{display:'flex', mb: 4,}}>
                    <IconButton sx={{ml:1,mr:1}} onClick ={()=>navigate(-1)}><ArrowBackIcon/></IconButton>
                    <Typography variant='h1' sx={{ ml: { sm: 2, md: 2 }, fontWeight: 'bold', textAlign: 'left',textTransform:'capitalize' }}>
                        {calendarEvent?.name}
                    </Typography>
                    </div>
                    <Grid container>
                        <Grid item xs={6} sm={4} md={3} sx={{ textAlign: 'center' }}>
                            <Typography sx={{ mb: 1, fontWeight: 'bold' }}>
                                Status
                            </Typography>

                            <ButtonGroup variant="outlined" ref={anchorRef} aria-label="split button">
                                <Button
                                   // onClick={handleClick}
                                    variant="contained"
                                    color={lessonStatus=='pending'? "warning": 'success'}
                                >
                                   {lessonStatus}
                                </Button>
                                <Button
                                    size="small"
                                    aria-controls={open ? 'split-button-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-label="select merge strategy"
                                    aria-haspopup="menu"
                                    onClick={handleToggle}
                                >
                                    <ArrowDropDownIcon />
                                </Button>
                            </ButtonGroup>
                            <Popper
                                sx={{
                                    zIndex: 1,
                                }}
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === 'bottom' ? 'center top' : 'center bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList id="split-button-menu" autoFocusItem>
                                                    {options.map((option, index) => (
                                                        <MenuItem
                                                            key={option}
                                                            selected={option === lessonStatus}
                                                            onClick={(event) => handleMenuItemClick(option, index)}
                                                            sx={{textTransform:'capitalize'}}
                                                        >
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Grid>

                       
                        <Grid item xs={6} sm={4}  md={3} sx={{ textAlign: 'center' }}>
                            <Typography sx={{ mb: 1, fontWeight: 'bold' }}>
                                Date
                            </Typography>

                            <Typography>{moment(calendarEvent?.lessonScheduleDate ).format("MMMM DD-YYYY")}</Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{mt:3}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="secondary tabs example"
                    >
                        <Tab  label="Students"  {...a11yProps(0)} />
                        <Tab  label="Assignments"   {...a11yProps(1)}/>
                    </Tabs>

                    <TabPanel value={value} index={0}><StudentsList record={calendarEvent}/></TabPanel>
                    <TabPanel value={value} index={1}><AssignmentsList calendarEvent={calendarEvent}/></TabPanel>
                    </Box>
                   
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={12} sm={3.4} sx={{textAlign:'center'}}>
                    <Typography sx={{ p: 2, textAlign: 'center',fontWeight:'bold' }}>
                        Comments
                    </Typography>
                    <Divider flexItem />

                    <Comments />
                </Grid>
            </Grid>
        </Card>
    )
}
