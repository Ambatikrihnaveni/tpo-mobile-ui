import React, { useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { removeToken, storeToken } from "./authHelpers";
import { AuthContext } from "@jumbo/components/JumboAuthProvider/JumboAuthContext";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { setAccessToken } from "/imports/plugins/core/graphql/lib/helpers/initApollo";
import authServices from "../../../appLayout/services/auth-services";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId.js";
import useAuth from "../../../hooks/useAuth";

const viewerQuery = gql`
query getViewer {
  viewer {
    _id
    firstName
    language
    lastName
    name
    primaryEmailAddress
    adminUIShops {
      _id
      brandAssets {
        navbarBrandImage {
          large
        }
      }
      name
      shopLogoUrls {
        primaryShopLogoUrl
      }
    }
    role
    shopId{
      _id
      name
    }
    phoneNumber
    isProfile
    profile{
      bio
      address
      qualification
      experience
      price
      isStatus
      isApproved
      availableDays
      picture
      categories
      selectedFromTime
      selectedToTime
      certificates
    }
    isCollegeDetails
    isStudentProfile
  }
}
`;


const init = () => {

  const storedToken = typeof window !== "undefined" ? window.localStorage.getItem("accounts:accessToken") : undefined;
  if (storedToken) {
    setAccessToken(storedToken);
    storeToken(storedToken);
  }
  return {
    isViewerLoading: false,
    error: null,
    viewer: null,
    refetchViewer: null,
    authToken: storedToken ?? null,
    authUser: null,
    isLoading: false,
    fallbackPath: "/user/login"
  };
};

const navigateToDefaultUrl = (authUser, navigateTo, shopId, resetToken, viewer) => {
  localStorage.setItem('"accounts:role"',authUser?.role );
  if (authUser?.role == "") {
    navigateTo("/user/set-role");
  } else if (authUser?.role == "Admin" || authUser?.role == "Master-Admin") {
    let url = null;
    if (/* !shopId || shopId=="null" &&  */authUser?.adminUIShops?.length > 0) {
      const id = authUser?.adminUIShops[0]?._id
      // setShopId(id)
      localStorage.setItem('accounts:shopId', id)
      url = "/dashboard";
    } else if (shopId && authUser?.adminUIShops?.length > 0) {
      url = "/dashboard";
    }/*  else if (shopId == "undefined" || shopId == undefined) {
      url = "/new-institute";
    } */
    if (url) {
      firstTimePageLoad = false;
      navigateTo(url);
    }
  } else if (authUser.role == 'College-Admin') {

    if (authUser.isCollegeDetails == false) {
      navigateTo('/user/college-details')
    } else if (authUser?.isCollegeDetails == true) {
      let url = null;
      if (authUser?.adminUIShops?.length > 0) {
        const id = authUser?.adminUIShops[0]?._id
        localStorage.setItem('accounts:shopId', id)
        url = "/dashboard";
      } else if (shopId && authUser?.adminUIShops?.length > 0) {
        url = "/dashboard";
      } /* else if (shopId == "undefined" || shopId == undefined) {
        url = "/new-institute";
      } */
      if (url) {
        firstTimePageLoad = false;
        navigateTo(url);
      }
    }
  } else if (authUser.role === "Tutor") {
    ;
    if (authUser.isProfile == false) {
      navigateTo("/user/set-profile")
    } else if (authUser?.isProfile == true && authUser.profile.isApproved == false) {
      navigateTo("/user/profile-setup-success")
    } else if (authUser?.isProfile == true && authUser?.profile?.isApproved == true) {
      const id = authUser?.shopId[0]?._id
      // setShopId(id)
      localStorage.setItem('accounts:shopId', id)
      navigateTo('/dashboard')
    }
  } else if (authUser.role === "Student") {
    if (authUser?.isStudentProfile == false) {
      navigateTo("/user/set-studentProfile")
    } else if (authUser?.isStudentProfile == true) {
      navigateTo("/dashboard");
    }
  }
};




const findUrlParams = (urlPath) => {
  const urlPaths = urlPath.split("/");
  return {
    shopId: urlPaths[1],
    urlPaths: urlPaths,
    urlPath: urlPath
  };
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "set-auth-data":
      return {
        ...state,
        ...action.payload
      };

    case "start-loading":
      return {
        ...state,
        isLoading: true
      };

    case "stop-loading":
      return {
        ...state,
        isLoading: false
      };
  }
};

function useUrlQuery() {
  return new URLSearchParams(useLocation().search); // eslint-disable-line node/no-unsupported-features/node-builtins
}

