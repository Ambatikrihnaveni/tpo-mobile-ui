import gql from "graphql-tag";
//import Lesson from "../fragments/lessonWithVariants"

export default gql`
  query batch($shopId:ID, $programId:ID,$batchId:ID) {
  batch(shopId:$shopId, programId:$programId,batchId:$batchId){
    batch{
      _id
      name
      shopId
      programId
      createdBy
      createdAt
      batchStartTime
      batchEndTime
      startDate
      certificate{
        _id
        templateImage
      }
      lessonsDuration{
        lesson{
          _id
          name
          product{
            title
            _id
            tutors{
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
          topics{
            _id
            topic_name
          }
          assignments{
            _id
            assignment_title
          }
          quizs{
            _id
            quiz_title
          }
        }
        lessonDuration
        lessonStatus
        tutor{
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
}
`;