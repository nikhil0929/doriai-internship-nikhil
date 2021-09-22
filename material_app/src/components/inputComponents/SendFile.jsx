/**
 * You must pass the file that needs to be sent as a prop into this component
 */
import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send';
import {Typography} from "@material-ui/core";

function SendFile(props) {
    const [isFileSent, setIsFileSent] = useState(false);
    return (
        <div>
            <Button startIcon={<SendIcon />}
                    variant="contained"
                    color="primary"
                    size="large"
                    style={props.buttonStyle}
                    onClick={() => send_file(props.selectedFile, setIsFileSent, props.urlPath)}
            >
                Upload!
            </Button>
            <Typography variant="h3" style={{
                paddingTop: "40px",
                color: "#4aa1f3"
            }}>
                {
                    isFileSent ? "File has sent successfully!" : "File not sent"
                }
            </Typography>
        </div>
    )
}


function send_file(selectedFile, setIsFileSent, urlPath){
    const formData = new FormData();
    formData.append('file', selectedFile)
    let requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    }
    fetch("http://localhost:5000" + urlPath, requestOptions)
        .then((response) => response.json())
        .then((result) => result["status"] === "SUCCESS" ? setIsFileSent(true): setIsFileSent(false))
        .catch((error) => console.log('ERROR: ', error))

}

export default SendFile;
