import React from 'react';
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import TutorItem from './TutorItem';
import StudentItem from './StudentItem';
import ModuleItem from './moduleItem';
import ProgramItem from './programitem';
import InternshipItem from './internshipItem';
import CourceItem from './courceItem';
import ProjectItem from './projectItem';
import PlacementItem from './placementItem';
import JobmatchesItem from './jobmatchesIteam';
import jobsList from '../../../../placementCell/data';
import ApplayjobItem from './applayjobitem';
import RejectjobItem from './rejectjobitem';
import PlacedjobItem from './placedjobitem';
import ProgramListItem from './ProgramListItem';
import AdmissionItem from './admissionItem';
import StudentGroupItem from './StudentGroupsIteam';
import StudentClassesItem from './studentClassesItem';
import GroupPreviewItem from './GroupPreviewItem';
import TutorClassBatchItem from './tutorClassBatchItem';
import StudentProgramItem from './studentprogramitem';
import NotificationItem from './notificationItem';
import EventNotifications from './eventNotificationsIteam';
import PaymentsItem from './paymentsItem';
import PaymentPayable from './paymentpayable';
import TrainingPartnerItem from './trainingpartneritem';
import CollegeAdminItem from './collegeAdminItem';
import PaymentTransactions from './paymentTransactions';
import ManualPaymentsItem from './manualPaymentsItem';
import AssignmentItem from './assignmentitem';
import AssignmentQuestionItem from './assignmentquestionitem';
import TodayClass from './todayClassItem';
import WebinarItem from './webinarItem';
import TriningpartnerJoin from "./trainingpartnerjoinitem";
import useAuth from '../../../../../../hooks/useAuth';
import AnnouncementItem from './announcementitem';
import WebinarhostItem from './webnarhostitem';
import Aptitude from '../../../../placement_prep/aptitude/aptitude';
import Technical from '../../../../placement_prep/aptitude/technical';
import EntranceExamItem from '../../../../competitive_Prep/entranceexam/enterenceExams/entranceExamItem';
import FreeQuizzes from './freeQuizzes';
import PlacementStartQuiz from '../../../../placement_prep/aptitude/placementstartQuiz';


const RecordItem = ({ record, view, recordType, importedEmails, setImportedEmails }) => {

    const { viewer } = useAuth();
    const role = viewer?.role;

    if (recordType == "tutors") {
        return (<TutorItem record={record} view={view} />);
    }
    if (recordType == "groupList") {
        return (<GroupPreviewItem record={record} view={view} />)
    }
    if (recordType == "students") {
        return (<StudentItem record={record} view={view} />);
    }
    if (recordType == "modules") {
        return (<ModuleItem record={record} view={view} />);
    }
    if (recordType == "programsList") {
        return (<ProgramListItem record={record} view={view} />)
    }
    if (recordType == "myprograms") {
        return (<ProgramItem record={record} view={view} />)
    }
    if (recordType == "internships") {
        return (<InternshipItem record={record} view={view} />)
    }
    if (recordType == "courses") {
        return (<CourceItem record={record} view={view} />)
    }
    if (recordType == "projects") {
        return (<ProjectItem record={record} view={view} />)
    } else if (recordType == "placements") {
        return (<JobmatchesItem record={record} view={view} />)
    }
    if (recordType == "jobmatches") {
        return (<JobmatchesItem record={record} view={view} />)
    }
    if (recordType == "appliedjobs") {
        return (<ApplayjobItem record={record} view={view} />)
    }
    if (recordType == "notifications" || recordType == "sent") {
        return (<NotificationItem record={record} recordType={recordType} />)
    }
    if (recordType == "rejectedjobs") {
        return (<RejectjobItem record={record} view={view} />)
    }
    if (recordType == "placedjobs") {
        return (<PlacedjobItem record={record} view={view} />)
    }

    if (recordType == "admissions") {
        return (<AdmissionItem record={record} view={view} />)
    }
    if (recordType == "myadmissions") {
        return (<StudentClassesItem record={record} view={view} />)
    }
    if (recordType == "classes") {
        return (<TutorClassBatchItem record={record} view={view} />)
    }
    if (recordType == "groups") {
        return (<StudentGroupItem record={record} view={view} recordType={recordType} />)
    }
    if (recordType == "programs") {
        return (<StudentProgramItem record={record} view={view} recordType={recordType}/>)
    }
    if (recordType == "payments" || recordType == "received") {
        return (<PaymentsItem record={record} view={view} recordType={recordType} />)
    }
    if (recordType == "payable") {
        return (<PaymentPayable record={record} view={view} recordType={recordType} />)
    }
    if (recordType == "transactions") {
        return (<PaymentTransactions record={record} view={view} recordType={recordType} />)
    }
    if(recordType=="collegeadmins"){
        return(<CollegeAdminItem record={record} view={view}/>)
    }

    if(recordType== "manualPayments"){
        return(<ManualPaymentsItem record={record} view={view}/>)

    }

    if(recordType == "trainingpartners"){
        return(<TrainingPartnerItem record={record} view={view} recordType={recordType}/>)
    }
    if(recordType == "assignments"){
        return(<AssignmentItem record={record} view={view} recordType={recordType}/>)
    }
    if(recordType == "questions"){
        return(<AssignmentQuestionItem record={record} view={view} recordType={recordType}/>)
    }
    if(recordType == "aptitude"){
        return(<Aptitude record={record} view={view} recordType={recordType}/>)
    }
    if(recordType == "technical"){
        return(<Technical  record={record} view={view} recordType={recordType}/>)
    }
    if(recordType == "entranceexam"){
        return(<EntranceExamItem  record={record} view={view} recordType={recordType}/>)
    }
    if(recordType == "todaysclass"){
        return(<TodayClass record={record} view={view} recordType={recordType}/>)
    }
    if(recordType == "lesson-quiz"){
        return(<FreeQuizzes record={record} view={view} recordType={recordType}/>)
    }
    if(recordType == "webinars"){
        if(role == "College-Admin" || role == "Tutor" || role == "Student") {
            
            return(<EventNotifications record={record} view={view} recordType={recordType} />)
        } else {
            
            return(<WebinarhostItem record={record} recordType={recordType} view={view}  />)

        }
    }

    if(recordType == "join"  ){
        return(<TriningpartnerJoin record={record} recordType={recordType}  view={view} />)
    }
    if(recordType == "announcement"  ){
        return(<AnnouncementItem record={record} recordType={recordType}  view={view}  />)
    }

    if(recordType == "quizes"  ){
        return(<PlacementStartQuiz record={record} recordType={recordType}  view={view}  />)
    }
   



    return (<div>Record Item for this record not found</div>);


};

export default RecordItem;
