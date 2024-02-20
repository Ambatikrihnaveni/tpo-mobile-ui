import BaseService from "../base-service";
import TutorAssignments from "./queries/tutorassignments";
import TutorCalendarEventDetails from "./queries/tutorCalendarEventDetails";
import StudentLesson from './queries/studentCalendarEventDetails'
import assignmentDetails from "./queries/assignmentDetails";
import evaluateAssignment from "./mutations/evaluate"
export default class AssignmentService {

  static async getTutorAssignments(account_id, { page, limit, queryParams }) {
    const { data } = await BaseService.executeQueryWithVariables(TutorAssignments, {
      accountId: account_id
    })
    const records = {};

    const assignments = data?.tutorAssignments ? data?.tutorAssignments?.map((data) => {
      return {
        question: data?.assignmentName,
        course: data?.course,
        totalMarks: data?.totalMarks,
        totalSubmit: data?.totalSubmit,
        assignmentId: data?.assignmentId

      }

    }) : []

    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["assignments"] = assignments.slice(from, to)
        records['count'] = assignments.length
      }
    } else {
      records["assignments"] = assignments
      records['count'] = assignments.length
    }

    return records;
    return data;
  }
  

  static async getTutorCalendarEvent(account_id, batchId, lessonId) {
    const { data } = await BaseService.executeQueryWithVariables(TutorCalendarEventDetails, {
      accountId: account_id,
      batchId: batchId,
      lessonId: lessonId
    })


    const calendarEvent = (data?.tutorCalendarEventDetails) ? {
      name: data?.tutorCalendarEventDetails?.name,
      id: data?.tutorCalendarEventDetails?._id,
      batchId: data?.tutorCalendarEventDetails?.batchId,
      productId: data?.tutorCalendarEventDetails?.productId,
      lessonScheduleDate:data?.tutorCalendarEventDetails?.lessonScheduleDate,
      status:data?.tutorCalendarEventDetails?.status,
      assignments: data?.tutorCalendarEventDetails?.assignments,
      students: data?.tutorCalendarEventDetails?.students
    } : {}

    return calendarEvent
  }

  static async getStudentCalendarEvent(account_id, lessonId) {
    const { data } = await BaseService.executeQueryWithVariables(StudentLesson, {
      studentId: account_id,
      lessonId:lessonId
    })
  
    const StudengCalendarEvent =  (data?.studentLesson) ?  {
      name:data?.studentLesson?.lessonName,
      id:data?.studentLesson?._id,
      date:data?.studentLesson?.date,
      tutorName:data?.studentLesson?.tutor.name,
      quizzes:data?.studentLesson?.quizzes,
      quizStatus:data?.studentLesson?.quizStatus,
      assignmentStatus:data?.studentLesson?.assignmentStatus,
      quizScore:data?.studentLesson?.quizScore,
      assignmentScore:data?.studentLesson?.assignmentScore,
      totalAssignmentMarks:data?.studentLesson?.totalAssignmentMarks,
      totalQuizMarks:data?.studentLesson?.totalQuizMarks,
      userMedia:data?.studentLesson?.tutor?.userMedia,
      assignments:data?.studentLesson?.assignments
    } : {}
     
    return StudengCalendarEvent
  }

  static async getQuestions(assignment_id, { page, limit, queryParams }) {
    const { data } = await BaseService.executeQueryWithVariables(assignmentDetails, {
      assignmentId: assignment_id
    })
    const records = {};

    const questions = data?.assignmentDetails ? data?.assignmentDetails?.map((data) => {
      return {
        date: data?.date,
        name: data?.studentName,
        studentemail: data?.studentEmail,
        TotalPoints: data?.totalPoints,
        result: data?.result,
        studentId: data?.studentId,
        assignmentId: data?.assignmentId,
        assignmentName: data?.assignmentName,
        time: data?.course,
        assignmentAnswer: data?.assignmentAnswer,
        outOf: data?.assignmentMarks,
        summary: data?.assignmentSummary

      }

    }) : []

    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["questions"] = questions.slice(from, to)
        records['count'] = questions.length
      }
    } else {
      records["questions"] = questions
      records['count'] = questions.length
    }

    return records;
    return data;
  }

  static async getEvaluation(assignment_id) {
    const { data } = await BaseService.executeQueryWithVariables(assignmentDetails, {
      assignmentId: assignment_id
    })

    return data;
  }

  static async evaluateAssignment(accountId, assignmentId, marks) {
    const { data } = await BaseService.executeMutationWithVariables(evaluateAssignment, {
      input: {
        accountId: accountId,
        assignmentId: assignmentId,
        marks: marks
      }
    })
    const evaluateData = data
    return evaluateData
  }


}

