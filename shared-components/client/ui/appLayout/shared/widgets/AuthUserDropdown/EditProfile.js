import React, { useState } from 'react';
import * as yup from "yup";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import useAuth from "/imports/client/ui/hooks/useAuth";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import 'react-datepicker/dist/react-datepicker.css';
import { useDropzone } from "react-dropzone";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import ProfileEditForm from './profileeditForm';
import AdminEditProfile from "./AdminEditProfile"
import TutorUpdateProfile from './tutorupdateprofile';
import ProfileBasic from './profilebasic';
import ProfileQualification from './profilequalification';
import ProfileExperience from './profileexperience';
import ProfileSkills from './profileskills';
import ProfileSummary from './profilesummary';
import CollegeAdminDetails from './college-admin editprofile/collAdEditProfile';

const steps = ['Basic', 'Qualification', ' Experience','Skills', 'Summary',];


const updateAccountMutation = gql`
mutation updateAccount($input: UpdateAccountInput! ) {
    updateAccount(input:$input){
        account{
            _id
        }
    }
    
}
`;

const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});
const categoriesData = [
    {
        label: "MERN Stack",
        value: "MERN Stack",
    },
    {
        label: "Frontend Development",
        value: "Frontend Development",
    },
    {
        label: "Wordpress Development",
        value: "Wordpress Development",

    },
    {
        label: "Manual Testing",
        value: "Manual Testing",
    },
    {
        label: "Digital Marketing",
        value: "Digital Marketing",

    },
    {
        label: "ITES Non-Voice or BPO Non-Voice",
        value: "ITES Non-Voice or BPO Non-Voice",
    },
    {
        label: "Banking and Financial",
        value: "Banking and Financial"
    },
]
const EditProfile = ({ contact, onSave, event }) => {
    ;
    const Swal = useSwalWrapper();
    const [updateAccount] = useMutation(updateAccountMutation, { ignoreResults: true });
    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = React.useState(viewer);
    const[open, setOpen]= useState(false)
    const [profileData, setProfileData] = React.useState({});
    const [error, setError] = useState("");
    const [selectedFromTime, setSelectedFromTime] = useState(user?.profile?.selectedFromTime);
    const [selectedToTime, setSelectedToTime] = useState(user?.profile?.selectedToTime)
    const [startTime, setStartTime ] = useState(user?.profile?.startTime)
    const [endTime , setEndTime] = useState(user?.profile?.endTime)
    const [selectedDays, setSelectedDays] = useState(user?.profile?.availableDays)
    const [experience, setExperience] = useState(user?.profile?.experience)
    const assets = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const [qualification, setQualification] = useState(user?.profile?.qualification)
    const [selectedOptions, setSelectedOptions] = useState(user?.profile?.categories);
    const[imageUrl,setImageUrl] = React.useState(user?.profile?.picture)
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
    const { showDialog, hideDialog } = useJumboDialog();
    const handleAutocompleteChange = (event, value) => {
        setSelectedOptions(value);
    };
   
    React.useEffect(() => {
        // Convert the string to a Date object
        const initialSelectedTime = new Date(user?.profile?.selectedFromTime);
        setSelectedFromTime(initialSelectedTime);
    }, []);
    React.useEffect(() => {
        // Convert the string to a Date object
        const initialSelectedTime = new Date(user?.profile?.selectedToTime);
        setSelectedToTime(initialSelectedTime);
    }, []);

    const handleSelectYear = (e) => {
        setSelected(e.target.value);
    }

    const handleImageUpload = React.useCallback( (e)=> {

        const [file] = e.target.files;
        if (file) {

            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);

          const reader = new FileReader();
          const { current } = uploadedImage;
          current.file = file;
          reader.onload = e => {
            current.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },[]);

 

 
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const files = acceptedFiles.map(file => (
        <ListItem selected key={file.path} sx={{ width: 'auto', mr: 1 }}>
            {file.path} - {file.size} bytes
        </ListItem>
    ));


    const handleFileChange = (event) => {
        setCertificates(event.target.value);
    };

    const Transition = React.forwardRef((props, ref) => {
        return <Slide direction="down" ref={ref} {...props} />;
    });
    const onSuccess = () => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Contact has been updated successfully.',
            showConfirmButton: false,
            timer: 1500
        });
    }
    React.useEffect(() => {
        if (viewer) {
            setUser(viewer);
            setProfileData({
                email: viewer.primaryEmailAddress,
                name: viewer.name,
                phoneNumber: viewer.phoneNumber,
                address: viewer.profile?.address,
                picture: viewer.profile?.picture,
                qualification: viewer.profile?.qualification,
                experience: viewer.profile?.experience,
                price: viewer.profile?.price,
                selectedDays: viewer.profile?.availableDays,
                categories: viewer.profile?.categories,
                bio: viewer.profile?.bio,
                role: viewer.role,
                selectedFromTime: viewer.profile?.selectedFromTime,
                selectedToTime: viewer.profile?.selectedToTime, 
                startTime: viewer.profile?.startTime,
                endTime: viewer.profile?.endTime,

            });
        }
    }, [viewer]);

    const initialValues = {
        name: profileData.name || "",
        phoneNumber: profileData.phoneNumber || "",
        email: profileData.email || "",
        picture: profileData.picture || "",
        address: profileData.address || "",
        qualification: profileData.qualification || "",
        experience: profileData.experience || "",
        price: profileData.price || "",
        selectedDays: profileData.selectedDays || "",
        courseCategory: profileData.categories || "",
        bio: profileData.bio || "",
        selectedFromTime: profileData.selectedFromTime || "",
        selectedToTime: profileData.selectedToTime || "",
        startTime: viewer?.profile?.startTime || "",
        endTime: viewer?.profile?.endTime || ""



    };
    const upadteProfile = (email, address, name, phoneNumber, qualification, experience, price, bio, selectedDays, courseCategory, picture,selectedFromTime, selectedToTime,startTime,endTime) => {
        const categories = []
        for (let i = 0; i < courseCategory.length; i++) {
            categories.push(courseCategory[i].value)
        }
        updateAccount({
            variables: ({
                input: {
                    email,
                    phoneNumber:phoneNumber.toString(),
                    address,
                    bio,
                    qualification,
                    experience,
                    price: price.toString(),
                    availableDays: selectedDays,
                    categories: selectedOptions,
                    picture,
                    name,
                    selectedFromTime: selectedFromTime.toString(),
                    selectedToTime: selectedToTime.toString(), 
                    startTime: startTime.toString(),
                    endTime: endTime.toString()
                }
            })
        }).then((data) => {
            setOpen(true)
        }).catch((err) => {
            setError(err)
        })
    }
    const onContactSave = (data, { setSubmitting }) => {

        setSubmitting(true);
        upadteProfile(data.email, data.address, data.name, data.phoneNumber, data.qualification, data.experience, data.price, data.bio, data.selectedDays, data.courseCategory, data.picture, selectedFromTime, selectedToTime,startTime,endTime);
        setSubmitting(false);
    };

    const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? 
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  


  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  
  handleResumeSubmit = () => {
      ;
    this.props.updateProfile(this.state);
  }

  const stepData = [
    {
      title: 'Step 1',
      content: <ProfileBasic 
             //  data={profileData}
               initialValues={initialValues}
      
      />,
    },
    {
      title: 'Step 2',
      content: <ProfileQualification
               data={profileData}
               initialValues={initialValues}

      />,
    },
    {
      title: 'Step 3',
      content:<ProfileExperience 
             data={profileData}
             initialValues={initialValues}
             
      />,
    },
    {
        title: 'Step 4',
       content:<ProfileSkills
       data={profileData}
             initialValues={initialValues}
             
              
    />
        
      },
      {
        title: 'Step 5',
       content:<ProfileSummary
         data={profileData}
             initialValues={initialValues}
             
       />
      },
  ];
    

    return (
        <div>
     
 <JumboDemoCard wrapperSx={{ backgroundColor: 'background.paper', pt: 0,display:'block' }}>

  {(profileData.role === "Admin" || profileData.role == "Master-Admin") && 
                          <AdminEditProfile/> }
{profileData.role==="Tutor"&&(<TutorUpdateProfile />)}
{profileData.role==="Student"&&(<ProfileEditForm/>)}
{profileData.role==='College-Admin'&&(<CollegeAdminDetails/>)}
</JumboDemoCard>
</div> 
    );
};
export default EditProfile;