import React from 'react'
import CreateModuleHeader from "./header"
import CreateModuleTabs from "./createModuleTabs"
import Div from '../../../../../client/ui/@jumbo/shared/Div'
import { Card } from '@mui/material'

export default function NewModule({ module }) {
  return (
    <Div>
      <Card>
        <CreateModuleHeader />
      </Card>
      <Card sx={{ mt: 1 }}>
        <CreateModuleTabs module={module} />
      </Card>
    </Div>
  )
}
