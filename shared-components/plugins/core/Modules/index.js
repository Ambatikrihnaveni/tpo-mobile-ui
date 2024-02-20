import React,{lazy} from 'react';
import Page from "@jumbo/shared/Page";



const NewModule = lazy(()=> import('./components/createModule/newModule'))

export default  moduleRoutes = [
    {
        path: "/modules/:product_id",
        element:<Page component={NewModule} />,
        isAuthRequired:true
    },
    {
        path: "/modules/:product_id/addmodule/:createState",
        element:<Page component={NewModule} />,
        isAuthRequired:true
    },
   
]