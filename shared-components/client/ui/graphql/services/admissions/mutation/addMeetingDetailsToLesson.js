import gql from "graphql-tag";

export default gql`
mutation addMeetingDetailsToLesson($input : AddMeetingDetailsToLessonInput!) {
    addMeetingDetailsToLesson(input : $input) {
        _id
        name
    }
}
`