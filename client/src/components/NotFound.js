import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './stylesNotFound.css'


const NotFound = () => {
    const navigate = useNavigate()
    return (
        <>
            <Container style={{ paddingTop: "10rem" }}>

                <div className="center">
                    <div className="error">
                        <div className="number">4</div>
                        <img sizes='3' alt="ConfusedEmoji" src="/ConfusedEmoji.png" style={{ width: "18rem", height: "18rem" }}></img>
                        <div className="number">4</div>
                    </div>

                    <div className="text">Oops. The page you're looking for doesn't exist.</div>
                    <br />
                    <br />
                    <Button variant='primary' onClick={() => { navigate("/") }} >Back to Home</Button>
                </div>
            </Container>

        </>

    );
};

export default NotFound;