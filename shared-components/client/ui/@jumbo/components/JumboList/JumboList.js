import React from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from "react-transition-group/TransitionGroup";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AdmissionListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/admissionHeader';
import JumboListContext from "./JumboListContext";
import JumboListWrapper from "./components/JumboListWrapper";
import JumboListNoDataPlaceholder from "./components/JumboListNoDataPlaceHolder";
import { useNavigate, useParams } from "react-router-dom";
import {
    CHANGE_ACTIVE_PAGE,
    SET_BULK_ACTIONS,
    SET_DATA,
    SET_ITEMS_PER_PAGE,
    SET_SELECTED_ITEMS
} from "./utils/constants";
import { getUpdatedSelectedItems } from "./utils/listHelpers";
import Grid from "@mui/material/Grid";
import { CircularProgress, MenuItem, Select, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import PlacementListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/placementListHeader';
import TutorListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/tutorListHeader';
import ModuleListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/moduleListHeader';
import StudentListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/studentListHeader';
import MyProgramListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/myprogramsListHeader';
import ProjectListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/projectListHeader';
import CourceListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/courceListHeader';
import ProgramListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/programListHeaders';
import Program from '../../../graphql/services/programs/queries/program';
import GroupPreviewHeader from '../../../appLayout/pages/list-views/listViewPage/components/RecordsList/GroupPreviewHeader';
import StudentGroupHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/StudentGroupHeader';
import TutorClassListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/tutorclasslistheader';
import StudentClassHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/studentClassHeader';
import StudentProgramHeader from '../../../appLayout/pages/list-views/listViewPage/components/RecordsList/studentprogramheader';
import PaymentListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/paymentListHeader';
import PaymentPayableListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/paymentpayableListheader';
import TrainingPartnerListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/trainingpartnerListHeader';
import CollegeAdminHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/collegeAdminHeader';
import PaymentsTransactionsHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/paymentTransactionsHeader';
import ManualPaymentsHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/manualPaymentsHeader'
import AssignmentListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/assignmentHeader';
import AssignmentQuestionHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/assignmentquestionHeader';
import TodayClass from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/todayClassHeader';
import TariningPartnerJoinHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/tpjoinheader';
import EventNotificationsHeader from '../../../appLayout/pages/list-views/listViewPage/components/RecordsList/eventNotificationHeader';
import CampaignlistHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/campaignlistHeader';
import useAuth from '../../../hooks/useAuth';
import TechnicalListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/technicalListHeader';
import WebinarhostlistHeader from '../../../appLayout/pages/list-views/listViewPage/components/RecordForm/webinarhostlistHeader';
import AptitudeListHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/aptitudeListheader';
import FreeQuizzesHeader from '../../../appLayout/pages/list-views/listViewPage/listViewHeaders/freeQuizzesHeader';
import QuizHeader from '../../../appLayout/pages/placement_prep/aptitude/quizHeader';


const init = (initArgs) => {
    return ({
        selectedItems: [],
        ...initArgs,
    })
};

const jumboListReducer = (state, action) => {
    switch (action.type) {
        case SET_SELECTED_ITEMS:
            return {
                ...state,
                selectedItems: getUpdatedSelectedItems(
                    state.selectedItems,
                    action.payload,
                    state.primaryKey
                )
            };

        case SET_DATA:
            return {
                ...state,
                data: action.payload.data,
                totalCount: action.payload.totalCount,
            };

        case CHANGE_ACTIVE_PAGE:
            return {
                ...state,
                activePage: parseInt(action.payload),
            };

        case SET_ITEMS_PER_PAGE:
            return {
                ...state,
                itemsPerPage: parseInt(action.payload),
                activePage: 0,
            };

        case SET_BULK_ACTIONS:
            return {
                ...state,
                bulkActions: action.payload,
            };

        default:
            return state;
    }
};

const JumboList = React.forwardRef((props, ref) => {

    const {
        header, toolbar, footer, data, primaryKey, renderItem,
        totalCount, itemsPerPage, onPageChange, itemsPerPageOptions,
        onSelectionChange, multiSelectOptions, noDataPlaceholder,
        wrapperComponent, wrapperSx, component, componentElement, sx,
        onItemsPerPageChange, isLoading, page, disableTransition, recordsType,
        view
    } = props;

    const routeParams = useParams();

    const [jumboList, setJumboList] = React.useReducer(jumboListReducer, {
        primaryKey: primaryKey,
        data: data,
        totalCount: totalCount,
        itemsPerPage: itemsPerPage,
        itemsPerPageOptions: itemsPerPageOptions,
        activePage: page,
        isLoading: isLoading,
        multiSelectOptions: multiSelectOptions,
        bulkActions: null
    }, init);

    const setActivePage = React.useCallback((pageNumber) => {
        setJumboList({ type: CHANGE_ACTIVE_PAGE, payload: pageNumber });
    }, [setJumboList]);

    if (data.length === 0 && totalCount > 0 && jumboList.activePage > 0) {
        setActivePage(jumboList.activePage - 1);
    }

    const setItemsPerPage = React.useCallback((value) => {
        setJumboList({ type: SET_ITEMS_PER_PAGE, payload: value });
    }, [setJumboList]);

    const setSelectedItems = React.useCallback((itemsData) => {
        setJumboList({ type: SET_SELECTED_ITEMS, payload: itemsData });
    }, [setJumboList]);

    const setBulkActions = React.useCallback((bulkActions) => {
        setJumboList({ type: SET_BULK_ACTIONS, payload: bulkActions ?? [] })
    }, []);

    React.useEffect(() => {
        setJumboList({ type: SET_DATA, payload: { data: data, totalCount: totalCount } });
    }, [data, recordsType]);

    const jumboListContextValue = React.useMemo(() => ({
        ...jumboList,
        setActivePage,
        setSelectedItems,
        setBulkActions,
        setItemsPerPage
    }), [jumboList]);

    React.useEffect(() => {
        onSelectionChange(jumboList.selectedItems);
    }, [jumboList.selectedItems]);

    React.useEffect(() => {
        onPageChange(jumboList.activePage);
    }, [jumboList.activePage]);

  /*   React.useEffect(() => {
        onItemsPerPageChange(jumboList.itemsPerPage)
    }, [jumboList.itemsPerPage]); */

    const { viewer } = useAuth()

    React.useImperativeHandle(ref, () => ({
        resetSelection() {
            setSelectedItems([]);
        },
    }), []);

    const onLimitPerPageChange=(e)=>{
        onItemsPerPageChange(e)
        setItemsPerPage(e.target.value)
    }

    if (isLoading) {
        return (
            <JumboListContext.Provider value={jumboListContextValue}>
                <JumboListWrapper component={wrapperComponent} sx={wrapperSx}>
                    {header}
                    {toolbar}
                    <Div
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: theme => theme.spacing(3),
                            m: 'auto',
                        }}
                    >
                        <CircularProgress />
                        <Typography variant={'h6'} color={'text.secondary'} mt={2}>Loading</Typography>
                    </Div>
                </JumboListWrapper>
            </JumboListContext.Provider>
        )
    }

    const componentProps = componentElement ? { component: componentElement } : {};
    const ListComponent = component ? component : List;
    return (
        <JumboListContext.Provider value={jumboListContextValue}>
            <JumboListWrapper component={wrapperComponent} sx={wrapperSx}>
                {header}
                {toolbar}
                {
                    data?.length <= 0 && !isLoading &&
                    <JumboListNoDataPlaceholder>
                        {noDataPlaceholder}
                    </JumboListNoDataPlaceholder>
                }
                {
                    data.length > 0 && view === "list" &&
                    <ListComponent {...componentProps} disablePadding sx={{ ...sx }}>
                        {(recordsType == "placements" || recordsType == "jobmatches" || recordsType == "appliedjobs" || recordsType == "rejectedjobs" || recordsType == "placedjobs") &&
                            <PlacementListHeader />
                        }
                        {
                            (recordsType == "tutors") &&
                            <TutorListHeader />
                        }
                        {
                            (recordsType == "groups") &&
                            <StudentGroupHeader />
                        }
                        {
                            (recordsType == "groupList") &&
                            <GroupPreviewHeader />
                        }
                        {
                            (recordsType == "modules") &&
                            <ModuleListHeader />

                        }
                        {
                            (recordsType == "students") &&
                            <StudentListHeader />
                        }
                        {
                            (recordsType == "myprograms") &&
                            <MyProgramListHeader />
                        }
                        {
                            (recordsType == "programsList") &&
                            <ProgramListHeader />
                        }
                        {
                            (viewer?.role != "Admin" && viewer?.role != "Master-Admin" && recordsType == "webinars" ) &&
                            <EventNotificationsHeader/>
                        }
                        {
                            (recordsType == "internships" || recordsType == "courses") &&
                            <CourceListHeader />
                        }
                        {
                            (recordsType == "projects") &&
                            <ProjectListHeader />
                        }
                        {
                            (recordsType == "admissions") &&
                            <AdmissionListHeader />
                        }
                        {
                            (recordsType == "programs") &&
                            <StudentProgramHeader />
                        }
                        {
                            (recordsType == "classes") &&
                            <TutorClassListHeader />
                        }
                        {
                            (recordsType == "myadmissions") &&
                            <StudentClassHeader />
                        }
                        {
                            (recordsType == "payments" || recordsType == "received") &&
                            <PaymentListHeader recordsType={recordsType} />
                        }
                        {
                            (recordsType == "payable") &&
                            <PaymentPayableListHeader recordsType={recordsType} />
                        }
                        {
                            (recordsType == "collegeadmins") &&
                            <CollegeAdminHeader recordsType={recordsType} />
                        }

                        {
                            (recordsType == "trainingpartners") &&
                            <TrainingPartnerListHeader recordsType={recordsType} />
                        }
                        {
                            (recordsType == "todaysclass") &&
                            <TodayClass recordsType={recordsType} />
                        }
                          {
                            (recordsType == "lesson-quiz") &&
                            <FreeQuizzesHeader recordsType={recordsType} />
                        }
                        {
                            (recordsType == "transactions") &&
                            <PaymentsTransactionsHeader recordsType={recordsType} />
                        }

                        {
                            (recordsType == "manualPayments") &&
                            <ManualPaymentsHeader recordsType={recordsType} />
                        }
                        {
                            ( viewer?.role === "Admin" || viewer?.role === "Master-Admin" &&recordsType == "webinars") &&
                            <WebinarhostlistHeader recordsType={recordsType} />
                        }
                        {
                            (recordsType == "assignments") &&
                            <AssignmentListHeader recordsType={recordsType} />
                        }
                        {
                            (recordsType == "questions") &&
                            <AssignmentQuestionHeader recordsType={recordsType} />
                        }
                         {
                            (recordsType == "join") &&
                            <TariningPartnerJoinHeader recordsType={recordsType} />
                        }
                        
                        {
                            (recordsType == "announcement") &&
                            <CampaignlistHeader recordsType={recordsType} />
                        }
                          {
                            (recordsType == "aptitude" || recordsType == "entranceexam") &&
                            <AptitudeListHeader recordsType={recordsType} />
                        }
                        {
                            (recordsType == 'technical')&&
                            <TechnicalListHeader recordsType={recordsType} />
                        }
                        {
                            (recordsType == 'quizes')&&
                            <QuizHeader recordsType={recordsType} />
                        }
                        {
                            disableTransition ?
                                data.map(row => (
                                    <React.Fragment key={row[primaryKey]}>
                                        {renderItem(row, view)}
                                    </React.Fragment>
                                ))
                                :


                                data.map((row) => (
                                    <React.Fragment key={row[primaryKey]}>
                                        {renderItem(row, view)}
                                    </React.Fragment>
                                ))


                        }
                    </ListComponent>
                }
                {
                    data.length > 0 && view === "grid" &&
                    <Grid container spacing={3} sx={sx}>
                        {
                            data.map(row => (
                                <React.Fragment key={row[primaryKey]}>
                                    {renderItem(row)}
                                </React.Fragment>
                            ))
                        }
                    </Grid>

                }
                {footer}
                <Divider />
                <Div sx={{ textAlign: 'right', m: 1 }}>
           {/*          <Typography sx={{ mr: 1, display: 'inline', mt: 2 }}>Items Per Page</Typography> */}
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        size='small'
                        value={itemsPerPage}
                        onChange={onLimitPerPageChange}
                        sx={{ mr: 2 }}
                    >
                        {itemsPerPageOptions?.map((option) =>
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        )}
                    </Select>
                </Div>
            </JumboListWrapper>
        </JumboListContext.Provider>
    );
});

