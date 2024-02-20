
import gql from "graphql-tag";

export default gql `

  query assignment($assignmentId:ID!) {
    assignment(id:$assignmentId){
        _id

        assignment_title
    
        summary
    
        time_limit
    
        time_limit_type
    
        total_points
    
        min_pass_points
    
        productId
    
        lessonId
    
        shopId
    
        createdAt
    
        createdBy
    }
  }
`;
