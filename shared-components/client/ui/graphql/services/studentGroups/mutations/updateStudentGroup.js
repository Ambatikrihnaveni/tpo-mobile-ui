import gql from "graphql-tag";

export default gql`
  mutation updateStudentGroup($input: UpdateStudentGroupInput!){
    updateStudentGroup(input: $input){
      studentGroup {
        _id
        name
        stream 
        selectedStartYear
        selectedEndYear
        account{
          _id
          name
        }
        createdBy
        createdAt
        updatedAt
        updatedBy
        studentEmailIds{
          studentEmail
          isInvited
          isLogged
        }
                students{
          _id
          emailRecords{
              address
              verified
          }
          profile{
              isStatus
              isApproved
              availableDays
              certificates
              address
              picture
              price
              qualification
              categories
              experience
              bio
              selectedToTime
              selectedFromTime
          }
          userMedia {
            _id
            URLs {
              thumbnail
            }
            priority
          }
          role
          userId
          isProfile
          name
          phoneNumber
        }
    }
    }
  }
 
`;
