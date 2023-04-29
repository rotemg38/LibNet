import React, { useState,useEffect }  from 'react';
import { Row } from 'react-bootstrap';
import { MDBCard, MDBRow, MDBCol, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit';
import { getRequestByFilter, updateRequest } from '../../DBHandle/repoRequests';

export default function Request({idReq}) {  
    const [req, setReq] = useState({from:"", mail:"", subject:"", createdAt:""})

    useEffect(()=>{
        async function fetchData(){
            try{
                let request = await getRequestByFilter({"idReq": idReq})
                setReq(request)
                if(!request.seen)
                    await updateRequest(idReq, {seen:true})
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
    },[idReq])

    return (
      <>
      
        <Row>
        <MDBCard className="mb-3" style={{ borderRadius: '.5rem', margin:"1rem" }}>
            <MDBRow className="g-0">
                <MDBCol >
                <MDBCardBody className="p-4">
                    <MDBTypography tag="h3">{req.from} - {req.mail}</MDBTypography>
                    <MDBTypography className='text-muted' tag="h4">{req.subject}</MDBTypography>
                    <p>
                    {(new Date(req.createdAt)).toLocaleDateString()} , {(new Date(req.createdAt)).toLocaleTimeString()}
                    </p>
                    <hr className="mt-0" />
                    
                    <MDBRow className="pt-1">
                        {req.content}
                    </MDBRow>

                </MDBCardBody>
                </MDBCol>
            </MDBRow>
        </MDBCard>
        </Row>
        
      
      </>
  
    );
  }