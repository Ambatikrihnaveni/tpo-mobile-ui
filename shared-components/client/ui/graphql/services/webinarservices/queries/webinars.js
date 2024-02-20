import gql from "graphql-tag";

export default gql`
query webinars($query:String){
  webinars(query:$query){
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
    acceptedCount
  }  
}
`