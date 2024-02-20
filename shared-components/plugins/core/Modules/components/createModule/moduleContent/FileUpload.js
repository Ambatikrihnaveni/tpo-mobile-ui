import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ handleFileChange }) => {
  const onDrop = useCallback((acceptedFiles) => {
    handleFileChange(acceptedFiles);
  }, [handleFileChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf',
  });

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()}/>
      <p>Drag and drop PDF files here, or click to select files</p>
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default FileUpload;