import React from 'react';
import { Avatar, IconButton } from '@mui/material';
import Div from '../../../../../../client/ui/@jumbo/shared/Div';
import ClearIcon from '@mui/icons-material/Clear';


const PDFList = ({ pdfFiles,onRemoveFile }) => {
    
  return (
    <Div sx={{display:'flex',textAlign:'center',mt:-2,overflowX:'scroll'}}>
        {pdfFiles?.map((pdf, index) => {
            const pdfBlob = new Blob([pdf], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
          return(
            <Div sx={{m:2,textAlign:'center'}}>
                <IconButton sx={{ml:2,zIndex:1}} onClick={()=>onRemoveFile(index)}><ClearIcon/></IconButton>
            <a href={pdfUrl} download={'pdffile.pdf'}>
            <Avatar 
            src='/images/pdfImage.png'
            sx={{width: 70, height: 70,mt:-2,textAlign:'center'}}
            /> </a>
         </Div>)
         
})}
    </Div>
  );
};

export default PDFList;