import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Search from './Search';
import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { Button, Container } from 'react-bootstrap';
import { MDBSpinner } from 'mdb-react-ui-kit';

// Define the number of items per page
const ITEMS_PER_PAGE = 12;

function Catalogue() {
  const [showSpinner, setShowSpinner] = useState(false)
   
  const [searchResults, setSearchResults] = useState(null);
  const [numInvite, setNumInvite] = useState(0)
  
  // States for the current search results per page
  const [currentResults, setCurrentResults] = useState([]);
  const [currentResultsNum, setCurrentResultsNum] = useState(ITEMS_PER_PAGE);
 

  useEffect(()=>{
    if(searchResults!==null){
      let endIndex = searchResults.length > currentResultsNum? currentResultsNum: searchResults.length
      const results = searchResults.slice(0, endIndex);
      setCurrentResults(results)
    }
    
  },[searchResults, currentResultsNum])

 
  const showMoreHandle = ()=>{
    if(searchResults!==null){
      if(searchResults.length > currentResultsNum)
      {
        setCurrentResultsNum(currentResultsNum+ITEMS_PER_PAGE)
      }
    }
  }
  return (
   <>
   <div className='justify-center'>
      <h1 className='text-uppercase' style={{padding: "2rem"}}>Books Catalogue</h1>
   </div>
   <Search updateResults={setSearchResults} setShowSpinner={setShowSpinner}></Search>
   <div className='justify-center'>
      <hr className="rounded" style={{width: "80%", alignSelf:"center"}}></hr>
   </div>
   <br/>
    {showSpinner?
    <Container>
      <div className='justify-center'>
          
        <MDBSpinner className='m-5' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      </div>
    </Container>
    :<></>}


    {searchResults!== null?
    <>
   <Container>   
   <div className='justify-center'>
      
    <Row md={8} className="g-4">
      {currentResults.map((result, index)=> 
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

   
    {searchResults.length > currentResultsNum?
    
      <Container>
      <div className='justify-center' style={{padding:"3rem"}}>
        <Row>
          <Col>
            <Button onClick={showMoreHandle}>Show More</Button>
          </Col>
        </Row>
        
      </div>
      </Container>
    :<></>}
{!showSpinner?
  <Container>
    <div className='justify-center' style={{padding:"3rem"}}>
      <Row>
        <Col>
          Found {searchResults.length} Results
        </Col>
      </Row>
    </div>
  </Container>
  :<></>}
      
    </>
    :<></>}
   </>
  );
}

export default Catalogue;