import React from 'react';
import { Card, CardContent } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Link from "@mui/material/Link";
import * as yup from "yup";
import { Form, Formik } from "formik";
import JumboPasswordField from "@jumbo/components/JumboFormik/JumboPasswordField";
import JumboConfirmPassField from "@jumbo/components/JumboFormik/JumboConfirmPassField";
import LoadingButton from "@mui/lab/LoadingButton";
import Div from "@jumbo/shared/Div";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import getAccountsHandler from "../../../../../../../lib/accountsServer";
import hashPassword from "../../../../../../../lib/utils/hashPassword";
import '../login/style.css';
import YupPassword from 'yup-password';



function useQuery() {
  return new URLSearchParams(useLocation().search); // eslint-disable-line node/no-unsupported-features/node-builtins
}

YupPassword(yup);

const validationSchema = yup.object({
  password: yup.string("Enter your password").required("Password is required").oneOf([yup.ref('password'), null]),
  confirmPassword: yup.string("Enter your password").required("Confirm Password is required").oneOf([yup.ref('password'), null], 'Passwords must match')
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ResetPassword = (props) => {
  const { passwordClient } = getAccountsHandler();
  const query = useQuery();
  const resetToken = query.get("resetToken");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleOpenForgotPassword = () => {
    openModal("forgot-password");
  };

  const resetPassword = (password) => {

    passwordClient.resetPassword(resetToken, hashPassword(password)).then((data) => {

      navigate("/user/reset-password-success");
    })
      .catch((err) => {
        setError(err.message);


      })
  }

  return (
    <Div className="bg-gradiant" style={{ backgroundImage: `url("/images/authBg.png")` }}>

      <Div
        sx={{
          width: 450,
          maxWidth: "100%",
          margin: "auto",
          boxShadow: "3px 6px 6px 4px rgba(0, 0, 0, 0.4)"
        }}
      >
        <Card
          sx={{
            display: "flex",
            minWidth: 0,
            flexDirection: { xs: "column", md: "row" }
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
              height: "100%"
            }}
          >

            <Formik
              validateOnChange={true}
              initialValues={{
                password: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                resetPassword(data.password);
                setPassword(data.password)
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
                  <Div sx={{ mt: 2, mb: 2 }}>
                    <JumboPasswordField
                      fullWidth
                      name="password"
                      label="Password"
                      size="small"
                      style={{ marginTop: 6 }}

                    />
                  </Div>
                  <Div sx={{ mt: 2, mb: 2 }}>
                    <JumboConfirmPassField
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      size="small"
                      style={{ marginTop: 6 }}
                    />
                  </Div>
                  <LoadingButton
                    type="submit"
                    variant="contained"

                    size="large"

                    sx={{ mb: 2 }}
                    loading={isSubmitting}
                  >Reset Password</LoadingButton>

                  <Div sx={{ textAlign: "center" }} onClick={handleOpenForgotPassword} onKeyDown={handleOpenForgotPassword} role="button"
                    tabIndex={0}
                  >Send reset link again</Div>
                </Form>
              )}
            </Formik>


          </CardContent>
        </Card>

      </Div>
    </Div>
  );
};

export default ResetPassword;
