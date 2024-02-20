import React from 'react'
import { Typography, IconButton, AppBar, Toolbar, Divider } from '@mui/material'
import Div from '@jumbo/shared/Div'
import 'react-toastify/dist/ReactToastify.css';
import ProgramListViewLayout from './ProgramListViewLayout';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function ProgramListView({ onClose, data }) {

    const shopId = localStorage.getItem('accounts:shopId')

    return (
        <Div>
            <AppBar sx={{ position: 'fixed', bgcolor: "background.paper" }}>
                <Toolbar>

                    <IconButton
                        startIcon="start"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <KeyboardBackspaceIcon />
                    </IconButton>
                    <Divider orientation="vertical" style={{ height: '30px', fontWeight: 'bold', marginLeft: '5px' }} />
                    <Typography sx={{ flex: 1, paddingTop: '5px', color: '#08d1c4', marginLeft: "20px", fontWeight: 'bold' }} variant="h3" component="div">
                        {data?.name}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Div sx={{ marginTop: '4%' }}>
                <ProgramListViewLayout data={data} />
            </Div>

        </Div>
    )
}
