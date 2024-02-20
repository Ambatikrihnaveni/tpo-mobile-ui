import { Meteor } from 'meteor/meteor';
//import SuperagentSDK from "superagentai-js";
import { SuperAgentClient } from "superagentai-js"


const client = new SuperAgentClient({
  environment: "https://api.beta.superagent.sh",
  token: Meteor.settings.public.superAgentApiToken
});



const AiServices = {};

//To get the Current user
AiServices.getCurrentUser = async () => {
  return Meteor.user();
};

//To get the Answer for the given question in chat bot
AiServices.askQuestion = async (question) => {
  let superAgentId = Meteor.settings.public.superAgentId;
  let rndNumber = Math.floor(100000 + Math.random() * 900000);
  let sessionId = rndNumber.toString();
  const {data: prediction} = await client.agent.invoke(superAgentId, {
    input: question,
    enableStreaming: false,
    sessionId // Best practice is to create a unique session per user
  });

  const res = prediction.output;
  return {
    data: res
  };
};

//Generate Bio
AiServices.generateBio = async (prompt) => {
  let superAgentId = Meteor.settings.public.superAgentId;
  let rndNumber = Math.floor(100000 + Math.random() * 900000);
  let sessionId = rndNumber.toString();
  const {data: prediction} = await client.agent.invoke(superAgentId, {
    input: prompt,
    enableStreaming: false,
    sessionId // Best practice is to create a unique session per user
  });

  const res = prediction.output
  return {
    data: res
  };
};

//To Create Modules for the given Title Name
AiServices.createModule = async (moduleTitle) => {
  let aiModuleCreatorId = Meteor.settings.public.aiModuleCreatorId;
  let rndNumber = Math.floor(100000 + Math.random() * 900000);
  let sessionId = rndNumber.toString();
  const {data: prediction} = await client.agent.invoke(aiModuleCreatorId, {
    input: moduleTitle,
    enableStreaming: false,
    sessionId // Best practice is to create a unique session per user
  });

  const jsonStringData = prediction.output;

  function extractJSONFromMarkdown(markdownString) {
    const regex = /```json([\s\S]+?)```/g;
    const matches = regex.exec(markdownString);
  
    if (matches && matches.length > 1) {
      const jsonString = matches[1].trim();
      try {
        return jsonString;
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
      }
    } else {
      return markdownString;
    }
  };

  const res = extractJSONFromMarkdown(jsonStringData);

  return res;
};

//To Create Topic content for the given Request.
AiServices.createTopicContent = async (topicTitle) => {
  let aiTopicCreatorId = Meteor.settings.public.aiTopicCreatorId;
  let rndNumber = Math.floor(100000 + Math.random() * 900000);
  let sessionId = rndNumber.toString();
  const {data: prediction} = await client.agent.invoke(aiTopicCreatorId, {
    input: topicTitle,
    enableStreaming: false,
    sessionId // Best practice is to create a unique session per user
  });

  const res = prediction.output
  return res;
};


AiServices.createQuiz= async(lesson)=>{
  let aiQUizCreator= Meteor.settings.public.aiQUizCreator;
  let rndNumber = Math.floor(100000 + Math.random() * 900000);
  let sessionId = rndNumber.toString();
  const {data:prediction}= await client.agent.invoke(aiQUizCreator,{
    input: lesson,
    enableStreaming: false,
    sessionId
  })

  const result= prediction.output
  return result
}



export default AiServices;