import React, { useState } from 'react';
import {
    ListItemText,
    Button,
    Card,
    CardContent,
    Tooltip,
    Typography,
    Stack,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import { CollegeAdmin } from '../../../../../../graphql/services/college-admin/collegeAdmin-services';
import useAuth from '../../../../../../hooks/useAuth';
import { PaymentServices } from '../../../../../../graphql/services/payment-services/paymentServices';

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));
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
const { filesBaseUrl } = Meteor.settings.public;

const PaymentPayable = ({ record, view, item, recordType }) => {
    
   
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

    const [status, setStatus] = React.useState(record?.transferredPaymentsStatus || "Pending");

    const handleChange = async (event) => {
        setStatus(event.target.value);
        const changedStatus= event.target.value
        const data = await PaymentServices.transferredPaymentsStatus(record?.orderId, changedStatus)
    }
    const currencySymbols = {
        INR: '₹',  // Rupee symbol
        USD: '$',
        EUR: '€',
        GBP: '£',
        // Add more currency codes and symbols as needed
      };

      const program = record.programName
      const truncaProgram = (str = '', maxLength = 50) => str?.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
      const truncaProgramName = truncaProgram(program, 24);

      if (view === "grid") {
        return (
            <JumboGridItem xs={12} sm={6} md={4} lg={3} >

            <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',  minHeight: '300px' }}>  
                <CardContent sx={{
                    pt: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                }}>

                <Typography  variant='body1'sx={{fontWeight:'bold',fontSize:'20px',marginTop:'10px',color:'#50C2C9'}} > {record.trainingPartner}</Typography>

                    <div style={{display:'flex',marginTop:'20px'}}>
                <Typography variant='body1' sx={{fontWeight:'bold'}}> Date :</Typography>
                <Typography  variant='body1' sx={{ml:1}}>{record.date} </Typography>
                </div>
                <div style={{display:'flex',marginTop:'10px'}}>
                <Typography  variant='body1' sx={{fontWeight:'bold'}}>College/Student :</Typography>
                <Typography  variant='body1' sx={{ml:1}}>{record.institute}</Typography>
                </div>
                <Tooltip title={record.programName}>
                <div style={{display:'flex',marginTop:'10px'}}>
                <Typography  variant='body1' sx={{fontWeight:'bold'}}>ProgramName:</Typography>
                <Typography  variant='body1' sx={{ml:1}}>{truncaProgramName}</Typography>
                </div>
                </Tooltip>
                <div style={{display:'flex',marginTop:'10px'}}>
                <Typography  variant='body1' sx={{fontWeight:'bold'}}>No.of Students :</Typography>
                <Typography  variant='body1' sx={{ml:1}}>{record.studentData}</Typography>
                </div>
                <div style={{display:'flex',marginTop:'10px'}}>
                <Typography  variant='body1' sx={{fontWeight:'bold'}}>Price :</Typography>
                <Typography  variant='body1' sx={{ml:1}}> {currencySymbols[record?.currencyCode]}{' '} {record.price}</Typography>
                </div>
                <div style={{display:'flex',marginTop:'10px'}}>
                <Typography  variant='body1' sx={{fontWeight:'bold'}}> Status:</Typography>
                <Typography  variant='body1' sx={{ml:1}}> 
                                   <Select
                                    value={status}
                                    size="small"
                                    sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 }, color: "white", borderRadius: "30px", width: "auto", height: "30px", fontSize: 12, textAlign: "center", backgroundColor: status === 'Settled' ? '#28a745' : status === 'Pending' ? '#f29339' : '#e73145', paddingLeft: '3px', minWidth: '100px' }}
                                    inputProps={{ IconComponent: () => null }}
                                    onChange={handleChange}

                                >
                                    <MenuItem value="Settled">Settled</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Failed">Failed</MenuItem>

                                 </Select> 
                </Typography>
                </div> 
                </CardContent>
            </Card>
        </JumboGridItem>
        )
    }

    return (
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


                // onClick={showtutorDetail}
                primary={
                    <Typography variant={"body1"} component={"div"}>
                        <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0, textAlign: 'center' }}>
                            <Item
                                sx={{
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                <Typography variant={"body1"} noWrap

                                >{record.date}</Typography>
                            </Item>
                            <Item
                                sx={{
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                <Typography variant={"body1"} noWrap

                                >{record.trainingPartner}</Typography>
                            </Item>
                            <Item
                                sx={{
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                <Typography variant={"body1"} noWrap

                                >{record.institute}</Typography>
                            </Item>


                            <Item
                                sx={{
                                    flexBasis: { xs: '100%', sm: '50%', md: '28%' },
                                    flexShrink: 0, px: 1,
                                }}
                            >

                                <Typography variant={"h5"} mb={.5} sx={{

                                    textTransform: 'capitalize'
                                }} >{record.programName}</Typography>


                            </Item>


                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <Typography variant={"body1"}

                                >{record.studentData}
                                </Typography>
                            </Item>

                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },
                                    // display: { xs: 'none', md: 'block' },
                                    //display: viewer?.role === 'Admin' ? 'none' : 'block'
                                }}

                            >
                                <Typography variant="body1" sx={{ display: { xs: 'none', md: 'block' }, }}>
                                {currencySymbols[record?.currencyCode]}{' '} {record.price}
                                </Typography>
                            </Item>

                            <Item
                                sx={{
                                    flexBasis: { md: '22%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <Select
                                    value={status}
                                    size="small"
                                    sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 }, color: "white", borderRadius: "30px", width: "auto", height: "30px", fontSize: 12, textAlign: "center", backgroundColor: status === 'Settled' ? '#28a745' : status === 'Pending' ? '#f29339' : '#e73145', paddingLeft: '3px', minWidth: '100px' }}
                                    inputProps={{ IconComponent: () => null }}
                                    onChange={handleChange}

                                >
                                    <MenuItem value="Settled">Settled</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Failed">Failed</MenuItem>

                                </Select>
                            </Item>




                        </Stack>
                    </Typography>
                }
            />
        </JumboListItem>
    );
};
/* Todo record, view prop define */
export default PaymentPayable;