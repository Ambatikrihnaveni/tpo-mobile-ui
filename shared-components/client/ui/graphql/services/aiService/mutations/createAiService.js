import gql from "graphql-tag";

export default gql`
mutation createAIService($input:CreateAIServiceInput!){
    createAIService(input: $input)
}
`;