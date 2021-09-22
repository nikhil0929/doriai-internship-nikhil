import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

function SendFile() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isFileSent, setIsFileSent] = useState(null)
    const [fileName, setFileName] = useState("")


    function changeHandler(event) {
        let targetFileName = event.target.files[0]["name"]
        setSelectedFile(event.target.files[0])
        setFileName(targetFileName)
        setIsFilePicked(true)
    }

    function send_file(){
        const formData = new FormData()
        formData.append('file', selectedFile)
        let requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        }
        fetch("http://localhost:5000/sendFile", requestOptions)
            .then((response) => response.json())
            .then((result) => result["status"] === "SUCCESS" ? setIsFileSent(true): setIsFileSent(false))
            .catch((error) => console.log('ERROR: ', error))
    }

    return (
        <div>
            <Button
                startIcon={<SaveIcon />}
                variant="contained"
                component="label"
                color="secondary"
                size="large"
            >
                Choose File
                <input
                    type="file"
                    onChange={changeHandler}
                    hidden
                />
            </Button>

            <Button startIcon={<SaveIcon />}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={send_file}
            >
                Upload!
            </Button>
            <h4>{isFilePicked ? "File selected: " + fileName :""}</h4>
            <h1>{
                isFileSent ? "File has sent successfully!" : "File not sent"
            }</h1>
        </div>
    )
}

export default SendFile;