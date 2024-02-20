import React, { useState } from "react";
import { Card, CardContent, Checkbox, FormControlLabel, IconButton, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Div from "@jumbo/shared/Div";
import { alpha } from "@mui/material/styles";
import { getAssetPath } from "../../../utils/appHelpers";
import * as yup from "yup";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import JumboPasswordField from "@jumbo/components/JumboFormik/JumboPasswordField";
import LoadingButton from "@mui/lab/LoadingButton";
import authServices from "../../../services/auth-services";
import { useNavigate } from "react-router-dom";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import { Meteor } from "meteor/meteor";
import Divider from '@mui/material/Divider';
import GoogleButton from 'react-google-button'
import './style.css';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const styles = theme => ({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important"
  }
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required")
});

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

const Login = ({ disableSmLogin }) => {
  const { setAuthToken, refetchViewer } = useJumboAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState('');
  const [passError, setpassError] = useState('');
  const [googleSignUp] = useMutation(googleSignUpMutation, { ignoreResults: true });

  const onSignIn = (email, password) => {
    ;
    authServices.signIn({ email, password }).then((data) => {
      setAuthToken(data?.tokens?.accessToken);
    }).catch((err) => {
      if ((err.graphQLErrors[0]?.message) == 'User not found') {
        setEmailError('Email is incorrect  ')
        setpassError("")
      } else if ((err.graphQLErrors[0]?.message) == 'Incorrect password') {
        setpassError("Password is incorrect")
        setEmailError('')
      }
    })
  };

  function handleGoogleLogin() {
    ;
    let accessToken;
    Meteor.loginWithGoogle({
      requestPermissions: ['email', 'profile']
    }, async (error, result) => {
      if (error) {
        console.log(error)
      } else {
        if (Meteor.userId()) {
          const userId = Meteor.userId();
          googleSignUp({
            variables: {
              input: {
                userId
              }
            }
          }).then(async (res) => {
            ;
            accessToken = res?.data.googleSignUp.tokens?.accessToken;
            const refreshToken = res?.data.googleSignUp.tokens?.refreshToken;
            localStorage.setItem('accounts:accessToken', accessToken);
            localStorage.setItem('accounts:refreshToken', refreshToken);
            setAuthToken(accessToken);
          }).catch((err) => {
            setOpen(true);
            console.log(err)
          })
        }
      }
    })
  }

  return (

    <Div className="bg-gradiant" style={{ backgroundImage: `url("/images/authBg.png")` }}>

      <Div
        sx={{
          width: 550,
          maxWidth: "100%",
          margin: "auto",
          boxShadow: "3px 6px 6px 4px rgba(0, 0, 0, 0.4)"
          
        }}
      >

        <Card
          sx={{
            width: 950,
            height:700,
            maxWidth: "100%",
            margin: "auto",
           
          }}
        >

          

          <CardContent
            sx={{
              display: "flex",
              minWidth: 0,
              flex: 1,
              flexDirection: "column",
              color: "common.white",
              position: "relative",
              zIndex: 1,
              height: "100%",
            }}
          >
            <Formik
              validateOnChange={true}
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                onSignIn(data.email, data.password);
                setSubmitting(false);
              }}
            >

              {({ isSubmitting }) => (
                <Form style={{ textAlign: 'center' }} noValidate autoComplete='off'>

                  <Div sx={{ mt: "auto", mb: 4 }}>
                    <Link href="#" underline="none" sx={{ display: "inline-flex" }}>
                      <img src="/logo192.png" alt="TPO.AILogo" width="120px" />
                    </Link>
                  </Div>
                  
                  <Div sx={{ marginTop:'60px', mb: 5 }}>
                    <JumboTextField
                    placeholder="example@gmail.com"
                      fullWidth
                      size="large"
                      name="email"
                      label="Email"
                    />
                    <div style={{ color: "#ef5350", textAlign: 'left'}}>{emailError}</div>
                  </Div>



                  <Div sx={{ mt: 2, mb: 2 }}>
                    <JumboPasswordField
                      fullWidth
                      placeholder="Password@123"
                      name="password"
                      label="Password"
                      size="large"
                    />
                    <div style={{ color: "#ef5350", textAlign: 'left' }}>{passError}</div>
                    <Typography sx={{ textAlign: "right", fontsize: "14px", mt: 1, color: "black" }}>
                      Forgot your password?{''} <Link
                        href={"/user/forgot-password"}
                        color={"primary"}
                        underline={'none'}
                      >Reset
                      </Link>

                    </Typography>

                  </Div>
                  <Div sx={{ mb: 1, textAlign: "left", color: "#050505" }}>
                    <FormControlLabel control={<Checkbox />} label="Remember me" />
                  </Div>

                  <LoadingButton
                    type="submit"
                    variant="contained"
                  fullWidth
                    size="large"

                    sx={{ mb: 2, fontWeight: "bold" }}
                    loading={isSubmitting}
                  >Sign In</LoadingButton>

                  <Divider>Or</Divider>




                  <Div sx={{ mb: 2, mt: 2, marginLeft:'130px' }} >

                    <GoogleButton size="small" onClick={handleGoogleLogin} />


                  </Div>




                  <Typography variant={"h3"} style={{marginTop:'30px'}} >
                    Don't have an account ?{" "}
                    <Link
                      href={"/user/sign-up"}
                      color={"primary"}
                      underline={'none'}
                    >Signup
                    </Link>
                  </Typography>
                  {
                    !disableSmLogin && (
                      <React.Fragment>
                        <Typography variant={"body1"} mb={2}> </Typography>

                      </React.Fragment>
                    )
                  }

                </Form>
              )}
            </Formik>
          </CardContent>


        </Card>
      </Div>
    </Div>
  );
};
export default Login;
