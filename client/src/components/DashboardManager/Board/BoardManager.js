import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBTypography} from 'mdb-react-ui-kit';
import LateUsersTable from './LateUsersTable';
import AgePie from './AgePie';
import TopBorrowedBooks from './TopBorrowed';
import TopRatedBooks from './TopRated';
import ForumMsgsTransfer from './ForumMsgsTrasfer';

export default function BoardManager() {
   
  return (
    
  
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center h-100">
       
          <MDBCol lg="6" className="mb-4 mb-lg-0"> 
          <MDBRow className="g-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
              
                <MDBCol>
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h3">Users Late To Return</MDBTypography>
                    <hr className="mt-0" />
                    <MDBRow className="pt-1">
                      <LateUsersTable></LateUsersTable>
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
                    <MDBTypography tag="h3">Most Borrowed Books</MDBTypography>
                    <hr className="mt-0" />
                    
                    <MDBRow className="pt-1">
                      <TopBorrowedBooks></TopBorrowedBooks>
                        
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
                    <MDBTypography tag="h3">Forum Activity</MDBTypography>
                    <hr className="mt-0" />
                    
                    <MDBRow className="pt-1">
                      <ForumMsgsTransfer></ForumMsgsTransfer>
                        
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
                    <MDBTypography tag="h3">Users Ages</MDBTypography>
                    <hr className="mt-0" />
                    
                    <MDBRow className="pt-1">
                        <AgePie></AgePie>
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
                    <MDBTypography tag="h3">Top Rated Books</MDBTypography>
                    <hr className="mt-0" />
                    
                    <MDBRow className="pt-1">
                        <TopRatedBooks></TopRatedBooks>
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

