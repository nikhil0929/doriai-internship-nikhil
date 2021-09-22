import React from 'react'
import Typography from "@material-ui/core/Typography";
import FadeIn from 'react-fade-in';


function Home() {
    return (
        <div>
            <FadeIn>
                <Typography variant="h1">Welcome!</Typography>
                <Typography variant="h5" style={{
                    padding: "30px"
                }}>Select a page to begin!</Typography>
            </FadeIn>
        </div>
    )
}

export default Home