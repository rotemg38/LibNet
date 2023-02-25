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
            <CardGroup>
            
                <BookCard bookName="Book Name" author="Author" srcImg={process.env.PUBLIC_URL + "/images/books/CatchingFire.jpg"}></BookCard>
                <BookCard bookName="Book Name" author="Author" srcImg={process.env.PUBLIC_URL + "/images/books/CatchingFire.jpg"}></BookCard>
                <BookCard bookName="Book Name" author="Author" srcImg={process.env.PUBLIC_URL + "/images/books/CatchingFire.jpg"}></BookCard>
             
            </CardGroup>
            <br/>
        </div>
        </>
        );
    }
    
export default CommonBooks;