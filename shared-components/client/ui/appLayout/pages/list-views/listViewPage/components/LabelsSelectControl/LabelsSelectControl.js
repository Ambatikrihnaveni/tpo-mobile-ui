import React from 'react';
import JumboRqSelectPopover from "@jumbo/components/JumboReactQuery/JumboRqSelectPopover";
import {recordService} from "../../../../../services/record-services";
import {IconButton, Tooltip} from "@mui/material";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";

const LabelsSelectControl = ({onDone}) => {
    return (
        <JumboRqSelectPopover
            service={recordService.getLabels}
            queryOptions={{queryKey: "labels", dataKey: 'labels'}}
            primaryKey={"id"}
            labelKey={"name"}
            button={{
                component: IconButton,
                label: <Tooltip title={"Labels"}><LabelOutlinedIcon /></Tooltip>
            }}
            resetOnClose={true}
            onDone={onDone}
        />
    );
};
export default LabelsSelectControl;
