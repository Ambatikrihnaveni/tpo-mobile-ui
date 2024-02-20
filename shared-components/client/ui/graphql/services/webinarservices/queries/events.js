import gql from "graphql-tag";

export default gql`
query events($shopId:ID $query:String){
    events(shopId:$shopId query:$query){
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
  }  
}
`