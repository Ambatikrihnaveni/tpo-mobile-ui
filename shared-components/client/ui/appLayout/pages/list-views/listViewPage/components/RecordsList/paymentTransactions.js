import React from 'react';
import {
    ListItemText,
    Card,
    CardContent,
    Tooltip,
    Typography,
    Stack,
} from "@mui/material";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { useMutation } from "react-query";
import { CollegeAdmin } from '../../../../../../graphql/services/college-admin/collegeAdmin-services';
import useAuth from '../../../../../../hooks/useAuth';
import { PaymentServices } from '../../../../../../graphql/services/payment-services/paymentServices';
const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));
const { filesBaseUrl } = Meteor.settings.public;

const PaymentTransactions = ({ record, view, item, recordType }) => {

    const { viewer } = useAuth()
    const dateObject = new Date(record?.date)
    const formatted = dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
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
    const currencySymbols = {
        INR: '₹',  // Rupee symbol
        USD: '$',
        EUR: '€',
        GBP: '£',
        // Add more currency codes and symbols as needed
      };
      const string = record?.transactionId
      const truncateString = (str = '', maxLength = 50) => str?.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
      const truncateName = truncateString(string, 40);



      if (view === "grid") {
        return (
            <JumboGridItem xs={12} sm={6} md={4} lg={3} >

            <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',  minHeight: '200px' }}>  
                <CardContent sx={{
                    pt: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                }}>
               {viewer?.role== "Master-Admin"&&(
               
                <Typography  variant='body1' sx={{fontWeight:'bold',marginTop:'10px',fontSize:'20px',color:'#50C2C9'}}>{record.institute} </Typography>
                )}

                    <div style={{display:'flex',marginTop:'20px'}}>
                <Typography variant='body1' sx={{fontWeight:'bold'}}> Date :</Typography>
                <Typography  variant='body1' sx={{ml:1}}>{formatted} </Typography>
                </div>
                
                <div style={{display:'flex',marginTop:'15px'}}>
                <Typography  variant='body1' sx={{fontWeight:'bold'}}>TransactionId :</Typography>
                <Typography  variant='body1' sx={{ml:1}}>{truncateName}</Typography>
                </div>
                <div style={{display:'flex',marginTop:'15px'}}>
                <Typography  variant='body1' sx={{fontWeight:'bold'}}>Amount Paid:</Typography>
                <Typography  variant='body1' sx={{ml:1}}>  {currencySymbols[record?.currencyCode]}{' '}{record.amount}</Typography>
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

                                >{formatted}</Typography>
                            </Item>
                            {viewer?.role== "Master-Admin"&&(
                                <Item
                                sx={{
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                <Typography variant={"body1"} noWrap

                                >{record.institute}</Typography>
                            </Item>

                            )}
                            
                            <Item
                                sx={{
                                    flexBasis: { xs: '100%', sm: '50%', md: '28%' },
                                    flexShrink: 0, px: 1,
                                }}
                            >
                                <Tooltip title={record?.transactionId} placement='bottom'>
                                    <Typography variant={"h5"} mb={.5} sx={{

                                        textTransform: 'capitalize'
                                    }} >{truncateName}</Typography>

                                </Tooltip>
                            </Item>


                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <Typography variant={"body1"}

                                >
                              {currencySymbols[record?.currencyCode]}{' '}{record.amount}
                                </Typography>
                            </Item>
                        </Stack>
                    </Typography>
                }
            />
        </JumboListItem>
    );
};
/* Todo record, view prop define */
export default PaymentTransactions;