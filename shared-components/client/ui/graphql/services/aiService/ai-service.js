import BaseService from "../base-service";
import createAiService from "./mutations/createAiService";

export default class Admissions {

    static async createServiceAi(serviceType,userReq, shopId, productId, lessonId) {
        const { data } = await BaseService.executeMutationWithVariables(createAiService, {
           serviceType:serviceType,
            userReq: userReq,
            shopId: shopId,
            productId: productId,
            lessonId: lessonId
        })

        return data

    }


}
