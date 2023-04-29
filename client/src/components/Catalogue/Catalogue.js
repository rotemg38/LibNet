import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Search from './Search';
import React, { useState } from 'react';
import BookCard from './BookCard';
import { Container } from 'react-bootstrap';


function Catalogue() {
   
  const [searchResults, setSearchResults] = useState([]);
  const [numInvite, setNumInvite] = useState(0)

  
  return (
   <>
   <div className='justify-center'>
      <h1 className='text-uppercase' style={{padding: "2rem"}}>Books Catalogue</h1>
   </div>
   <Search updateResults={setSearchResults}></Search>
   <div className='justify-center'>
      <hr className="rounded" style={{width: "80%", alignSelf:"center"}}></hr>
   </div>
   <br/>
   <Container>
   <div className='justify-center'>
      
      
   <Row sm={2} md={4} className="g-4">
      {searchResults.map((result, index)=> 
        <Col key={index}>
          {(result.picBook === "default_book.png")? 
              <BookCard copyAvailable={result.copyAvailable} index={index} idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={"/images/" + result.picBook} showInvite={true} numInvite={numInvite} setNumInvite={setNumInvite}/>
              :<BookCard copyAvailable={result.copyAvailable} index={index} idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook} showInvite={true} numInvite={numInvite} setNumInvite={setNumInvite}/>
          }
        </Col>
      )}
       
   </Row>
  
   </div>
   </Container>
   </>
  );
}

export default Catalogue;