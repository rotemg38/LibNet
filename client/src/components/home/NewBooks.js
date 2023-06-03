import React, { useEffect, useState } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { getTop4NewBooks } from '../../DBHandle/repoBooks';
import BookCard from '../Catalogue/BookCard';

function NewBooks() {
    const [show, setShow] = useState(false)
    const [newBooks, setNewBooks] = useState([])

    useEffect(() => {
        async function fetchData() {
            const books = await getTop4NewBooks()

            if (books !== null && books.length !== 0) {
                setNewBooks(books)
            } else {
                setShow(true)
            }
        }

        fetchData()
    }, [])
    return (
        <>
            <br />
            <br />
            <br />
            <div className="text-center bg-light">
                <br />
                <h1 className="section-heading text-uppercase">New In The Library</h1>
                <br />

                <div className='justify-center'>
                    <Alert variant='info' show={show}>Sorry, There are no new books for now</Alert>
                    <Row>
                        {newBooks.map((result, index) =>
                            <Col key={index}>
                                {(result.picBook === "default_book.png") ?
                                    <BookCard copyAvailable={-1} index={index} idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={"/images/" + result.picBook} showInvite={false} numInvite={null} setNumInvite={null} />
                                    : <BookCard copyAvailable={-1} index={index} idBook={result.idBook} bookName={result.bookName} author={result.author} srcImg={result.picBook} showInvite={false} numInvite={null} setNumInvite={null} />
                                }
                            </Col>
                        )}

                    </Row>
                </div>
                <br />
            </div>
        </>
    );
}

export default NewBooks;