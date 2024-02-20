import gql from "graphql-tag";

export default gql `

  query tutorCalendarEventDetails($accountId:ID , $batchId:ID,$lessonId:ID) {
    tutorCalendarEventDetails(id:$accountId,batch_id:$batchId,lesson_id:$lessonId){
        _id
        name
        batchId
        productId
        lessonScheduleDate
        status
        students{
          _id
          firstName
          language
          lastName
          name
          primaryEmailAddress
          
          adminUIShops {
            _id
            brandAssets {
              navbarBrandImage {
                large
              }
            }
            name
            shopLogoUrls {
              primaryShopLogoUrl
            }
          }
          shopId{
            _id
            name
          }
          role
          phoneNumber
          isProfile
          userMedia {
            _id
            URLs {
              small 
            }
            priority
          }
          profile{
            bio
            address
            qualification
            experience
            price
            isStatus
            isApproved
            availableDays
            picture
            categories
            selectedFromTime
            selectedToTime
            certificates
          }
        }
        assignments{
          assignmentName
          course
          totalMarks
          totalSubmit
          assignmentId
        }
        
    }
  }
`;
