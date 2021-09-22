import React, {useState} from 'react'
import UploadFile from "../inputComponents/UploadFile";
import {Container, Fade, Typography} from "@material-ui/core";
import {useDropzone} from "react-dropzone";
import Grid from '@material-ui/core/Grid';
import FadeIn from 'react-fade-in';

function FileUploadCard(props) {
    const [file, setFile] = useState([])
    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
        multiple: false,
        accept: 'image/*',
        // eslint-disable-next-line no-use-before-define
        onDrop: (acceptedFiles) => createObjURLs(acceptedFiles)
    });

    function createObjURLs(acceptedFiles) {
        setFile(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }

    const imgPreview = {
        borderRadius: "20px",
        width: "400px",
        height: "280px",
        position: "relative",
        top: -14
    }

    const thumbs = file.map(file => (
        <div key={file.name}>
            <div>
                <img
                    src={file.preview}
                    style={imgPreview}
                    alt="Uploaded image"/>
            </div>
        </div>
    ));

    const img_upload = {
        alignItems: "center",
        justifyContent: "center",
        border: "4px dashed #4aa1f3",
        borderRadius: "25px",
        position: "relative",
        width: "350px",
        height: "75px",
    }

    const container = {
        alignItems: "center",
        justifyContent: "center",
        border: "4px solid #4aa1f3",
        borderRadius: "25px",
        position: "relative",
        padding: 0,
        height: 300,
        width: 420,
    }

    return (
        <div>
            <FadeIn>
                <Grid container direction={'row'} spacing={3} >
                    <Grid item xs={12}>
                        <Container {...getRootProps()} maxWidth={"xs"} style={container}>
                            <input {...getInputProps()} />
                            <Typography component="div" variant="h6" style={{
                                alignItems: "center",
                                justifyContent: "center"
                            }}><p>{file.length === 0 ? "FILE PREVIEW" : ""}</p></Typography>
                            {thumbs}
                        </Container>
                    </Grid>
                    <Grid item xs={12}>
                        <Container {...getRootProps()} maxWidth={"xs"} style={img_upload}>
                            <input {...getInputProps()} />
                            <Typography component="div" variant="h6" style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}>{
                                isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <p>Drag and Drop Images!</p>
                            }</Typography>
                        </Container>
                    </Grid>
                    <Grid item xs={12}>
                        <UploadFile accFile={acceptedFiles} onFileChange={createObjURLs} urlPath={props.urlPath}/>
                    </Grid>
                </Grid>
            </FadeIn>
        </div>
    )
}

export default FileUploadCard
