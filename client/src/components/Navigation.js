import React, { useEffect, useState }  from 'react';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {CgChart, CgLogOut, CgMail, CgProfile} from 'react-icons/cg'
import {BiBookHeart} from 'react-icons/bi'
import {ImBooks} from 'react-icons/im'
import { connectedIsAdmin, connectedUserName } from '../DBHandle/repoUtils';

function Navb({connected}) {
    
    
    return (
        <>
        <Navbar className='bg-nav' fixed="top" sticky="top" collapseOnSelect expand="lg" variant="dark">
        <Container>
            <Navbar.Brand href="/#home"><ImBooks/>LibNet</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/catalogue">Catalogue</Nav.Link>
                <Nav.Link href="/#contact">Contact</Nav.Link>
                {connected?<Nav.Link href="/forum">Forums</Nav.Link>:<></>}
            </Nav>
            <Nav>
            {connected? 
                <>
                
                <NavDropdown title={'Hello, '+ connectedUserName} >
                    <NavDropdown.Item href="/profile">
                        <CgProfile size={20}/>&nbsp;
                        Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/recommended">
                        <BiBookHeart size={20}/>&nbsp;
                        Recommended
                    </NavDropdown.Item>
                    {connectedIsAdmin === 'true'?
                    <>
                        <NavDropdown.Item href="/dashboardManager">
                            <CgChart size={20}/>&nbsp;
                            Dashboard
                        </NavDropdown.Item>  
                         <NavDropdown.Item href="/inbox">
                            <CgMail size={20}/>&nbsp;
                            Inbox
                        </NavDropdown.Item>  
                    </>
                    :<></>}
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={()=>{
                        sessionStorage.clear()
                    }}>
                        <CgLogOut size={20}/>&nbsp;
                        LogOut
                    </NavDropdown.Item>
                </NavDropdown>
                </>
            : 
                <Nav.Link href="/login">
                    <CgProfile size={20}/>&nbsp;
                    Log In
                </Nav.Link>
                }
               
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        </>
    );
  }
  
  export default Navb;
  
