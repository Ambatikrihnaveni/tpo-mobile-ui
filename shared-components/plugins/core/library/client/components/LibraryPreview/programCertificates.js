import React from 'react'
import { Card, Grid } from '@mui/material'


export default function ProgramCertificates({data}) {
    
const [certificates,setCertificates] = React.useState([])


React.useEffect(()=>{
    
let certificatesData=[]
let currentAdmissions = [];
if(data?.batches){
    for(let batch of data?.batches) {
        if(data?.price=="0"){
            currentAdmissions.push(batch)
        }else{
        let enrolementEndDateString = batch.enrolementEndDate;
        let enrolementStartDateString = batch.enrolementStartDate;

        let enrolementEndDate = new Date(enrolementEndDateString);
        let enrolementStartDate = new Date(enrolementStartDateString);

        let enrolementEndDateInMilliSeconds = enrolementEndDate.getTime();
        let acutalEnrolementEndDateInMilliSeconds = enrolementEndDateInMilliSeconds + (23 * 59 * 59 * 1000);

        let enrolementStartDateInMilliSeconds = enrolementStartDate.getTime();

        let today = new Date();
        let todayInMilliSeconds = today.getTime();
        if(enrolementStartDateInMilliSeconds <= todayInMilliSeconds && todayInMilliSeconds <= acutalEnrolementEndDateInMilliSeconds) {
            currentAdmissions.push(batch)
        }
    }
    }
}
for(let x=0; x< currentAdmissions?.length;x++){
    if(currentAdmissions[x].certificate){
        certificatesData.push(currentAdmissions[x].certificate)
    }
}
setCertificates(certificatesData)

},[])

  return (
    <div>
        <Grid container spacing={1}>
        {certificates?.map((data, i) => (
            <Grid item xs={12} sm={6} md={5}>
              <Card key={i} sx={{
                backgroundImage: `url(${data.templateImage})`,
                backgroundSize: 'cover',
                margin: '10px',
                height: '320px',}}/>

               
                </Grid>
))}
</Grid>
    </div>
  )
}
