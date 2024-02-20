import Reaction from "/imports/plugins/core/core/server/Reaction";
import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";

/**
 * @name accounts/updateTutorDetails
 * @memberof Accounts/Methods
 * @method
 * @summary Update a user's email address
 * @param {String} email - user email
 * @returns {Boolean} - return True on success
 */
export default function updateTutorDetails({userId, mobileNumber, fullname, role, shopId}) {
  check(mobileNumber, Number);
  check(userId, String);
  check(fullname, String);
  check(role, String);
  check(shopId, String);
  const findUserId = userId || Reaction.getUserId();
  const result = Meteor.users.update(findUserId, {
    $set: {  "whatsAppNumber": mobileNumber, "fullName": fullname, "shopId" : shopId, "Role": role }
  });

  if(result) {
    return true;
  }
}
