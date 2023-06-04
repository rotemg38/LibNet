import React, { useEffect, useState }  from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getAllForums } from '../../DBHandle/repoForums';
import ForumCard from './ForumCard';

export default function Forums() {
    const [forums, setForums] = useState([])
   
    useEffect(()=>{
        async function fetchData() {
            let res = await getAllForums()
            setForums(res)
        }
        fetchData()
    },[])
    
    return (
    <>
        <div className='justify-center'>
            <h1 className='text-uppercase' style={{padding: "2rem"}}>Forums</h1>
        </div>
        <Container>
            <div className='justify-center'>
            <Row md={8} className="g-4">
                {forums.map((element, index)=> 
                    <Col key={index}>
                        <ForumCard idForum={element.idForum}/>
                    </Col>
                )}
                
            </Row>
            </div>
        </Container>
    </>
  
    );
  }