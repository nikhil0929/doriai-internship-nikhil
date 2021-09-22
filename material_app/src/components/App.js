//Inference

import '../App.css';
import Grid from '@material-ui/core/Grid';

import React from "react"
import GetFiles from "./buttonComponents/GetFiles";
import FileUploadCard from "./FileUploadCard";
import WebcamCard from "./WebcamCard";
import TextBoxCard from "./TextBoxCard";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <FileUploadCard />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <WebcamCard />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextBoxCard />
                    </Grid>
                </Grid>
            </header>
        </div>
    );
}

export default App;
