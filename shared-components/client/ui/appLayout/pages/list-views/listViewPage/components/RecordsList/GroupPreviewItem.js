import React, { useState } from 'react';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Card,
    CardHeader,
    CardContent,
    Tooltip,
    Typography,
    Avatar,
    Stack,
    Button,
    Badge,
    CardActions,
    ButtonGroup,
    Grid
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import styled from "@emotion/styled";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Span from "@jumbo/shared/Span";
import { useNavigate } from 'react-router-dom'
import Div from "@jumbo/shared/Div";
import { recordService } from "../../../../../services/record-services";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import RecordForm from "../RecordForm";
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import useCurrentShopId from '../../../../../../hooks/useCurrentShopId';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { CollegeAdmin } from '../../../../../../graphql/services/college-admin/collegeAdmin-services';
import { useParams } from 'react-router';
import useAuth from '../../../../../../hooks/useAuth';
import StudentsService from '../../../../../../graphql/services/students/students-service';
import { PaymentServices } from '../../../../../../graphql/services/payment-services/paymentServices';
import { ToastContainer, toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import ProgramPreview from '../../../../../../../../plugins/core/library/client/components/LibraryPreview/programPreview';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
const { filesBaseUrl } = Meteor.settings.public;


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
const Item1 = ({ children, sx }) => (
    <Div sx={{ textAlign: 'center', flexBasis: '33.33%', p: theme => theme.spacing(1, 2), ...sx }}>
        {children}
    </Div>
);

const GroupPreviewItem = ({ record, view, user, i }) => {

    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const [isHovered, setIsHovered] = useState(false);
    const { shopId } = useCurrentShopId();
    const { viewer } = useAuth();
    const navigate = useNavigate();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const recordType = "Tutor";
    const routeParams = useParams();
    const [studentList, setStudentList] = React.useState([])
    const groupId = routeParams?.groupId
    const [orderId, setOrderId] = useState('')
    const [open, setOpen] = React.useState(false);
    const params = useParams()
    const studentGroupId = params.groupId;
    const handleClose = () => {
        setOpen(false);
    };
    let date = record?.createdAt;
    let truncateDate = date?.slice(0, 10);


    React.useEffect(async () => {
        let batchId = []
        for (let i = 0; i < record?.batch?.length; i++) {
            batchId.push(record.batch[i])
        }
        setStudentList(batchId)
        /*         const Batch = await MyProgramService.getProgramBatch(studentList.batchId);
         */
    }, []);
    const deleteTutor = { record, recordType }
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleChange = (event) => {

        const status = event.target.value;
        data = { status: status, id: record.id, userId: record.userId, recordType, shopId }
        updataStatusMutation.mutate(data)
    };


    const deleteRecordMutation = useMutation(CollegeAdmin.removeStudents, {
        onSuccess: () => {

            hideDialogAndRefreshRecordsList();
        }
    });

    const updataStatusMutation = useMutation(recordService.updateTutorStatus, {
        onSuccess: () => {
            refreshRecordsList();
        }
    });
    const razorpayOrderMutation = useMutation(StudentsService.razorPayOrder, {
        onSuccess: (data) => {
            setOrderId(data?.createRazorpayOrder?.order_id)
            refreshRecordsList();
        }
    })

    const studentPaymentMutation = useMutation(StudentsService.studentPayment, {
        onSuccess: () => {
            refreshRecordsList();
        }
    })

    const dateObject = new Date(record?.createdAt)
    const formatted = dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const refreshRecordsList = React.useCallback(() => {
        setRecordsListRefresh(true);
    }, [setRecordsListRefresh]);

    const hideDialogAndRefreshRecordsList = React.useCallback(() => {
        hideDialog();
        setRecordsListRefresh(true);
    }, [hideDialog, setRecordsListRefresh]);


    const showRecordDetail = React.useCallback(() => {
        navigate(`/${record?.id}/viewprofile`)
    }, [showDialog, record]);


    const handleItemAction = (menuItem) => {

        switch (menuItem.action) {
            case 'edit':
                showDialog({
                    title: 'Update Tutor',
                    content: <RecordForm record={record} onSave={hideDialogAndRefreshRecordsList} />
                });
                break;
            case 'delete':
                showDialog({
                    variant: 'confirm',
                    title: 'Are you sure about deleting this record?',
                    content: "You won't be able to recover this record later",
                    // onYes: () => deleteRecordMutation.mutate({ id: groupId, emails: [record.studentEmail] }),
                    onYes: async () => {
                        try {
                            deleteRecordMutation.mutate({ id: groupId, emails: [record.studentEmail] }),
                                hideDialog();
                            toast.success('Student Removed successfully');
                        } catch (error) {

                            toast.error('Error Removing Student');
                        }
                    },
                    onNo: hideDialog
                })
        }
    };

    const string = record?.name
    const truncateString = (str = '', maxLength = 50) => str.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const truncateName = truncateString(string, 7);

    const emLength = record?.email
    const lengthOfEmail = (str = '', maxLength = 50) => str.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const emailLength = lengthOfEmail(emLength, 21);
    ;
    const firstLetter = string?.charAt(0).toUpperCase();

    let thumbnailImage = record?.userMedia ? record?.userMedia[0]?.URLs?.thumbnail : '';
    if (thumbnailImage) {
        thumbnailImage = `${filesBaseUrl}${thumbnailImage}`;
    }
    
    let imageSrc = record?.programMedia ? record?.programMedia[0]?.URLs?.medium : '';

    // If there is no img src, then render nothing
    if (imageSrc === String(null)) return null;

    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    } else {
        imageSrc = "";
    }
    const programList = record?.programs || []; // Assuming you have the program list here

    const onProgramPreview = (program) => {
        
        showDialog({
            fullScreen: true,
            content: <ProgramPreview handleClose={hideDialog} record={program} data={program} />,
            sx: {
                borderRadius: 0
            }
        })
    }

    const handlePayment = async () => {
        const email = viewer?.primaryEmailAddress
        const name = viewer?.name
        const batchId = record?.id
        const accountId = viewer._id
        const currencyCode = record?.currencyCode
        const price = record?.price
        // const isPayment = record?.isPayment
        const paymentStatus = "Paid"
        const number = viewer?.phoneNumber
        const program = record?.programName
        const address = viewer?.profile?.address
        const phoneNumber = viewer?.phoneNumber
        const billingAddress = {
            name: viewer?.name,
            email: email,
            city: viewer?.profile?.city,
            state: viewer?.profile?.state,
            bankAccountNumber: '',
            IFSC: ''
        };
        const groupData = {
            groupId: studentGroupId
          };
        const studentData = []
        const totalAmount = price
        const discount = {
            discountPercentage: ''
        }
        const taxes = ''
        const role = viewer?.role
        const programId = record?.programId
        const paymentMethod = ''

        try {
            const orders = await PaymentServices.createOrder(
                accountId,
                shopId,
                name,
                email,
                phoneNumber,
                studentData,
                groupData,
                billingAddress,
                price,
                totalAmount,
                discount,
                taxes,
                batchId,
                programId,
                paymentMethod,
                address,
                currencyCode,
                orderId,
                role
            );
            if (orders) {

                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onerror = () => {
                    alert('Razorpay SDK failed to load. Are you online?');
                };
                razorpayOrderMutation.mutate({ amount: price * 100 });
                script.onload = async () => {
                    try {
                        // Order was successfully created, proceed with Razorpay payment
                        const options = {
                            key_id: "rzp_live_dEK0tuIzoIyhpw",
                            amount: price * 100,
                            currency: currencyCode,
                            name: "Prahansoft",
                            description: "Test Transaction",
                            order_id: orderId,
                            image: "https://en.wikipedia.org/wiki/Pizza#/media/File:Pizza-3007395.jpg",
                            handler: async (res) => {
                                if (res.razorpay_payment_id) {
                                    studentPaymentMutation.mutate({
                                        orderId: orders?.placeOrder?.orders[0]._id,
                                        email, accountId, currencyCode, batchId, groupId, isPayment: true, paymentStatus, role: viewer?.role, program, price
                                    });

                                    toast.success('Assigned Successfully', {
                                        position: "top-right",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                    });
                                    setTimeout(() => {
                                        handleClose();
                                        setRecordsListRefresh(true)
                                        // refreshRecordsList();
                    
                                    }, "3000");
                                }

                            },
                            prefill: {
                                name: name,
                                email: email,
                                contact: number
                            },
                            notes: {
                                address: viewer?.profile?.address
                            },
                            theme: {
                                color: "#3399cc"
                            }
                        };

                        const paymentObject = new window.Razorpay(options);
                        paymentObject.open();
                    } catch (err) {
                        console.log(err)
                    }
                };

                document.body.appendChild(script);
            } else {
                // Handle the case where the order creation in PaymentServices failed
                //setError('Failed to create order in PaymentServices.');
            }

        } catch (err) {
            // Handle any errors that may occur during order creation or Razorpay payment
            /*  setError(err?.graphQLErrors[0]?.message)
             setAssign(true) */
        }
    }
    const currencySymbols = {
        USD: '$',
        INR: '₹',  // Rupee symbol
        EUR: '€',
        GBP: '£',
        // Add more currency codes and symbols as needed
    };
    const handleManually = async () => {
        const email = viewer?.primaryEmailAddress
        const name = viewer?.name
        const batchId = record?.id
        const accountId = viewer._id
        const groupId = studentGroupId
        const currencyCode = record?.currencyCode
        const price = record?.price
        // const isPayment = record?.isPayment
        const paymentStatus = "Paid"
        const number = viewer?.phoneNumber
        const program = record?.programName
        const address = viewer?.profile?.address
        const phoneNumber = viewer?.phoneNumber
        const billingAddress = {
            name: viewer?.name,
            email: email,
            city: viewer?.profile?.city,
            state: viewer?.profile?.state,
            bankAccountNumber: '',
            IFSC: ''
        };
        const groupData = {
            groupId: studentGroupId
          };
        const studentData = []
        const totalAmount = price
        const discount = {
            discountPercentage: ''
        }
        const taxes = ''
        const role = viewer?.role
        const programId = record?.programId
        const paymentMethod = ''
        const manualPayment = true


        try {
            const orders = await PaymentServices.createOrder(
                accountId,
                shopId,
                name,
                email,
                phoneNumber,
                studentData,
                groupData,
                billingAddress,
                price,
                totalAmount,
                discount,
                taxes,
                batchId,
                programId,
                paymentMethod,
                address,
                currencyCode,
                orderId,
                role,
                manualPayment
            );
            if (orders) {
                const assign = await PaymentServices.studentManualPayments(accountId, batchId, shopId, email, manualPayment, groupId);
                toast.success('Assigned Successfully', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    handleClose();
                    setRecordsListRefresh(true)
                    // refreshRecordsList();

                }, "3000");
            }
        }
        catch (err) {
            // Handle any errors that may occur during order creation or Razorpay payment
            /* setError(err?.graphQLErrors[0]?.message)
            setAssign(true) */
        }
    }

    const handleOpen = () => {
        setOpen(true)
    }

    if (view === "grid") {
        return (
            <JumboGridItem xs={12} sm={6} md={6} lg={4}>
                {viewer?.role == "College-Admin" && <Card>
                    <CardHeader
                        /*   avatar={
                              <JumboBookmark value={''} sx={{ verticalAlign: 'middle', fontSize: 'small' }} />
                          } */
                        action={
                            <IconButton aria-label="settings">
                                <JumboDdMenu
                                    icon={<MoreHorizIcon />}
                                    menuItems={[
                                        { icon: <DeleteIcon />, title: "Delete", action: "delete" }
                                    ]}
                                    onClickCallback={handleItemAction}
                                />
                            </IconButton>
                        }
                        sx={{ pb: 0 }}

                    >

                    </CardHeader>

                    <CardContent sx={{
                        pt: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Div sx={{ mb: 3 }}>
                            <Badge overlap="circular" variant="dot"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                sx={{
                                    '.MuiBadge-badge': {
                                        border: '2px solid #FFF',
                                        height: '14px',
                                        width: '14px',
                                        borderRadius: '50%',
                                        bgcolor: user ? "success.main" : "#757575"
                                    }
                                }}
                            >
                                <Avatar sx={{ width: 72, height: 72 }} alt={record.name} src={thumbnailImage} />
                            </Badge>
                        </Div>
                        <Typography
                            color={"text.primary"}
                            mb={.25}
                            sx={{ fontWeight: "bold" }}
                        >
                            {record.studentEmail}
                        </Typography>
                        <Typography variant={"h5"} mb={.75}>{record?.programs?.length ? record?.programs?.length : "-"}</Typography>
                        {record?.batchIds?.map((batch, index) => (
                            <Typography variant={"body1"} noWrap>{batch.batchId ? batch.batchId : "-"}
                            </Typography>
                        ))}

                        <Stack direction={"row"} alignSelf="stretch">
                            <Item1>
                                <Typography variant={"h6"} mb={.5}>  {record.invited ? <CheckCircleOutlinedIcon style={{ color: 'green' }} /> : <CancelOutlinedIcon />}</Typography>
                                <Typography variant={"body1"} color="text.secondary" fontSize={13}>Invited</Typography>
                            </Item1>
                            <Item1>
                                <Typography variant={"h6"} mb={.5}>{record.logged ? <CheckCircleOutlinedIcon style={{ color: 'green' }} /> : <CancelOutlinedIcon />}</Typography>
                                <Typography variant={"body1"} color="text.secondary" fontSize={13}>Logged In</Typography>
                            </Item1>
                            <Item1>
                                <Typography variant={"h6"} mb={.5}> {record.logged ? <CheckCircleOutlinedIcon style={{ color: 'green' }} /> : <CancelOutlinedIcon />}</Typography>
                                <Typography variant={"body1"} color="text.secondary" fontSize={13}>Verified</Typography>
                            </Item1>
                        </Stack>
                    </CardContent>
                    <CardActions sx={{ p: 0, mx: '-1px' }}>
                        <ButtonGroup size="large" fullWidth variant="outlined">
                            
                            <ActionButton onClick={showRecordDetail}>View Profile</ActionButton>
                        </ButtonGroup>
                    </CardActions>
                </Card>
                }

                {viewer?.role == "Student" &&

                    <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>
                        <CardHeader
                            avatar={
                                <div>

                                   
                                    {viewer?.role == "Student" && ""}
                                    {viewer?.role == <Typography style={{ marginTop: '3px', marginLeft: '5px', fontSize: '14px' }} variant="body2">{record?.selectedStartYear}-{record?.selectedEndYear}</Typography>}

                                </div>

                            }
                            action={
                                <IconButton aria-label="settings">
                                    {viewer?.role !== "Student" &&
                                        <JumboDdMenu
                                            icon={<MoreHorizIcon />}
                                            menuItems={[
                                                { icon: <ConnectWithoutContactIcon />, title: "Connect ", action: 'connect' },
                                                { icon: <EditIcon />, title: "Edit", action: "edit" },
                                                { icon: <PersonAddAlt1Icon />, title: "Invite Student", action: "Invite Student" },
                                                { icon: <DeleteIcon />, title: "Delete", action: "delete" }
                                            ]}
                                            onClickCallback={handleItemAction}
                                        />}

                                </IconButton>
                            }
                        >


                        </CardHeader>
                        <CardContent sx={{
                            pt: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <Div sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                textAlign: 'center'
                            }}
                            >
                                <Div sx={{ display: 'flex', mb: 2 }}>
                                    <Avatar sx={{ width: 52, height: 52 }} alt={record.name} src={record.img} style={{ marginTop: '-30px' }} />
                                </Div>
                                <Typography variant={"h6"} mb={2} style={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'capitalize' }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => { onProgramPreview(record?.program) }} 
                                sx={{
                                    mb: 2 ,
                                    textDecoration: isHovered ? "underline" : "none",
                                    color: isHovered ? "#04bfa0" : "inherit",
                                    cursor: "pointer",
                                    textTransform:'capitalize'
                                }}
                                >{record?.name}</Typography>
                                {viewer?.role == "Student" && ""}

                                <Div sx={{
                                    display: 'flex',
                                    minWidth: 0,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    alignSelf: 'stretch',
                                    width: '240px',
                                    maxWidth: '100%',
                                }}
                                >

                                   
                                    <Typography>{currencySymbols[record?.currencyCode]}{' '}{record?.price}</Typography>


                                </Div>
                                <Button
                                    sx={{ textTransform: 'none' }}
                                    variant='contained'
                                    color='success'
                                    disabled={record?.isPayment === true || (record?.isPayment === true && record?.manualPayment == null) || (record?.isPayment === false && record?.manualPayment === true)}
                                    onClick={handleOpen}
                                >
                                    {record?.isPayment === false && record?.manualPayment === true
                                        ? "Pending"
                                        : record?.isPayment === false
                                            ? "Pay now"
                                            : 'Paid'}
                                </Button>
                            </Div>
                        </CardContent>
                    </Card>
                }

                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />

            </JumboGridItem>
        )
    }
    return (
        <React.Fragment>
            <JumboListItem
                componentElement={"div"}
                itemData={record}
                secondaryAction={viewer?.role == "Student" ? <Button
                    sx={{ textTransform: 'none' }}
                    variant='contained'
                    color='success'
                    disabled={record?.isPayment === true || (record?.isPayment === true && record?.manualPayment == null) || (record?.isPayment === false && record?.manualPayment === true)}
                    onClick={handleOpen}
                >
                    {record?.isPayment === false && record?.manualPayment === true
                        ? "Pending"
                        : (record?.isPayment === false && record?.manualPayment == null) || record?.isPayment === false
                            ? "Pay now"
                            : 'Paid'}
                </Button>
                    :
                    <JumboDdMenu
                        icon={<MoreHorizIcon />}
                        menuItems={[
/*                             
 */                            { icon: <DeleteIcon />, title: "Remove", action: "delete" }
                        ]}
                        onClickCallback={handleItemAction}
                    />
                }

                sx={{
                    cursor: 'pointer',
                    borderTop: 1,
                    borderColor: 'divider',
                    '&:hover': {
                        bgcolor: 'action.hover',
                    }
                }}
            >

                
                <ListItemAvatar
                sx={{display:{xs:'none',sm:'block'}}}
                
                >
                    {(thumbnailImage) ? <Avatar src={thumbnailImage} /> : <Avatar>{firstLetter}</Avatar>}
                </ListItemAvatar>
                <ListItemText
                   
                    primary={
                        <Typography variant={"body1"} component={"div"}>
                            <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0 }}>
                                
                                {viewer.role === "College-Admin" && 
                                 <Item
                                 onClick={showRecordDetail}   
                                 sx={{
                                     flexBasis: { xs: '100%', sm: '50%', md: '35%' }
                                 }}
                                 >
                                  
                                     <Typography
                                     onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    style={{
                                        textDecoration: isHovered ? "underline" : "none",
                                        color: isHovered ? "#04bfa0" : "inherit",
                                        cursor: "pointer",
                                    }}
                                       > {record?.name}</Typography>
                                
                                 </Item>
                                 } 
                                    {viewer.role === "College-Admin" && 
                                 <Item
                                 sx={{
                                     flexBasis: { xs: '100%', sm: '50%', md: '40%' }
                                 }}
                                 >
                                     <Typography> {record?.phoneNumber}</Typography>
                                 </Item>
                                 } 

{
                                    viewer?.role === "College-Admin" && 
                                    <Item
                                   
                                        sx={{
                                            flexBasis: { xs: '100%', sm: '50%', md: '40%' }
                                        }}
                                    > <Typography variant={"h5"} fontSize={16}   lineHeight={1.25} mb={0}
                                   

                                    noWrap>{record?.studentEmail}</Typography>
                                        </Item>
                                }


                                   {
                                    viewer?.role === "Student" && <Item
                                        sx={{
                                            textTransform:'capitalize',
                                            flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                                        }}
                                    >
                                         <Typography variant={"h5"} fontSize={14} lineHeight={1.25} mb={0}
                                        noWrap>{record?.name}</Typography>  
                                    </Item>
                                }
                                <Item
                                    sx={{
                                        marginLeft: "60px",
                                        flexBasis: { sm: '40%', md: '26%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    {viewer?.role == "Student" &&
                                        <Typography variant={"body1"} noWrap
                                            sx={{ mr: 8 }}>
                                            {truncateDate}
                                        </Typography>            

                                    }


                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '40%', md: '30%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    {viewer?.role == "College-Admin" &&
                                        <Tooltip
                                            title={
                                                <ul>
                                                    {programList?.map((program, index) => (
                                                        <li key={index}>{program?.name}</li>
                                                    ))}
                                                </ul>
                                            }
                                        >
                                            <Typography variant={"body1"}   noWrap  >{record.programs?.length ? record.programs?.length : "-"}
                                            </Typography>
                                        </Tooltip>

                                    }


                                </Item>
                               

                                {viewer.role == "College-Admin" &&
                                    <Item
                                        sx={{
                                            flexBasis: { sm: '50%', md: '26%' },
                                            display: { xs: 'none', sm: 'block' }
                                        }}
                                    >
                                        
                                        <Typography variant={"body1"}  noWrap>{formatted}</Typography>
                                    </Item>
                                }


                                {
                                    viewer?.role == "Student" ? (<Item
                                    sx={{
                                        flexBasis: { md:'50%' },
                                        ml:"-20%",
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant="body1" noWrap 
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => { onProgramPreview(record?.program) }} 
                                    sx={{
                                        textDecoration: isHovered ? "underline" : "none",
                                        color: isHovered ? "#04bfa0" : "inherit",
                                        cursor: "pointer",
                                        textTransform:'capitalize'
                                    }}
                                    >{record?.program?.name}</Typography>
                                </Item>):(
                                     <Item
                                     sx={{
                                         flexBasis: { md: '13%' },
                                         display: { xs: 'none', md: 'block' }
                                     }}
                                 >
                                     <Typography variant="body1" noWrap>{record.invited ? <CheckCircleOutlinedIcon style={{ color: 'blue' }} /> : <CancelOutlinedIcon />}</Typography> 
                                 </Item>
                                )
                                }
                                {
                                    viewer?.role == "Student" && <Item
                                        sx={{
                                            flexBasis: { md: '40%' },
                                            ml:1.5,
                                            display: { xs: 'none', md: 'block' }
                                        }}
                                    ><Typography variant="body1" noWrap >{record?.price}</Typography>
                                    </Item>
                                }
                                <Item
                                    sx={{
                                        ml: -4,
                                        flexBasis: { md: '20%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant="body1" noWrap>
                                        {viewer?.role == "Student" ? ((record?.isPayment == true) ? <CheckCircleOutlinedIcon style={{ color: 'green' }} /> : <Typography style={{ color: '#f2b305'}}  >Pending</Typography>) : (record.logged ? <CheckCircleOutlinedIcon style={{ color: 'green', }} /> : <CancelOutlinedIcon />)}
                                    </Typography>
                                </Item>

                            </Stack>

                        </Typography>
                    }
                />
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                    maxWidth="lg"
                    PaperProps={{
                        sx: {
                            maxHeight: 1800,
                            borderRadius: '15px'
                        }
                    }}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Pay for Program"}
                    </DialogTitle>
                    <DialogContent>
                        <Grid item xs={12}>
                            <Grid container sx={2}>
                                <Grid item xs={3}>
                                    <Typography style={{ fontWeight: 'bold' }}>Program Name</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography style={{ marginLeft: '70px', fontWeight: 'bold' }}>Admission</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography style={{ marginLeft: '50px', fontWeight: 'bold' }}>Group Name</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography style={{ marginLeft: '30px', fontWeight: 'bold' }}>Price</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>

                            <div>
                                <ListItem alignItems={"centre"} sx={{ flexDirection: 'row', px: 3 }}>
                                    <ListItemText>

                                        <Typography style={{ marginLeft: '-20px' }} >{record?.programName}</Typography>
                                    </ListItemText>

                                    <ListItemText>
                                        <Typography style={{ marginLeft: '-55px' }}>
                                            {
                                                record?.name
                                            }
                                        </Typography>

                                    </ListItemText>
                                    <ListItemText>
                                        <Typography>-</Typography>
                                    </ListItemText>
                                    <ListItemText>
                                        <Typography>{record?.price}</Typography>
                                    </ListItemText>

                                </ListItem>
                            </div>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handlePayment} variant='contained'
                            sx={{ backgroundColor: "#f5793A", fontWeight: 'bold', color: "white" }}
                        >
                            Pay Online</Button>

                        <Button onClick={handleManually} variant='contained' autoFocus
                            sx={{ backgroundColor: "#44749d", fontWeight: 'bold', color: "white" }}
                        >
                            Pay Manually
                        </Button>
                    </DialogActions>
                </Dialog>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </JumboListItem >
        </React.Fragment >
    );
};
/* Todo record, view prop define */
export default GroupPreviewItem;