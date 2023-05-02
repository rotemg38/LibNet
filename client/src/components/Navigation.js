import React, { useEffect, useState }  from 'react';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {CgChart, CgLogOut, CgMail, CgProfile} from 'react-icons/cg'
import {ImBooks} from 'react-icons/im'

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
                
                <NavDropdown title={'Hello, '+ localStorage.getItem("userName")} >
                    <NavDropdown.Item href="/profile">
                        <CgProfile size={20}/>&nbsp;
                        Profile
                    </NavDropdown.Item>
                    {localStorage.getItem("isAdmin") === 'true'?
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
                        localStorage.clear()
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
        {/*
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
            <div className="container px-5">
                <a className="navbar-brand" href="#page-top">LibNet</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" href="#!">Sign Up</a></li>
                        <li className="nav-item"><a className="nav-link" href="#!">Log In</a></li>
                    </ul>
                </div>
            </div>
        </nav> */}
        </>
    );
  }
  
  export default Navb;
  
