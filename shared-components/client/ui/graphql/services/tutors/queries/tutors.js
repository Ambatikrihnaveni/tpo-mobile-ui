import gql from "graphql-tag";

export default gql`
  query tutors(
        $shopId: ID
        $status: String
        $categories: [String]
        $query: String
  ) {
    tutors(
        shopId: $shopId
        status: $status
        categories: $categories
        query: $query
    ) {
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
            small
          }
          priority
        }
        role
        userId
        isProfile
        name
        phoneNumber
        createdAt
        moduleIds
        modules{
          _id
          title
        }
      }
    }
`;
