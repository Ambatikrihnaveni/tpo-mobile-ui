import BaseService from "../base-service";
import studentsQuery from "./queries/students";
import tutorStudentsQuery from "./queries/tutorStudents";
import instituteProgramsQuery from "./queries/institutePrograms";
import tutorProgramsQuery from "./queries/tutorPrograms";
import programsQuery from "../programs/queries/programs";
import tutorsQuery from "../tutors/queries/tutors";
import getStudentEnroleProgramsBatches from '../students/queries/studentClasses';
import ordersByAccountId from '../payment-services/queries/paymentRecords';
import programs from '../programs/queries/programs';
import modulesQuery from '../modules/queries/modules'
import tutorModules from "../modules/queries/tutorModules";
import tutorClassesQuery from '../admissions/queries/tutorClaseses';
import trainingPartnerStudents from "../students/queries/trainingPartnerStudents";
import paymentRecords from "../payment-services/queries/paymentRecords";
import studentEnrolePrograms from '../students/queries/studentEnrolePrograms'
import studentAssignedGroups from "../students/queries/studentAssignedGroups";
import defaultPrograms from "../programs/queries/defaultPrograms";
import todaySchedule from "./queries/todaySchedule";
import tutorTodaySchedule from "./queries/tutorTodaySchedule";
import studentTodaySchedule from "./queries/studentTodaySchedule"
import defaultProgramsQuery from '../programs/queries/defaultPrograms'
import colleges from "../../../appLayout/shared/widgets/MA Colleges/colleges";
import institutesQuery from "./queries/institutesQuery";
import collegeAdminRecordQuery from "../college-admin/queries/collegeAdminRecord";
import allStudentsQuery from "./queries/allStudents";
import onGoingProgramsQuery from "./queries/onGoingPrograms";
import events from "../webinarservices/queries/events";
import webinars from "../webinarservices/queries/webinars";
const ProgramsAssigned = [

    {
        name: 'Jumbo',
        student: "10",
        colorCode: '#03DAC5',
        type: "Project",

    },
    {
        name: 'React',
        type: "cource",
        student: "24",
        colorCode: '#FF9F1C',

    },
    {
        name: 'Flexile',
        type: "Project",
        student: "32",
        colorCode: '#55DDE0',

    },
    {
        name: 'Jumbo',
        student: "10",
        colorCode: '#03DAC5',
        type: "Project",

    },
    {
        name: 'React',
        type: "cource",
        student: "24",
        colorCode: '#FF9F1C',

    },
    {
        name: 'Flexile',
        type: "Project",
        student: "32",
        colorCode: '#55DDE0',

    },
    {
        name: 'Jumbo',
        student: "10",
        colorCode: '#03DAC5',
        type: "Project",

    },
    {
        name: 'React',
        type: "cource",
        student: "24",
        colorCode: '#FF9F1C',

    },
    {
        name: 'Flexile',
        type: "Project",
        student: "32",
        colorCode: '#55DDE0',

    }, {
        name: 'Jumbo',
        student: "10",
        colorCode: '#03DAC5',
        type: "Project",

    },
    {
        name: 'React',
        type: "cource",
        student: "24",
        colorCode: '#FF9F1C',

    },
    {
        name: 'Flexile',
        type: "Project",
        student: "32",
        colorCode: '#55DDE0',

    },

];

const TutorClass = [
    {
        name: 'Tally',
        student: "10",
        time: "10:00 AM - 1:00:PM",
        type: "Project",

    },
    {
        name: 'MERN Stack',
        time: "2:00 PM - 3:00:PM",
        student: "24",
        colorCode: '#FF9F1C',

    },
    {
        name: 'Front-End Developer',
        type: "Project",
        time: "4:00 PM - 8:00:PM",
        student: "32",
        colorCode: '#55DDE0',

    },
    {
        name: 'Back-End Developer',
        type: "cource",
        time: "11:00 PM - 12:00:PM",
        student: "24",
        colorCode: '#FF9F1C',

    },
    {
        name: 'Sale',
        type: "Project",
        time: "5:00 PM - 1:00:PM",
        student: "32",
        colorCode: '#55DDE0',

    },
    {
        name: 'Front-End Developer',
        type: "Project",
        time: "4:00 PM - 8:00:PM",
        student: "32",
        colorCode: '#55DDE0',

    },
    {
        name: 'Back-End Developer',
        type: "cource",
        time: "11:00 PM - 12:00:PM",
        student: "24",
        colorCode: '#FF9F1C',

    },
    {
        name: 'Sale',
        type: "Project",
        time: "5:00 PM - 1:00:PM",
        student: "32",
        colorCode: '#55DDE0',

    },
];

