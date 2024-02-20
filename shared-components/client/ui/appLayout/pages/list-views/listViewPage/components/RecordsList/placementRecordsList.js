import React from 'react';
import {useNavigate, useParams,} from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import JumboRqList from "@jumbo/components/JumboReactQuery/JumboRqList";
import {recordService} from "../../../../../services/record-services";
import RecordItem from "./RecordItem";
import JumboListToolbar from "@jumbo/components/JumboList/components/JumboListToolbar";
import BulkActions from "./BulkActions";
import {Card} from "@mui/material";
import JumboSearch from "@jumbo/components/JumboSearch";
import useListViewPage from "../../hooks/useListViewPage";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ListIcon from '@mui/icons-material/List';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import AddIcon from '@mui/icons-material/Add';
import createProductMutation from "../../../../../../graphql/services/modules/mutations/createProduct"
import Fab from "@mui/material/Fab";


const RecordsList = (props) => {
    ;
    const {
     recordsType,
     shopId
    } = props;
    const params = useParams();
    const listRef = React.useRef();
    const {refreshRecordsList, setRecordsListRefresh, setSelectedRecords} = useListViewPage();
    const apolloClient = useApolloClient();
    const [view, setView] = React.useState("list");
    const [status, setStatus] = React.useState("");
    const [course, setCourse] = React.useState([]);
    const [createProduct, { error: createProductError }] = useMutation(createProductMutation);
    const navigate=useNavigate();
    const [queryOptions, setQueryOptions] = React.useState({
        queryKey: recordsType,
        shopId:shopId,
        queryParams: {category: params.category, id:shopId,filterPrms:{}, keywords:undefined},
        countKey: "count",
        dataKey: recordsType,
    });

    
    React.useEffect(() => {
        
        setQueryOptions(state => ({
            ...state,
            queryKey: recordsType,
            dataKey:recordsType,
            shopId:shopId,
            queryParams: {...state.queryParams, category: params.category, id: shopId}
        }))
    }, [recordsType,shopId]);


    const renderRecord = React.useCallback((record) => {
        return (<RecordItem record={record} view={view} recordType={recordsType} />)
    }, [view,recordsType]);

    React.useEffect(() => {
        if (refreshRecordsList) {
            listRef.current.refresh();
            setRecordsListRefresh(false);
        }
    }, [refreshRecordsList]);

    const handleOnChange = React.useCallback((keywords) => {
       ;
        /* if(keywords == undefined) {
            return false;
        }else */ if(keywords?.length < 3) {
            return false;
        }else if(keywords?.length >= 3 || keywords == undefined){
            setTimeout(()=>{
                setQueryOptions(state => ({
                    ...state,
                    queryParams: {
                        ...state.queryParams,
                        keywords: keywords,
                    }
                }))
            }, 1000)
        }
    }, [queryOptions]);

    const handleOnCancel = React.useCallback((keywords)=>{
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                keywords: keywords,
            }
        }))
    },[queryOptions])
    const statusHandleInputChange = React.useCallback((e, index) => {
        
        const status1=e.target.value
        setStatus(e.target.value)
        filterPrms={ status: status1, courseCategory: course }
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                filterPrms: filterPrms,
            }
        }))
    }, [status,course]);

    const courseHandleChange = React.useCallback((event, i) => {
        const value = event.target.value
        setCourse(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
         const  filterPrms={ status: status, courseCategory: value }
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                filterPrms:filterPrms
            }
        }))
    }, [status,course]);
  
    const handleRemove= React.useCallback( (removeData)=>{
        
        
            if(removeData=="Status"){
                setStatus("")
                filterPrms= { status: "", courseCategory: course }
                setQueryOptions(state => ({
                    ...state,
                    queryParams: {
                        ...state.queryParams,
                        filterPrms: filterPrms,
                    }
                }))
               
            }else if(removeData=="Course Category"){
                setCourse([])
                filterPrms= { status: status, courseCategory: [] }
            setQueryOptions(state => ({
                ...state,
                queryParams: {
                    ...state.queryParams,
                    filterPrms: filterPrms,
                }
            }))
            }
           
        
    },[course,status])


    
    const addNewclick= async()=>{
        
        switch(recordsType){
            case "tutors":
            navigate("/inviteuser")
            break
            case "students":
            navigate("/inviteuser") 
            break;
            case "placements":
            navigate("/inviteJob")
            break;
            case "modules":
                const { data } = await createProduct({ variables: { input: { shopId } } });

                if (data) {
                const { createProduct: { product } } = data;
                navigate(`/modules/${product._id}/addmodule`);
                }

                if (createProductError) {
                enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", { variant: "error" }));
                }
            break;

    if (createProductError) {
      enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", { variant: "error" }));
    }
    }
        
       
       // navigate(`${params.shopId}/inviteuser`)
    }
    return (
        
        <JumboRqList
            ref={listRef}
            wrapperComponent={Card}
            service={recordService.getRecords}
            primaryKey={"id"}
            queryOptions={queryOptions}
            itemsPerPage={8}
            itemsPerPageOptions={[8, 15, 20]}
            renderItem={renderRecord}
            componentElement={"div"}
            sx={view === 'grid' && {p: theme => theme.spacing(1, 3, 3)}}
            recordsType={recordsType}
            wrapperSx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight:"74vh",
                borderRadius:"0px"
            }}
            toolbar={
                <JumboListToolbar
                    hideItemsPerPage={true}
                    bulkActions={
                        <BulkActions/>
                    }
                    actionTail={
                        <Stack  spacing={2} direction={"row"} alignItems={"center"}>
                        
                      <Fab size="small" sx={{maxHeight:'5px',maxWidth:'35px'}} color="primary" aria-label="add"  onClick={addNewclick}><AddIcon/> </Fab>
                       
                        <ButtonGroup
                            variant="outlined"
                            disableElevation
                            sx={{
                                '& .MuiButton-root': {
                                    px: 1,
                                }
                            }}
                        >
                            <Button variant={view === "list" ? "contained" : "outlined"}
                                    onClick={() => setView("list")}><ListIcon/></Button>
                            <Button variant={view === "grid" ? "contained" : "outlined"}
                                    onClick={() => setView("grid")}><ViewComfyIcon/></Button>
                        </ButtonGroup>
                        </Stack>
                    }
                >
                    <JumboSearch
                        onChange={handleOnChange}
                        onCancel={handleOnCancel}
                        sx={{
                            display: {xs: 'none', md: 'block'}
                        }}
                        value= {queryOptions.queryParams.keywords}
                    />
                </JumboListToolbar>
            }
            onSelectionChange={setSelectedRecords}
            view={view}
        />
    );
};

export default RecordsList;
