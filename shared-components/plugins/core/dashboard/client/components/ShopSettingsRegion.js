import React from "react";
import { Blocks } from "@reactioncommerce/reaction-components";
import {
  Box,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(4)
  }
}));

/**
 * @summary Renders payment settings page
 * @param {Object} props Component props
 * @return {React.Node} React node
 */
export default function ShopSettingsRegion(props) {
  const classes = useStyles();
  return (
    <>
      
      <Blocks region="ShopSettings" blockProps={props}>
        { (blocks) =>
          blocks.map((block, index) => (
            <Box paddingBottom={2} key={index}>
              {block}
            </Box>
          ))}
      </Blocks>
    </>
  );
}
