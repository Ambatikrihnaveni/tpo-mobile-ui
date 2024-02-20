import gql from "graphql-tag";
//import Lesson from "../fragments/lessonWithVariants"

export default gql`
  query libraryPrograms($type:String) {
    libraryPrograms(type:$type){
      _id
      type
      name
      createdAt
      createdBy
      shopId
      program_content
      status
      field
      price
      priceType
      duration
      modes
      batches {
        _id
        name
        startDate
        batch_max_limit
        batchStartTime
        batchEndTime
        enrolementStartDate
        enrolementEndDate
        certificate{
          _id
          templateImage
        }
        tutors {
          _id
          name
          userMedia{
            _id
            URLs{
              thumbnail
            }
          }
        }
      }
      faqs {
        faqType
        qAndA{
          question
          answer
        }
      }
      account{
        _id
        name
      }
      
      programMedia {
        _id
        URLs {
          small
          medium
          large
          thumbnail
        }
        priority
      }
      products{
        _id
        title
        lessonsDuration {
          lesson{
            _id
            name
            topics{
              _id
              topic_name
              createdAt
            }
            assignments{
              _id
              shopId
              productId
              lessonId
              assignment_title
              summary
              time_limit
              time_limit_type
              total_points
              min_pass_points
              createdAt
            }
            quizs{
              _id
              quiz_question
              quiz_answer
              quiz_hint
              quiz_options{
                optionA
                optionB
                optionC
                optionD
              }
            }
          }
          lessonDuration
        }
      }
    
    }
  }
`;