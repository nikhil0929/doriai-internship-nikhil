import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import ListIcon from '@material-ui/icons/List';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from "@material-ui/icons/Folder";
import ListItemIcon from "@material-ui/core/ListItemIcon";



function GetFiles(props) {
    const [listOfFiles, setListOfFiles] = useState([])
    return (
        <div>
            <Button startIcon={<ListIcon />}
                    onClick={() => list_files(setListOfFiles)}
                    variant="contained"
                    color="primary"
                    size="large"
                    style={props.buttonStyle}
            >
                Get File List
            </Button>
            <List>
                {generate(listOfFiles)}
            </List>
        </div>
    )
}

function generate(listOfFiles) {
    return listOfFiles.map((fileName, i) =>
        <ListItem key={i}>
            <ListItemIcon>
                <FolderIcon />
            </ListItemIcon>
            <ListItemText
                primary={fileName}
            />
        </ListItem>
    );
}

function list_files(setListOfFiles){
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }
    fetch("http://localhost:5000/listFiles", requestOptions)
        .then(response => response.json())
        .then(result => setListOfFiles(result["files"]))
        .catch(error => console.log('error', error));
}

export default GetFiles