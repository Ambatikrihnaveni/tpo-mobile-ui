import gql from "graphql-tag";

export default gql`
  mutation updateProgramLessonStatus($input: UpdateProgramLessonStatusInput!) {
    updateProgramLessonStatus(input: $input) {
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
      }
    }
    
  }
`;
