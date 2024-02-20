import Reaction from "/imports/plugins/core/core/server/Reaction";
import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";

/**
 * @name accounts/updateAccountDetails
 * @memberof Accounts/Methods
 * @method
 * @summary Update a user's email address
 * @param {String} email - user email
 * @returns {Boolean} - return True on success
 */
export default function updateAccountDetails({userId, mobileNumber, fullname, role}) {
  check(mobileNumber, Number);
  check(userId, String);
  check(fullname, String);
  check(role, String);
  const findUserId = userId || Reaction.getUserId();
  const result = Meteor.users.update(findUserId, {
    $set: { "whatsAppNumber": mobileNumber, "fullName": fullname, "Role": role }
  });

  if(result) {
    return true;
  }
}
