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

const LocalizationSettingsRegion = lazy(()=>import("./components/LocalizationSettingsRegion"))
const LocalizationSettingsForm = lazy(()=>import("./components/LocalizationSettingsForm"))


registerOperatorRoute({
  group: "settings",
  MainComponent: LocalizationSettingsRegion,
  path: "/settings/localization",
  sidebarI18nLabel: "admin.i18nSettings.shopLocalization",
  priority: 160
});

registerBlock({
  component: LocalizationSettingsForm,
  name: "LocalizationSettings",
  priority: 1,
  region: "LocalizationSettings"
});
