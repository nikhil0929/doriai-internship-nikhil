import React, {useState} from 'react'
import FileUploadCard from "../FileUploadCard";

function Upload_SendS3Card(props) {
    return (
        <div>
            <FileUploadCard urlPath={props.urlPath} />
        </div>
    )
}

export default Upload_SendS3Card
