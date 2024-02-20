import gql from "graphql-tag";

export default gql`
  query studentAssignGroups($shopId: String) {
    studentAssignGroups(shopId: $shopId) {
        _id
        name
        createdBy
        createdAt
        stream
        selectedStartYear
        selectedEndYear
        account{
            _id
            name
        }
        trainingPartners{
            _id
            name
        }
        groupPrograms{
            _id
      type
      name
      createdAt
      createdBy
      shopId
      program_content
      field
      price
      priceType
      duration
      batches {
        _id
        name
        batch_max_limit
        batchStartTime
        batchEndTime
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
              assignment_title
              createdAt
              createdBy
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
    }
`;
