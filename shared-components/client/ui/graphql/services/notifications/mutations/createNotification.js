import gql from "graphql-tag";

export default gql`
  mutation createNotification($input: CreateNotificationInput!) {
    createNotification(input: $input) 
  }
`;