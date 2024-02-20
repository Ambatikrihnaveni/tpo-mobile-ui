import gql from "graphql-tag";

export default gql`
  query tutorStudents($shopId:String $query:String) {
    tutorStudents(shopId:$shopId query:$query) {
        _id
        emailRecords{
            address
            verified
        }
        profile{
            isStatus
            isApproved
            address
            qualification
            status
            year
            address   
            city
            company_location
            country
            degree
            employer
            end_month
            end_year
            field_of_study
            graduation_month
            graduation_year
            isCurrentWorkingSameCompany
            jobTitle
            pincode
            socialMediaLinks{
              socialMediaAccount
              link
            }
            school_location
            school_name
            skills{
              skill
              skill_rating
            }
            start_month
            start_year
            summary
            graduation_score
            surname
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
        programs{
          _id
          name
        }
    }
    }
`;
