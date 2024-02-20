import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, CardMedia, Grid, Typography, Dialog, Tooltip, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import useCurrentShopId from '../../../../../../../hooks/useCurrentShopId';
import MyProgramService from '../../../../../../../graphql/services/programs/myProgram-services';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import StarIcon from '@mui/icons-material/Star';
import Slide from '@mui/material/Slide';
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import Div from "@jumbo/shared/Div";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import './cards.css';
import { useMutation } from "react-query";
import { Meteor } from "meteor/meteor";
import ProgramPreview from '../../../../../../../../../plugins/core/library/client/components/LibraryPreview/programPreview';
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from '../../../../../../../hooks/useAuth';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';

const { filesBaseUrl } = Meteor.settings.public;


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ProgramCards = (props) => {

    const { showDialog, hideDialog } = useJumboDialog();
    const [buttonText, setButtonText] = useState([]);
    const { shopId } = useCurrentShopId()
    const { viewer } = useAuth()
    const [previewData, setPreviewData] = useState({})
    const [open, setOpen] = React.useState(false)
    const [programData, setProgramData] = useState([])
    const [isHovered, setHover] = useState(-1);
    const [isChecked, setIsChecked] = useState(true);
    const navigate = useNavigate();
    const [userShopId, setUserShopId] = useState('')
    const [deleteProgramId, setDeleteProgramId] = useState('')
    const [confirmDialog, setConfirmDialog] = useState(false)
    const [filteredProgramData, setFilteredProgramData] = useState([]);
    const [filteredPrograms, setFilteredPrograms] = useState([]);
    const [programs, setPrograms] = useState([]);

    React.useEffect(async() => {
        
        if(viewer?.role == "College-Admin") {
            const data = await MyProgramService.collegePrograms(shopId);
            setPrograms(data);
        }else if(viewer?.role == "Student") {
            const data = await MyProgramService.studentEnrollPrograms();
            setPrograms(data);
        }
    },[])
    
    React.useEffect(() => {
        if (programs) {
            const filteredIds = []
            for (let i = 0; i < programs?.length; i++) {
                filteredIds.push(programs[i]._id)
            }
            setFilteredPrograms(filteredIds);
        }
    }, [props.searchKeywords, programData]);

    useEffect(() => {
        const filtered = programData?.filter((data) => {
            const searchKeywords = props.searchKeywords.toLowerCase();
            const Name = data?.name?.toLowerCase().includes(searchKeywords);
            const Price = data?.price?.toLowerCase().includes(searchKeywords);
            const PriceType = data?.priceType?.toLowerCase().includes(searchKeywords);
            const AccountName = data?.account?.name?.toLowerCase().includes(searchKeywords);
            const Type = data?.type?.toLowerCase().includes(searchKeywords);
            const Status = data?.status?.toLowerCase().includes(searchKeywords);
            const ProgramContent = data?.program_content?.toLowerCase().includes(searchKeywords);

            return (
                Name ||
                Price ||
                PriceType ||
                AccountName ||
                Type ||
                Status ||
                ProgramContent
            );
        });
        setFilteredProgramData(filtered);
    }, [props.searchKeywords, programData]);


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }
    const handleClick = (item) => {

        props.programsData(item)
        if (buttonText.includes(item._id)) {
            setButtonText(buttonText.filter((id) => id !== item._id));
        } else {
            setButtonText([...buttonText, item._id]);
        }
    };

    const viewProfile = (id) => {
        navigate(`/${id}/viewprofile`)
        hideDialog()
    }
    const handleClickOpen = (data) => {

        setPreviewData(data)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(async () => {

        if (viewer?.role == "Admin" || viewer?.role == "Master-Admin") {
            setUserShopId(shopId)
        }
        if (viewer?.role == "Tutor") {
            setUserShopId(viewer?.shopId)
        }
        let type;
        if (shopId) {
            if (props.type === 'internships') {
                type = "internships"
            } else if (props.type === 'courses') {
                type = "courses"
            } else if (props.type === 'projects') {
                type = "projects"
            } else {
                type = null
            }
            const records = await MyProgramService.libraryPrograms(type);

            if (props.type === "internships") {
                setProgramData(records?.data.libraryPrograms.filter(record => record.type == "internships"));
            } else if (props.type === "courses") {
                setProgramData(records?.data.libraryPrograms.filter(record => record.type == "courses"));
            } else if (props.type === "projects") {
                setProgramData(records?.data.libraryPrograms.filter(record => record.type == "projects"));
            } else if (props.type === "mechanical") {
                let data = records?.data.libraryPrograms.filter(record => record.field.includes("Mechanical"));
                setProgramData(data);
            } else if (props.type === "electronics") {
                let data = records?.data.libraryPrograms.filter(record => record.field.includes("Electronics"));
                setProgramData(data);
            } else if (props.type === "it") {
                let data = records?.data.libraryPrograms.filter(record => record.field.includes("IT"));
                setProgramData(data);
            } else if (props.type === "computerScience") {
                let data = records?.data.libraryPrograms.filter(record => record.field.includes("Computer Science"));
                setProgramData(data);
            } else if (props.type === "free") {
                let data = records?.data.libraryPrograms.filter(record => record.price === '0');
                setProgramData(data);
            } else if (props.type === 'paid') {
                let data = records?.data.libraryPrograms.filter(record => record.price != '0');
                setProgramData(data);
            }
            else {
                setProgramData(records?.data.libraryPrograms);
            }
        }
    }, [props.type, confirmDialog]);

    const [isFavorite, setIsFavorite] = useState(true);
    const [inCart, setInCart] = useState(false);


    /* const onPreview=(data)=>{
        showDialog({
            fullScreen: true,
            content: <ProgramPreview onClose={hideDialog} data={data}/>,
            sx: {
                borderRadius:0
              }
        })
    } */

    const truncateName = (str = '', maxLength = 50) => {
        if (str.length > maxLength) {
            return `${str.substring(0, 20)}…`;
        } else {
            return str;
        }
    };
    const deleteRecordMutation = useMutation(MyProgramService.delete, {

        onSuccess: () => {
            hideDialogAndRefreshRecordsList();
        }
    });

    const hideDialogAndRefreshRecordsList = React.useCallback(() => {
        setConfirmDialog(false)
        // setRecordsListRefresh(true);
    }, [confirmDialog]);

    const onDelete = (id) => {
        setDeleteProgramId(id)
        setConfirmDialog(true)

        /*  showDialog({
             variant: 'confirm',
             title: 'Are you sure about deleting this record?',
             content: "You won't be able to recover this record later",
             onYes: () => deleteRecordMutation.mutate(id),
             onNo: hideDialog
         }) */
    }

    const handleDeleteConfirm = () => {
        deleteRecordMutation.mutate(deleteProgramId)
    }

    for(let data of filteredProgramData) {
        /**
         * Divide the Admissions
         * 1. Current Admissions
        */
        let pastAdmissions = [];
        let currentAdmissions = [];
        let futureAdmissions = [];
        let isBatchesExist = data.hasOwnProperty("batches");
    
        if(!isBatchesExist) {
            continue;
        }
        if(data?.batches){
            for(let batch of data?.batches) {
                let enrolementEndDateString = batch.enrolementEndDate;
                let enrolementStartDateString = batch.enrolementStartDate;

                let enrolementEndDate = new Date(enrolementEndDateString);
                let enrolementStartDate = new Date(enrolementStartDateString);

                let enrolementEndDateInMilliSeconds = enrolementEndDate.getTime();
                let acutalEnrolementEndDateInMilliSeconds = enrolementEndDateInMilliSeconds + (23 * 59 * 59 * 1000);

                let enrolementStartDateInMilliSeconds = enrolementStartDate.getTime();

                let today = new Date();
                let todayInMilliSeconds = today.getTime();

                if(todayInMilliSeconds > acutalEnrolementEndDateInMilliSeconds) {
                    pastAdmissions.push(batch)
                }else if(todayInMilliSeconds < enrolementStartDateInMilliSeconds) {
                    futureAdmissions.push(batch)
                }else if(enrolementStartDateInMilliSeconds <= todayInMilliSeconds && todayInMilliSeconds <= acutalEnrolementEndDateInMilliSeconds) {
                    currentAdmissions.push(batch)
                }
            }

            if((currentAdmissions.length > 0) || (futureAdmissions.length > 0)) {
                data.enrollData = (currentAdmissions.length) + (futureAdmissions.length);
            }
        }
    }

    return (
        <>
            <JumboGridItem style={{ display: "flex", flexWrap: "wrap", flexDecoration: "none" }}>
                {filteredProgramData?.map((data, i) => (

                    <Grid key={i} item >

                        <Div style={{
                            width: "325px",
                        }}>
                            <JumboCardQuick noWrapper sx={{ mb: 0, ml: 1, mr: 1, mt: 2 }}
                                onMouseOver={() => setHover(i)}
                                onMouseLeave={() => setHover(-1)}
                                style={{ boxShadow: isHovered !== i ? '' : '4px 2px 6px rgba(0,0,0,0.3)' }}
                            >
                                <div
                                    className="imageContainer"

                                >
                                    <div style={{ backgroundImage: `url(${filesBaseUrl}${data?.programMedia[0]?.URLs?.small})`, backgroundSize: "250px", minHeight: "160px" }}>
                                        {buttonText.includes(data._id) && (
                                            <div className="checkmark">
                                                <span>&#10003;</span>
                                            </div>
                                        )}

                                        <div style={{ backgroundImage: (data?.programMedia[0]?.URLs) ? `url(${filesBaseUrl}${data?.programMedia[0]?.URLs?.small})` : 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw9-0wqWF4qc-4wOpJ9N30XDTEvBSmuVOgcQ&usqp=CAU")', backgroundSize: "cover", minHeight: "160px", verticalAlign: "center", textAlign: "center" }}>
                                            <div style={{ display: `${isHovered == i ? "block" : 'none'}` }}>
                                                <div class="container">
                                                    <div class="round">
                                                        <input type="checkbox" id="checkbox"
                                                            checked={buttonText.includes(data._id)}
                                                            style={{ marginLeft: "7px" }}
                                                            /* onChange={() => { }} style={{ marginLeft: "7px" }} */
                                                            onChange={handleCheckboxChange} />
                                                        <label for="checkbox"></label>
                                                    </div>
                                                </div>
                                                <div className='button'>
                                                    <button className="btn1" onClick={() => { handleClickOpen(data) }} ><b> Preview</b></button>
                                                    {(filteredPrograms.includes(data._id)) ? <Button variant='contained' sx={{ textTransform: 'none' }} disabled className="btn" >Imported</Button> :
                                                        <button onClick={() => handleClick(data)} className="btn" ><b>
                                                            {buttonText.includes(data._id) ? "Unselect" : "Select"}</b></button>}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*  <ButtonGroup
                                    fullWidth
                                    size="large"
                                    variant={"text"}
                                    sx={{
                                        height: 170,
                                        '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                                            border: "none"
                                        }
                                    }}
                                >
                                    <Grid container  >
                                        <Grid>
                                            <Typography variant={"h5"} style={{ fontSize: 'small', color: 'rgb(134, 146, 167)', paddingTop: '8px', paddingLeft: '8px', }}>Content by  </Typography>
                                        </Grid>
                                        <Grid>
                                            <Typography style={{ fontWeight: 'bold', color: 'rgb(0, 186, 255)', fontSize: 'small', paddingLeft: '8px', paddingTop: '6px', }}>TPO.AI</Typography>
                                        </Grid>


                                    </Grid>
                                   

                                    <Tooltip title={ data?.name} >
                                       <Typography style={{ fontSize: '1.25rem', lineHeight: '1.625rem', fontWeight: 600, marginTop: '50px', marginLeft: '-293px' }}>
                                           {(truncateName(data.name)).charAt(0).toUpperCase() +(truncateName(data.name)).slice(1)}
                                       </Typography>
                                    </Tooltip>

                                </ButtonGroup> */}

                                <FaRegEdit onClick={() => props.handleEditClick(data._id)} style={{ float: 'right', marginTop: '-30px', marginRight: '35px', color: '#50C2C9', cursor: 'pointer', fontSize: '18px', display: userShopId == data.shopId ? "block" : 'none' }} />
                                <DeleteOutlineIcon style={{ float: 'right', marginTop: '-30px', cursor: 'pointer', marginRight: '10px', color: '#50C2C9', fontSize: '20px', display: userShopId == data.shopId ? "block" : 'none' }} onClick={() => { onDelete(data._id) }} />
                                <Tooltip title={data?.name}>
                                    <Typography style={{ fontSize: '1.25rem', lineHeight: '1.625rem', fontWeight: 600, marginTop: '10px', marginLeft: '12px', minHeight: 41 }} className="custom-tooltip-title" >
                                        {(truncateName(data.name)).charAt(0).toUpperCase() + (truncateName(data.name)).slice(1)}
                                    </Typography>
                                </Tooltip>
                                <Typography variant={"h5"} sx={{ marginLeft: "10px", textTransform: 'capitalize', cursor: 'pointer' }} onClick={() => viewProfile(data?.account._id)}>Content by <span style={{ fontWeight: 'bold', color: 'blue' }}> {data?.account?.name} </span>
                                </Typography>

                                <Typography
                                    sx={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: "2",
                                        WebkitBoxOrient: "vertical",
                                        marginTop: "15px",
                                        marginLeft: "10px",
                                        marginRight: "5px",
                                        minHeight: 42
                                    }}>
                                    <div dangerouslySetInnerHTML={{ __html: data?.program_content }} />
                                </Typography>


                                <Grid container spacing={2} style={{ marginTop: '17px', padding: "5px" }}>
                                    <Grid item xs={4} >
                                        <Typography variant='h5' style={{ paddingLeft: '5px', marginTop: "-11px", fontSize: '0.875rem', fontWeight: 600 }}> Modules: {data.products.length}</Typography>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Typography variant='h5' style={{ paddingLeft: '5px', marginTop: "-11px", fontSize: '0.875rem', fontWeight: 600, color: '#ffffff', backgroundColor: 'red' }}>{(data?.enrollData) ? 'Enroll Now' : ''}</Typography>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Typography style={{ float: 'right', paddingRight: '10px',marginTop: "-11px", fontWeight: 'bold', color: '#50C2C9' }}>
                                            {data.price === '0' ? 'Free' : `${data.priceType}:${data.price}`}
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </JumboCardQuick>
                        </Div>

                    </Grid>
                ))}
            </JumboGridItem>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <ProgramPreview data={previewData} handleClose={handleClose} />
            </Dialog>
            <Dialog
                open={confirmDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure about deleting this record?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You won't be able to recover this record later
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleDeleteConfirm}>Yes</Button>
                    <Button variant='contained' onClick={() => setConfirmDialog(false)} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default ProgramCards;
