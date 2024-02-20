import gql from "graphql-tag";
//import Lesson from "../fragments/lessonWithVariants";

export default gql`
  mutation updateLesson($input: UpdateLessonInput!){
    updateLesson(input: $input){
        _id
        name
        fea_img
        video_source
        lesson_content
        uploads
        shopId
        productId
        createdBy
        createdAt
    }
  }
 
`;
