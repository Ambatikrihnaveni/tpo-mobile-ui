import React, { useState ,useEffect} from 'react'
import { Dialog, Card, Box, Button, Typography, TextField, IconButton, AppBar, Grid, Toolbar, Divider } from '@mui/material'
import Div from '../../../../../../@jumbo/shared/Div'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import LibraryLayout from "./libraryLayout";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from "react-router-dom";
import createProgramMutation from '../../../../../../graphql/services/programs/mutations/createProgram';
import importProgramMutation from '../../../../../../graphql/services/programs/mutations/importPrograms';
import useAuth from '../../../../../../hooks/useAuth';
import useCurrentShopId from '../../../../../../hooks/useCurrentShopId';
import program from '../../../../../../graphql/services/programs/queries/program';
import StudentsService from '../../../../../../graphql/services/students/students-service';

export default function Library({ onClose }) {
      ;
    const [createProgram, { error: createProgramError }] = useMutation(createProgramMutation);
    const [importProgram, { error: importProgramError }] = useMutation(importProgramMutation);
    const [programs, setPrograms] = React.useState([])
    const [programsdata, setProgramsdata] = React.useState([])
    const navigate = useNavigate();
    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = React.useState(viewer);
    const { shopId } = useCurrentShopId()
    const [programsId, setProgramsId] = useState([])

    // const userShopId= (viewer.role == 'Admin' || viewer.role== 'Master-Admin' )? shopId:viewer.shopId
    const importCount = Array.isArray(programsdata) ? programsdata.length : 0;
    // const recordsType = "internships"

    const onAddNew = async () => {

        const { data: programData } = await createProgram({ variables: { input: { shopId: shopId } } });

        if (programData) {
            const { createProgram: program } = programData;
            navigate(`/programs/${program._id}/addprogram`);
            onClose()
        }

        if (createProgramError) {
            enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", { variant: "error" }));
        }
    }


    const handleEditClick = React.useCallback((_id) => {
        navigate(`/programs/${_id}/editprogram`);
        onClose()
    });

    const programsData = React.useCallback((item) => {

        const currentdataIndex = programsdata.indexOf(item);
        const newCheckeddata = [...programsdata];
        const currentIndex = programs.indexOf(item?.id);
        const newChecked = [...programs];

        if (currentIndex === -1) {
            newChecked.push(item?.id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setPrograms(newChecked);

        if (currentdataIndex === -1) {
            newCheckeddata.push(item);
        } else {
            newCheckeddata.splice(currentdataIndex, 1);
        }

        setProgramsdata(newCheckeddata)
    });
    /* const programID = []
    for (i = 0; i < programsdata.length; i++) {
        programID.push(programsdata[i]._id)
        setProgramsId(programID)
    } */
    const onImport = async () => {
           
       
        const programIDs = [];

        // Loop through the programsdata array to extract _id values
        for (let i = 0; i < programsdata.length; i++) {
            programIDs.push(programsdata[i]._id);
        }
    
        // Assuming setProgramsId is a function to update the programsId array
        setProgramsId(programIDs);
        try {

            let programData;
            if(viewer?.role=="Student"){
                const { data } = await StudentsService.importProgramForStudent(programIDs) 
                programData=data

                setTimeout(() => {
                    onClose();
                }, 3000);
                navigate(`/programs`);

            }else{
                const { data } = await importProgram({ variables: { input: { shopId: shopId, programIds: programIDs } } })
                programData=data

                setTimeout(() => {
                    onClose();
                }, 3000);
                navigate(`/myprograms`);
            }
           
          
            toast.success("Program imported successfully", {
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

    return (
        <Div>
            <AppBar sx={{ position: 'fixed', bgcolor: "background.paper" }}>
                <Toolbar>

                    <Typography sx={{ flex: 1 }} variant="h3" component="div">
                        Library
                    </Typography>
                   {/*  {(user.role != "Student") &&
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={onAddNew}
                            sx={{ mr: 2, textTransform: 'none', fontSize: "16px", fontWeight: 'bold' }}>
                            Add new
                        </Button>

                    } */}


                   
                        <Button autoFocus variant='contained'    disabled={importCount === 0 } sx={{ mr: 2, textTransform: 'none', fontSize: "16px", fontWeight: 'bold' }} onClick={onImport}>
                            {`Import (${importCount})`}
                        </Button>

                    






                    <Divider orientation="vertical" />
                    <IconButton
                        edge="end"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Div sx={{ marginTop: '4%' }}>
                <LibraryLayout programsData={programsData} importCount={importCount} selectedPrograms={programsdata} handleEditClick={handleEditClick} />
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
        </Div>
    )
}
