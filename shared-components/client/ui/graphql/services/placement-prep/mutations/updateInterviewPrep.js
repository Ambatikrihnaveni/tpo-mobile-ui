import gql from "graphql-tag";

export default gql`
    mutation updateInterviewPrep($input: UpdateInterviewPrepInput!) {
        updateInterviewPrep(input: $input) {
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