import React from "react";
import { Box } from "@mui/material";
import Div from '@jumbo/shared/Div'
import { useTranslation } from "react-i18next";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import AdmissionsCurrent from "./admissionsCurrent";
import AdmissionsPast from "./admissionsPast";
import AdmissionsUpcoming from "./admisssionsUpcoming";


const { filesBaseUrl } = Meteor.settings.public;


export default function Admissions({ data }) {

    const programName = data?.name
    const shopId = window.localStorage.getItem('accounts:shopId');
    let admissionsData = []
    const { t } = useTranslation();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let smallImage = data?.programMedia[0]?.URLs?.small;
    let duration = data?.duration;
    let pastAdmissions = [];
    let currentAdmissions = [];
    let futureAdmissions = [];
    let isBatchesExist = data.hasOwnProperty("batches");

    if (!isBatchesExist) {
        console.log("No Batches present under this Program");
    }
    if (data?.batches) {
        for (let batch of data?.batches) {
            let enrolementEndDateString = batch.enrolementEndDate;
            let enrolementStartDateString = batch.enrolementStartDate;

            let enrolementEndDate = new Date(enrolementEndDateString);
            let enrolementStartDate = new Date(enrolementStartDateString);

            let enrolementEndDateInMilliSeconds = enrolementEndDate.getTime();
            let acutalEnrolementEndDateInMilliSeconds = enrolementEndDateInMilliSeconds + (23 * 59 * 59 * 1000);

            let enrolementStartDateInMilliSeconds = enrolementStartDate.getTime();

            let today = new Date();
            let todayInMilliSeconds = today.getTime();

            if (todayInMilliSeconds > acutalEnrolementEndDateInMilliSeconds) {
                pastAdmissions.push(batch)
            } else if (todayInMilliSeconds < enrolementStartDateInMilliSeconds) {
                futureAdmissions.push(batch)
            } else if (enrolementStartDateInMilliSeconds <= todayInMilliSeconds && todayInMilliSeconds <= acutalEnrolementEndDateInMilliSeconds) {
                currentAdmissions.push(batch)
            }

        }
    }



    return (
        <Div className="container">
            <Div >
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Current" value="1" sx={{ fontWeight: 'bold', fontSize: '15px', color: '#2E475D' }} />
                                <Tab label="Upcoming" value="2" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px', color: '#2E475D' }} />
                                <Tab label="Past" value="3" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px', color: '#2E475D' }} />
                            </TabList>
                        </Box>

                        <TabPanel value="1">
                            <Div sx={{ marginBottom: '40px' }}>
                                <AdmissionsCurrent data={currentAdmissions} image={smallImage} duration={duration} n programName={programName} />
                            </Div>
                        </TabPanel>

                        <TabPanel value="2">
                            <Div sx={{ marginBottom: '40px' }}>
                                <AdmissionsUpcoming data={futureAdmissions} image={smallImage} duration={duration} programName={programName} />
                            </Div>
                        </TabPanel>

                        <TabPanel value="3">
                            <Div sx={{ marginBottom: '40px' }}>
                                <AdmissionsPast data={pastAdmissions} image={smallImage} duration={duration} programName={programName} />
                            </Div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Div>
        </Div>
    );
};
