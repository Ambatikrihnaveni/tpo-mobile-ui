import React, {useContext} from "react";

export const AuthContext = React.createContext({
    isViewerLoading: false,
    refetchViewer: null,
    viewer: null,
    authUser: null,
    authToken: null,
    isLoading: false,
    fallbackPath: "/user/login"
});
