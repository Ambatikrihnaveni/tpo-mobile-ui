import gql from "graphql-tag";

export default gql`
  mutation dragAndDrop($input: DragAndDropInput!) {
    dragAndDrop(input: $input) {
       lesson{
            _id
       }
    }
  }
`;