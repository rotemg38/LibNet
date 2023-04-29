import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBInput
}
from 'mdb-react-ui-kit';
import { MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../DBHandle/repoUsers';
import React  from 'react';

function LogIn({setConnected}) {
    const navigate = useNavigate()
    const [error, setError] = useState("false")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn = async (event) => {
        setError("false")
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                const res = await signIn({"mail":mail, "password":password})
                if(res === null){
                    
                   document.getElementsByName("formLogIn")[0].classList.remove("was-validated")
                   document.getElementById("password").classList.add("is-invalid")
                   document.getElementById("email").classList.add("is-invalid")
                   
                   setError("true")
                }else{
                    localStorage.setItem("jwt", res["token"]);
                    localStorage.setItem("userId", res["userId"]);
                    localStorage.setItem("userName", res["firstName"]);
                    localStorage.setItem("isAdmin", res["admin"]);
                    setConnected(true)
                    //Redirect to home page
                    navigate("/")
                    
                }
               
            } catch (err) {
                console.error(err);
            }
        }
      };


    return (
     <>
    {error === "true"?(<Alert variant="danger" className='text-center'>email or password are incorrect</Alert>):<></>}
      
     <MDBContainer className="my-5 justify-center">
        
       
        <MDBCard style={{ width: '100%', maxWidth: '800px' }}>
        <MDBRow className='g-0'>

            <MDBCardBody className='d-flex flex-column'>

                
                <div className='d-flex flex-row mt-2 justify-center'>
                    <span className="h1 fw-bold mb-0 text-uppercase">Sign In</span>
                </div>
                <br/>
                <br/>
                <div className='justify-center'>
                   
                    <MDBValidation name="formLogIn" noValidate id='formLogin' onSubmit={handleSignIn} className='text-center' style={{ width: '100%', maxWidth: '500px' }}>
                        <MDBValidationItem invalid feedback='Please provide your email.'>
                            <MDBInput name="mail" type='email' label='Email address' id="email" value={mail} wrapperclassname='mb-4' required size="lg" onChange={(e) => {document.getElementById("email").classList.remove("is-invalid");setMail(e.target.value)}}/>
                        </MDBValidationItem>
                        <br/>
                        <MDBValidationItem invalid feedback='Please provide your password.'>
                            <MDBInput name="password" wrapperClass='mb-4' label='Password' id='password' value={password} type='password' size="lg" required onChange={(e) => {document.getElementById("password").classList.remove("is-invalid"); setPassword(e.target.value)}}/>
                        </MDBValidationItem>
                        <br/>
                        <MDBBtn className="mb-4 px-5" color='primary' size='lg'>Login</MDBBtn>
                    </MDBValidation>
 
                </div>
                <div className='justify-center'>
                    {/*<a className="small text-muted" href="#!">Forgot password?</a>*/}
                    <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="/#contact" style={{color: '#393f81'}}>Contact us here</a></p>
                </div>
               

            </MDBCardBody>
            

        </MDBRow>
        </MDBCard>

    </MDBContainer>
    
     </>
    );
  }
  
  export default LogIn;