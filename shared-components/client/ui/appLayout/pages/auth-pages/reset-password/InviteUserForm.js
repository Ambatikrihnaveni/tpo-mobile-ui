import React, { useState } from 'react';
import { Button, Grid, TextField, Typography, InputLabel, Select, MenuItem } from "@mui/material";
import Div from "../../../../@jumbo/shared/Div";
import FormControl from "@mui/material/FormControl";
import swal from 'sweetalert';
import { Form, Formik} from "formik";
import * as yup from "yup";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { LocalizationProvider } from "@mui/x-date-pickers";
import Stack from '@mui/material/Stack';
import MyProgramService from '../../../../graphql/services/programs/myProgram-services';
import AccountsService from '../../../../graphql/services/accounts/accounts-service';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});


function InviteUserForm({ shopId }) {
  const [inputList, setInputList] = useState([{ email: "", programtype: { type: '', programs: [] }, program: { id: '', name: {} }, batches: { id: '', name: {} }, startdate: React.useState(new Date('0000-00-00T21:11:54')), price: "", subscriptionfee: "", total: "" }]);
  const [enrolmentData, setEnrolmentData] = useState([])
  const [programsData, setProgramsData] = useState([])
  const [programBatches, setProgramBatches] = useState([])
  const [open, setOpen] = React.useState();

  const handleProgramTypeChange = async (i, event) => {
      
    let data = [...inputList]
    const { value } = event.target;
    data[i].programtype.type = value
    if (shopId) {
      const type = value
      const records = await MyProgramService.getRecords(shopId, {}, type);

      if (type == "internships") {
        data[i].programtype.programs = records?.internships
        setProgramsData(records?.internships)
      } else if (type == "courses") {
        data[i].programtype.programs = records?.courses
        setProgramsData(records?.courses)
      } else if (type == "projects") {
        setProgramsData(records?.projects)
        data[i].programtype.programs = records?.projects
      }
    }

    setInputList(data)
    setEnrolmentData(data)

  };

  const handleProgramChange = (i, event,) => {
    ;
    let data = [...inputList]
    data[i].program.id = event.target.value.id;
    data[i].program.name = event.target.value;
    data[i].price = event.target.value.price
    setInputList(data)
    setEnrolmentData(data)
    setProgramBatches(event.target.value.batches)
  };

  const handleBatchChange = (i, event) => {
    ;
    let data = [...inputList]
    data[i].batches.id = event.target.value._id;
    data[i].batches.name = event.target.value;
    setInputList(data)
    setEnrolmentData(data)

  };



  const sweetAlerts = () => {

    swal({
      title: "Success",
      text: "Invitation link has been sent to email",
      icon: "success",
    })
  };

  const handleInputChange = (e, index) => {
    ;
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    setEnrolmentData(list)

  }

  const handlelStartDateChange = (e, i) => {
    ;
    const list = [...inputList];
    const startDate = e.target.value
    list[i].startdate = startDate;
    setInputList(list);
    setEnrolmentData(list);
  };



  const handlePriceChange = (e, i) => {
    ;
    const { name, value } = e.target
    const data = [...inputList]
    data[i][name] = value;
    setInputList(data)
    setEnrolmentData(data)

  }

  const handleSubscriptionChange = (e, i) => {

    const { name, value } = e.target
    const data = [...inputList]
    data[i][name] = value
    const totalPrice = Math.floor(data[i].price) + Math.floor(e.target.value)
    data[i].total = totalPrice
    setInputList(data)
    setEnrolmentData(data)
  }

  const haldleTotalChange = (e, i) => {

    const { name, value } = e.target
    const data = [...inputList]
    data[i][name] = value
    setInputList(data)
    setEnrolmentData(data)
  }

  const handleInputChange1 = (data, index) => {

    const { name, value } = data;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);

  };
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { email: "", programtype: { type: "", programs: [] }, program: { id: '', name: {} }, batches: { id: '', name: {} }, startdate: "", price: "", subscriptionfee: "", total: "" }]);
  };

  const onInvit = async () => {

    let propdata = []
    for(i=0; i<inputList.length; i++){
      if(inputList[i]?.email==""){
        setOpen("Please enter your Email")
      }else if(inputList[i]?.program==""){
        setOpen("Please Select Program")
      }else if(inputList[i]?.programtype==""){
setOpen("Please select Program Type")
      }else if(inputList[i]?.startdate==""){
        setOpen("Please select Valid Date")
      }else if(inputList[i]?.price==""){
        setOpen("Please Enter Price")
      }else if(inputList[i]?.subscriptionfee==""){
        setOpen("Please enter Subscription Fee")
      }else if(inputList[i]?.batches==""){
        setOpen("Pleasect Batch")
      }else{
        if (enrolmentData) {
          for (let x = 0; x < enrolmentData.length; x++) {
            const filterData = {
              email: enrolmentData[x].email,
              programId: enrolmentData[x].program.id,
              batchId: enrolmentData[x].batches.id,
              startDate: enrolmentData[x].startdate,
              price: enrolmentData[x].price,
              role: "Student",
              subscriptionFee: enrolmentData[x].subscriptionfee,
              totalPrice: (enrolmentData[x].total).toString()
            }
            propdata.push(filterData)
          }
        } 
      }
    }
    
    const inputData = { studentData: propdata, shopId: shopId }
    const data = await AccountsService.inviteStudents(inputData)
    if (data?.inviteShopMember == true) {
      sweetAlerts()
      setInputList([{ email: "", programtype: { type: "", programs: [] }, program: { id: '', name: {} }, batches: { id: '', name: {} }, startdate: "", price: "", subscriptionfee: "", total: "" }])
      setOpen("")
    }


  }


  const inviteShopMember = () => {
    ;
    data = { inputdata: inputList, shopId: shopId }
    inviteUserMutation.mutate(data)
  }

  return (
    <Formik
      validateOnChange={true}
      initialValues={{
        email: '',
        role: '',
      }}
      validationSchema={validationSchema}

    >{({ }) => (
      <Form>
        {inputList.map((x, i) => {
          return (
            <Div>
                            <p style={{color:'red', textAlign:'center'}}>{open}</p>

              <Grid container spacing={1} sx={{ mb: 1, marginTop: '20px', marginLeft: '15px' }} >
                <Grid item xs={6} md={3}>
                  <Typography><b> Email</b></Typography>
                  <TextField
                    sx={{ width: '75%',marginTop:'10px' }}
                    id="outlined-basic"
                    variant="outlined"
                    size='small'
                    name="email"
                    label="Email"
                    value={x.email}
                    onChange={e => handleInputChange(e, i)}
                  />

                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography> <b> Program Type</b></Typography>
                  <FormControl sx={{ width: '85%', }}>
                    <InputLabel id="demo-simple-select-label" style={{ marginBottom: '4px' }}>Program type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={x.programtype.type}
                      label="Program Type"
                      onChange={(event) => handleProgramTypeChange(i, event)}
                      size='small'
                      sx={{
                        marginTop:'10px' 
                      }}

                    >
                      <MenuItem value={"internships"}>Internships</MenuItem>
                      <MenuItem value={"courses"}>Courses</MenuItem>
                      <MenuItem value={"projects"}>Projects</MenuItem>
                    </Select>
                  </FormControl>


                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography> <b> Program</b> </Typography>
                  <FormControl sx={{ width: '85%' }}>
                    <InputLabel id="demo-simple-select-label"
                    >Program</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={x.program.name}
                      label="Program"
                      onChange={(event) => handleProgramChange(i, event)}
                      size='small'
                      sx={{ paddingTop: '5px',marginTop:'10px'  }}
                    >
                      {x.programtype.programs.map((program, index) => (
                        <MenuItem key={index} value={program}>{program.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>


                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography> <b> Batches</b></Typography>
                  <FormControl sx={{ width: '85%' }}>
                    <InputLabel id="demo-simple-select-label">batches</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={x.batches.name}
                      label="Batch"
                      onChange={(event) => handleBatchChange(i, event)}
                      size='small'
                      sx={{ paddingTop: '5px',marginTop:'10px'  }}

                    >
                      {programBatches.map((batch) => (
                        <MenuItem key={batch.id} value={batch}>{batch.name}</MenuItem>
                      ))}


                    </Select>
                  </FormControl>


                </Grid>

                <Grid item xs={6} md={3} >
                  <Typography  style={{marginTop:'20px'}}> <b> Start Date</b></Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3} sx={{ width: '75%' }} size='small'>
                 <TextField
                    id="date"
                    type="date"
                    value={x.startdate}
                        onChange={(e) => handlelStartDateChange(e, i)}
                    sx={{width: '100%',marginTop:'20px'}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                    </Stack>
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography  style={{marginTop:'20px'}}> <b> Price</b></Typography>
                  <TextField id="standard-disabled" label="Price" variant="outlined" sx={{ width: '85%',marginTop:'10px'  }} size='small' value={x.price} name='price' defaultValue={x.price} onChange={(event) => handlePriceChange(event, i)} />
                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography  style={{marginTop:'20px'}}> <b> Subscription Fee</b></Typography>
                  <TextField id="outlined-basic" label="Subscription Fee" sx={{ width: '85%',marginTop:'10px'  }} variant="outlined" size='small' name='subscriptionfee' value={x.subscriptionfee} onChange={(event) => handleSubscriptionChange(event, i)} />
                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography  style={{marginTop:'20px'}}> <b> Total</b></Typography>
                  <TextField disabled id="standard-disabled" label="Total Fee" sx={{ width: '85%' ,marginTop:'10px' }} variant="outlined" size='small'  value={x.total} defaultValue={x.total} name='total' />
                </Grid>




                <Grid item xs={1} >
                  {inputList.length !== 1 && <Button
                    onClick={() => handleRemoveClick(i)}  ><DeleteOutlineIcon /></Button>}

                </Grid>
              </Grid>

            </Div>

          );
        })}
        <Grid container spacing={2} sx={{ mt: -3 }}>
          <Grid item xs={6}>
            <Button variant="text" onClick={handleAddClick} sx={{ marginLeft: '15px' }}>+ Add another user</Button>
          </Grid>
          <Grid item xs={6} sx={{ mt: 8,ml:90 }}>

            <Button variant='contained' onClick={onInvit}>Invite</Button>
          </Grid>
        </Grid>

      </Form>

    )}
    </Formik>
  );
}

export default InviteUserForm;