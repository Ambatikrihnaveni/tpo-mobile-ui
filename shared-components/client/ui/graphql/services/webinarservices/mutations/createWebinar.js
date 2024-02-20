import gql from "graphql-tag";

export default gql`
    mutation createWebinar($input: CreateWebinarInput!) {
        createWebinar(input: $input) {
            webinar {
                _id
                title
                description
                url
                date
                startTime
            }
        }
    }
`;