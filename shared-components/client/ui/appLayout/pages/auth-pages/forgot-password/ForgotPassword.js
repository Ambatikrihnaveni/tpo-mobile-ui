import React, { useState } from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Link from "@mui/material/Link";
import Div from "@jumbo/shared/Div";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import getAccountsHandler from "../../../../../../../lib/accountsServer";
import '../login/style.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),

});

const ForgotPassword = () => {
  const [error, setError] = useState(false);
  const { passwordClient } = getAccountsHandler();
  const navigate = useNavigate()
  const handleForgotPassword = async (email) => {
    try {
      await passwordClient.requestPasswordReset(email)
      navigate("/user/sent-mail")


    } catch (err) {
      setError(err.graphQLErrors[0].message);

    }
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
            flexDirection: { xs: "column", md: "row" },
            minHeight: 400,


          }}
        >

          <CardContent
            sx={{
              flex: "4 1.5 300px",
              p: 4,
              backgroundColor: 'white',

            }}
          >
            <Formik
              validateOnChange={true}
              initialValues={{
                email: ''
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                handleForgotPassword(data.email);
                setSubmitting(false);
              }}
            >

              {({ isSubmitting }) => (
                <Form style={{ textAlign: 'center' }} noValidate autoComplete='off'>

                  <Div sx={{ mt: "auto", mb: 4 }}>
                    <Link href="#" underline="none" sx={{ display: "inline-flex" }}>
                      <img src="/logo192.png" alt="TPO.AI Logo" width="120px" />
                    </Link>
                  </Div>

                  <Div sx={{ mt: 1, mb: 3 }}>
                    <JumboTextField
                      fullWidth
                      size="small"
                      name="email"
                      label="Email"
                    />
                    <div style={{ color: "#ef5350", textAlign: 'left' }}>{error}</div>
                  </Div>

                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"

                    size="large"

                    sx={{ mb: 2 }}
                    loading={isSubmitting}
                  >Send Mail</LoadingButton>

                  <Typography textAlign={"center"} variant={"h3"} mb={1} mt={2}>Don't remember your email? <Link
                    underline="none" href="aryapadh@gmail.com">Contact Support</Link></Typography>
                </Form>
              )}
            </Formik>

          </CardContent>
        </Card>

      </Div>
    </Div>

  );
};

export default ForgotPassword;