import React,{useEffect} from 'react';
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import styled from "@mui/material/styles/styled";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import StudentSkills from './studentSkills';
import TutorSkills from './tutorSkills';
import gql from "graphql-tag";
import useCurrentShopId from '../../../../../hooks/useCurrentShopId';
import TutorsService from '../../../../../graphql/services/tutors/tutors-service';
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

const StyledBadge = styled(Badge)(({ theme }) => ({
    paddingBottom: '75%',
    display: 'flex',

    '& .MuiBadge-badge': {
        top: '15px',
        right: '14px',
        boxShadow: `0 0 0 1px ${theme.palette.common.white}`,
    }
}));
const StyledAvatar = styled(Avatar)(({ theme }) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 8,

    '&::after': {
        content: "''",
        position: 'absolute',
        display: 'inline-block',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: alpha(theme.palette.common.black, .25),
        background: `linear-gradient(${alpha(theme.palette.common.black, .1)}, ${alpha(theme.palette.common.black, .95)})`,
    }
}));
const StyledBadgeContent = styled('div')({
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 6,
});
const Item = styled('div')({
    width: '33.33%',
    padding: '0 5px',
    marginBottom: '10px',
});
const { filesBaseUrl } = Meteor.settings.public;

const Friends = ({viewer}) => {

    let role = viewer?.role;
    const [tutors, setTutors] = React.useState([])
   const { shopId } = useCurrentShopId()

    React?.useEffect(async () => {
        const queryParams = { filterPrms: { status: "" } }
        const tutorsData = await TutorsService.getTutors(shopId, { queryParams })
        setTutors(tutorsData)

    }, [shopId])
    return (
        <JumboCardQuick style={{ minHeight: '150px' }}
            title={
                role === 'Tutor' || role === 'Student' ? 'Skills' : role === 'College-Admin' ? 'Team' : 'Tutors'
            }
            wrapperSx={{ pt: 0 }}
        >
            {role === 'Tutor' ? <TutorSkills viewer={viewer}/> : role === 'Student' ? <StudentSkills viewer={viewer}/> :
                <Stack direction="row" flexWrap={"wrap"} sx={{ margin: '0 -10px' }}>
                    {
                        tutors?.map((item, index) => (
                            <Item key={index}>
                                <StyledBadge overlap={"circular"} variant={"dot"} color={item.color}>
                                    <StyledAvatar
                                        alt={"Remy Sharp"}
                                        src={`${filesBaseUrl}${item?.userMedia[0]?.URLs?.small}`}
                                        variant={"rounded"}
                                    >
                                        {item.name.charAt(0).toUpperCase()} 
                                    </StyledAvatar>

                                    <StyledBadgeContent>
                                        <Typography fontSize={"small"} noWrap variant="body2" color="common.white">
                                            {item.name}
                                        </Typography>
                                    </StyledBadgeContent>
                                </StyledBadge>
                            </Item>
                        ))
                    }
                </Stack>}
        </JumboCardQuick>
    );
};

export default Friends;
