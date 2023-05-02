import { MDBIcon } from 'mdb-react-ui-kit';
import React  from 'react';
import Nav from 'react-bootstrap/Nav';
import { CgChart } from 'react-icons/cg';
import { GrChat } from 'react-icons/gr';
import { ImBook, ImProfile } from 'react-icons/im';

export default function SideBarManager({setKey}) {
  return (
    <>
        <Nav defaultActiveKey={"board"} variant="pills" className="bg-light sidebar flex-column vh-100" onSelect={(selectedKey) => setKey(selectedKey)}>
            <Nav.Item>
                <Nav.Link eventKey="board">
                    <CgChart size={20}></CgChart>&nbsp;
                    Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="users">
                    <ImProfile size={20}></ImProfile>&nbsp;
                    Users</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="books">
                    <ImBook size={20}></ImBook>&nbsp;
                    Books</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="forums">
                    <GrChat size={20}></GrChat>&nbsp;
                    Forums</Nav.Link>
            </Nav.Item>
        </Nav>
    
    </>
    );
}

