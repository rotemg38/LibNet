import React, { useState }  from 'react';
import { Button, Row } from 'react-bootstrap';
import { CgArrowLeft } from 'react-icons/cg';
import { getUser } from '../../DBHandle/repoUsers';
import BorrowBookModal from '../Books/BorrowBookModal';
import InviteBookModal from '../Books/InviteBookModal';
import LimitBookModal from '../Books/LimitBooksModal';
import ReturnBookModal from '../Books/ReturnBooksModel';

export default function UsersActions({setKey, userId}) {
    
    const [showBorrow, setShowBorrow] = useState(false);
    const [showInvite, setShowInvite] = useState(false);
    const [showLimit, setShowLimit] = useState(false);
    const [showReturn, setShowReturn] = useState(false);

    const handleShowBorrowModal = () => setShowBorrow(true);
    const handleShowInviteModal = () => setShowInvite(true);
    const handleShowLimitModal = () => setShowLimit(true);
    const handleShowReturnModal = () => setShowReturn(true);
    
    return (
        <>
        
        <div>
            <Button variant='link' onClick={()=>{setKey("users")}} style={{border:"1px solid"}}><CgArrowLeft></CgArrowLeft></Button>
        </div>
        <div className="justify-center">
            <h1>Actions For User ID- {userId}</h1>
        </div>
        <BorrowBookModal userId={userId} show={showBorrow} setShow={setShowBorrow}></BorrowBookModal>
        <InviteBookModal userId={userId} show={showInvite} setShow={setShowInvite}></InviteBookModal>
        <LimitBookModal userId={userId} show={showLimit} setShow={setShowLimit}></LimitBookModal>
        <ReturnBookModal userId={userId} show={showReturn} setShow={setShowReturn}></ReturnBookModal>
        <div className="justify-center">
            
                <Row style={{padding: "4rem"}}>
                    <Button variant='secondary' style={{padding: "2rem", border:"1px solid"}} onClick={handleShowBorrowModal}>Borrow Book</Button>
                </Row>

                <Row style={{padding: "4rem"}}>
                    <Button variant='secondary' style={{padding: "2rem", border:"1px solid"}} onClick={handleShowInviteModal}>Invite Book</Button>
                </Row>

                <Row style={{padding: "4rem"}}>
                    <Button variant='secondary' style={{padding: "2rem", border:"1px solid"}} onClick={handleShowReturnModal}>Return Book</Button>
                </Row>

                <Row style={{padding: "4rem"}}>
                    <Button variant='secondary' style={{padding: "2rem", border:"1px solid"}} onClick={handleShowLimitModal}>Update Limit Books</Button>
                </Row>
            
        </div>
   
        </>

    );
}