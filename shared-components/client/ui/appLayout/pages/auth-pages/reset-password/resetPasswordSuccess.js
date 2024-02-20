import React from 'react';
import { Alert, Card, CardContent, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import Link from "@mui/material/Link";
import '../login/style.css';
import { Button } from '@reactioncommerce/catalyst';

const ResetPasswordSuccess = (props) => {

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
              flex: 1,
              p: 4,
              backgroundColor: 'white'
            }}
          >

            <Alert variant="filled" severity="success">


              <Typography variant={"h3"} >
                Password successfully changed  please login to your account

              </Typography>
            </Alert>
            <Div sx={{ textAlign: "center", mt: 3, mb: 3 }}>
              <Button variant="contained" > <Link
                href={"/user/login"}

                underline={'none'}
              >Login
              </Link></Button>
            </Div>
          </CardContent>
        </Card>

      </Div>
    </Div>
  );
};

export default ResetPasswordSuccess;
