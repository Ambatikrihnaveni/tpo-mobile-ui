import React from 'react';
import {
    ListItemText,
    Typography,
    Card,
    Button,
    Slide,
    Avatar,
    Stack,
    CardContent,
    CardActions
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ButtonGroup } from '@mui/material';
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import Div from "@jumbo/shared/Div";
import moment from 'moment';
import useListViewPage from '../../hooks/useListViewPage';
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import useAuth from '../../../../../../hooks/useAuth';
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import WebinarItem from './webinarItem';
import { useNavigate } from 'react-router';
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

const WebinarhostItem = ({ record, view }) => {
    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const webinarId = record?.id
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/${webinarId}/acceptedData`)
    }
    const { viewer } = useAuth()

    const handleItemAction = (menuItem) => {
        switch (menuItem.action) {

            case 'edit':
                showDialog({
                    content: <WebinarItem record={record} onClose={hideDialog} />,
                    sx: {
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                maxWidth: "900px",

                            },
                        },
                    },
                })
        }
    };

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
                            <Typography sx={{ fontWeight: 'bold' }}>Date :</Typography>
                            <Typography variant={"h5"} sx={{ textTransform: 'capitalize', ml: 1 }}>{moment(record.createdAt).format("DD-MM-YYYY")}</Typography>
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}> Topic :</Typography>
                            <Typography sx={{ ml: 1 }}>{record?.title} </Typography>
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Webinar Date :</Typography>
                            <Typography sx={{ ml: 1 }}> {moment(record?.date).format("DD-MM-YYYY")} </Typography>
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}> Time :</Typography>
                            <Typography sx={{ ml: 1 }}>{record?.startTime} </Typography>
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Audience :</Typography>
                            {record?.audiences?.map((audience) =>
                                <Typography sx={{ ml: 1 }}> {audience} </Typography>
                            )}

                        </div>
                    </CardContent>

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
                                    <Typography variant={"body1"} noWrap onClick={handleClick}>{moment(record?.createdAt).format("DD-MM-YYYY")}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        //marginLeft: "42px",
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap onClick={handleClick}>{record?.title}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap onClick={handleClick}>{moment(record?.date).format("DD-MM-YYYY")}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        //marginLeft: "42px",
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap onClick={handleClick}>{record?.startTime}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    {record?.audiences?.map((audience) =>
                                        <Typography variant={"body1"} noWrap onClick={handleClick}>{audience}</Typography>
                                    )}

                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { sm: '10%', md: '8%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap onClick={handleClick}>{record?.acceptCount}</Typography>


                                </Item>

                                {
                                    viewer?.role === "Master-Admin" &&
                                    <>
                                        <Item
                                            sx={{
                                                //marginLeft: "42px",
                                                flexBasis: { sm: '50%', md: '28%' },
                                                display: { xs: 'none', sm: 'block' }
                                            }}
                                        >
                                            <Button variant='outlined' sx={{ ml: 12 }} disabled={!record?.url} href={record?.url} target={'_blank'}>Meet</Button>
                                        </Item>

                                        <Item
                                            sx={{
                                                //marginLeft: "42px",
                                                flexBasis: { sm: '25%', md: '18%' },
                                                display: { xs: 'none', sm: 'block' }
                                            }}
                                        >
                                            <JumboDdMenu
                                                icon={<MoreHorizIcon />}
                                                menuItems={[
                                                    { icon: <EditIcon />, title: "Edit", action: "edit", data: record },
                                                ]}
                                                onClickCallback={handleItemAction}
                                            />
                                        </Item>
                                    </>

                                }


                                {
                                    viewer?.role === "Admin" &&
                                    <>
                                        <Item
                                            sx={{
                                                //marginLeft: "42px",
                                                flexBasis: { sm: '50%', md: '28%' },
                                                display: { xs: 'none', sm: 'block' }
                                            }}
                                        >
                                            <Button variant='outlined' sx={{ ml: 12 }} href={record?.url} target={'_blank'}>Join</Button>
                                        </Item>

                                        <Item
                                            sx={{
                                                //marginLeft: "42px",
                                                flexBasis: { sm: '25%', md: '18%' },
                                                display: { xs: 'none', sm: 'block' }
                                            }}
                                        >
                                            <JumboDdMenu
                                                icon={<MoreHorizIcon />}
                                                menuItems={[
                                                    { icon: <EditIcon />, title: "Edit", action: "edit", data: record },
                                                ]}
                                                onClickCallback={handleItemAction}
                                            />
                                        </Item>
                                    </>

                                }





                            </Stack>
                        </Typography>
                    }
                />

            </JumboListItem>

        </React.Fragment>
    );
};
/* Todo record, view prop define */
export default WebinarhostItem;