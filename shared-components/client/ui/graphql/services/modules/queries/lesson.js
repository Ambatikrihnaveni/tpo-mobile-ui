import gql from "graphql-tag";

export default gql`
  query lesson($productId: ID, $shopId: ID!, $lessonId:ID!) {
    lesson(shopId:$shopId,productId:$productId,lessonId:$lessonId){
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
        given_answer

      }
    }
  }
`;