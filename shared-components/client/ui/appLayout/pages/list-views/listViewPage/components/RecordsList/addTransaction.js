import React from 'react'
import { Formik, Form } from 'formik'
import Div from '../../../../../../@jumbo/shared/Div';
import { Button, Typography, TextField, IconButton, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { PaymentServices } from '../../../../../../graphql/services/payment-services/paymentServices';
import useAuth from '../../../../../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';

const institutesList = gql`
  query defaultShops($query: String) {
    defaultShops(query: $query) {
        _id
        name
    }
  }
`
export default function AddTransaction({ onClose, setRecordsListRefresh }) {
    const [institute, setInstitute] = useState({})
    const [date, setDate] = React.useState(new Date())
    const [amount, setAmount] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const { loading, data: institutesData, refetch } = useQuery(institutesList);
    const { viewer } = useAuth()
    const accountId = viewer?._id
    const [currencyCode, setCurrencyCode] = useState('');

    const handleInstitutesChange = (event) => {
        setInstitute(event.target.value);
        console.log(event)

    }


    const handleAmountChange = (event) => {
        setAmount(event.target.value)
    }
    const handleTransactionIdChange = (event) => {
        setTransactionId(event.target.value)
    }

    const onDateChange = (event) => {

        setDate(event)
    }


    const handleCurrencyCodeChange = (event) => {
        setCurrencyCode(event.target.value);
    };
    const addTransaction = async () => {
        try {
            const data = await PaymentServices.transactionsList(accountId, institute, amount, date, transactionId, currencyCode)
            toast.success('Transaction added Successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                onClose();
            }, "1000");
        }
        catch (err) {
            toast.error('Transaction adding failed', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        }
        setRecordsListRefresh(true)
    }
    return (
        <div>
            <Formik
            >{({ }) => (
                <Form>

                    <Div sx={{ borderColor: "rgb(211, 215, 236)" }}>
                        <Div style={{ borderBottom: '2px solid rgb(211, 215, 236)', display: 'flex', alignItems: 'center', padding: '0px 24px', height: '3.8rem', position: 'relative', gap: '400px' }}>
                            <Typography variant='h5' style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", fontSize: '18px' }}>Add Transactions</Typography>
                            <IconButton
                                edge="end"
                                onClick={onClose}
                                aria-label="close"
                                sx={{
                                    marginLeft: '80px',
                                    marginTop: '-20px'
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Div>
                        <Div sx={{ display: 'flex' }}>
                            <Div sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', gap: '7px', width: '50%', marginTop: '7px', marginBottom: '10px' }}>
                                <Typography style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", display: 'block', padding: '10px', fontSize: '16px', marginBottom: '10px' }}> Date </Typography>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label="Date desktop"
                                            inputFormat="MM/dd/yyyy"
                                            value={date}
                                            onChange={(event, newValue) => onDateChange(event, newValue)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Div>
                            &nbsp; &nbsp;&nbsp;

                            <Div sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', gap: '7px', width: '50%', marginTop: '7px', marginBottom: '10px' }}>
                                <Typography style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", display: 'block', padding: '10px', fontSize: '16px', marginBottom: '10px' }}> Institute </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={institute}
                                        //label="Age"
                                        onChange={handleInstitutesChange}
                                        placeholder='Institutes'
                                    >
                                        {institutesData
                                            ? institutesData.defaultShops.map((option) => (
                                                <MenuItem key={option.id} value={option._id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))
                                            : null
                                        }
                                    </Select>
                                </FormControl>
                            </Div>
                        </Div>
                        <Div sx={{ display: 'flex' }}>
                            <Div sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', gap: '7px', width: '50%', marginTop: '7px', marginBottom: '10px' }}>
                                <Typography style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", display: 'block', padding: '10px', fontSize: '16px', marginBottom: '10px' }}>Transaction ID</Typography>
                                <TextField id="outlined-basic" placeholder="Ex: 123456789" variant="outlined" value={transactionId}
                                    onChange={handleTransactionIdChange}
                                />
                            </Div>
                            &nbsp; &nbsp;&nbsp;

                            <Div sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', gap: '7px', width: '50%', marginTop: '7px', marginBottom: '10px' }}>
                                <Typography style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", display: 'block', padding: '10px', fontSize: '16px', marginBottom: '10px' }}> Amount  </Typography>
                                <TextField id="outlined-basic" placeholder="Ex: 10,000" variant="outlined" value={amount} type='number'
                                    onChange={handleAmountChange}
                                />
                                <FormControl variant="outlined">
                                    <InputLabel id="currency-code-label">Currency Code</InputLabel>
                                    <Select
                                        labelId="currency-code-label"
                                        id="currency-code"
                                        value={currencyCode}
                                        onChange={handleCurrencyCodeChange}
                                        label="Currency"
                                    >
                                        <MenuItem value="USD">USD</MenuItem>
                                        <MenuItem value="EUR">EUR</MenuItem>
                                        <MenuItem value="INR">INR</MenuItem>
                                    </Select>
                                </FormControl>
                            </Div>
                        </Div>
                        <Div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            width: '100%',
                            gap: '10px',
                            height: '3.8rem',
                            marginTop: '30px'
                        }}>
                            <Button style={{ color: '#50C2C9', fontWeight: 'bold' }} onClick={onClose}>Cancel</Button>
                            <Button
                                variant='contained'
                                style={{
                                    borderRadius: '10px',
                                }}
                                onClick={addTransaction}
                                disabled={
                                    !date ||
                                    date === '' ||
                                    !transactionId ||
                                    transactionId === '' ||
                                    !institute ||
                                    amount === ""
                                }
                            >
                                Create Transaction
                            </Button>


                        </Div>
                    </Div>
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
                </Form>
            )}
            </Formik>

        </div>
    )
}
