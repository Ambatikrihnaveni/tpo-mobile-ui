import gql from "graphql-tag";

export default gql`
  query notification($id: ID!) {
    notification(id: $id){
        _id
        message
        status
        timeSent
        from
        fromAccount{
            _id
            name
            primaryEmailAddress
            userMedia {
                _id
                URLs {
                  thumbnail
                }
                priority
              }
        }
        to
        toAccount{
            _id
            name
            primaryEmailAddress
            userMedia {
                _id
                URLs {
                  thumbnail
                }
                priority
              }
        }
    }
  }
`;