import React from "react";
import styled from "@emotion/styled";
import AttachFileIcon from '@mui/icons-material/AttachFile';

// Styled input for file upload
const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const FileUpload = ({getMessages}) => {
    const onUploadDocument = async (e) => {
        const files = e?.target?.files;
        const file = files && files.length > 0 && files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64 = e.target.result.split(',')[1];
            getMessages({"fileKey": file.name,"fileBuffer": base64})
        };
        reader.readAsDataURL(file);
    };
    return(
        <>
            <label htmlFor="file-input">
                <AttachFileIcon sx={{ width: '30px', height: '30px', margin: '10px' }} />
            </label>
            <FileInput
                type="file"
                id={'file-input'}
                name={'file-input'}
                onChange={onUploadDocument}
                style={{ display: 'none' }}
                onClick={(event) => {
                    event.target.value = null;
                }}
                accept={
                    '.csv'
                }
            />
        </>
    )
}

// Export the MessageList component for use in other parts of the application
export default FileUpload;
