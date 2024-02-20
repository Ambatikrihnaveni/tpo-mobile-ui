import gql from "graphql-tag";

export default gql`
  mutation updateProgramStatus($id: String, $status: String) {
    updateProgramStatus(id : $id, status: $status) {
      _id
      type
      shopId
      createdAt
      createdBy
      status
    }
  }
`;