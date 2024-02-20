import gql from "graphql-tag";

export default gql`
mutation deleteCompetitivePrep($competitivePrepIds:[ID!]) {
    deleteCompetitivePrep(competitivePrepIds: $competitivePrepIds)
 }
`;