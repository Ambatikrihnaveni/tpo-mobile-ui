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
export default function updateAvailableime({userId, availabletime}) {
  check(availabletime, Array);
  check(userId, String);
  const findUserId = userId || Reaction.getUserId();
  const result = Meteor.users.update(findUserId, {
    $set: {  "Availabletime": availabletime }
  });

  if (result) {
    const updatedAccount = Accounts.findOne({ userId: findUserId });
    Promise.await(appEvents.emit("afterAccountUpdate", {
      account: updatedAccount,
      updatedBy: findUserId,
      updatedFields: ["Availabletime"]
    }));
  }

  return true;
}
