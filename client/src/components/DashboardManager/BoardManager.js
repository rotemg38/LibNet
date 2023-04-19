import React, { useState, useEffect } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBCardLink } from 'mdb-react-ui-kit';


export default function BoardManager() {
   
    
    useEffect(() => {
       
        
      }, []);

  return (
    
  
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center h-100">
       
          <MDBCol lg="6" className="mb-4 mb-lg-0"> 
          <MDBRow className="g-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
              
                <MDBCol>
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Personal Information</MDBTypography>
                    <hr className="mt-0" />
                   
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Address</MDBTypography>
                        <MDBCardText className="text-muted">user.address</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Age</MDBTypography>
                        <MDBCardText className="text-muted">user.age</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Password</MDBTypography>
                        <MDBCardText className="text-muted">********</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Subscription Information</MDBTypography>
                    <hr className="mt-0" />

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Limit Borrow Books</MDBTypography>
                        <MDBCardText className="text-muted">2</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Borrowed Books History</MDBTypography>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard> 
            </MDBRow>
            
            <MDBRow className="g-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
             
                <MDBCol >
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Borrowed Books History</MDBTypography>
                    <hr className="mt-0" />
                    
                    <MDBRow className="pt-1">
                        {/**todo */}
                    </MDBRow>

                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
            </MDBRow>
           
         
          </MDBCol>
         
         
          <MDBCol lg="6" className="mb-4 mb-lg-0">
         
          <MDBRow className="g-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
             
                <MDBCol >
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Borrowed Books</MDBTypography>
                    <hr className="mt-0" />
                    
                    <MDBRow className="pt-1">
                        {/**todo */}
                    </MDBRow>

                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBRow>
          <MDBRow className="g-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
             
                <MDBCol >
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Invited Books</MDBTypography>
                    <hr className="mt-0" />
                    
                    <MDBRow className="pt-1">
                        {/**todo */}
                    </MDBRow>

                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    
  );
}

