
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {ImPhone, ImMap, ImClock2} from 'react-icons/im'
import {GrMail} from 'react-icons/gr'
import { MDBInput, MDBCheckbox, MDBBtn, MDBValidation, MDBValidationItem,MDBTextArea } from 'mdb-react-ui-kit';

function Contact() {
    return (
        <>
            
        <section className="page-section" id="contact">
            <br/>
            <br/>
            <br/>
            <div className="container">
                <div className="text-center">
                    <h1 className="section-heading text-uppercase">Contact Us</h1>
                    <br/>
                </div>
                <Row>
                <Col>
                            <div className="contact-footer-box text-center">
                            <ImPhone size={25}/>
                            <br/>
                            <br/>
                            <h5>123-456-789-0</h5>
                            </div>
                        </Col>

                        <Col>
                            <div className="contact-footer-box text-center">
                            <ImMap size={25}/>
                            <br/>
                            <br/>
                            <h5>New York City, USA</h5>
                            </div>
                        </Col>

                        <Col>
                            <div className="contact-footer-box text-center">
                            <GrMail size={25}/>
                            <br/>
                            <br/>
                            <h5>emailaddress@domain.com</h5>
                            </div>
                        </Col>
                        <Col>
                            <div className="contact-footer-box text-center">
                            <ImClock2 size={25}/>
                            <br/>
                            <br/>
                            <h5>Sunday-Thursday: 09:00-19:00</h5>
                            </div>
                        </Col>
                </Row>
                <br/>
                <br/>
                
                <div className='justify-center'>
                    <MDBValidation noValidate id='formContact' className='text-center' style={{ width: '100%', maxWidth: '500px' }}>
                    
                                <MDBValidationItem invalid feedback='Please provide your name.'>
                                    <MDBInput label='Name' v-model='name' wrapperclassname='mb-4' required />
                                </MDBValidationItem>
                                <br/>
                                <MDBValidationItem invalid feedback='Please provide your email.'>
                                    <MDBInput type='email' label='Email address' v-model='email' wrapperclassname='mb-4' required />
                                </MDBValidationItem>
                                <br/>
                                <MDBValidationItem invalid feedback='Please provide subject.'>
                                    <MDBInput label='Subject' v-model='subject' wrapperclassname='mb-4' required />
                                </MDBValidationItem>
                                <br/>
                                <MDBValidationItem invalid feedback='Please provide a message text.'>
                                    <MDBTextArea wrapperclassname='mb-4' label='Message' required />
                                </MDBValidationItem>
                                <br/>
                                <MDBBtn type='submit' color='primary' block className='my-4'>
                                    Send
                                </MDBBtn>
                        
                    </MDBValidation>
                
                </div>
            </div>
        </section>


       

           
        </>
    );
  }
  
  export default Contact;