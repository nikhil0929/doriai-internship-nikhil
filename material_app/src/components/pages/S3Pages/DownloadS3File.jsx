import React, {useEffect, useState} from "react";
import FadeIn from "react-fade-in";
import Typography from "@material-ui/core/Typography";
import GetS3File from "../../inputComponents/S3InputComponents/GetS3File";
import {LinearScaleOutlined} from "@material-ui/icons";
import {resolveToLocation} from "react-router-dom/modules/utils/locationUtils";
import {makeStyles} from "@material-ui/core";

function DownloadS3File(props){

    const [selectedS3File, setSelectedS3File] = useState('')
    const [myFiles, setMyFiles] = useState([])
    const [fileList, setFileList] = useState([])

    const setSelectedFile = (file) => {
        setSelectedS3File(file)
    }

    const imagePreview = myFiles.map(file => (
        <div key={file.name}>
            <div>
                <img
                    src={file.preview}
                    alt="Requested image"/>
            </div>
        </div>
    ));

    function get_s3_file(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "fileName": selectedS3File
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        function blobToFile(theBlob, fileName){
            return new File([theBlob], fileName);
        }

        function getImagePreview(tempFile) {
            Object.assign(tempFile, {
                preview: URL.createObjectURL(tempFile)
            })
            return tempFile
        }

        fetch("http://localhost:5000/getS3File", requestOptions)
            .then(response => response.blob())
            .then(function (result){
                let tempFiles = []
                tempFiles.push(blobToFile(result, "requestedFile.png"))
                tempFiles[0] = getImagePreview(tempFiles[0])
                setMyFiles(tempFiles)
            })
            .catch(error => console.log('error', error));
    }

    function getS3FileList() {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        }
        fetch("http://localhost:5000/listS3Files", requestOptions)
            .then(response => response.json())
            .then(result => setFileList(result["files"]))
            .catch(error => console.log('error', error));
    }

    return (
        <div>
            <FadeIn>
                <Typography variant="h1">Welcome!</Typography>
                <Typography variant="h5" style={{
                    padding: "30px"
                }}>Select a page to begin!</Typography>
                <GetS3File setSelectedFile={setSelectedFile}
                           val={selectedS3File}
                           fileList={fileList}
                           get_s3_file={get_s3_file}
                           updateList={getS3FileList}
                />
                {imagePreview}
            </FadeIn>
        </div>
    )
}

export default DownloadS3File
