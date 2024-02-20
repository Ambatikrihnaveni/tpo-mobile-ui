import React from 'react';
import { Card, Button } from "@mui/material";
import useCurrentShopId from '../../../../hooks/useCurrentShopId';
import InviteNewJobPost from './inviteNewJobPost';

const InviteJobForm = () => {
    const { shopId } = useCurrentShopId()
        ;
    return (
        <div style={{ height: '75vh' }}>
            <Card sx={{ padding: '20px 30px', m: 'auto', height: '650px', ml: '30px', overflow: 'scroll' }}>
                
                <Button variant='text'><h2>New Job Post</h2></Button>
                <InviteNewJobPost shopId={shopId} />
            </Card>
        </div>
    )
}
export default InviteJobForm