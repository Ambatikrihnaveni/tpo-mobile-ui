import React from 'react';
import Div from '../../../../../client/ui/@jumbo/shared/Div/Div';
import { Typography, Box } from '@mui/material'; // Updated import
import ProgramMediaGallery from './createModule/programMediaGallery';
import { useParams } from "react-router-dom"
import useProgram from '../hooks/useProgram';
export default function ProgramImage({ data, handleChange }) {


  const { shopId, program } = useProgram();
  const routeParams = useParams();
  const programId = routeParams.program_id
  return (
    <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h3' style={{ color: 'black', fontSize: '25px', fontWeight: 'bold', textTransform: 'none' }}> Upload Image</Typography>

      <Typography style={{ fontSize: '14px', color: '#8595A6', textTransform: 'none', fontWeight: '350', marginBottom: '10px' }}>Upload your Program feature image</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderRadius: '140px',
          //border: '1px dashed #cccdde',
          width: '140px',
          height: '140px',

        }}
      >
        <Div sx={{ marginLeft: '40px' }} >
          <ProgramMediaGallery
            editable={true}
            media={program?.programMedia}
            programId={programId}
            shopId={shopId}
            value={data}
            onChange={handleChange}
          />
        </Div>

      </Box>
      <br />
      <br />
    </Div >

  );
}
