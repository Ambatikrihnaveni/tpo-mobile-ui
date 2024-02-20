import { TableCell, TableRow } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import React from "react";
import useAuth from "../../../../hooks/useAuth";
import Chip from "@mui/material/Chip";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '& .MuiTableCell-root': {
        borderBottom: "none",
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    },

    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    }
}));
const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    return formattedDate;
};

const DashbordStudentEPIteam = ({ item }) => {
    const createdAt = item.createdAt;
    const currentDate = getCurrentDate();
    const { viewer } = useAuth()

    let completedLessons = [];

    for (let x = 0; x < item?.lessonsDuration?.length; x++) {
        if (item?.lessonsDuration[x]?.lessonStatus === "Complete") {
            completedLessons.push(item?.lessonsDuration[x])

        }

    }


    const totalLessons = item.lessonsDuration?.length || 0;
    const completedLessonsCount = completedLessons.length || 0;
    const progressPercentage = (completedLessonsCount / totalLessons) * 100;
    const status = completedLessons.length === totalLessons ? "Completed" : "In Progress";

    return (
        <StyledTableRow key={item}>
            <TableCell sx={{ pl: theme => theme.spacing(3,), pl: 3 }} >
                {item?.name}
            </TableCell>
            {
                viewer?.role === "Student" &&
                <TableCell>{`${(completedLessons?.length) ? completedLessons?.length : '0'} / ${item?.lessonsDuration?.length} `}</TableCell>
            }
            {
                viewer?.role === "Student" ? (<TableCell align="right" sx={{color:status === "Completed" ? "#28a745" : "#f29339"}}>
                    {/* <Chip
                        size="small"
                        label={status}
                        sx={{
                            color: status === "Completed" ? "white" : "white",
                            backgroundColor: status === "Completed" ? "#28a745" : "#f29339",
                            fontSize: '14px',
                        }}
                    /> */}
                    {status}
                </TableCell>) : (
                    <TableCell align="right" sx={{color: item?.isBatchExistInCollege === "Assigned" ? "#04851e" : "#bf890b"}}>
                        {item?.isBatchExistInCollege}
                    </TableCell>
                )
            }

        </StyledTableRow>

    );
};
/* Todo item prop define  <Typography variant={"body1"} noWrap sx={{ color: record?.isApproved ? "#04851e" : "#bf890b" }}>{record?.isApproved ? "Approved" : "Pending"}</Typography> */
export default DashbordStudentEPIteam;
