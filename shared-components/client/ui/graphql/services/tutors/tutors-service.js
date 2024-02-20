import BaseService from "../base-service";
import tutorsQuery from "./queries/tutors";
import updateTutorStatusMutation from "./mutations/updateTutorStatus";
import deleteAccountMutation from "./mutations/deleteTutor";
import removeTutorsMutation from "./mutations/removeTutors";


/**
 * Accounts record service to query all accounts
 */
export default class TutorsService {
  static async getRecords(shopId, { page, limit, queryParams }, searchKeywords) {
    
    const { data } = await BaseService.executeQueryWithVariables(tutorsQuery, {
      shopId: shopId,
      status: queryParams.filterPrms.status,
      categories: queryParams.filterPrms.courseCategory,
      query: queryParams.keywords
    });
    const records = {};
    const tutors = data?.tutors
      ? data.tutors.map((data) => {
        return {
          id: data._id,
          userId: data.userId,
          name: data.name ? data.name : data.emailRecords[0].address,
          email: data.emailRecords[0].address,
          verified: data.emailRecords[0].verified,
          availableDays: data.profile.availableDays,
          status: data.profile.isStatus,
          address: data.profile.address,
          picture: data.profile.picture,
          certificates: data.profile.certificates,
          experience: data.profile.experience,
          price: data.profile.price,
          field: data.field,
          categories: data.profile.categories,
          phoneNumber: data.phoneNumber,
          qualification: data.profile.qualification,
          bio: data.profile.bio,
          selectedFromTime: data.profile.selectedFromTime,
          selectedToTime: data.profile.selectedToTime,
          userMedia: data?.userMedia || [],
          socialMediaLinks: data?.profile?.socialMediaLinks,
          moduleIds: data?.moduleIds || [],
          modules: data?.modules || []
        };
      })
      : [];

    let tutorsData = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < tutors.length; i++) {
        if (tutors[i]?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (tutors[i]?.email?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (tutors[i]?.phoneNumber?.toString()?.includes(searchKeywords)) ||
          (tutors[i]?.status?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (tutors[i]?.qualification?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))) {
          tutorsData.push(tutors[i])
        }

      }
    } else {
      tutorsData = tutors
    }


    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["tutors"] = tutorsData.slice(from, to)
        records['count'] = tutorsData.length
      }
    } else {
      records["tutors"] = tutorsData
      records['count'] = tutorsData.length
    }

    return records;
  }

  static async getTutors(shopId, { page, limit, queryParams }) {

    const { data } = await BaseService.executeQueryWithVariables(tutorsQuery, {
      shopId: shopId,
      status: queryParams.filterPrms.status,
      categories: queryParams.filterPrms.courseCategory,
      query: queryParams.keywords
    });
    const tutors = data ? data.tutors : [];

    return tutors;
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

  static async updateStatus(record) {
    ;
    const { data } = await BaseService.executeMutationWithVariables(updateTutorStatusMutation, {
      input: {
        userId: record.userId,
        status: record.status,
        shopId: record.shopId
      }
    });
    return data;
  }

  /**
   * @method removeTutors
   * @summary T.P. can able to remove Multiple Tutors
   * @param {ID} shopId - shopId is ID of the Institute
   * @param {Array} tutorIds - tutorIds are IDs of the Tutors for remove from Institute
   * @returns [object] - which means that whom were remove from the Institute.
  */
  static async remove(inputData) {

    const { data } = await BaseService.executeMutationWithVariables(removeTutorsMutation, {
      shopId: inputData.shopId,
      tutorIds: [inputData.id]
    });
    return data;
  }
  /**
   * @method removeTutors
   * @summary T.P. can able to remove Multiple Tutors
   * @param {ID} shopId - shopId is ID of the Institute
   * @param {Array} tutorIds - tutorIds are IDs of the Tutors for remove from Institute
   * @returns [object] - which means that whom were remove from the Institute.
  */
  static async removeTutors(Ids, shopId) {

    const { data } = await BaseService.executeMutationWithVariables(removeTutorsMutation, {
      shopId,
      tutorIds: Ids
    });
    return data;
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

  static async filters(record) {

    const { data } = await BaseService.executeQueryWithVariables(tutorsQuery, {
      shopId: record.shopId,
      status: record.status,
      categories: record.courseCategory
    });
    const records = {};
    records["tutors"] = data?.tutors
      ? data.tutors.map((data) => {
        return {
          id: data._id,
          userId: data.userId,
          name: data.name ? data.name : data.emailRecords[0].address,
          email: data.emailRecords[0].address,
          verified: data.emailRecords[0].verified,
          availableDays: data.profile.availableDays,
          status: data.profile.isStatus,
          address: data.profile.address,
          picture: data.profile.picture,
          certificates: data.profile.certificates,
          experience: data.profile.experience,
          price: data.profile.price,
          categories: data.profile.categories,
          phoneNumber: data.phoneNumber,
          qualification: data.profile.qualification,
          bio: data.profile.bio,
          selectedFromTime: data.profile.selectedFromTime,
          selectedToTime: data.profile.selectedToTime
        };
      })
      : [];
    return records;
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
}
