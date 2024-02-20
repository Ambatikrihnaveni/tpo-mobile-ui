import React, { useState } from 'react';
import Div from '../../../../../client/ui/@jumbo/shared/Div/Div';
import {
    Typography,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    TextField,
    Grid,
    Box,
    InputAdornment,
    Radio,
    RadioGroup,
    FormControlLabel,
} from '@mui/material';

export default function Pricing({
    currency,
    price,
    handleCurrencyChange,
    handlePriceChange,
}) {
    const currencySymbols = {
        EUR: '€', // Euro symbol
        INR: '₹', // Indian Rupee symbol
        USD: '$', // Dollar symbol
    };

    const [pricingType, setPricingType] = useState(price === '0' ? 'Free' : 'Paid');

    const currencySymbol = currencySymbols[currency] || '';

    const handlePricingTypeChange = (event) => {
        setPricingType(event.target.value);
        // Set the price to 0 when switching to Free
        if (event.target.value === 'Free') {
            handlePriceChange("0");
        }
    };

    return (
        <Div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
            <Box>
                <Typography
                    variant='h3'
                    style={{
                        color: 'black',
                        fontSize: '25px',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        padding: '1px 5px',
                    }}
                >
                    Pricing
                </Typography>

                <Typography
                    style={{
                        fontSize: '14px',
                        color: '#8595A6',
                        textTransform: 'none',
                        fontWeight: '350',
                        marginBottom: '10px',
                    }}
                >
                    Choose currency and enter the price of the program
                </Typography>

                <RadioGroup
                    row
                    aria-label='pricing-type'
                    name='pricing-type'
                    value={pricingType}
                    onChange={handlePricingTypeChange}
                >
                    <FormControlLabel value='Free' control={<Radio />} label='Free' />
                    <FormControlLabel value='Paid' control={<Radio />} label='Paid' />
                </RadioGroup>

                {pricingType === 'Paid' && (
                    <Grid container spacing={2}>
                        <Grid item xs={3} style={{ height: '100px' }}>
                            <FormControl fullWidth>
                                <InputLabel id={`demo-simple1-select-label`}>Currency</InputLabel>
                                <Select
                                    labelId={`demo-simple1-select-label`}
                                    id={`demo-simple1-select-`}
                                    name='type'
                                    label='Currency'
                                    size='small'
                                    value={currency}
                                    onChange={handleCurrencyChange}
                                >
                                    <MenuItem value='EUR'>EUR</MenuItem>
                                    <MenuItem value='INR'>INR</MenuItem>
                                    <MenuItem value='USD'>USD</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id='outlined-basic'
                                label='Price'
                                variant='outlined'
                                fullWidth
                                value={price}
                                size='small'
                                type='number'
                                onChange={handlePriceChange}
                                placeholder='Ex: 30,000'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>{currencySymbol}</InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Div>
    );
}
