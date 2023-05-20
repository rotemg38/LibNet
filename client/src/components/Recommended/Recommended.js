import React, { useEffect, useState }  from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { getRecommendationsByUser } from '../../DBHandle/repoRecommendations';
import BookCard from '../Catalogue/BookCard';


function Recommended({userId}) {
    const [show, setShow] = useState(false)
    const [recommendedBooks, setRecommendedBooks] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const books = await getRecommendationsByUser(userId)
           
            if(books !== null && books.length !== 0){
                setRecommendedBooks(books)
            }else{
                setShow(true)
            }
        }
      
        fetchData()
    },[])
    return (
        <>
        <br/>
       
        <div className="text-center">
        <br/>
            <h1 className="section-heading text-uppercase">Especially for you</h1>
            <br/>
            <br/>
            <Alert variant='info' show={show}>Sorry, There are no recommended books for now</Alert>
            <div className='justify-center'>
                
            <Row>
            {recommendedBooks.map((result, index)=> 
                <Col key={index}>
                {(result.picBook === "default_book.png")? 
                    <BookCard copyAvailable={-1} index={index} idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={"/images/" + result.picBook} showInvite={false} numInvite={null} setNumInvite={null}/>
                    :<BookCard copyAvailable={-1} index={index} idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook} showInvite={false} numInvite={null} setNumInvite={null}/>
                }
                </Col>
            )}
               
            </Row>
            </div>
            <br/>
        </div>
        </>
        );
    }
    
export default Recommended;