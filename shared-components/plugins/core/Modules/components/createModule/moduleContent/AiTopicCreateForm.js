import React, { useState, useCallback } from 'react';
import {
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  IconButton,
} from '@mui/material';
import { SyncLoader } from "react-spinners";
import PropTypes from 'prop-types';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import Div from '../../../../../../client/ui/@jumbo/shared/Div';
import ModulesService from '../../../../../../client/ui/graphql/services/modules/modules-service';
import { ToastContainer, toast } from 'react-toastify';
import useCurrentShopId from '../../../../../../client/ui/hooks/useCurrentShopId';


export default function AiTopicCreateForm(props) {
  
  const { lesson, onClose, open, lessonId, productId, product } = props;
  const {shopId} = useCurrentShopId()
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonTitle, setButtonTitle] = useState('Generate');
  const [error, setError] = useState(null);


  const handleCancel = () => {
    onClose();
  };

  const onSubmit = useCallback(async () => {
    
    let input ={
      userReq:lesson?.name,
      serviceType:'AiTopicCreation',
      shopId:shopId,
      productId:productId,
      lessonId:lessonId
    }
    setLoading(true);
    setIsSubmitting(true);
    try {
      const data = await ModulesService.createAiService(input)

      handleCancel(); // Assuming handleClose is the function to handle success
      setError(null);
      toast.success('Topic Created Successfully', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    }catch(error) {
      console.log(error);
      setLoading(false);
      setIsSubmitting(false);
      setButtonTitle('Regenerate'); // Display Regenerate button on error
      // setError(error);
    }

}, [onClose, setButtonTitle, setLoading, setIsSubmitting, setError, toast]);




return (
  <Div sx={{ p: 3 }}>
    <Div sx={{ display: loading ? 'block' : 'none', textAlign: 'right' }}>
      <IconButton onClick={handleCancel}>
        <CloseIcon />
      </IconButton>
    </Div>
    <Div sx={{ display: loading ? 'none' : 'block' }}>
      <Grid container>
        <Grid xs={11}>
          <Typography variant={'h5'} fontSize={23} sx={{ fontWeight: 'bold' }}>
            {' '}
            <AutoAwesomeIcon /> AI Topic Create
          </Typography>
        </Grid>
        <Grid xs={1}>
          <IconButton onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Div style={{ marginTop: '20px' }}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              value={lesson?.name}
              placeholder="Enter Lesson Title"
              style={{
                height: '80px',
                borderWidth: 1,
                borderColor: 'lightgray',
                borderRadius: '10px',
                width: '100%',
              }}
            />
          </div>
        </Box>
      </Div>
      <Grid container style={{ marginTop: '20px' }}>
        <Grid xs={4} style={{ display: 'flex' }}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: '10px', textTransform: 'none', fontWeight: 'bold' }}
            disabled={!lesson?.name || loading}
            onClick={onSubmit}
          >
            {buttonTitle}
          </Button>
        </Grid>
      </Grid>
    </Div>
    <Div sx={{ textAlign: 'center' }}>
      <SyncLoader color="#17a69c" loading={loading} aria-label="Loading Spinner" data-testid="loader" />
      {error && <Typography color="error" mt={3}>{error}</Typography>}
      <Typography sx={{ display: loading ? 'block' : 'none', mt: 3 }}>{`We are preparing topics for ${lesson?.name}`}</Typography>
    </Div>
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
  </Div>
);
}

AiTopicCreateForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}


