import React from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import JumboRqList from "@jumbo/components/JumboReactQuery/JumboRqList";
import { recordService } from "../../../../../services/record-services";
import RecordItem from "./RecordItem";
import JumboListToolbar from "@jumbo/components/JumboList/components/JumboListToolbar";
import BulkActions from "./BulkActions";
import { Card, DialogContent, Tooltip, Typography, Hidden, IconButton } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import JumboSearch from "@jumbo/components/JumboSearch";
import useListViewPage from "../../hooks/useListViewPage";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FilterDropdown from '../FilterDropdown';
import ListIcon from '@mui/icons-material/List';
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import AddIcon from '@mui/icons-material/Add';
import Div from '../../../../../../@jumbo/shared/Div';
import createProductMutation from "../../../../../../graphql/services/modules/mutations/createProduct"
import createProgramMutation from '../../../../../../graphql/services/programs/mutations/createProgram';
import Fab from "@mui/material/Fab";
import CreateBtn from '../../../../../../../../plugins/core/Modules/components/createModule/moduleContent/createBtn';
import useAuth from '../../../../../../hooks/useAuth';
import GroupPreview from './GroupPreview';
import CreateProgramBatchForm from './components/createProgramBatchForm';
import CreateGroup from './components/CreateGroup';
import InviteStudent from './InviteStudent';
import { Dialog } from '@mui/material';
import { useMediaQuery } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InviteEnrollButton from './components/inviteEnrollButton';
import AddTransaction from './addTransaction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WebinarItem from './webinarItem';
import CampaignItems from './campaignitem';

