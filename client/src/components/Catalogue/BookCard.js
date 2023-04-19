import React, { useEffect, useState }  from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { ImPlus } from 'react-icons/im';
import { Col, Row } from 'react-bootstrap';
import { addOrderBook, getAllOrderBooksByFilter } from '../../DBHandle/repoOrderBooks';

function BookCard({idBook,bookName, author, srcImg, showInvite,numInvite, setNumInvite}) {
  const [invite, setInvite] = useState(true)
  
  useEffect(()=>{
    async function fetchData(){
      
      let res = await getAllOrderBooksByFilter({idUser: localStorage.getItem("userId"), status: "waiting"})
      
      setNumInvite(res.length)
      
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        if(element.idBook === idBook){
          setInvite(false)
          break;
        }
      }
    }
    if(showInvite)
      fetchData()
    
  },[])

  return (
    <Card style={{width:'18rem', alignSelf:'center'}}>
      <Card.Img variant="top"  src={srcImg} style={{ alignSelf:'center'}}/>
      <Card.Body style={{ alignSelf:'center'}}>
        <Card.Title> {bookName}</Card.Title>
        <Card.Subtitle> {author}</Card.Subtitle>
      </Card.Body>
     <Card.Footer >
      <Row>
        <Col md="10" className='justify-center'>
          <Link to={`/book/${idBook}`}>
            <Button variant="primary">Details</Button>
          </Link>
        </Col>
        <Col md="2">
          {(invite && showInvite)?  
          <a href='#' title='invite book' onClick={async ()=>{            
            try{
                
                if(numInvite < 2){
                  await addOrderBook([{"idUser": localStorage.getItem("userId"), "idBook": idBook}])
                  setInvite(false)
                  let updatedNum = numInvite+1
                  setNumInvite(updatedNum)
                  
                  alert("Book ordered successfully!");
                }else{
                  alert("Sorry, you cant order more than 2 books");
                }
                
            }catch (error) {
                console.log(error);
                alert("Failed to order the book");
            }
            
          }}><ImPlus></ImPlus></a>:<></>}
         
        </Col>
      </Row>
        
     </Card.Footer>
    
    </Card>
  );
}

export default BookCard;