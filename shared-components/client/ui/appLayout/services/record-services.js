import axios from "./config";
import AccountsService from "../../graphql/services/accounts/accounts-service";
import TutorsService from "../../graphql/services/tutors/tutors-service";
import StudentsService from "../../graphql/services/students/students-service";
import ModulesService from "../../graphql/services/modules/modules-service";
import MyProgramService from "../../graphql/services/programs/myProgram-services";
import jobsList from "../pages/placementCell/data";
import Admissions from "../../graphql/services/admissions/admission-service";
import StudentGroup from "../../graphql/services/admissions/studentGroup-service";
import { CollegeAdmin } from "../../graphql/services/college-admin/collegeAdmin-services";
import Notifications from "../../graphql/services/notifications/notications-services";
import { PaymentServices } from "../../graphql/services/payment-services/paymentServices";
import { TrainingPartnerServies } from "../../graphql/services/trainingpartners/trainingpartnerservices";
import AssignmentService from "../../graphql/services/assignment-services/assignmentServices";
import { WebinarServicess } from "../../graphql/services/webinarservices/webinarservices";
import PlacementService from "../../graphql/services/placement-prep/placement";
import CompetitiveService from "../../graphql/services/competitive_Prep/entranceexam";

const recordService = {};

recordService.getRecords = async ({ queryKey }) => {
    
    const groupId = (queryKey[1].queryParams.groupId)? queryKey[1].queryParams.groupId : queryKey[1].groupId
    const assignmentId = queryKey[1].queryParams.assignmentId
    const programId= queryKey[1].queryParams.programId
    const interviewPrepId = queryKey[1].queryParams.interviewPrepId
    searchKeywords= queryKey[1].searchKeywords
    const recordsType = queryKey[0];
    userId = queryKey[1].queryParams.userId
    const accountId = queryKey[1].queryParams.accountId
    const shopId = queryKey[queryKey.length - 1].queryParams.id;
    const role = queryKey[1].role
    let records = {};
    let type;
    if(recordsType == "aptitude") {
        type = "Aptitude";
    }else if(recordsType == "technical") {
        type = "Technical";
    }


    if (['accounts', 'tutors', 'students', 'admissions', "modules",
         "myprograms", "internships", "courses", "projects", "placements",
         "jobmatches", "appliedjobs", 'rejectedjobs', 'placedjobs', 'programsList',
         'groups', 'groupList', 'classes', 'studentgroup', 'myadmissions', 'programs',
         'notifications', 'payments', 'sent', "received", "payable", "trainingpartners", 
         'collegeadmins', "transactions", "manualPayments","assignments","questions","todaysclass","lesson-quiz","aptitude",
         "announcement","webinars","join","Webinar",'technical','entranceexam',"quizes"].indexOf(recordsType) !== -1) {
        switch (recordsType) {
            case "tutors":
                return await TutorsService.getRecords(shopId, queryKey[queryKey.length - 1],searchKeywords);
                break;

            case "students":
                if (role == "Admin") {
                    return await StudentsService.trainingPartnerStudents(shopId, queryKey[queryKey.length - 1], role,searchKeywords);
                    break;
                } else if(role == "Master-Admin"){
                    return await StudentsService.getAllStudents(query = null, queryKey[queryKey.length - 1], role,searchKeywords);
                    break;
                } else {
                    return await StudentsService.getRecords(shopId, queryKey[queryKey.length - 1], role,searchKeywords);
                    break;
                }

            case "admissions":
                return await Admissions.getBatches(shopId, queryKey[queryKey.length - 1],searchKeywords);
                break;
            case "classes":
                return await Admissions.getTutorBatches(shopId, queryKey[queryKey.length - 1], userId,searchKeywords);
                break;
            case "myadmissions":
                return await StudentsService.getClasses(shopId, queryKey[queryKey.length - 1],searchKeywords);
                break;
            case "groups":
            
                if (role == "Student") {
                    return await StudentsService.StudentGroups(shopId, queryKey[queryKey.length - 1], userId,searchKeywords);
                } else {
                    return await StudentGroup.getBatches(shopId, queryKey[queryKey.length - 1],searchKeywords);
                }
                return await StudentGroup.getBatches(shopId, queryKey[queryKey.length - 1],searchKeywords);
                break;
            case "modules":
                return await ModulesService.getRecords(shopId, queryKey[queryKey.length - 1], role,searchKeywords);
                break
            case "programs":

                return await StudentsService.getStudentPrograms(shopId, queryKey[queryKey.length - 1], userId,searchKeywords);

                break


                case "aptitude":
                return await PlacementService.getAptitudes(shopId,type,queryKey[queryKey.length - 1],searchKeywords );
                break

                case "technical":
                return await PlacementService.getTechnical(shopId,type,queryKey[queryKey.length - 1], searchKeywords);
                break

                case "entranceexam":
                    return await CompetitiveService.getEntranceExamList(shopId,queryKey[queryKey.length - 1], searchKeywords);
                 break

            case "notifications":

                return await Notifications.getNotifications(shopId, queryKey[queryKey.length - 1], userId,searchKeywords);

                break
            case "sent":

                return await Notifications.notificationsHistory(shopId, queryKey[queryKey.length - 1], userId,searchKeywords);

                break
                case "announcement":

                return await Notifications.notificationsHistory(shopId, queryKey[queryKey.length - 1], userId,searchKeywords,recordsType);

                break
                case "Webinar":
                return await Notifications.getNotifications(shopId, queryKey[queryKey.length - 1], userId,searchKeywords);
                break


                case "webinars":
                    if(role == "Student" || role == "College-Admin" || role == "Tutor") {
                        return await WebinarServicess.getEvrnts(shopId,queryKey[queryKey.length - 1]);
                    } else {
                    return await WebinarServicess.getWebinarRecord(shopId,queryKey[queryKey.length - 1],searchKeywords);
                    }
                break;

                case "join":

                return await WebinarServicess.getEvrnts(shopId, queryKey[queryKey.length - 1], userId,searchKeywords,recordsType);

                break

            case "collegeadmins":
                return await CollegeAdmin.getCollegeAdminRecords(shopId, queryKey[queryKey.length - 1],searchKeywords);
                break;

            case "programsList":

                return await MyProgramService.getDefaultPrograms(shopId, queryKey[queryKey.length - 1], recordsType, role,searchKeywords)

                break;
            case "payments":

                return await PaymentServices.getPaymentsRecord(accountId, queryKey[queryKey.length - 1], recordsType, role,searchKeywords)

                break

                case "assignments":

                return await AssignmentService.getTutorAssignments(accountId, queryKey[queryKey.length - 1], recordsType, role)

                break
                case "questions":

                return await AssignmentService.getQuestions(assignmentId, queryKey[queryKey.length - 1], recordsType, role)

                break

            case "received":

                return await PaymentServices.getReceivedPaymentsRecord(accountId, queryKey[queryKey.length - 1], recordsType, role,searchKeywords)

                break

            case "payable":

                return await PaymentServices.getReceivedPayableRecord(accountId, queryKey[queryKey.length - 1], recordsType, role,searchKeywords)

                break
            case "transactions":

                return await PaymentServices.transactionsHistory(accountId, queryKey[queryKey.length - 1], recordsType, role, shopId,searchKeywords)

                break
                case "manualPayments":

                return await PaymentServices.getManualPayments(accountId, queryKey[queryKey.length - 1], recordsType, role, shopId,searchKeywords)

                break

            case "trainingpartners":

                return await TrainingPartnerServies.getTrainingPartnersRecord(accountId, queryKey[queryKey.length - 1],searchKeywords)

                break


            case "todaysclass":

            return await StudentsService.getTodaysClass(groupId, queryKey[queryKey.length - 1],searchKeywords);

            break

            case "lesson-quiz":
                return await MyProgramService.getProgram(programId,queryKey[queryKey.length - 1],searchKeywords)
            case "quizes":

            return await PlacementService.getAptitudeQuizes(shopId, interviewPrepId, queryKey[queryKey.length - 1]);

            break

            case "groupList":
                if (role == "Student") {
                    return await StudentsService.StudentGroupBatches(groupId, queryKey[queryKey.length - 1],searchKeywords);
                } else {
                    return await CollegeAdmin.getGroupStudents(groupId, queryKey[queryKey.length - 1],searchKeywords)
                }
                break
            case "myprograms":
            case "internships":
            case "courses":
            case "projects":
                return await MyProgramService.getRecords(shopId, queryKey[queryKey.length - 1], recordsType,searchKeywords);
                break;
            case "placements":
                records['placements'] = jobsList.map(data => {
                    return {
                        id: data.id,
                        CandidateName: data.CandidateName,
                        jobTitle: data.jobTitle,
                        company: data.company,
                        location: data.location,
                        platform: data.platform,
                        isApply: data.isApply,
                        matchedAt: data.matchedAt,
                        score: data.score,
                        hrEmail: data.hrEmail,
                        jobDescription: data.jobDescription,
                        postStatus: data.postStatus,
                        jobLink: data.jobLink,
                    }
                });
                return records;
                break;
            case "jobmatches":
                records['jobmatches'] = jobsList.map(data => {
                    return {
                        id: data.id,
                        CandidateName: data.CandidateName,
                        jobTitle: data.jobTitle,
                        company: data.company,
                        location: data.location,
                        platform: data.platform,
                        isApply: data.isApply,
                        matchedAt: data.matchedAt,
                        score: data.score,
                        hrEmail: data.hrEmail,
                        jobDescription: data.jobDescription,
                        postStatus: data.postStatus,
                        jobLink: data.jobLink

                    }
                });
                return records;
                break;

            case "appliedjobs":
                records['appliedjobs'] = jobsList.filter(data => data.postStatus == "Applied");
                return records;
                break;

            case "rejectedjobs":
                records['rejectedjobs'] = jobsList.filter(data => data.postStatus == "Rejected");
                return records;
                break;

            case "placedjobs":
                records['placedjobs'] = jobsList.filter(data => data.postStatus == "Placed");
                return records;
                break;



        }




    }
    return [];
};

