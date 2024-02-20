import BaseService from "../base-service";
import productsQuery from "./queries/modules";
import productQuery from "./queries/module";
import lessonsQuery from "./queries/lessons";
import tutorModulesQuery from "./queries/tutorModules";
import deleteProductMutation from "./mutations/deleteProduct";
import deleteProductsMutation from "./mutations/deleteProducts";
import deleteLessonMutation from "./mutations/deleteLesson";
import assignment from "./queries/assignment";
import lesson from "./queries/lesson";
import uploadPDF from "./mutations/uploadPDF";
import createAIService from './mutations/aiModuleService';
/**
 * Accounts record service to query all accounts
 */
export default class ModulesService {


  static async getAssignments(assignment_id) {
    const { data } = await BaseService.executeQueryWithVariables(assignment, {
      assignmentId: assignment_id
    })
    return data;
  }

  static async getRecords(shopId, { page, limit, queryParams }, role, searchKeywords) {
    const date = queryParams?.filterPrms?.date

    const { data } = (role == "Admin" || role=="Master-Admin") ? await BaseService.executeQueryWithVariables(productsQuery, {
      shopIds: shopId,
      // query: queryParams.keywords
    }) : await BaseService.executeQueryWithVariables(tutorModulesQuery, {
      shopId: shopId,
    })
    const records = {};
    const modules = (role == "Admin" || role == "Master-Admin") ? (data?.products
      ? data.products.map((data) => {
        return {
          id: data._id,
          title: data.title,
          lessons: data.lessons,
          media: data.media,
          isVisible: data.isVisible,
          price: data.pricing.displayPrice,
          description: data.description,
          account: data.account,
          createdAt: data.createdAt,
          tutors: data.tutors,
          pdfs: data.pdfs
        };
      })
      : []) : (data?.tutorProducts
        ? data.tutorProducts.map((data) => {
          return {
            id: data._id,
            title: data.title,
            lessons: data.lessons,
            media: data.media,
            isVisible: data.isVisible,
            price: data.pricing.displayPrice,
            description: data.description,
            account: data.account,
            createdAt: data.createdAt,
            tutors: data.tutors,
          };
        })
        : []);

    let modulesData = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < modules.length; i++) {
        if (modules[i]?.title?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (modules[i]?.account?.name.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (modules[i]?.createdAt?.toString()?.includes(searchKeywords))) {
          modulesData.push(modules[i])
        }

      }
    } else {
      modulesData = modules
    }

    if (date) {
      let filteredData;

      switch (date) {
        case "Today":
          filteredData = modulesData.filter((item) => isToday(new Date(item.createdAt)));
          break;
        case "Yesterday":
          filteredData = modulesData.filter((item) => isYesterday(new Date(item.createdAt)));
          break;
        case "This Week":
          filteredData = modulesData.filter((item) => isThisWeek(new Date(item.createdAt)));
          break;
        case "Last Week":
          filteredData = modulesData.filter((item) => isLastWeek(new Date(item.createdAt)));
          break;
        case "This Month":
          filteredData = modulesData.filter((item) => isThisMonth(new Date(item.createdAt)));
          break;
        case "Last Month":
          filteredData = modulesData.filter((item) => isLastMonth(new Date(item.createdAt)));
          break;
        case "This Year":
          filteredData = modulesData.filter((item) => isThisYear(new Date(item.createdAt)));
          break;
        case "Last Year":
          filteredData = modulesData.filter((item) => isLastYear(new Date(item.createdAt)));
          break;
        default:
          filteredData = modulesData;
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

      modulesData = filteredData;
    }
    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["modules"] = modulesData.slice(from, to)
        records['count'] = modulesData.length
      }
    } else {
      records["modules"] = modulesData
      records['count'] = modulesData.length
    }
    return records;
  }


  static async modules(shopId) {
    
    const { data } = await BaseService.executeQueryWithVariables(productsQuery, {
      shopIds: shopId,
      // query: queryParams.keywords
    });
    const records = {};
    records["modules"] = data?.products
      ? data.products.map((data) => {
        return {
          id: data._id,
          title: data.title,
          lessons: data.lessons,
          media: data.media,
          isVisible: data.isVisible,
          price: data.pricing.displayPrice,
          description: data.description,
          account: data.account,
          createdAt: data.createdAt,
          tutors: data.tutors,
          pdfs: data.pdfs
        };
      })
      : []




    return records;
  }


  static async getModule(shopId, productId) {
    ;
    const { data } = await BaseService.executeQueryWithVariables(productQuery, {
      shopId: shopId,
      productId: productId
      // query: queryParams.keywords
    });

    const module = data?.product ?
      {
        id: data?.product._id,
        title: data?.product.title,
        lessons: data?.product.lessons,
        media: data?.product.media,
        isVisible: data?.product.isVisible,
        price: data?.product.pricing.displayPrice,
        description: data?.product.description,
        account: data?.product.account,
        createdAt: data?.product.createdAt,
        tutors: data.product.tutors,
        pdfs: data.product.pdfs
      }
      : {};
    return module;
  }

 
  static async getAptitudeQuizes(shopId, productId, { page, limit, queryParams },) {
    
    const { data } = await BaseService.executeQueryWithVariables(productQuery, {
      shopId: shopId,
      productId: productId
    })


    const records = {};
    const lessons = data?.product?.lessons ? data?.product?.lessons.map((lesson) => {
      if (lesson?.quizs.length > 0) {
        return {
          id: lesson?._id,
          lessonName: lesson?.name,
          module: data.product?.title,
          quizes: lesson?.quizs
        }
      }
    })

      : [];

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



  static async getLessons(shopId, productId) {

    const data = await BaseService.executeQueryWithVariables(lessonsQuery, {
      shopId: shopId,
      productId: productId
    });

    return { data };
  }

  static async getLesson(productId, shopId, lessonId,) {

    const data = await BaseService.executeQueryWithVariables(lesson, {
      productId: productId,
      shopId: shopId,
      lessonId: lessonId

    });

    return { data };
  }

  static async delete(productId) {

    const { data } = await BaseService.executeMutationWithVariables(deleteProductMutation, {
      input: {
        productId: productId
      }
    });



    return { data };
  }

  /**
   * @method deleteProducts
   * @summary Deletes the Multiple Products
   * @param {Array} Ids Ids of Modules to delete
   * @returns {Object} type [Product]
   */
  static async deleteProducts(Ids, role) {

    //To Check the Permission levels to delete the Module(Product)
    if (role == "Admin" || role == "Tutor") {
      const { data } = await BaseService.executeMutationWithVariables(deleteProductsMutation, {
        productIds: Ids
      });

      return { data };
    }
  }

  static async deleteLesson(lessonId) {

    const { data } = await BaseService.executeMutationWithVariables(deleteLessonMutation, {
      input: {
        lessonId: lessonId
      }
    });



    return { data };
  }

  static async createAiService(input) {

    const { data } = await BaseService.executeMutationWithVariables(createAIService, {
      input: input
    });



    return  data ;
  }

  static async uploadPDF(shopId, productId, pdfData) {

    const { data } = await BaseService.executeMutationWithVariables(uploadPDF, {
      input: {
        shopId: shopId,
        productId: productId,
        pdfData: pdfData
      }
    });

    const pdfList = data?.uploadPDF?.pdfData
    return pdfList;

  }

}