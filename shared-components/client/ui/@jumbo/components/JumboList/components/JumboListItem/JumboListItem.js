import React from 'react';
import ListItem from "@mui/material/ListItem";
import PropTypes from 'prop-types';
import {ListItemIcon} from "@mui/material";
import useJumboList from "@jumbo/components/JumboList/hooks/useJumboList";
import JumboItemCheckbox from "../JumboItemCheckbox";
import useAuth from '../../../../../hooks/useAuth';

const JumboListItem = ({component, componentElement, children,recordType, itemData, ...restProps}) => {
    const {viewer} = useAuth()
    const {bulkActions} = useJumboList();
    const ListItemComponent = component ? component : ListItem;
    const componentProps = componentElement ? {component: componentElement} : {};
    return (
        <ListItemComponent  {...componentProps} {...restProps}>
            {viewer?.role ==="Tutor" || viewer?.role ==="Student"&&recordType ==="myclasses"|| recordType ==="programs"|| recordType ==="groups" ||recordType ==="assignments" || recordType ==="questions" ?(null):(
                bulkActions &&
                <ListItemIcon>
                    { 
                        itemData &&
                        
                        <JumboItemCheckbox itemData={itemData}/>
                    }
                </ListItemIcon>
            )}
            {children}
        </ListItemComponent>
    );
};

JumboListItem.propTypes = {
    component: PropTypes.elementType,
    itemData: PropTypes.object.isRequired,
    secondaryAction: PropTypes.node,
};

export default JumboListItem;