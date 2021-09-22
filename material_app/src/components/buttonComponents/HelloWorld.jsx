import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import CodeIcon from '@material-ui/icons/Code'

function HelloWorld(props) {
    const [helloWorldTxt, setHelloWorldTxt] = useState("")
    return (
        <div>
            <Button startIcon={<CodeIcon />}
                    onClick={() => hello_world(setHelloWorldTxt)}
                    variant="contained"
                    color="secondary"
                    size="large"
                    style={props.buttonStyle}>
                Get Hello World
            </Button>
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