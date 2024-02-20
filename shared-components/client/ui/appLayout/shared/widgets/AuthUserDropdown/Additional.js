import React, { useState } from 'react';
import { FormGroup, Dialog, DialogContent } from '@mui/material';
import Div from '@jumbo/shared/Div';
import { Form, Formik } from 'formik';
import {  FormControl, Button, IconButton } from '@mui/material';
import Websites from './Websites';
import Certificates from './Certificates';
import Accomplishments from './Accomplishments';
import Languages from './Languages';
import Edit from './Editor ';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

export default function Additional({ additionalDataChange, additional }) {
   
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [level, setLevel] = React.useState([{}]);
  const [language, setLanguage] = useState([{}]);
  const [isLanguagesDialogOpen, setLanguagesDialogOpen] = useState(false);
  const [isCertificatesDialogOpen, setCertificatesDialogOpen] = useState(false);
  const [isWebsitesDialogOpen, setWebsitesDialogOpen] = useState(false);
  const [isAccomplishmentsDialogOpen, setAccomplishmentsDialogOpen] = useState(false);
  const [isAffiliationsDialogOpen, setAffiliationsDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [websiteList, setWebsiteList] = useState([{ website: "" }]);
  const [certificates, setCertificates] = React.useState('');
  const [info, setInfo] = React.useState('');
  const [accomplishments, setAccomplishments] = React.useState('');
  const [languagesList, setLanguagesList] = useState([{ language: "", level: "" }]);

  
    
  React.useEffect(() => {

   if (additional) {
      for (let i = 0; i < additional.length; i++) {
        if (additional[i].additionalType == "links") {
          let websites = []
          for (let x = 0; x < additional[i].links.length; x++) {
            websites.push({ website: additional[i].links[x] })
          }
          setWebsiteList(websites)
        } else if (additional[i].additionalType == "languages") {
          let languageData= []
          for(let z=0;z<additional[i].languages.length;z++){
            languageData.push({language:additional[i].languages[z].language,level:additional[i].languages[z].level})
          }
          setLanguagesList(languageData)
        } else if (additional[i].additionalType == "accomplishments") {
          setAccomplishments(additional[i].accomplishments[0])
        } else if (additional[i].additionalType == "certifications") {

          setCertificates(additional[i].certifications[0])
        }
        else if (additional[i].additionalType == "additionalInfo") {
          setInfo(additional[i].additionalInfo)
        }
      } 
     // additionalDataChange({ websiteList, languagesList, accomplishments, certificates, certificates, info })

    }

  }, [])


  const handleAddWebsite = () => {
    setWebsiteList([...websiteList, { website: "" }]);
  };

  const handleAddLanguages = () => {
    setLanguagesList([...languagesList, { language: "", level: "" }]);
  };

  const addWebsite = (e, index) => {

    const { value } = e.target;
    const updatedList = [...websiteList];
    updatedList[index].website = value;
    setWebsiteList(updatedList);
    additionalDataChange({ websiteList, languagesList, accomplishments, certificates, certificates, info })
  }

  const addLanguage = (e, index) => {

    const { value } = e.target;
    const updatedList = [...languagesList];
    updatedList[index].language = value;
    setLanguagesList(updatedList);
    additionalDataChange({ websiteList, languagesList, accomplishments, certificates, certificates, info })
  }

  const addLevel = (e, index) => {

    const { value } = e.target;
    const updatedList = [...languagesList];
    updatedList[index].level = value;
    setLanguagesList(updatedList);
    additionalDataChange({ websiteList, languagesList, accomplishments, certificates, certificates, info })
  }


  const addCertificates = (event) => {
    setCertificates(event)
    additionalDataChange({ websiteList, languagesList, accomplishments, certificates, certificates, info })
  }
  const addAccomplishments = (event) => {
    setAccomplishments(event)
    additionalDataChange({ websiteList, languagesList, accomplishments, certificates, certificates, info })
  }
  const addInfo = (input) => {
    setInfo(input)
    additionalDataChange({ websiteList, languagesList, accomplishments, certificates, certificates, info })

  }


  const handleDeleteLanguage = (index) => {
    const updatedMediaList = [...languagesList];
    updatedMediaList.splice(index, 1);
    setLanguagesList(updatedMediaList);
    additionalDataChange({ websiteList, languagesList, accomplishments, certificates, certificates, info })
  };



  const handleCheckboxChange = (value) => {
    const checkboxValue = value;

    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      if (prevSelectedCheckboxes.includes(checkboxValue)) {
        if (checkboxValue === 'Languages') {
          setLanguagesDialogOpen(false);
        } else if (checkboxValue === 'Certifications') {
          setCertificatesDialogOpen(false);
        } else if (checkboxValue === 'Accomplishments') {
          setAccomplishmentsDialogOpen(false);
        } else if (checkboxValue === 'Websites, Portfolios, Profiles') {
          setWebsitesDialogOpen(false);
        } else if (checkboxValue === 'Additional Information') {
          setEditDialogOpen(false);
        }

        return prevSelectedCheckboxes.filter((value) => value !== checkboxValue);
      } else {
        if (checkboxValue === 'Languages') {
          setLanguagesDialogOpen(true);
        } else if (checkboxValue === 'Certifications') {
          setCertificatesDialogOpen(true);
        } else if (checkboxValue === 'Accomplishments') {
          setAccomplishmentsDialogOpen(true);
        } else if (checkboxValue === 'Websites, Portfolios, Profiles') {
          setWebsitesDialogOpen(true);
        } else if (checkboxValue === 'Additional Information') {
          setEditDialogOpen(true);
        }

        return [...prevSelectedCheckboxes, checkboxValue];
      }
    });
  };


  const handleCloseLanguagesDialog = () => {

    additionalDataChange({ websiteList, languagesList, accomplishments, certificates, certificates, info })
    setLanguagesDialogOpen(false);
  };

  const handleCloseCertificatesDialog = () => {
    additionalDataChange({ websiteList, languagesList, accomplishments, certificates, certificates, info })
    setCertificatesDialogOpen(false);
  };

  const handleCloseWebsiteDialog = () => {
    additionalDataChange({ websiteList, languagesList, accomplishments, certificates, certificates, info })
    setWebsitesDialogOpen(false);
  };

  const handleCloseAccomplishmentsDialog = () => {
    additionalDataChange({ websiteList, languagesList, accomplishments, certificates, certificates, info })
    setAccomplishmentsDialogOpen(false);
  };

  const handleCloseAffiliationDialog = () => {
    setAffiliationsDialogOpen(false);
  };

  const handleCloseEditDialog = () => {
    additionalDataChange({ websiteList, languagesList, accomplishments, certificates, certificates, info })
    setEditDialogOpen(false);
  };


  return (
    <Formik>
      <Form>
        <Div style={{ margin: {xs:'5px',sm:'50px'},textAlign:'center'}}>
        <h2 sx={{  color: '#475259', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem',marginRight:'50px',justifyContent: 'center', alignItems: 'center',alignSelf:'center'}}>Add your additional fields here</h2>

          <br />
           <Div  style={{ display:{sm:'flex',}, justifyContent: 'center', alignItems: 'center',}}>
            <Div >
              <FormControl component="fieldset" >
                <FormGroup>
                  <Button variant="outlined" style={{ marginBottom: '10px', width: '290px' }} onClick={() => handleCheckboxChange("Websites, Portfolios, Profiles")}>Websites, Portfolios, Profiles <CheckCircleOutlinedIcon style={{ marginLeft: '5px' }} color={(websiteList[0].website != "") ? 'success':''} /> </Button>
                  <Button variant="outlined" style={{ marginBottom: '10px', width: '290px' }} onClick={() => handleCheckboxChange("Certifications")}>Certifications <CheckCircleOutlinedIcon style={{ marginLeft: '75px' }} color={(certificates !="") ? 'success':''} /></Button>
                  <Button variant="outlined" style={{ marginBottom: '10px', width: '290px' }} onClick={() => handleCheckboxChange("Languages")}>Languages <CheckCircleOutlinedIcon style={{ marginLeft: '105px' }} color={(languagesList[0].language != "") ? 'success':''} /> </Button>
                 </FormGroup>
              </FormControl>
            </Div>

            <Div sx={{marginLeft:'10px',marginTop:{sm:'-45px',xs:0,md:0}}}>
             <FormControl>
                <FormGroup>
                  <Button variant="outlined" style={{ marginBottom: '10px'}} onClick={() => handleCheckboxChange("Accomplishments")}>Accomplishments <CheckCircleOutlinedIcon style={{ marginLeft: '60px' }} color={(accomplishments != "") ? 'success':''} /></Button>
                  <Button variant="outlined" style={{ marginBottom: '10px' }} onClick={() => handleCheckboxChange("Additional Information")}>Additional Information <CheckCircleOutlinedIcon style={{ marginLeft: '8px' }}  color={(info != "") ? 'success':''}/></Button>
            </FormGroup>
              </FormControl>
            </Div>
           </Div>
         

          <Dialog open={isLanguagesDialogOpen} PaperProps={{ style: { maxWidth: '60%', height: '90%' } }}>
            <IconButton aria-label="close" onClick={handleCloseLanguagesDialog} style={{ position: 'absolute', top: 5, right: 5 }}>
              <CloseIcon />
            </IconButton>
            <DialogContent>
              <Languages language={language} handleCloseLanguagesDialog={handleCloseLanguagesDialog} languagesList={languagesList} addLanguage={addLanguage} level={level} handleAddLanguages={handleAddLanguages} addLevel={addLevel} handleDeleteLanguage={handleDeleteLanguage} />
            </DialogContent>
          </Dialog>


          <Dialog open={isCertificatesDialogOpen} PaperProps={{ style: { maxWidth: '80%', height: '90%' } }}>
            <IconButton aria-label="close" onClick={handleCloseCertificatesDialog} style={{ position: 'absolute', top: 5, right: 5 }}>
              <CloseIcon />
            </IconButton>
            <DialogContent>
              <Certificates certificates={certificates} handleCloseCertificatesDialog={handleCloseCertificatesDialog} addCertificates={addCertificates} />
            </DialogContent>
          </Dialog>

          <Dialog open={isWebsitesDialogOpen} PaperProps={{ style: { maxWidth: '60%', height: '90%' } }}>
            <IconButton aria-label="close" onClick={handleCloseWebsiteDialog} style={{ position: 'absolute', top: 5, right: 5 }}>
              <CloseIcon />
            </IconButton>
            <DialogContent>
              <Websites websiteList={websiteList} handleCloseWebsiteDialog={handleCloseWebsiteDialog} handleAddWebsite={handleAddWebsite} addWebsite={addWebsite} />
            </DialogContent>
          </Dialog>


          <Dialog open={isAccomplishmentsDialogOpen} PaperProps={{ style: { maxWidth: '80%', height: '90%' } }}>
            <IconButton aria-label="close" onClick={handleCloseAccomplishmentsDialog} style={{ position: 'absolute', top: 5, right: 5 }}>
              <CloseIcon />
            </IconButton>
            <DialogContent>
              <Accomplishments addAccomplishments={addAccomplishments} handleCloseAccomplishmentsDialog={handleCloseAccomplishmentsDialog} accomplishments={accomplishments} />
            </DialogContent>
          </Dialog>


          <Dialog open={isEditDialogOpen} PaperProps={{ style: { maxWidth: '60%', height: '90%' } }}>
            <IconButton aria-label="close" onClick={handleCloseEditDialog} style={{ position: 'absolute', top: 5, right: 5 }}>
              <CloseIcon />
            </IconButton>
            <DialogContent>
              <Edit info={info} addInfo={addInfo} handleCloseEditDialog={handleCloseEditDialog} />
            </DialogContent>
          </Dialog>

        </Div>
      </Form>
    </Formik>
  );
}
