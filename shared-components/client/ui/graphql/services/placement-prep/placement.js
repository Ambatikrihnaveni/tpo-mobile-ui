import BaseService from "../base-service";
import interviewPrepsQuery from "./queries/aptitudes"
import interviewPrepQuery from "./queries/aptitude";
/**
 * Accounts record service to query all accounts
 */


export default class PlacementService {

  static async getAptitudes(shopId, type, { page, limit, queryParams }, searchKeywords) {
    const { data } = await BaseService.executeQueryWithVariables(interviewPrepsQuery, {
      shopId: shopId,
      type: type
    })

    const records = {};
    const interviewPreps = data.interviewPreps ? data.interviewPreps.map((aptitude) => {
      return {
        id: aptitude?._id,
        title: aptitude.title,
        description: aptitude.description,
        shopId: aptitude?.shopId,
        products: aptitude.products,
        faqs: aptitude.faqs,
        createdAt: aptitude.createdAt,
        lessonsCount: aptitude.lessonsCount,
        quizesCount: aptitude.quizesCount

      }
    }

    ) : []


    let Aptitude = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < interviewPreps?.length; i++) {
        if (interviewPreps[i]?.title?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) {
          Aptitude.push(interviewPreps[i])
        }
      }
    } else {
      Aptitude = interviewPreps
    }


    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["aptitude"] = Aptitude.slice(from, to)
        records['count'] = Aptitude.length
      }
    } else {
      records["aptitude"] = Aptitude
      records['count'] = Aptitude.length
    }
    return records;
  };



  static async getTechnical(shopId, type, { page, limit, queryParams }, searchKeywords) {
    const { data } = await BaseService.executeQueryWithVariables(interviewPrepsQuery, {
      shopId: shopId,
      type: type
    })
    const records = {};


    const Technical = data.interviewPreps ? data.interviewPreps.map((technical) => {
      return {
        id: technical?._id,
        title: technical.title,
        description: technical.description,
        shopId: technical?.shopId,
        products: technical.products,
        faqs: technical.faqs,
        createdAt: technical.createdAt,
        lessonsCount: technical.lessonsCount,
        quizesCount: technical.quizesCount

      }
    }

    ) : []


    let technicalData = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < Technical?.length; i++) {
        if (Technical[i]?.title?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) {
          technicalData.push(Technical[i])
        }
      }
    } else {
      technicalData = Technical
    }


    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["technical"] = technicalData.slice(from, to)
        records['count'] = technicalData.length
      }
    } else {
      records["technical"] = technicalData
      records['count'] = technicalData.length
    }
    return records;
  }


  static async getAptitude(shopId, id) {
    ;
    const { data } = await BaseService.executeQueryWithVariables(interviewPrepQuery, {
      shopId: shopId,
      id: id
    })

    return { data };
  }

 

  static async getTech(shopId, id) {
    ;
    const { data } = await BaseService.executeQueryWithVariables(interviewPrepQuery, {
      shopId: shopId,
      id: id
    })

    return { data };
  }


  static async getAptitudeQuizes(shopId, interviewPrepId, { page, limit, queryParams },) {
    
    const { data } = await BaseService.executeQueryWithVariables(interviewPrepQuery, {
      shopId: shopId,
      id: interviewPrepId
    });

    const records = {};
    const lessons = [];
    if(data?.interviewPrep?.products?.length > 0) {
      for(let product of data?.interviewPrep?.products){
        if(product?.lessonsDuration?.length > 0) {
          for(let lessonData of product.lessonsDuration) {
            let info = {};
            for(let lessonInfo of lessonData.lesson) {
              info.id = lessonInfo?._id,
              info.lessonName = lessonInfo?.name,
              info.quizes = lessonInfo?.quizs,
              info.module = product?.title
            }
            lessons.push(info);
          }
        }
      }
    }
    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["quizes"] = lessons.slice(from, to)
        records['count'] = lessons.length
      }
    } else {
      records["quizes"] = lessons
      records['count'] = lessons.length
    }
    return records;

  }



}