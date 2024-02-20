import React from 'react'
import { Formik, Form } from 'formik'
import { Button, Typography, TextField, IconButton,} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'; 
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Div from '../../../../../../@jumbo/shared/Div/Div';
import AccountsService from '../../../../../../graphql/services/accounts/accounts-service';
import useCurrentShopId from '../../../../../../hooks/useCurrentShopId';
export default function InviteStudent({ onClose, record, groupId, setIsDialogOpen,setRecordsListRefresh }) {
    const [email, setEmail] = useState('');
    const [emailsList, setEmailsList] = useState([{ email: "" }]);
    const { shopId } = useCurrentShopId();
    const [error, setError] = useState('');
    const [inviteDisabled, setInviteDisabled] = useState(true);
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const showSuccessAlert = () => {
    
        swal({
          title: "Success",
          text:"Student Invited Successfully",
          icon: "success", 
          button: 'OK',

        })
      };


    const studentGroupId = record?.id || groupId
    const role = "Student"
    const handleInputChange = (e, index) => {
        const { value } = e.target;
        const updatedList = [...emailsList];
        updatedList[index].email = value;
        setEmailsList(updatedList);
        const lastEmail = updatedList[updatedList.length - 1].email;
        setInviteDisabled(!isValidEmail(lastEmail));

    };
    /*  const checkInviteDisabled = (list) => {
         setInviteDisabled(list.length === 0 || list.some(item => !isValidEmail(item.email)));
     };*/
     const isValidEmail = (email) => {
         // Simple email validation using a regular expression
         const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
         return emailPattern.test(email);
       }; 

    const handleAddClick = () => {
        setEmailsList([...emailsList, { email: "" }]);
    };


    const handleInvite = async () => {

        let propdata = []
        for (let i = 0; i < emailsList.length; i++) {
            propdata.push({
                email: emailsList[i].email,
                studentGroupId: studentGroupId,
                role: role
            })
        }
        const inputData = { studentData: propdata, shopId: shopId }
        const data = await AccountsService.inviteStudents(inputData)
        onClose()
        //setIsDialogOpen(true)
        //setOpen(true)
        showSuccessAlert();
        setRecordsListRefresh(true)
    }

    const handleRemoveClick = index => {
        const list = [...emailsList];
        list.splice(index, 1);
        setEmailsList(list);
    };
   
    return (
        <Formik
        >{({ }) => (
            <Form>
            {/*     <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Student invited Successfully
                    </Alert>
                </Snackbar> */}

                <Div sx={{ borderColor: "rgb(211, 215, 236)" }}>
                    
                    <Div style={{ borderBottom: '2px solid rgb(211, 215, 236)', display: 'flex', alignItems: 'center', padding: '0px 24px', height: '3.8rem', position: 'relative', gap: '465px', marginBottom: '10px' }}>
                        <Typography variant='h5' style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", fontSize:'18px'}}>Invite Student</Typography>
                        <IconButton
                            edge="end"
                            onClick={onClose}
                            aria-label="close"
                            sx={{
                                marginLeft:'100px'
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Div>
                    {/* <JumboScrollbar
                        autoHide
                        autoHideDuration={200}
                        autoHideTimeout={500}
                        autoHeightMin={1000}
                    > */}
                    <p style={{fontWeight:'350px',marginLeft:'15px'}}>Invite students to join in this group by entering their email addresses below.</p>
                      {emailsList.map((x, i) => (
                        <Div sx={{ display: 'flex', margin: 'auto', gap: '7px', width: '70%', marginTop: '15px', marginBottom: '50px' }}>
                            <TextField id="outlined-basic" label="Email" variant="outlined" style={{marginTop:'30px'}} value={x.email} fullWidth
                                onChange={e => handleInputChange(e, i)}
                            />
                            {emailsList.length !== 1 && <Button
                                onClick={() => handleRemoveClick(i)}  ><DeleteOutlineIcon /></Button>}

                        </Div>
                    ))}
                    <Button variant="text" onClick={handleAddClick} sx={{ marginLeft: '15px' }}>+ Add another Email</Button>
                    <Div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        width: '100%',
                        gap: '10px',
                        borderTop: '2px solid rgb(211, 215, 236)',
                        height: '3.8rem'
                    }}>
                        <Button style={{ color: '#50C2C9', fontWeight: 'bold',marginTop:'30px' }} onClick={onClose}>Cancel</Button>
                        <Button
                            variant='contained'
                            style={{
                                borderRadius: '10px',
                                marginTop:'30px'
                            }}
                            disabled={inviteDisabled}
                            onClick={handleInvite}
                        >Invite</Button>
                    </Div>
                </Div>
            </Form>
        )}
        </Formik>
    )
}