const JumboAuthProvider = ({ children, ...restProps }) => {

  const { loading, error, data: viewerData, refetch } = useQuery(viewerQuery);
  const storedToken = typeof window !== "undefined" ? window.localStorage.getItem("accounts:accessToken") : undefined;
  const [authOptions, setAuthOptions] = useReducer(authReducer, restProps, init);
  const [logout, setLogout] = React.useState(false);
  const urlQuery = useUrlQuery();
  const resetToken = urlQuery.get("resetToken");
  const navigate = useNavigate();
  const { setShopId, shopId } = useCurrentShopId();
  const location = useLocation();
  const { viewer } = useAuth()

  React.useEffect(() => {
    ;
    if (logout) {
      removeToken();
      setAccessToken(null);
      setShopId(null)
      localStorage.removeItem('"accounts:role"');
      authServices.logout();
      setAuthOptions({
        type: "set-auth-data",
        payload: {
          authToken: null,
          authUser: null,
          isLoading: false
        }
      });
      setLogout(false);
    }
  }, [logout]);

  const setAuthToken = React.useCallback(async (token) => {
    setAuthOptions({ type: "start-loading" });
    if (!token) {
      setLogout(true);
      return;
    }
    setAccessToken(token);
    try {
      refetch();
    } catch (error) {
      setLogout(true);
      console.error(error);
    }
  }, []);

  const setRedirectPath = React.useCallback((redirectPath) => {
    setAuthOptions({ type: "set-redirect-path", payload: { redirectPath } });
  }, []);

  const setAuthData = React.useCallback((data) => {
    setAuthOptions({ type: "set-auth-data", payload: data });
  }, []);

  const contextValue = React.useMemo(() => {
    return {
      isViewerLoading: loading,
      error,
      viewer: viewerData?.viewer,
      refetchViewer: refetch,
      ...authOptions,
      setAuthData,
      setRedirectPath,
      setAuthToken,
      setAuthOptions
    };
  }, [authOptions]);

  React.useEffect(() => {
    if (resetToken && location.pathname.indexOf("reset-password") == -1) {
      navigate("/reset-password?resetToken=" + resetToken);
    } else if (!storedToken) {
      if (location.pathname.indexOf("/user/") == -1) {
        navigate(authOptions?.fallbackPath);
      }
    } else if (!viewerData?.viewer) {
      setAuthToken(storedToken);
    } else if (viewerData?.viewer) {
      setAuthOptions({
        type: "set-auth-data",
        payload: {
          authToken: storedToken,
          isLoading: false,
          authUser: viewerData?.viewer
        }
      });

      if (!shopId || shopId == "null") {
        setShopId(viewerData?.viewer?.adminUIShops[0]?._id)
      }

      navigateToDefaultUrl(viewerData?.viewer, navigate, shopId, resetToken, viewer);
    }
  }, [storedToken]);

React.useEffect(()=>{
  const authUser = viewerData?.viewer
  localStorage.setItem('"accounts:role"',authUser?.role );
  if (authUser?.role == "Admin" || authUser?.role == "Master-Admin" || authUser?.role == "College-Admin") {
    
    if (authUser?.adminUIShops?.length > 0) {
      const id = authUser.adminUIShops[0]?._id
      localStorage.setItem('accounts:shopId', id)
    }
  }else if (authUser?.role == "Tutor") {
    const id = authUser?.shopId[0]?._id
    localStorage.setItem('accounts:shopId', id)
  }
  if (authUser?.role == "") {
      navigate("/user/set-role");
    } else if (authUser?.role == 'College-Admin') {
  
      if (authUser?.isCollegeDetails == false) {
        navigate('/user/college-details')
      }
    } else if (authUser?.role === "Tutor") {
  
      if (authUser?.isProfile == false) {
        navigate("/user/set-profile")
      } else if (authUser?.isProfile == true && authUser?.profile?.isApproved == false) {
        navigate("/user/profile-setup-success")
      }
    } else if (authUser?.role === "Student") {
      if (authUser?.isStudentProfile == false) {
        navigate("/user/set-studentProfile")
      }
    }else if(viewerData?.viewer && storedToken && (location.pathname== "/user/login" || location.pathname=="/user/sign-up"|| location.pathname=='/user/forgot-password')){
      navigate('/dashboard')

    }
  
  
},[storedToken, viewerData?.viewer])
  
  React.useEffect(() => {
    if (error?.networkError?.result?.message == "Unauthorized") {
      window.localStorage.clear();
      setAuthOptions({
        type: "set-auth-data",
        payload: {
          authToken: null,
          authUser: null,
          isLoading: false
        }
      });
      navigate('/user/login');
    }
  }, [error])
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default JumboAuthProvider;
