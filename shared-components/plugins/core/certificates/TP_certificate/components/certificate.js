import React from 'react'
import Div from '@jumbo/shared/Div';
import CertifiTemp_1 from '../../certifiTemp_1';
import CertifiTemp_2 from '../../certifiTemp_2';
import CertifiTemp_3 from '../../certifiTemp_3';


export default function Certificate(
  {logo,
   authority,
   template,
   certifiTemp,
   studentName,
   trainingpartnerName,
   programName,
   startDate,
   endDate,
   programType,
   record
  }
  ) {

    
  return (
    
    <div style={{  width: '800px', margin: 'auto',boxShadow: '3px 5px  8px rgba(0,0,0,0.3)', }}>
      
        <Div
          style={{
            backgroundImage: `url(${template})`,
            backgroundSize: 'cover',
            width: '800px',
            height: '595px',
            padding: '20px',
            textAlign: 'center',
            margin: 'auto',
          }} id={'certificate-template'}>
          <Div>
            {certifiTemp == 0 &&
            <CertifiTemp_1 
            logo={logo} 
            authority={authority} 
            studentName={studentName}
            trainingpartnerName={trainingpartnerName}
            programName={programName}
            startDate={startDate} 
            endDate= {endDate}
            programType={programType}
            record={record}
            />}


            {certifiTemp == 1 && 
            <CertifiTemp_2 
            logo={logo} 
            authority={authority}
            studentName={studentName}
            trainingpartnerName={trainingpartnerName}
            programName={programName}
            startDate={startDate} 
            endDate= {endDate}
            programType={programType}
            record={record}/>}


            {certifiTemp == 2 && 
            <CertifiTemp_3 
            logo={logo} 
            authority={authority} 
            studentName={studentName}
            trainingpartnerName={trainingpartnerName}
            programName={programName}
            startDate={startDate}
            endDate={endDate}
            programType={programType}
            record={record}/>}

          </Div>
        </Div>
      </div>
  )
}
