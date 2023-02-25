
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function BookCard({bookName, author, srcImg}) {
  return (
    <Card style={{ width: '10rem'}}>
      <Card.Img variant="top" src={srcImg} style={{width:'40%' , alignSelf:'center'}}/>
      <Card.Body>
        <Card.Title> {bookName}</Card.Title>
        <Card.Subtitle> {author}</Card.Subtitle>
      </Card.Body>
     
      <Card.Body>
      <Button variant="primary">Details</Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;