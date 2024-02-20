import React, { useState } from 'react';
import {
    ListItemText,
    ListItemAvatar,
    Card,
    ButtonGroup,
    CardContent,
    Button,
    CardActions,
    Typography,
    Avatar,
    Stack,
} from "@mui/material";
import Span from "@jumbo/shared/Span";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import Div from "@jumbo/shared/Div";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import useListViewPage from '../../hooks/useListViewPage';
import { useMutation } from "react-query";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { CollegeAdmin } from '../../../../../../graphql/services/college-admin/collegeAdmin-services';
import useAuth from '../../../../../../hooks/useAuth';
import { PaymentServices } from '../../../../../../graphql/services/payment-services/paymentServices';

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

const Item1 = ({ children, sx }) => (
    <Div sx={{ textAlign: 'center', flexBasis: '33.33%', p: theme => theme.spacing(1, 2), ...sx }}>
        {children}
    </Div>
);
const { filesBaseUrl } = Meteor.settings.public;


const TrainingPartnerItem = ({ record, view, item, recordType }) => {
    const navigate = useNavigate()
    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const [expanded, setExpanded] = React.useState(false);
    const [isHovered, setIsHovered] = useState(false)
    const { viewer } = useAuth()
    const groupId = record?.id;
    let thumbnailImage = (record?.userMedia) ? record?.userMedia[0]?.URLs?.thumbnail : '';
    if (thumbnailImage) {
        thumbnailImage = `${filesBaseUrl}${thumbnailImage}`;
    }
    const deleteRecordMutation = useMutation(CollegeAdmin.deleteStudentGroup, {
        onSuccess: () => {
            hideDialogAndRefreshRecordsList();
        }
    });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [status, setStatus] = React.useState(record?.transferredPaymentsStatus);

    const handleChange = async (event) => {
        setStatus(event.target.value);
        const changedStatus = event.target.value
        const data = await PaymentServices.transferredPaymentsStatus(record?.orderId, changedStatus)
    }


    const showRecordDetail = React.useCallback(() => {

        navigate(`/${record?.id}/viewprofile`)

    }, [showDialog, record]);
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
    if (view === "grid") {
        return (
            <JumboGridItem xs={12} sm={4} md={4} lg={3} >
                <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>
                    <CardContent sx={{
                        pt: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '250px'
                    }}>
                        <Div sx={{ display: 'flex',mt:2,mb:2}}>
                            <Typography sx={{ fontWeight: 'bold' }}>Institute:</Typography>

                            <Typography sx={{textAlign: "center", width: "100%" }}><Typography variant={"body1"} ml={1} sx={{ ml: 1,}} noWrap>{record.institute}</Typography>

                            </Typography>
                        </Div>
                        <Div sx={{ display: 'flex',mt:2,mb:2}}>
                            <Typography sx={{ fontWeight: 'bold' }}>Reg Date :</Typography>
                            <Typography variant={"h5"} fontSize={16} ml={1} sx={{ml: 1}}
                                noWrap>{record?.date?.slice(0, 10)}</Typography>
                        </Div>

                        <Div sx={{ display: 'flex',mt:2,mb:2}}>
                            <Typography sx={{ fontWeight: 'bold' }}>Location:</Typography>
                            <Typography variant={"h5"} fontSize={16} ml={1} sx={{ml: 1}}
                                noWrap>{record?.city}</Typography>
                        </Div>

                        <Div sx={{ display: 'flex',mt:2,mb:2}}>
                            <Typography sx={{ fontWeight: 'bold' }}>Contact :</Typography>
                            <Typography variant={"h5"} fontSize={16} ml={1} sx={{ml: 1}}
                                noWrap>{record.contact}</Typography>
                        </Div>
                    </CardContent>
                    <CardActions sx={{ p: 0, mx: '-1px' }}>
                        <ButtonGroup size="large" fullWidth variant="outlined">
                            
                            <ActionButton onClick={showRecordDetail}>View</ActionButton>
                        </ButtonGroup>
                    </CardActions>
                </Card>
            </JumboGridItem>
        )
    }
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
                    },
                    marginBottom: '8px',
                }}
            >

                <ListItemText
                    primary={
                        <Typography variant={"body1"} component={"div"}>
                            <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0, textAlign: 'center' }}>

                                <ListItemAvatar onClick={showRecordDetail}>
                                    <Avatar src={thumbnailImage} alt="Avatar" />
                                </ListItemAvatar>


                                <Item
                                    onClick={showRecordDetail}
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            color: '#50C2C9',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{record.institute}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>  {record?.date?.slice(0, 10)}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '28%' },
                                        flexShrink: 0, px: 1,
                                    }}
                                >
                                    <Typography variant={"h5"} mb={.5} sx={{ textTransform: 'capitalize' }}>{record?.city}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        textAlign: 'center',
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"}>{record.contact}</Typography>
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
export default TrainingPartnerItem;