import React from 'react'
import { Typography, IconButton, AppBar, Toolbar } from '@mui/material'
import Div from '@jumbo/shared/Div'
import CloseIcon from '@mui/icons-material/Close';
import 'react-toastify/dist/ReactToastify.css';
import ProgramViewLayout from './programViewLayout';


export default function ProgramView({ onClose, data }) {

    const shopId = localStorage.getItem('accounts:shopId')

    return (
        <Div>
            <AppBar sx={{ position: 'fixed', bgcolor: "background.paper" }}>
                <Toolbar>

                    <Typography sx={{ flex: 1, paddingTop: '5px', color: '#08d1c4', marginLeft: "20px", fontWeight: 'bold' }} variant="h3" component="div">
                        {data?.name ? data?.name : data?.title}
                    </Typography>

                    <IconButton
                        startIcon="end"
                        onClick={onClose}
                        aria-label="close"
                        sx={{ ml: { md: 3 } }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Div sx={{ marginTop: '5%' }}>
                <ProgramViewLayout data={data} />
            </Div>

        </Div>
    )
}
