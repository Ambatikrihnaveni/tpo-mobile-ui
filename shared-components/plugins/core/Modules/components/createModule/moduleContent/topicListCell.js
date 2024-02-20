import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { Card, Typography, Grid, Button } from "@mui/material";
import Div from '../../../../../../client/ui/@jumbo/shared/Div';

const DragHandle = SortableHandle(() => <DragHandleIcon sx={{ cursor: 'grab', verticalAlign: 'middle' }} />);

const TopicListCell = (props) => {
    const { topic, topicEdit, onTopicDelete } = props;


    return (
        <Div>

            <Card sx={{ mt: 1, mb: 3, p: 2, background: "#c7edf0", borderRadius: '15px' }}>

                <Grid container rowSpacing={1}>
                    <Grid item xs={1}>
                        <DragHandle />
                    </Grid>
                    <Grid item xs={1} >
                        <Div sx={{ backgroundColor: "#3a055c", color: "white", p: 1, fontWeight: "bold", borderRadius: '6px', display: "inline" }}>T</Div>
                    </Grid>
                    <Grid item xs={8} sx={{ marginLeft: { lg: "-4%", md: "-4%" } }}>
                        <Typography>{topic.topic_name}</Typography>
                    </Grid>
                    <Grid items xs={2} sx={{ textAlign: 'right' }}>
                        <Button onClick={() => { topicEdit(topic) }}><EditIcon /></Button>
                        <Button onClick={() => { onTopicDelete(topic) }}><ClearIcon /></Button>
                    </Grid>
                </Grid>
            </Card>

        </Div>
    );
};


export default SortableElement(TopicListCell);
