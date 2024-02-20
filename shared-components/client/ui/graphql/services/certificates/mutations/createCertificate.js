import gql from "graphql-tag";

export default gql`
mutation createCertificate($input:CreateCertificateInput!){
    createCertificate(input:$input){
    _id
    }
}`