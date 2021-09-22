import React, {useState} from 'react'
import {Container, Typography} from "@material-ui/core";
import SendFile from "../inputComponents/SendFile"
import Webcam from "react-webcam";
import Button from "@material-ui/core/Button";
import CameraIcon from '@material-ui/icons/Camera';
import Grid from "@material-ui/core/Grid";
import FadeIn from 'react-fade-in';
import Predict from "../inputComponents/Predict";

function WebcamCard() {

    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [fileObj, setFileObj] = useState(null);
    const [enableWebcam, setEnableWebcam] = useState(false)
    const [responseImage, setResponseImage] = useState([])

    const toggleWebcam = () => {
        setEnableWebcam(enableWebcam => !enableWebcam);
    }

    const setImg = (file) => {
        setResponseImage(file)
    }

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        base64ToFile(imageSrc, 'tempFile.jpg', 'image/jpg')
    }, [webcamRef, setImgSrc]);


    function base64ToFile(url, filename, mimeType) {
        return (fetch(url)
                .then(function (res) {
                    return res.arrayBuffer();
                })
                .then(function (buf) {
                    setFileObj(new File([buf], filename, {type: mimeType}));
                })
        );
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

    const webcamContainer = {
        alignItems: "center",
        justifyContent: "center",
        border: "4px solid #4aa1f3",
        borderRadius: "25px",
        position: "relative",
        height: 300,
        width: 420
    }

    const buttonStyle = {
        width: "350px"
    }

    const webcamElement = (
        <Webcam
            audio={false}
            height={300}
            width={420}
            ref={webcamRef}
            style={buttonStyle}
            screenshotFormat="image/png"
        />
    )

    const placeholderElement = (
        <Typography component="div" variant="h6" style={{
            alignItems: "center",
            justifyContent: "center"
        }}><p>Your webcam is off</p></Typography>
    )

    return (
        <div>
            <FadeIn>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Container maxWidth={"xs"} style={webcamContainer}>
                            {enableWebcam ? webcamElement : placeholderElement}
                        </Container>
                    </Grid>
                    <Grid item xs={6}>
                        <Container maxWidth={"xs"} style={webcamContainer}>
                            {imgSrc && (
                                <img
                                    src={imgSrc}
                                    alt="screenshot"
                                />
                            )}
                        </Container>
                    </Grid>
                    <Grid item xs={6}>
                        <Button color="primary"
                                size="large"
                                variant="contained"
                                component="label"
                                style={buttonStyle}
                                onClick={() => toggleWebcam()}
                        >
                            Toggle webcam!
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Predict
                            file={fileObj}
                            setResponseImage={setImg}
                            path="/predictImage"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={capture}
                                color="secondary"
                                startIcon={<CameraIcon/>}
                                variant="contained"
                                component="label"
                                size="large"
                                style={buttonStyle}
                        >
                            Capture Screenshot</Button>
                    </Grid>
                    <Grid item xs={6} />
                    <Grid item xs={6}>
                        <SendFile buttonStyle={buttonStyle}
                                  onClick
                                  selectedFile={fileObj}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {getImagePreview(responseImage)}
                    </Grid>
                </Grid>
            </FadeIn>
        </div>
    )
}

export default WebcamCard;
