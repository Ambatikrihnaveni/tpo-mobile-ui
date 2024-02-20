import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LaunchIcon from '@mui/icons-material/Launch';
import DehazeIcon from '@mui/icons-material/Dehaze';
import DeleteIcon from '@mui/icons-material/Delete';
import Div from "@jumbo/shared/Div";
import Button from '@mui/material/Button';

export default function SimpleAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <DehazeIcon /> <Typography sx={{ pl: 3 }}>Introducuction</Typography>
          <Div sx={{ pl: 163 }}><LaunchIcon /><DeleteIcon /></Div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography> <DehazeIcon />
            <Div sx={{ pl: 5, mt: -3 }}>Introducuction</Div>
            <Div sx={{ pl: 183, mt: -2 }}><LaunchIcon /><DeleteIcon />
            </Div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Button sx={{ backgroundColor: "#385196", color: "white", float: "right", mt: 3 }}>Add content</Button>
    </div>
  );
}
