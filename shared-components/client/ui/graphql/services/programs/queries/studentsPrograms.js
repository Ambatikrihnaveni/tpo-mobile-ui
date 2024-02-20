import gql from "graphql-tag";
//import Lesson from "../fragments/lessonWithVariants"

export default gql`
  query getStudentEnroleProgramsBatch($batchId:String,$programId:String) {
    getStudentEnroleProgramsBatch(batchId:$batchId,programId:$programId){
        _id
        name
        startDate
        program{
          _id
          name
          field
        }
        batch_number
        lessonsDuration{
          lesson{
              _id
              name
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