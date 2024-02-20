import gql from "graphql-tag";

export default gql`
query todaySchedule($shopId: ID!) {
    todaySchedule(shopId: $shopId) {
        _id
        name
        program {
            _id
            name
        }
        batchStartTime
        batchEndTime
    }
}
`