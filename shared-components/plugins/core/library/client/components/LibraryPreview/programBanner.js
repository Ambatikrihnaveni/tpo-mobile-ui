import React, { useState } from 'react'
import Div from "@jumbo/shared/Div";
import {  ListItemIcon, Typography, Avatar,Box, Button, } from "@mui/material";
import { Meteor } from "meteor/meteor";
import { ToastContainer, toast } from 'react-toastify';
import './programBanner.css';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton } from '@mui/material';;
import styled from "@emotion/styled";
import { useQuery } from "@apollo/react-hooks";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import TabContext from '@mui/lab/TabContext';
import { useMutation } from "@apollo/react-hooks";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useAuth from '../../../../../../client/ui/hooks/useAuth';
import { useNavigate } from 'react-router';
import gql from 'graphql-tag';
import importProgramMutation from '../../../../../../client/ui/graphql/services/programs/mutations/importPrograms';
import Adds from './adds';


const programsQuery = gql`
query programs($shopId:ID!, $type:String) {
  programs(shopId:$shopId, type:$type){
    _id
    type
    name
    createdAt
    createdBy
   
  }
}
`;


const { filesBaseUrl } = Meteor.settings.public;

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: 24,
    height: 48,
    width: 48,
    borderRadius: '50%',
    minWidth: 42,
    marginRight: 16,
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    border: `solid 1px ${theme.palette.divider}`
}))

