import React, { useState } from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { List, Typography } from "@mui/material";
import EventItem from "./EventItem";
import useAuth from '../../../../../hooks/useAuth';
import { useQuery } from 'react-apollo';
import gql from "graphql-tag";
import useCurrentShopId from '../../../../../hooks/useCurrentShopId';
import StudentAddationals from './studentAddationals';
import MyProgramService from '../../../../../graphql/services/programs/myProgram-services';
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


const Events = ({ sx }) => {
    
  const { isViewerLoading, viewer, data } = useAuth();
  const [user, setUser] = useState(viewer);
  const userdata = { ...viewer }
  const { data: viewerData } = useQuery(viewerQuery);
  let role = viewerData?.viewer.role;
  const [programsList, setProgramsList] = React.useState([])
  const { shopId } = useCurrentShopId()
  const isListEmpty = !programsList.all || programsList.all.length === 0;

  React.useEffect(async () => {
    const programs = await MyProgramService.getRecords(shopId, {});
    setProgramsList(programs)
  }, [shopId])
  return (
    <JumboCardQuick
      title={  role === 'Student' ? 'Additional Fields' : role === 'College-Admin' ? "Events" : "Programs"}
      subheader={userdata?.adminUIShops ? userdata?.adminUIShops[0]?.name : ''}
      wrapperSx={{ p: 0 }}
      headerSx={{
        borderBottom: 1,
        borderBottomColor: 'divider'
      }}
      sx={sx}
    >
      <List disablePadding>
        <div>
          { role == "Student"  ? (
            <StudentAddationals/>
          ) : isListEmpty ?
          (<Typography style={{verticalAlign:'center',textAlign:'center',marginTop:'60px',marginBottom:'40px'}}> No data available</Typography>) :
          role === 'College-Admin' ?
          (<Typography style={{verticalAlign:'center',textAlign:'center',marginTop:'60px',marginBottom:'40px'}}> No data available</Typography>) :
          (
            <ul>
              {programsList?.all?.map((event, index) => (
                <EventItem event={event} key={index} />
              ))}
            </ul>
          )}
        </div>
      </List>
    </JumboCardQuick>
  );
};

export default Events;