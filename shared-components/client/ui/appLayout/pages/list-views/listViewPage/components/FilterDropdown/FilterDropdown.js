import * as React from 'react';
import { Card, Grid, Typography } from '@mui/material';
import Div from "@jumbo/shared/Div";
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filter from './components/filter';

const FilterDropdown = (
    { statusHandleInputChange,
        courseHandleChange,
        course,
        status,
        handleRemove,
        recordsType,
        modeHandleInputChange,
        groupsstatussHandleInputChange,
        groupstatus,
        mode,
        admissionStatusHandleInputChange,
        admissionStatus,
        paymentHandleInputChange,
        paymentStatus,
        programTypeHandleInputChange,
        programType,
        PayablePaymentHandleInputChange,
        payableStatus,
        assignmentHandleInputChange,
        quizHandleInputChange,
        quiz,
        assignment,
        collegesHandleInputChange,
        colleges,
        dateHandleInputChange,
        date,
        instituteStatusHandleInputChange,
        institute }) => {

    const [open, setOpen] = React.useState(false);
    const [count, setCount] = React.useState("")
    React.useEffect(
        filterCount = () => {
            if (status) {
                setCount('1')
            }
            else if (course.length >= 1 && status != "") {
                setCount("2")
            } else if (course.length >= 1 || status != "") {
                setCount("1")
            } else if (status && programType && mode) {
                setCount('3')
            } else if (status && mode) {
                setCount('2')
            } else if (status && programType) {
                setCount('2')
            } else if (programType && mode) {
                setCount('2')
            } else if (mode) {
                setCount('1')
            } else if (programType) {
                setCount('1')
            } else if (quiz && assignment) {
                setCount('2')
            } else if (quiz) {
                setCount('1')
            } else if (assignment) {
                setCount('1')
            } else if (colleges) {
                setCount('1')
            } else if (date) {
                setCount('1')
            } else if (institute) {
                setCount('1')
            }
        }, [course, status, programType, mode])

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickAway = () => {
        setOpen(false);
    };


    const styles = {
        position: 'absolute',
        top: 64,
        right: 0,
        left: -440,
        zIndex: 1,
        bgcolor: 'background.paper',
        minWidth: "600px"
    };

    return (

        <Div >
            <Div sx={{ position: 'relative' }}>
                <Button onClick={handleClick}>
                    <FilterListIcon /><Typography sx={{ display: "inline", ml: 1 }}>{count}</Typography>
                </Button>
                {open ? (
                    <Div sx={styles}>
                        <Card sx={{ p: 2 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={8}><Typography variant="h3" sx={{ mb: 2 }}>Filters</Typography></Grid>
                                <Grid item xs={4} sx={{ textAlign: "right" }} > <Button variant='contained' size="small" sx={{ borderRadius: '15px', maxWidth: '25px', minWidth: '25px', fontSize: "bold" }} onClick={handleClick}>X</Button></Grid>
                            </Grid>
                            <Filter
                                statusHandleInputChange={statusHandleInputChange}
                                courseHandleChange={courseHandleChange}
                                status={status}
                                course={course}
                                handleRemove={handleRemove}
                                recordsType={recordsType}
                                modeHandleInputChange={modeHandleInputChange}
                                groupstatus={groupstatus}
                                groupsstatussHandleInputChange={groupsstatussHandleInputChange}
                                mode={mode}
                                admissionStatusHandleInputChange={admissionStatusHandleInputChange}
                                admissionStatus={admissionStatus}
                                paymentHandleInputChange={paymentHandleInputChange}
                                paymentStatus={paymentStatus}
                                programTypeHandleInputChange={programTypeHandleInputChange}
                                programType={programType}
                                PayablePaymentHandleInputChange={PayablePaymentHandleInputChange}
                                payableStatus={payableStatus}
                                assignmentHandleInputChange={assignmentHandleInputChange}
                                quizHandleInputChange={quizHandleInputChange}
                                quiz={quiz}
                                assignment={assignment}
                                collegesHandleInputChange={collegesHandleInputChange}
                                colleges={colleges}
                                dateHandleInputChange={dateHandleInputChange}
                                date={date}
                                instituteStatusHandleInputChange={instituteStatusHandleInputChange}
                                institute={institute}
                            
                            />

                        </Card>
                    </Div>
                ) : null}

            </Div>
        </Div>

    );
};
export default FilterDropdown;