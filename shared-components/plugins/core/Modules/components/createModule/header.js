import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Div from '../../../../../client/ui/@jumbo/shared/Div';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useProduct from '../../hooks/useProduct';
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import ModulePreview from '../moduleView/modulePreview';

export default function CreateModuleHeader() {
  const { showDialog, hideDialog } = useJumboDialog();
  const { product } = useProduct()
  const navigate = useNavigate();
  const onBackClick = () => {
    navigate("/modules")
  }

  const onPreview = (product) => {
    ;
    showDialog({
      fullScreen: true,
      content: <ModulePreview onClose={hideDialog} module={product} />,
      sx: {
        borderRadius: 0
      }
    })
  }

  return (
    <Div sx={{ background: "white", p: 2 }} >
      <Grid container spacing={2} >
        <Grid item xs={6} lg={6} sx={{ display: "flex" }} >
          <Div sx={{ mr: 2 }}><Button onClick={onBackClick}><ArrowBackIcon /></Button></Div>
          <Typography variant='h3' sx={{ fontStyle: "bold" }}>{product?.title ? product.title : "Create Module"}</Typography>
        </Grid>
        <Grid item xs={6} lg={6} sx={{ textAlign: "right" }}>
          <Button sx={{ marginRight: "10px", textTransform: 'none', }} onClick={() => { onPreview(product) }}> <VisibilityIcon sx={{ fontSize: "8px" }} />View module</Button>
        </Grid>
      </Grid>
    </Div>
  )
}
