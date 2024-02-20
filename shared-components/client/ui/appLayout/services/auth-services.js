import getAccountsHandler from "../../../../../lib/accountsServer";
import hashPassword from "../../../../../lib/utils/hashPassword";
//import Reaction from "/imports/plugins/core/core/server/Reaction";
import { Meteor } from 'meteor/meteor';

const authServices = {};

authServices.getCurrentUser = async () => {
    return Meteor.user();
};

//loginCreds must be {email: "abc@example.com", password: "ABC123DEF"}
authServices.signIn = async (loginCreds) => {
    ;
    const { passwordClient } = getAccountsHandler();
    return await passwordClient.login({
        user: {
            email: loginCreds.email
        },
        password: hashPassword(loginCreds.password)
    });
};

authServices.signUp = async (registerCred) => {
    const { passwordClient } = getAccountsHandler();
    return passwordClient.createUser({ email: registerCred.email, username: registerCred.username, password: hashPassword(registerCred.password) });
};
authServices.googleLogin = async (Id) => {
    const { accountsClient } = getAccountsHandler();
    const user = Meteor.users.findOne({ _id: Id});
   // return  accountsClient.loginWithUser({ user });
};

authServices.logout = async () => {
    const { accountsClient } = getAccountsHandler();
    return await accountsClient.logout();
};
export default authServices