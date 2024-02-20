import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import SchoolIcon from '@mui/icons-material/School';
import gql from "graphql-tag";
import { useQuery } from 'react-apollo';
import { view } from 'ramda';
const viewerQuery = gql`
query getViewer {
  viewer {
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
    role
    shopId{
      _id
      name
    }
    phoneNumber
    isProfile
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
}
`;
const ProjectCounterCard = (props) => {
  const { data: viewerData } = useQuery(viewerQuery);
  let institutes = viewerData?.viewer.adminUIShops;
let role= viewerData?.viewer.role

  return (
    <JumboCardQuick bgColor={'white'}>
      <Div sx={{ display: "flex", alignItems: 'center' }}>
        {/* < img alt={"Properties Icon"} src={getAssetPath(`${ASSET_IMAGES}/dashboard/projectIcon.svg`,"46x46")}/>  */}
        <Div sx={{ flex: 1 }}>
          <Typography mb={.5} style={{ marginRight: "10px" }}>Institutes<div style={{ width: '5px', height: '20px', float: 'right', color: 'blue', marginRight: "10px" }}>

            <SchoolIcon style={{ fontSize: "25px" }} />

          </div></Typography>

          {/*                     <Typography   mb={0}>{(institutes)? institutes?.length : 0}</Typography>
 */}
          {role === "Admin" && (
            <Typography mb={0}>{institutes ? institutes.length : 0}</Typography>
          )}

          {role === "Master-Admin" && (
            <Typography mb={0}>{props?.institutes ? props.institutes.length : 0}</Typography>
          )}

        </Div>
      </Div>
    </JumboCardQuick>
  )
};

export default ProjectCounterCard;