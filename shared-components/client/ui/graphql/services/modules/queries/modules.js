import gql from "graphql-tag";

export default gql`
  query products($shopIds: [ID]!, $productIds: [ID], $query: String, $first: ConnectionLimitInt, $offset: Int) {
    products(shopIds: $shopIds, productIds: $productIds, query: $query, first: $first, offset: $offset) {
      _id
      title
      currentProductHash
      isVisible
      description
      pdfs{
        fileName
        fileUrl
      }
      createdAt
      account{
        name
      }
      lessons{
        _id
        name
        topics{
          _id
          shopId
          productId
          lessonId
          topic_name
          topic_summary
          topic_content
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
          shopId
          productId
          lessonId
          quiz_question
          quiz_answer
          quiz_title
          quiz_options{
            optionA
            optionB
            optionC
            optionD
          }
          quiz_hint

        }
      }
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
      media {
        _id
        URLs {
          thumbnail
          small
          medium
          large
        }
      }
      pricing {
        displayPrice
      }
      publishedProductHash
      variants {
        _id
      }
      shop {
        _id
      }
    }
  }
`;