export default function programBanner({ data, handleClose }) {
    let imageSrc = data?.programMedia[0]?.URLs?.large;
    if (imageSrc === String(null)) return null;

    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    } else {
        imageSrc = "";
    }

    const shopId = localStorage.getItem('accounts:shopId')

    const [value, setValue] = React.useState('1');
    const [programsdata, setProgramsdata] = React.useState([]);
    const [filteredPrograms, setFilteredPrograms] = useState([]);
    const { viewer } = useAuth();
    const { loading, error, data: programs, refetch } = useQuery(programsQuery, {
        variables: {
            type: '',
            shopId,
        }
    });

    const navigate = useNavigate();
    const [importProgram, { error: importProgramError }] = useMutation(importProgramMutation);
    const [user, setUser] = React.useState(viewer);
    const [programsId, setProgramsId] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    React.useEffect(() => {
        if (programs) {
            const filteredIds = []
            for (let i = 0; i < programs.programs?.length; i++) {
                filteredIds.push(programs.programs[i]._id)
            }
            setFilteredPrograms(filteredIds);
        }
    }, []);


    const onImport = async () => {

        setIsButtonDisabled(true);
        const programIDs = [];
        programIDs.push(data._id)
        setProgramsId(programIDs);
        try {
            const { data } = await importProgram({ variables: { input: { shopId: shopId, programIds: programIDs } } })
            onClose()
            toast.success(data, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            toast.error(error.graphQLErrors[0].message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });


        }
    }
    const currencySymbols = {
        USD: '$',
        EUR: '€',
        INR: '₹',
    };


    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("xs"));


    return (
        <Div>

            {(viewer?.role === "Admin" || viewer?.role === "Master-Admin") &&
                <Div style={{
                    background: imageSrc ? `url(${imageSrc})` : 'black',
                    height: isXs ? '0' : '320px',
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
            }
            {viewer?.role === "College-Admin" &&
                <Div style={{
                    background: imageSrc ? `url(${imageSrc})` : 'black',
                    height: isXs ? '0' : '320px',
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
            }
            {
                viewer?.role === "Student" &&
                <Div style={{
                    background: imageSrc ? `url(${imageSrc})` : 'black',
                    height: isXs ? '0' : '320px',
                    height: '220px',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: "cover",
                    marginTop: "-17px",
                    width: "100vw",
                    maxWidth: "100%",
                    borderRadius: '10px',
                }}>

                    <Div style={{ color: 'white', p: 2, alignSelf: 'flex-end', textAlign: 'end' }}>
                        <IconButton
                            onClick={handleClose}
                            aria-label="close"
                            sx={{ color: "#04bfa0", mr: 9, mt: 2 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Div>
                </Div>
            }



            <JumboCardQuick sx={{ marginTop: '-110px', borderRadius: "1px" }}>
                <Grid container spacing={3} >
                    <Grid item sx={12} sm={8}>
                        <Grid container spacing={2} >

                            <Grid container >
                                <Grid item xs={4} sm={2}>
                                    {imageSrc ? (
                                        <Avatar
                                            alt={''}
                                            src={imageSrc}
                                            sx={{ width: 80, height: 80, mb: 2 }}
                                        ></Avatar>
                                    ) : (
                                        <Box
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                mb: 2,
                                                backgroundColor: 'black',
                                            }}
                                        ></Box>
                                    )}
                                </Grid>




                                <Grid item xs={8} md={6}>
                                    <Typography style={{
                                        fontSize: '35px',
                                        lineHeight: '35px',
                                        fontWeight: '900',
                                        color: '#333',
                                        marginTop: "18px",
                                        textAlign: 'left'

                                    }}>{data?.name}</Typography>
                                </Grid>

                                <Grid item xs={10} sm={4} sx={{ textAlign: 'end', alignSelf: 'flex-end', marginTop: { xs: '-30px', sm: '-60px' }, pr: 2 }}>
                                    {user.role == "Student" &&

                                        <Button autoFocus variant='contained' onClick={onImport} style={{ textAlign: 'end', backgroundColor: "#f57e07", marginBottom: "22px", textTransform: 'none', padding: "5px", fontSize: "20px" }} disabled={filteredPrograms?.includes(data?._id)} >
                                            Import Now
                                        </Button>
                                    }
                                    {user.role == "College-Admin" &&
                                        <Button autoFocus variant='contained' onClick={onImport} style={{ textAlign: 'end', backgroundColor: "#f57e07", marginBottom: "22px", textTransform: 'none', padding: "5px", fontSize: "20px" }} disabled={filteredPrograms?.includes(data?._id)} >
                                            Import Now
                                        </Button>

                                    }

                                </Grid>

                            </Grid>

                        </Grid>

                        <TabContext>

                            <Div style={{ display: "flex" }}>
                                <Typography
                                    style={{
                                        marginBottom: '2px',
                                        fontSize: '22px',
                                        lineHeight: '24px',
                                        fontWeight: '400',
                                        color: '#2E475D',
                                        width: '40%',
                                        textAlign: 'left'
                                    }}
                                >
                                    Duration
                                </Typography>
                                <Typography sx={{ color: '#1b2733', fontSize: '18px', lineHeight: '24px', textAlign: 'left' }}>{data?.duration}</Typography>
                            </Div>


                            <Div style={{ display: "flex" }}>
                                <Typography
                                    style={{
                                        marginBottom: '2px',
                                        fontSize: '22px',
                                        lineHeight: '24px',
                                        fontWeight: '400',
                                        color: '#2E475D',
                                        width: '40%',
                                        textAlign: 'left'
                                    }}
                                >
                                    Program Available
                                </Typography>
                                <Typography sx={{ color: '#1b2733', fontSize: '18px', lineHeight: '24px', textAlign: 'left' }}>{data?.modes?.join(', ')}</Typography>
                            </Div>

                            <Div style={{ display: "flex" }}>
                                <Typography
                                    style={{
                                        marginBottom: '2px',
                                        fontSize: '22px',
                                        lineHeight: '24px',
                                        fontWeight: '400',
                                        color: '#2E475D',
                                        width: '40%',
                                        textAlign: 'left'
                                    }}
                                >
                                    Price
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#1b2733',
                                        fontSize: '22px',
                                        lineHeight: '24px',
                                        textAlign: 'left',
                                    }}
                                >
                                    {data?.price === '0' ? 'Free' : `${currencySymbols[data?.priceType]} ${data?.price}`}
                                </Typography>

                            </Div>


                            <Div style={{ display: "flex" }}>
                                <Typography
                                    style={{
                                        marginBottom: '2px',
                                        fontSize: '22px',
                                        lineHeight: '24px',
                                        fontWeight: '400',
                                        color: '#2E475D',
                                        width: '40%',
                                        textAlign: 'left'
                                    }}
                                >
                                    Author
                                </Typography>
                                <Typography sx={{ color: '#1b2733', fontSize: '18px', lineHeight: '24px', textAlign: 'left' }} ><a href='#'>{data?.account?.name}</a></Typography>
                            </Div>

                        </TabContext>
                    </Grid>
                    <Grid item sm={4} sx={{ display: { xs: 'none', md: 'block' }, background: "#edf5f4" }}>
                        <Div sx={{ marginLeft: { md: '10%' } }}>
                            <Adds />
                        </Div>
                    </Grid>
                </Grid>
            </JumboCardQuick>
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
