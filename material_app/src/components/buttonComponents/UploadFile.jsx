import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendFile from "./SendFile";
import Grid from "@material-ui/core/Grid";

function UploadFile(props) {
    const [selectedFile, setSelectedFile] = useState(props.accFile[0] !== undefined ? props.accFile[0] : undefined);
    // useEffect(() => {setSelectedFile(props.accFile[0])}, [props.accFile, selectedFile])
    const [isFilePicked, setIsFilePicked] = useState();
    // useEffect(() => {setIsFilePicked(selectedFile !== undefined)}, [isFilePicked, selectedFile])

    function changeHandler(event) {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        props.onFileChange([...event.target.files])
    }

    const buttonStyle = {
        width: "350px"
    }


    return (
        <div>
            <Grid container direction={'row'} spacing={3}>
                <Grid item xs={12}>
                    <Button
                        startIcon={<AttachFileIcon />}
                        variant="contained"
                        component="label"
                        color="secondary"
                        size="large"
                        style={buttonStyle}
                    >
                        Choose File
                        <input
                            type="file"
                            onChange={changeHandler}
                            hidden
                        />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <SendFile selectedFile={selectedFile} buttonStyle={buttonStyle}/>
                </Grid>
            </Grid>
            {/* <h4>{isFilePicked ? "File selected: " + fileName :""}</h4> */}
        </div>
    )
}

export default UploadFile;