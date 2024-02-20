import React,{lazy} from 'react';
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

const PaymentSettingsRegion = lazy(()=>import("./PaymentSettingsRegion"))
const PaymentSettings = lazy(()=>import("./PaymentSettings"))


registerOperatorRoute({
  group: "settings",
  MainComponent: PaymentSettingsRegion,
  priority: 120,
  path: "/payment",
  sidebarI18nLabel: "admin.settings.paymentSettingsLabel"
});
registerBlock({
  region: "PaymentSettings",
  name: "PaymentSettings",
  component: PaymentSettings,
  priority: 1
});
