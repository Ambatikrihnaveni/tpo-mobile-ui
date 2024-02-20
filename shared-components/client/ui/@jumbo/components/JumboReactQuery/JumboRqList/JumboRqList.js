import React, { useState } from 'react';
import PropTypes from 'prop-types';
import JumboList from "@jumbo/components/JumboList";
import { useQuery, useQueryClient } from "react-query";
import { getArrayElementFromKey } from "@jumbo/utils";
import useAuth from '../../../../hooks/useAuth';
import { useParams } from 'react-router-dom';


const JumboRqList = React.forwardRef((props, ref) => {
 
    const {
        queryOptions, service, primaryKey,
        itemsPerPageOptions, toolbar, multiSelectOptions,
        onSelectionChange, renderItem, noDataPlaceholder,
        wrapperComponent, wrapperSx, component, sx, componentElement, itemSx,
        transition, view, onRefresh, recordsType, searchKeywords
    } = props;
    const params = useParams();
    const groupId = params.groupId
    const programId= params.programId
    const interviewPrepId = params.interviewPrepId
    const listRef = React.useRef();
    const { viewer } = useAuth()
    const [filteredData, setFilteredData] = useState([])
    const [listData,setListData]= useState([])
    const [totalCount,setTotalCount] = useState(0)
    const [itemsPerPage,setRowsPerPage] = useState(8)
    const [key, setKey] = React.useState([
        queryOptions.queryKey,
        { queryParams: queryOptions.queryParams, page: 0, limit: itemsPerPage, shopId: queryOptions.shopId, role: viewer?.role, userId: viewer?._id, groupId: groupId,searchKeywords:searchKeywords, programId: programId ,interviewPrepId:interviewPrepId}
    ]);
    const listQuery = useQuery(key, service);
    const queryClient = useQueryClient();
    React.useImperativeHandle(ref, () => ({
        async refresh() {
            listRef.current.resetSelection();
            await queryClient.invalidateQueries(queryOptions.queryKey);
            await listQuery.refetch();
            onRefresh();
        },
    }));

    React.useEffect(() => {
        if (searchKeywords.length > 2) {
          setKey([queryOptions.queryKey, {
            ...key[1],
            queryParams: queryOptions.queryParams,
            searchKeywords: searchKeywords 
          }]);
        } else if (searchKeywords.length === 0) {
          setKey([queryOptions.queryKey, {
            ...key[1],
            queryParams: queryOptions.queryParams,
            searchKeywords: ''
          }]);
        }
      }, [queryOptions, searchKeywords]);

      const handlePageChange = React.useCallback(async (pageNumber) => {
        ;
        const newKey = [recordsType, {
            queryParams: queryOptions.queryParams,
            ...key[1],
            limit: itemsPerPage, 
            groupId: groupId,
            programId:programId,
            interviewPrepId:interviewPrepId,
            page: pageNumber
        }];
        setKey(newKey);
        setRowsPerPage(itemsPerPage);
        await queryClient.invalidateQueries(queryOptions.queryKey);
        await listQuery.refetch();
        onRefresh();
    }, [queryOptions, itemsPerPage, key, queryClient, listQuery, onRefresh, recordsType, groupId, programId,interviewPrepId]);
    

    const handleItemsPerPageChange = React.useCallback(async (newValue) => {
        ;
        const newItemsPerPage = newValue?.target?.value;
        setRowsPerPage(newItemsPerPage);
            const newKey = [key[0], {
            ...key[1],
            limit: newItemsPerPage,
        }];
    
        setKey(newKey);
        await queryClient.invalidateQueries(queryOptions.queryKey);
        await listQuery.refetch();
            onRefresh();
    }, [listQuery, queryClient, queryOptions, key, onRefresh]);

    const queryData = React.useMemo(() => {
        const dataArray = getArrayElementFromKey(listQuery?.data, queryOptions?.dataKey)
       
        if (!Array.isArray(dataArray)) {
            return {
                data: [],
                totalCount: 0,
            }
        }
        return {
            data: dataArray,
            totalCount: getArrayElementFromKey(listQuery?.data, queryOptions.countKey),
        };
    }, [listQuery, queryOptions]);

    /*    React.useEffect(() => {
           
           const filtered = queryData?.data?.filter(data =>
             data?.groupName?.toLowerCase().includes(searchKeywords.toLowerCase())
           );
           setFilteredData(filtered);
         }, [searchKeywords,recordsType]);
    */
/* 
    React.useEffect(() => {
            
            const filtered = queryData?.data?.filter(data => {
            const GroupName = data?.groupName?.toLowerCase()?.includes(searchKeywords?.toLowerCase());
            const Modules = recordsType === "modules" && data?.title?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                 (data?.account?.name.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                 (data?.startDate?.includes(searchKeywords));

            const Programs = recordsType === "programsList" && data?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase());

            const Program = recordsType === "programs" && data?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                (data?.account?.name.toLowerCase()?.includes(searchKeywords?.toLowerCase()));
            ;

            const Tutors = recordsType === "tutors" && data?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                (data?.email?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.phoneNumber?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.status?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.qualification?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))

            const Admissions = recordsType === 'admissions' && data?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                (data?.program?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.createdAt?.includes(searchKeywords));

            const Myprograms = recordsType === 'myprograms' && data?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                (data?.type?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                    (data?.account?.name.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                    ("isApproved"?.includes(searchKeywords?.toLowerCase()) && data?.isApproved == true) ||
                    ("Pending"?.includes(searchKeywords?.toLowerCase()) && data?.isApproved == false)
                );


            const GroupList = recordsType === 'groupList' && (data?.id?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                ("verified"?.includes(searchKeywords?.toLowerCase()) && data?.verified == true) ||
                ("invited"?.includes(searchKeywords?.toLowerCase()) && data?.invited == true) ||
                ("logged"?.includes(searchKeywords?.toLowerCase()) && data?.logged == true)  ||
                (data?.studentEmail?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                data?.createdAt?.includes(searchKeywords)

            );
            const Courses = recordsType === 'courses' && (
                data?.name.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||

                (data?.account?.name.toLowerCase()?.includes(searchKeywords?.toLowerCase()))
            );

            const Internships = recordsType === 'internships' && (
                data?.name.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                (data?.account?.name.toLowerCase()?.includes(searchKeywords?.toLowerCase()))
            );

            const Projects = recordsType === "projects" && data?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase())
            const Classes = recordsType === 'admissions' && data?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase())

            const Class = recordsType === 'classes' && data?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                (data?.program?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                (data?.startDate?.includes(searchKeywords))
                )


            const Students = recordsType === "students" && data?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                (data?.email?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.phoneNumber?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.colleges?.some(college => college.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase())))
             

            const Groups = recordsType === "groups" && data?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                (data?.account?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))

            const Payment = recordsType === "payments" && data?.batchName?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                (data?.groupName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.institute?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.programName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.date?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                ((data?.price?.toString())?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                ((data?.studentData?.toString())?.includes(searchKeywords))

            const ReceivedPayment = recordsType === "received" && data?.batchName?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                (data?.groupName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.institute?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.programName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.date?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                ((data?.price?.toString())?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                ((data?.studentData?.toString())?.includes(searchKeywords))


            const Notification = recordsType === "sent" && data?.from?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                (data?.to?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.message?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))

                const Inbox = recordsType === "notifications" && data?.from?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                (data?.to?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.message?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))
    

            const TrainingPartner = recordsType === "trainingpartners" && data?.contact?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                (data?.date?.includes(searchKeywords)) ||
                (data?.institute?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.location?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.city?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))

                const Transaction = recordsType === "transactions" && data?.date?.includes(searchKeywords?.toLowerCase()) ||
                (data?.date?.includes(searchKeywords)) ||
                (data?.transactionId?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                (data?.amount?.includes(searchKeywords)) ||
                (data?.instituteName?.includes(searchKeywords?.toLowerCase()))

            const ManualPayment = recordsType === "manualPayments" && data?.date?.includes(searchKeywords) ||
                  (data?.studentName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                  (data?.groupName?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))   ||
                  (data?.institute?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))   ||
                  (data?.programName?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))  ||
                  (data?.batchName?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))   ||
                  (data?.price?.toString()?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                  (data?.status?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) 

            
            const Todaycalss = recordsType === "todaysclass" && data?.date?.includes(searchKeywords) ||
                  (data?.lessonName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
                  (data?.programName?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))||
                  (data?.assignmentStatus?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))
             








            return GroupName || Programs || Tutors
                || Admissions || Myprograms || GroupList || Courses
                || Internships || Projects || Classes || Students
                || Class || Program || Groups || Payment || Notification ||Inbox
                || ReceivedPayment || TrainingPartner ||Transaction ||ManualPayment ||Todaycalss;

        });

        setFilteredData(filtered);
    }, [searchKeywords]); */


    return (
        <JumboList
            ref={listRef}
            data={queryData.data}
           // data={(searchKeywords != "") ? filteredData : queryData.data}
            primaryKey={primaryKey}
            searchKeywords={searchKeywords}
            renderItem={renderItem}
            itemsPerPage={itemsPerPage}
            totalCount={queryData.totalCount}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPageOptions={itemsPerPageOptions}
            toolbar={toolbar}
            recordsType={recordsType}
            onSelectionChange={onSelectionChange}
            multiSelectOptions={multiSelectOptions}
            noDataPlaceholder={noDataPlaceholder}
            isLoading={listQuery?.isLoading}
            wrapperComponent={wrapperComponent}
            wrapperSx={wrapperSx}
            componentElement={componentElement}
            itemSx={itemSx}
            component={component}
            sx={sx}
            page={key[1].page}
            transition={transition}
            view={view}
        />
    );
});

JumboRqList.defaultProps = {
    onRefresh: () => {
    }
};

JumboRqList.propTypes = {
    service: PropTypes.func.isRequired,
    multiSelectOptions: PropTypes.array,
    itemsPerPage: PropTypes.number,
    noDataPlaceholder: PropTypes.node,
    renderItem: PropTypes.func,
    header: PropTypes.node,
    footer: PropTypes.node,
    recordsType: PropTypes.string,
    toolbar: PropTypes.node,
    onSelectionChange: PropTypes.func,
    onRefresh: PropTypes.func,
    primaryKey: PropTypes.string.isRequired,
    queryOptions: PropTypes.shape({
        queryKey: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array
        ]).isRequired,
        queryParams: PropTypes.object,
        countKey: PropTypes.string,
        dataKey: PropTypes.string.isRequired,
    }).isRequired,
    wrapperComponent: PropTypes.object,
    wrapperSx: PropTypes.object,
    component: PropTypes.object,
    componentElement: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    sx: PropTypes.object,
    itemSx: PropTypes.object,
    disableTransition: PropTypes.bool,
};

export default JumboRqList;