const OngoingPrograms = [
    {
        program: 'Tally with Gst%',
        college: 'Nit',
        trainingpartner: 'Mastan Khan Patan'
    },
    {
        program: 'Mern Stack',
        college: 'Sten',
        trainingpartner: 'Koti'


    },
    {
        program: 'Frontend Developement',
        college: 'Tec',
        trainingpartner: 'Virat'


    },


]

const paymentHistory = [
    {

        program: ' Engineering',
        TrainingPartner: 'Full stack',
        Status: 'Approved',

    },
    {
        program: 'Mern',
        TrainingPartner: 'Full stack',
        Status: 'Pending',

    },
    {
        program: 'Gst',
        TrainingPartner: 'Full stack',
        Status: 'Reject',


    },
    {
        program: 'Git',
        TrainingPartner: 'Full stack Engineering',
        Status: 'Pending',


    }
]
const Colleges = [
    {
        colleges: "NEC",
        students: "150"
    },
    {
        colleges: "SS&N Degree",
        students: "300"
    },
    {
        colleges: "PNC &KR",
        students: "450"
    },
    {
        colleges: "JNTUK Narasaraopet",
        students: "500"
    },
    {
        colleges: "Kakatiya Degree College",
        students: "100"
    }


]

const TrainingPartners = [
    {
        Trainingpartner: 'Fullstack Engineering Academy',
        Programs: '15'
    },
    {
        Trainingpartner: 'Prahan Soft Academy',
        Programs: '25'
    },
    {
        Trainingpartner: 'Enlighten Academy',
        Programs: '35'
    },
    {
        Trainingpartner: 'Bright Institute',
        Programs: '50'
    },
    {
        Trainingpartner: 'Fullstack Engineering Academy',
        Programs: '60'
    },
    {
        Trainingpartner: 'Prahansoft Academy',
        Programs: '40'
    },

]

export default class MyDashboardService {
    static async instituteStudents(shopId) {
        let students;
        const { data } = await BaseService.executeQueryWithVariables(trainingPartnerStudents, {
            shopId: shopId,
        })
        students = data?.trainingPartnerStudents
        return students;
    }

    static async tutorStudents(shopId) {
        let students;
        const { data } = await BaseService.executeQueryWithVariables(tutorStudentsQuery, {
            shopId: shopId
        })
        students = data?.tutorStudents;
        return students;
    }


    static async institutePrograms(input) {
        const { shopId, type, query } = input;
        const { data } = await BaseService.executeQueryWithVariables(instituteProgramsQuery, {
            shopId,
            type,
            query
        });
        let programs = data?.programs;
        return programs;
    }

    static async tutorInterships(input) {
        const { type } = input;
        const { data } = await BaseService.executeQueryWithVariables(tutorProgramsQuery, {
            type
        });
        let programs = data?.tutorPrograms;
        return programs;
    }
    static async programs(shopId) {
        const { data } = await BaseService.executeQueryWithVariables(programsQuery, {
            shopId: shopId,
            type: ""
            // query: queryParams.keywords
        });
        const programs = data?.programs;
        return programs;
    }

    static async getEvents(shopId) {
        const { data } = await BaseService.executeQueryWithVariables(events, {
            shopId: shopId,
            query: null
        })
        const records = data?.events
        return records
    }

    static async getWebinars() {
        const { data } = await BaseService.executeQueryWithVariables(webinars, {})
        const records = data?.webinars
        return records
    }


    static async getOngoingPrograms(query = null) {
        const { data } = await BaseService.executeQueryWithVariables(onGoingProgramsQuery, {
            query
        });

        let onGoingProgramsData = data?.onGoingPrograms
        return onGoingProgramsData;
    }
    static async dashbordTutors(input) {

        const { data } = await BaseService.executeQueryWithVariables(tutorsQuery, {
            shopId: input
        });
        let tutors = data?.tutors;
        return tutors;
    }
    static async getProgramsAssigned() {
        return ProgramsAssigned;
    }
    static async getCollegesData(query = null) {
        const { data } = await BaseService.executeQueryWithVariables(collegeAdminRecordQuery, {
            query
        });

        let collegesData = data?.collegeAdmins;
        return collegesData;
    }
    static async getTrainingPartnersData(query = null) {
        const { data } = await BaseService.executeQueryWithVariables(institutesQuery, {
            query
        });

        const institutesData = data?.defaultShops;
        return institutesData;
    }


