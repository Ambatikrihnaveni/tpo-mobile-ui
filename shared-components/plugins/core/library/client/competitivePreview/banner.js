import React from 'react'
import Div from "@jumbo/shared/Div";
import { ToastContainer } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import CompetitiveAdds from './competitiveAdds';

export default function Banner({ handleClose }) {

    const theme = useTheme();

    return (
        <Div>
            <Div style={{
                backgroundImage: "url('https://contentstatic.techgig.com/photo/83783212/a-career-guide-for-java-full-stack-developer.jpg?142209')",
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
                    <CompetitiveAdds />
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
