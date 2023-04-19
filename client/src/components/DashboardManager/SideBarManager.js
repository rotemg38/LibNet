import React  from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

export default function SideBarManager({setKey}) {
  return (
    <>
         <Nav defaultActiveKey={"board"} variant="pills" className="bg-light sidebar flex-column vh-100" onSelect={(selectedKey) => setKey(selectedKey)}>
            <Nav.Item>
                <Nav.Link eventKey="board">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="users">Users</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="books">Books</Nav.Link>
            </Nav.Item>
        </Nav>
    
    </>
    );
}






