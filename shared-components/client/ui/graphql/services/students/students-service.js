import BaseService from "../base-service";
import studentsQuery from "./queries/students";
import trainingPartnerStudents from "./queries/trainingPartnerStudents";
import deleteAccountMutation from "./mutations/removeAccount";
import tutorStudentsQuery from "./queries/tutorStudents";
import importProgramForStudent from "./mutations/importProgramForStudent";
import studentEnrolePrograms from "./queries/studentPrograms";
import studentAssignGroups from './queries/studentAssignedGroups'
import getStudentEnroleProgramsBatches from './queries/studentClasses'
import studentAssignGroupBatches from "./queries/studentGroupBatches";
import createRazorpayOrder from "./mutations/createRazorpayOrder";
import payments from './mutations/studentPayment'
import { da } from "date-fns/locale";
import existingStudents from "./mutations/existingStudents";
import getAllStudentsQuery from "./queries/masterAdminStudents";
import studentTodaysClass from "./queries/studentTodaysClass";
import studentQuizDetails from "./queries/studentQuizDetails";

export default class StudentsService {
  static async studentPayment(input) {
    const { data } = await BaseService.executeMutationWithVariables(payments, {
      input: input
    })
    const paymentsData = data
    return paymentsData
  }



  static async razorPayOrder(amount) {
    const { data } = await BaseService.executeMutationWithVariables(createRazorpayOrder, {
      amount: amount.amount
    })
    const orders = data
    return orders
  }


  static async getStudents(shopId) {
    const { data } = await BaseService.executeQueryWithVariables(studentsQuery, {
      shopId: shopId

    })
    const students = data
    return students
  }

