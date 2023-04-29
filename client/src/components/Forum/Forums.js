import React, { useState }  from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BookCard from '../Catalogue/BookCard';
import ForumCard from './ForumCard';

export default function Forums() {
    const [key, setKey] = useState("")
   
    const forums = [{copyAvailable:-1,idForum:1, bookName:"hello", author:"hii", srcImg:"default_book.png"},{copyAvailable:-1,idForum:1, bookName:"hello", author:"hii", srcImg:"default_book.png"},{copyAvailable:-1,idForum:1, bookName:"hello", author:"hii", srcImg:"default_book.png"},{copyAvailable:-1,idForum:1, bookName:"hello", author:"hii", srcImg:"default_book.png"},{copyAvailable:-1,idForum:1, bookName:"hello", author:"hii", srcImg:"default_book.png"},{copyAvailable:-1,idForum:1, bookName:"hello", author:"hii", srcImg:"default_book.png"},{copyAvailable:-1,idForum:1, bookName:"hello", author:"hii", srcImg:"default_book.png"},{copyAvailable:-1,idForum:1, bookName:"hello", author:"hii", srcImg:"default_book.png"},{copyAvailable:-1,idForum:1, bookName:"hello", author:"hii", srcImg:"default_book.png"},{copyAvailable:-1,idForum:1, bookName:"hello", author:"hii", srcImg:"default_book.png"}]
    return (
    <>
        <div className='justify-center'>
            <h1 className='text-uppercase' style={{padding: "2rem"}}>Forums</h1>
        </div>
        <Container>
            <div className='justify-center'>
            <Row sm={2} md={4} className="g-4">
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