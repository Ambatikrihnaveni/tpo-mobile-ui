import gql from "graphql-tag";
//import Lesson from "../fragments/lessonWithVariants"

export default gql`
  query studentGroup($id:ID) {
  studentGroup(id:$id){
    _id
    name
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
      batchIds{
        batchId
        isPayment
      }
      programs{
        _id
        name
      }
      student{
        _id
        name
        phoneNumber
      }
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
`;