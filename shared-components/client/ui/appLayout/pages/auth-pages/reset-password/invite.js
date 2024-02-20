import React from 'react';
import { Card } from "@mui/material";
import InviteUserForm from './InviteUserForm';
import useCurrentShopId from '../../../../hooks/useCurrentShopId';

const InviteUser = () => {
   const {shopId}=useCurrentShopId()
    return(
        <div style={{height: '75vh'}}>
            <Card sx={{ m: 'auto',height:'650px',ml:'30px',overflow:'scroll',p:2}}>
                
               <h2 style={{color:'#50C2C9'}}>Invite by email</h2>
                <p style={{marginBottom:'15px',fontWeight:'350px',fontSize:'18px'}}>You can easily invite multiple students via email to join your workspace.</p>
                <InviteUserForm shopId={shopId}/>
            </Card>
        </div>
    );
};

export default InviteUser;