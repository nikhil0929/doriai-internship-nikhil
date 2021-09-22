import React from 'react'
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

function Predict(props){

    const useStyles = makeStyles(theme => ({
        buttonStyle: {
            top: "60px"
        }
    }))

    const classes = useStyles()

    return (
        <div>
            <Button variant="contained"
                    color="secondary"
                    className={classes.buttonStyle}
                    onClick={() => predictImage(props.file, props.setResponseImage, props.path)}
            >
                Predict
            </Button>
        </div>
    )
}

function predictImage(file, setResponseImage, path) {
    const formData = new FormData();
    formData.append('file', file)
    let requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    }


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
        .then((response) => response.blob())
        .then(function (result) {
            let tempFiles = []
            tempFiles.push(blobToFile(result, "requestedFile.png"))
            tempFiles[0] = getImagePreview(tempFiles[0])
            setResponseImage(tempFiles)
        })
        .catch((error) => console.log('ERROR: ', error))

}

export default Predict
