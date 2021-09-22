import React, {useState} from 'react'
import List from "@material-ui/core/List";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ClearAllIcon from '@material-ui/icons/ClearAll';
import FadeIn from 'react-fade-in';
import InsertDriveFileRoundedIcon from '@material-ui/icons/InsertDriveFileRounded';

function ListS3Files(props) {

    let files = []

    if(props.fileList){
        files = props.fileList
    }

    const listDisplay = (
        <div>
            <List>
                <FadeIn>
                    {files.map((item) => (
                        <ListItem key={item} button>
                            <ListItemIcon>
                                <InsertDriveFileRoundedIcon/>
                            </ListItemIcon>
                            <ListItemText primary={item}/>
                        </ListItem>
                    ))}
                </FadeIn>
            </List>
        </div>
    )

    return (
        <div>
            <Button startIcon={<ClearAllIcon/>}
                    onClick={props.getS3FileList}
                    variant="contained"
                    color="secondary"
                    size="large"
            >
                List S3 Bucket Files
            </Button>
            {listDisplay}
        </div>
    )
}


export default ListS3Files