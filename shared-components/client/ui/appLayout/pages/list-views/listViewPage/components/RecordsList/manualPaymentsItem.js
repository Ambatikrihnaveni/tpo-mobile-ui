import React, { useState } from 'react';
import {
    ListItemText,
    Card,
    CardContent,
    Tooltip,
    Typography,
    Stack,
    Select,
    MenuItem
} from "@mui/material";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import { CollegeAdmin } from '../../../../../../graphql/services/college-admin/collegeAdmin-services';
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import useAuth from '../../../../../../hooks/useAuth';
import { PaymentServices } from '../../../../../../graphql/services/payment-services/paymentServices';

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));
const { filesBaseUrl } = Meteor.settings.public;

const ManualPaymentsItem = ({ record, view, item, recordType }) => {
    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const { viewer } = useAuth()
    const [status, setStatus] = useState(record?.manualPaymentStatus)
    const groupId = record?.id;
    const orderId = record?.orderId
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
    const handleStatusChange = async (event, value) => {
        setStatus(event.target.value)
        const data = await PaymentServices.manualPaymentsStatus(orderId, event.target.value);
        if(data){
            setRecordsListRefresh(true)
        }
        // Now you can use 'event.target.value' instead of 'status' here
        ;
    }
    const currencySymbols = {
        INR: '₹',  // Rupee symbol
        USD: '$',
        EUR: '€',
        GBP: '£',
        // Add more currency codes and symbols as needed
      };
      const string = record.groupName
      const truncateString = (str = '', maxLength = 50) => str?.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
      const truncateName = truncateString(string, 25);

      const program = record.programName
      const truncaProgram = (str = '', maxLength = 50) => str?.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
      const truncaProgramName = truncaProgram(program, 25);

      if (view === "grid") {
        return (
            <JumboGridItem xs={12} sm={6} md={4} lg={3} >

            <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)', }}>  
                <CardContent sx={{
                    pt: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                }}>
                    <div style={{display:'flex',marginTop:'20px'}}>
                <Typography variant='body1' sx={{fontWeight:'bold'}}> Date :</Typography>
                <Typography  variant='body1' sx={{ml:1}}>{record.date} </Typography>
                </div>
                <div style={{display:'flex',marginTop:'10px'}}>
                <Typography  variant='body1' sx={{fontWeight:'bold'}}>Student/Count :</Typography>
                <Typography  variant='body1' sx={{ml:1}}>{record.studentData==1 ? record?.studentName : record.studentData}</Typography>
                </div>
                <Tooltip title={record?.groupName} >
                <div style={{display:'flex',marginTop:'10px'}}>
                <Typography  variant='body1' sx={{fontWeight:'bold'}}>GroupName:</Typography>
                <Typography  variant='body1'>{truncateName}</Typography>
                </div>
                </Tooltip>

                <div style={{display:'flex',marginTop:'10px'}}>
                <Typography  variant='body1' sx={{fontWeight:'bold'}}>College:</Typography>
                <Typography  variant='body1' sx={{ml:1}}>{record.institute}</Typography>
                </div>
                <Tooltip title={record?.programName}>
                <div style={{display:'flex',marginTop:'10px'}}>
                <Typography  variant='body1' sx={{fontWeight:'bold'}}>ProgramName :</Typography>
                <Typography  variant='body1' >{truncaProgramName}</Typography>
                </div>
                </Tooltip>
                <div style={{display:'flex',marginTop:'10px'}}>
                <Typography  variant='body1' sx={{fontWeight:'bold'}}>Admission :</Typography>
                <Typography  variant='body1' sx={{ml:1}}> {record.batchName}</Typography>
                </div>
                <div style={{display:'flex',marginTop:'10px'}}>
                <Typography  variant='body1' sx={{fontWeight:'bold'}}>Price :</Typography>
                <Typography  variant='body1' sx={{ml:1}}> {currencySymbols[record?.currencyCode]}{' '} {record.price}</Typography>
                </div>
                <div style={{display:'flex',marginTop:'10px'}}>
                <Typography  variant='body1' sx={{fontWeight:'bold'}}>Status :</Typography>
                <Typography  variant='body1' sx={{ml:1}}>  
                                  <Select
                                    value={status}
                                    size="small"
                                    sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 }, color: "white", borderRadius: "30px", width: "auto", height: "30px", fontSize: 12, textAlign: "center", backgroundColor: status === 'Paid' ? '#28a745' : status === 'Pending' ? '#f29339' : '', paddingLeft: '3px', minWidth: '100px' }}
                                    inputProps={{ IconComponent: () => null }}
                                    onChange={handleStatusChange}

                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Paid">Paid</MenuItem>

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
            /*  secondaryAction={
                 <DownloadIcon />
             } */


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

                                >{record.studentData==1 ? record?.studentName : record.studentData}</Typography>
                            </Item>
                            <Item
                                sx={{
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                <Typography variant={"body1"} noWrap

                                >{record.groupName}</Typography>
                            </Item>

                            <Item
                               sx={{
                                textAlign: 'center',
                                flexBasis: { md: '25%' },
                                display: { xs: 'none', md: 'block' }
                            }}
                            >
                                <Typography variant={"body1"} noWrap

                                >{record.institute}</Typography>
                            </Item>
                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >

                                <Typography variant={"body1"}

                                >{record.programName}
                                </Typography>


                            </Item>




                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },
                                    display: { xs: 'none', md: 'block' }
                                }}

                            >
                                <Typography variant="body1" sx={{ display: { xs: 'none', md: 'block' }, }}>
                                    {record.batchName}
                                </Typography>
                            </Item>

                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <Typography variant={"body1"}

                                >  {currencySymbols[record?.currencyCode]}{' '} {record.price}
                                </Typography>
                            </Item>
                           
                            <Item
                               sx={{
                                textAlign: 'center',
                                flexBasis: { md: '25%' },
                                display: { xs: 'none', md: 'block' }
                            }}
                            >
                                <Select
                                    value={status}
                                    size="small"
                                    sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 }, color: "white", borderRadius: "30px", width: "auto", height: "30px", fontSize: 12, textAlign: "center", backgroundColor: status === 'Paid' ? '#28a745' : status === 'Pending' ? '#f29339' : '', paddingLeft: '3px', minWidth: '100px' }}
                                    inputProps={{ IconComponent: () => null }}
                                    onChange={handleStatusChange}

                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Paid">Paid</MenuItem>

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
export default ManualPaymentsItem;