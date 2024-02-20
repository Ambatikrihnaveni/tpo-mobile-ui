import React from "react";
import InboxIcon from "mdi-material-ui/Inbox";

import { registerOperatorRoute } from "/imports/client/ui";
import Orders from "../../orders/client/components/OrdersTable"





// Register order related routes
/*
 * Single order page route
 */


/*
 * Single order print layout route
 */


/*
 * Orders table route
 */
registerOperatorRoute({
  group: "navigation",
  priority: 22,
  
  MainComponent: Orders,
  path: "/students",
  SidebarIconComponent: (props) => <InboxIcon {...props} />,
  sidebarI18nLabel: "Students"
});


// Register order related blocks
/*
 * OrderCardSummary
 */
