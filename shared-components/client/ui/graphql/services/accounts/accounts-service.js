import BaseService from "../base-service";
import accountsQuery from "./queries/accounts";
import inviteShopMemberMutation from './mutations/inviteShopMember'
import viewerQuery from "./queries/viewer"
import updateAccountMutation from './mutations/updateAccount'
import viewProfile from "./queries/viewProfile";
/**
 * Accounts record service to query all accounts
 */
export default class AccountsService {

  static async inviteStudents(record) {
    const { data } = await BaseService.executeMutationWithVariables(inviteShopMemberMutation, {
      input: {
        shopId: record.shopId,
        inputData: record.studentData,
        shouldGetAdminUIAccess: true
      }
    });
    return data;

  }

  static async updateAccount(record) {

    let socialMediaAccounts = []

    for (let i = 0; i < record.mediaList?.length; i++) {
      let data = { socialMediaAccount: record.mediaList[i].account, link: record.mediaList[i].link }
      socialMediaAccounts.push(data)
    }

    const { data } = await BaseService.executeMutationWithVariables(updateAccountMutation, {
      input: {
        accountId: record.id,
        name: record?.name,
        email: record?.email,
        phoneNumber: record?.number,
        website: record?.website,
        achievements: record?.achieves,
        coursesOffered: record?.courses,
        bio: record?.bio,
        address: record?.address,
        city: record?.city,
        country: record?.country,
        state: record?.state,
        socialMediaLinks: socialMediaAccounts,
        accountName: record?.accountName,
        accountNumber: record?.accountNumber,
        bankName: record?.bankName,
        ifscCode: record?.ifscCode,
        branch: record?.branch


      }
    })
    return data;
  }
  static async inviteUsers(record) {

    const { data } = await BaseService.executeMutationWithVariables(inviteShopMemberMutation, {
      input: {
        shopId: record.shopId,
        inputData: record.inputData,
        shouldGetAdminUIAccess: true
      }
    });
    return data;

  }

  static async getViewer() {

    const { data } = await BaseService.executeQueryWithVariables(viewerQuery);
    return data;

  }
  static async viewProfile(userId) {

    const { data } = await BaseService.executeQueryWithVariables(viewProfile, {
      userId: userId
    });

    return data
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

  static async delete(record) {
    const { data } = await axios.delete("/records/delete-record", {
      params: { id: record.id }
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
}
