import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import classNames from "classnames";
import { Link,} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";
import {Avatar,InputBase,MenuItem,Select,Typography} from "@mui/material"
const defaultLogo = ""; //default logo


const styles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  menuItem: {
    "& a span": {
      color: theme.palette?.colors?.black90
    }
  },
  selectMenu: {
    "& a span": {
      color: theme.palette?.colors?.black15
    }
  },
  dummyShopName: {
    color: theme.palette?.colors?.black15
  },
  newShopLink: {
    "color": theme.palette?.colors?.darkBlue,
    "&:hover": {
      color: theme.palette?.colors?.darkBlue
    }
  },
  plusIcon: {
    display: "flex",
    justifyContent: "center"
  },
  selectArrow: {
    color: theme.palette?.colors?.black15
  }
});



const ShopSelectorInput = withStyles(() => ({
  input: {
    "border": "none",
    "color":"#ffffff",
    "&:focus": {
      border: "none",
      background: "transparent",
      
    }
  }
}))(InputBase);

/**
 * ShopSelectorWithData
 * @param {Object} props Component props
 * @returns {Node} React component
 */
function ShopSelectorWithData({ className, classes, shouldShowShopName, linkTo, size,viewer}) {
      
  const {shopId,setShopId} = useCurrentShopId();

  
const onShopClick=(id)=>{
  setShopId(id)
}

  let adminUIShops = [];

  if (viewer?.adminUIShops) {
    if(viewer?.role=="Tutor"){
      adminUIShops= viewer?.shopId
    }else{
      ({ adminUIShops } = viewer);
    }
   
  } else {
    return (
      <Link
        className={classNames(classes.root, className)}
        to={linkTo}

      >
        
       
        {shouldShowShopName &&
        <Typography
          className={classes.dummyShopName}
          component="span"
          variant="h5"
        >
          TPO.AI
        </Typography>
        }
      </Link>
    );
  }
 
  


  return (
    <Select classes={{ selectMenu: classes.selectMenu, icon: classes.selectArrow }}
     value={shopId || "new-shop"} 
     input={<ShopSelectorInput />}
    
    MenuProps={{
      sx: {
        "&& .Mui-selected": {
          backgroundColor: "#50C2C9",
          color: "white" // Set the text color to white when a shop is selected
        },
        "&& .Mui-selected:hover": {
          backgroundColor: "#50C2C9" // Optional: Set the background color when the selected shop is hovered
        },
        "&& .MuiListItem-root": {
          color: "primary" // Set the text color to the primary color when no shop is selected
        }
      }
    }}
    
    >
      {adminUIShops.map((shop) => {
        const customLogoFromUpload = shop.brandAssets && shop.brandAssets.navbarBrandImage && shop.brandAssets.navbarBrandImage.large;
        const customLogoFromUrlInput = shop.shopLogoUrls && shop.shopLogoUrls.primaryShopLogoUrl;
        // Replace only the first segment of the URL with the shop ID and keep the rest (if any)
       // const linkUrl = location.pathname.replace(/(\/.[^/]*(\/.*)?)/g, (match, firstUrlSegment, restOfUrl) => `/${shop._id}${restOfUrl || ""}`);
        const shopName=shop.name

    const string = shop?.name
    const truncateString = (str = '', maxLength = 50) => str.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const truncateName = truncateString(string, 15);

        return (
          <MenuItem className={classes.menuItem} value={shop._id} key={shop._id} onClick={()=>{onShopClick(shop._id)}}>
            <Link
              className={classNames(classes.root, className)}
              style={{textDecoration:"none"}}
            >
             

               <Avatar
               
                 alt={shop.name}
                 src="jhg.jpg"
                 sx={{ bgcolor: "#03ce97",width: 30, height: 30 }}
                style={{marginRight:"10px"}}
               />
              {shouldShowShopName &&
                <Typography
                  variant="h5"
                  component="span"
                  sx={{color:" primary",fontWeight:'bold'}}
                >
                  {truncateName && truncateName?.charAt(0).toUpperCase() + truncateName.slice(1)}
                </Typography>
              }
            </Link>
          </MenuItem>
        );
      })}
     
    </Select>
  );
}

ShopSelectorWithData.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  linkTo: PropTypes.string,
  shopId: PropTypes.string,
  shouldShowShopName: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  viewer: PropTypes.object
};

ShopSelectorWithData.defaultProps = {
  linkTo: "/",
  shouldShowShopName: false,
  size: 60
};

export default compose(
 // withComponents,
  withStyles(styles, { name: "RuiShopSelectorWithData" })
)(ShopSelectorWithData);
