import BaseService from "../base-service";
//import CourceQuery from "./queries/cources";
import projectsQuery from "./queries/projects";
import { getAssetPath } from "../../../appLayout/utils/appHelpers";
import { ASSET_AVATARS,ASSET_LOGOS } from "../../../appLayout/utils/constants/paths";

 const Projectdata=[
  {
    id: 1234,
    logo: getAssetPath(`${ASSET_AVATARS}/avatar5.jpg`, "40x40"),
    name: "TPO.AI React Admin Template",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: "24 Oct, 2021",
    progress: 57,
    deadline: "02 March, 2022",

  
},
{
    id: 1235,
    logo: getAssetPath(`${ASSET_LOGOS}/project-logo-1.png`, "52x52"),
    name: "Prahansoft Template",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: "22 Oct, 2021",
    progress: 67,
    deadline: "03 March, 2022",

   
},
{
    id: 1236,
    logo: getAssetPath(`${ASSET_LOGOS}/project-logo-3.png`, "52x52"),
    name: "Mouldify",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: "19 Oct, 2021",
    progress: 47,
    deadline: "05 March, 2022",
   
},
{
    id: 1236,
    logo: getAssetPath(`${ASSET_LOGOS}/project-logo-3.png`, "52x52"),
    name: "Mouldify",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: "19 Oct, 2021",
    progress: 47,
    deadline: "05 March, 2022",
   
},{
    id: 1236,
    logo: getAssetPath(`${ASSET_LOGOS}/project-logo-3.png`, "52x52"),
    name: "Mouldify",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: "19 Oct, 2021",
    progress: 47,
    deadline: "05 March, 2022",
   
},
        ]

        const internshipdata=[
          {
            "id":3,
            "img":`url("https://repository-images.githubusercontent.com/200666631/0060c080-d060-11ea-9698-98d89d68fc6d")`,
            "content":"TPO.AI",
            "name":"JavaScript",
            "description":"JavaScript is the  most popular programming language....",
            "totalLessons":"7 Lessons",
            "rating":4.6
        },
        
        {
            "id":4,
           "img":`url(" https://i.pinimg.com/originals/a2/6c/4b/a26c4b485716a585073da2af4328a8cd.jpg")`,
           // "img":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
            "content":"TPO.AI",
            "name":"Pyhton",
            "description":"Python is a popular programming language....",
            "totalLessons":" 8 Lessons",
            "rating":4.6
        },
        
        {
            "id":5,
            "img":`url(" https://miro.medium.com/max/750/0*3P4WhyFtuwCV5nTa.jpg")`,
            "content":"TPO.AI",
            "name":"Node js",
            "description":"Node.js is an open source server environment.... ",
            "totalLessons":" 7 Lessons",
            "rating":4.6
        },
        
        
        
        
        {
            "id":9,
            "img":`url(" https://i.pinimg.com/originals/a2/6c/4b/a26c4b485716a585073da2af4328a8cd.jpg")`,
            "content":" TPO.AI",
            "name":"Pyhton",
            "description":"Python is a popular programming language....",
            "totalLessons":" 8 Lessons",
            "rating":4.6
        },
        
        {
            "id":10,
            "img":`url(" https://miro.medium.com/max/750/0*3P4WhyFtuwCV5nTa.jpg")`,
            "content":" TPO.AI",
            "name":"Node js",
            "description":"Node.js is an open source server environment.... ",
            "totalLessons":" 7 Lessons",
            "rating":4.6
        },
        
        
        
        {
            "id":12,
            "img":`url("https://upload.wikimedia.org/wikipedia/commons/c/c1/PHP_Logo.png")`,
            "content":" TPO.AI",
            "name":"PHP",
            "description": "PHP is a server scripting language....",
            "totalLessons":" 8 Lessons",
            "rating":4.6
        }
                ]

 export default class MyProjectService {
 
 
  static async getRecords(shopId, { page, limit, queryParams }) {
    
   /*  const { data } = await BaseService.executeQueryWithVariables(programsQuery, {
      shopIds:shopId,
     // query: queryParams.keywords
    }); */
    const records = {};
   /*  records["programs"] = data?.programs
      ? data.products.nodes.map((data) => {
          return {
            id:data._id,
            title:data.title,
            image:data.media[0]?.URLs?.thumbnail,
            isVisible:data.isVisible,
            price:data.pricing.displayPrice,
            description:data.description

            

           

          };
        }) */
        records["projects"]=Projectdata? Projectdata.map((data)=>{
            return data
        })
      : [];
    return records;
  } 

 
 }


//}