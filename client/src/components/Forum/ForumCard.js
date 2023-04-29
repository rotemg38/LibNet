import React, { useState }  from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function ForumCard({idForum}) {
    return (
        <>
        <Card style={{width:'18rem', alignSelf:'center'}}>
            <Card.Body style={{ alignSelf:'center'}}>
                <Card.Title> forum.forumName</Card.Title>
                <Card.Text> foum.discription</Card.Text>
            </Card.Body>
        
            <Card.Footer >
            <Row>
                <Col className='justify-center'>
                    <Link to={`/forum/${idForum}`}>
                        <Button variant="primary">Open</Button>
                    </Link>
                </Col>
            </Row>
            </Card.Footer>
        </Card>
        </>
    );
}