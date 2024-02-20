import React, { useEffect } from 'react';
import Div from '../../../../../client/ui/@jumbo/shared/Div';
import ModulesService from '../../../../../client/ui/graphql/services/modules/modules-service'
import ModulesList from './modulesList';

export default function ProgramBuild() {
    
    const shopId = localStorage.getItem('accounts:shopId')
  const [modules,setModules] = React.useState([])
useEffect(async()=>{
    
    const { modules } = await ModulesService.getRecords(shopId)
     
    setModules (modules) ;
 
},[])
    return (
        <Div sx={{ p: 3 }}>

            <Div sx={{ mb: 2 }}>
              <ModulesList modules={modules}/>
            </Div>

           

        </Div>
    )
}
