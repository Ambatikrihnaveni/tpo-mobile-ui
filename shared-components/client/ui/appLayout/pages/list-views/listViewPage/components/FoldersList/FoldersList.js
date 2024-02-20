import React from 'react';
import ContactsIcon from "@mui/icons-material/Contacts";
import StarsIcon from "@mui/icons-material/Stars";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderItem from "./FolderItem";
import {useParams} from "react-router-dom";
import StyledMenu from "../../../../../shared/StyledMenu";
import { useLocation } from 'react-router';

const folders = [
    {
        icon: <ContactsIcon fontSize={"small"} />,
        label: "All Records",
        slug: "all",
        path: "all"
    },
    {
        icon: <StarsIcon fontSize={"small"} />,
        label: "Starred",
        slug: "starred",
        path: "starred"
    },
    {
        icon: <AccessTimeIcon fontSize={"small"} />,
        label: "Frequently Used",
        slug: "frequent",
        path: "frequent"
    },
    {
        icon: <DeleteIcon fontSize={"small"} />,
        label: "Trash",
        slug: "trash",
        path: "trash"
    },
];

const FoldersList = () => {
    const location = useLocation();
    const url=location.pathname;
    const params = useParams();
    return (
        <StyledMenu sx={{mb: 2}}>
            {
                folders.map(folder => (
                    <FolderItem
                        key={folder.slug}
                        path={url + "?filter=" + folder.path}
                        label={folder.label}
                        icon={folder.icon}
                        selected={folder.slug === params?.category}
                    />
                ))
            }
        </StyledMenu>
    );
};

export default React.memo(FoldersList);
