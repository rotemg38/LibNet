import React, { useEffect } from "react";
import {MDBCard, MDBCardHeader, MDBIcon, MDBCardBody} from 'mdb-react-ui-kit'


export default function MsgCard({userName, time, content}){
  
    return(
        <>
        <MDBCard style={{border:"1px solid rgba(0,0,0,.125)", minWidth: "50rem"}}>
            <MDBCardHeader className="d-flex justify-content-between">
                <p className="fw-bold mb-0">{userName}</p>
                <p className="text-muted small mb-0">
                <MDBIcon far icon="clock" /> {time}
                </p>
            </MDBCardHeader>
            <MDBCardBody>
                <p className="mb-0">
               {content}
                </p>
            </MDBCardBody>
        </MDBCard>
        </>

    );
}