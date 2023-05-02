import { MDBBtn } from 'mdb-react-ui-kit';
import React,{ useState, useEffect } from 'react';
import { Alert, Col, ListGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GrCart } from 'react-icons/gr';
import { ImCart } from 'react-icons/im';
import { getAllBooks, updateBooks } from '../../DBHandle/repoBooks';
import { addBorrowBook, getAllBorrowedBooksByFilter } from '../../DBHandle/repoBorrowBooks';
import { getUser } from '../../DBHandle/repoUsers';
import { updateOrderBook } from '../../DBHandle/repoOrderBooks';
import TableSearchPagin from '../Utils/TableSearchPagin';
import './StyleModals.css'

export default function BorrowBookModal({userId,show, setShow}) {
    const [data, setData] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState([-1,true])
    const [booksNum, setBooksNum] = useState(0)
    const [limit, setLimit] = useState(2)

    const handleClose = () => {setShow(false);setBorrowedBooks([])}
    const getCopies = (id)=>{
        for (let index = 0; index < data.length; index++) {
            const book = data[index];
            if(book.idBook === id){
                return book.copyAvailable
            }
        }
        return -1;
    }
    const handleBorrow = async ()=>{
        let borowBooks = []
        let books = []
        borrowedBooks.forEach(bookId => {
            borowBooks.push({"idUser": userId, "idBook": bookId})
            books.push({"copyAvailable": getCopies(bookId)-1, "idBook": bookId})
        });
        
        try{
            await updateBooks(books)
            await addBorrowBook(borowBooks)
            for (let index = 0; index < borowBooks.length; index++) {
                const element = borowBooks[index];
                await updateOrderBook(element.idBook,element.idUser,{"filter":{"status": "waiting"},"status":"received"})    
            }
            
            alert("Book borrowed successfully!");
            handleClose();
        }catch (error) {
            console.log(error);
            alert("Failed to borrow the books");
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
            Header: "Category",
            accessor: "category",
        },
        {
            Header: "Author",
            accessor: "author",
        },
        {
            Header: "Copies",
            accessor: "copies"
        },
        {
            Header: "Available Copies",
            accessor: "copyAvailable"
        },
        {
            Header: "Library Location",
            accessor: "location"
        },
        {
            Header: "Add/Remove",
            accessor: "action"
        }
    ]
    
    useEffect(() => {
        async function fetchData() {
          try {
            let books = await getAllBooks()
            let booksData = []
            books.map((book)=>{
                if(book.copyAvailable > 0){
                
                    let strId = "btnActionBorrow"+book.idBook
                    let b = {"action": 
                                    <MDBBtn 
                                    id={strId}
                                    color='link' 
                                    rounded 
                                    size='sm' 
                                    style={{fontSize: "small"}} 
                                    onClick={() => {
                                        setSelectedBook([book.idBook, document.getElementById(strId).checked])
                                    }}
                                    >
                                        <GrCart/>
                                    </MDBBtn>             
                    }
                    
                    b["idBook"] = book.idBook
                    b["bookName"] = book.bookName
                    b["category"] = book.category
                    b["author"] = book.author
                    b["copies"] = book.copies
                    b["copyAvailable"] = book.copyAvailable
                    b["location"] = book.location

                    booksData.push(b)
                }
            })
            setData(booksData);
          } catch (error) {
            console.log(error);
          }
        }
        async function fetchBorrowed(){
            const user = await getUser(userId)
            setLimit(user.limitBooks)
            let res = await getAllBorrowedBooksByFilter({idUser: userId, status: "borrowed"})
            setBooksNum(res.length)
        }
        fetchData();
        fetchBorrowed();
    }, [show]);


    useEffect(()=>{
        let idBook = selectedBook[0]
        if(idBook !== -1){
            const index = borrowedBooks.indexOf(idBook);
            if (index !== -1) {
                setBorrowedBooks(borrowedBooks.filter((id) => id !== idBook));
                setBooksNum(booksNum-1)
            } else {
                setBorrowedBooks([...borrowedBooks, idBook]);
                setBooksNum(booksNum+1)
            }
        }
    },[selectedBook]);
  

    return (
        <>
       
        
        <Modal id="modalBorrowBook" show={show} onHide={handleClose} >
            {(booksNum > limit)?
                <Alert variant="warning" className='text-center'>Notice User Passed Borrow Limitation</Alert>
            :<></>}
            <Modal.Header closeButton>
            <Modal.Title>Borrow Books For User ID - {userId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md="2">
                        <h3><ImCart></ImCart>&nbsp;Books</h3>
                        
                        <hr className="mt-0" />
                        <ListGroup>
                            {borrowedBooks.map((item, index)=>{
                                return <ListGroup.Item key={index}>{item} - {data.map((book)=>{if(book["idBook"] === item){return book["bookName"]}})}</ListGroup.Item>
                            })}
                        </ListGroup>
                        
                    </Col>
                    <Col md="10">
                        <TableSearchPagin dataTable={data} columns={columns} sizePage={2} infoMsg={"Loading Books..."} renderBtn={()=>{}}></TableSearchPagin>
                    </Col>
                </Row>
                
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" style={{border:"1px solid"}} onClick={handleClose}>
                Cancle
            </Button>
            <Button variant="primary" onClick={handleBorrow}>
                Borrow
            </Button>
            </Modal.Footer>
            
        </Modal>
        </>
    );
}