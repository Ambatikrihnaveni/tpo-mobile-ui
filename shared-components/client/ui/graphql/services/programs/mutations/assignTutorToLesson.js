import gql from "graphql-tag";

export default gql`
  mutation assignTutorToLesson($input: AssignTutorToLessonInput!) {
    assignTutorToLesson(input: $input) {
      _id
      name
      shopId
      programId
      createdBy
      createdAt
      batchStartTime
      batchEndTime
      lessonsDuration{
        lesson{
          _id
          name
          product{
            title
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
        lessonDuration
        lessonStatus
      }
    }
  }
`;