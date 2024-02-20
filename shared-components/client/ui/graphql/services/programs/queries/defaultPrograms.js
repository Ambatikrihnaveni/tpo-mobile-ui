import gql from "graphql-tag";

export default gql`
  query defaultPrograms($type:String){
    defaultPrograms(type:$type){
      _id
      type
      name
      createdAt
      createdBy
      price
      field
      priceType
      status
      modes
      isBatchExistInCollege
      isPublished
      isApproved
      duration
      batches {
        _id
        name
        batchStartTime
        batchEndTime
        batch_max_limit
        seatsFilled
        seatsAvailable
        startDate
        enrolementStartDate
        enrolementEndDate
        certificate{
          _id
          templateImage
        }
        tutors {
          _id
          name
          userMedia {
            _id
            URLs {
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
      program_content
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
      tutors{
        _id
        name
        userMedia {
          _id
          URLs {
            thumbnail
          }
          priority
        }
      }
      products{
        _id
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
          lessonStatus
        }
      }
    }
  }
`;