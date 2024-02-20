import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow,Grid } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import styled from "@emotion/styled";
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import {useTranslation} from "react-i18next";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import TrainingPartnerItem from './trainingpartneritem';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: "none",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
}));

const TrainingPartner = () => {

    const {t} = useTranslation();
    const [institutesData, setInstitutesData] = React.useState([]);

    React.useEffect(async() => {
        let data = await MyDashboardService.getTrainingPartnersData();
        if(data) {
            setInstitutesData(data);
        }
    }, [])

    return (
          <Grid item xs={12}>
        <JumboCardQuick 
        title={
            <span style={{ fontWeight: 'bold' }}>{t('Training Partners')}</span>
        }
            //action={<FilterListIcon />}
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
                                    <StyledTableCell sx={{ pl: 3 }}><b>TrainingPartner</b></StyledTableCell>
                                    <StyledTableCell sx={{ pl: 3}} ><b>Programs</b></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody> 
                                <TrainingPartnerItem item = {institutesData}/>
                            </TableBody>
                    </Table>
            </JumboScrollbar>
            <Divider />
            <Link to="/trainingpartners">
                        <Button sx={{ textTransform: "none", fontSize: 17,color:'#f27474' }}> More</Button>
                    </Link>
        </JumboCardQuick>
        </Grid>
    );
};

export default TrainingPartner;
