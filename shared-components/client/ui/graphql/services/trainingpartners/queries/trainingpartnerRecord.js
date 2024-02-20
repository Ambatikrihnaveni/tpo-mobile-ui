import gql from "graphql-tag";
//import Lesson from "../fragments/lessonWithVariants"

export default gql`
  query trainingPartners {
    trainingPartners{
        _id
        createdAt
        name
        phoneNumber
        profile{
          address
          city
        }
       
    }
  }
`;