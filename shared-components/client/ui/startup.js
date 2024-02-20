import React from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { ApolloProvider } from "react-apollo";
import { loadRegisteredBlocks, loadRegisteredComponents } from "@reactioncommerce/reaction-components";
import initApollo from "/imports/plugins/core/graphql/lib/helpers/initApollo";
import getRootNode from "./utils/getRootNode";
import BaseService from "./graphql/services/base-service";
import App from './appLayout/App'
//import LoadableVisibility from "react-loadable-visibility/react-loadable";

/* const LoadingComponent = (props) => {
  
  return (
    <div style={{marginTop:'40vh'}}>
      <div style={{ margin: "auto", textAlign: "center" }}>
        <img src="/loading.gif" width="80px" />
      </div>
    </div>
  );
};

const LoadableComponent = LoadableVisibility({
  loader: () => import("./appLayout/App"),
  loading: LoadingComponent
}); */

Meteor.startup(() => {
  loadRegisteredBlocks();
  loadRegisteredComponents();

  const apolloClient = initApollo();
  Tracker.autorun((computation) => {
    const primaryShopSub = Meteor.subscribe("PrimaryShop");
    if (primaryShopSub.ready()) {
      BaseService.setApolloClient(apolloClient);
      ReactDOM.render(
        <ApolloProvider client={apolloClient}>
          <App/>
        </ApolloProvider>,
        getRootNode()
      );
      computation.stop();
    }
  });
});
