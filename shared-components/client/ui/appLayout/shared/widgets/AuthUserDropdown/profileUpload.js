import React from "react";

 

function ProfileUpload(props) {
  const[imageUrl,setImageUrl] = React.useState("")
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
  
    const handleImageUpload = e => {
      props.handleImageUpload(e)
    
    };
  
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={props.imageUploader}
          style={{
            display: "none"
          }}
        />
        <div
          style={{
            height: "80px",
            width: "80px",
          borderRadius: "50%", 
          overflow: "hidden"
          }}
          onClick={() => props.imageUploader.current.click()}
        >
          <img
            ref={props.uploadedImage}
            style={{
              width: "85px",
              height: "85px",
              borderRadius: "50%", 
              position: "absolute",
            }}
            src={props.imageUrl? props.imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpXwHquQLRohcqG8ZQD2_QIQKecn5RYoc_sWbqXhZv1siBAeqpgCyWoRCJ9PqDbl0Menw&usqp=CAU" }
          alt="Avatar"
          />
        </div>
       </div>
    );
  }

export default ProfileUpload
   