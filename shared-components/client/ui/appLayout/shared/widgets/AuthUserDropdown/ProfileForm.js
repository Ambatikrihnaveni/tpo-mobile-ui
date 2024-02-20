import React, { useState } from 'react';
import Div from "@jumbo/shared/Div";
import { Step, StepLabel, Stepper, Button } from "@mui/material";
import { BsArrowLeftShort } from "react-icons/bs";
import Basic from './BasicDetails';
import Education from './Education';
import Work from './Work';
import Summary from './Summary';
import Additional from './Additional'
import Finish from './Finish';
import Skills from './Skills';
import SocialMedia from './sociaMedia';
import { Dialog, DialogContent } from '@mui/material';
import { BsArrowRightShort } from 'react-icons/bs';
import { Grid, Typography } from '@material-ui/core'
import AccountsService from '../../../../graphql/services/accounts/accounts-service';
const steps = [
  { label: 'Basic', completed: false, fields: ['phonenumber', 'firstname', 'country', 'city', 'pincode'] },
  { label: 'Education', completed: false, fields: ['education'] },
  { label: 'Internships/Projects', completed: false, fields: [] },
  { label: 'Skills', completed: false, fields: [] },
  { label: 'Summary', completed: false, fields: ['selectedSummary'] },
  { label: 'Additional', completed: false, fields: [] },
  { label: 'Social Media', completed: false, fields: [] },

  { label: 'Finish', completed: false, fields: [] },
];
 

class ProfileForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeStep: 0,
      stepValues: 0,
      email: this.props.userdata?.primaryEmailAddress,
      phonenumber: this.props.userdata?.phoneNumber,
      firstname: this.props.userdata?.name,
      fathername: this.props.userdata?.profile?.fatherName,
      hallticket: this.props.userdata?.profile?.hallTicketNumber,
      country: this.props.userdata?.profile?.country,
      city: this.props.userdata?.profile?.city,
      pincode: this.props.userdata?.profile?.pincode,
      additional: this.props.userdata?.profile?.additional || [],
      customField: '',
      selectedSummary: this.props.userdata?.profile?.summary ? this.props.userdata?.profile?.summary : [],
      validationErrors: {},
      education: this.props.qualifications ? this.props.qualifications : [{ qualification: "", study: "", score: "", schoollocation: "", schoolname: "", gradYear: "" }],
      open: false,
      work: this.props.experiences ? this.props.experiences : [{ jobtitle: '', employer: '', location: '', description: '', startmonth: '', selectedStartYear: '', endmonth: '', selectedEndYear: '', }],
      media: this.props.socialMediaLinks ? this.props.socialMediaLinks : [{ link: "", account: "", }],
      skillsList: this.props.skills ? this.props.skills : [{ skill: '', rating: '' }],
      bio: this.props.userdata?.profile?.bio ? this.props.userdata?.profile?.bio : " ",
      editIndex: -1,
      isProfile: this.props?.userdata?.isStudentProfile
    }

  }
  removeTypenameFromObject = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(this.removeTypenameFromObject);
    }
    const { __typename, ...rest } = obj;
    for (const key in rest) {
      rest[key] = this.removeTypenameFromObject(rest[key]);
    }
    return rest;
  };

  // Define a function to remove __typename from additional and update the state
  removeTypenameFromAdditional = () => {
    const { additional } = this.state;
    const updatedAdditional = this.removeTypenameFromObject(additional);

    this.setState({ additional: updatedAdditional });
  };

  // You can call this function when needed, for example, when the component mounts
  componentDidMount() {
    this.removeTypenameFromAdditional();
  }
  // You can call this function when needed, for example, when the component mounts
  componentDidMount() {
    this.removeTypenameFromAdditional();
  }
  static getDerivedStateFromProps(props, state) {
    if (props.userdata) {
      return {
        email: props.userdata.primaryEmailAddress,
        // phonenumber:props.userdata.phoneNumber
      }
    }
  }

  handleChange = (input) => e => {
    this.setState({ [input]: e.target.value &&  e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) })
  }
  handleChangeBio = (input) => {
    this.setState({ bio: input })
  }
  
  handleNext = () => {
    const { activeStep } = this.state;
    const currentFields = steps[activeStep].fields;
    const validationErrors = {};
    // Validate current step's fields
    let isValid = true;
    for (const field of currentFields) {
      if (!this.state[field]) {
        validationErrors[field] = 'This field is required';
        isValid = false;
      }
    }
    if (isValid) {
      this.setState((prevState) => ({
        activeStep: prevState.activeStep + 1,
        validationErrors: {},
      }));
    } else {
      this.setState({ validationErrors });
    }
  };
  handlePrevious = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
      validationErrors: {}
    });

  };
  handleConfirmSkip = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
      validationErrors: {}
    });
    this.setState({ open: false });
  };
  handleClose = () => {
    this.setState({ open: false })
  }
  handleSkip = () => {
    this.setState({ open: true });
  };


  addSummary = (summary) => {
    if (!this.state.selectedSummary.includes(summary)) {
      this.setState({ selectedSummary: [...this.state.selectedSummary, summary] });
    }
  };

 
  handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const { education } = this.state;

    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

    if (
      education.some(
        (edu, i) =>
          i !== index &&
          (edu.gradYear === capitalizedValue || edu.qualification === capitalizedValue)
      )
    ) {
      this.setState({ errors: "Fields should not have duplicate text." });
    } else {
      this.setState({ errors: "" });
      const updatedEducation = [...education];
      updatedEducation[index][name] = capitalizedValue;
      this.setState({ education: updatedEducation });
    }
  };
  handleMediaChange = (e, index) => {
    const { name, value } = e.target;
    const { media } = this.state;

    // Check for duplicate text in gradYear and qualification fields
    if (
      media.some(
        (media, i) =>
          i !== index &&
          (media.link === value || media.account === value)
      )
    ) {
      // Set an error message when duplicate text is found
      this.setState({ errors: "Fields should not have duplicate text." });
    } else {
      // Clear the error message and update the state
      this.setState({ errors: "" });
      const updatedMedia = [...media];
      updatedMedia[index][name] = value;
      this.setState({ media: updatedMedia });
    }
  };
  handleSkillChange = (e, index, fieldName) => {
    const { value } = e.target;
    const { skillsList } = this.state;

    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

    const updatedSkillsList = [...skillsList];
    updatedSkillsList[index][fieldName] = capitalizedValue;

    this.setState({ skillsList: updatedSkillsList });
  };

  handleAddUser = () => {

    const { education } = this.state;
    this.setState({
      education: [
        ...education,
        { qualification: "", study: "", score: "", schoollocation: "", schoolname: "", gradYear: "" }
      ]
    });
  }
  handleAddMedia = () => {
    const { media } = this.state;
    this.setState({
      media: [
        ...media,
        { link: "", account: "", }
      ]
    });
  }
  handleAddSkill = () => {
    const { skillsList } = this.state;
    this.setState({
      skillsList: [
        ...skillsList,
        { skill: "", rating: "", }
      ]
    });
  }
  handleDeleteUser = index => {
    const { education } = this.state;
    const list = [...education];
    list.splice(index, 1);
    this.setState({ education: list });
  }
  handleDeleteMedia = index => {
    const { media } = this.state;
    const list = [...media];
    list.splice(index, 1);
    this.setState({ media: list });
  }
  handleDeleteSkill = index => {
    const { skillsList } = this.state;
    const list = [...skillsList];
    list.splice(index, 1);
    this.setState({ skillsList: list });
  }
  handleWorkChange = (e) => {
    const inputValue = String(e.target.value); // Ensure it's a string
  
    this.setState((prevData) => ({
      ...prevData,
      [e.target.name]: inputValue && inputValue.charAt(0).toUpperCase() + inputValue.slice(1),
    }));
  };
  
  
  handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    if (checked) {
      // If the checkbox is checked, clear the data for endmonth and selectedEndYear
      this.setState((prevState) => ({
        ...prevState,
        [name]: checked,
        endmonth: "",
        selectedEndYear: "",
      }));
    } else {
      // If the checkbox is unchecked, only update the currentlyWorkHere field
      this.setState({
        [name]: checked,
      });
    }
  };

 

  handleSubmitEducation = (e) => {

    e.preventDefault();
    const { qualification, schoolname, schoollocation, study, score, gradYear, editIndex } = this.state;
    const newWork = {
      qualification: qualification,
      schoolname: schoolname,
      schoollocation: schoollocation,
      study: study,
      score: score,
      gradYear: gradYear,

    };

    if (editIndex !== -1) {
      this.setState(prevState => {
        const updatedWork = [...prevState.work];
        updatedWork[editIndex] = newWork;
        return {
          work: updatedWork,
          editIndex: -1,
          qualification: '',
          schoollocation: '',
          location: '',
          description: '',
          study: '',
          score: '',
          gradYear: '',

        };
      });
    } else {
      this.setState(prevState => ({
        work: [...prevState.work, newWork],
        qualification: '',
        schoolname: '',
        schoollocation: '',
        study: '',
        score: '',
        gradYear: '',

      }));
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { jobtitle, employer, location, description, startmonth, selectedStartYear, endmonth, selectedEndYear, editIndex } = this.state;
    const newWork = {
      jobtitle: jobtitle,
      employer: employer,
      location: location,
      description: description,
      startmonth: startmonth,
      selectedStartYear: selectedStartYear,
      endmonth: endmonth,
      selectedEndYear: selectedEndYear,
    };

    if (editIndex !== -1) {
      this.setState(prevState => {
        const updatedWork = [...prevState.work];
        updatedWork[editIndex] = newWork;
        return {
          work: updatedWork,
          editIndex: -1,
          jobtitle: '',
          employer: '',
          location: '',
          description: '',
          startmonth: '',
          selectedStartYear: '',
          endmonth: '',
          selectedEndYear: '',
        };
      });
    } else {
      this.setState(prevState => ({
        work: [...prevState.work, newWork],
        jobtitle: '',
        employer: '',
        location: '',
        description: '',
        startmonth: '',
        selectedStartYear: '',
        endmonth: '',
        selectedEndYear: '',
      }));
    }
  };



  handleEdit = (index) => {
    const workToEdit = this.state.work[index];
    this.setState({
      jobtitle: workToEdit.jobtitle,
      employer: workToEdit.employer,
      location: workToEdit.location,
      description: workToEdit.description,
      startmonth: workToEdit.startmonth,
      selectedStartYear: workToEdit.selectedStartYear,
      endmonth: workToEdit.endmonth,
      selectedEndYear: workToEdit.selectedEndYear,
      editIndex: index,
    });
  };
  handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    this.setState((prevState) => {
      const updatedAdditional = checked
        ? [...prevState.additional, value]
        : prevState.additional.filter((item) => item !== value);
      return {
        additional: updatedAdditional
      };
    });
  };


  handleDelete = (index) => {
    this.setState(prevState => ({
      work: prevState.work.filter((_, i) => i !== index),
      editIndex: prevState.editIndex === index ? -1 : prevState.editIndex,
    }));
  };

  additionalDataChange = (data) => {

    let websites = []
    const accomplishments = [data.accomplishments]
    const certificates = [data.certificates]
    for (let i = 0; i < data?.websiteList.length; i++) {
      websites.push(data?.websiteList[i].website)
    }
    this.setState({
      additional: [{ additionalType: "links", links: websites },
      { additionalType: "languages", languages: data.languagesList },
      { additionalType: "accomplishments", accomplishments: accomplishments },
      { additionalType: "certifications", certifications: certificates },
      { additionalType: "additionalInfo", additionalInfo: data.info }]
    })
  }

  handleResumeSubmit = () => {
    this.props.upadteProfile(this.state)
  }

   onStepClick=(i)=>{
    if(this.props.recordType=="edit-profile"){
      this.setState({
        activeStep: i
      });
    }
    
    }

  renderContent = () => {
    const { additional, customField } = this.state;
    const data = { additional, customField };
    const { skillsList } = this.state;
    switch (this.state.activeStep) {
      case 0:
        return <Basic data={this.state} handleChange={this.handleChange} userData={this.props.userdata} />;
      case 1:
        return <Education handleChange={this.handleEducationChange} handleSubmit={this.handleSubmitEducation} handleDeleteUser={this.handleDeleteUser} handleAddUser={this.handleAddUser} education={this.state.education} />;
      case 2:
        return <Work data={this.state} handleChange={this.handleWorkChange} handleSubmit={this.handleSubmit} handleEdit={this.handleEdit} handleDelete={this.handleDelete} handleCheckboxChange={this.handleCheckboxChange} />;
      case 3:
        return <Skills skillsList={this.state.skillsList} addSkill={this.handleAddSkill} handleChange={this.handleSkillChange} handleDeleteSkills={this.handleDeleteSkill} />
      case 4:
        return <Summary data={this.state} bio={this.state.bio} handleChangeBio={this.handleChangeBio} />;
      case 5:
        return <Additional additionalDataChange={this.additionalDataChange} additional={this.state.additional} />;
      case 6:
        return <SocialMedia handleChange={this.handleMediaChange} handleDeleteMedia={this.handleDeleteMedia} handleAddMedia={this.handleAddMedia} media={this.state.media} />;
      case 7:
        return this.state.isProfile == true ? (
          <Finish data={this.state} education={this.state.education} additional={this.state.additional} />
        ) : null;
      default:
        return null;
    }
  };
  isStepValid() {
    const { activeStep } = this.state;
    const currentFields = steps[activeStep].fields;

    for (const field of currentFields) {
      if (!this.state[field]) {
        return false;
      }
    }

    // Check if at least one work card is added for step 2
    if (activeStep === 2) {
      const { work } = this.state;
      if (work.length === 0) {
        return false;
      }
    }

    // Additional validations for other steps if needed

    return true;
  }
  render() {
    const { activeStep, validationErrors } = this.state;
    const currentFields = steps[activeStep].fields;
    const { open } = this.state;
    const { data } = async () => {
      await AccountsService.viewer()
    }
    return (
      <div>
        <Div sx={{ width: '100%'}}>
          <Stepper activeStep={this.state.activeStep} alternativeLabel style={{ paddingBottom: '25px',overflow:'auto',maxWidth:'100%' }}>
            {steps.map((step, index) => (
              <Step key={step.label} completed={step.completed || index < this.state.activeStep} onClick={()=>this.onStepClick(index)} sx={{cursor:'pointer'}}>
                <StepLabel StepIconProps={{
                  style: {
                    width: '20px',
                    height: '20px',
                    fontSize: '15px',
                    borderRadius: '50%',
                  },
                }}>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div >
            {this.renderContent()}
            <Grid container spacing={2} style={{ marginTop: '10px' }}>
              <Grid item xs={6} sm={6}>

                <Button disabled={this.state.activeStep === 0} onClick={this.handlePrevious} variant="contained" startIcon={<BsArrowLeftShort />} style={{ marginRight: '10px' }}>
                  Back
                </Button>
                {activeStep === 2 && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                  >
                    Skip
                  </Button>
                )}
              </Grid>
              <Grid item xs={6} sm={6} style={{ textAlign: 'right' }} >
                {activeStep === 6 && (
                  <Button variant="contained" style={{ marginRight: '10px' }} onClick={this.handleResumeSubmit}>
                    Save
                  </Button>
                )}
                {activeStep < steps.length - 1 && (this.state.isProfile || activeStep !== 6) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    //disabled={!this.isStepValid()}
                    style={{ marginLeft: '10px' }}
                    startIcon={<BsArrowRightShort />}
                  >
                    Next
                  </Button>
                )}


              </Grid>
            </Grid>

          </div>
        </Div>

        <Dialog open={open} onClose={this.handleClose} style={{ borderRadius: '50px', border: 'solid 1px ' }}>
          <DialogContent>
            <div
              style={{
                background: 'white',
                height: '480px',
                width: '450px',
                justifyContent: 'center',

              }}
            >
              <img src='https://sharegate.com/cdn-cgi/image/width=1200,height=674,quality=80,f=auto/app/uploads/2017/05/releases5-18_400x234_0291b4.png' width={'250px'} height={'100px'}
                style={{ borderTopLeftRadius: '25px', borderBottomRightRadius: '25px', marginTop: '18px', marginLeft: '23%', textAlign: 'center', }} />
              <Typography style={{ color: '#475259', fontWeight: 500, fontSize: '1.5rem', padding: '10px', textAlign: 'center', }}>
                Do you wish to exclude this section?
              </Typography>
              <Typography style={{ color: '#475259', fontWeight: 500, fontSize: '1rem', padding: '10px', textAlign: 'center', }}>
                You may also list any part-time or unofficial employment. Here are some titles that other people like you have added:              </Typography>
              <Grid container >
                <Grid style={{ marginLeft: '80px', color: '#475259', fontWeight: 500, fontSize: '1rem', }}>

                  <ul>
                    <li>Internship</li>
                    <li>Research Assistant</li>
                    <li>Teaching Assistant</li>
                    <li>Lab Assistant</li>
                  </ul>
                </Grid>
                <Grid style={{ marginLeft: '80px', color: '#475259', fontWeight: 500, fontSize: '1rem', }}>

                  <ul>
                    <li>Sales Associate</li>
                    <li>Freelancer</li>
                    <li>Event Planner</li>
                    <li>Content Creator</li>
                  </ul>
                </Grid>
              </Grid>
              <Button
                onClick={this.handleClose}
                variant="outlined"
                color="primary"
                style={{ margin: '25px 8px 2px 110px' }}
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleConfirmSkip}
                variant="contained"
                color="primary"
                style={{ margin: '25px 8px 2px 30px' }}
              >
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
};

export default ProfileForm;
