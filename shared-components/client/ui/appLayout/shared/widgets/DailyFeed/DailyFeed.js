import React from 'react';
import {productsList} from "./data";
import FeedItem from "./FeedItem";
import {CardActions, Typography} from "@mui/material";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import List from "@mui/material/List";
import FilterListIcon from '@mui/icons-material/FilterList';
import Chip from "@mui/material/Chip";
import styled from "@emotion/styled";
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import {useTranslation} from "react-i18next";
import DashbordProgramAssignedIteam from './dashbordProgramAssignedIteam';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';

const StyledTableCell = styled(TableCell)(({theme}) => ({
    borderBottom: "none",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
}));

const DailyFeed = () => {
    const {t} = useTranslation();
    const [assignProgramsData,setAssignProgramsData] = React.useState([])

    React.useEffect(async()=>{
const data = await MyDashboardService.getProgramsAssigned();
if(data){
    setAssignProgramsData(data)
}

    },[])
    return (
        <JumboCardQuick
            title={t(<b>Program Assigned</b>)}
            action={
                <FilterListIcon />
            }
            noWrapper
        >
            <JumboScrollbar
            autoHeight={true}
            autoHideTimeout={4000}
            autoHeightMin={490}
            autoHide={true}
            hideTracksWhenNotNeeded
        >
            
            <Divider/>

            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell sx={{pl: 3}}><b>Date</b></StyledTableCell>
                        <StyledTableCell sx={{pl: 5}} ><b>Program</b></StyledTableCell>
                        <StyledTableCell sx={{pl: 5.3}} ><b>Type</b></StyledTableCell>
                        <StyledTableCell sx={{pl: 3}} align={"right"}><b>Students</b></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        assignProgramsData.map((product, index) => (
                            <DashbordProgramAssignedIteam item={product} key={index}/>
                        ))
                    }
                </TableBody>
            </Table>
            </JumboScrollbar>
            <Divider/>
            <Button sx={{textTransform:"none",fontSize:17,color:'#f27474'}}>More</Button>
        </JumboCardQuick>
    );
};
/* Todo scrollHeight prop define */
export default DailyFeed;
