import React  from 'react';
import { Container, Row, Col, Image} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBook } from '../../DBHandle/repoBooks';
import { Rating } from '@mui/material';
import { ImPlus, ImStarEmpty } from 'react-icons/im';
import RateBookModal from './RateBookModal';
import { getAvgRateByBook } from '../../DBHandle/repoRatings';
import { connectedUserId } from '../../DBHandle/repoUsers';


function BookInfo() {
  const [book, setBook] = useState(null);
  const [showAddRate, setShowAddRate] = useState(false);
  const [avgRate, setAvgRate] = useState(0)

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

  useEffect(() => {
    
    async function fetchAvgRate(){
      const rateAvg = await getAvgRateByBook(id);
      
      if(rateAvg != null){
        setAvgRate(rateAvg.avgRating)
      }
    }
    fetchAvgRate()
    
  }, [id, showAddRate]);

  return (
    <div>
      {book ? (
      <>
      <RateBookModal bookId={book.idBook} show={showAddRate} setShow={setShowAddRate}></RateBookModal>
        <Container className="my-5">
        <Row>
          <Col md={4}>
            <Row>
              <Image src={book.picBook} alt={`${book.bookName} cover`} fluid />
            </Row>
            <Row style={{margin: "auto 100px", padding:"10px"}}>
              <Col md="10">
                <Rating name="read-only" value={avgRate} precision={0.5} size="large" readOnly />
              </Col>
              <Col md="2">
                {connectedUserId!=null?
                <a href='#' onClick={()=>{setShowAddRate(true)}}>
                <ImStarEmpty color='gray' size={23}/>
                <ImPlus
                  color='gray'
                  size={12}
                  style={{
                    position: 'absolute',
                    transform: 'translate(100%, -80%)', // center the icon
                  }}
                /> 
                </a>:<></>}
              </Col>
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
