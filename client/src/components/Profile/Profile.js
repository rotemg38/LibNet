import React, { useState, useEffect } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './profileStyle.css'
import { Button } from 'react-bootstrap';
import BorrowedBooks from './BorrowedBooks';
import InvitedBooks from './InvitedBooks';
import UpdateUserModal from './UpdateUserModal';
import { getUser } from '../../DBHandle/repoUsers';
import {GrEdit} from 'react-icons/gr'
import UpdatePassModal from './UpdatePassModal';
import HistoryBooks from './HistoryBooks';
import { CgArrowLeft } from 'react-icons/cg';

export default function Profile({setKey, userId}) {
    const [showBtn, setShowBtn] = useState("show")
    const [show, setShow] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleShow = () => setShow(true);
    const handleShowPass = () => setShowPass(true);

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        picUser: "",
        age: "",
        address: "",
        mail: ""
    });
    
    useEffect(() => {
        async function fetchUser() {
          const data = await getUser(userId);
          setUser(data);
          if(data!==null){
            if(data.picUser === "default_user.jpg"){
              data.picUser = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
            }
          }
        }
    
        fetchUser();
        
      }, []);

  return (
    
      <>{/*<section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>*/}
      {setKey !== undefined?
        <div>
          <Button variant='link' onClick={()=>{setKey("usersActions")}} style={{border:"1px solid"}}><CgArrowLeft></CgArrowLeft></Button>
        </div>
      :<></>}
        
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center h-100">
        
            <MDBCol lg="6" className="mb-4 mb-lg-0"> 
            <MDBRow className="g-0">
              <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                <MDBRow className="g-0">
                  <MDBCol md="4" className="gradient-custom text-center text-white"
                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    <MDBCardImage src={user.picUser}
                      alt="Avatar" className="my-5" style={{ width: '80px',borderRadius: "50%" }} fluid />
                    <MDBTypography tag="h5"><b>{user.firstName + " " + user.lastName}</b></MDBTypography>
                    <MDBCardText>{user.mail}</MDBCardText>
                    {setKey === undefined?
                    <>
                      <a href='#' style={{color:'white'}} onClick={handleShow}><MDBIcon far icon="edit mb-5" /></a>
                      <UpdateUserModal userId={userId} userInfo={user} setUserInfo={setUser} show={show} setShow={setShow}></UpdateUserModal>
                    </>
                    :<></>}
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Personal Information</MDBTypography>
                      <hr className="mt-0" />
                    
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Address</MDBTypography>
                          <MDBCardText className="text-muted">{user.address}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Age</MDBTypography>
                          <MDBCardText className="text-muted">{user.age}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="pt-1">
                        <MDBCol size="4" className="mb-3">
                          <MDBTypography tag="h6">Password</MDBTypography>
                          <MDBCardText className="text-muted">********</MDBCardText>
                        </MDBCol>
                        <MDBCol size="2" className="mb-3">
                        {setKey === undefined?
                        <> 
                          <a href='#'  onClick={handleShowPass}><GrEdit></GrEdit></a>
                          <UpdatePassModal userId={userId} show={showPass} setShow={setShowPass}></UpdatePassModal>
                        </>
                        :<></>}
                         
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
                          <Button size='sm' onClick={()=>{if(showBtn === "show"){setShowBtn("hide")}else {setShowBtn("show")}}}>{showBtn}</Button>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard> 
              </MDBRow>
              {showBtn === "hide"?  
              <MDBRow className="g-0">
              <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                <MDBRow className="g-0">
              
                  <MDBCol >
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Borrowed Books History</MDBTypography>
                      <hr className="mt-0" />
                      
                      <MDBRow className="pt-1">
                          <HistoryBooks userId={userId}></HistoryBooks>
                      </MDBRow>

                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
              </MDBRow>:<></>}
            
          
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
                          <BorrowedBooks userId={userId}></BorrowedBooks>
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
                          <InvitedBooks userId={userId}></InvitedBooks>
                      </MDBRow>

                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
  );
}

