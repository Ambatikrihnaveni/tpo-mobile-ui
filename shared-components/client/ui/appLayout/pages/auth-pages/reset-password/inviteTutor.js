import React, { useState } from 'react';
import { Card, Button, Grid, TextField } from "@mui/material";
import Div from "../../../../@jumbo/shared/Div";
import swal from 'sweetalert';
import { Form, Formik, } from "formik";
import { toast } from 'react-toastify';
import useCurrentShopId from '../../../../hooks/useCurrentShopId';
import AccountsService from '../../../../graphql/services/accounts/accounts-service';
import { useMutation } from "react-query";
import * as yup from "yup";

import { useNavigate } from 'react-router-dom';


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
    .test('gmail-domain', 'Please enter a valid Gmail address', value => {
      if (!value) return false;
      return value.endsWith('@gmail.com');
    })
    .required("Email is required"),
  role: yup
    .string("Select Role")
    .required("Select Role")
});




function InviteTutor() {
  const { shopId } = useCurrentShopId();
  const navigate = useNavigate();
  const [inputList, setInputList] = useState([{ email: "", role: "Tutor" }]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sweetAlerts = () => {

    swal({
      title: "Success",
      text: "Invitation link has been sent to email",
      icon: "success",
    })
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
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
    setInputList([...inputList, { email: "", role: "Tutor" }]);
  };

  const inviteUserMutation = useMutation(AccountsService.inviteUsers, {
    onSuccess: () => {
      sweetAlerts()
      navigate('/tutors')
    }
  });

  const inviteShopMember = () => {
    let hasEmptyFields = false;
    let hasInvalidEmails = false;
    setFormSubmitted(true);
    for (const user of inputList) {
      if (user.email === '') {
        hasEmptyFields = true;
        break;
      } else if (!user.email.endsWith('@gmail.com') && !user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        hasInvalidEmails = true;
        break;
      }
    }

    if (hasEmptyFields) {
      toast.error('Please fill email field');
    } else if (hasInvalidEmails) {
      toast.error('Please enter a valid email address');
    } else {
      const data = { inputData: inputList, shopId: shopId };
      inviteUserMutation.mutate(data);
    }
  };

  return (
    <div style={{ height: '75vh' }}>
      <Card sx={{ m: 'auto', height: '650px', ml: '30px', overflow: 'scroll', p: 2 }}>

        <h2 style={{ color: '#50C2C9', marginLeft: '10px', }}>Invite by email</h2>
        <p style={{ fontWeight: '350px', marginLeft: '10px', fontSize: '18px' }}>You can easily invite multiple tutors via email to join your workspace.</p>
        <Formik
          validateOnChange={true}
          initialValues={{
            email: '',
            role: 'Tutor',
          }}
          validationSchema={validationSchema}

        >{({ }) => (
          <Form>

            {inputList.map((x, i) => {
              return (
                <Div>
                  <Grid container spacing={1} sx={{ mb: 1 }} >
                    <Grid item md={0.1}></Grid>
                    <Grid item md={5}>
                      <TextField
                        fullWidth
                        type="email"
                        name="email"
                        label="Email"
                        size="small"
                        style={{ marginTop: '15px' }}
                        value={x.email}
                        required
                        onChange={(e) => handleInputChange(e, i)}
                        error={
                          (formSubmitted && x.email === "") ||
                          (formSubmitted && x.email !== "" && !x.email.endsWith('@gmail.com') && !x.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
                        }
                        helperText={
                          formSubmitted && x.email === ""
                            ? 'Email is required'
                            : formSubmitted && x.email !== "" && (!x.email.endsWith('@gmail.com') && !x.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
                              ? 'Please enter a valid email'
                              : ''
                        }
                      />
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
              <Grid item md={0.1}></Grid>
              <Grid item xs={6}>
                <Button variant="text" onClick={handleAddClick}>+ Add another user</Button>
              </Grid>

            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={5.5}></Grid>
              <Grid item xs={6} sx={{ mt: 8 }}>

                <Button variant='contained' onClick={inviteShopMember}>Invite</Button>
              </Grid>
            </Grid>

          </Form>

        )}


        </Formik>
      </Card>
    </div>
  );
}

export default InviteTutor;