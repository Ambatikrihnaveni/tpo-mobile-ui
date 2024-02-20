import React, { useEffect, useState } from "react";
import {  Typography, InputAdornment, IconButton} from "@mui/material";
import Div from "../../../../@jumbo/shared/Div";
import { Card, CardContent } from "@mui/material";
import Link from "@mui/material/Link";
import useJumboAuth from "../../../../@jumbo/hooks/useJumboAuth";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import authServices from "../../../services/auth-services";
import { Meteor } from "meteor/meteor";
import FormControl from "@mui/material/FormControl";
import * as yup from "yup";
import YupPassword from 'yup-password';
import LoadingButton from "@mui/lab/LoadingButton";
import { Form, Formik, Field, ErrorMessage } from "formik";
import Divider from '@mui/material/Divider';
import TermsAndConditions from './termsAndConditions'
import GoogleButton from 'react-google-button';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Visibility, VisibilityOff } from '@material-ui/icons';

YupPassword(yup);

const googleSignUpMutation = gql`
  mutation googleSignUp($input: googleDataInput!) {
    googleSignUp(input: $input) {
      sessionId
      tokens {
        refreshToken
        accessToken
      }
      user{
        profile{
          name
        }
        services{
          google{
            email
          }
        }
      }
      shopId
    }
  }
`;

const createAccountMutation = gql`
mutation createAccount($input:CreateAccountInput!){
  createAccount(input:$input){
    account{
      _id
      emails{
        address
      }
      groups
      shopId
      adminUIShopIds
      state
      createdAt
      updatedAt
      role
    }
  }
}
`;
const requiredField = () => yup.string().required('Password is required');
const phoneRegExp = () => /^(\+?\d{0,5})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const phoneReg = () => yup.string().required('Phone number is required');
const numberField = () =>
  phoneReg()
    .min(12, 'Phone number must have 10 numbers with country code');
const passwordField = () =>
  requiredField()
    .min(
      8,
      'Password must contain 8 characters or more '
    )
    .minLowercase(1, 'Password must contain at least 1 lower case letter')
    .minUppercase(1, 'Password must contain at least 1 upper case letter')
    .minNumbers(1, 'Password must contain at least 1 number')
    .minSymbols(1, 'Password must contain at least 1 special character');


const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: passwordField(),

  number: numberField(),
  fullname: yup
    .string("Enter your Name")
    .required("Name is required")
    .min(4, 'name contain min 4 characters '),


  acceptTerms: yup.bool().oneOf([true], 'Accept Terms & Conditions')

});

function useQuery() {
  return new URLSearchParams(useLocation().search); // eslint-disable-line node/no-unsupported-features/node-builtins
}

