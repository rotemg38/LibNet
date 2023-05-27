import React, { useEffect, useState }  from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { CgArrowLeft } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../DBHandle/repoUsers';
import CopiesBookModal from '../Books/CopiesBookModal';
import UsersBorrow from '../Users/UsersBorrowBookModal';
import UsersOrder from '../Users/UsersInviteBookModal';

export default function BooksActions({setKey, bookId}) {
    
    const [showUsersBorrow, setShowUsersBorrow] = useState(false);
    const [showUsersInvite, setShowUsersInvite] = useState(false);
    const [showCopies, setShowCopies] = useState(false);

    const handleShowUsersBorrowModal = () => setShowUsersBorrow(true);
    const handleShowUsersInviteModal = () => setShowUsersInvite(true);
    const handleShowCopiesModal = () => setShowCopies(true);
    
    
    
    return (
        <>
        
        <div>
            <Button variant='link' onClick={()=>{setKey("books")}} style={{border:"1px solid"}}><CgArrowLeft></CgArrowLeft></Button>
        </div>
        <div className="justify-center">
            <h1>Actions For Book ID- {bookId}</h1>
        </div>
        <CopiesBookModal bookId={bookId} show={showCopies} setShow={setShowCopies}></CopiesBookModal>
        <UsersBorrow bookId={bookId} show={showUsersBorrow} setShow={setShowUsersBorrow}></UsersBorrow>
        <UsersOrder bookId={bookId} show={showUsersInvite} setShow={setShowUsersInvite}></UsersOrder>
        <div className="justify-center">
            
                <Row style={{padding: "4rem"}}>
                    <Button variant='secondary' style={{padding: "2rem", border:"1px solid"}} onClick={handleShowUsersBorrowModal}>Watch Borrowes</Button>
                </Row>

                <Row style={{padding: "4rem"}}>
                    <Button variant='secondary' style={{padding: "2rem", border:"1px solid"}} onClick={handleShowUsersInviteModal}>Watch Invitations</Button>
                </Row>

                <Row style={{padding: "4rem"}}>
                    <Button variant='secondary' style={{padding: "2rem", border:"1px solid"}} onClick={handleShowCopiesModal}>Update Book Copies</Button>
                </Row>
        </div>       
        <div className="justify-center">
            <Row style={{padding: "4rem"}}>
                <Button variant='secondary' style={{padding: "2rem", border:"1px solid"}} onClick={()=>{setKey("updateBook")}}>Update Book</Button>
            </Row>
        </div>
        
   
        </>

    );
}