recordService.getLabels = async () => {
    const { data } = await axios.get("/records/labels");
    return data;
};

recordService.add = async (record) => {
    const { data } = await axios.post("/records/add-record", record);
    return data;
};


recordService.updateTutorStatus = async (record) => {

    return await TutorsService.updateStatus(record);

};
recordService.update = async (record) => {

    const { data } = await axios.put("/records/update-record", record);
    return data;
};

recordService.delete = async (record) => {

    if (record.recordType == "Tutor") {
        
        const data = record.record;
        const shopId = record.shopId;
        return await TutorsService.remove({data, shopId});
    }
    if (record.recordType == "Student") {
        const data = record.record
        return await StudentsService.delete(data);
    }
    if (record.recordType == "Admissions") {
        const data = record.record
        return await Admissions.delete(data);
    }
    if (record.recordType == "myadmissions") {
        const data = record.record
        return await StudentsService.delete(data);
    }
    if (record.recordType == "StudentGroup") {
        const data = record.record
        return await StudentGroup.delete(data);
    }
    if (record.recordType == "Module") {
        const productId = record.record.id
        return await ModulesService.delete(productId);
    }
    if (record.recordType == "groups") {
        const groupId = record.id
        return await CollegeAdmin.delete(groupId)
    }
    if (record.recordType == "collegeadmins") {
        const data = record.record
        return await CollegeAdmin.delete(data);
    }

    return data;
};



recordService.deleteMultiple = async (queryData) => {
    
    let { Ids } = queryData;
    let { role } = queryData;
    let { recordsType } = queryData;
    let { shopId = null} = queryData;

    switch(recordsType) {
        case "modules":
            return await ModulesService.deleteProducts(Ids, role);
            break;
        case "myprograms":
            if(role == "Admin") {
                return await MyProgramService.deletePrograms(Ids, role);
            }else if(role == "College-Admin") {
                return await MyProgramService.removeMulitplePrograms({Ids, shopId});
            }
            break;
        case "admissions":
            return await Admissions.deleteBatches(Ids, role);
            break;
        case "tutors":
            return await TutorsService.removeTutors(Ids, shopId)
    }
};

recordService.inviteUsers = async (record) => {

    return await AccountsService.inviteUsers(record);

};

export { recordService };