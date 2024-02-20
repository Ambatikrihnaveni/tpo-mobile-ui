import React from 'react';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import InputBase from "@mui/material/InputBase";
import Div from "@jumbo/shared/Div";
import {useDebouncedCallback} from "beautiful-react-hooks";

const JumboSearch = ({onChange, onCancel, value, sx}) => {
             
    const [searchKeywords, setSearchKeywords] = React.useState(value!= undefined ? value:"");
    
    const handleChange = useDebouncedCallback((event) => {
       
        setSearchKeywords(event.target.value);
    });

    const handleCancel =()=>{
           
        onCancel()
    }

  /*   const handleCancel = useDebouncedCallback(() => {
       
        setSearchKeywords('');
       
        onCancel(searchKeywords)
    },1000); */

    React.useEffect(() => {
       ;
        onChange(searchKeywords);
    }, [searchKeywords]);

    React.useEffect(() => {
        return () => handleChange.cancel();
    },[]);

    return (
        <Div sx={{
            color: 'inherit',
            display: 'flex',
            borderRadius: 30,
            backgroundColor: theme => theme.jumboComponents.JumboSearch.background,

           
        }}>
            <Div sx={{alignItems: 'center',
                justifyContent: 'center',}}>
            <SearchIcon  sx={{ml:1,mt:1,mr:1}}/>
            </Div>
           {/*  <Div sx={{
                padding: theme => theme.spacing(0, 2),
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
            }}>
                <SearchIcon/>
            </Div> */}
            {/* <Div sx={{
                padding: theme => theme.spacing(0, 23),
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
            }}> */}
               
            {/* </Div> */}
            <InputBase
                
                placeholder="Search Anything"
                inputProps={{'aria-label': 'search'}}
                onChange={(e) => setSearchKeywords(e.target.value)}
                 //value={(searchKeywords)? searchKeywords : ""}
                 value={value}
            />
            <IconButton
                    paddingLeft="20px"
                    component="label"
                >
               {/*  <button hidden onClick={handleCancel}></button> */}
                <CancelIcon onClick={handleCancel} />
            </IconButton> 
        </Div>
    );
};

export default React.memo(JumboSearch);
