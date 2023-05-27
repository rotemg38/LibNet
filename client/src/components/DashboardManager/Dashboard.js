import React, { useState }  from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AddUser from '../Users/AddUser';
import AddBook from '../Books/AddBook';
import BoardManager from './Board/BoardManager';
import BooksTable from './BooksTable';
import SideBarManager from './SideBarManager'
import UsersActions from './UsersActions';
import UsersTable from './UsersTable';
import BooksActions from './BooksActions';
import Profile from '../Profile/Profile';
import ForumsTable from './ForumsTable';
import AddForum from '../Forum/AddForum';

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
      case 'profile':
        return <Profile setKey={setKey} userId={userId}/>
      case 'booksActions':
        return <BooksActions setKey={setKey} bookId={bookId}/>
      case 'addBook':
        return <AddBook setKey={setKey}/>
      case 'books':
        return <BooksTable setKey={setKey} setBookId={setBookId}/>;
      case 'forums':
        return <ForumsTable setKey={setKey}/>
      case 'addForum':
        return <AddForum setKey={setKey}/>
      default:
        return null;
    }
  };
  return (
    <>
    
      <Row>
        <Col className="bg-light" md="2">
          <SideBarManager setKey={setKey}></SideBarManager>  
        </Col>
        <Col md="10">
          {renderComponent()}
        </Col>
      </Row>

    
    </>

  );
}