  static async existingStudentsToGroup(groupId, studentIds) {
    const { data } = await BaseService.executeMutationWithVariables(existingStudents, {
      input: {
        id: groupId,
        studentIds: studentIds
      }

    })
    const existingData = data
    return existingData
  }
  static async getRecords(shopId, { page, limit, queryParams }, role, searchKeywords) {
    const { data } = (role == "College-Admin") ? await BaseService.executeQueryWithVariables(studentsQuery, {
      shopId: shopId,
      query: queryParams.keywords
    }) : await BaseService.executeQueryWithVariables(tutorStudentsQuery, {
      shopId: shopId,
      query: queryParams.keywords
    })
    const records = {};
    const students = (role == "College-Admin") ? (data?.students
      ? data.students.map((data) => {
        return {
          id: data._id,
          userId: data.userId,
          name: data.name ? data.name : data.emailRecords[0].address,
          email: data.emailRecords[0].address,
          status: data.profile.status,
          address: data.profile.address,
          picture: data.profile.picture,
          city: data.profile.city,
          company_location: data.profile.company_location,
          country: data.profile.country,
          degree: data.profile.degree,
          employer: data.profile.employer,
          end_month: data.profile.end_month,
          end_year: data.profile.end_year,
          field_of_study: data.profile.field_of_study,
          graduation_month: data.profile.graduation_month,
          graduation_year: data.profile.graduation_year,
          isCurrentWorkingSameCompany: data.profile.isCurrentWorkingSameCompany,
          jobTitle: data.profile.jobTitle,
          pincode: data.profile.pincode,
          school_location: data.profile.school_location,
          school_name: data.profile.school_name,
          skills: data.profile.skills,
          start_month: data.profile.start_month,
          start_year: data.profile.start_year,
          summary: data.profile.summary,
          graduation_score: data.profile.graduation_score,
          surname: data.profile.surname,
          phoneNumber: data.phoneNumber,
          qualification: data.profile.qualification,
          year: data.profile.year,
          socialMediaLinks: data?.profile?.socialMediaLinks,
          userMedia: data?.userMedia || [],
          programs: data?.programs || []


        };
      })
      : []) : (data?.tutorStudents
        ? data.tutorStudents.map((data) => {
          return {
            id: data._id,
            userId: data.userId,
            name: data.name ? data.name : data.emailRecords[0].address,
            email: data.emailRecords[0].address,
            status: data.profile.status,
            address: data.profile.address,
            picture: data.profile.picture,
            city: data.profile.city,
            company_location: data.profile.company_location,
            country: data.profile.country,
            degree: data.profile.degree,
            employer: data.profile.employer,
            end_month: data.profile.end_month,
            end_year: data.profile.end_year,
            field_of_study: data.profile.field_of_study,
            graduation_month: data.profile.graduation_month,
            graduation_year: data.profile.graduation_year,
            isCurrentWorkingSameCompany: data.profile.isCurrentWorkingSameCompany,
            jobTitle: data.profile.jobTitle,
            pincode: data.profile.pincode,
            school_location: data.profile.school_location,
            school_name: data.profile.school_name,
            skills: data.profile.skills,
            start_month: data.profile.start_month,
            start_year: data.profile.start_year,
            summary: data.profile.summary,
            graduation_score: data.profile.graduation_score,
            surname: data.profile.surname,
            socialMediaLinks: data?.profile?.socialMediaLinks,
            phoneNumber: data.phoneNumber,
            qualification: data.profile.qualification,
            year: data.profile.year,
            userMedia: data?.userMedia || [],
            programs: data.programs


          };
        })
        : []);


    let studentsData = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < students.length; i++) {
        if (students[i]?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (students[i]?.email?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))) {
          studentsData.push(students[i])
        }

      }
    } else {
      studentsData = students
    }



    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["students"] = studentsData.slice(from, to)
        records['count'] = studentsData.length
      }
    } else {
      records["students"] = studentsData
      records['count'] = studentsData.length
    }

    return records;
  }

  static async trainingPartnerStudents(shopId, { page, limit, queryParams }, role, searchKeywords) {
    const { data } = await BaseService.executeQueryWithVariables(trainingPartnerStudents, {
      shopId: shopId
    });

    const records = {};
    const students = (data?.trainingPartnerStudents) ? (data?.trainingPartnerStudents?.map(data => {
      return {
        id: data._id,
        userId: data.userId,
        name: data.name ? data.name : data.emailRecords[0].address,
        email: data.emailRecords[0].address,
        status: data.profile.status,
        address: data.profile.address,
        picture: data.profile.picture,
        city: data.profile.city,
        company_location: data.profile.company_location,
        programs: data.programs,
        country: data.profile.country,
        degree: data.profile.degree,
        employer: data.profile.employer,
        end_month: data.profile.end_month,
        end_year: data.profile.end_year,
        field_of_study: data.profile.field_of_study,
        graduation_month: data.profile.graduation_month,
        graduation_year: data.profile.graduation_year,
        isCurrentWorkingSameCompany: data.profile.isCurrentWorkingSameCompany,
        jobTitle: data.profile.jobTitle,
        pincode: data.profile.pincode,
        school_location: data.profile.school_location,
        school_name: data.profile.school_name,
        skills: data.profile.skills,
        start_month: data.profile.start_month,
        start_year: data.profile.start_year,
        summary: data.profile.summary,
        graduation_score: data.profile.graduation_score,
        surname: data.profile.surname,
        socialMediaLinks: data?.profile?.socialMediaLinks,
        phoneNumber: data.phoneNumber,
        qualification: data.profile.qualification,
        year: data.profile.year,
        userMedia: data?.userMedia || [],
      };
    })) : [];


    const tpStudentData = (searchKeywords?.length > 2) ?

      students.filter(students =>
        students?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
        (students?.email?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
        (students?.phoneNumber?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
        (students?.colleges?.some(college => college.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase())))
      )
      : students;

    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["students"] = tpStudentData.slice(from, to)
        records['count'] = tpStudentData.length
      }
    } else {
      records["students"] = tpStudentData;
      records['count'] = tpStudentData.length;
    }

    return records;
  }

  static async StudentGroups(shopId, { page = 0, limit = 8, queryParams }, role, searchKeywords) {
    const date = queryParams?.filterPrms?.date

    const { data } = await BaseService.executeQueryWithVariables(studentAssignGroups, {
      shopId: shopId
    })

    const records = {}

    const studentGroups = data?.studentAssignGroups ?
      data?.studentAssignGroups.map((data) => (
        {
          id: data._id,
          name: data.name,
          stream: data.stream,
          createdAt: data.createdAt,
          createdBy: data.createdBy,
          account: data.account,
          trainingPartners: data.trainingPartners,
          groupPrograms: data.groupPrograms,
          selectedEndYear: data.selectedEndYear,
          selectedStartYear: data.selectedStartYear,
          typeName: data.__typename

        }
      )) : []

    let Groups = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < studentGroups.length; i++) {
        if (studentGroups[i]?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (studentGroups[i]?.createdAt?.toString()?.includes(searchKeywords))) {
          Groups.push(studentGroups[i])
        }

      }
    } else {
      Groups = studentGroups
    }
    if (date) {
      let filteredData;

      switch (date) {
        case "Today":
          filteredData = Groups.filter((item) => isToday(new Date(item.createdAt)));
          break;
        case "Yesterday":
          filteredData = Groups.filter((item) => isYesterday(new Date(item.createdAt)));
          break;
        case "This Week":
          filteredData = Groups.filter((item) => isThisWeek(new Date(item.createdAt)));
          break;
        case "Last Week":
          filteredData = Groups.filter((item) => isLastWeek(new Date(item.createdAt)));
          break;
        case "This Month":
          filteredData = Groups.filter((item) => isThisMonth(new Date(item.createdAt)));
          break;
        case "Last Month":
          filteredData = Groups.filter((item) => isLastMonth(new Date(item.createdAt)));
          break;
        case "This Year":
          filteredData = Groups.filter((item) => isThisYear(new Date(item.createdAt)));
          break;
        case "Last Year":
          filteredData = Groups.filter((item) => isLastYear(new Date(item.createdAt)));
          break;
        default:
          filteredData = Groups;
          break;
      }

      // Helper functions to check date conditions
      function isToday(date) {
        const today = new Date();
        return (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );
      }

      function isYesterday(date) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return (
          date.getDate() === yesterday.getDate() &&
          date.getMonth() === yesterday.getMonth() &&
          date.getFullYear() === yesterday.getFullYear()
        );
      }

      function isThisWeek(date) {
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

        return date >= firstDayOfWeek && date <= lastDayOfWeek;
      }

      function isLastWeek(date) {
        const today = new Date();
        const firstDayOfLastWeek = new Date(today.setDate(today.getDate() - today.getDay() - 7));
        const lastDayOfLastWeek = new Date(firstDayOfLastWeek);
        lastDayOfLastWeek.setDate(lastDayOfLastWeek.getDate() + 6);

        return date >= firstDayOfLastWeek && date <= lastDayOfLastWeek;
      }

      function isThisMonth(date) {
        const today = new Date();
        return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      }

      function isLastMonth(date) {
        const today = new Date();
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
      }

      function isThisYear(date) {
        const today = new Date();
        return date.getFullYear() === today.getFullYear();
      }

      function isLastYear(date) {
        const today = new Date();
        const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        return date.getFullYear() === lastYear.getFullYear();
      }

      // Assign filtered data back to Groups
      Groups = filteredData;

    }

    studentGroups.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    Groups = studentGroups;

    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records['groups'] = Groups.slice(from, to)
        records['count'] = Groups.length
      }
    } else {
      records['groups'] = Groups
      records['count'] = Groups.length
    }

    return records;
  }


  static async StudentGroupBatches(groupId, { page, limit, queryParams }, role, searchKeywords) {
    const status = queryParams?.filterPrms?.paymentStatus
    const { data } = await BaseService.executeQueryWithVariables(studentAssignGroupBatches, {
      studentGroupID: groupId
    });
    const records = {}

    const studentGroupBatches = data?.studentAssignGroupBatches ?
      data?.studentAssignGroupBatches.map((data) => (
        {
          id: data._id,
          name: data.name,
          createdAt: data.createdAt,
          program: data.program,
          price: data.program?.price,
          currencyCode: data.program?.priceType,
          programName: data.program?.name,
          programId: data.program?._id,
          isPayment: data.isPayment,
          duration: data.program?.duration,
          manualPayment: data?.manualPayment,
          typename: data.__typename
        }
      )) : []

    let studentGroups = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < studentGroupBatches.length; i++) {
        if ((studentGroupBatches[i]?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (studentGroupBatches[i]?.createdAt?.toString()?.includes(searchKeywords)) ||
          (studentGroupBatches[i]?.programName?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))) {
          studentGroups.push(studentGroupBatches[i])
        }

      }
    } else {
      studentGroups = studentGroupBatches
    }
    if (status == "Paid") {
      studentGroups = studentGroupBatches.filter(group => group.isPayment == true)
    } else if (status == "Pending") {
      studentGroups = studentGroupBatches.filter(group => group.isPayment == false)
    }
    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records['groupList'] = studentGroups.slice(from, to)
        records['count'] = studentGroups.length
      }
    } else {
      records['groupList'] = studentGroups
      records['count'] = studentGroups.length
    }

    return records;
  }



  static async getStudentPrograms(shopId, { page = 0, limit = 8, queryParams, role }, recordsType, searchKeywords) {

    const { data } = await BaseService.executeQueryWithVariables(studentEnrolePrograms, {
      shopId: shopId,
      type: ''
    })

    const records = {}

    const studentPrograms = data?.studentEnrolePrograms ?
      data?.studentEnrolePrograms.map((data) => (
        {
          id: data._id,
          name: data.name,
          account: data.account,
          batches: data.batches,
          createdAt: data.createdAt,
          createdBy: data.createdBy,
          duration: data.duration,
          field: data.field,
          price: data.price,
          priceType: data.priceType,
          products: data.products,
          programMedia: data.programMedia,
          program_content: data.program_content,
          type: data.type,
          _typename: data._typename,
          faqs: data.faqs,
          tutors: data.tutors,
          modes: data.modes,
          seatsAvailble: data.seatsAvailble,
          seatsFilled: data.seatsFilled,
          isPayment: data.isPayment



        }
      )) : []

    let studentProgram = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < studentPrograms.length; i++) {
        if (studentPrograms[i]?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (studentPrograms[i]?.account?.name.toLowerCase()?.includes(searchKeywords?.toLowerCase()))) {
          studentProgram.push(studentPrograms[i])
        }

      }
    } else {
      studentProgram = studentPrograms
    }


    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records['programs'] = studentProgram.slice(from, to)
        records['count'] = studentProgram.length
      }
    } else {
      records['programs'] = studentProgram
      records['count'] = studentProgram.length
    }


    return records;
  }

  static async importProgramForStudent(programId) {
    const { data } = await BaseService.executeMutationWithVariables(importProgramForStudent, {
      input: {
        programIds: programId
      }
    });



    return { data };
  }

  static async getLabels() {
    const { data } = await axios.get("/records/labels");
    return data;
  }

  static async add(record) {
    const { data } = await axios.post("/records/add-record", record);
    return data;
  }

  static async update(record) {
    const { data } = await axios.put("/records/update-record", record);
    return data;
  }


  
  static async getClasses(shopId, { page, limit, queryParams }, searchKeywords) {
    const status = queryParams?.filterPrms?.admissionStatus

    const { data } = await BaseService.executeQueryWithVariables(getStudentEnroleProgramsBatches)
    const records = {};

    const classes = data?.getStudentEnroleProgramsBatches ?
      data?.getStudentEnroleProgramsBatches.map((data) => (
        {
          id: data._id,
          _typename: data._typename,
          batchEndTime: data.batchEndTime,
          batchStartTime: data.batchStartTime,
          createdAt: data.createdAt,
          createdBy: data.createdBy,
          lessonsDuration: data.lessonsDuration,
          name: data.name,
          certificate: data.certificate,
          programId: data.programId,
          shopId: data.shopId,
          isPayment: data.isPayment,
          startDate: data.startDate,
          program: data.program,
          availableDays: data.availableDays,
          tutors: data.tutors,
          endDate: data?.endDate,
          isCourseComplete: data?.isCourseComplete



        }
      )) : []

    let studentClasess = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < classes.length; i++) {
        if (classes[i]?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (classes[i]?.program?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
            (classes[i]?.startDate?.includes(searchKeywords)))) {
          studentClasess.push(classes[i])
        }

      }
    } else {
      studentClasess = classes
    }
    if (status === "Completed") {
      studentClasess = classes.filter(admission =>
        admission.lessonsDuration?.every(lesson => lesson.lessonStatus === "Complete")
      );
    } else if (status === "In Progress") {
      studentClasess = classes.filter(admission =>
        admission.lessonsDuration.some(lesson => lesson.lessonStatus !== "Complete")
      );
    }

    classes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    studentClasess = classes

    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records['myadmissions'] = studentClasess.slice(from, to)
        records['count'] = studentClasess.length
      }
    } else {
      records['myadmissions'] = studentClasess
      records['count'] = studentClasess.length
    }
    return records;
  }

  static async getClassesForCalendar() {

    const { data } = await BaseService.executeQueryWithVariables(getStudentEnroleProgramsBatches)


    const classes = data?.getStudentEnroleProgramsBatches ?
      data?.getStudentEnroleProgramsBatches.map((data) => (
        {
          id: data._id,
          _typename: data._typename,
          batchEndTime: data.batchEndTime,
          batchStartTime: data.batchStartTime,
          createdAt: data.createdAt,
          createdBy: data.createdBy,
          lessonsDuration: data.lessonsDuration,
          name: data.name,
          certificate: data.certificate,
          programId: data.programId,
          shopId: data.shopId,
          isPayment: data.isPayment,
          startDate: data.startDate,
          program: data.program,
          availableDays: data.availableDays,
          tutors: data.tutors,
          endDate: data?.endDate



        }
      )) : []

    return classes;
  }

  static async delete(record) {

    const { data } = await BaseService.executeMutationWithVariables(deleteAccountMutation, {
      input: {
        userID: record.userId,
        email: record.email
      }
    });
    return data;
  }

  static async deleteMultiple(selectedIDs) {
    const { data } = await axios.put("/records/bulk-delete", {
      recordIDs: selectedIDs
    });
    return data;
  }

  static async addLabel(label) {
    const { data } = await axios.post("/records/add-label", label);
    return data;
  }

  static async updateLabel(label) {
    const { data } = await axios.put("/records/update-label", label);
    return data;
  }

  static async deleteLabel(label) {
    const { data } = await axios.delete("/records/delete-label", {
      params: { id: label.id }
    });
    return data;
  }

  static async assignLabel(params) {
    const { data } = await axios.put("/records/assign-label", {
      recordIDs: params?.recordIDs ?? [],
      labelIDs: params?.labelIDs ?? []
    });
    return data;
  }

  /**
   * query @name allStudents
   * @method
   * @memberof Accounts/Query
   * @summary Get the all Students data of TPO.ai Application
   * @param {String} query - Query to search the Students Data
   * @param {String} role - Role of the current user
   * @returns {Promise<Object>} Accounts
   */
  static async getAllStudents(query, { page, limit, queryParams }, role, searchKeywords) {
    const college = queryParams?.filterPrms?.college
    const { data } = await BaseService.executeQueryWithVariables(getAllStudentsQuery, {
      query
    });

    const records = {};
    const students = (data?.allStudents) ? (data?.allStudents?.map(data => {
      return {
        id: data._id,
        userId: data.userId,
        name: data.name ? data.name : data.emailRecords[0].address,
        email: data.emailRecords[0].address,
        status: data.profile.status,
        address: data.profile.address,
        picture: data.profile.picture,
        city: data.profile.city,
        company_location: data.profile.company_location,
        country: data.profile.country,
        degree: data.profile.degree,
        employer: data.profile.employer,
        end_month: data.profile.end_month,
        end_year: data.profile.end_year,
        field_of_study: data.profile.field_of_study,
        graduation_month: data.profile.graduation_month,
        graduation_year: data.profile.graduation_year,
        isCurrentWorkingSameCompany: data.profile.isCurrentWorkingSameCompany,
        jobTitle: data.profile.jobTitle,
        pincode: data.profile.pincode,
        school_location: data.profile.school_location,
        school_name: data.profile.school_name,
        skills: data.profile.skills,
        start_month: data.profile.start_month,
        start_year: data.profile.start_year,
        summary: data.profile.summary,
        graduation_score: data.profile.graduation_score,
        surname: data.profile.surname,
        socialMediaLinks: data?.profile?.socialMediaLinks,
        phoneNumber: data.phoneNumber,
        qualification: data.profile.qualification,
        year: data.profile.year,
        userMedia: data?.userMedia || [],
        colleges: data?.colleges,

      };
    })) : [];

    let studentsData = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < students.length; i++) {
        if (students[i]?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (students[i]?.email?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (students[i]?.phoneNumber?.toString()?.includes(searchKeywords)) ||
          (students[i]?.colleges?.some(college => college.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase())))) {
          studentsData.push(students[i])
        }

      }
    } else {
      studentsData = students
    }
    if (college) {
      studentsData = studentsData?.filter((student) => student?.colleges?.some((c) => c.name === college));
    }

    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["students"] = studentsData.slice(from, to)
        records['count'] = studentsData.length
      }
    } else {
      records["students"] = studentsData;
      records['count'] = studentsData.length;
    }

    return records;
  }

  static async getTodaysClass(query = null, { page, limit, queryParams }, searchKeywords, role) {
    const quizStatus = queryParams?.filterPrms?.quiz
    const assignmentStatus = queryParams?.filterPrms?.assignment

    const { data } = await BaseService.executeQueryWithVariables(studentTodaysClass, { query });
    const records = {};

    const todaysclass = data?.studentTodaysClass
      ? data?.studentTodaysClass.flatMap((classData) =>
        classData.lessonsDuration.flatMap((lessonDuration) =>
          lessonDuration.lesson.map((lesson) => ({
            lessonName: lesson.name,
            Status: 'Approved',
            date: lesson?.scheduleDate,
            assignment: "view",
            assignmentStatus: "pending",
            programName: classData.program.name,
            productId: lesson.productId,
            quizStatus: lesson.quizStatus,
            QuizScore: lesson.quizScore,
            submittedDate: lesson.submittedDate,
            passedQuizzes: lesson.passedQuizzes,
            quizzes: lesson.quizs,
            lessonId: lesson._id,
            assignments: lesson?.assignments,
            assignmentResult: lesson?.assignmentResult
          }))
        )
      )
      : [];

    let todayClass = (searchKeywords?.length > 2) ?

      todaysclass.filter(todayclass =>
        // todaysclass[i]?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
        todayclass?.date?.includes(searchKeywords) ||
        (todayclass?.lessonName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
        (todayclass?.programName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())))
      : todaysclass;

    const today = new Date();
    todayClass = todayClass.filter(clazz => new Date(clazz.date) <= today);

    if (quizStatus === "No Quizzes" && assignmentStatus === "No Assignments") {
      todayClass = todaysclass.filter(
        (clazz) => clazz?.quizzes?.length === 0 && clazz?.assignments?.length === 0
      );
    } else if (quizStatus && assignmentStatus) {
      const assignmentIds = todaysclass?.assignments?.map((assignment) => assignment._id);
      const resultIds = todaysclass?.assignmentResult?.map((result) => result.assignmentId);
      const allSubmitted = assignmentIds?.every((id) => resultIds?.includes(id));

      todayClass = todaysclass.filter(
        (clazz) =>
          clazz?.quizStatus === quizStatus &&
          ((assignmentStatus === "Submitted" && allSubmitted) ||
            (assignmentStatus === "View" && !allSubmitted) ||
            (assignmentStatus !== "Submitted" && assignmentStatus !== "View" && clazz?.assignments?.length > 0))
      );
    } else if (quizStatus === "No Quizzes") {
      todayClass = todaysclass.filter((clazz) => clazz?.quizzes?.length === 0);
    } else if (quizStatus) {
      todayClass = todaysclass.filter((clazz) => clazz?.quizStatus === quizStatus);
    } else if (assignmentStatus === "No Assignments") {
      todayClass = todaysclass.filter(
        (clazz) => clazz?.assignments?.length === 0
      );
    } else if (assignmentStatus) {
      const filteredClasses = [];

      for (let i = 0; i < todaysclass?.length; i++) {
        const clazz = todaysclass[i];
        const assignments = clazz?.assignments;
        const assignmentResult = clazz?.assignmentResult;
        if (assignments?.length > 0) {

          const assignmentIds = assignments?.map((assignment) => assignment._id);
          const resultIds = assignmentResult?.map((result) => result.assignmentId);

          const allSubmitted = assignmentIds?.every((id) => resultIds?.includes(id));

          if (assignmentStatus === "Submitted" && allSubmitted) {
            filteredClasses.push(clazz);
          } else if (assignmentStatus === "View" && !allSubmitted) {
            filteredClasses.push(clazz);
          }
        }
      }

      todayClass = filteredClasses;
    }

    todayClass.sort((a, b) => new Date(b.date) - new Date(a.date));

    todayClass = todayClass
    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["todaysclass"] = todayClass.slice(from, to)
        records['count'] = todayClass.length
      }
    } else {
      records["todaysclass"] = todayClass;
      records['count'] = todayClass.length;
    }

    return records;
  }

  static async quizDetails(studentId, lessonId,) {

    const data = await BaseService.executeQueryWithVariables(studentQuizDetails, {
      studentId: studentId,
      lessonId: lessonId

    });

    return { data };
  }

}
