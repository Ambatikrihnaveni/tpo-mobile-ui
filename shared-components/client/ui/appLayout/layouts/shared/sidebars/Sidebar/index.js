import React, { Suspense, useState } from "react";
import { Divider, IconButton } from "@mui/material";
import TP_menus from "./sidebarMenus/TP_menus";
import MA_menus from "./sidebarMenus/MA_menus";
import CA_menus from "./sidebarMenus/CA_menus";
import tutorMenus from "./sidebarMenus/tutorMenus";
import studentMenus from "./sidebarMenus/studentMenus";
import JumboVerticalNavbar from "@jumbo/components/JumboVerticalNavbar/JumboVerticalNavbar";
import { DrawerHeader } from "@jumbo/components/JumboLayout/style";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import useJumboSidebarTheme from "@jumbo/hooks/useJumboSidebarTheme";
import { SIDEBAR_STYLES, SIDEBAR_VIEWS } from "@jumbo/utils/constants/layout";
import Logo from "../../../../shared/Logo";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Zoom from "@mui/material/Zoom";
import Div from "@jumbo/shared/Div";
import SidebarSkeleton from "./SidebarSkeleton";
import Toolbar from "@material-ui/core/Toolbar";
import useIsAppLoading from "/imports/client/ui/hooks/useIsAppLoading.js";
import useCurrentShopId from "/imports/client/ui//hooks/useCurrentShopId";
import useOperatorRoutes from "/imports/client/ui//hooks/useOperatorRoutes";
import useAuth from "../../../../../hooks/useAuth";
import ShopSelectorWithData from "/imports/client/ui/components/ShopSelectorWithData";
import AuthUserDropdown from "../../../../shared/widgets/AuthUserDropdown"
import MyProgramService from "../../../../../graphql/services/programs/myProgram-services";


