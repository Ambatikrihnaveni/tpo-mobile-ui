import gql from "graphql-tag";

export default gql`
  mutation createTopic($input: CreateTopicInput!) {
    createTopic(input: $input) {
        topic {
            _id
            shopId
            productId
            lessonId
            topic_name
            topic_summary
            createdAt
            createdBy
        }
    }
  }
`;