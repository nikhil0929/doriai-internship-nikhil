import React, {useState} from 'react'
import Typography from "@material-ui/core/Typography";
import FadeIn from "react-fade-in";
import FileUploadCard from "./FileUploadCard";
import Grid from "@material-ui/core/Grid";
import {Button, Paper} from "@material-ui/core";
import DropdownFileSelection from "../inputComponents/DropdownFileSelection"
import {makeStyles} from "@material-ui/core/styles";
import Predict from '../inputComponents/Predict'

function PredictImage(props) {

    const [responseImage, setResponseImage] = useState([])
    const [selectedImage, setSelectedImage] = useState([])

    const [file, setFile] = useState(undefined)

    const setImg = (file) => {
        setResponseImage(file)
    }



    function getImagePreview(imgList) {
        return (
            imgList.map(file => (
                <div key={file.name}>
                    <div>
                        <img
                            src={file.preview}
                            alt="Requested image"
                            style={{
                                width: "410px",
                                height: "290px",
                                position: "relative",
                                borderRadius: "10px",
                                top: "5px",
                            }}/>
                    </div>
                </div>
            ))
        )
    }


    function retrieveS3File(fileName, path) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "fileName": fileName
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        function blobToFile(theBlob, fileName) {
            return new File([theBlob], fileName);
        }

        function getImagePreview(tempFile) {
            Object.assign(tempFile, {
                preview: URL.createObjectURL(tempFile)
            })
            return tempFile
        }

        fetch("http://localhost:5000" + path, requestOptions)
            .then(response => response.blob())
            .then(function (result) {
                let tempFiles = []
                let newFile = blobToFile(result, "requestedFile.jpg")
                tempFiles.push(newFile)
                tempFiles[0] = getImagePreview(tempFiles[0])
                setFile(newFile)
                setSelectedImage(tempFiles)
            })
            .catch(error => console.log('error', error));
    }


    const useStyles = makeStyles(theme => ({
        paperStyle: {
            width: "420px",
            height: "300px",
            borderRadius: "15px",
            backgroundColor: "#3a3a3a"
        },
    }))

    const classes = useStyles()

    return (
        <FadeIn>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <DropdownFileSelection
                            retrieveS3File={retrieveS3File}
                            getFileListPath="/getUnpredictedList"
                            fileSelectionPath="/getUnpredictedImage"

                        />
                        <Predict
                            file={file}
                            setResponseImage={setImg}
                            path="/predictImageS3"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={3} className={classes.paperStyle}>
                            {getImagePreview(selectedImage)}
                        </Paper>
                        <Paper elevation={3} className={classes.paperStyle}
                               style={{
                                   position: "relative",
                                   top: "60px"
                               }}>
                            {getImagePreview(responseImage)}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </FadeIn>
    )
}


export default PredictImage
