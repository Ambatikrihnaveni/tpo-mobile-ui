import gql from "graphql-tag";

export default gql`
mutation addRecordingLinkToLesson($input : AddMeetingDetailsToLessonInput!) {
    addRecordingLinkToLesson(input : $input) {
        _id
        name
    }
}
`