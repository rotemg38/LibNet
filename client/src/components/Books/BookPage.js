import React  from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBook } from '../../DBHandle/repoBooks';



function BookInfo() {
  const [book, setBook] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function fetchBook() {
      const data = await getBook(id);
      setBook(data);
      if(data!==null){
        if(data.picBook === "default_book.png"){
          data.picBook = "/images/default_book.png"
        }
      }
    }

    fetchBook();
    
  }, [id]);



  return (
    <div>
      {book ? (
      <>
        <Container className="my-5">
        <Row>
          <Col md={4}>
            <Row>
              <Image src={book.picBook} alt={`${book.bookName} cover`} fluid />
            </Row>
            <Row>
            </Row>
            
          </Col>
          <Col md={8}>
            <h1>{book.bookName}</h1>
            <h5>{book.author}</h5>
            <p>Category: {book.category}</p>
            <p>Publisher: {book.publishing}</p>
            <p>Published Year: {book.publishingYear}</p>
            <p>Number of Pages: {book.numPages}</p>
            <p>Copies: {book.copies}</p>
            <p>Available Copies: {book.copyAvailable}</p>
            <p>Language: {book.language}</p>
            <p>Location: {book.location}</p>
            <p>Series: {book.seriesName}</p>
            <p>Summary: {book.summary}</p>
          </Col>
        </Row>
        </Container>
      </>
    ) : (
      <div className='justify-center'>
        <h1>Sorry, Book Page Not Found :(</h1>
      </div>
    )}
    </div>
    
    
  );
}

export default BookInfo;