const RecordsList = (props) => {
    const {
        recordsType,
        shopId,
        handleOnCancel,
        searchKeywords,
        handleOnChange

    } = props;
    const params = useParams();
    const theme = useTheme();
    const groupId = params.groupId
    const assignmentId = params.assignmentId
    const interviewPrepId = params.interviewPrepId
    const programId = params.programId
    const listRef = React.useRef();
    const { refreshRecordsList, setRecordsListRefresh, setSelectedRecords } = useListViewPage();
    const apolloClient = useApolloClient();
    const [view, setView] = React.useState("list");
    const [status, setStatus] = React.useState("");
    const [groupstatus, setGroupStatus] = React.useState("")
    const [mode, setMode] = React.useState('')
    const [programType, setProgramType] = React.useState('')
    const [admissionStatus, setAdmissionStatus] = React.useState('')
    const [quiz, setQuiz] = React.useState('')
    const [institute, setInstitute] = React.useState('')
    const [assignment, setAssignment] = React.useState('')
    const [paymentStatus, setPaymentStatus] = React.useState('')
    const [payableStatus, setPayableStatus] = React.useState('')
    const [colleges, setColleges] = React.useState('')
    const [date, setDate] = React.useState('')
    const [createModule, setCreateModule] = React.useState(true);
    const { showDialog, hideDialog } = useJumboDialog();
    const [course, setCourse] = React.useState([]);
    const [createProgram, { error: createProgramError }] = useMutation(createProgramMutation);
    const [createProduct, { error: createProductError }] = useMutation(createProductMutation);
    const navigate = useNavigate();
    const [isDialog, setIsDialog] = React.useState(false)
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = React.useState(viewer);
    const [queryOptions, setQueryOptions] = React.useState({
        queryKey: recordsType,
        shopId: shopId,
        groupId: groupId,
        programId: programId,
        interviewPrepId: interviewPrepId,
        assignmentId: assignmentId,
        accountId: viewer?._id,
        queryParams: {
            category: recordsType, id: shopId, filterPrms: {}, keywords: undefined, groupId: groupId, accountId: viewer?._id, assignmentId: assignmentId, programId: programId, interviewPrepId: interviewPrepId,
        },
        countKey: "count",
        dataKey: recordsType,
    });
    const [importedEmails, setImportedEmails] = React.useState([])
    const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));

    const handleOk = () => {
        setIsDialog(false)
    }
    const handleStudent = () => {
        setIsDialogOpen(false)
    }
    React.useEffect(() => {

        setQueryOptions(state => ({
            ...state,
            queryKey: recordsType,
            dataKey: recordsType,
            shopId: shopId,
            groupId: groupId,
            assignmentId: assignmentId,
            programId: programId,
            interviewPrepId: interviewPrepId,
            queryParams: {
                ...state.queryParams, category: params.category, id: shopId, groupId: groupId, assignmentId: assignmentId, programId: programId, interviewPrepId: interviewPrepId,
            }
        }))
    }, [recordsType, shopId, groupId, programId, interviewPrepId]);


    const renderRecord = React.useCallback((record) => {
        return (<RecordItem record={record} view={view} recordType={recordsType} />)
    }, [view, recordsType]);


    const showRecordDetail = () => {
        showDialog({
            content: <WebinarItem onClose={hideDialog} setRecordsListRefresh={setRecordsListRefresh} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        maxWidth: "900px",

                    },
                },
            },
        })
    }



    React.useEffect(() => {

        if (isNotMobile == false) {
            setView('grid')
        }
        if (isNotMobile == true) {
            setView('list')
        }
    }, [isNotMobile, recordsType]);

    React.useEffect(() => {
        if (refreshRecordsList) {
            listRef.current.refresh();
            setRecordsListRefresh(false);
        }
    }, [refreshRecordsList]);

    const onInbox = () => {
        navigate('/notifications')
    }
    const onHost = () => {
        navigate('/webinars')
    }
    const onJoin = () => {
        navigate('/webinars/join')
    }

    const onSent = () => {
        navigate('/notifications/sent')
    }


    const onUpcomming = () => {
        navigate('/payments')
    }

    const onReceived = () => {
        navigate('/payments/received')
    }
    const onTransactions = () => {
        navigate('/payments/transactions')
    }

    const onManualPayments = () => {
        navigate('/payments/manualPayments')

    }

    const statusHandleInputChange = React.useCallback((e, index) => {

        const status1 = e.target.value
        setStatus(e.target.value)
        filterPrms = { status: status1, courseCategory: course, programType: programType, programMode: mode }
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                filterPrms: filterPrms,
            }
        }))
    }, [status, course, programType, mode]);
    const quizHandleInputChange = React.useCallback((e, index) => {

        const status1 = e.target.value
        setQuiz(e.target.value)
        filterPrms = { quiz: status1, assignment: assignment }
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                filterPrms: filterPrms,
            }
        }))
    }, [quiz, assignment]);

    const assignmentHandleInputChange = React.useCallback((e, index) => {

        const status1 = e.target.value
        setAssignment(e.target.value)
        const filterPrms = { quiz: quiz, assignment: status1 }
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                filterPrms: filterPrms,
            }
        }))
    }, [quiz, assignment]);

    const groupsstatussHandleInputChange = React.useCallback((e, index) => {

        const status1 = e.target.value
        setGroupStatus(e.target.value)
        filterPrms = { groupstatus: status1 }
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                filterPrms: filterPrms,
            }
        }))
    }, [groupstatus]);

    const dateHandleInputChange = React.useCallback((e, index) => {

        const date1 = e.target.value
        setDate(e.target.value)
        filterPrms = { date: date1 }
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                filterPrms: filterPrms,
            }
        }))
    }, [date]);

    const modeHandleInputChange = React.useCallback((e, index) => {
        const mode1 = e.target.value
        setMode(e.target.value)
        const filterPrms = { status: status, programType: programType, programMode: mode1 }
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                filterPrms: filterPrms,
            }
        }))
    }, [status, programType, mode]);

    const collegesHandleInputChange = React.useCallback((e, index) => {
        const college = e.target.value
        setColleges(e.target.value)
        const filterPrms = { college: college, }
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                filterPrms: filterPrms,
            }
        }))
    }, [colleges]);


    const programTypeHandleInputChange = React.useCallback((e, index) => {
        const type = e.target.value
        setProgramType(e.target.value)
        const filterPrms = { status: status, programType: type, programMode: mode }
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                filterPrms: filterPrms,
            }
        }))
    }, [status, programType, mode]);

    const admissionStatusHandleInputChange = React.useCallback((e, index) => {
        const status1 = e.target.value
        setAdmissionStatus(e.target.value)
        filterPrms = { admissionStatus: status1 }
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                filterPrms: filterPrms,
            }
        }))
    }, [admissionStatus]);

    const instituteStatusHandleInputChange = React.useCallback((e, index) => {
        const status1 = e.target.value
        setInstitute(e.target.value)
        filterPrms = { institute: status1 }
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                filterPrms: filterPrms,
            }
        }))
    }, [institute]);

    const paymentHandleInputChange = React.useCallback((e, index) => {
        const status1 = e.target.value
        setPaymentStatus(e.target.value)
        filterPrms = { paymentStatus: status1 }
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                filterPrms: filterPrms,
            }
        }))
    }, [paymentStatus]);

    const PayablePaymentHandleInputChange = React.useCallback((e, index) => {
        const status1 = e.target.value
        setPayableStatus(e.target.value)
        filterPrms = { payableStatus: status1 }
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                filterPrms: filterPrms,
            }
        }))
    }, [payableStatus]);

    const courseHandleChange = React.useCallback((event, i) => {
        const value = event.target.value
        setCourse(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        const filterPrms = { status: status, courseCategory: value }
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                filterPrms: filterPrms
            }
        }))
    }, [status, course]);



    const handleRemove = React.useCallback((removeData) => {


        if (removeData == "Status") {
            setStatus("")
            filterPrms = { status: "", courseCategory: course }
            setQueryOptions(state => ({
                ...state,
                queryParams: {
                    ...state.queryParams,
                    filterPrms: filterPrms,
                }
            }))

        } else if (removeData == "Course Category") {
            setCourse([])
            filterPrms = { status: status, courseCategory: [] }
            setQueryOptions(state => ({
                ...state,
                queryParams: {
                    ...state.queryParams,
                    filterPrms: filterPrms,
                }
            }))
        } else if (removeData == "Program Mode") {
            setMode('')
            filterPrms = { status: status, programType: programType, mode: "" }
            setQueryOptions(state => ({
                ...state,
                queryParams: {
                    ...state.queryParams,
                    filterPrms: filterPrms,
                }
            }))
        } else if (removeData == "Program Type") {
            setProgramType('')
            filterPrms = { status: status, programType: '', mode: mode }
            setQueryOptions(state => ({
                ...state,
                queryParams: {
                    ...state.queryParams,
                    filterPrms: filterPrms,
                }
            }))

        } else if (removeData == "Quizzes") {
            setQuiz('')
            filterPrms = { assignment: assignment, quiz: '' }
            setQueryOptions(state => ({
                ...state,
                queryParams: {
                    ...state.queryParams,
                    filterPrms: filterPrms,
                }
            }))
        } else if (removeData == "Assignments") {
            setAssignment("");
            filterPrms = { assignment: "", quiz: quiz }
            setQueryOptions(state => ({
                ...state,
                queryParams: {
                    ...state.queryParams,
                    filterPrms: filterPrms,
                }
            }))
        }
        else if (removeData == "Colleges") {
            setColleges("");
            filterPrms = { college: "" }
            setQueryOptions(state => ({
                ...state,
                queryParams: {
                    ...state.queryParams,
                    filterPrms: filterPrms,
                }
            }))
        } else if (removeData == "Reg Date" || removeData == "Created At" || removeData == "Invited Date") {
            setDate('')
            filterPrms = { date: '' }
            setQueryOptions(state => ({
                ...state,
                queryParams: {
                    ...state.queryParams,
                    filterPrms: filterPrms,
                }
            }))
        } else if (removeData == "Date") {
            setDate('')
            filterPrms = { date: '' }
            setQueryOptions(state => ({
                ...state,
                queryParams: {
                    ...state.queryParams,
                    filterPrms: filterPrms,
                }
            }))
        } else if (removeData == "Training Partner") {
            setInstitute('')
            filterPrms = { institute: '' }
            setQueryOptions(state => ({
                ...state,
                queryParams: {
                    ...state.queryParams,
                    filterPrms: filterPrms,
                }
            }))
        }


    }, [course, status, mode, programType, quiz, assignment, colleges, date, institute])



    const addNewclick = async () => {

        switch (recordsType) {
            case "tutors":
                navigate("/inviteuser")
                break
            case "students":
                (user.role === "Admin") && navigate("/invite&Enrole");
                break;

            case "admissions":
                showDialog({
                    /* fullScreen: true, */
                    content: <CreateProgramBatchForm shopId={shopId} onClose={hideDialog} setRecordsListRefresh={setRecordsListRefresh} style={{ borderRadius: '15px' }} />,
                    sx: {
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                width: "1200px",
                                maxWidth: "1000px",
                                borderRadius: '15px',
                                marginLeft: '10px'
                                // Set your width here
                            },
                        },
                    },
                })

                break;

            case "transactions":
                showDialog({
                    /* fullScreen: true, */
                    content: <AddTransaction shopId={shopId} onClose={hideDialog} setRecordsListRefresh={setRecordsListRefresh} style={{ borderRadius: '15px' }} />,
                    sx: {
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                width: "700px",
                                maxWidth: "1000px",
                                borderRadius: '15px',
                                marginLeft: '10px'
                                // Set your width here
                            },
                        },
                    },
                })

                break;
            case "groups":
                showDialog({
                    /* fullScreen: true, */
                    content: <CreateGroup shopId={shopId} onClose={hideDialog} setRecordsListRefresh={setRecordsListRefresh} style={{ borderRadius: '15px' }} setIsDialog={setIsDialog} />,
                    sx: {
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                width: "1000px",
                                height: '500px',
                                maxWidth: "1000px",
                                borderRadius: '15px',
                                marginLeft: '10px'
                                // Set your width here
                            },
                        },
                    },
                })

                break;
            case "technical":
                navigate(`/placementpreep/technical/createtechnical`);
                break;

            case "aptitude":
                navigate(`/placementpreep/aptitude/createaptitude`);
                break;
            case "entranceexam":
                navigate(`/competitivepreep/entranceexam/createentrance`);
                break
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
            case "groupList":
                showDialog({
                    /* fullScreen: true, */
                    content: <InviteStudent shopId={shopId} onClose={hideDialog} groupId={groupId} setRecordsListRefresh={setRecordsListRefresh} style={{ borderRadius: '15px' }} setIsDialogOpen={setIsDialogOpen} />,
                    sx: {
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                width: "800px",
                                height: "600px",
                                maxWidth: "1000px",
                                borderRadius: '15px',
                                marginLeft: '10px'
                                // Set your width here
                            },
                        },
                    },
                })
                break;

            case "modelpapers":
                navigate('/competitivepreep/modelpapers/createPaper')
                break;

            case "myprograms":
                const { data: programData } = await createProgram({ variables: { input: { shopId: shopId } } });

                if (programData) {
                    const { createProgram: program } = programData;
                    navigate(`/programs/${program._id}/addprogram`);

                }

                if (createProgramError) {
                    enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", { variant: "error" }));
                }
                break;

                if (createProductError) {
                    enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", { variant: "error" }));
                }


        }


        // navigate(`${params.shopId}/inviteuser`)

    }

    const handleBack = () => {
        navigate(-1)
    }

    const handelAnnouncementClick = () => {

        showDialog({
            //fullScreen: true,
            content: <CampaignItems onClose={hideDialog} setRecordsListRefresh={setRecordsListRefresh} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        maxWidth: "1000px",

                    },
                },
            },
        })
    }

    const handelBackButton = () => {
        navigate(-1)
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
            searchKeywords={searchKeywords}

            sx={view === 'grid' && { p: theme => theme.spacing(1, 3, 3) }}
            recordsType={recordsType}
            wrapperSx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: "74vh",
                borderRadius: "0px"
            }}

            toolbar={
                <JumboListToolbar
                    hideItemsPerPage={true}

                    bulkActions={viewer?.role === "Tutor" || viewer?.role === "Student" && recordsType === "myclasses" || recordsType === "programs" || recordsType === "groups" || recordsType === "assignments" || recordsType === "questions" ? (null) : (

                        <BulkActions recordsType={recordsType} onClose={hideDialog} />)
                    }
                    actionTail={
                        (recordsType == "notifications" || recordsType == "sent") ? "" :
                            <Stack spacing={2} direction={"row"} alignItems={"center"}>


                                {
                                    viewer?.role === "Tutor" && recordsType === "questions" ? (
                                        <Div>
                                            <IconButton
                                                sx={{ float: 'left' }}
                                                onClick={handleBack}
                                            >
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </Div>
                                    ) : (null)
                                }

                                {(viewer?.role == "Master-Admin" || viewer?.role == "Admin" || viewer?.role == "Tutor") && (recordsType === 'modules') ? (
                                    <CreateBtn shopId={shopId} />
                                ) : (recordsType === 'groupList') ? (

                                    viewer?.role !== "Student" &&
                                    <>
                                        <GroupPreview importedEmails={importedEmails} setImportedEmails={setImportedEmails} groupId={groupId} />
                                        <InviteEnrollButton shopId={shopId} onClose={hideDialog} groupId={groupId} setRecordsListRefresh={setRecordsListRefresh} />

                                    </>
                                ) : (
                                    <Fab
                                        size="small"
                                        sx={{
                                            maxHeight: '5px', maxWidth: '35px', display: (viewer?.role == "College-Admin"
                                                && (recordsType == "courses" || recordsType == 'internships' || recordsType == 'myprograms' || recordsType == 'projects') || (viewer?.role == "Student") || ((viewer?.role == "Admin") && recordsType == 'students') || ((viewer?.role == "Tutor") && recordsType == 'students') || ((viewer?.role == "Tutor") && recordsType == 'classes') || ((viewer?.role == "Admin") && recordsType == 'payments') || ((viewer?.role == "Tutor") && recordsType == 'payments') || ((viewer?.role == "College-Admin") && recordsType == 'payments') || ((viewer?.role == "Student") && recordsType == 'payments') || ((viewer?.role == "Admin") && recordsType == 'transactions') || ((viewer?.role == "Admin") && recordsType == 'received') || ((viewer?.role == "Admin") && recordsType == 'manualPayments') || ((viewer?.role == "College-Admin") && recordsType == 'students') || ((viewer?.role == "College-Admin") && recordsType == 'students') || ((viewer?.role == "Master-Admin") && recordsType == 'trainingpartners') || ((viewer?.role == "Master-Admin") && recordsType == 'collegeadmins') || ((viewer?.role == "Master-Admin") && recordsType == 'programsList') || ((viewer?.role == "Master-Admin") && recordsType == 'students') || ((viewer?.role == "Master-Admin") && recordsType == 'modules') || ((viewer?.role == "Tutor") && recordsType == 'assignments') || ((viewer?.role == "Tutor") && recordsType == 'questions') || ((viewer?.role == "Master-Admin") && recordsType == 'announcement') || ((viewer?.role == "Admin") && recordsType == 'webinars') || ((viewer?.role == "Master-Admin") && recordsType == 'quizes') || ((viewer?.role == "Master-Admin") && recordsType == 'webinars') ? 'none' : '')
                                        }}
                                        color="primary"
                                        aria-label="add"
                                        onClick={addNewclick}
                                    >
                                        <AddIcon />
                                    </Fab>
                                )}


                                {
                                    recordsType === "quizes" ? (

                                        <IconButton
                                            onClick={handelBackButton}
                                        >
                                            <ArrowBackIcon />
                                        </IconButton>
                                    ) : ("")
                                }

                                {
                                    viewer?.role === "Master-Admin" && recordsType === "announcement" ? (

                                        <Button variant="contained" onClick={() => { handelAnnouncementClick() }} sx={{ textTransform: 'capitalize' }}>
                                            <AddIcon /> Announcement
                                        </Button>

                                    ) : ("")
                                }

                                {
                                    viewer?.role === "Master-Admin" && recordsType === "webinars" ? (

                                        <Button variant="contained" onClick={showRecordDetail} sx={{ textTransform: 'capitalize' }}>
                                            <AddIcon /> Webinar
                                        </Button>

                                    ) : ("")
                                }

                                {
                                    viewer?.role === "Admin" && recordsType === "webinars" ? (

                                        <Button variant="contained" onClick={showRecordDetail} sx={{ textTransform: 'capitalize' }}>
                                            <AddIcon />New Webinar
                                        </Button>

                                    ) : ("")
                                }





                                {
                                    (viewer?.role === "Master-Admin" && recordsType === "webinars" || recordsType === "announcement") || (viewer?.role === "Admin" && recordsType === "webinars") || recordsType === "assignments" || recordsType === "quizes" || recordsType === "questions" ? (null) :

                                        (<Div sx={{ display: { xs: 'none', sm: 'block' } }}>
                                            <FilterDropdown
                                                courseHandleChange={courseHandleChange}
                                                statusHandleInputChange={statusHandleInputChange}
                                                status={status}
                                                course={course}
                                                handleRemove={handleRemove}
                                                recordsType={recordsType}
                                                modeHandleInputChange={modeHandleInputChange}
                                                mode={mode}
                                                admissionStatusHandleInputChange={admissionStatusHandleInputChange}
                                                groupsstatussHandleInputChange={groupsstatussHandleInputChange}
                                                admissionStatus={admissionStatus}
                                                paymentHandleInputChange={paymentHandleInputChange}
                                                paymentStatus={paymentStatus}
                                                programTypeHandleInputChange={programTypeHandleInputChange}
                                                programType={programType}
                                                PayablePaymentHandleInputChange={PayablePaymentHandleInputChange}
                                                payableStatus={payableStatus}
                                                assignmentHandleInputChange={assignmentHandleInputChange}
                                                quizHandleInputChange={quizHandleInputChange}
                                                quiz={quiz}
                                                assignment={assignment}
                                                collegesHandleInputChange={collegesHandleInputChange}
                                                colleges={colleges}
                                                dateHandleInputChange={dateHandleInputChange}
                                                date={date}
                                                instituteStatusHandleInputChange={instituteStatusHandleInputChange}
                                                institute={institute}
                                            />
                                        </Div>)}

                                {
                                    (viewer?.role === "Tutor" && recordsType === "assignments" || recordsType === "questions") ? (null) :

                                        (<ButtonGroup
                                            variant="outlined"
                                            disableElevation
                                            sx={{
                                                display: { xs: 'none', sm: 'block' },
                                                '& .MuiButton-root': {
                                                    px: 1,
                                                }
                                            }}
                                        >
                                            <Button variant={view === "list" ? "contained" : "outlined"}
                                                onClick={() => setView("list")}><ListIcon /></Button>
                                            <Button variant={view === "grid" ? "contained" : "outlined"}
                                                onClick={() => setView("grid")}><ViewComfyIcon /></Button>
                                        </ButtonGroup>)}


                            </Stack>
                    }
                >
                    <div style={{ display: 'flex' }}>

                        {(viewer?.role === "Admin" && recordsType == "webinars" || recordsType == "join") &&
                            <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: { base: '10px', md: '0px' } }}>

                                <Button sx={{ borderBottom: (recordsType == "webinars") ? "2px solid #50c2c9" : '', textTransform: 'none', fontSize: { base: '14px', md: '16px' }, borderRadius: 'none', padding: '10px 20px', marginLeft: '-20px' }}
                                    onClick={() => onHost()}>Host</Button>
                                <Button sx={{ ml: 3, borderBottom: (recordsType == "join") ? "2px solid #50c2c9" : '', textTransform: 'none', fontSize: { base: '14px', md: '16px' }, borderRadius: 'none', padding: '10px 20px', marginLeft: '-15px' }}
                                    onClick={() => onJoin()}>Join</Button>

                            </Stack>
                        }

                        {(recordsType == "notifications" || recordsType == 'sent') &&
                            <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: { base: '10px', md: '0px' } }}>

                                <Button sx={{ borderBottom: (recordsType == "notifications") ? "2px solid #50c2c9" : '', textTransform: 'none', fontSize: { base: '14px', md: '16px' }, borderRadius: 'none', padding: '10px 20px', marginLeft: '-20px' }}
                                    onClick={() => onInbox()}>Inbox</Button>
                                <Button sx={{ ml: 2, borderBottom: (recordsType == "sent") ? "2px solid #50c2c9" : '', textTransform: 'none', fontSize: { base: '14px', md: '16px' }, borderRadius: 'none', padding: '10px 20px', marginLeft: '-15px' }}
                                    onClick={() => onSent()}>Sent</Button>

                            </Stack>
                        }




                        {viewer?.role === "Tutor" && recordsType === "assignments" || recordsType === "questions" ? (null) :
                            (<Div sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <JumboSearch
                                    onChange={handleOnChange}
                                    onCancel={handleOnCancel}
                                    sx={{
                                        display: { xs: 'none', sm: 'block' },
                                        textAlign: 'right'

                                    }}
                                    // value={queryOptions.queryParams.keywords}
                                    value={searchKeywords}

                                />
                            </Div>)}

                        <div style={{ marginLeft: '5px', marginTop: '3px', }}>
                            {recordsType === "groupList" && (
                                <Typography variant="h3" noWrap style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#100E20', marginLeft: '5px', marginTop: '3px', }}>
                                </Typography>
                            )}
                        </div>
                    </div>

                    <Dialog open={isDialog}
                        PaperProps={{
                            sx: {
                                minHeight: 300,
                                minWidth: 400,
                                borderRadius: '15px'
                            }
                        }}>

                        <DialogContent>
                            <Div style={{ marginLeft: '50px', marginTop: '40px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <CheckCircleOutlineIcon style={{ width: '50px', height: '50px', color: 'green', marginLeft: '80px' }} />
                                    <Typography style={{ fontSize: '1.2rem' }}> Group created successfully</Typography>
                                </div>
                                <Button variant='contained' style={{ marginLeft: '80px' }} onClick={() => handleOk}>OK</Button>
                            </Div>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={isDialogOpen}
                        PaperProps={{
                            sx: {
                                minHeight: 300,
                                minWidth: 400,
                                borderRadius: '15px'
                            }
                        }}>

                        <DialogContent>
                            <Div style={{ marginLeft: '50px', marginTop: '40px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <CheckCircleOutlineIcon style={{ width: '50px', height: '50px', color: 'green', marginLeft: '80px' }} />
                                    <Typography style={{ fontSize: '1.2rem' }}> Students successfully Invited</Typography>
                                </div>
                                <Button variant='contained' style={{ marginLeft: '80px' }} onClick={handleStudent}>OK</Button>
                            </Div>
                        </DialogContent>
                    </Dialog>
                </JumboListToolbar>
            }
            onSelectionChange={setSelectedRecords}
            view={view}
        />
    );
};

export default RecordsList;
