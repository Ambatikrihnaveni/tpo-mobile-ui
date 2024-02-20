import React, { useState } from "react";
import { Card,Button } from "@mui/material";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";
import gql from "graphql-tag";
import Div from "../../../../../client/ui/@jumbo/shared/Div";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import FormLabel from '@mui/material/FormLabel';

const setRoleMutation = gql`
  mutation setRole($input: setRoleInput!) {
    setRole(input: $input) {
        _id
        firstName
        language
        lastName
        name
        primaryEmailAddress
        adminUIShops {
          _id
          brandAssets {
            navbarBrandImage {
              large
            }
          }
          name
          shopLogoUrls {
            primaryShopLogoUrl
          }
        }
        role
        shopId{
          _id
          name
        }
        phoneNumber
        isProfile
        profile{
          bio
          address
          qualification
          experience
          price
          isStatus
          isApproved
          availableDays
          picture
        }
    }
  }
`; 
/**
 * SetRole
 * @param {Object} props Component props
 * @returns {Node} React component
 */
export default function SetRole(props) {
  const [setRole] = useMutation(setRoleMutation, { ignoreResults: true });
  const [userRole, setUserRole] = useState("");
  const [error,setError]= useState('');
  const navigate = useNavigate();
  const changeRole = (value) => {
    setUserRole(value);
    setError('');
  }
  const onSubmit = () => {
    ;
    if(userRole==""){
      return setError("Please select role")
    }else if(userRole!=""){
      setRole({variables: {input:{
        role:userRole,
      }}}).then((data)=>{
        ;
        let role = data?.data?.setRole.role;
        if(role == "Admin") {
          if (data?.data?.setRole?.adminUIShops?.length > 0) {
            const id = data?.data?.setRole?.adminUIShops[0]?._id
            localStorage.setItem('accounts:shopId',id)
            url = "/dashboard";
          }else if ( shopId && authUser?.adminUIShops?.length > 0) {
            url = "/dashboard";
          } else if (shopId == "undefined" || shopId == undefined) {
            url = "/new-institute";
          }
          if (url) {
            firstTimePageLoad = false;
            navigate(url);
          }
        }else if(role == "College-Admin"){
          navigate('/user/college-details')
        }else if(role == "Tutor") {
          navigate('/user/set-profile');
        }else if(role == 'Student') {
          navigate('/dashboard');
        }
      }).catch((err)=>{
        setError(err)
      }) 
    }     
  }
  return (
    <div style={{height: '60vh'}}>
      <Card sx={{maxWidth:"450px", textAlign:'center', padding:'20px 30px', m: 'auto'}}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label" sx={{ mb: 2 }}>Select Role<span style={{color:'red'}}>*</span></FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel value="Admin" control={<Radio />} label="Training Partner" onClick={() => { changeRole("Admin") }} />
            <FormControlLabel value="Collge-Admin" control={<Radio />} label="College-Admin" onClick={() => { changeRole("College-Admin") }} />
            <FormControlLabel value="Tutor" control={<Radio />} label="Tutor" onClick={() => { changeRole("Tutor") }} />
            <FormControlLabel value="Student" control={<Radio />} label="Student" onClick={() => { changeRole("Student") }} />
          </RadioGroup>
        </FormControl>
        <Div sx={{ mt: 3 }} >
          {error && <Div sx={{ color: '#E73145', mb: 1 }}>{error}</Div>}
          <Button variant="contained" onClick={onSubmit}>Submit</Button>
        </Div>
      </Card>
    </div>
  );
}