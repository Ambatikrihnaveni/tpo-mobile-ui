import gql from "graphql-tag";

export default gql`
mutation createCompetitivePrep($input:CreateCompetitivePrepInput!){
    createCompetitivePrep(input:$input){
        competitivePrep {
            _id
        }
    }
}`