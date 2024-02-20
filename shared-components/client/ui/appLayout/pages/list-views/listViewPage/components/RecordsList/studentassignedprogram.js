import React from 'react'
import { MobileStepper, Typography, TextField, Button, Grid, Checkbox, Alert, IconButton, Link } from '@mui/material'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { KeyboardArrowLeft } from '@material-ui/icons'
import { KeyboardArrowRight } from '@material-ui/icons'
import { useState } from 'react';
import { useTheme } from "@mui/material/styles";
import { useParams } from 'react-router';
import { ListItem, ListItemText } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import useAuth from '../../../../../../hooks/useAuth';
import Div from '../../../../../../@jumbo/shared/Div/Div';
import { PaymentServices } from '../../../../../../graphql/services/payment-services/paymentServices';
import gql from 'graphql-tag';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation } from '@apollo/react-hooks';
import { CollegeAdmin } from '../../../../../../graphql/services/college-admin/collegeAdmin-services';
import MyProgramService from '../../../../../../graphql/services/programs/myProgram-services'
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
}`


function StudentAssignToProgram({ selectedRecords, onClose, setSelectedRecords, setIsDialog, handleOk, record }) {
  const [createOrder] = useMutation(CREATE_ORDER_MUTATION);
  const [Payments] = useMutation(PAYMENT)
  const [activeStep, setActiveStep] = useState(0);
  const shopId = record?.shopId
  const params = useParams()
  const studentGroupId = params.groupId;
  const [combinedList, setCombinedList] = useState([])
  const [selectedMails, setSelectedMails] = useState([])
  const [open, setOpen] = React.useState(false);
  const { isViewerLoading, viewer, data } = useAuth();
  const [email, setEmail] = useState(viewer.primaryEmailAddress)
  const [firstName, setFirstName] = useState(viewer.firstName)
  const [lastName, setLastName] = useState(viewer.lastName)
  const [number, setNumber] = useState(viewer.phoneNumber)
  const [programsList, setProgramsList] = useState([])
  const [selectedPrograms, setSelectedPrograms] = useState(null);
  const [batchesId, setBatchesId] = useState(null)
  const [bachesName, setBatchesName] = useState('')
  const [price, setSelectedPrice] = useState('')
  const [currency, setSelectedCurrency] = useState('')
  const [selectedBatches, setSelectedBatches] = useState([])
  const [batchesCount, setBatchesCount] = useState([])
  const [maximumLimit, setMaximumLimit] = useState('')
  const [availableSeats, setAvailableSeats] = useState('')
  const [selectedEmail, setSelectedEmail] = useState([])
  const [checked, setChecked] = useState(false);
  const theme = useTheme();
  const [orderId, setOrderId] = useState('')
  const [error, setError] = useState('')
  const [assign, setAssign] = useState('');
  const [admissions, setAdmissions] = useState([]);
  const handleCheckbatchChange = (event, batchName, batchID, maxLimit, seatsAvailable) => {
    if (event.target.checked) {
      setBatchesId(batchID);
      setBatchesName(batchName);
      setMaximumLimit(maxLimit);
      setAvailableSeats(seatsAvailable);
    } else {
      setBatchesId(null)
      setBatchesName(null)
      setMaximumLimit(null);
      setAvailableSeats(null)

    }
  }
  const handleCheckboxChange = (event, programName, price, currency, batches) => {
    if (event.target.checked) {
      setSelectedPrograms(programName);
      setSelectedPrice(price);
      setSelectedCurrency(currency);
      setSelectedBatches(batches);

    } else {
      setSelectedPrograms(null);
      setSelectedPrice(null);
      setSelectedCurrency(null);
      setSelectedBatches(null);

    }
  };

  const currencySymbols = {
    INR: '₹',  // Rupee symbol
    USD: '$',
    EUR: '€',
    GBP: '£',
    // Add more currency codes and symbols as needed
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
  }, [selectedRecords]);

  React.useEffect(() => {
    let admissionsData = [];
    let futureAdmissions = [];
    let currentAdmissions = [];
    let batches = record?.batches;
    if (batches?.length > 0) {
      for (let batch of batches) {
        let enrolementEndDateString = batch.enrolementEndDate;
        let enrolementStartDateString = batch.enrolementStartDate;

        let enrolementEndDate = new Date(enrolementEndDateString);
        let enrolementStartDate = new Date(enrolementStartDateString);

        let enrolementEndDateInMilliSeconds = enrolementEndDate.getTime();
        let acutalEnrolementEndDateInMilliSeconds = enrolementEndDateInMilliSeconds + (23 * 59 * 59 * 1000);

        let enrolementStartDateInMilliSeconds = enrolementStartDate.getTime();

        let today = new Date();
        let todayInMilliSeconds = today.getTime();

        if (todayInMilliSeconds < enrolementStartDateInMilliSeconds) {
          futureAdmissions.push(batch)
        } else if (enrolementStartDateInMilliSeconds <= todayInMilliSeconds && todayInMilliSeconds <= acutalEnrolementEndDateInMilliSeconds) {
          currentAdmissions.push(batch)
        }
      }
    }

    admissionsData = admissionsData.concat(currentAdmissions);
    admissionsData = admissionsData.concat(futureAdmissions);

    setAdmissions(admissionsData);
  }, [])

  React.useEffect(() => {
    let batchData = []
    for (let i = 0; i < selectedBatches?.length; i++) {
      batchData.push(selectedBatches[i])
    }
    setBatchesCount(batchData)
  }, [selectedBatches])



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
      return batchesId;
      /* } else if (activeStep === 1) {
        return selectedPrograms;
      } else if (activeStep === 2) {
        return batchesId; */
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
      const { data } = await CollegeAdmin.assignStudentsToBatch(studentGroupId, { batchId: batchesId, studentEmails: studentMails });
      onClose()
      setIsDialog(true)
      setSelectedRecords([])
    }
  }

  const handlePayment = async () => {
    const accountId = viewer?._id
    const name = viewer?.name
    const email = viewer.primaryEmailAddress
    const totalAmount = record?.price
    const price = record?.price
    const programId = record?.id
    const paymentMethod = ''
    const address = viewer?.profile?.address
    const currencyCode = record?.priceType
    const billingAddress = {
      name: viewer?.name,
      email: email,
      city: viewer?.profile?.city,
      state: viewer?.profile?.state,
      bankAccountNumber: '',
      IFSC: ''
    };
    const batchId = batchesId
    const phoneNumber = viewer?.phoneNumber
    const studentData = []
    const groupData = {
      groupName: '',
      studentData: []
    }
    const discount = {
      discountPercentage: ''
    }
    const taxes = ''
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
            // Order was successfully created, proceed with Razorpay payment
            const { data } = await createOrder({ variables: { amount: parseInt(price * 100) } });
            const options = {
              key_id: "rzp_live_dEK0tuIzoIyhpw",
              amount: parseInt(price * 100),
              currency: currencyCode,
              name: "Prahansoft Pvt Ltd",
              description: "Test Transaction",
              order_id: data?.createRazorpayOrder?.order_id,
              image: "https://en.wikipedia.org/wiki/Pizza#/media/File:Pizza-3007395.jpg",
              handler: async (res) => {
                if (res.razorpay_payment_id) {
                  const payments = await Payments({
                    variables: {
                      input: {
                        accountId,
                        orderId: orders?.placeOrder?.orders[0]._id,
                        paymentStatus: "Paid",
                        email,
                        role: viewer?.role,
                        programId,
                        batchId


                      }
                    }
                  })
                  setOrderId('')
                  onClose()
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
            alert(err)
            /* setError(err?.graphQLErrors[0]?.message)
            setAssign(true) */
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

    const accountId = viewer?._id
    const name = viewer?.name
    const email = viewer.primaryEmailAddress
    const totalAmount = record?.price
    const price = record?.price
    const programId = record?.id
    const paymentMethod = ''
    const address = viewer?.profile?.address
    const currencyCode = record?.priceType
    const billingAddress = {
      name: viewer?.name,
      email: email,
      city: viewer?.profile?.city,
      state: viewer?.profile?.state,
      bankAccountNumber: '',
      IFSC: ''
    };
    const batchId = batchesId
    const phoneNumber = viewer?.phoneNumber
    const studentData = []
    const groupData = {
      groupName: '',
      studentData: []
    }
    const discount = {
      discountPercentage: ''
    }
    const taxes = ''
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
        const data = await PaymentServices.studentManualPayments(accountId, batchId, shopId, email, manualPayment)
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
          // refreshRecordsList();

        }, "3000");
      }
    } catch (err) {
      // Handle any errors that may occur during order creation or Razorpay payment
      setError(err?.graphQLErrors[0]?.message)
      setAssign(true)
    }

  }

  return (
    <Div>
      <Div style={{ color: 'white', alignSelf: 'flex-end', textAlign: 'end' }}>
        <IconButton
          onClick={onClose}
          aria-label="close"
          sx={{ mt: 2 }}
        >
          <CloseIcon />
        </IconButton>
      </Div>
      <div>
        {activeStep === 0 && (

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
                    <Typography sx={{ fontWeight: 'bold' }}></Typography>
                  </Grid>
                  <Grid item xs={4.9}>
                    <Typography sx={{ fontWeight: 'bold' }}>Program</Typography>
                  </Grid>
                  <Grid item xs={1.8}>
                    <Typography sx={{ fontWeight: 'bold' }}></Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography sx={{ fontWeight: 'bold' }}>Available Time</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} marginBottom={6}>
                <Div style={{ border: '1px solid lightgray', borderRadius: '10px', padding: '10px', minHeight: '200px', maxHeight: '350px', overflow: 'scroll' }}>

                  {admissions?.map((item, itemIndex) => {
                    return (
                      <Grid container spacing={2} key={itemIndex}>

                        <Grid item xs={2}>
                          <Checkbox style={{ marginTop: '9px' }}
                            name="batches"
                            checked={batchesId === item._id}
                            onChange={(event) => handleCheckbatchChange(event, item.name, item._id, item.batch_max_limit, item.seatsAvailable)}
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
        {activeStep === 1 && (

          <div>

            <Grid container spacing={2} marginBottom={6}>
              <Grid item xs={12}>
                <Typography variant='h3' style={{ fontWeight: 'bold', marginBottom: '15px' }}>Payment</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container sx={2}>
                  <Grid item xs={12} lg={3.2}
                    sx={{
                      '@media (max-width: 600px)': {
                        marginBottom: '25px', // Apply margin in mobile view
                      },
                    }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Program</Typography>
                  </Grid>

                  <Grid item xs={12} lg={2.1}
                    sx={{
                      '@media (max-width: 600px)': {
                        marginBottom: '11px',
                        marginLeft: 'auto', // Apply margin in mobile view
                      },
                    }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Total Seats</Typography>
                  </Grid>
                  <Grid item xs={12} lg={2.1}
                    sx={{
                      '@media (max-width: 600px)': {
                        marginBottom: '11px', // Apply margin in mobile view
                      },
                    }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Available Seats</Typography>
                  </Grid>
                  <Grid item xs={12} lg={2.1}
                    sx={{
                      '@media (max-width: 600px)': {
                        marginBottom: '11px', // Apply margin in mobile view
                      },
                    }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Price</Typography>
                  </Grid>
                  <Grid item xs={12} lg={2.1}
                    sx={{
                      '@media (max-width: 600px)': {
                        marginBottom: '11px', // Apply margin in mobile view
                      },
                    }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Total</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>

                <div>
                  <ListItem
                    alignItems="center"
                    sx={{
                      px: 3,
                      flexDirection: 'column', // Stack items vertically in mobile view

                      '@media (max-width: 600px)': {
                        flexDirection: 'column', // Stack items vertically in mobile view
                        marginTop: '-220px', // Apply negative top margin for mobile view
                      },
                      '@media (min-width: 600px)': {
                        flexDirection: 'row', // Switch to horizontal layout on larger screens
                        justifyContent: 'space-between', // Align items to the end in laptop view
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant='h4'>{bachesName}</Typography>
                      }
                      secondary={
                        <Typography style={{ fontSize: '11px' }}>{record?.name}</Typography>
                      }
                    />
                    {/* <ListItemText>
                      <Typography>
                        {
                          selectedRecords
                            .filter(student => student.logged)
                            .length
                        }
                      </Typography>

                    </ListItemText> */}
                    <ListItemText>
                      <Typography>{maximumLimit}</Typography>
                    </ListItemText>
                    <ListItemText>
                      <Typography>{availableSeats}</Typography>
                    </ListItemText>
                    <ListItemText>
                      <Typography>  {currencySymbols[record?.priceType]}{' '}{record?.price}</Typography>
                    </ListItemText>
                    <ListItemText>
                      <Typography>  {currencySymbols[record?.priceType]}{' '}{record?.price}</Typography>
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
      <div>
        {activeStep === 2 && (

          <div>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h3' style={{ fontWeight: 'bold', marginBottom: '15px' }}>Billing Details</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="First Name" fullWidth value={firstName} onChange={handleFirstNameChange} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Last Name" fullWidth value={lastName} onChange={handleLastNameChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Email" fullWidth value={email} onChange={handleEmailChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Phone Number" fullWidth value={number} onChange={handleNumberChange} />
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
                    <Typography>{price}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography fontWeight={'bold'}>Sub Total</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography>{currencySymbols[record?.priceType]}{' '}{record?.price}</Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography style={{ color: 'blue', fontSize: '2.4rem', justifyItems: 'center', marginLeft: '20px' }}>{currencySymbols[record?.priceType]}{' '} {record?.price}</Typography>
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
                  /*  onClick={() => {
                     setAssign(false);
                   }} */
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
        steps={3}
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
          activeStep === 2 ? (
            <Button
              size="small"
              variant='contained'
              onClick={handlePayment} // Call payWithRazorpay when the button is clicked
              disabled={!isStepValid()}
            >
              Place Order
            </Button>
          ) :
            activeStep <= 0 ? ( // Check if activeStep is less than or equal to 2
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
              <div style={{ display: 'flex', gap: 6 }}>
                {/* <Button
                  size="small"
                  onClick={handleInvite} // Custom function for the "Assign" button
                  disabled={!isStepValid()}
                  variant='outlined'
                  style={{ marginLeft: '10px' }}
                  fullwidth
                >
                  Assign
                </Button> */}
                <Button
                  size="small"
                  onClick={handleCashPayment} // Custom function for the "Assign" button
                  disabled={!isStepValid()}
                  variant='contained'
                  style={{ marginLeft: '10px' }}
                  fullWidth
                  sx={{ backgroundColor: "#44749d", fontWeight: 'bold', color: "white" }}
                >
                  Pay Manually and Assign
                </Button>
                <Button
                  size="small"
                  fullWidth
                  onClick={handleNext} // Custom function for the "Pay and Assign" button
                  disabled={!isStepValid()}
                  variant='contained'
                  sx={{
                    backgroundColor: "#f5793A", fontWeight: 'bold',
                    '@media (max-width: 600px)': {
                      fontSize: '16px', // Increase font size for mobile view
                      padding: '4px 10px', // Increase padding for mobile view
                    },
                  }}
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

export default StudentAssignToProgram
