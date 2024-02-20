import React, {useState} from 'react';
import {Button, ButtonGroup,Checkbox} from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { Grid, Typography } from '@material-ui/core';
import StarIcon from '@mui/icons-material/Star';



const ProductImage = ({height}) => {
    const module=[

        {
            "id":7,
            "image":`url(" https://upload.wikimedia.org/wikipedia/commons/c/c1/PHP_Logo.png")`,
            "content":"TPO.AI",
            "moduleTitle":"PHP",
            "description": "PHP is a server scripting language....",
            "totalLessons":" 8 Lessons",
            "rating":4.6
        },

        {
            "id":8,
            "image":`url("https://repository-images.githubusercontent.com/200666631/0060c080-d060-11ea-9698-98d89d68fc6d")`,
            "content":"TPO.AI",
            "moduleTitle":"JavaScript",
            "description":"JavaScript is the most popular programming language....",
            "totalLessons":"7 Lessons",
            "rating":4.6
        },

        {
            "id":9,
            "image":`url(" https://researchweek.unc.edu/wp-content/uploads/2022/09/python-logo.jpg")`,
            "content":" TPO.AI",
            "moduleTitle":"Pyhton",
            "description":"Python is a popular programming language....",
            "totalLessons":" 8 Lessons",
            "rating":4.6
        },

        {
            "id":10,
            "image":`url(" https://miro.medium.com/max/750/0*3P4WhyFtuwCV5nTa.jpg")`,
            "content":" TPO.AI",
            "moduleTitle":"Node js",
            "description":"Node.js is an open source server environment.... ",
            "totalLessons":" 7 Lessons",
            "rating":4.6
        },

        {
            "id":11,
            "image":`url(" https://www.vectorlogo.zone/logos/java/java-ar21.png")`,
            "content":" TPO.AI",
            "moduleTitle": " Java",
            "description":"Java is a popular programming language.....",
            "totalLessons":" 5 Lessons",
            "rating":4.6
        },

        {
            "id":12,
            "image":`url("https://upload.wikimedia.org/wikipedia/commons/c/c1/PHP_Logo.png")`,
            "content":" TPO.AI",
            "moduleTitle":"PHP",
            "description": "PHP is a server scripting language....",
            "totalLessons":" 8 Lessons",
            "rating":4.6
        }
        
    ];
    const [isFavorite, setIsFavorite] = useState(true);
    const [inCart, setInCart] = useState(false);
    const [chkValue, setChkValue] = useState(false);
    const [selectBtn,setSelectBtn] = useState(true)

    


   
        const [isHovered, setHover] = useState(-1);

        const select=(i)=>{
        
           if(i){
            setChkValue(!chkValue)
                setSelectBtn(i? !selectBtn:selectBtn)
           }
                
          
        }
   
    return (

        <Grid container  spacing={4} >
             {module.map((data,i)=>(
                
        <Grid key={i} item       
        onMouseOver={() => setHover(i)}
        onMouseLeave={() => setHover(-1)}>

       <div style={{width:"263px"}}>
                 <JumboCardQuick noWrapper >
                 <div className="imageContainer">

                     <div style={{backgroundImage:`${data.image}`,backgroundSize:"250px",minHeight:"150px"}}>
                        <div style={{display:'flex',display:`${isHovered == i? "block":'none'}`,backgroundColor:"rgba(95, 10, 81, 0.7)"}}>
                        <div> <Checkbox  checked={chkValue}  sx={{marginLeft:'230px',marginTop:'7px',color:"white",}}  /></div>    
                     <div  style={{textAlign:'center',padding:"20px 0px 50px" ,}}>
                         <Button  variant="contained"  sx={{backgroundColor:'white',color:"#343635", "&:hover": {color:"white"}}} >Preview</Button>
                         <Button  variant="contained" key={i} sx={{backgroundColor:'white',ml:2 ,color:"#343635", "&:hover": {color:"white"}}} onClick={()=>{select(i)}}> {selectBtn? "select":"Unselect"}</Button>
                     </div>
                     </div>       
                     </div>
                    </div>
         
          <ButtonGroup
                         fullWidth
                         size="large"
                         variant={"text"}
                         sx={{
                             height: 170,
                             '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                                 border: "none"
                             }
                         }}
                     >
                         <Typography variant={"h5"} style={{paddingLeft:'10px'}}>Content by <span style={{fontWeight:'bold',color:'blue'}}> {data.content} </span>
         
                         </Typography>
                 
                <div style={{marginTop:'15px',marginLeft:'-145px'}}>
                       <h3 style={{fontSize:'27px',fontWeight:'bold'}}> {data.moduleTitle}</h3>
                       </div>
                       
         
                     </ButtonGroup>
         
         <h5 style={{marginTop:'-90px',paddingLeft:'10px',fontSize:'14px'}}>  <div dangerouslySetInnerHTML={{ __html: data.description }} /> </h5>
         <Grid  container spacing={7} style={{marginTop:'-15px'}}>
         <Grid item xs={6} >
         <h4 style={{fontSize:'18px',fontWeight:'bold',marginLeft:'8px'}} >{data.totalLessons}</h4>
         </Grid>
         <Grid item xs={6} >
         <StarIcon style={{color:'blue',marginTop:'13px',marginLeft:'35px'}} />{data.rating}   
         </Grid>
         </Grid>
         
                 </JumboCardQuick>
                 </div>
                 </Grid>
                ))}
       
       
        </Grid>
    );
};
/* Todo height prop define */
export default ProductImage;
