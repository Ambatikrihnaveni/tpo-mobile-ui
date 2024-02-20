import gql from "graphql-tag";

export default gql`
  query lessons($shopId: ID!, $productId: ID!) {
    lessons(shopId:$shopId,productId:$productId){
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
      topics{
        _id
        shopId
        productId
        lessonId
        topic_name
        topic_summary
        createdAt
        createdBy
      }
      assignments{
        _id
        shopId
        productId
        lessonId
        assignment_title
        summary
        time_limit
        time_limit_type
        total_points
        min_pass_points
        createdAt
      }
      quizs{
        _id
        shopId
        productId
        lessonId
        quiz_question
        quiz_answer
        quiz_title
        quiz_options{
          optionA
          optionB
          optionC
          optionD
        }
        quiz_hint

      }
    }
}
`;
