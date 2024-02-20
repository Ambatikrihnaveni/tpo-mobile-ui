import BaseService from "../base-service";
import getAllBatchesQuery from './queries/batches';
import deleteBatchMutation from './mutation/deleteProgramBatch';
import deleteBatchesMutation from "./mutation/deleteBatches";
import updateBatchMutation from './mutation/updateBatch'
import getTutorBatches from './queries/tutorClaseses';
import addMeetingDetailsToLessonMutation from "./mutation/addMeetingDetailsToLesson";
import addRecordingLinkToLessonMutation from "./mutation/addRecordingLinkToLesson";
import moment from 'moment';

export default class Admissions {



  static async getBatches(shopId, { page, limit, queryParams }, searchKeywords) {
    const status = queryParams?.filterPrms?.admissionStatus
    const { data } = await BaseService.executeQueryWithVariables(getAllBatchesQuery, {
      shopId: shopId,
    })
    const records = {};
    const admissions = data?.getAllBatches
      ? data.getAllBatches.map((data) => {
        return {
          id: data._id,
          name: data.name,
          batch_max_limit: data.batch_max_limit,
          seatsAvailable: data.seatsAvailable,
          seatsFilled: data.seatsFilled,
          program: data.program,
          programId: data.programId,
          certificate: data.certificate,
          admins: data.admins,
          batchStartTime: data.batchStartTime,
          batchEndTime: data.batchEndTime,
          createdAt: data.createdAt,
          createdBy: data.createdBy,
          shopId: data.shopId,
          startDate: data.startDate,
          enrolementStartDate: data.enrolementStartDate,
          enrolementEndDate: data.enrolementEndDate,
          students: data.students,
          tutors: data.tutors,
          mode: data.mode,
          availableDays: data.availableDays,
          lessonsDuration: data.lessonsDuration

        }
      }) : []

    let tpAdmissions = (searchKeywords?.length > 2) ?

      admissions.filter(admissions =>
        admissions?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
        (admissions?.program?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
        (admissions?.createdAt?.includes(searchKeywords)))
      : admissions;

    if (status === "Completed") {
      tpAdmissions = admissions.filter(admission =>
        admission.lessonsDuration.every(lesson => lesson.lessonStatus === "Complete")
      );
    } else if (status === "In Progress") {
      tpAdmissions = admissions.filter(admission =>
        admission.lessonsDuration.some(lesson => lesson.lessonStatus !== "Complete")
      );
    }

    tpAdmissions.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    tpAdmissions = tpAdmissions

    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["admissions"] = tpAdmissions.slice(from, to)
        records['count'] = tpAdmissions.length
      }
    } else {
      records["admissions"] = tpAdmissions
      records['count'] = tpAdmissions.length
    }

