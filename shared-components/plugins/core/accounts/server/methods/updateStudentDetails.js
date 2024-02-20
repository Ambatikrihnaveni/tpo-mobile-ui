import Reaction from "/imports/plugins/core/core/server/Reaction";
import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";

/**
 * @name accounts/updateStudentDetails
 * @memberof Accounts/Methods
 * @method
 * @summary Update a user's email address
 * @param {String} email - user email
 * @returns {Boolean} - return True on success
 */
export default function updateStudentDetails({userId, mobileNumber, fullname, role, shopId, studentGroupId}) {
  check(mobileNumber, Number);
  check(userId, String);
  check(fullname, String);
  check(role, String);
  check(shopId, String);
  check(studentGroupId, String);
  const findUserId = userId || Reaction.getUserId();
  const result = Meteor.users.update(findUserId, {
    $set: {  "whatsAppNumber": mobileNumber, "fullName": fullname, "shopId" : shopId, "Role": role, "studentGroupId": studentGroupId }
  });

  if(result) {
    return true;
  }
}
