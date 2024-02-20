import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Div from '../../../../../../@jumbo/shared/Div';
import Divider from '@mui/material/Divider';
import JumboSearch from "@jumbo/components/JumboSearch";
import HomeIcon from '@mui/icons-material/Home';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import ProgramCards from "./components/programsCard";
import { borderLeft, height } from '@mui/system';
import createProgramMutation from '../../../../../../graphql/services/programs/mutations/createProgram';
import ProgramCount from './selectedPrograms';
import ProjectItem from '../../../CurrentProjectsList/ProjectItem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Cards from '../../../../../../../../plugins/core/modulecards/Cards';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import useCurrentShopId from '../../../../../../hooks/useCurrentShopId';
import { project } from 'ramda';
import MyProgramService from '../../../../../../graphql/services/programs/myProgram-services';
import { setIn } from 'formik';
import { intersection } from 'lodash';
import JumboContentLayout from "@jumbo/components/JumboContentLayout";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from '@mui/icons-material/Cancel';
import InputBase from "@mui/material/InputBase";
import { IconButton, Drawer } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuIcon from '@mui/icons-material/Menu';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 5 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function LibraryLayout({ programsData, importCount, selectedPrograms, handleEditClick }) {
    
    const [value, setValue] = React.useState(0);
    const [type, setType] = React.useState('');
    const [field, setField] = React.useState('')
    const [InternshipCount, setInternshipCount] = React.useState('')
    const { shopId } = useCurrentShopId()
    const [internships, setInternship] = React.useState([])
    const [courses, setCourses] = React.useState([])
    const [projects, setProjects] = React.useState([])
    const [mechanical, setMechanical] = React.useState([])
    const [it, setIt] = React.useState([])
    const [computerScience, setComputerScience] = React.useState([])
    const [electronics, setElectronics] = React.useState([])
    const [searchKeywords, setSearchKeywords] = React.useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [open, setOpen] = useState(false)
    const [free, setFree] = useState([])
    const [paid, setPaid] = useState([])
    /*  const projects =2
     const courses = 3 */
    const selectedItems = importCount;

    React.useEffect(async () => {

        if (shopId) {
            const records = await MyProgramService.libraryPrograms(type);
            let internships = [];
            let courses = [];
            let projects = [];
            let mechanical = [];
            let it = [];
            let computerScience = [];
            let electronics = [];
            let free = []
            let paid = []
            for (let i = 0; i < records?.data?.libraryPrograms.length; i++) {
                if (records?.data?.libraryPrograms[i].type == "courses") {
                    courses.push(records?.data?.libraryPrograms[i]);
                } else if (records?.data?.libraryPrograms[i].type == "internships") {
                    internships.push(records?.data?.libraryPrograms[i]);
                } else if (records?.data?.libraryPrograms[i].type == "projects") {
                    projects.push(records?.data?.libraryPrograms[i]);
                }

                if (records?.data?.libraryPrograms[i].price === '0') {
                    free.push(records?.data?.libraryPrograms[i])
                } else if (records?.data?.libraryPrograms[i].price != '0') {
                    paid.push(records?.data?.libraryPrograms[i])
                }
                // Check if the field property is defined and is an array
                if (Array.isArray(records?.data?.libraryPrograms[i].field)) {
                    for (let x = 0; x < records?.data?.libraryPrograms[i].field.length; x++) {

                        if (records?.data?.libraryPrograms[i].field[x] == "Mechanical") {
                            mechanical.push(records?.data?.libraryPrograms[i]);
                        } else if (records?.data?.libraryPrograms[i].field[x] == "IT") {
                            it.push(records?.data?.libraryPrograms[i]);
                        } else if (records?.data?.libraryPrograms[i].field[x] == "Electronics") {
                            electronics.push(records?.data?.libraryPrograms[i]);
                        } else if (records?.data?.libraryPrograms[i].field[x] == "Computer Science") {
                            computerScience.push(records?.data?.libraryPrograms[i]);
                        }
                    }
                }
            }

            setCourses(courses);
            setInternship(internships);
            setProjects(projects);
            setMechanical(mechanical);
            setIt(it);
            setElectronics(electronics);
            setComputerScience(computerScience);
            setFree(free)
            setPaid(paid)
        }
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOnChange = (event) => {
        //setSearchKeywords(event.target.value);
    };

    const click = () => {
        setIsOpen(!isOpen);
        setOpen(!open)
    };

    const toggleDrawer = () => {
        setOpen(true)
        setIsOpen(true);
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
                    <Div sx={{
                        width: isOpen ? '300px' : '0',
                        borderRight: '1px solid #e6e7e8',
                        mr: 1,
                        position: 'fixed',
                        zIndex: 0,
                        backgroundColor: 'white',
                        height: { xs: "100%", sm: '85%' },
                        transitionDuration: '1s',
                        marginLeft: { xs: 0, sm: isOpen ? '0' : '28px' },
                        boxShodow: '0px 3px 3px rgba(0 0 0 0.3)'

                    }}
                    >

                        {!isOpen && (
                            <IconButton
                                onClick={click}
                                style={{
                                    top: '40%',
                                    left: '-15px',
                                    color: '#08d1c4',
                                    border: '1px solid #e6e7e8',
                                    padding: '3px 4px',
                                    backgroundColor: 'rgb(242, 252, 255)',
                                    zIndex: 2,
                                }}
                            >
                                {isOpen ? <ChevronLeftIcon /> : <KeyboardArrowRightIcon />}
                            </IconButton>
                        )}
                        {isOpen && (
                            <IconButton
                                onClick={click}
                                style={{
                                    top: '40%',
                                    right: '-275px',
                                    color: '#08d1c4',
                                    border: '1px solid #e6e7e8',
                                    padding: '3px 4px',
                                    backgroundColor: 'rgb(242, 252, 255)',
                                    zIndex: 2,
                                }}
                            >
                                {isOpen ? <ChevronLeftIcon /> : <KeyboardArrowRightIcon />}
                            </IconButton>
                        )}

                        <Div sx={{
                            color: 'inherit',
                            mt: 3, pr: 2,
                            display: 'flex',
                            borderRadius: 30,
                            backgroundColor: theme => theme.jumboComponents.JumboSearch.background,


                        }}>
                            <Div sx={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <SearchIcon sx={{ ml: 1, mt: 1, mr: 1 }} />
                            </Div>

                            <InputBase

                                placeholder="Search ...."
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchKeywords}
                                onChange={(e) => setSearchKeywords(e.target.value)}
                            />
                            <IconButton
                                marginLeft="40px"
                                component="label"
                                onClick={() => {
                                    setSearchKeywords("");
                                }}
                            >
                                <CancelIcon />
                            </IconButton>
                        </Div>


                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ textAlign: 'left', transition: 'margin 1s', }}

                        >

                            <Tab
                                icon={
                                    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '5px' }}>

                                        <HomeOutlinedIcon
                                            sx={{ marginLeft: '5px', verticalAlign: 'middle' }}
                                        /><div style={{ paddingTop: '4px' }}>Home</div>
                                    </div>
                                }

                                {...a11yProps(0)}
                                sx={{
                                    ml: -18,
                                    mt: 4,
                                    bgcolor: value === 0 ? 'rgba(0, 186, 255, 0.1)' : '',
                                    color: '#100E20',
                                    fontSize: '18px',
                                    textTransform: 'none',
                                    height: -30,
                                    display: 'flex',
                                }}
                            />
                            <Tab
                                icon={
                                    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>

                                        <CheckCircleIcon
                                            sx={{ marginLeft: '1px', verticalAlign: 'middle' }} />
                                        {`Selected Items (${selectedItems})`}
                                    </div>
                                }
                                disabled={importCount === 0} {...a11yProps(1)}
                                sx={{
                                    ml: -12, bgcolor: value === 1 ? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none'
                                }} style={{ color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                            <Divider sx={{ mt: 2, mb: 2 }}>
                                <Typography variant="body1" fontWeight="bold" color="#50C2C9">
                                    Pricing Type  </Typography>
                            </Divider>
                            <Tab label={`Free (${free?.length})`} {...a11yProps(3)} sx={{ ml: -15, bgcolor: value === 3 ? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                            <Tab label={`Paid (${paid?.length})`} {...a11yProps(4)} sx={{ ml: -16.4, bgcolor: value === 4 ? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />

                            <Divider sx={{ mt: 2, mb: 2 }}>
                                <Typography variant="body1" fontWeight="bold" color="#50C2C9">
                                    Program Type  </Typography>
                            </Divider>
                            <Tab label={`Internships (${internships.length})`} {...a11yProps(3)} sx={{ ml: -15, bgcolor: value === 6 ? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                            <Tab label={`Courses (${courses.length})`} {...a11yProps(4)} sx={{ ml: -16.4, bgcolor: value === 7 ? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                            <Tab label={`Projects (${projects.length}) `} {...a11yProps(5)} sx={{
                                ml: -16.4,
                                bgcolor: value === 8 ? 'rgba(0, 186, 255, 0.1)' : '',
                                color: '#100E20',
                                fontSize: '18px',
                                textTransform: 'none',
                            }} />
                            <Divider sx={{ mt: 2, mb: 2 }}>
                                <Typography variant="body1" fontWeight="bold" color="#50C2C9">
                                    Field of Study  </Typography>
                            </Divider>
                            <Tab label={`Mechanical (${mechanical.length})`} {...a11yProps(7)} sx={{ ml: -15, bgcolor: value === 10? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                            <Tab label={`Computer Science (${computerScience.length})`} {...a11yProps(8)} sx={{ ml: -11.5, bgcolor: value === 11 ? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                            <Tab label={`IT (${it.length})`} {...a11yProps(9)} sx={{ ml: -19.5, bgcolor: value === 12 ? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                            <Tab label={`Electronics (${electronics.length})`} {...a11yProps(10)} sx={{ ml: -15, bgcolor: value === 13 ? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                        </Tabs>
                    </Div>
                </Drawer>
            </Div>
            <JumboContentLayout
                sidebar={
                    <Div sx={{
                        width: isOpen ? '300px' : '0',
                        borderRight: '1px solid #e6e7e8',
                        mr: 1,
                        position: 'fixed',
                        zIndex: 0,
                        backgroundColor: 'white',
                        height: { xs: "100%", sm: '85%' },
                        transitionDuration: '1s',
                        marginLeft: { xs: 0, sm: isOpen ? '0' : '28px' },
                        boxShodow: '0px 3px 3px rgba(0 0 0 0.3)'

                    }}
                    >

                        {!isOpen && (
                            <IconButton
                                onClick={click}
                                style={{
                                    top: '40%',
                                    left: '-15px',
                                    color: '#08d1c4',
                                    border: '1px solid #e6e7e8',
                                    padding: '3px 4px',
                                    backgroundColor: 'rgb(242, 252, 255)',
                                    zIndex: 2,
                                }}
                            >
                                {isOpen ? <ChevronLeftIcon /> : <KeyboardArrowRightIcon />}
                            </IconButton>
                        )}
                        {isOpen && (
                            <IconButton
                                onClick={click}
                                style={{
                                    top: '40%',
                                    right: '-275px',
                                    color: '#08d1c4',
                                    border: '1px solid #e6e7e8',
                                    padding: '3px 4px',
                                    backgroundColor: 'rgb(242, 252, 255)',
                                    zIndex: 2,
                                }}
                            >
                                {isOpen ? <ChevronLeftIcon /> : <KeyboardArrowRightIcon />}
                            </IconButton>
                        )}

                        <Div sx={{
                            color: 'inherit',
                            mt: 3, pr: 2,
                            display: 'flex',
                            borderRadius: 30,
                            backgroundColor: theme => theme.jumboComponents.JumboSearch.background,


                        }}>
                            <Div sx={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: { xs: 'none', md: 'block' }

                            }}>
                                <SearchIcon sx={{ ml: 1, mt: 1, mr: 1 }} />
                            </Div>

                            <InputBase

                                placeholder="Search ...."
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchKeywords}
                                onChange={(e) => setSearchKeywords(e.target.value)}
                            />
                            <IconButton
                                marginLeft="40px"
                                component="label"
                                onClick={() => {
                                    setSearchKeywords("");
                                }}
                            >
                                <CancelIcon />
                            </IconButton>
                        </Div>

                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ textAlign: 'left', transition: 'margin 1s', }}

                        >

                            <Tab
                                icon={
                                    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '5px' }}>

                                        <HomeOutlinedIcon
                                            sx={{ marginLeft: '5px', verticalAlign: 'middle' }}
                                        /><div style={{ paddingTop: '4px' }}>Home</div>
                                    </div>
                                }

                                {...a11yProps(0)}
                                sx={{
                                    ml: -18,
                                    mt: 4,
                                    bgcolor: value === 0 ? 'rgba(0, 186, 255, 0.1)' : '',
                                    color: '#100E20',
                                    fontSize: '18px',
                                    textTransform: 'none',
                                    height: -30,
                                    display: 'flex',
                                }}
                            />
                            <Tab
                                icon={
                                    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>

                                        <CheckCircleIcon
                                            sx={{ marginLeft: '1px', verticalAlign: 'middle' }} />
                                        {`Selected Items (${selectedItems})`}
                                    </div>
                                }
                                disabled={importCount === 0} {...a11yProps(1)}
                                sx={{
                                    ml: -12, bgcolor: value === 1 ? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none'
                                }} style={{ color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                                 <Divider sx={{ mt: 2, mb: 2 }}>
                                <Typography variant="body1" fontWeight="bold" color="#50C2C9">
                                    Pricing Type  </Typography>
                            </Divider>
                            <Tab label={`Free (${free?.length})`} {...a11yProps(3)} sx={{ ml: -18, bgcolor: value === 3 ? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                            <Tab label={`Paid (${paid?.length})`} {...a11yProps(4)} sx={{ ml: -18, bgcolor: value === 4 ? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                            <Divider sx={{ mt: 2, mb: 2 }}>
                                <Typography variant="body1" fontWeight="bold" color="#50C2C9">
                                    Program Type  </Typography>
                            </Divider>
                            <Tab label={`Internships (${internships.length})`} {...a11yProps(3)} sx={{ ml: -15, bgcolor: value === 6 ? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                            <Tab label={`Courses (${courses.length})`} {...a11yProps(4)} sx={{ ml: -16.4, bgcolor: value === 7 ? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                            <Tab label={`Projects (${projects.length}) `} {...a11yProps(5)} sx={{
                                ml: -16.4,
                                bgcolor: value === 8 ? 'rgba(0, 186, 255, 0.1)' : '',
                                color: '#100E20',
                                fontSize: '18px',
                                textTransform: 'none',
                            }} />
                            <Divider sx={{ mt: 2, mb: 2 }}>
                                <Typography variant="body1" fontWeight="bold" color="#50C2C9">
                                    Field of Study  </Typography>
                            </Divider>
                            <Tab label={`Mechanical (${mechanical.length})`} {...a11yProps(7)} sx={{ ml: -15, bgcolor: value === 10? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                            <Tab label={`Computer Science (${computerScience.length})`} {...a11yProps(8)} sx={{ ml: -11.5, bgcolor: value === 11 ? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                            <Tab label={`IT (${it.length})`} {...a11yProps(9)} sx={{ ml: -19.5, bgcolor: value === 12? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />
                            <Tab label={`Electronics (${electronics.length})`} {...a11yProps(10)} sx={{ ml: -15, bgcolor: value === 13 ? 'rgba(0, 186, 255, 0.1)' : "", color: '#100E20', fontSize: '18px', textTransform: 'none' }} />



                        </Tabs>


                    </Div>
                }
                sx={{
                    border: 'none',
                    width: isOpen ? '300px' : '0',
                }}
            >

                <Div sx={{
                    flex: 1, backgroundColor: "rgb(243, 246, 251)", minHeight: '740px', minWidth: '100%', '@media (min-width: 600px)': {
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        transitionDuration: '1s',

                    }
                }}>
                    <TabPanel value={value} index={0}>

                        <ProgramCards programsData={programsData} searchKeywords={searchKeywords} handleEditClick={handleEditClick} />

                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ProgramCount selectedPrograms={selectedPrograms} programsData={programsData} searchKeywords={searchKeywords} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ProgramCards programsData={programsData} searchKeywords={searchKeywords} type="free" handleEditClick={handleEditClick} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <ProgramCards programsData={programsData} searchKeywords={searchKeywords} type="paid" handleEditClick={handleEditClick} />
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        <ProgramCards programsData={programsData} searchKeywords={searchKeywords} type="internships" handleEditClick={handleEditClick} />
                    </TabPanel>
                    <TabPanel value={value} index={7}>
                        <ProgramCards programsData={programsData} searchKeywords={searchKeywords} type="courses" handleEditClick={handleEditClick} />
                    </TabPanel>
                    <TabPanel value={value} index={8}>
                        <ProgramCards programsData={programsData} searchKeywords={searchKeywords} type="projects" handleEditClick={handleEditClick} />
                    </TabPanel>
                    <TabPanel value={value} index={10}>
                        <ProgramCards programsData={programsData} searchKeywords={searchKeywords} type="mechanical" handleEditClick={handleEditClick} />
                    </TabPanel>
                    <TabPanel value={value} index={11}>
                        <ProgramCards type="computerScience" programsData={programsData} searchKeywords={searchKeywords} handleEditClick={handleEditClick} />
                    </TabPanel>

                    <TabPanel value={value} index={2}>
                        <ProgramCards type="it" programsData={programsData} searchKeywords={searchKeywords} handleEditClick={handleEditClick} />
                    </TabPanel>
                    <TabPanel value={value} index={13}>
                        <ProgramCards type="electronics" programsData={programsData} searchKeywords={searchKeywords} handleEditClick={handleEditClick} />
                    </TabPanel>
                </Div>
            </JumboContentLayout>
        </Div>

    );
}