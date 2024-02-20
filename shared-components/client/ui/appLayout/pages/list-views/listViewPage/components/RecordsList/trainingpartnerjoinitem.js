import React from 'react';
import {
    ListItemText,
    Typography,
    Card,
    Button,
    Stack,
    CardContent,
    CardActions
} from "@mui/material";
import { ButtonGroup } from '@mui/material';
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import moment from 'moment';
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";

const ActionButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5, 2),
    borderBottom: 'none',
    borderRadius: 0,
    textTransform: 'none',
    letterSpacing: 0,
    borderColor: theme.palette.divider,
    color: theme.palette.text.secondary,

    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        borderBottom: 'none',
    },
}));
const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

const TriningpartnerJoin = ({ record, view }) => {
         ;


    if (view === "grid") {
        return (
            <JumboGridItem xs={12} sm={6} md={4} lg={3} >

                <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>

                    <CardContent sx={{
                        pt: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                        minHeight: '180px'
                    }}>


                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Title :</Typography>
                            <Typography variant={"h5"} sx={{ textTransform: 'capitalize', ml: 1 }}>{record.title}</Typography>
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}> Date :</Typography>
                            <Typography sx={{ ml: 1 }}>{moment(record?.date).format("DD-MM-YYYY")} </Typography>
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Time :</Typography>
                            <Typography sx={{ ml: 1 }}> {record?.startTime} </Typography>
                        </div>
                    </CardContent>


                    <CardActions sx={{ p: 0, mx: '-1px' }}>
                        <ButtonGroup size="large" fullWidth variant="outlined" disabled={record?.accept!=true}>
                            <ActionButton  >Join</ActionButton>
                        </ButtonGroup>
                    </CardActions>

                </Card>
            </JumboGridItem>
        )
    };
    return (
        <React.Fragment>
            <JumboListItem
                componentElement={"div"}
                itemData={record}

                sx={{
                    cursor: 'pointer',
                    borderTop: 1,
                    borderColor: 'divider',
                    '&:hover': {
                        bgcolor: 'action.hover',
                    }
                }}
            >


                <ListItemText
                    // onClick={() => { handleClickOpen(record) }}
                    primary={
                        <Typography variant={"body1"} component={"div"}>
                            <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0 }}>

                                <Item
                                    sx={{
                                        marginLeft: "10x",
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{record?.title}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        //marginLeft: "42px",
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{moment(record?.date).format("DD-MM-YYYY")}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{record?.startTime}</Typography>
                                </Item>


                                <Item>
                                    <Button variant='outlined' sx={{ ml: 12 }}  href={record?.url} target={'_blank'} disabled={record?.accept!=true}>Join</Button>
                                </Item>
                            </Stack>
                        </Typography>
                    }
                />

            </JumboListItem>

        </React.Fragment>
    );
};
/* Todo record, view prop define */
export default TriningpartnerJoin;