const Signup = (event) => {
  const query = useQuery();
  const shopId = query.get("shopId");
  const { setAuthToken, refetchViewer } = useJumboAuth();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const isRole = query.get("role");
  const studentGroupId = query.get("studentGroupId")
  const batch = query.get("batch");
  const isEmail = query.get('email');
  const isPassword = query.get('password')
  const [role, setRole] = useState("Tutor");
  const [email, setEmail] = useState(isEmail);
  const [passwordError, setPasswordError] = useState("")
  const [numberError, setNumberError] = useState("");
  const [googleSignUp] = useMutation(googleSignUpMutation, { ignoreResults: true });
  const [createAccount] = useMutation(createAccountMutation, { ignoreResults: true });
  const [fullname, setFullname] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(isPassword)
  let nameProperty = role === 'Admin' ? 'instituteName' : role == "College-Admin" ? 'collegeName' : 'fullname';
  React.useEffect(() => {
    if (isRole) {
      setRole(isRole);
    }
    if (isEmail) {
      setEmail(isEmail);
    }
    if (isPassword) {
      setPassword(isPassword);
    }
  });



  getChckeboxValue = (event) => {
    setRole(event.target.value);
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onchange = (e) => {
    setFullname(e.target.value = e.target.value.trim())
  }
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  function handleGoogleLogin() {
    let name;
    let emails;
    let shopId;
    let username;
    let accessToken;
    if (role === "") {
      setError("Please select Role")
    } else {
      Meteor.loginWithGoogle({
        requestPermissions: ['email', 'profile']
      }, async (error, result) => {
        if (error) {
          console.log(error)
        } else {
          if (Meteor.userId()) {

            const userId = Meteor.userId();
            Meteor.call("accounts/updateRole", { userId: userId, role: role });
            googleSignUp({
              variables: {
                input: {
                  userId
                }
              }
            }).then(async (res) => {

              accessToken = res?.data.googleSignUp.tokens?.accessToken;
              const refreshToken = res?.data.googleSignUp.tokens?.refreshToken;
              localStorage.setItem('accounts:accessToken', accessToken);
              localStorage.setItem('accounts:refreshToken', refreshToken);
              name = res?.data?.googleSignUp.user?.profile?.name;
              const email = res?.data.googleSignUp.user?.services?.google?.email;
              emails = {
                address: email,
                verified: true,
                provides: "default"
              }
              shopId = res?.data.googleSignUp.shopId
              username = res?.data?.googleSignUp.user?.profile?.name;
              setAuthToken(accessToken);
            }).catch((err) => {
              setOpen(true);
              console.log(err)
            });
          }
        }
      })
    }
  }

  const registerUser = (email, password, fullname, number) => {
    if (role === 'Tutor') {
      authServices.signUp({ email, password, number }).then((data) => {
        if (shopId) {
          Meteor.call("accounts/updateTutorDetails", { userId: data?.loginResult?.user.id, mobileNumber: number, fullname, shopId, role: role });
        } else {
          Meteor.call("accounts/updateAccountDetails", { userId: data?.loginResult?.user.id, mobileNumber: number, fullname, role: role });
        }
        setAuthToken(data?.loginResult.tokens?.accessToken);

      })
        .catch((err) => {
          setOpen(true)
          if (err?.graphQLErrors ? err?.graphQLErrors[0]?.message == "Email already exists" : '') {
            setEmailErr("Email already exists")
          } else
            setError(err.graphQLErrors && err.graphQLErrors[0].message);
        })

    } else if (role === 'Admin') {
      ;
      authServices.signUp({ email, password, number }).then((data) => {

        Meteor.call("accounts/updateAccountDetails", { userId: data?.loginResult?.user.id, mobileNumber: number, fullname, role: role });
        setAuthToken(data?.loginResult.tokens?.accessToken);

      })

        .catch((err) => {
          setOpen(true)
          if (err.graphQLErrors[0].message == "Email already exists") {
            setEmailErr("Email already exists")
          } else
            setError(err.graphQLErrors && err.graphQLErrors[0].message);
        })
    } else if (role == 'College-Admin') {
      authServices.signUp({ email, password }).then((data) => {
        Meteor.call('accounts/updateAccountDetails', { userId: data?.loginResult?.user.id, mobileNumber: number, fullname, role: role });
        setAuthToken(data?.loginResult.tokens?.accessToken);
      }).catch((err) => {
        setOpen(true)
        if (err.graphQLErrors[0].message == "Email already exists") {
          setEmailErr("Email already exists")
        } else
          setError(err.graphQLErrors && err.graphQLErrors[0].message);
      })
    } else if (role === 'Student') {
      authServices.signUp({ email, password, number }).then((data) => {
        Meteor.call("accounts/updateStudentDetails", { userId: data?.loginResult?.user.id, mobileNumber: number, fullname, role: role, shopId, studentGroupId });
        setAuthToken(data?.loginResult.tokens?.accessToken);
      })
        .catch((err) => {
          setOpen(true)
          setError(err.graphQLErrors[0].message);
        })
    }
  }


  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Div className="bg-gradiant" style={{ backgroundImage: `url("/images/authBg.png")` }}>
      <Div
        style={{
          width: 650,
          maxWidth: "100%",
          margin: "auto",
          boxShadow: "3px 6px 6px 4px rgba(0, 0, 0, 0.4)",
          height: '100%'

        }}
      >
        <Card
          style={{
            display: "flex",
            minWidth: "100px",
            flexDirection: { xs: "column", md: "row" },
            minHeight: 400
          }}
        >

          <CardContent
            sx={{
              flex: 1,
              p: 4,
              backgroundColor: "white"
            }}
          >
            <Formik
              validateOnChange={true}
              initialValues={{
                email: email,
                password: password,
                fullname,
                number: '',
                acceptTerms: false
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                registerUser(data.email, data.password, data.fullname, data.number);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, errors, status, touched }) => (
                <Form style={{ textAlign: 'center' }} noValidate autoComplete='off'>
                  <Div sx={{ mt: "auto", mb: 3 }}>
                    <Link href="#" underline="none" sx={{ display: "inline-flex" }}>
                      <img src="/logo192.png" alt="TPO.AILogo" width="120px" />
                    </Link>
                  </Div>


                  <Typography sx={{ fontSize: "15px" }}>I'm registering as </Typography>

                  <Box sx={{ minWidth: 100, mt: 1, mb: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Role *</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Role *"
                        size="small"
                        onChange={handleChange}
                        sx={{ textAlign: 'left' }}
                      >
                        <MenuItem value={'Admin'} selected={() => setRole("Admin")}>Training Partner</MenuItem>
                        <MenuItem value={'College-Admin'} selected={() => setRole("College-Admin")}>College Admin</MenuItem>
                        <MenuItem value={'Tutor'} selected={() => setRole("Tutor")}>Tutor</MenuItem>
                        <MenuItem value={'Student'} selected={() => setRole("Student")}>Student</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Div sx={{ mt: 1, mb: 3 }}>
                    <JumboTextField
                      fullWidth
                      name='fullname'
                      label={role == "Admin" ? "Institute Name *" : role == "College-Admin" ? "College Name *" : "Full Name *"}
                      size="small"
                      value={fullname}
                      onChange={(e) => { onchange(e) }}
                    />
                  </Div>
                  <Div sx={{ mt: 1, mb: 3 }}>
                    <JumboTextField
                      fullWidth
                      name="email"
                      label="Email *"
                      size="small"
                      value={email}
                      disabled={isEmail != null ? true : false}
                    />
                    {emailErr && <Div sx={{ color: "#E73145", textAlign: "left" }}>{emailErr}</Div>}
                  </Div>
                  <Div sx={{ mt: 1, mb: 3 }}>
                    <JumboTextField
                      fullWidth
                      type="number"
                      name="number"
                      label="Phone Number *"
                      placeholder="919876543210"
                      size="small"
                      sx={{
                        '& input[type=number]': {
                          '-moz-appearance': 'textfield'
                        },
                        '& input[type=number]::-webkit-outer-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0
                        },
                        '& input[type=number]::-webkit-inner-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0
                        }
                      }}
                    />
                    <label style={{ color: 'red' }}>{numberError}</label>
                  </Div>
                  <Div sx={{ mt: 1, mb: 2 }}>

                    <JumboTextField
                      fullWidth
                      name="password"
                      label="Password *"
                      size="small"
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <label style={{ color: 'red' }}>{passwordError}</label>
                  </Div>

                  <Div sx={{ display: 'flex', flexDirection: 'row' }}>

                    <Field type="checkbox" style={{ cursor: 'pointer' }} name="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                    <TermsAndConditions />
                  </Div>
                  <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" style={{ color: "#E73145" }} />

                  {error && <Div sx={{ color: "#E73145" }}>{error}</Div>}
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"

                    sx={{ mb: 3, mt: 2, fontWeight: "bold" }}
                    loading={isSubmitting}
                  >SignUp</LoadingButton>
                  <Divider>Or</Divider>
                  <Div sx={{ mb: 2, mt: 2, ml: 20 }} >
                    <GoogleButton size="small" onClick={handleGoogleLogin} label="Signup With Google" />
                  </Div>

                  <Typography variant={"h3"} >
                    Already have an account ?{" "}
                    <Link
                      href={"/user/login"}
                      color={"primary"}
                      underline={'none'}
                    >Signin
                    </Link>
                  </Typography>

                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Div>
    </Div>
  );
}
export default Signup;