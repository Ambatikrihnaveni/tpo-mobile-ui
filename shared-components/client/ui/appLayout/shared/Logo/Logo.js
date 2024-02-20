import React from 'react';
import Div from "@jumbo/shared/Div";
import Link from "@mui/material/Link";
import {ASSET_IMAGES} from "../../utils/constants/paths";


const Logo = ({mini, mode, sx,}) => {
    return (
        <Div sx={{display: "inline-flex", ...sx}}>
            <Link href={'/'}>
                {
                    mini ?
                        <img src={ mode === "light" ? `${ASSET_IMAGES}/logo.svg` : `${ASSET_IMAGES}/logo-white.png`} alt="Tpo.ai" width="30px" height="10px" style={{marginTop:'10px'}}/>
                        :
                        <img src={mode === "light" ? `${ASSET_IMAGES}/logo-short.png` : `${ASSET_IMAGES}/logo-white.png`} alt="Tpo.ai"  width="100px" height="30px" style={{marginTop:'10px'}}/>
                }
            </Link>
        </Div>
    );
};

Logo.defaultProps = {
    mode: "light"
};

export default Logo;
