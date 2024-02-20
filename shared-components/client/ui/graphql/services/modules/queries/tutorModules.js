import gql from "graphql-tag";

export default gql`
  query tutorProducts($shopId:String, $query: String) {
    tutorProducts(shopId:$shopId, query: $query) {
      _id
      title
      currentProductHash
      isVisible
      description
      createdAt
      account{
        name
        _id
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
      }
      students{
        _id
        name
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
