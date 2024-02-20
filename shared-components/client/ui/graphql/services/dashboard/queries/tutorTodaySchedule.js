import gql from "graphql-tag";

export default gql`
query tutorTodaySchedule($shopId: ID!) {
    tutorTodaySchedule(shopId: $shopId) {
        _id
        name
        lessonsDuration{
            lesson{
                name
            }
        }
        batchStartTime
        batchEndTime
    }
}
`