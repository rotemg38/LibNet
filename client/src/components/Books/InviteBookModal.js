import { MDBBtn } from 'mdb-react-ui-kit';
import React,{ useState, useEffect } from 'react';
import { Alert, Col, ListGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GrCart } from 'react-icons/gr';
import { ImCart } from 'react-icons/im';
import { getAllBooks } from '../../DBHandle/repoBooks';
import { addOrderBook, getAllOrderBooksByFilter } from '../../DBHandle/repoOrderBooks';
import TableSearchPagin from '../Utils/TableSearchPagin';
import './StyleModals.css'

export default function InviteBookModal({userId,show, setShow}) {
    const [data, setData] = useState([]);
    const [invitedBooks, setInvitedBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState([-1,true])
    const [booksNum, setBooksNum] = useState(0)

    const handleClose = () => {setShow(false);setInvitedBooks([])}
    
    const handleBorrow = async ()=>{
        let orderBooks = []
        
        invitedBooks.forEach(bookId => {
            orderBooks.push({"idUser": userId, "idBook": bookId})
        });
        
        try{
            await addOrderBook(orderBooks)
            alert("Books ordered successfully!");
            handleClose();
        }catch (error) {
            console.log(error);
            alert("Failed to order the books");
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
            let allreadyOrderedBooks = await getAllOrderBooksByFilter({idUser: userId, status: "waiting"})
            setBooksNum(allreadyOrderedBooks.length)
            let books = await getAllBooks()
            let booksData = []
            books.map((book)=>{
                if(allreadyOrderedBooks.find(elm=> elm.idBook === book.idBook) === undefined){
                    let strId = "btnActionInvite"+book.idBook
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

        

        fetchData();
    }, [show]);

    useEffect(()=>{
        let idBook = selectedBook[0]
        if(idBook !== -1){
            const index = invitedBooks.indexOf(idBook);
            if (index !== -1) {
                setInvitedBooks(invitedBooks.filter((id) => id !== idBook));
                setBooksNum(booksNum-1)
            } else {
                setInvitedBooks([...invitedBooks, idBook]);
                setBooksNum(booksNum+1)
            }
        }
    },[selectedBook]);
  

    return (
        <>
        <Modal id="modalInviteBook" show={show} onHide={handleClose} >
            {(booksNum > 2)?
            <Alert variant="warning" className='text-center'>Notice User Passed Order Limitation</Alert>
            :<></>}
            <Modal.Header closeButton>
            <Modal.Title>Invite Books For User ID - {userId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md="2">
                        <h3><ImCart></ImCart>&nbsp;Books</h3>
                        
                        <hr className="mt-0" />
                        <ListGroup>
                            {invitedBooks.map((item, index)=>{
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
                Invite
            </Button>
            </Modal.Footer>
            
        </Modal>
        </>
    );
}