import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import JumboApp from "@jumbo/components/JumboApp";
import AppLayout from "./AppLayout";
import JumboTheme from "@jumbo/components/JumboTheme";
import AppRoutes from "./AppRoutes";
import configureStore, { history } from "./redux/store";
import JumboDialog from "@jumbo/components/JumboDialog";
import JumboDialogProvider from "@jumbo/components/JumboDialog/JumboDialogProvider";
import { SnackbarProvider } from "notistack";
import AppProvider from "./AppProvider";
import { config } from "./config/main";
import JumboRTL from "@jumbo/JumboRTL/JumboRTL";
import Div from "@jumbo/shared/Div";
import { CircularProgress } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import { TranslationProvider } from "/imports/plugins/core/ui/client/providers";
//import appComponents from "../appComponents";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { defaultTheme } from "@reactioncommerce/catalyst";
import theme from "../theme";
import JumboAuthProvider from "@jumbo/components/JumboAuthProvider/JumboAuthProvider";
import RouterContext from "../context/RouterContext";
//import routes from "./routes";
//import { operatorRoutes } from "../index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

/**
 *  <AppRoutes />
 */

const store = configureStore();

function App() {
  const el = document.getElementsByTagName("body");

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter history={history}>
          <TranslationProvider>
              <AppProvider>
                <JumboApp activeLayout={config.defaultLayout}>
                  <JumboTheme init={config.theme}>
                    <JumboRTL>
                      <JumboDialogProvider>
                        <JumboDialog />
                        <SnackbarProvider
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                          }}
                          maxSnack={3}
                        >
                          <JumboAuthProvider>
                            <AppLayout>
                              <Suspense
                                fallback={
                                  <Div
                                    sx={{
                                      display: "flex",
                                      minWidth: 0,
                                      alignItems: "center",
                                      alignContent: "center",
                                      height: "100%",
                                     
                                    }}
                                  >
                                    <CircularProgress sx={{ m: "40vh auto " }} />
                                  </Div>
                                }
                              >
                                <ComponentsProvider >
                                  <MuiThemeProvider theme={theme}>
                                    <MuiThemeProvider theme={defaultTheme}>
                                      <DndProvider backend={HTML5Backend} options={{ rootElement: el }}>
                                        <AppRoutes />
                                      </DndProvider>
                                    </MuiThemeProvider>
                                  </MuiThemeProvider>
                                </ComponentsProvider>
                              </Suspense>
                            </AppLayout>
                          </JumboAuthProvider>
                        </SnackbarProvider>
                      </JumboDialogProvider>
                    </JumboRTL>
                  </JumboTheme>
                </JumboApp>
              </AppProvider>
          </TranslationProvider>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
