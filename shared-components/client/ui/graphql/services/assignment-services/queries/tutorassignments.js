import gql from "graphql-tag";

export default gql `

  query tutorAssignments($accountId:ID) {
    tutorAssignments(id:$accountId){
        assignmentName
        course
        totalMarks
        totalSubmit
        assignmentId
    }
  }
`;
