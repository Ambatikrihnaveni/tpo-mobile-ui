import React from 'react';
import Typography from '@mui/material/Typography';
import Div from '../../../../../../client/ui/@jumbo/shared/Div/Div';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeView from '@mui/lab/TreeView';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';


export default function ProgramListModules({ data, onProducts, onLesson }) {
  
  const products = data?.products;
  const [hoveredIndex, setHoveredIndex] = React.useState(-1);


 

  return (
    <Div>
      <Div sx={{ display: 'flex', mb: 1 }}>
        <MenuBookIcon />
        <Typography style={{ marginLeft: '5px', fontWeight: 'bold' }}>
          {data?.products?.length} Modules
        </Typography>
        <Div style={{ marginLeft: '15px' }}></Div>
      </Div>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: '50%', flexGrow: 1, maxWidth: 400 }}
      >
        {products?.map((product, index) => (
          <TreeItem
            key={index}
            nodeId={`${index}`}
            label={
              <Typography
                component="div"
                variant="body1"
                sx={{ fontWeight: 'bold' }} 
              >
                {`${index + 1}. ${product?.title}`}
              </Typography>
            }
            sx={{ padding: '0px', marginBottom: '5px' }}
          >
            {product?.lessonsDuration?.map((lessonDuration, i) => (
                lessonDuration?.lesson?.map((lesson, lessonIndex) => (
                  <TreeItem
                    key={`${index}-${i}`}
                    nodeId={`${index}-${i}`}
                    label={`${i + 1}. ${lesson?.name}`}
                    sx={{ padding: '10px' }}
                    onClick={() => {
                      onLesson(lesson);
                    }}
                  ></TreeItem>
                ))
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </Div>
  );
}
