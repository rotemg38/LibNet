import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
function LogIn() {
    return (
     <>
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
                    
                    <MDBValidation noValidate id='formLogin' className='text-center' style={{ width: '100%', maxWidth: '500px' }}>
                        <MDBValidationItem invalid feedback='Please provide your email.'>
                            <MDBInput type='email' label='Email address' id="email" v-model='email' wrapperclassname='mb-4' required size="lg"/>
                        </MDBValidationItem>
                        <br/>
                        <MDBValidationItem invalid feedback='Please provide your password.'>
                            <MDBInput wrapperClass='mb-4' label='Password' id='pass' type='password' size="lg" required/>
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