const Sidebar = () => {
  const [isAppLoading] = useIsAppLoading();
 /*  const dashboardRoute = useOperatorRoutes({ groups: ["dashboard"] });
  const commonRoutes = useOperatorRoutes({ groups: ["comnNavigation"] });
  const adminTutorNavs = useOperatorRoutes({ groups: ["adminTutorNavs"] });
  const tutorNavs = useOperatorRoutes({ groups: ["tutorNavs"] });
  const settinsgNav = useOperatorRoutes({ groups: ["adminSettings"] });
  const studentNavs = useOperatorRoutes({ groups: ["studentNavs"] });
  const adminNavs = useOperatorRoutes({ groups: ["adminNavs"] });
  const payments = useOperatorRoutes({ groups: ["payments"] });
  const adminPrograms= useOperatorRoutes({groups:["adminPrograms"]});
  const clg_adminNavs = useOperatorRoutes({ groups: ["clg-adminNavs"] });
  const masterAdminNavs= useOperatorRoutes({groups:["masterAdminNavs"]});
  const adminStudentNavs = useOperatorRoutes({ groups: ["adminStudentNavs"] });
  const masterAdminPayments=  useOperatorRoutes({ groups: ["masterAdminPayments"] });
  const collegeAdminNavs=  useOperatorRoutes({ groups: ["collegeAdminNavs"] });
  const masterAdminTrainingPartner = useOperatorRoutes({ groups: ["masterAdminTrainingPartner"] });
  const adminPaymentNavs = useOperatorRoutes({ groups: ["adminPaymentNavs"] });
  const adminCertificates = useOperatorRoutes({ groups: ["adminCertificates"] });
  const certificates = useOperatorRoutes({ groups: ["certificates"] });
  const masteradminCampaignNavs = useOperatorRoutes({ groups: ["masteradminCampaignNavs"] });
  const adminEventNavs = useOperatorRoutes({ groups: ["adminEventNavs"] });
  const masteradminPlacementNavs = useOperatorRoutes({ groups: ["masteradminPlacementNavs"] });
  const masteradminModuleNavs = useOperatorRoutes({ groups: ["masteradminModuleNavs"] });
 */
  let sidebarRoutes = [];
  let role = '';
  const { isViewerLoading, viewer, data } = useAuth();
  const [user, setUser] = useState(data);
  const [isOpen, setIsOpen] = useState(true);
  const [internships, setInternships] = React.useState([])
  const [courses, setCourses] = React.useState([])
  const [projects, setProjects] = React.useState([])
  const { shopId } = useCurrentShopId()
  const [type, setType] = React.useState('');
  const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();


let sidebarMenuItems =[]

  const isMiniAndClosed = React.useMemo(() => {
    return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
  }, [sidebarOptions.view, sidebarOptions.open]);

  React.useEffect(async () => {
     
    if (shopId) {
      const records = await MyProgramService.getRecords(shopId, type);
      let internships = [];
      let courses = [];
      let projects = [];
  
      for (let i = 0; i < records?.all.length; i++) {
        if (records?.all[i].type === "internships") {
          internships.push(records?.all[i]);
        } else if (records?.all[i].type === "courses") {
          courses.push(records?.all[i]);
        } else if (records?.all[i].type === "projects") {
          projects.push(records?.all[i]);
        }
      }
      setInternships(internships);
      setCourses(courses);
      setProjects(projects);
    }
  }, []);
  

  // primaryRoutes=adminPrimaryRoutes
  const toggle = () => {

    setIsOpen(!isOpen)

  };



  /* React.useEffect(() => {
 
    Tracker.autorun((computation) => {
      if (!isAppLoading && shopId) {

        menus = [];
        if (viewer) {
          role = viewer.role
          setUser(viewer); 
          if (viewer.role == "Admin") {
            sidebarRoutes = dashboardRoute.concat(adminNavs, adminTutorNavs, adminStudentNavs,adminPrograms, commonRoutes,adminPaymentNavs,adminEventNavs,adminCertificates,settinsgNav)

          } else if (viewer.role == "Tutor") {
            sidebarRoutes = dashboardRoute.concat(adminTutorNavs,tutorNavs, commonRoutes,adminEventNavs,payments)

          } else if (viewer.role == "Student") {
            sidebarRoutes = dashboardRoute.concat(adminStudentNavs,studentNavs, commonRoutes,adminEventNavs,masteradminPlacementNavs,payments)

          }else if (viewer.role == "Master-Admin"){
            sidebarRoutes= dashboardRoute.concat(masterAdminNavs,masteradminModuleNavs,collegeAdminNavs,masterAdminTrainingPartner, commonRoutes,masterAdminPayments,masteradminCampaignNavs,masteradminPlacementNavs,certificates,settinsgNav)
          }else if (viewer.role == "College-Admin"){
            sidebarRoutes= dashboardRoute.concat(clg_adminNavs, commonRoutes,payments,adminEventNavs,settinsgNav)
          }
        }
        const defaultMenu = {
          label: "Default",
          type: "section",
          children: [],

        };
        //icon: route.SidebarIconComponent 


        sidebarRoutes.forEach((route) => {
          
          const subNav = [];
          let subNavpath = '';
          let subNavLabel = '';
          let subNavIcon = ''
          let count = 0
          if (route.subNav) {
            route.subNav.map((item) => {
              subNavpath = item.path,
                subNavLabel = item.sidebarI18nLabel;
              subNavIcon = item.SidebarIconComponent && <item.SidebarIconComponent />
              count = ''
              if (subNavLabel == "Internships") {
                count = internships.length
              } else if (subNavLabel == "Courses") {
                count = courses.length
              } else if (subNavLabel == "Projects") {
                count = projects.length
              }
              else if (subNavLabel == "Applied") {
                count = 3
              }
              else if (subNavLabel == "Rejected") {
                count = 3
              }
              else if (subNavLabel == "Placed") {
                count = 3
              }
              else if (subNavLabel == "All") {
                count = 13
              }
              subNav.push({ subNavpath, subNavLabel, subNavIcon, count })
            })
          }
          const childMenu = {
            uri: route.href || route.path,
            label: route.sidebarI18nLabel,
            icon: route.SidebarIconComponent && <route.SidebarIconComponent />,
            type: "nav-item",
            subNav: subNav,
            iconOpened: route.iconOpened,
            iconClosed: route.iconClosed
          };
          defaultMenu.children.push(childMenu);
        });
        menus.push(defaultMenu);
        computation.stop();
      }
    });
  }); */


  return (
    <React.Fragment>

      <SidebarHeader minSidebar={toggle} isOpen={isOpen} />
      <JumboScrollbar autoHide autoHideDuration={200} autoHideTimeout={500}>
        <Suspense
          fallback={
            <Div
              sx={{
                display: "flex",
                minWidth: 0,
                alignItems: "center",
                alignContent: "center",
                px: 3
              }}
            >
              <SidebarSkeleton />
            </Div>
          }
        >
          <JumboVerticalNavbar 
            translate 
            items={viewer?.role=="Master-Admin"? MA_menus:
            viewer?.role=="Admin"? TP_menus:
            viewer?.role=="College-Admin"? CA_menus:
            viewer?.role=="Tutor"? tutorMenus:
            viewer?.role=="Student"? studentMenus:[]}
            minWidth={""} 
            toggle={isOpen}
           />

        </Suspense>


      </JumboScrollbar>
      {(user?.role == "Tutor") ?
        <Toolbar >
          <ShopSelectorWithData shouldShowShopName size={30} viewer={viewer} mini={isMiniAndClosed} />
          {/* <Hidden mdUp>
            <Fab size="small">
              <CloseIcon />
            </Fab>
          </Hidden> */}
        </Toolbar>
        : <Div></Div>}



      <div style={{ padding: "10px", marginLeft: "15px", display: "flex" }}>

        <AuthUserDropdown shopId={shopId} viewer={viewer} />
        {!isMiniAndClosed &&
          <div style={{ color: "white", paddingLeft: "5px" }}>{user?.name && user.name.length > 6
            ? user.name && user.name.charAt(0).toUpperCase() + user.name.substring(1, 6) + "..."
            : (user?.name || "")}</div>
       
        }
      
      </div>
    </React.Fragment>
  );
};

