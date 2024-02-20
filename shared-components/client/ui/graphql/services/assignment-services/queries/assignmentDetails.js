import gql from "graphql-tag";

export default gql`

  query assignmentDetails($assignmentId:ID) {
    assignmentDetails(id:$assignmentId){
        date
    studentName
    studentEmail
    totalPoints
    result
    studentId
    assignmentId
    assignmentName
    course
    assignmentAnswer
    assignmentMarks
    assignmentSummary
    }
  }
`;
