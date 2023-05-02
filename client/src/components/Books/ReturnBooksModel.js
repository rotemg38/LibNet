import { MDBBtn } from 'mdb-react-ui-kit';
import React,{ useState, useEffect } from 'react';
import { Alert, Col, ListGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GrCart } from 'react-icons/gr';
import { ImCart } from 'react-icons/im';
import { updateBooks } from '../../DBHandle/repoBooks';
import { getAllBorrowedBooksByFilter, updateReturnBooks } from '../../DBHandle/repoBorrowBooks';
import { updateArriveBook } from '../../DBHandle/repoOrderBooks';
import TableSearchPagin from '../Utils/TableSearchPagin';
import './StyleModals.css'

export default function ReturnBookModal({userId, show, setShow}) {
    const [data, setData] = useState([])
    const [returnedBooks, setReturnedBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState([-1,true])

    const handleClose = () => {setShow(false);setReturnedBooks([])}
    const getCopies = (id)=>{
        for (let index = 0; index < data.length; index++) {
            const book = data[index];
            if(book.idBook === id){
                return book.copyAvailable
            }
        }
        return -1;
    }

    const getDateBorrow = (id)=>{
        for (let index = 0; index < data.length; index++) {
            const book = data[index];
            if(book.idBook === id){
                return book.dateBorrow
            }
        }
        return -1;
    }
    
    const handleReturn = async ()=>{
        
        let returnBooks = []
        let books = []
        returnedBooks.forEach(bookId => {
            returnBooks.push({"idUser": userId, "idBook": bookId, dateBorrow: getDateBorrow(bookId)})
            books.push({"copyAvailable": getCopies(bookId)+1, "idBook": bookId})
        });
        
        try{
            
            await updateBooks(books)
            await updateReturnBooks(returnBooks)
            
            alert("Books returned successfully!");
            handleClose();
        }catch (error) {
            console.log(error);
            alert("Failed to return the books");
        }
        
        try{
            for (let  index = 0;  index < returnBooks.length;  index++) {
                const element = returnBooks[index];
                await updateArriveBook(element.idBook)
            }
        }catch(error){
            console.log("There were no invitations on that book")
        }
       
    }

    const columns = 
    [
        {
            Header: "ID",
            accessor: "idBook",
        },
        {
            Header: "Book Name",
            accessor: "bookName",
        },
        
        {
            Header: "Author",
            accessor: "author",
        },
        {
            Header: "Borrow Date",
            accessor: "dateBorrow"
        },
        {
            Header: "Add/Remove",
            accessor: "action"
        }
    ]
    
    useEffect(() => {
        async function fetchData() {
          try {
            let books = await getAllBorrowedBooksByFilter({idUser: userId, status: "borrowed"})
            let booksData = []
            books.map((book)=>{
                let strId = "btnActionReturn"+book.idBook
                book["action"] = <MDBBtn 
                                    id={strId}
                                    color='link' 
                                    rounded 
                                    size='sm' 
                                    style={{fontSize: "small"}} 
                                    onClick={() => {
                                        setSelectedBook([book.idBook, document.getElementById(strId).checked])
                                    }}>
                                        <GrCart/>
                                </MDBBtn>     
                
                booksData.push(book)
                
            })
            
            setData(booksData);
            
          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
    }, [show]);

    useEffect(()=>{
        let idBook = selectedBook[0]
        if(idBook !== -1){
            const index = returnedBooks.indexOf(idBook);
            if (index !== -1) {
                setReturnedBooks(returnedBooks.filter((id) => id !== idBook));
            } else {
                setReturnedBooks([...returnedBooks, idBook]);
            }
        }
    },[selectedBook]);
  

    return (
        <>
        <Modal id="modalReturnBook" show={show} onHide={handleClose} >
            
            <Modal.Header closeButton>
            <Modal.Title>Return Books For User ID - {userId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    {data.length === 0?
                    <Alert variant='info'>No Books To Return</Alert>
                    :
                    <>
                        <Col md="2">
                            <h3><ImCart></ImCart>&nbsp;Books</h3>
                            
                            <hr className="mt-0" />
                            <ListGroup>
                                {returnedBooks.map((item, index)=>{
                                    return <ListGroup.Item key={index}>{item} - {data.map((book)=>{if(book["idBook"] === item){return book["bookName"]}})}</ListGroup.Item>
                                })}
                            </ListGroup>
                            
                        </Col>
                        <Col md="10">
                            <TableSearchPagin dataTable={data} columns={columns} sizePage={2} infoMsg={"Loading Books..."} renderBtn={()=>{}}></TableSearchPagin>
                        </Col>
                    </>
                    }
                </Row>
            </Modal.Body>
            <Modal.Footer>
            {data.length === 0?<></>:
            <>
            <Button variant="secondary" style={{border:"1px solid"}} onClick={handleClose}>
                Cancle
            </Button>
            <Button variant="primary" onClick={handleReturn}>
                Return
            </Button>
            </>}
            </Modal.Footer>
            
        </Modal>
        </>
    );
}