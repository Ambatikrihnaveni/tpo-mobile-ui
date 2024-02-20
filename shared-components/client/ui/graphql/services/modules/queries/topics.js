import gql from "graphql-tag";

export default gql`
  query topics($shopId: ID!, $productId: ID!,$lessonId:ID!) {
    topics(shopId:$shopId,productId:$productId,lessonId:$lessonId){
      _id
      name
      fea_img
      video_source
      topic_content
      uploads
      shopId
      lessonId
      productId
      createdBy
      createdAt
     
    }
}
`;
