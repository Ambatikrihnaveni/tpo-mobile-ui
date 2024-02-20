import React from 'react'
import Div from '../../../../../../../@jumbo/shared/Div/Div'
import { MobileStepper, Typography, TextField, Button, Grid, Divider, Checkbox, Snackbar, Alert, IconButton, Link } from '@mui/material'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { KeyboardArrowLeft } from '@material-ui/icons'
import { KeyboardArrowRight } from '@material-ui/icons'
import { useState } from 'react';
import { useTheme } from "@mui/material/styles";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import useCurrentShopId from '../../../../../../../hooks/useCurrentShopId';
import MyProgramService from '../../../../../../../graphql/services/programs/myProgram-services';
import { useParams } from 'react-router';
import { CollegeAdmin } from '../../../../../../../graphql/services/college-admin/collegeAdmin-services';
import CloseIcon from '@mui/icons-material/Close';
import useAuth from '../../../../../../../hooks/useAuth';
import { ListItem, ListItemText } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { PaymentServices } from '../../../../../../../graphql/services/payment-services/paymentServices';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

const CREATE_ORDER_MUTATION = gql`
  mutation createRazorpayOrder($amount: Int!) {
    createRazorpayOrder(amount: $amount) {
      order_id
    }
  }
`;

const PAYMENT = gql`
mutation Payments($input: PaymentsInput!){
  Payments(input:$input){
    orders{
      _id
    }
  }
}
`

