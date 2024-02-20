import React, { useState } from 'react';
import { useNavigate,} from "react-router-dom";
import { Alert, Card, CardContent, Button, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import '../login/style.css';


const profileSuccess = (props) => {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLogout(true);
  }

  React.useEffect(() => {
    if (logout) {
      window.localStorage.clear();
      setLogout(true);
      navigate('/user/login');
    }
  }, [logout]);

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
                Application submit successfully. Please wait your application is under review process.
              </Typography>
            </Alert>

            <Button variant="contained" style={{ backgroundColor: '#50C2C9', marginTop: '20px', marginLeft: "38%", padding: '10px', color: 'white' }} onClick={handleClick}>Log out</Button>
          </CardContent>
        </Card>

      </Div>
    </Div>
  );
};

export default profileSuccess;
