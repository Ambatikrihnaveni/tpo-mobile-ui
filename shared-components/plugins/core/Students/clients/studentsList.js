import React from 'react'
import EnhancedTableHead from './StudentDashboard'
import ModeIcon from '@mui/icons-material/Mode';
import Div from "@jumbo/shared/Div";
import Button from '@mui/material/Button';
import SearchAppBar from "./Search"
import { flexbox } from '@mui/system';
import { Card, Grid, Typography } from '@mui/material';
import MaterialUIPickers from './Calendar'
import BasicMenu from './BulkAction'
import ApplyButtons from './ApplyButton'
import King from './Allcourse';
import Raju from './SortBy';
import Reset from './Reset';
import Tutorfilter from '../../tutor/clients/Tutorfilter';
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import StudentForm from './studentForm';
import JumboSearch from './Search';

export default function StudentsList() {
  const { showDialog, hideDialog } = useJumboDialog();

  const handleContactAdd = React.useCallback(() => {
    hideDialog();

  }, [hideDialog]);
  const showAddContactDialog = React.useCallback(() => {
    showDialog({
      title: "Add new contact",
      content: <StudentForm onSave={handleContactAdd} />
    });
  }, [handleContactAdd, showDialog]);

  return (
    <Card>
      <Grid container sx={{ mt: 2, ml: 2 }}>
        <Grid item xs={4} sm={4} lg={2} >

          <Typography variant='h4'>Student</Typography>
        </Grid>
        <Grid item xs={8} md={4} sm={4} lg={8} >
          <JumboSearch />
        </Grid>
        <Grid item xs={12} md={4} sm={4} lg={2} >
          <Button
            disableElevation
            variant={"contained"}
            sx={{
              mb: 2,
              '& .MuiSvgIcon-root': {
                fontSize: '1.5rem'
              }
            }}
            onClick={showAddContactDialog}>Add Student</Button>
        </Grid>
      </Grid>
      <Grid>
        <Tutorfilter />
      </Grid>
      <Grid sx={{ p: 1 }}>
        <EnhancedTableHead />
      </Grid>


    </Card>

  )
}
