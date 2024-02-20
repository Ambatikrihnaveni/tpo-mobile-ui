import gql from "graphql-tag";

export default gql`
  mutation updateTopic($input: updateTopicInput!){
    updateTopic(input: $input){
      topic {
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
  }
 
`;
