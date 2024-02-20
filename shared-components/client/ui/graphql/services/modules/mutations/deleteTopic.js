import gql from "graphql-tag";

export default gql`
  mutation deleteTopic($input: deleteTopicInput!){
    deleteTopic(input: $input){
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
