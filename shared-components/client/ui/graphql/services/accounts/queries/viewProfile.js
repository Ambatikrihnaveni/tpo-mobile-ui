import gql from "graphql-tag";

export default gql`

query viewProfile ($userId:String){
    viewProfile (userId:$userId) {
        _id
        firstName
        language
        lastName
        name
        primaryEmailAddress
        shopId{
          _id
          name
        }
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
          collegeAdminName
          collegeAdminEmail
          collegeAdmindesignation
          collegeSpecializations
          price
          accountName
          accountNumber
          bankName
          branch
          ifscCode
          additional{
            additionalType
            links
            languages{
              language
              level
            }
            accomplishments
            certifications
            additionalInfo
          }
          isStatus
          fatherName
          hallTicketNumber
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
        programs{
          _id
          name
        }
        students
      }
      
    }

  `;