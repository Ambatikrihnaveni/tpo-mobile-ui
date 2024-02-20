
import React from 'react'
import { Typography, IconButton, AppBar, Toolbar } from '@mui/material'
import Div from '@jumbo/shared/Div'
import CloseIcon from '@mui/icons-material/Close';
import 'react-toastify/dist/ReactToastify.css';
import ModuleViewLayout from './moduleViewLayout';

export default function ModulePreview({ onClose, module }) {
    ;
    const shopId = localStorage.getItem('accounts:shopId')

    return (
        <Div>
            <AppBar sx={{ position: 'fixed', bgcolor: "background.paper" }}>
                <Toolbar>


                    <Typography sx={{ flex: 1, paddingTop: '5px', color: '#08d1c4', marginLeft: "20px", fontWeight: 'bold' }} variant="h3" component="div">
                        {module?.title}
                    </Typography>
                    <IconButton
                        startIcon="end"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Div sx={{ marginTop: '4%' }}>
                <ModuleViewLayout module={module} onClose={onClose} />
            </Div>

        </Div>
    )
}
