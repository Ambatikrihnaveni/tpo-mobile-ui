import React ,{lazy} from 'react';
import { registerOperatorRoute } from "../../../../../imports/client/ui";
import { registerBlock } from "@reactioncommerce/reaction-components";
import LoadableVisibility from "react-loadable-visibility/react-loadable";

const LoadingComponent = (props) => {
  return (
    <div style={{marginTop:'40vh'}}>
      <div style={{margin: 'auto', textAlign:'center'}}>
       <img src="/loading.gif" width="80px" />
      </div>
    </div>
  )
}

const EmailSettingsRegion = lazy(()=>import("./components/EmailSettingsRegion"))
const EmailTable = lazy(()=>import("./components/EmailSettingsRegion"))

registerOperatorRoute({
  group: "settings",
  path: "/settings/email",
  MainComponent: EmailSettingsRegion,
  priority: 150,
  sidebarI18nLabel: "admin.dashboard.emailLabel"
});

registerBlock({
  component: EmailTable,
  name: "EmailSettingsGeneral",
  priority: 1,
  region: "EmailSettings"
});
