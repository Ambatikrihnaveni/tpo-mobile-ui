import setActiveShopId from "./setActiveShopId";
import updateEmailAddress from "./updateEmailAddress";
import verifyAccount from "./verifyAccount";
import updateStudentDetails from "./updateStudentDetails";
import updateAccountDetails from "./updateAccountDetails";
import updateTutorDetails from "./updateTutorDetails";
import updateFirstName from "./updateFirstName";
import updateLastName from "./updateLastName";
import updateCertificates from "./updateCertificates";
import updatePrice from "./updatePrice";
import updateQualification from "./updateQualification";
import updateExperience from "./updateExperience";
import updateAvailableime from "./updateAvailbaletime";
import updateRole from "./updateRole";
import googleLogin from './ServiceConfiguration';
/**
 * @file Extends Meteor's {@link https://github.com/meteor/meteor/tree/master/packages/accounts-base Accounts-Base}
 * with methods for Reaction-specific behavior and user interaction. Run these methods using: `Meteor.call()`
 * @example Meteor.call("accounts/verifyAccount", email, token)
 * @namespace Accounts/Methods
 */

/**
 * @file Meteor methods for Reaction
 *
 *
 * @namespace Reaction/Methods
*/

export default {
  "accounts/setActiveShopId": setActiveShopId,
  "accounts/updateEmailAddress": updateEmailAddress,
  "accounts/verifyAccount": verifyAccount,
  "accounts/updateStudentDetails":updateStudentDetails,
  "accounts/updateTutorDetails":updateTutorDetails,
  "accounts/updateAccountDetails":updateAccountDetails,
  "accounts/updateFirstname":updateFirstName,
  "accounts/updateLastname":updateLastName,
  "accounts/updateExperience":updateExperience,
  "accounts/updateQualification":updateQualification,
  "accounts/updateCertificates":updateCertificates,
  "accounts/updatePrice":updatePrice,
  "accounts/updateAvailableime":updateAvailableime,
  "accounts/updateRole":updateRole,
  "accounts/googleLogin":googleLogin
};
