import gql from "graphql-tag";

export default gql`
  mutation dragAndDropLesson($input: DragAndDropLessonInput!) {
    dragAndDropLesson(input: $input) {
       product{
            _id
       }
    }
  }
`;