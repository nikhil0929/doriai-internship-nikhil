import React, {useEffect, useState} from 'react'
import {Container, Typography} from "@material-ui/core";
import SendFile from "./buttonComponents/SendFile";
import Webcam from "react-webcam";
import Button from "@material-ui/core/Button";
import CameraIcon from '@material-ui/icons/Camera';
import Grid from "@material-ui/core/Grid";

function WebcamCard() {

    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [fileObj, setFileObj] = useState(null);
    const [enableWebcam, setEnableWebcam] = useState(false)

    const toggleWebcam = () => {setEnableWebcam(enableWebcam => !enableWebcam);}

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        base64ToFile(imageSrc, 'tempFile.png', 'image/png')
    }, [webcamRef, setImgSrc]);


    function base64ToFile(url, filename, mimeType){
        return (fetch(url)
                .then(function(res){return res.arrayBuffer();})
                .then(function(buf){setFileObj(new File([buf], filename,{type:mimeType}));})
        );
    }

    const webcamContainer = {
        alignItems: "center",
        justifyContent: "center",
        border: "4px solid #4aa1f3",
        position: "relative",
        height: 300,
        width: 420
    }

    const buttonStyle = {
        width: "350px"
    }

    return (
        <div>
            {enableWebcam ? <Grid container direction={'row'} spacing={3}>
                <Grid item xs={12}>
                    <Container maxWidth={"xs"} style={webcamContainer}>
                        <Webcam
                            audio={false}
                            height={300}
                            width={420}
                            ref={webcamRef}
                            style={buttonStyle}
                            screenshotFormat="image/png"
                        />
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary"
                            size="large"
                            variant="contained"
                            component="label"
                            style={buttonStyle}
                            onClick= {() => toggleWebcam()}
                    >
                        Toggle webcam!
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={capture}
                            color="secondary"
                            startIcon={<CameraIcon />}
                            variant="contained"
                            component="label"
                            size="large"
                            style={buttonStyle}
                    >
                        Capture Screenshot</Button>
                </Grid>
                <Grid item xs={12}>
                    <SendFile buttonStyle={buttonStyle}
                              onClick
                              selectedFile={fileObj}
                    />
                </Grid>
                <Grid item xs={12}>
                    {imgSrc && (
                        <img
                            src={imgSrc}
                            alt="screenshot"
                        />
                    )}
                </Grid>
            </Grid>
                :
                <Grid container direction={'row'} spacing={3}>
                    <Grid item xs={12}>
                        <Container maxWidth={"xs"} style={webcamContainer}>
                            <Typography component="div" variant="h6" style={{
                                alignItems: "center",
                                justifyContent: "center"
                            }}><p>Your webcam is off</p></Typography>
                        </Container>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary"
                                size="large"
                                variant="contained"
                                component="label"
                                style={buttonStyle}
                                onClick= {() => toggleWebcam()}
                        >
                            Toggle webcam!
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="secondary"
                                startIcon={<CameraIcon />}
                                variant="contained"
                                component="label"
                                style={buttonStyle}
                                size="large"
                        >Capture Screenshot</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <SendFile buttonStyle={buttonStyle}
                                  selectedFile={fileObj}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {imgSrc && (
                            <img
                                src={imgSrc}
                                alt="screenshot"
                            />
                        )}
                    </Grid>

                </Grid>
            }
        </div>
    )
}

export default WebcamCard;