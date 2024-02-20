import gql from "graphql-tag";

export default gql`
    mutation deleteInterviewPrep($interviewPrepIds:[ID!]) {
        deleteInterviewPrep(interviewPrepIds: $interviewPrepIds)
    }
`;