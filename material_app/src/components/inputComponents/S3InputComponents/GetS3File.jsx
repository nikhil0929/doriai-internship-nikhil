import React from 'react'
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from "@material-ui/core/Button";
import {
    FormControl,
    InputBase,
    InputLabel,
    ListSubheader,
    makeStyles,
    MenuItem,
    Select,
    withStyles
} from "@material-ui/core";

function GetS3File(props) {


    const useStyles = makeStyles((theme) => ({
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
    }));


    const classes = useStyles();

    const handleChange = (event) => {
        props.setSelectedFile(event.target.value)

    }

    return (
        <div>
            <FormControl variant="filled" className={classes.formControl} onClick={props.updateList}>
                <InputLabel id="FileSelect" style={{
                    color: "white"
                }}>File</InputLabel>
                <Select
                    labelId="select-file"
                    onChange={handleChange}
                    value={props.val}
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
                    {props.fileList.map((fileName) => (
                        <MenuItem value={fileName}>{fileName}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button startIcon={<GetAppIcon />}
                    onClick={props.get_s3_file}
                    variant="contained"
                    color="primary"
                    size="large"
                    //style={props.buttonStyle}
            >
                Download File
            </Button>
        </div>
    )
}

export default GetS3File