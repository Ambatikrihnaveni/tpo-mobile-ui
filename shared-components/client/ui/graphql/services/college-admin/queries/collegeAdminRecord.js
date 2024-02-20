import gql from "graphql-tag";

export default gql`
  query collegeAdmins {
    collegeAdmins{
        _id
        createdAt
        name
        phoneNumber
        students
        profile{
          address
          city
        }
       
    }
  }
`;