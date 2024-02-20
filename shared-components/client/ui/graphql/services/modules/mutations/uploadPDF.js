import gql from "graphql-tag";

export default gql`
  mutation uploadPDF($input: UploadPDFInput!){
    uploadPDF(input: $input){
      pdfData {
        filename
        mimetype
        path
        size
        lastModified
        lastModifiedDate
        webkitRelativePath
      }
    }
  }
`;
