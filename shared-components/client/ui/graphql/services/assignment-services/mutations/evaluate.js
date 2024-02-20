import gql from "graphql-tag";

export default gql `
mutation evaluateAssignment($input: EvaluateAssignmentInput!){
    evaluateAssignment(input:$input)
  }
  `;