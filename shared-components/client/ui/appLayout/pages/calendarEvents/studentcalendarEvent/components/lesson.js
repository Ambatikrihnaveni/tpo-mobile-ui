import React, { useState } from "react";
import { Box } from "@mui/material";
import Div from '@jumbo/shared/Div'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import Tutor from "./tutor";
import Quizz from "./quizz";
import Assignment from "./assignment";

const dummyData = [
    { name: "Ashok Rao" },
    { name: "Srikanth" },
    { name: "Koti" },
]

export default function StudentPageTab({ calendarEvent }) {
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [selectedNames, setSelectedNames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTutorNames, setSelectedTutorNames] = useState([]);

    const handleCheckboxChange = (tutorName) => {
        if (selectedTutorNames.includes(tutorName)) {
            setSelectedTutorNames(selectedTutorNames.filter((selectedTutorName) => selectedTutorName !== tutorName));
        } else {
            setSelectedTutorNames([...selectedTutorNames, tutorName]);
        }
    };

    const handleSelectAll = () => {
        if (selectedTutorNames.length === calendarEvent.length) {
            setSelectedTutorNames([]);
        } else {
            setSelectedTutorNames(calendarEvent.map((row) => row.tutorName));
        }
    };

    const filteredData = Array.isArray(calendarEvent)
    ? calendarEvent.filter((row) =>
          row.tutorName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];


    return (
        <Div className="container">
            <Div >
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Tutor" value="1" sx={{fontWeight:'bold',fontSize:'15px'}} />
                                <Tab label="Quizzes" value="2"  sx={{fontWeight:'bold',fontSize:'15px',marginLeft:'20px'}}/>
                                <Tab label="Assignment" value="3" sx={{fontWeight:'bold',fontSize:'15px',marginLeft:'20px'}}/>
                            </TabList>
                        </Box>

                        <TabPanel value="1">
                            <Div sx={{ marginBottom: '40px' }}>
                                <Tutor
                                handleCheckboxChange={handleCheckboxChange}
                                handleSelectAll={handleSelectAll}
                                filteredData={filteredData}
                                setSearchTerm={setSearchTerm}
                                searchTerm={searchTerm}
                                selectedNames={selectedNames}
                                dummyData={dummyData}
                                calendarEvent={calendarEvent}/>
                          </Div>
                        </TabPanel>

                        <TabPanel value="2">
                            <Div sx={{ marginBottom: '40px' }}>
                                <Quizz
                                calendarEvent={calendarEvent}/>
                            </Div>
                        </TabPanel>

                        <TabPanel value="3">
                            <Div sx={{ marginBottom: '40px' }}>
                                <Assignment
                                calendarEvent={calendarEvent}/>
                            </Div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Div>
        </Div>
    );
};
