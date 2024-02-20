import React from 'react'
import ProfileForm from "./ProfileForm";
import useAuth from "/imports/client/ui/hooks/useAuth";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { useNavigate,useLocation } from 'react-router-dom';


const updateAccountMutation = gql`
mutation updateAccount($input: UpdateAccountInput! ) {
    updateAccount(input:$input){
        account{
            _id
        }
    }
    
}
`;

export default function ProfileEditForm() {
    
const[open, setOpen]= React.useState(false)  
const { enqueueSnackbar } = useSnackbar();
const location = useLocation();
  const url=location.pathname;
 const recordType = url.substring(url.lastIndexOf('/') + 1);
const path=location.pathname
const navigate= useNavigate()
    const { isViewerLoading, viewer, data } = useAuth();
    const userdata = { ...viewer }
    const profileData = { ...viewer }

    const [updateAccount] = useMutation(updateAccountMutation, { ignoreResults: true });
    let experiences = []
    let qualifications = []
    let skills = []
    let socialMediaLinks = []

    React.useEffect(() => {
        if (userdata) {

            for (let i = 0; i < userdata?.profile?.experiences?.length; i++) {
                const data = {
                    jobtitle: userdata?.profile?.experiences[i].jobTitle,
                    employer: userdata?.profile?.experiences[i].employer,
                    location: userdata?.profile?.experiences[i].company_location,
                    startmonth: userdata?.profile?.experiences[i].start_month,
                    selectedStartYear: Number(userdata?.profile?.experiences[i].start_year),
                    endmonth: userdata?.profile?.experiences[i].end_month,
                    selectedEndYear: Number(userdata?.profile?.experiences[i].end_year),
                    description: userdata?.profile?.experiences[i].description
                }
                experiences.push(data)
            }

            for (let i = 0; i < userdata?.profile?.qualifications?.length; i++) {
                const data = {
                    qualification: userdata?.profile?.qualifications[i].qualification,
                    schoolname: userdata?.profile?.qualifications[i].instituteName,
                    study: userdata?.profile?.qualifications[i].field_of_study,
                    schoollocation: userdata?.profile?.qualifications[i].location,
                    score: Number(userdata?.profile?.qualifications[i].score),
                    gradYear: Number(userdata?.profile?.qualifications[i].year_of_passing),
                }
                qualifications.push(data)
            }

            for (let i = 0; i < userdata?.profile?.skills?.length; i++) {
                const data = {
                    skill: userdata?.profile?.skills[i].skill,
                    rating: Number(userdata?.profile?.skills[i].skill_rating)
                }
                skills.push(data)
            }

            for (let i = 0; i < userdata?.profile?.socialMediaLinks?.length; i++) {
                const data = {
                    account: userdata?.profile?.socialMediaLinks[i].socialMediaAccount,
                    link: userdata?.profile?.socialMediaLinks[i].link

                }
                socialMediaLinks.push(data)
            }

        }
    })
    const upadteProfile = (profileData) => {

    

        let workExperience = []
        let education = []
        let skills = []
        let socialMediaLinks = []
        for (let i = 0; i < profileData?.work?.length; i++) {
            const data = {
                jobTitle: profileData?.work[i].jobtitle,
                employer: profileData?.work[i].employer,
                company_location: profileData?.work[i].location,
                start_month: profileData?.work[i].startmonth,
                start_year: profileData?.work[i].selectedStartYear?.toString(),
                end_month: profileData?.work[i].endmonth,
                end_year: profileData?.work[i].selectedEndYear?.toString(),
                description: profileData?.work[i].description,
            }
            workExperience.push(data)
        }

        for (let i = 0; i < profileData.education?.length; i++) {
            const data = {
                qualification: profileData.education[i].qualification,
                instituteName: profileData.education[i].schoolname,
                field_of_study: profileData.education[i].study,
                location: profileData.education[i].schoollocation,
                score: profileData.education[i].score?.toString(),
                year_of_passing: profileData.education[i].gradYear?.toString(),
            }
            education.push(data)
        }

        for (let i = 0; i < profileData.skillsList?.length; i++) {
            const data = {
                skill: profileData.skillsList[i].skill,
                skill_rating: profileData.skillsList[i].rating?.toString()
            }
            skills.push(data)
        }

        for (let i = 0; i < profileData.media.length; i++) {
            const data = {
                socialMediaAccount: profileData.media[i].account,
                link: profileData.media[i].link

            }
            socialMediaLinks.push(data)
        }

        updateAccount({
            variables: ({
                input: {
                    email: profileData.email,
                    phoneNumber: profileData.phonenumber,
                    //  picture,
                    name: profileData.firstname,
                    fatherName: profileData.fathername,
                    hallTicketNumber: profileData.hallticket,
                    city: profileData.city,
                    country: profileData.country,
                    pincode: profileData.pincode,
                    qualifications: education,
                    experiences: workExperience,
                    skills: skills,
                    bio: profileData.bio,
                    socialMediaLinks: socialMediaLinks,
                    summary: profileData.selectedSummary,
                    additional: profileData.additional

                }
            })
        }).then((data) => {
             setOpen(true)
             enqueueSnackbar('Resume/Profile updated Successfully', { variant: 'success' });
             navigate('/profile')
           
        }).catch((err) => {
            enqueueSnackbar('Resume/Profile update failed', { variant: 'error' });
        })
    }
    return (
        <div>
            <ProfileForm 
            userdata={userdata}
             upadteProfile={upadteProfile} 
             experiences={experiences}
             qualifications={qualifications}
             socialMediaLinks={socialMediaLinks}
             skills={skills}
             name={userdata?.name}
             recordType={recordType}
             />

        </div>
    )
}
