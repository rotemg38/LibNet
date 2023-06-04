import React, { useState }  from 'react';
import SideBarInbox from './SideBarInbox';
import { Col, Row } from 'react-bootstrap';
import Request from './Request';

export default function Inbox() {
    const [key, setKey] = useState("")
  
   
    return (
      <>
      
        <Row>
          <Col className="vh-100" md="4">
            <SideBarInbox keyState={key} setKey={setKey}></SideBarInbox>  
          </Col>
          <Col md="8">
            {key !== ""?
            <Request idReq={key}></Request>
            :<></>}
          </Col>
        </Row>
        
      
      </>
  
    );
  }