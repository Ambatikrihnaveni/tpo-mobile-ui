import gql from "graphql-tag";

export default gql`
query webinar($webinarId:ID!){
    webinar(id:$webinarId){
    _id
    title
    description
    url
    date
    startTime
    endTime
    audiences
    createdAt
    createdBy
    accept
    deny
    userData{
        name
        email
        role
        _id
    }
  }  
}
`