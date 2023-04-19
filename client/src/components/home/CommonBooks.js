import React  from 'react';
import { Row, Col } from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup';
import BookCard from '../Catalogue/BookCard';

function CommonBooks() {
    return (
        <>
        <br/>
        <br/>
        <br/>
        <div className="text-center bg-light">
        <br/>
            <h1 className="section-heading text-uppercase">New In The Library</h1>
            <br/>
            
            <div className='justify-center'>
            <Row>
                <Col>
                <BookCard idBook={1} bookName="Book Name" author="Author" srcImg={process.env.PUBLIC_URL + "/images/books/CatchingFire.jpg"} showInvite={false} numInvite={null} setNumInvite={null}></BookCard>
                </Col>
                <Col>
                <BookCard idBook={2} bookName="Book Name" author="Author" srcImg={process.env.PUBLIC_URL + "/images/books/CatchingFire.jpg"} showInvite={false} numInvite={null} setNumInvite={null}></BookCard>
                </Col>
                <Col>
                <BookCard  idBook={3} bookName="Book Name" author="Author" srcImg={process.env.PUBLIC_URL + "/images/books/CatchingFire.jpg"} showInvite={false} numInvite={null} setNumInvite={null}></BookCard>
                </Col>
                
            </Row>
            </div>
            <br/>
        </div>
        </>
        );
    }
    
export default CommonBooks;