import gql from "graphql-tag";

export default gql`
  query notificationsHistory($query: String) {
    notificationsHistory(query: $query){
        _id
        title
        count
        sendTo
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