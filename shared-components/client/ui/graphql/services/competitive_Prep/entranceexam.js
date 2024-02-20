import BaseService from "../base-service";
import createCompetitivePrep from "./mutations/createCompetitive";
import competitivePreps from "./queries/competitivePreps";
import compitetivePrep from "./queries/compitetivePrep";
import updateCompetitivePrep from "./mutations/updateCompetitivePrep";

export default class CompetitiveService {
  static async getEntranceExamList(shopId, { page, limit, queryParams }) {
    const { data } = await BaseService.executeQueryWithVariables(competitivePreps, {
      shopId,
      query:'',
      first:limit,
      offset:page * limit
     });

     const EntranceExam = data?.competitivePreps?.nodes? 
                          data?.competitivePreps?.nodes?.map((competitivePrep)=>{
                          return{
                            id:competitivePrep._id,
                            title:competitivePrep.title,
                            shopId:competitivePrep.shopId,
                            overview:competitivePrep.overview,
                            eligibility:competitivePrep.eligibility,
                            syllabus:competitivePrep.syllabus,
                            createdBy:competitivePrep.createdBy,
                            createdAt:competitivePrep.createdAt,
                            faqs:competitivePrep.faqs,
                            products:competitivePrep.products,
                            cutOffMarks:competitivePrep.cutOffMarksAllotment,
                            examPattern:competitivePrep.examPattern,
                            examDate:competitivePrep.examDate,
                            examStartTime:competitivePrep.examStartTime,
                            examEndTime:competitivePrep.examEndTime
                           }
                          }):[]
    const records = {};
    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["entranceexam"] = EntranceExam.slice(from, to)
        records['count'] = EntranceExam.length
      }
    } else {
      records["entranceexam"] = EntranceExam
      records['count'] = EntranceExam.length
    }
    return records;
  }


  static async createEntranceexam(inputData) {
    const { data } = await BaseService.executeMutationWithVariables(createCompetitivePrep, {
      input: inputData
    });
    return data
  }


  static async getEntranceExam(shopId,id) {
    const { data } = await BaseService.executeMutationWithVariables(compitetivePrep, {
      shopId:shopId,
      id:id
    });

    let entranceExamData={}
    if(data){
      entranceExamData=data.competitivePrep
    }
    return entranceExamData
  }
  
}