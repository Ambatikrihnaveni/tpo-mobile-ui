
import React from 'react'
import useAuth from '../../../../hooks/useAuth';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import TutorEditProfile from './tutorEditProfile';
import { useNavigate } from 'react-router-dom';

const updateAccountMutation = gql`
mutation updateAccount($input: UpdateAccountInput! ) {
    updateAccount(input:$input){
        account{
            _id
        }
    }
    
}
`;

export default function TutorUpdateProfile() {
const[open, setOpen]= React.useState(false)  
const { enqueueSnackbar } = useSnackbar();
    const { isViewerLoading, viewer, data } = useAuth();
    const profileData= {...viewer}
    const navigate = useNavigate();


    const [updateAccount] = useMutation(updateAccountMutation, { ignoreResults: true });

    const updateProfile = (userdata) => {
  
      
        updateAccount({
            variables: ({
                input: {
                    email: userdata.email,
                    phoneNumber: userdata.phonenumber,
                    //  picture,
                    name: userdata.firstname,
                    surname:userdata.surname,
                    city: userdata.city, 
                    country: userdata.country,
                    pincode: userdata.pincode,
                    school_name: userdata.education[0].schoolname,
                    school_location: userdata.education[0].schoollocation,
                    degree: userdata.education[0].qualification,
                    field_of_study: userdata.education[0].study,
                    graduation_year: userdata.education[0].gradYear.toString(),
                    graduation_score:userdata.education[0].score,
                    jobTitle: userdata.jobtitle,
                    employer: userdata.employer,
                    company_location: userdata.location,
                    start_month: userdata.startmonth,
                    start_year: userdata.selectedStartYear.toString(),
                    end_month: userdata.endmonth,
                    end_year: userdata.selectedEndYear.toString(),
                  
                    skills: userdata.selectedSkills, 
                    summary: userdata.selectedSummary,

                }
            })
        }).then((data) => {
             setOpen(true)
             enqueueSnackbar('Resume updated Successfully', { variant: 'success' });
             navigate('/profile')
        }).catch((err) => {
            enqueueSnackbar('Resume update failed', { variant: 'error' });
        })
    }
    return (
        <div>
            <TutorEditProfile profileData={profileData} updateProfile={updateProfile} />

        </div>
    )
}
