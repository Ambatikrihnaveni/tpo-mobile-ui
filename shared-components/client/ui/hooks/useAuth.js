import { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { setAccessToken } from "/imports/plugins/core/graphql/lib/helpers/initApollo";

const viewerQuery = gql`
query getViewer {
  viewer {
    _id
    firstName
    language
    lastName
    name
    isStudentProfile
    primaryEmailAddress
    isCollegeDetails
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
        large 
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
      bankName
      ifscCode
      accountNumber 
      branch
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
        description
      }
      summary 
      streams{
        streamType
        streamsOffered
      }
    }
    quizzes{
      quizId
      result
      given_answer
      
    }
    programs{
      _id
      name
    }
    students
  }
}
`;

/**
 * Hook to get user permissions for the App component
 * @return {Object} Permissions
 */
export default function useAuth() {
  const authToken = typeof window !== "undefined" ? window.localStorage.getItem("accounts:accessToken") : undefined;
  const { loading, error, data: viewerData, refetch } = useQuery(viewerQuery);

  if (error) {
    console.log(error); // eslint-disable-line no-console
  }

  // Perform a `viewer` query whenever we get a new access token
  useEffect(() => {
    
    setAccessToken(authToken);
    refetch();
  }, [authToken, refetch]);

  return {
    isViewerLoading: loading,
    refetchViewer: refetch,
    viewer: viewerData?.viewer
  };
}
