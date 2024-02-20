import React from 'react';
import NewAuthorsChart from "./NewAuthorsChart";
import { Grid, Typography } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import Div from "@jumbo/shared/Div";
import { useTranslation } from "react-i18next";
import SouthIcon from '@mui/icons-material/South';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


const NewAuthors = () => {
    const { t } = useTranslation();
    return (
        <JumboCardQuick
            title={<h4 sx={{ color: 'common.white' }}>Total Revenue</h4>}


            wrapperSx={{ pt: 0 }}
        >
            <Div sx={{ mt: -1.25 }}>
                <NewAuthorsChart />
            </Div>
            <Typography variant={"h2"}>Total sales made today</Typography>
            <Typography variant={"h2"} >$178</Typography>
            <Typography variant={"h2"} >Traditional heading elements are designed to work best in the </Typography>

            <Grid container >
                <Grid>
                    <Typography>
                        Target
                    </Typography>
                    <Typography><SouthIcon />$7.8k</Typography>
                </Grid>
                <Grid sx={{ ml: 4 }}>
                    <Typography>
                        Last Week
                    </Typography>
                    <Typography><ArrowUpwardIcon />$1.4k</Typography>
                </Grid>
                <Grid sx={{ ml: 4 }}>
                    <Typography>
                        Last Month
                    </Typography>
                    <Typography><SouthIcon />$15k</Typography>

                </Grid>
            </Grid>
        </JumboCardQuick>
    );
};

export default NewAuthors;
