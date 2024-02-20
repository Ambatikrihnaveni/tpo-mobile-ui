import gql from "graphql-tag";

export default gql`
    mutation editWebinar($input: EditWebinarInput!) {
        editWebinar(input: $input) {
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