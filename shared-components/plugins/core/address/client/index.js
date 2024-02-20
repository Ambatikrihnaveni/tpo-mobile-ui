import React ,{lazy} from 'react';
import { registerOperatorRoute } from "/imports/client/ui";
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

const AddressValidationSettingsRegion = lazy(()=>import("./components/AddressValidationSettingsRegion"))
const ShopAddressValidationSettings = lazy(()=>import("./containers/ShopAddressValidationSettings"))



registerOperatorRoute({
  group: "settings",
  MainComponent: AddressValidationSettingsRegion,
  path: "/settings/address-validation-settings",
  priority: 170,
  sidebarI18nLabel: "addressValidation.title"
});

registerBlock({
  region: "AddressValidationSettings",
  name: "AddressValidationSettings",
  component: ShopAddressValidationSettings,
  priority: 1
});
