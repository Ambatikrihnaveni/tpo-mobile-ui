import gql from "graphql-tag";

export default gql`
  query students( $shopId:ID $query:String) {
    students(shopId:$shopId query:$query) {
        _id
        emailRecords{
            address
            verified
        }
        profile{
          bio
          address
          qualification
          experience
          collegeAdminName
          collegeAdminEmail
          collegeAdmindesignation
          collegeSpecializations
          price
          isStatus
          isApproved
          availableDays
          picture
          categories
          city
          website
          country
          coursesOffered
          achievements
          pincode
          selectedFromTime
          selectedToTime
          certificates
          school_name
          school_location
          degree
          field_of_study
          graduation_month
          graduation_year
          graduation_score
          surname
          jobTitle 
          employer
          company_location
          state
          start_month
          socialMediaLinks{
            socialMediaAccount
            link
          }
          institutes
          start_year
          end_month
          end_year
          isCurrentWorkingSameCompany,
          jobTitleSkills,
          skills{
            skill
            skill_rating
          }
          qualifications{
            qualification
            instituteName
            field_of_study
            location
            year_of_passing
            score
          }
          experiences{
            jobTitle
            employer
            company_location
            start_month
            start_year
            end_month
            end_year
            isCurrentWorkingSameCompany
          }
          summary 
          streams{
            streamType
            streamsOffered
          }
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
