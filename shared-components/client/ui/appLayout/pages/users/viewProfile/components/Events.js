import React, {useState} from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {List} from "@mui/material";
import EventItem from "./EventItem";
import useCurrentShopId from '../../../../../hooks/useCurrentShopId';
import StudentAddationals from '../components/studentaddationals';
import MyProgramService from '../../../../../graphql/services/programs/myProgram-services';



const Events = ( {viewer} ) => {
  const userdata = { ...viewer }
  let role = userdata.role;
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
    >
      <List disablePadding>
        <div>
          { role == "Student" || isListEmpty ? (
            <StudentAddationals viewer={viewer}/>
          ) : (
            <ul>
              {programsList.all.map((event, index) => (
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