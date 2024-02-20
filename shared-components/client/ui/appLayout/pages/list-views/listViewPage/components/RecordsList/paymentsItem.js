import React from 'react';
import {
    ListItemText,
    Card,
    CardContent,
    Tooltip,
    Typography,
    Stack
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import { useTheme } from '@mui/material/styles';
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { CollegeAdmin } from '../../../../../../graphql/services/college-admin/collegeAdmin-services';
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import useAuth from '../../../../../../hooks/useAuth';

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));
const { filesBaseUrl } = Meteor.settings.public;

const PaymentsItem = ({ record, view, item, recordType }) => {
    const navigate = useNavigate();
    const { viewer } = useAuth()
    const groupId = record?.id;
    let thumbnailImage = (record?.userMedia) ? record?.userMedia[0]?.URLs?.thumbnail : '';
    if (thumbnailImage) {
        thumbnailImage = `${filesBaseUrl}${thumbnailImage}`;
    }
    const deleteRecordMutation = useMutation(CollegeAdmin.deleteStudentGroup, {
        onSuccess: () => {
            hideDialogAndRefreshRecordsList();
        }
    });
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const currencySymbols = {
        INR: '₹',  // Rupee symbol
        USD: '$',
        EUR: '€',
        GBP: '£',
        // Add more currency codes and symbols as needed
    };

    const viewProfile = (id) => {
        navigate(`/${id}/viewprofile`)
    }
    const string = record.groupName
    const truncateString = (str = '', maxLength = 50) => str?.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const truncateName = truncateString(string, 25);

    const program = record.programName
    const truncaProgram = (str = '', maxLength = 50) => str?.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const truncaProgramName = truncaProgram(program, 25);


    if (view === "grid") {
        return (
            <JumboGridItem xs={12} sm={6} md={4} lg={3} >

                <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)', }}>
                    <CardContent sx={{
                        pt: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                    }}>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <Typography variant='body1' sx={{ fontWeight: 'bold' }}> Date :</Typography>
                            <Typography variant='body1' sx={{ ml: 1 }}>{record.date} </Typography>
                        </div>
                        <Tooltip title={record?.programName}>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>ProgramName :</Typography>
                                <Typography variant='body1'>{truncaProgramName}</Typography>
                            </div>
                        </Tooltip>
                        <Tooltip title={record?.groupName} >
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>GroupName:</Typography>
                                <Typography variant='body1'>{truncateName}</Typography>
                            </div>
                        </Tooltip>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Admission :</Typography>
                            <Typography variant='body1' sx={{ ml: 1 }}> {record.batchName}</Typography>
                        </div>

                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <Typography variant='body1' sx={{ fontWeight: 'bold' }} > No.of Students : </Typography>
                            {
                                viewer?.role === "Student" ? (<Typography variant={"body1"}
                                sx={{ml:1}}
                                >{record?.studentData}
                                </Typography>) : (
                                    <Typography variant={"body1"}
                                    sx={{ml:1}}
                                    >{record?.studentData}
                                    </Typography>
                                )
                            }
                        </div>

                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <Typography variant='body1' sx={{fontWeight:'bold'}}> Amount : </Typography>
                            {
                                viewer?.role === "Student" ? (
                                <Item >  
                                    <Typography sx={{display:'flex'}}>
                                    <Typography variant={"body1"}
                                    >  {currencySymbols[record?.currencyCode]}{' '}{record.price}
                                    </Typography>
                                     {record?.manualPayment == true && (
                                        <Typography fontSize={"12px"} variant={"body1"} color={"primary"} sx={{ml:1}} >
                                            Cash Payment
                                        </Typography> 
                                    )}   

                                    </Typography>
                                </Item> ) : (
                                    <Item>
                                        <Typography sx={{display:"flex"}}>
                                        <Typography variant={"body1"}
                                            sx={{ml:1 }}

                                        >  {currencySymbols[record?.currencyCode]}{' '}{record.price}
                                        </Typography>
                                        {record?.manualPayment == true && (
                                            <Typography fontSize={"14px"} variant={"body1"} color={"primary"} sx={{ml:1}}>
                                                Cash Payment
                                            </Typography> 
                                        )}
                                        </Typography>
                                    </Item>
                                )
                            }
                        </div>
                        <div style={{display:'flex',marginTop:'10px'}}>
                        {(viewer?.role === "College-Admin" || viewer?.role === "Student" || recordType === "payments") ? (null):(
                         <Typography variant='body1' sx={{fontWeight:'bold'}}> Status : </Typography>

                        )}

                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '20%' },
                                    display: { xs: 'none', md: 'block' },
                                    marginRight: '15px'

                                }}
                            >
                                {(viewer?.role === "College-Admin" || viewer?.role === "Student") ? (
                                    null
                                ) : (
                                    <Typography
                                        variant={"body1"}
                                        sx={{
                                            color: 'white',
                                            backgroundColor: "#28a745",
                                            fontSize: '14px',
                                            padding: "4px 14px",
                                            borderRadius: "8px",
                                            width: '70px',
                                            display: viewer?.role === "Admin" && recordType === "payments" ? 'none' : 'block',

                                        }}
                                    >
                                        Paid
                                    </Typography>
                                )}
                            </Item>
                             
                        </div>

                    </CardContent>
                </Card>
            </JumboGridItem>
        )
    }




    return (
        <JumboListItem
            componentElement={"div"}
            itemData={record}
            secondaryAction={
                <DownloadIcon />
            }


            sx={{
                cursor: 'pointer',
                borderTop: 1,
                borderColor: 'divider',
                '&:hover': {
                    bgcolor: 'action.hover',
                }
            }}
        >


            <ListItemText


                // onClick={showtutorDetail}
                primary={
                    <Typography variant={"body1"} component={"div"}>
                        <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0, textAlign: 'center' }}>
                            <Item
                                sx={{
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                <Typography variant={"body1"} noWrap

                                >{record.date}</Typography>
                            </Item>
                            {viewer?.role == "Master-Admin" && (
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap

                                    >{record.trainingPartner}</Typography>
                                </Item>
                            )}

                            <Item
                                sx={{
                                    flexBasis: { xs: '70%', sm: '50%', md: '17%' },
                                    flexShrink: 0, px: 1,
                                }}
                            >

                                <Typography variant={"h5"} mb={.5} sx={{
                                    // ml:6,
                                    ml: viewer?.role == "Student" ? 0 : 4,
                                    textTransform: 'capitalize'
                                }} >{record.programName}</Typography>
                                <Typography fontSize={"12px"} variant={"body1"} color={"primary"} sx={{ "&:hover": { textDecoration: "underline", cursor: 'pointer', }, ml: 4 }}
                                    onClick={() => viewProfile(record.account._id)}
                                >
                                    {record.institute}
                                </Typography>

                            </Item>


                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: (theme) => ({
                                        md: viewer?.role === "College-Admin" ? '28%' : '25%',
                                    }),
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <Typography variant={"body1"}

                                >{record.groupName}
                                </Typography>
                            </Item>

                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },

                                }}

                            >
                                {
                                    viewer?.role === "Student" ? (<Typography variant="body1" sx={{ display: { xs: 'none', md: 'block' }, }}>
                                        {record.batchName}
                                    </Typography>) : (<Typography variant="body1" sx={{ display: { xs: 'none', md: 'block' }, }}>
                                        {record.batchName}
                                    </Typography>)
                                }
                            </Item>
                            <Item
                                sx={{
                                    //textAlign: 'center',
                                    flexBasis: { md: '25%' },

                                }}
                            >
                                {
                                    viewer?.role === "Student" ? (<Typography variant={"body1"}
                                        sx={{ display: { xs: 'none', md: 'block' }, }}
                                    >{record?.studentData}
                                    </Typography>) : (
                                        <Typography variant={"body1"}
                                            sx={{ display: { xs: 'none', md: 'block' }, ml: "13px" }}
                                        >{record?.studentData}
                                        </Typography>
                                    )
                                }
                            </Item>
                            {
                                viewer?.role === "Student" ? (<Item
                                    sx={{
                                        textAlign: 'center',
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"}

                                    >  {currencySymbols[record?.currencyCode]}{' '}{record.price}
                                    </Typography>
                                    {record?.manualPayment == true && (
                                        <Typography fontSize={"12px"} variant={"body1"} color={"primary"} sx={{ "&:hover": { textDecoration: "underline", cursor: 'pointer' } }}>
                                            Cash Payment
                                        </Typography>
                                    )}
                                </Item>) : (
                                    <Item
                                        sx={{
                                            textAlign: 'center',
                                            flexBasis: (theme) => ({
                                                md: viewer?.role === 'College-Admin' ? '2%' : '8%',
                                            }),
                                            display: { xs: 'none', md: 'block' }
                                        }}
                                    >
                                        <Typography variant={"body1"}
                                            sx={{
                                                display: "flex",
                                                ml: (theme) => ({
                                                    md: viewer?.role === 'College-Admin' ? '30px' : '', // Adjust the value as needed
                                                })
                                            }}

                                        >  {currencySymbols[record?.currencyCode]}{' '}{record.price}
                                        </Typography>
                                        {record?.manualPayment == true && (
                                            <Typography fontSize={"12px"} variant={"body1"} color={"primary"} sx={{ "&:hover": { textDecoration: "underline", cursor: 'pointer' } }}>
                                                Cash Payment
                                            </Typography>
                                        )}
                                    </Item>
                                )
                            }

                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '20%' },
                                    display: { xs: 'none', md: 'block' },
                                    marginRight: '15px'

                                }}
                            >
                                {(viewer?.role === "College-Admin" || viewer?.role === "Student") ? (
                                    null
                                ) : (
                                    <Typography
                                        variant={"body1"}
                                        sx={{
                                            color: 'white',
                                            backgroundColor: "#28a745",
                                            fontSize: '14px',
                                            padding: "4px 14px",
                                            borderRadius: "8px",
                                            width: '70px',
                                            display: viewer?.role === "Admin" && recordType === "payments" ? 'none' : 'block',

                                        }}
                                    >
                                        Paid
                                    </Typography>
                                )}
                            </Item>
                        </Stack>
                    </Typography>
                }
            />
        </JumboListItem>
    );
};
/* Todo record, view prop define */
export default PaymentsItem;