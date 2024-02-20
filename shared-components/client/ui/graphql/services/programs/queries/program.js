import gql from "graphql-tag";
//import Lesson from "../fragments/lessonWithVariants"

export default gql`
  query program($id:ID!) {
    program(id:$id){
      _id
      type
      name
      createdAt
      createdBy
      shopId
      program_content
      field
      price
      modes
      priceType
      duration
      batches {
        _id
        name
        batch_max_limit
        batchStartTime
        batchEndTime
        certificate{
          _id
          templateImage
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
              topic_content
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