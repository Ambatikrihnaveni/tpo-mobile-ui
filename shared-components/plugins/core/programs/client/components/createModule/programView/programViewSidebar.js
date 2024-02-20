import React from 'react';
import { Divider, IconButton } from '@mui/material';
import Div from '@jumbo/shared/Div/Div';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ProgramModules from './ProgramModules';
import ProgramSidebar from './ProgramSidebar';

export default function ProgramViewSidebar({ data, onProducts, onLesson, click, isOpen, lessons }) {

  return (
    <React.Fragment>

      <Div
        sx={{
          width: isOpen ? '300px' : '0',
          borderRight: '1px solid #e6e7e8',
          mr: 1,
          position: 'fixed',
          zIndex: 0,
          backgroundColor: 'white',
          height: { xs: "100%", sm: '85%' },
          transitionDuration: '1s',
          marginLeft: { xs: 0, sm: isOpen ? '0' : '28px' },
          boxShodow: '0px 3px 3px rgba(0 0 0 0.3)'
        }}
      >
        {!isOpen && (
          <IconButton
            onClick={click}
            style={{
              top: '10%',
              left: '-12px',
              color: '#08d1c4',
              border: '1px solid #e6e7e8',
              padding: '3px 4px',
              backgroundColor: 'rgb(242, 252, 255)',
              zIndex: 2,
            }}
          >
            {isOpen ? <ChevronLeftIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        )}
        {isOpen && (
          <IconButton
            onClick={click}
            style={{
              top: '10%',
              right: '-282px',
              color: '#08d1c4',
              border: '1px solid #e6e7e8',
              padding: '3px 4px',
              backgroundColor: 'rgb(242, 252, 255)',
              zIndex: 2,
            }}
          >
            {isOpen ? <ChevronLeftIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        )}
        <JumboScrollbar style={{ minHeight: 560 }}>
          <Div sx={{ mb: 1, p: 2 }}>
            <ProgramSidebar data={data} />
          </Div>
          <Divider />
          <Div sx={{ mt: 1, p: 2, mb: 3 }}>
            <ProgramModules data={data} onProducts={onProducts} onLesson={onLesson} lessons={lessons} />
          </Div>
        </JumboScrollbar>
      </Div>
    </React.Fragment>
  );
}
