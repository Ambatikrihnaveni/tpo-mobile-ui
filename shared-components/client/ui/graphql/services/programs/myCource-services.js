import BaseService from "../base-service";
import coursesQuery from "./queries/cources";

/**
 * Accounts record service to query all accounts
 */
const Courcedata=[
    
  {
    "id": 3,
    "img": `url("https://repository-images.githubusercontent.com/200666631/0060c080-d060-11ea-9698-98d89d68fc6d")`,
    "content": "TPO.AI",
    "name": "JavaScript",
    "description": "JavaScript is the  most popular programming language JavaScript is the  most popular programming language ",
    "totalLessons": "7 Lessons",
    "rating": 4.6
},

{
    "id": 4,
    "img": `url(" https://i.pinimg.com/originals/a2/6c/4b/a26c4b485716a585073da2af4328a8cd.jpg")`,
    "content": "TPO.AI",
    "name": "Pyhton",
    "description": "Python is a popular programming language....",
    "totalLessons": " 8 Lessons",
    "rating": 4.6
},

{
    "id": 5,
    "img": `url(" https://miro.medium.com/max/750/0*3P4WhyFtuwCV5nTa.jpg")`,
    "content": "TPO.AI",
    "name": "Node js",
    "description": "Node.js is an open source server environment Node.js is an open source server environment ",
    "totalLessons": " 7 Lessons",
    "rating": 4.6
},




{
    "id": 9,
    "img": `url(" https://i.pinimg.com/originals/a2/6c/4b/a26c4b485716a585073da2af4328a8cd.jpg")`,
    "content": " TPO.AI",
    "name": "Pyhton",
    "description": "Python is a popular programming language Python is a popular programming language",
    "totalLessons": " 8 Lessons",
    "rating": 4.6
},

{
    "id": 10,
    "img": `url(" https://miro.medium.com/max/750/0*3P4WhyFtuwCV5nTa.jpg")`,
    "content": " TPO.AI",
    "name": "Node js",
    "description": "Node.j",
    "totalLessons": " 7 Lessons",
    "rating": 4.6
},



{
    "id": 12,
    "img": `url("https://upload.wikimedia.org/wikipedia/commons/c/c1/PHP_Logo.png")`,
    "content": " TPO.AI",
    "name": "PHP",
    "description": "PHP",
    "totalLessons": " 8 Lessons",
    "rating": 4.6
}

        ]

export default class MyCourceService {
 
 
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
        records["courses"]=Courcedata? Courcedata.map((data,i)=>{
            return data
        })
      : [];
    return records;
  }

 



}