import React, { useState }  from 'react';
import { Col, Row } from 'react-bootstrap';
import AddUser from '../Users/AddUser';
import AddBook from '../Books/AddBook';
import BoardManager from './BoardManager';
import BooksTable from './BooksTable';
import SideBarManager from './SideBarManager'
import UsersActions from './UsersActions';
import UsersTable from './UsersTable';
import BooksActions from './BooksActions';

export default function DashboardManager() {
  const [key, setKey] = useState("board")
  const [userId, setUserId] = useState()
  const [bookId, setBookId] = useState()

  // Define a function to render the appropriate component based on the key state
  const renderComponent = () => {
    switch (key) {
      case 'board':
        return <BoardManager />;
      case 'users':
        return <UsersTable setKey={setKey} setUserId={setUserId} />;
      case 'usersActions':
        return <UsersActions setKey={setKey} userId={userId} />;
      case 'addUser':
        return <AddUser setKey={setKey}/>
      case 'booksActions':
        return <BooksActions setKey={setKey} bookId={bookId}/>
      case 'addBook':
        return <AddBook setKey={setKey}/>
      case 'books':
        return <BooksTable setKey={setKey} setBookId={setBookId}/>;
      default:
        return null;
    }
  };
  return (
    <>
    
      <Row>
        <Col className="vh-100" md="2">
          <SideBarManager setKey={setKey}></SideBarManager>  
        </Col>
        <Col md="10">
          {renderComponent()}
        </Col>
      </Row>
      
    
    </>

  );
}