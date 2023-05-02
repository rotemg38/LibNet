import React, { useEffect, useState }  from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getForumByFilter } from '../../DBHandle/repoForums';


export default function ForumCard({idForum}) {
    const [forum, setForum] = useState({forumName:"", description:""})

    useEffect(()=>{
        async function fetchData() {
            let res = await getForumByFilter({"idForum":idForum})
            setForum(res)
        }
        fetchData()
    },[idForum])
    return (
        <>
        <Card style={{height:"20rem", width:'18rem', alignSelf:'center'}}>
            <Card.Body style={{ alignSelf:'center'}}>
                <Card.Title> {forum.forumName}</Card.Title>
                <hr></hr>
                <Card.Text> {forum.description}</Card.Text>
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