    return records;

  }


  static async getTutorBatches(shopId, { page, limit, queryParams, userId }, searchKeywords) {
    const status = queryParams?.filterPrms?.admissionStatus

    const { data } = await BaseService.executeQueryWithVariables(getTutorBatches, {
      shopId: shopId,
      tutorId: userId
    })
    const records = {};
    const classes = data?.getTutorBatches?.map((data) => {
      return {
        admins: data.admins,
        availableDays: data.availableDays,
        batchEndTime: data.batchEndTime,
        batchStartTime: data.batchStartTime,
        batch_max_limit: data.batch_max_limit,
        createdAt: data.createdAt,
        createdBy: data.createdBy,
        id: data._id,
        name: data.name,
        startDate: data.startDate,
        program: data.program,
        lessonsDuration: data.lessonsDuration,
        mode: data.mode,
        programId: data.programId,
        seatsAvailable: data.seatsAvailable,
        seatsFilled: data.seatsFilled,
        shopId: data.shopId,
        students: data.students,
        tutors: data.tutors,

      }
    })

    let tutorClass = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < classes.length; i++) {
        if (classes[i]?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (classes[i]?.program?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
            (classes[i]?.createdAt?.toString()?.includes(searchKeywords)))) {
          tutorClass.push(classes[i])
        }

      }
    } else {
      tutorClass = classes
    }

    if (status === "Completed") {
      tutorClass = classes.filter(admission =>
        admission.lessonsDuration.every(lesson => lesson.lessonStatus === "Complete")
      );
    } else if (status === "In Progress") {
      tutorClass = classes.filter(admission =>
        admission.lessonsDuration.some(lesson => lesson.lessonStatus !== "Complete")
      );
    }

    tutorClass.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    tutorClass = tutorClass
    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["classes"] = tutorClass.slice(from, to)
        records['count'] = tutorClass.length
      }
    } else {
      records["classes"] = tutorClass
      records['count'] = tutorClass.length

    }
    return records;

  }


  static async delete(id) {

    const { data } = await BaseService.executeMutationWithVariables(deleteBatchMutation, {
      input: {
        id: id
      }
    });

    return data
  }

  /**
   * @method deleteBatches
   * @summary Deletes the Multiple Batches(Admissions)
   * @param {Ids} Ids - Ids of of Batches to Delete
   * @returns {Promise<Object>} type [Batch] payload
   */
  static async deleteBatches(Ids, role) {
    //To Check the Permission levels to delete the Batches(Admissions)
    if (role == "Admin") {
      const { data } = await BaseService.executeMutationWithVariables(deleteBatchesMutation, {
        batchIds: Ids
      });

      return { data };
    }
  }

  static async updataBatch(inputDta) {

    const { data } = await BaseService.executeMutationWithVariables(updateBatchMutation, {
      input: inputDta
    });

    return data
  }

  /**
   * @method addMeetingDetailsToLesson
   * @summary Add the Meeting Info to Lesson in a Batch
   * @param {Object} input - mutation input object
   * @param {String} [input.batchId] - ID of the Batch(Admission)
   * @param {String} [input.productId] - ID of the Module(Product)
   * @param {Array} [input.lessonIds] - IDs of the Lessons
   * @param {Object} [input.meetingDetails] - The Meeting Details
   * @param {String} [input.meetingDetails.meetingDate] - The Date at which the Meeting happens
   * @param {String} [input.meetingDetails.link] - The Link which is given for conduct & start the meeting
   * @param {String} [input.meetingDetails.recordedLink] - The Recorded Link of the Meeting for a Batch Lesson
   * @param {String} [input.meetingDetails.platform] - The Platform in which the Meeting has Schedule
   * @return {Promise<Object>} type Batch Payload
  */
  static async addMeetingDetailsToLesson(formData, args) {

    let { batchId, productId, lessonIds } = args;
    let { startDate, link, platform, recordLink } = formData;
    startDate = moment(startDate).format('YYYY-MM-DD');
    let inputData = {
      batchId,
      productId,
      lessonIds,
      meetingDetails: {
        meetingDate: startDate,
        link,
        recordedLink: recordLink,
        platform
      }
    }
    const { data } = await BaseService.executeMutationWithVariables(addMeetingDetailsToLessonMutation, {
      input: inputData
    });

    return data;
  }

  /**
   * @method addRecordingLinkToLesson
   * @summary Add the Meeting Info to Lesson in a Batch
   * @param {Object} input - mutation input object
   * @param {String} [input.batchId] - ID of the Batch(Admission)
   * @param {String} [input.productId] - ID of the Module(Product)
   * @param {Array} [input.lessonIds] - IDs of the Lessons
   * @param {Object} [input.meetingDetails] - The Meeting Details
   * @param {String} [input.meetingDetails.meetingDate] - The Date at which the Meeting happens
   * @param {String} [input.meetingDetails.link] - The Link which is given for conduct & start the meeting
   * @param {String} [input.meetingDetails.recordedLink] - The Recorded Link of the Meeting for a Batch Lesson
   * @param {String} [input.meetingDetails.platform] - The Platform in which the Meeting has Schedule
   * @return {Promise<Object>} type Batch Payload
  */
  static async addRecordingLinkToLesson(formData, args) {
    let { batchId, productId, lessonIds } = args;
    let { startDate, link, platform, recordLink } = formData;
    startDate = moment(startDate).format('YYYY-MM-DD');
    let inputData = {
      batchId,
      productId,
      lessonIds,
      meetingDetails: {
        meetingDate: startDate,
        link,
        recordedLink: recordLink,
        platform
      }
    }
    const { data } = await BaseService.executeMutationWithVariables(addRecordingLinkToLessonMutation, {
      input: inputData
    });

    return data
  }
}