    static async getTutorClass({ tutorId, shopId }) {

        const { data } = await BaseService.executeQueryWithVariables(tutorClassesQuery, {
            tutorId,
            shopId
        })
        return data;
    }

    static async getTutorModules(shopId, query = null) {
        const { data } = await BaseService.executeQueryWithVariables(tutorModules, {
            shopId,
            query
        })
        return data;
    }

    static async getUpcomingPayments(accountId, role) {

        const { data } = await BaseService.executeQueryWithVariables(paymentRecords, {
            accountId,
            role
        })

        const upcoming = data?.ordersByAccountId
        return upcoming
    }
    static async getReceivedPayments(accountId, role) {

        const { data } = await BaseService.executeQueryWithVariables(paymentRecords, {
            accountId,
            role
        })

        const received = data?.ordersByAccountId
        return received
    }
    static async getStudentClasses() {

        const { data } = await BaseService.executeQueryWithVariables(getStudentEnroleProgramsBatches)

        const classes = data.getStudentEnroleProgramsBatches
        return classes
    }
    static async defaultProgramsQuery() {

        const { data } = await BaseService.executeQueryWithVariables(defaultProgramsQuery)

        const programs = data
        return programs
    }

    static async getTutorBatches(shopId, userId) {
        const { data } = await BaseService.executeQueryWithVariables(getTutorBatches, {
            shopId: shopId,
            tutorId: userId
        })
        let records = {};
        records = data.getTutorBatches
        return records
    }
    static async trainingPartnerStudents(shopId) {

        const { data } = await BaseService.executeQueryWithVariables(trainingPartnerStudents, {
            shopId: shopId
        })

        const records = data.trainingPartnerStudents
        return records
    }
    static async getProgramAssigned(accountId, role) {

        const { data } = await BaseService.executeQueryWithVariables(ordersByAccountId, { accountId, role })

        const ProgramAssigned = data.ordersByAccountId
        return ProgramAssigned
    }
    static async getPrograms(shopId, type = null) {
        const { data } = await BaseService.executeMutationWithVariables(programs, {
            shopId
        })

        const CAPrograms = data?.programs
        return CAPrograms
    }

    static async dashBoardModules(shopId) {
        const { data } = await BaseService.executeMutationWithVariables(modulesQuery, {
            shopIds: shopId
        })

        const modules = data.products
        return modules
    }

    static async getStudentPrograms() {
        const { data } = await BaseService.executeQueryWithVariables(studentEnrolePrograms, {
            type: ''
        })

        const studentPrograms = data?.studentEnrolePrograms
        return studentPrograms
    }


    static async getStudentGroups(shopId) {
        const { data } = await BaseService.executeQueryWithVariables(studentAssignedGroups, {
            shopId: shopId
        })

        const studentGroups = data?.studentAssignGroups
        return studentGroups
    }
    static getPaymentHistory() {
        return paymentHistory;
    }
    static async getMAPrograms() {
        const { data } = await BaseService.executeMutationWithVariables(defaultPrograms, {
            type: ''
        })
        const MaPrograms = data?.defaultPrograms
        return MaPrograms;
    }

    //Get the Today's Schedule for Training-Partner
    static async getTodaySchedule(shopId) {

        const { data } = await BaseService.executeMutationWithVariables(todaySchedule, { shopId });

        const schedule = data?.todaySchedule;

        return schedule;
    }

    //Get the Today's Schedule for Tutor
    static async getTutorTodaySchedule(shopId) {

        const { data } = await BaseService.executeMutationWithVariables(tutorTodaySchedule, { shopId });

        const schedule = data?.tutorTodaySchedule;

        return schedule;
    }

    //Get the Today's Schedule for Student
    static async getStudentTodaySchedule(query = null) {

        const { data } = await BaseService.executeMutationWithVariables(studentTodaySchedule, { query });

        const schedule = data?.studentTodaySchedule;

        return schedule;
    }

    //Get the All Students data for TPO.ai
    static async getAllStudents(query = null) {

        const { data } = await BaseService.executeMutationWithVariables(allStudentsQuery, { query });

        const allStudentsData = data?.allStudents;

        return allStudentsData;
    }
}
