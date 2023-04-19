import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Search from './Search';
import React, { useState } from 'react';
import BookCard from './BookCard';
import { Container, Pagination, Table } from 'react-bootstrap';

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
      
   <Pagination size="md">
      
   <Row>
      {searchResults.map((result, index) => (
          <Col key={index}>
            {(result.picBook === "default_book.png")? 
            <BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={"/images/" + result.picBook} showInvite={true} numInvite={numInvite} setNumInvite={setNumInvite}></BookCard>
            :<BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook} showInvite={true} numInvite={numInvite} setNumInvite={setNumInvite}></BookCard>
            }
          </Col>
        ))}
        {/* 
        {searchResults.map((result, index) => (
          <Col key={index+1}>
            {(result.picBook === "default_book.png")? 
            <BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={process.env.PUBLIC_URL + "/images/" + result.picBook}></BookCard>
            :<BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook}></BookCard>
            }
            
          </Col>
        ))}
        {searchResults.map((result, index) => (
          <Col key={index+2}>
            {(result.picBook === "default_book.png")? 
            <BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={process.env.PUBLIC_URL + "/images/" + result.picBook}></BookCard>
            :<BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook}></BookCard>
            }
            
          </Col>
        ))}
        {searchResults.map((result, index) => (
          <Col key={index+3}>
            {(result.picBook === "default_book.png")? 
            <BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={process.env.PUBLIC_URL + "/images/" + result.picBook}></BookCard>
            :<BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook}></BookCard>
            }
            
          </Col>
        ))}
        {searchResults.map((result, index) => (
          <Col key={index+4}>
            {(result.picBook === "default_book.png")? 
            <BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={process.env.PUBLIC_URL + "/images/" + result.picBook}></BookCard>
            :<BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook}></BookCard>
            }
            
          </Col>
        ))}
        {searchResults.map((result, index) => (
          <Col key={index+5}>
            {(result.picBook === "default_book.png")? 
            <BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={process.env.PUBLIC_URL + "/images/" + result.picBook}></BookCard>
            :<BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook}></BookCard>
            }
            
          </Col>
        ))}
        {searchResults.map((result, index) => (
          <Col key={index+6}>
            {(result.picBook === "default_book.png")? 
            <BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={process.env.PUBLIC_URL + "/images/" + result.picBook}></BookCard>
            :<BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook}></BookCard>
            }
            
          </Col>
        ))}
        {searchResults.map((result, index) => (
          <Col key={index+7}>
            {(result.picBook === "default_book.png")? 
            <BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={process.env.PUBLIC_URL + "/images/" + result.picBook}></BookCard>
            :<BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook}></BookCard>
            }
            
          </Col>
        ))}
        {searchResults.map((result, index) => (
          <Col key={index+8}>
            {(result.picBook === "default_book.png")? 
            <BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={process.env.PUBLIC_URL + "/images/" + result.picBook}></BookCard>
            :<BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook}></BookCard>
            }
            
          </Col>
        ))}
        {searchResults.map((result, index) => (
          <Col key={index+9}>
            {(result.picBook === "default_book.png")? 
            <BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={process.env.PUBLIC_URL + "/images/" + result.picBook}></BookCard>
            :<BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook}></BookCard>
            }
            
          </Col>
        ))}
        {searchResults.map((result, index) => (
          <Col key={index+10}>
            {(result.picBook === "default_book.png")? 
            <BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={process.env.PUBLIC_URL + "/images/" + result.picBook}></BookCard>
            :<BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook}></BookCard>
            }
            
          </Col>
        ))}
        {searchResults.map((result, index) => (
          <Col key={index+11}>
            {(result.picBook === "default_book.png")? 
            <BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={process.env.PUBLIC_URL + "/images/" + result.picBook}></BookCard>
            :<BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook}></BookCard>
            }
            
          </Col>
        ))}
        {searchResults.map((result, index) => (
          <Col key={index+12}>
            {(result.picBook === "default_book.png")? 
            <BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={process.env.PUBLIC_URL + "/images/" + result.picBook}></BookCard>
            :<BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook}></BookCard>
            }
            
          </Col>
        ))}
        {searchResults.map((result, index) => (
          <Col key={index+13}>
            {(result.picBook === "default_book.png")? 
            <BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={process.env.PUBLIC_URL + "/images/" + result.picBook}></BookCard>
            :<BookCard idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook}></BookCard>
            }
            
          </Col>
        ))}*/}
       
   </Row>
   
   </Pagination>
   </div>
   </Container>
   </>
  );
}

export default Catalogue;