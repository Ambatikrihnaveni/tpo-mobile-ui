import Reaction from "/imports/plugins/core/core/server/Reaction";
import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";

/**
 * @name accounts/updateEmailAddress
 * @memberof Accounts/Methods
 * @method
 * @summary Update a user's email address
 * @param {String} email - user email
 * @returns {Boolean} - return True on success
 */
export default function updateQualification({userId, qualification}) {
  check(qualification, String);
  check(userId, String);
  const findUserId = userId || Reaction.getUserId();
  const result = Meteor.users.update(findUserId, {
    $set: {  "Qualification": qualification }
  });

  if (result) {
    const updatedAccount = Accounts.findOne({ userId: findUserId });
    Promise.await(appEvents.emit("afterAccountUpdate", {
      account: updatedAccount,
      updatedBy: findUserId,
      updatedFields: ["Qualification"]
    }));
  }

  return true;
}
