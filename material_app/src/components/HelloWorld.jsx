import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import CodeIcon from '@material-ui/icons/Code'

function HelloWorld() {
    const [helloWorldTxt, setHelloWorldTxt] = useState("")
    return (
        <div>
            <Button startIcon={<CodeIcon />} onClick={() => hello_world(setHelloWorldTxt)} variant="contained" color="secondary" size="large">
                Get Hello World
            </Button>
            <h1> {helloWorldTxt} </h1>
        </div>
    )
}

function hello_world(setHelloWorldTxt){
    let requestOptions = {
        method: 'GET'
    }
    fetch("http://localhost:5000/helloWorld", requestOptions).then(response =>
        response.text().then((text) => setHelloWorldTxt(text)))
}

export default HelloWorld