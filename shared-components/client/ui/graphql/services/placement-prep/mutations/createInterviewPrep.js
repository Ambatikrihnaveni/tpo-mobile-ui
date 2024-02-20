import gql from "graphql-tag";

export default gql`
    mutation createInterviewPrep($input: CreateInterviewPrepInput!) {
        createInterviewPrep(input: $input) {
            interviewPrep {
                _id
                title
                description
                shopId
                type
            }
        }
    }
`;