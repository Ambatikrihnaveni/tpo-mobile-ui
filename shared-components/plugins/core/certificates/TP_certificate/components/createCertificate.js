import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Div from "@jumbo/shared/Div";
import Typography from '@mui/material/Typography';
import CertificatesSlides from '../../certificatesSlides';
import UpLoads from './UpLoads';
import { ToastContainer, toast } from 'react-toastify';
import ReactDOMServer from 'react-dom/server';
import useAuth from '../../../../../client/ui/hooks/useAuth';
import CertificatesServices from '../../../../../client/ui/graphql/services/certificates/certificates-services';
import useCurrentShopId from '../../../../../client/ui/hooks/useCurrentShopId';
import html2canvas from 'html2canvas';
import Certificate from './certificate';


const steps = ['Chose Template', 'Uploads', 'Finish'];

const templates=[{template:'/certificateTemplates/temp-1.png',sample:'/certificateTemplates/sample-temp1.png'},
{template:'/certificateTemplates/temp-2.png',sample:'/certificateTemplates/sample-temp2.png'},
{template:'/certificateTemplates/temp-3.png',sample:'/certificateTemplates/sample-temp3.png'},]


export default function CreateCertificate({hideDialog,setRefresh,}) {
  const {shopId}= useCurrentShopId()
  const [activeStep, setActiveStep] = React.useState(0);
  const [logo, setLogo] = React.useState(null)
  const [template,setTemplate]=React.useState(templates[0].template)
  const [authority,setAuthority]= React.useState([{designation:null,name:null,sign:null}])
 const [htmlString,setHtmlString] = React.useState(null)
 const [certifiTemp, setcertifiTemp] = React.useState(0)
 

  const handleNext = () => {
    setActiveStep(activeStep + 1);
   
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const fileToDataUri = (file) => new Promise((resolve, reject) => {
    
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
    })

const uploadLogo = (file) => {
    
    if(!file) {
        setLogo(null);
        return;
      }
  
      fileToDataUri(file)
        .then(dataUri => {
          setLogo(dataUri)
        })
}

const onNameChange=(e,i)=>{
  let data= [...authority]
  data[i].name=e.target.value
  setAuthority(data)
}

const uploadSign = (file,i) => {
    if(!file) {
      setAuthority([...authority]);
        return
      }

      fileToDataUri(file)
        .then(dataUri => {
          let data= [...authority]
          data[i].sign=dataUri
          setAuthority(data)
        })
}
const handleChange=(e,i)=>{
let data= [...authority]
data[i].designation=e.target.value
setAuthority(data)
}

const onRowAdd=()=>{
  let data = [...authority]
  const row= {designation:null,sign:null,name:null}
  data.push(row)
  setAuthority(data)
}

const onRowDelete = (index) => {
  let data = [...authority];
  data.splice(index, 1);
  setAuthority(data);
};

const uploadSign2 = (file) => {
    if(!file) {
        setSign2('');
        return;
      }
  
      fileToDataUri(file)
        .then(dataUri => {
          setSign2(dataUri)
        })
}

const createImage =  async() => {
  const reactComponent = document.getElementById('certificate-template');
let imageData =''
  // Convert the React component to an image.
 await html2canvas(reactComponent).then((canvas) => {
    // Get the image data from the canvas.
     imageData = canvas.toDataURL('image/png');

  });
  return imageData
  } 

const onSelectTemp=(data,i)=>{
  setTemplate(data.template)
  setcertifiTemp(i)
}
const onSubmit = async()=>{
  
  
const htmlData = ReactDOMServer.renderToStaticMarkup(<Certificate 
  logo={logo}
  authority={authority}
  template={template}
  certifiTemp={certifiTemp}
  />)
  setHtmlString(htmlData)
  const certificateImage = await createImage()
  
  try {
  const data = await CertificatesServices.createCertificate(shopId,htmlData,certificateImage,authority,template,certifiTemp,logo);

  
    setRefresh(true);
    toast.success('Certificate Created Successfully', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    setTimeout(() => {
      hideDialog()
  }, "3000");

 
} catch (error) {
    toast.error('Create certificate error', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  
 // hideDialog()
}
}
  const renderContent=()=>{
switch (activeStep) {
    case 0:
        return <CertificatesSlides 
        template={template}
        templates={templates}
        onSelectTemp={onSelectTemp}
        certifiTemp={certifiTemp} />

    case 1:
        return <UpLoads 
        logo={logo}
        uploadLogo={uploadLogo}
        uploadSign={uploadSign}
        authority={authority}
        handleChange={handleChange}
        onNameChange={onNameChange}
        onRowAdd={onRowAdd}
        onRowDelete={onRowDelete}
        />

    case 2:
        return <Certificate 
        logo={logo}
        authority={authority}
        template={template}
        certifiTemp={certifiTemp}
        />
}
  }

  return (
    <Box>
      <Stepper activeStep={activeStep}>
       
      </Stepper>
     
        <React.Fragment>
            <Typography variant='h2' sx={{textAlign:'center'}}> <b>{activeStep==0 ? "Chose Template": activeStep== 1? "Upload files" :'' } </b></Typography>
            <Div sx={{p:2}}>
        {renderContent()}
        </Div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
           

            <Button onClick={activeStep === steps.length - 1 ? onSubmit: handleNext } 
            disabled={ (activeStep === 1 && (logo === null ||authority.some((row) => row.designation === null || row.sign === null ))
            )}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
        <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
    </Box>
  );
}