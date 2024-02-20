import BaseService from "../base-service";
import programsQuery from "./queries/programs"
import batchQuery from "./queries/programBatch"
import defaultProgramsQuery from "./queries/defaultPrograms";
import deleteProgramMutation from "./mutations/deleteProgramMutation";
import deleteProgramsMutation from "./mutations/deleteProgramsMutation";
import removeProgramMutation from "./mutations/removeProgramMutation";
import removeProgramsMutation from "./mutations/removePrograms"
import getStudentEnroleProgramsBatch from './queries/studentsPrograms'
import updateProgramLessonStatusMutation from './mutations/updateLessonStatus'
import updateProgramStatus from "./mutations/updateProgramStatus";
import libraryPrograms from "./queries/libraryPrograms";
import assignTutorToLessonMutation from './mutations/assignTutorToLesson'
import createBatchMutation from './mutations/createBatch'
import getQuiz from './queries/quiz';
import studentsProgramsQuery from "./queries/studentPrograms";
import Program from './queries/program'

export default class MyProgramService {
  static async getDefaultPrograms(shopId, { page, limit, queryParams }, recordsType, role) {
    
    const status = queryParams?.filterPrms?.status
    const programType = queryParams?.filterPrms?.programType
    const type = null
    const { data } = await BaseService.executeQueryWithVariables(defaultProgramsQuery, {
      type
    });
    const records = {};
    //records[recordsType ? recordsType : "all"] 
    let defaultPrograms = data?.defaultPrograms
      ? data.defaultPrograms?.map((data) => {
        return {
          id: data._id,
          name: data.name,
          program_content: data.program_content,
          type: data.type,
          account: data.account,
          products: data.products,
          tutors: data?.tutors || [],
          field: data.field,
          duration: data.duration,
          programMedia: data.programMedia,
          batches: data.batches,
          faqs: data.faqs,
          price: data.price,
          priceType: data.priceType,
          createdAt: data.createdAt,
          createdBy: data.createdBy,
          isApproved: data.isApproved,
          modes: data?.modes,
          status: data.status,
        }
      })

      : [];

    let programData = (searchKeywords?.length > 2) ?

      defaultPrograms.filter(programs =>
        programs?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
        (programs?.type?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
        (programs?.account?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
        (programs?.createdAt?.toString()?.includes(searchKeywords)))
      : defaultPrograms;

    if (status && programType) {
      programData = programData.filter(programs => programs.status === status && programs.type === programType)
    } else if (status) {
      programData = programData.filter(programs => programs.status === status)
    } else if (programType) {
      programData = programData.filter(programs => programs.type === programType)
    }
    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;


        records[recordsType ? recordsType : "all"] = programData.slice(from, to)
        records['count'] = programData.length
      }
    } else {

      records[recordsType ? recordsType : "all"] = programData
      records['count'] = programData.length
    }


    return records;
  }

