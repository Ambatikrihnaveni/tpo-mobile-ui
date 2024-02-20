import React from 'react';
import {useDropzone} from "react-dropzone";
import Typography from "@mui/material/Typography";
import DndWrapper from "./DndWrapper";
import List from "@mui/material/List";
import {ListItem} from "@mui/material";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import code from "../components/demo-code/dz-without-click.txt";
import Div from "@jumbo/shared/Div";

const DzWithoutClick = () => {
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
        noClick: true,
    });
    const files = acceptedFiles.map(file => (
        <ListItem selected key={file.path} sx={{width: 'auto', mr: 1}}>
            {file.path}
        </ListItem>
    ));
    return (
        <JumboDemoCard
            title="Without click event"
            demoCode={code}
            wrapperSx={{pt: 0, backgroundColor: 'background.paper'}}
        >
            <Div sx={{flex: 1}}>
                <DndWrapper>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Typography variant={"body1"}>Dropzone without click events</Typography>
                    </div>
                </DndWrapper>
                <Typography variant={"h4"}>Files</Typography>
                <List disablePadding sx={{display: 'flex'}}>{files}</List>
            </Div>
        </JumboDemoCard>
    );
};

export default DzWithoutClick;
