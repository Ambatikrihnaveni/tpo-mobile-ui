import gql from "graphql-tag";

export default gql`
  mutation deleteLesson($input: deleteLessonInput!){
    deleteLesson(input: $input){
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