const SidebarHeader = ({ minSidebar, isOpen }) => {
  
  const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();

  const { sidebarTheme } = useJumboSidebarTheme();
  const { isViewerLoading, viewer } = useAuth();
  const [user, setUser] = useState(viewer);

  React.useEffect(() => {
    Tracker.autorun((computation) => {
      if (viewer) {
        setUser(viewer);
      }
    });
  });

  const isMiniAndClosed = React.useMemo(() => {
    return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
  }, [sidebarOptions.view, sidebarOptions.open]);

  return (
    <React.Fragment>
      {sidebarOptions?.style !== SIDEBAR_STYLES.CLIPPED_UNDER_HEADER && (
        <DrawerHeader>
          <Logo mini={isMiniAndClosed} mode={sidebarTheme.type} />
          {/*   { user ?
      <Toolbar >
       <ShopSelectorWithData shouldShowShopName size={32} viewer={user} /> 
          <Hidden mdUp>
            <Fab size="small">
              <CloseIcon />
            </Fab>
          </Hidden>
        </Toolbar>
     : <Div></Div>} */}
          {sidebarOptions?.view !== SIDEBAR_VIEWS.MINI && (
            <Zoom in={sidebarOptions?.open}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ ml: 0, mr: -1.5 }}
                onClick={() => setSidebarOptions({ open: false })}
              //onClick={minSidebar}
              >
                <MenuOpenIcon sx={{ color: "white" }} />
              </IconButton>
            </Zoom>
          )}
        </DrawerHeader>
      )}
    </React.Fragment>
  );
};

export default Sidebar;
