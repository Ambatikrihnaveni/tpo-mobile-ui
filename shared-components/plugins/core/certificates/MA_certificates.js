import React, { useState, useCallback } from 'react'
import { Card, Button, Grid, } from '@mui/material'
import Div from '@jumbo/shared/Div';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import ImageViewer from 'react-simple-image-viewer';


const templates=[{template:'/certificateTemplates/temp-1.png',sample:'/certificateTemplates/sample-temp1.png'},
{template:'/certificateTemplates/temp-2.png',sample:'/certificateTemplates/sample-temp2.png'},
{template:'/certificateTemplates/temp-3.png',sample:'/certificateTemplates/sample-temp3.png'},]

export default function MA_Certificates() {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

 

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };


  return (
    <JumboCardQuick
      sx={{ minHeight: '450px' }}
    >
     
      
        <Grid container spacing={2}>
          {templates?.map((data, i) => (
            <Grid item xs={12} sm={6} md={4} sx={{
              width: '90%', ':hover': {
                width: '100%',
              },
            }}>
              <Card key={i} sx={{
                backgroundImage: `url(${data.sample})`,
                backgroundSize: 'cover',
                margin: '10px',
                //  width:'300px',
                height: '300px',
                ':hover': {
                  boxShadow: '3px 5px  8px rgba(0,0,0,0.3)',
                  //  width:'350px',
                  marginBottom: '20px'
                },
                cursor: 'pointer',
                transition: '0.5s',
               // verticalAlign: 'middle',
                p: 2,
              }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === i && (
               
                
                  <Div sx={{textAlign:'center',marginTop:'85px'}}>
                  <Button variant='contained' sx={{
                    textTransform: 'none',
                    margin:'auto'
                   /*  '&:hover': {
                      backgroundColor: 'white',
                      color: '#50C2C9',
                    }, */
                  }} onClick={() => openImageViewer(i)} >View</Button>
                 </Div>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
       
        {isViewerOpen && (
        <ImageViewer
          src={templates?.map((data) => data.sample)}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </JumboCardQuick>
  )
}
