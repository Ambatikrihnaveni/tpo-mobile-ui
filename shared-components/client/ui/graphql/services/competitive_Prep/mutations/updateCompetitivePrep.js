import gql from "graphql-tag";

export default gql`
mutation updateCompetitivePrep($input: UpdateCompetitivePrepInput!) {
    updateCompetitivePrep(input: $input){
        competitivePrep {
            _id
        }
    }
}`