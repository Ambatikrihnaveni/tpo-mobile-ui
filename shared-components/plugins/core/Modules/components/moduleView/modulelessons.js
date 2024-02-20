
import React from 'react'
import Typography from '@mui/material/Typography';
import Div from '../../../../../client/ui/@jumbo/shared/Div/Div';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeView from '@mui/lab/TreeView';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import './lesson.css'

export default function ModuleLessons({ module, onLesson, lesson }) {
  const lessons = module?.lessons

  return (
    <Div >
      <Div sx={{ display: 'flex', mb: 1 }}>
        <MenuBookIcon />
        <Typography style={{ marginLeft: '5px', fontWeight: 'bold' }}>

          {module?.lessons?.length} Lessons</Typography>
        <Div style={{ marginLeft: '15px' }} >

        </Div>
      </Div>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400 }}
      >
        {lessons?.map((item, index) => (
          <TreeItem key={index} nodeId={`${index}`} label={`${index + 1} . ${item?.name && item?.name.charAt(0).toUpperCase() + item?.name.slice(1)}`} sx={{ padding: "10px", background: lesson._id == item._id ? "#078a8f" : '', color: lesson._id == item._id ? "white" : '', borderRadius: '5px' }} onClick={() => { onLesson(item) }}>


          </TreeItem>
        ))}
      </TreeView>

    </Div>
  )
}