  static async getProgram(programId, { page, limit, queryParams, role }, recordsType, searchKeywords) {
    const { data } = await BaseService.executeQueryWithVariables(Program, {
      id: programId
    });

    const records = {};
    const program = data.program.products
      .map(module =>
        module?.lessonsDuration?.map(lessons =>
          lessons?.lesson?.map(lesson => ({
            name: lesson.name,
            quizzes: lesson.quizs,
            lessonId:lesson._id,
            productId:module._id,
            moduleName:module.title
          }))
        )
      )
      .flat(2);

    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["lesson-quiz"] = program.slice(from, to);
        records['count'] = program.length;
      }
    } else {
      records["lesson-quiz"] = program;
      records['count'] = program.length;
    }

    return records
  }


  static async getRecords(shopId, { page, limit, queryParams, role }, recordsType, searchKeywords) {
    const status = queryParams?.filterPrms?.status
    const programType = queryParams?.filterPrms?.programType
    const programMode = queryParams?.filterPrms?.programMode

    const type = recordsType == "myprograms" ? "" : recordsType
    const { data } = await BaseService.executeQueryWithVariables(programsQuery, {
      shopId: shopId,
      type: type
      // query: queryParams.keywords
    });

    const records = {};
    const programs = data?.programs
      ? data.programs.map((data) => {
        return {
          id: data._id,
          name: data.name,
          program_content: data.program_content,
          type: data.type,
          account: data.account,
          products: data.products,
          tutors: data?.tutors || [],
          field: data.field,
          duration: data.duration,
          programMedia: data.programMedia,
          batches: data.batches,
          faqs: data.faqs,
          price: data.price,
          priceType: data.priceType,
          createdAt: data.createdAt,
          createdBy: data.createdBy,
          isApproved: data.isApproved,
          modes: data?.modes
        }
      })

      : [];

    let tpProgramsData = (searchKeywords?.length > 2) ?

      programs.filter(programs =>
        programs?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
        (programs?.type?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (programs?.account?.name.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          ("isApproved"?.includes(searchKeywords?.toLowerCase()) && programs?.isApproved == true) ||
          ("Pending"?.includes(searchKeywords?.toLowerCase()) && programs?.isApproved == false))
      )
      : programs;
    if (status == "Approved" && programType && programMode) {
      tpProgramsData = programs.filter(program => program.isApproved === true &&
        program.type === programType && program?.modes?.includes(programMode))
    } else if (status == "Pending" && programType && programMode) {
      tpProgramsData = programs.filter(program => program.isApproved === false &&
        program.type === programType && program?.modes?.includes(programMode))
    } else if (status === "Approved" && programType) {
      tpProgramsData = programs.filter(program => program.isApproved === true &&
        program.type === programType)
    } else if (status == "Pending" && programType) {
      tpProgramsData = programs.filter(program => program.isApproved === false &&
        program.type === programType)
    } else if (status == "Pending" && programMode) {
      tpProgramsData = programs.filter(program => program.isApproved === false && program?.modes?.includes(programMode))
    } else if (status === "Approved" && programMode) {
      tpProgramsData = programs.filter(program => program.isApproved === false && program?.modes?.includes(programMode))
    } else if (programType && programMode) {
      tpProgramsData = programs.filter(program =>
        program.type === programType && program.modes?.includes(programMode))
    } else if (status === "Approved") {
      tpProgramsData = programs.filter(program => program.isApproved === true)
    } else if (status === "Pending") {
      tpProgramsData = programs.filter(program => program.isApproved === false)
    } else if (programType) {
      tpProgramsData = programs.filter(program => program.type === programType)
    } else if (programMode) {
      tpProgramsData = programs.filter(program => program?.modes?.includes(programMode))
    }
    tpProgramsData = programs;

    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records[recordsType ? recordsType : "all"] = tpProgramsData.slice(from, to)
        records['count'] = tpProgramsData.length
      }
    } else {
      records[recordsType ? recordsType : "all"] = tpProgramsData
      records['count'] = tpProgramsData.length
    }

    return records;
  }

  /**
   * 
   * @param {*} record 
   * @returns 
  */
  static async collegePrograms(shopId, type = null) {
    const { data } = await BaseService.executeQueryWithVariables(programsQuery, {
      shopId: shopId,
      type: type
    });

    const programs = data?.programs;
    return programs;
  }

  static async delete(record) {

    const { data } = await BaseService.executeMutationWithVariables(deleteProgramMutation, {
      input: {
        id: record
      }
    });

    return { data }; return { data };
  }

  /**
   * @method deletePrograms
   * @summary Deletes the Many Programs
   * @param {Array} Ids - Ids of Programs to delete
   * @returns {Promise<Object>} type [Program] payload
   */
  static async deletePrograms(Ids, role) {

    //To Check the Permission levels to delete the Programs
    if (role == "Admin") {
      const { data } = await BaseService.executeMutationWithVariables(deleteProgramsMutation, {
        programIds: Ids
      });

      return { data };
    }
  }


  static async createProgramBatch(record) {

    const { data } = await BaseService.executeMutationWithVariables(createBatchMutation, {
      input: record
    });


    return { data };
  }

  static async updateProgramStatus(id) {

    const { data } = await BaseService.executeMutationWithVariables(updateProgramStatus, {
      id: id.id,
      status: id.status
    });

    return { data };
  }
  static async remove(record) {

    const { data } = await BaseService.executeMutationWithVariables(removeProgramMutation, {
      shopId: record.shopId,
      programId: [record.record.id]
    });
    return { data };
  }
  /**
   * @method removeProgram
   * @summary Student can able to Remove the Program from Account.
   * @param {String} id - ID of the Program
   * @returns {Promise<Object>} type [Program] Payload
   */
  static async removeProgram(id) {
    const { data } = await BaseService.executeMutationWithVariables(removeProgramMutation, {
      programId: [id]
    });
    return { data };
  }

  /**
   * @method removePrograms
   * @summary C.A. can able to remove Multiple Programs from College
   * @param {Object} queryData - An Input Object for the operation
   * @param {String} queryData.shopId - ID of the College
   * @param {String[]} queryData.programIds - IDs of the Program to Remove
   * @returns 
  */
  static async removeMulitplePrograms(queryData) {

    const { data } = await BaseService.executeMutationWithVariables(removeProgramsMutation, {
      shopId: (queryData.shopId) ? queryData.shopId : '',
      programIds: queryData.Ids
    });
    return { data };
  }

  static async getQuiz(quizId) {
    const { data } = await BaseService.executeQueryWithVariables(getQuiz, {
      quizId: quizId
    })

    return { data };
  }

  static async getProgramBatch(shopId, programId, batchID) {

    const { data } = await BaseService.executeQueryWithVariables(batchQuery, {
      shopId: shopId,
      programId: programId,
      batchId: batchID
      // query: queryParams.keywords
    });


    return data;
  }

  static async updateLessonStatus(shopId, programId, batchID, productId, lessonIds, lessonStatus) {

    const { data } = await BaseService.executeMutationWithVariables(updateProgramLessonStatusMutation, {
      input: {

        shopId,
        programId,
        productId,
        batchId: batchID,
        lessonIds,
        lessonStatus
      }

    });


    return data;
  }

  static async assignTutorToLesson(shopId, programId, batchID, productId, lessonIds, tutorId) {

    const { data } = await BaseService.executeMutationWithVariables(assignTutorToLessonMutation, {
      input: {

        shopId,
        programId,
        productId,
        batchId: batchID,
        lessonIds,
        tutorId
      }

    });


    return data;
  }


  static async libraryPrograms() {
    let type = null
    const { data } = await BaseService.executeQueryWithVariables(libraryPrograms, {
      type
    })
    return { data }
  }

  static async studentPrograms() {

    const { data } = await BaseService.executeQueryWithVariables(getStudentEnroleProgramsBatch, {

    });


    return data;
  }

  static async studentEnrollPrograms(query = null) {
    const { data } = await BaseService.executeQueryWithVariables(studentsProgramsQuery, {
      query
    });

    const programs = data?.studentPrograms;

    return programs;
  }
}

