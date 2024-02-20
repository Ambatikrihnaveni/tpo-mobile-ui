import { Meteor } from 'meteor/meteor';
//import { Accounts } from 'meteor/accounts-base';
import { check } from "meteor/check";
import Reaction from "/imports/plugins/core/core/server/Reaction";


export default function googleLogin() {
  /* check(userId, 
    String
  );
  const user = Meteor.users.findOne({ _id: userId });
  if (user) {
    const username = user.services.google.name;
    const email = user.services.google.email;
    // const profile = user.profile; 
    const accessToken = user.services.google.accessToken;
    //return user;
    return accessToken
  } */
  //Accounts.oauth.registerService('google');
  function observeOauthService(name) {
    globalDb.collections.settings.find({ _id: name, value: true }).observe({
      added: function () {
        // Tell the oauth library it should accept login attempts from this service.
        Accounts.oauth.registerService(name);
      },
  
      removed: function () {
        // Tell the oauth library it should deny login attempts from this service.
        Accounts.oauth.unregisterService(name);
      },
    });
  }
  
  //observeOauthService("github");
  observeOauthService("google");

  }
