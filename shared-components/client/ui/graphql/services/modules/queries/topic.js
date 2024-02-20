import gql from "graphql-tag";
//import Lesson from "../fragments/lessonWithVariants"

export default gql`
  query topic($topicId:ID!) {
    topic(id:$topicId){
      _id
      shopId
      productId
      lessonId
      topic_name
      topic_content
      topic_summary
      createdAt
      createdBy
    }
  }
`;