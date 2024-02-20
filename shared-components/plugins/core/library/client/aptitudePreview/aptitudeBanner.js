import React from 'react'
import Div from "@jumbo/shared/Div";
import { ToastContainer } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AptitudeAdds from './aptitudeAdds';

export default function AptitudeBanner({ handleClose }) {

    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <Div>
            <Div style={{
                backgroundImage: "url('https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/03/22210204/Quantitative-Aptitude.jpg')",
                height: '220px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: "cover",
                width: "100vw",
                maxWidth: "100%",
                borderRadius: '10px',
            }}>

                <Div style={{ color: 'white', p: 2, alignSelf: 'flex-end', textAlign: 'end' }}>
                    <IconButton
                        onClick={handleClose}
                        aria-label="close"
                        sx={{ color: "#04bfa0", mr: 9 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Div>
            </Div>
            <Grid item sm={4} sx={{ display: { xs: 'none', md: 'block' }, background: "#edf5f4" }}>
                <Div sx={{ marginLeft: { md: '10%' } }}>
                    <AptitudeAdds />
                </Div>
            </Grid>
            <ToastContainer
                position="top-right"
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
        </Div >
    )
}
