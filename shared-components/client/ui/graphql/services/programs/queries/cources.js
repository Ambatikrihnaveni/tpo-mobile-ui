import gql from "graphql-tag";
//import Lesson from "../fragments/lessonWithVariants"

export default gql`
  query courses($shopId:ID!) {
    courses(id:$shopId){
      _id
      shopId
      type
      programId
      program_summary
      createdAt
      createdBy
    }
  }
`;