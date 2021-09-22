import React, {useState} from 'react'
import Typography from "@material-ui/core/Typography";
import FadeIn from 'react-fade-in';
import ListS3Files from "../../inputComponents/S3InputComponents/ListS3Files";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import DropdownFileSelection from "../../inputComponents/DropdownFileSelection";


function ListS3FilesCard(props) {

    const [fileList, setFileList] = useState([])

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            height: "100%"
        },
    }));

    const classes = useStyles();
    const theme = useTheme();


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
                <Typography variant="h2">S3 Interaction</Typography>
                <Typography variant="h5" style={{
                    padding: "30px"
                }}>List files in S3 bucket</Typography>
                <ListS3Files fileList={fileList} getS3FileList={getS3FileList}/>
                {/*<DropdownFileSelection*/}
                {/*    retrieveS3File={}*/}
                {/*    getFileListPath="/getUnpredictedList"*/}
                {/*    fileSelectionPath="/getUnpredictedImage"*/}

                {/*/>*/}
            </FadeIn>
        </div>
    )
}

export default ListS3FilesCard
