import React from 'react';
import Div from "@jumbo/shared/Div";
import TextField from "@mui/material/TextField";

const FullWidthTextFields = () => {
    return (
        <Div
            sx={{
                width: 500,
                maxWidth: '100%',
            }}
        >
            <TextField />
        </Div>
    );
};

export default FullWidthTextFields; 