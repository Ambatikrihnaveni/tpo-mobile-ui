import React from 'react'
import Div from "@jumbo/shared/Div";
import { Divider, Typography, Grid } from '@mui/material';
import './certificate.css';

export default function CertifiTemp_1({ logo, authority, studentName, trainingpartnerName, programName, startDate, endDate, programType,record }) {
    
    let type = ''
    if (programType) {
        type = programType == "internships" ? "internship" : programType == "courses" ? "course" : "project"
    }
    return (
        <div>
            <Div>
                <Div style={{ textAlign: 'center' }}>
                    <img src={logo ? logo : '/logo192.png'} width='100px' height='50px' />
                </Div>
                <Typography
                    sx={{
                        fontSize: '40px',
                        fontWeight: 'bolder',
                        fontFamily: 'roboto',
                        color: '#43034d',
                        marginTop: '20px',
                        letterSpacing: '2px'
                    }}
                >CERTIFICATE</Typography>
                <Typography
                    sx={{
                        color: '#43034d',
                        letterSpacing: '6px',
                        fontWeight: 'bold',
                        mt: -1,
                        textTransform: 'uppercase'

                    }}>{programType ? ` OF ${type}` : 'OF INTERNSHIP'}</Typography>

                <Typography
                    sx={{ color: '#43034d', mt: 2, fontWeight: '16px' }}
                >
                    {programType ? ` This ${type} program certificate is proudly awarded to` : 'This internship program certificate is proudly awarded to'}
                </Typography> 
            </Div>
            <Div sx={{ mt: 4 }}>
                <p
                    style={{
                        fontSize: '25px',
                        color: '#43034d',
                        textAlign: 'center',
                        fontFamily: 'Pinyon Script',
                        filter: (record?.isCourseComplete==false) ?'blur(5px)':'',
                        webkitFilter: (record?.isCourseComplete==false) ?'blur(5px)':'',

                    }}
                > {studentName ? studentName : 'Student Name'}</p>
                <Divider sx={{ backgroundColor: '#43034d', height: '4px', width: '75%', margin: 'auto' }} />
                <Div sx={{ mt: 2 }}>
                    {programType ? <Typography sx={{ color: '#43034d', width: '80%', margin: 'auto' }}>
                        For outstanding completion of {type == "internship" ? 'internship program in' : ''} <b>{(programName) ? programName : "[Program Name]"}</b>  {type == "project" ? "project at " : 'course at '}<b>{trainingpartnerName ? trainingpartnerName : '[Training Partner]'}</b>. 
                        {(record?.program?.price=="0") ?
                        <>  duration of <b>{record?.program?.duration}</b></> :
                        <> from <b>{startDate ? startDate : '[Start date]'}</b> to <b>{endDate ? endDate : '[End Date]'}</b></>
                    }
                    </Typography> : <Typography sx={{ color: '#0e1857', width: '90%', margin: 'auto' }}>
                        For outstanding completion of internship program in <b>{(programName) ? programName : "[Program Name]"}</b> course at <b>{trainingpartnerName ? trainingpartnerName : '[Training Partner]'}  </b>.
                        {(record?.program?.price=="0") ?
                        <>  duration of <b>{record?.program?.duration}</b></> :
                        <> from <b>{startDate ? startDate : '[Start date]'}</b> to <b>{endDate ? endDate : '[End Date]'}</b></>
                    }
                       
                    </Typography>}
                </Div>
                <Grid container spacing={5} sx={{ marginTop: "50px", width: '80%', margin: 'auto' }}>
                    {(authority) ?
                        <>
                            {authority?.map((data, i) => (
                                <Grid item sx={{ margin: 'auto' }} key={i}>
                                    {data?.sign ? <img src={data.sign} width='100px' height='40px' /> :
                                        <Divider sx={{ backgroundColor: '#43034d', width: '60%', margin: 'auto', height: '2px' }} />
                                    }

                                    <Typography sx={{ color: '#43034d' }}>{data?.name}</Typography>
                                    <Typography sx={{ fontSize: '12px', textAlign: 'center', color: '#43034d' }}>{(data?.designation) ? data?.designation : 'Director'}</Typography>
                                </Grid>
                            ))}
                        </> :
                        <>
                            <Grid item xs={6} sx={{ margin: 'auto' }}>

                                <Divider sx={{ backgroundColor: '#43034d', width: '60%', margin: 'auto', height: '2px' }} />

                                <Typography sx={{ mt: 1, color: '#43034d', }}>[Director Name]</Typography>
                                <Typography sx={{ fontSize: '12px', color: '#43034d' }}>Director</Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ margin: 'auto' }}>

                                <Divider sx={{ backgroundColor: '#43034d', width: '60%', margin: 'auto', height: '2px' }} />

                                <Typography sx={{ mt: 1, color: '#43034d', }}>[CEO Name]</Typography>
                                <Typography sx={{ fontSize: '12px', color: '#43034d' }}>CEO</Typography>
                            </Grid>
                        </>
                    }

                  
                </Grid>
                <Div sx={{ textAlign: 'center', mt: 2 }}>
                    <img src={'/logo192.png'} width='100px' height='50px' style={{ padding: '10px 25px' }} />
                    <img src={'/prahanSoft.png'} width='100px' height='50px' style={{ padding: '10px 25px' }} />
                </Div>
            </Div>
        </div>
    )
}
