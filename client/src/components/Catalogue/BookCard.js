import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { ImPlus } from 'react-icons/im';
import { Badge, Col, Row } from 'react-bootstrap';
import { addOrderBook, getAllOrderBooksByFilter } from '../../DBHandle/repoOrderBooks';
import { connectedUserId } from '../../DBHandle/repoUtils';
import Swal from 'sweetalert2'

function BookCard({ copyAvailable, idBook, bookName, author, srcImg, showInvite, numInvite, setNumInvite }) {
  const [invite, setInvite] = useState(true)

  useEffect(() => {
    async function fetchData() {

      let res = await getAllOrderBooksByFilter({ idUser: connectedUserId, status: "waiting" })

      setNumInvite(res.length)

      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        if (element.idBook === idBook) {
          setInvite(false)
          break;
        }
      }
    }
    if (showInvite && connectedUserId !== null)
      fetchData()

  }, [])

  return (

    <Card style={{ width: '18rem', alignSelf: 'center', height:'100%' }}>
      <Card.Img variant="top" src={srcImg} style={{ alignSelf: 'center', height: "25rem" }} />
      {copyAvailable > 0 ?
        <Badge bg='success' className='float-start'>Available</Badge>
        : copyAvailable === 0 ?
          <Badge bg='danger'>Not Available</Badge> : <></>}

      <Card.Body style={{ alignSelf: 'center' }}>
        <Card.Title> {bookName}</Card.Title>
        <Card.Subtitle> {author}</Card.Subtitle>
      </Card.Body>

      <Card.Footer >
        <Row>
          <Col md="2">

          </Col>
          <Col md="8" className='justify-center'>
            <Link to={`/book/${idBook}`}>
              <Button variant="primary">Details</Button>
            </Link>
          </Col>
          <Col md="2">
            {(invite && showInvite && connectedUserId !== null) ?
              <a href='#' title='invite book' onClick={async () => {
                try {

                  if (numInvite < 2) {
                    await addOrderBook([{ "idUser": connectedUserId, "idBook": idBook }])
                    setInvite(false)
                    let updatedNum = numInvite + 1
                    setNumInvite(updatedNum)

                    //alert("Book ordered successfully!");
                    Swal.fire(
                      'Success!',
                      'Books ordered successfully',
                      'success'
                    )
                  } else {
                    //alert("Sorry, you cant order more than 2 books");
                    Swal.fire(
                      'Error!',
                      "Sorry, you cant order more than 2 books",
                      'error'
                    )
                  }

                } catch (error) {
                  console.log(error);
                  //alert("Failed to order the book");
                  Swal.fire(
                    'Error!',
                    "Failed to order the book",
                    'error'
                  )
                }

              }}><ImPlus></ImPlus></a> : <></>}

          </Col>
        </Row>

      </Card.Footer>

    </Card>
  );
}

export default BookCard;