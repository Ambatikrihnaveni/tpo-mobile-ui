import { Meteor } from "meteor/meteor";
import Logger from "@reactioncommerce/logger";
import Reaction from "../Reaction";
import config from "../config";
import "./browser-policy";
import RateLimiters from "./rate-limits";
import { ServiceConfiguration } from 'meteor/service-configuration';
import { Accounts } from 'meteor/accounts-base';
import { BrowserPolicy } from 'meteor/browser-policy-common';



const {
  PUBLIC_GRAPHQL_API_URL_HTTP,
  PUBLIC_GRAPHQL_API_URL_WS,
  PUBLIC_FILES_BASE_URL,
  PUBLIC_I18N_BASE_URL,
  PUBLIC_STOREFRONT_HOME_URL,
  REACTION_METEOR_APP_COMMAND_START_TIME,
  ROOT_URL,
  PUBLIC_OPEN_AI_TOKEN,
  PUBLIC_SUPERAGENT_API_TOKEN,
  PUBLIC_SUPERAGENT_ID,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  PUBLIC_AI_MODULE_CREATOR_ID,
  PUBLIC_AI_TOPIC_CREATOR_ID,
  PUBLIC_QUIZ_CREATE_ID
} = config;

/**
 * @summary Core startup function
 * @returns {undefined}
 */
export default function startup() {
  const startTime = Date.now();
  // This env may be set by the launch script, allowing us to time how long Meteor build/startup took.
  if (REACTION_METEOR_APP_COMMAND_START_TIME) {
    const elapsedMs = startTime - REACTION_METEOR_APP_COMMAND_START_TIME;
    Logger.info(`Meteor startup finished: ${elapsedMs}ms (This is incorrect if this is a restart.)`);
  }

  RateLimiters();

  const endTime = Date.now();
  Logger.info(`Reaction initialization finished: ${endTime - startTime}ms`);

  // Take config provided by ENVs and make it available to clients through
  // Meteor's settings feature.
  // See https://docs.meteor.com/api/core.html#Meteor-settings
  Object.assign(Meteor.settings.public, {
    filesBaseUrl: PUBLIC_FILES_BASE_URL,
    graphQlApiUrlHttp: PUBLIC_GRAPHQL_API_URL_HTTP,
    graphQlApiUrlWebSocket: PUBLIC_GRAPHQL_API_URL_WS,
    i18nBaseUrl: PUBLIC_I18N_BASE_URL,
    rootUrl: ROOT_URL,
    storefrontHomeUrl: PUBLIC_STOREFRONT_HOME_URL,
    openaiToken:PUBLIC_OPEN_AI_TOKEN,
    superAgentApiToken:PUBLIC_SUPERAGENT_API_TOKEN,
    superAgentId:PUBLIC_SUPERAGENT_ID,
    google : {
      clientId: GOOGLE_CLIENT_ID,
      secret :GOOGLE_CLIENT_SECRET
    },
    aiModuleCreatorId:PUBLIC_AI_MODULE_CREATOR_ID,
    aiTopicCreatorId:PUBLIC_AI_TOPIC_CREATOR_ID,
    aiQuizCreator:PUBLIC_QUIZ_CREATE_ID
  });
  
  Meteor.startup(() => {
    BrowserPolicy.content.allowOriginForAll('https://checkout.razorpay.com');
    BrowserPolicy.content.allowFrameOrigin('https://api.razorpay.com');
    BrowserPolicy.content.allowFrameOrigin('https://www.youtube.com');

    const settings = Meteor.settings.public;
    if (settings && settings.google) {
      ServiceConfiguration.configurations.upsert(
        { service: 'google' },
        {
          $set: {
            clientId: settings.google.clientId,
            secret: settings.google.secret,
            redirect_uri: process.env.ROOT_URL + '/_oauth/google',
          },
        },
      );
    }
  });
  
  // Main purpose of this right now is to wait to start Meteor app tests
  Reaction.emitAppStartupComplete();
}
