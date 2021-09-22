import React from 'react'
import {FormControl, InputLabel, makeStyles, MenuItem, Select, withStyles} from "@material-ui/core";


class DropdownFileSelection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFile: "None",
            fileList: []
        }
    }

    getFileList(path) {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        }
        fetch("http://localhost:5000" + path, requestOptions)
            .then(response => response.json())
            .then(result => this.setState({fileList: result["files"]}))
            .catch(error => console.log('error', error));
    }

    //fetch file list from S3 and put them as elements in dropdown
    componentDidMount() {
        this.getFileList(this.props.getFileListPath)
    }


    handleFileSelection(fileName) {
        this.setState({selectedFile: fileName})
        this.props.retrieveS3File(fileName, this.props.fileSelectionPath)
    }

    render() {

        const {classes} = this.props

        const handleChange = (event) => {
            this.handleFileSelection(event.target.value)
        }

        return (
            <div>
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="FileSelect" style={{
                        color: "white"
                    }}>File</InputLabel>
                    <Select
                        labelId="select-file"
                        onChange={handleChange}
                        value={this.state.selectedFile}
                        className={classes.select}
                        inputProps={{
                            classes: {
                                icon: classes.icon
                            }
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {this.state.fileList.map((fileName) => (
                            <MenuItem value={fileName} key={fileName}>{fileName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        )
    }
}

const useStyles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    select: {
        '&:before': {
            borderColor: "white",
        },
        '&:after': {
            borderColor: "white",
        },
        color:"white",
    },
    icon: {
        fill: "white",
    },
});

export default withStyles(useStyles)(DropdownFileSelection)

