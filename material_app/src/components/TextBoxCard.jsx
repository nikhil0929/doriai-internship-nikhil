import React, {useEffect, useState} from 'react'
import {Container, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CodeIcon from "@material-ui/icons/Code";
import ListIcon from "@material-ui/icons/List";

function TextBoxCard() {

    const [displayJSON, setDisplayJSON] = useState("DISPLAY TEXT")

    function hello_world() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:5000/helloWorld", requestOptions)
            .then(response => response.text())
            .then(result => setDisplayJSON(result))
            .catch(error => console.log('error', error));
    }

    function list_files() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:5000/listFiles", requestOptions)
            .then(response => response.text())
            .then(result => setDisplayJSON(result))
            .catch(error => console.log('error', error));
    }


    const textBoxContainer = {
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
            <Grid container direction={'row'} spacing={3}>
                <Grid item xs={12}>
                    <Container maxWidth={"xs"} style={textBoxContainer}>
                        <Typography component="div" variant="h6" style={{
                            alignItems: "center",
                            justifyContent: "center"
                        }}><p>{displayJSON}</p></Typography>
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Button startIcon={<CodeIcon/>}
                            onClick={() => hello_world()}
                            variant="contained"
                            color="secondary"
                            size="large"
                            style={buttonStyle}>
                        Get Hello World
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button startIcon={<ListIcon/>}
                            onClick={() => list_files()}
                            variant="contained"
                            color="primary"
                            size="large"
                            style={buttonStyle}
                    >
                        Get File List
                    </Button>
                </Grid>
            </Grid>
        </div>
    )

}

export default TextBoxCard;