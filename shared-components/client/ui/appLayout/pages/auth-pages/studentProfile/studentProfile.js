import React from 'react'
import { Grid, Card } from '@mui/material'
import ProfileEditForm from '../../../shared/widgets/AuthUserDropdown/profileeditForm'
import Div from "@jumbo/shared/Div";


export default function StudentProfile() {
  return (
    <Div className="bg-gradiant" style={{ backgroundImage: `url("/images/authBg.png")` }}>
      <Grid container sx={{ p: 2 }}>
        <Grid item xs={12} md={8} sx={{ margin: 'auto' }}>
          <Card sx={{ boxShadow: '5px 6px 7px 5px rgba(0,0,0,0.3)' }}>
            <ProfileEditForm />
          </Card>
        </Grid>
      </Grid>
    </Div>
  )
}
