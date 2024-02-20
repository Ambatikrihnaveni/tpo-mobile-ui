import gql from "graphql-tag";
//import Lesson from "../fragments/lessonWithVariants"

export default gql`
  query projects($shopId:ID!) {
    projects(id:$shopId){
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