export default function AssignToProgram({ selectedRecords, onClose, setSelectedRecords, setIsDialog, handleOk }) {
  const [createOrder] = useMutation(CREATE_ORDER_MUTATION);
  const [Payments] = useMutation(PAYMENT)
  const [activeStep, setActiveStep] = useState(0);
  const { shopId } = useCurrentShopId()
  const params = useParams()
  const studentGroupId = params.groupId;
  const [combinedList, setCombinedList] = useState([])
  const [selectedMails, setSelectedMails] = useState([])
  const [open, setOpen] = React.useState(false);
  const { isViewerLoading, viewer, data } = useAuth();
  const [email, setEmail] = useState(viewer.primaryEmailAddress)
  const [firstName, setFirstName] = useState(viewer.name)
  const [lastName, setLastName] = useState(viewer.lastName)
  const [number, setNumber] = useState(viewer.phoneNumber)
  const [programsList, setProgramsList] = useState([])
  const [selectedPrograms, setSelectedPrograms] = useState(null);
  const [batchesId, setBatchesId] = useState(null)
  const [bachesName, setBatchesName] = useState('')
  const [prices, setSelectedPrices] = useState('')
  const [currency, setSelectedCurrency] = useState('')
  const [selectedBatches, setSelectedBatches] = useState([])
  const [batchesCount, setBatchesCount] = useState([])
  const [maximumLimit, setMaximumLimit] = useState('')
  const [availableSeats, setAvailableSeats] = useState('')
  const [selectedEmail, setSelectedEmail] = useState([])
  const [checked, setChecked] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState(null)
  const [orderId, setOrderId] = useState('')
  const theme = useTheme();
  const [error, setError] = useState('')
  const [assign, setAssign] = useState('')
  const navigate = useNavigate();



  const handleCheckbatchChange = (event, batchName, batchID, maxLimit, seatsAvailable) => {
    if (event.target.checked) {
      setBatchesId(batchID);
      setBatchesName(batchName);
      setMaximumLimit(maxLimit);
      setAvailableSeats(maxLimit - seatsAvailable)
    } else {
      setBatchesId(null)
      setBatchesName(null)
      setMaximumLimit(null);
      setAvailableSeats(null)

    }
  }
  const handleCheckboxChange = (event, programName, price, currency, batches, programId) => {
    let admissions = [];
    let futureAdmissions = [];
    let currentAdmissions = [];
    if(batches?.length > 0) {
      for(let batch of batches) {
        let enrolementEndDateString = batch.enrolementEndDate;
        let enrolementStartDateString = batch.enrolementStartDate;

        let enrolementEndDate = new Date(enrolementEndDateString);
        let enrolementStartDate = new Date(enrolementStartDateString);

        let enrolementEndDateInMilliSeconds = enrolementEndDate.getTime();
        let acutalEnrolementEndDateInMilliSeconds = enrolementEndDateInMilliSeconds + (23 * 59 * 59 * 1000);

        let enrolementStartDateInMilliSeconds = enrolementStartDate.getTime();

        let today = new Date();
        let todayInMilliSeconds = today.getTime();

        if(todayInMilliSeconds < enrolementStartDateInMilliSeconds) {
          futureAdmissions.push(batch)
        }else if(enrolementStartDateInMilliSeconds <= todayInMilliSeconds && todayInMilliSeconds <= acutalEnrolementEndDateInMilliSeconds) {
          currentAdmissions.push(batch)
        }
      }
    }
    admissions = admissions.concat(currentAdmissions);
    admissions = admissions.concat(futureAdmissions);

    if (event.target.checked) {
      setSelectedPrograms(programName);
      setSelectedPrices(price);
      setSelectedCurrency(currency);
      setSelectedBatches(admissions);
      setSelectedProgramId(programId)
    } else {
      setSelectedPrograms(null);
      setSelectedPrice(null);
      setSelectedCurrency(null);
      setSelectedBatches(null);

    }
  };

  const handleEmailChange = () => {
    setEmail(event.target.value)
  }
  const handleNumberChange = () => {
    setNumber(event.target.value)
  }
  const handleFirstNameChange = () => {
    setFirstName(event.target.value)
  }
  const handleLastNameChange = () => {
    setLastName(event.target.value)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  React.useEffect(() => {
    let emails = []
    for (let i = 0; i < selectedRecords.length; i++) {
      emails.push(selectedRecords[i].studentEmail)
    }
    setSelectedMails(emails)
  }, [selectedRecords])

  React.useEffect(() => {
    let batchData = []
    for (let i = 0; i < selectedBatches?.length; i++) {
      batchData.push(selectedBatches[i])
    }
    setBatchesCount(batchData)
  }, [selectedBatches])

  const currencySymbols = {
    INR: '₹',  // Rupee symbol
    USD: '$',
    EUR: '€',
    GBP: '£',
    // Add more currency codes and symbols as needed
  };


  const handleNext = async (event) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const programs = await MyProgramService.getRecords(shopId, {});
    let combinedList = [];
    let programsData = []
    let i;
    for (i = 0; i < programs.all.length; i++) {
      const program = programs.all[i];
      if (program.batches?.length > 0) {
        programsData.push(program)

      }
    }
    setProgramsList(programsData)


  }


  // Function to handle input text changes

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleRemoveStudent = (studentEmailToRemove) => {
    const updatedSelectedRecords = selectedRecords.filter(
      student => student.studentEmail !== studentEmailToRemove
    );

    setSelectedRecords(updatedSelectedRecords);
  };

  const isStepValid = () => {
    if (activeStep === 0) {
      return selectedRecords.length > 0;
    } else if (activeStep === 1) {
      return selectedPrograms;
    } else if (activeStep === 2) {
      return batchesId;
    }
    return true; // Return true for other steps
  };

  const handleInvite = async () => {
    const selectedStudents = selectedRecords.filter(student => student.logged)
    const studentMails = []
    for (let i = 0; i < selectedStudents.length; i++) {
      studentMails.push(selectedStudents[i].studentEmail)
    }

    setSelectedMails(studentMails)
    if (studentMails
      .length > availableSeats) {
      setOpen(true)
    } else {
      try {
        const { data } = await CollegeAdmin.assignStudentsToBatch(studentGroupId, { batchId: batchesId, studentEmails: studentMails });
         onClose();
        setTimeout(() => {
          navigate("/groups"); 
        }, 3000);        
        setIsDialog(true)
        setSelectedRecords([])
      } catch (err) {
        setError(err?.graphQLErrors[0]?.message)
        setAssign(true)
        //setLoading(false);
      }
    }
  }
  const handlePayment = async () => {
    const cost = selectedRecords
      .filter(student => student.logged)
      .length * prices
    const amount = cost * 100
    const script = document.createElement('script');

    const accountId = viewer?._id;
    const studentData = selectedRecords
      .filter(student => student.logged === true)
      .map(student => student.studentEmail);
    const name = viewer?.name;
    const phoneNumber = number;
    const billingAddress = {
      name: viewer?.name,
      email: email,
      city: viewer?.profile?.city,
      state: viewer?.profile?.state,
      bankAccountNumber: '',
      IFSC: ''
    };

    const result = prices * studentData.length;
    const resultString = result.toString();
    const price = resultString;
    const discount = {
      discountPercentage: '',
    };
    const total = result * (1 - discount.discountPercentage / 100);
    const totalAmount = total.toString();
    const taxes = '';

    const batchId = batchesId

    const groupData = {
      groupId: studentGroupId
    };
    const programId = selectedProgramId

    const paymentMethod = '';
    const address = viewer?.profile?.address;
    const currencyCode = currency;
    const role = viewer?.role
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
        setOrderId(orders?.placeOrder?.orders[0]._id)
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onerror = () => {
          alert('Razorpay SDK failed to load. Are you online?');
        };
        script.onload = async () => {
          try {
            const assign = await CollegeAdmin.assignStudentsToBatch(studentGroupId, { batchId: batchesId, studentEmails: studentData });
            const { data } = await createOrder({ variables: { amount: amount } });
            const options = {
              key_id: "rzp_live_dEK0tuIzoIyhpw",
              amount: amount,
              currency: currency,
              name: "Prahansoft",
              description: "Test Transaction",
              order_id: data?.createRazorpayOrder?.order_id,
              image: "https://en.wikipedia.org/wiki/Pizza#/media/File:Pizza-3007395.jpg",
              handler: async (res) => {
                if (res.razorpay_payment_id) {
                  const assign = await CollegeAdmin.assignStudentsToBatch(studentGroupId, { batchId: batchesId, studentEmails: studentData });
                  const payments = await Payments({
                    variables: {
                      input: {
                        accountId,
                        orderId: orders?.placeOrder?.orders[0]._id,
                        paymentStatus: "Paid",
                        email,
                        role: viewer?.role


                      }
                    }
                  })
                  onClose()
                  navigate("/groups")
                }

              },
              prefill: {
                name: viewer?.name,
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
            setError(err?.graphQLErrors[0]?.message)
            setAssign(true)
          }
        };

        document.body.appendChild(script);
      } else {
        // Handle the case where the order creation in PaymentServices failed
        setError('Failed to create order in PaymentServices.');
      }
    } catch (err) {
      // Handle any errors that may occur during order creation or Razorpay payment
      setError(err?.graphQLErrors[0]?.message)
      setAssign(true)
    }

  }

  const handleCashPayment = async () => {
    const cost = selectedRecords
      .filter(student => student.logged)
      .length * prices
    const amount = cost * 100
    const script = document.createElement('script');

    const accountId = viewer?._id;
    const studentData = selectedRecords
      .filter(student => student.logged === true)
      .map(student => student.studentEmail);
    const name = viewer?.name;
    const phoneNumber = number;
    const billingAddress = {
      name: viewer?.name,
      email: email,
      city: viewer?.profile?.city,
      state: viewer?.profile?.state,
      bankAccountNumber: '',
      IFSC: ''
    };

    const result = prices * studentData.length;
    const resultString = result.toString();
    const price = resultString;
    const discount = {
      discountPercentage: '',
    };
    const total = result * (1 - discount.discountPercentage / 100);
    const totalAmount = total.toString();
    const taxes = '';

    const batchId = batchesId

    const groupData = {
      groupId: studentGroupId
    };
    const programId = selectedProgramId

    const paymentMethod = '';
    const address = viewer?.profile?.address;
    const currencyCode = currency;
    const role = viewer?.role
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
        const assign = await CollegeAdmin.assignStudentsToBatch(studentGroupId, { batchId: batchesId, studentEmails: studentData }, manualPayment);
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
          onClose();
          navigate("/groups");  
        }, 3000);
      }
    } catch (err) {
      // Handle any errors that may occur during order creation or Razorpay payment
      setError(err?.graphQLErrors[0]?.message)
      setAssign(true)
    }

  }

  return (
    <Div>

      <div style={{ position: 'relative' }}>
        <IconButton
          style={{ position: 'absolute', top: 0, right: 0 }}
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        {activeStep === 0 && (
          <>
            <Typography variant='h3' style={{ fontWeight: 'bold', marginBottom: '5px' }}>Selected Students to assign Program
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={12}>
                <div style={{ display: 'flex' }}>
                  <PermIdentityOutlinedIcon />
                  <Typography>{selectedRecords.length} Students Selected</Typography>
                </div>
              </Grid>
              <Grid item>
                    <Typography sx={{fontWeight: 'bold',ml:2}}>Emails </Typography>
                  </Grid>
              <Grid item xs={12}>
                <Div style={{ border: '1px solid lightgray', borderRadius: '10px', marginBottom: '50px' }} >
                  
                  {selectedRecords?.filter(student => student.logged === true)
                    .map((student, index) => (
                      <Grid container spacing={3} style={{ padding: '10px' }} key={index}>
                        <Grid item xs={10}>
                          <Typography style={{ marginLeft: '10px', color: '#262729', }}>{student.studentEmail}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton onClick={() => handleRemoveStudent(student.studentEmail)}>
                            <ClearOutlinedIcon />
                          </IconButton>
                        </Grid>
                        <Divider />
                      </Grid>
                    ))}
                </Div>
                <Typography style={{ margin: '10px' }}>* Note:You can only assign programs to students who are already registered</Typography>
              </Grid>
            </Grid>

          </>
        )}
      </div>
      <div>
        {activeStep === 1 && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h3' style={{ fontWeight: 'bold', marginBottom: '15px' }}>Programs</Typography>
              </Grid>
              <Grid item xs={12}>
                <div style={{ display: 'flex' }}>
                  <PermIdentityOutlinedIcon />
                  <Typography> Select a program for your Students</Typography>
                </div>
                <Grid item xs={12}>
                <Grid container sx={2}>
                  <Grid item xs={2}>
                    <Typography></Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{fontWeight: 'bold'}}>Program</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography></Typography>
                  </Grid>
                  <Grid item xs={2.1}>
                    <Typography sx={{ fontWeight: 'bold' }}>Available Seats</Typography>
                  </Grid>
                </Grid>
              </Grid>

              </Grid>
              <Grid item xs={12} marginBottom={6}>
                <Div style={{ border: '1px solid lightgray', borderRadius: '10px', minHeight: '200px', maxHeight: '350px', overflow: 'scroll' }}>
                  <Grid container spacing={2}>
                    {programsList.map((item, index) => (
                      <Grid item xs={12} key={index}>
                        <Typography>
                          <Grid container spacing={1}>
                            <Grid item xs={2}>
                              <Checkbox
                                name="program"
                                checked={selectedPrograms === item.name}
                                onChange={(event) => handleCheckboxChange(event, item.name, item.price, item.priceType, item.batches, item.id)}
                              />
                            </Grid>
                            <Grid item xs={4} marginTop={2}>
                              <Typography variant="h4"> {item.name}</Typography>
                            </Grid>
                            <Grid item xs={3} marginTop={2}>
                              <Typography variant="h4"> {item.account.name}</Typography>
                            </Grid>
                            <Grid item xs={3} marginTop={2}>
                              <Typography variant="h4"> {item.createdDate}</Typography>
                            </Grid>
                          </Grid>
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Div>
              </Grid>
            </Grid>
          </>
        )}
      </div>
      <div>
        {activeStep === 2 && (

          <div>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h3' style={{ fontWeight: 'bold', marginBottom: '15px' }}>Program Admissions</Typography>
              </Grid>
              <Grid item xs={12}>
                <div style={{ display: 'flex' }}>
                  <PermIdentityOutlinedIcon />
                  <Typography> Select an Admission for your Students</Typography>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Grid container sx={2}>
                  <Grid item xs={2.1}>
                    <Typography  sx={{ fontWeight: 'bold'}}></Typography>
                  </Grid>
                  <Grid item xs={4.9}>
                    <Typography  sx={{ fontWeight: 'bold'}}>Program</Typography>
                  </Grid>
                  <Grid item xs={1.8}>
                    <Typography  sx={{ fontWeight: 'bold'}}>Start Date</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography  sx={{ fontWeight: 'bold'}}>Available Time</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} marginBottom={6}>
                <Div style={{ border: '1px solid lightgray', borderRadius: '10px', padding: '10px', minHeight: '200px', maxHeight: '350px', overflow: 'scroll' }}>

                  {batchesCount.map((item, itemIndex) => {
                    return (
                      <Grid container spacing={2} key={itemIndex}>

                        <Grid item xs={2}>
                          <Checkbox style={{ marginTop: '9px' }}
                            name="batches"
                            checked={batchesId === item._id}
                            onChange={(event) => handleCheckbatchChange(event, item.name, item._id, item.batch_max_limit, item.seatsFilled)}
                          />
                        </Grid>
                        <Grid item xs={5} marginTop={2}>
                          <Typography>{item.name}</Typography>
                        </Grid>
                        <Grid item xs={2} marginTop={2}>
                          <Typography>{item.startDate}</Typography>
                        </Grid>
                        <Grid item xs={3} marginTop={2}>
                          <Typography>{item.batchStartTime}-{item.batchEndTime}</Typography>
                        </Grid>

                      </Grid>
                    );

                    return null;
                  })}
                </Div>
              </Grid>
            </Grid>

          </div>
        )}
      </div>
      <div>
        {activeStep === 3 && (

          <div>

            <Grid container spacing={2} marginBottom={6}>
              <Grid item xs={12}>
                <Typography variant='h3' style={{ fontWeight: 'bold', marginBottom: '15px' }}>Payment</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container sx={2}>
                  <Grid item xs={12} lg={2}
                  sx={{ 
                    '@media (max-width: 600px)': {
                      marginBottom: '25px', // Apply margin in mobile view
                    },
                  }} >
                    <Typography  sx={{ fontWeight: 'bold'}}>Program</Typography>
                  </Grid>
                  <Grid item xs={12} lg={2.1}
                  sx={{ 
                   '@media (max-width: 600px)': {
                     marginBottom: '11px',
                     marginLeft: 'auto', // Apply margin in mobile view
                   },
                 }} >
                    <Typography  sx={{ fontWeight: 'bold'}}>Students</Typography>
                  </Grid>
                  <Grid item  xs={12} lg={2.1}
                   sx={{ 
                    '@media (max-width: 600px)': {
                      marginBottom: '11px', // Apply margin in mobile view
                    },
                  }} >
                    <Typography  sx={{ fontWeight: 'bold'}}>Total Seats</Typography>
                  </Grid>
                  <Grid item  xs={12} lg={1.7}
                   sx={{ 
                    '@media (max-width: 600px)': {
                      marginBottom: '11px', // Apply margin in mobile view
                    },
                  }} >
                    <Typography  sx={{ fontWeight: 'bold'}}>Available Seats</Typography>
                  </Grid>
                  <Grid item xs={12} lg={1.7}
                   sx={{ 
                    '@media (max-width: 600px)': {
                      marginBottom: '11px', // Apply margin in mobile view
                    },
                  }} >
                    <Typography  sx={{ fontWeight: 'bold'}}>Price</Typography>
                  </Grid>
                  <Grid item xs={12} lg={2.1}
                   sx={{ 
                    '@media (max-width: 600px)': {
                      marginBottom: '11px', // Apply margin in mobile view
                    },
                  }} >
                    <Typography  sx={{ fontWeight: 'bold'}}>Total</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>

                <div>
                  <ListItem  alignItems="center"
                      sx={{
                        px: 3,
                        flexDirection: 'column', // Stack items vertically in mobile view
                       
                        '@media (max-width: 600px)': {
                          flexDirection: 'column', // Stack items vertically in mobile view
                          marginTop: '-254px', // Apply negative top margin for mobile view
                          marginLeft:'15px',
                          justifyContent: 'flex-start',
                        },
                        '@media (min-width: 600px)': {
                          flexDirection: 'row', // Switch to horizontal layout on larger screens
                          justifyContent: 'space-between', // Align items to the end in laptop view
                        },
                      }}>
                    <ListItemText
                      primary={
                        <Typography variant='h4'>{bachesName}</Typography>
                      }
                      secondary={
                        <Typography style={{ fontSize: '11px' }}>{selectedPrograms}</Typography>
                      }
                    />
                    <ListItemText>
                      <Typography>
                        {
                          selectedRecords
                            .filter(student => student.logged)
                            .length
                        }
                      </Typography>

                    </ListItemText>
                    <ListItemText>
                      <Typography sx={{marginLeft:"15px"}}>{maximumLimit}</Typography>
                    </ListItemText>
                    <ListItemText>
                      <Typography>{availableSeats}</Typography>
                    </ListItemText>
                    <ListItemText>
                      <Typography>{prices}</Typography>
                    </ListItemText>
                    <ListItemText>
                      <Typography>
                        {currencySymbols[currency]}{' '}
                        {selectedRecords
                          .filter(student => student.logged)
                          .length * prices}</Typography>
                    </ListItemText>
                  </ListItem>
                </div>
              </Grid>
              <center>
                <Collapse in={open}>
                  <Alert
                    severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    Selected Students are more than Available seats </Alert>
                </Collapse>
              </center>
              <Collapse in={assign}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setAssign(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {error} </Alert>
              </Collapse>
            </Grid>

          </div>
        )
        }

      </div >
      <div>
        {activeStep === 4 && (

          <div>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h3' style={{ fontWeight: 'bold', marginBottom: '15px' }}>Billing Details</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="First Name" fullWidth value={firstName} onChange={handleFirstNameChange} // Add an onChange event handler
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Last Name" fullWidth value={lastName} onChange={handleLastNameChange} // Add an onChange event handler
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Email" fullWidth value={email} onChange={handleEmailChange} // Add an onChange event handler
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Phone Number" fullWidth value={number} onChange={handleNumberChange} // Add an onChange event handler
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h4' fontWeight={'bold'}>Payment Methods</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body1'>Credit Card/ Debit Card/ NetBanking</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <img src='/payment.svg' alt='RazorPay' />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Pay securely by Credit or Debit card or Internet Banking through Razorpay.

                      Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our<Link href="https://tpo.ai"> privacy policy</Link>.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <div style={{ display: 'flex' }}>
                      <Checkbox style={{ marginBottom: '10px' }} />
                      <Typography> I have read and agree to the website <Link href="https://tpo.ai"> terms and conditions</Link> *
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h3' fontWeight={'bold'}>Your Order</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography fontWeight={'bold'}>Program</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography fontWeight={'bold'}>Sub Total</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography>{selectedPrograms}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography>{prices}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography fontWeight={'bold'}>Sub Total</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography>
                      {currencySymbols[currency]}{' '}
                      {selectedRecords
                        .filter(student => student.logged)
                        .length * prices}</Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography style={{ color: 'blue', fontSize: '2.4rem', justifyItems: 'center', marginLeft: '20px' }}>
                      {currencySymbols[currency]}{' '}
                      {selectedRecords
                        .filter(student => student.logged)
                        .length * prices}</Typography>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
            <Collapse in={assign}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setAssign(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {error} </Alert>
            </Collapse>

          </div>
        )
        }

      </div >
      <MobileStepper
        variant="dots"
        steps={5}
        position="static"
        activeStep={activeStep}
        sx={{
          //maxWidth: 300,
          flexGrow: 1,
          bgcolor: 'background.paper',
          // Reduce the gap between buttons by adjusting margin
          margin: '0 auto',
          display: 'flex',
          marginLeft: '-10px',
          justifyContent: 'space-between', // Distribute space evenly between buttons
        }}
        nextButton={
          activeStep === 4 ? (
            <Button
              size="small"
              variant='contained'
              onClick={handlePayment} // Call payWithRazorpay when the button is clicked
              disabled={!isStepValid()}
            >
              Place Order
            </Button>
          ) :
            activeStep <= 2 ? ( // Check if activeStep is less than or equal to 2
              <Button
                size="small"
                onClick={handleNext}
                disabled={!isStepValid()}
                variant='contained'
              >
                Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            ) : (
              <div style={{ display: 'flex', gap: 6,
              '@media (max-width: 600px)': {
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
              },
               }} xs={12} lg={2.1}>
                <Button
                  size="small"
                  onClick={handleCashPayment} // Custom function for the "Assign" button
                  disabled={!isStepValid()}
                  variant='contained'
                  sx={{backgroundColor:"#44749d",fontWeight: 'bold',color:"white"}}
                  style={{ marginLeft: '10px' }}
                  fullWidth
                >
                  Pay Manually and Assign
                </Button>
                <Button
                  size="small"
                  onClick={handleInvite} // Custom function for the "Assign" button
                  disabled={!isStepValid()}
                  sx={{backgroundColor:"#382119"}}
                  variant='contained'
                  style={{ marginLeft: '10px',fontWeight: 'bold',color:"white"}}
                  fullWidth
                >
                  Assign 
                </Button>
                <Button
                  size="small"
                  fullWidth
                  onClick={handleNext} // Custom function for the "Pay and Assign" button
                  disabled={!isStepValid()}
                  variant='contained'
                  sx={{backgroundColor:"#f5793A",fontWeight: 'bold'}}
                >
                  Pay and Assign
                </Button>
              </div>
            )
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0} variant='outlined'>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
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
    </Div >
  )
}