JumboList.defaultProps = {
    onPageChange: () => {
    },
    onSelectionChange: () => {
    },
    onItemsPerPageChange: () => {
    },
    onSelectedItemsReset: () => {
    },
    page: 0,
    view: "list"
};

JumboList.propTypes = {
    header: PropTypes.node,
    toolbar: PropTypes.node,
    footer: PropTypes.node,
    recordsType: PropTypes.string,
    data: PropTypes.array.isRequired,
    primaryKey: PropTypes.string.isRequired,
    renderItem: PropTypes.func.isRequired,
    totalCount: PropTypes.number,
    itemsPerPage: PropTypes.number,
    itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    onPageChange: PropTypes.func,
    onSelectionChange: PropTypes.func,
    onItemsPerPageChange: PropTypes.func,
    multiSelectOptions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.node,
        selectionLogic: PropTypes.func,
    })),
    noDataPlaceholder: PropTypes.node,
    wrapperComponent: PropTypes.object,
    wrapperSx: PropTypes.object,
    component: PropTypes.object,
    componentElement: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    sx: PropTypes.object,
    itemSx: PropTypes.object,
    isLoading: PropTypes.bool,
    disableTransition: PropTypes.bool,
    view: PropTypes.oneOf(["list", "grid"]),
};

export default JumboList;
