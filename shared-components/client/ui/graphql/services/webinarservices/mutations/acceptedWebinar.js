import gql from "graphql-tag";

export default gql`
    mutation acceptWebinar($input: AcceptWebinarInput!) {
        acceptWebinar(input: $input) {
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