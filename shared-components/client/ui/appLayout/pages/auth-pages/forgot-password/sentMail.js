import React from 'react';
import { Alert, Card, CardContent, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import '../login/style.css';

const sentMailSuccess = (props) => {



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

            <Alert variant="filled" severity="success" sx={{ p: 3 }}>


              <Typography sx={{ mb: 4, fontSize: "16px" }}>
                Reset password link successfully sent to your mail please check inbox

              </Typography>
            </Alert>

          </CardContent>
        </Card>

      </Div>
    </Div>
  );
};

export default sentMailSuccess;