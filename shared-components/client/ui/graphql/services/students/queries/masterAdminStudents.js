import gql from "graphql-tag";

export default gql`
query allStudents($query: String) {
    allStudents(query: $query) {
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
        socialMediaLinks{
          socialMediaAccount
          link
        }
        graduation_month
        graduation_year
        isCurrentWorkingSameCompany
        jobTitle
        pincode
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
      colleges{
        _id
        name
      }
    }
}
`