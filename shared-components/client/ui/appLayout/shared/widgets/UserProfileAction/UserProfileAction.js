import React from 'react';
import ButtonGroup from "@mui/material/ButtonGroup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import {CardMedia, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {ASSET_AVATARS, ASSET_IMAGES} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";

const UserProfileAction = ({height}) => {
    return (
        <JumboCardQuick noWrapper>
            <CardMedia
                component="img"
                height={height ? height : 242}
                image={getAssetPath(`${ASSET_IMAGES}/wall/ethan-robertson.jpg`, "640x420")}
                alt=""
            />
            <Stack direction={"row"} spacing={1}>
               <Typography>hello</Typography>
                <ButtonGroup
                    fullWidth
                    size="large"
                    variant={"text"}
                    sx={{
                        height: 50,
                        '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                            border: "none"
                        }
                    }}
                >
                    <Button><FavoriteBorderOutlinedIcon/></Button>
                   
                </ButtonGroup>
            </Stack>
        </JumboCardQuick>
    );
};
/* Todo height prop define */
export default UserProfileAction;
