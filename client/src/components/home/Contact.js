
import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ImPhone, ImMap, ImClock2 } from 'react-icons/im'
import { GrMail } from 'react-icons/gr'
import { MDBInput, MDBBtn, MDBValidation, MDBValidationItem, MDBTextArea } from 'mdb-react-ui-kit';
import { addRequest } from '../../DBHandle/repoRequests';
import { Alert } from 'react-bootstrap';

function Contact() {
    const [show, setShow] = useState(false)
    const [typeShow, setTypeShow] = useState("succ")
    const [msg, setMsg] = useState({ from: "", mail: "", subject: "", content: "" })
    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                await addRequest(msg)
                setMsg({ from: "", mail: "", subject: "", content: "" })
                setShow(true)
                setTypeShow("succ")

            } catch (error) {
                console.log(error)
                setShow(true)
                setTypeShow("fail")
            }
        }

    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setMsg((prevMsg) => ({
            ...prevMsg,
            [name]: value,
        }));
    };

    const renderComponent = () => {
        switch (typeShow) {
            case 'succ':
                return <Alert variant="info" onClose={() => setShow(false)} dismissible>Form submitted successfully</Alert>
            case 'fail':
                return <Alert variant="danger" onClose={() => setShow(false)} dismissible>Failed to send</Alert>
            default:
                return null;
        }
    };

    return (
        <>

            <section className="page-section" id="contact">
                <br />
                <br />
                <br />
                <div className="container">
                    <div className="text-center">
                        <h1 className="section-heading text-uppercase">Contact Us</h1>
                        <br />
                    </div>
                    <Row>
                        <Col>
                            <div className="contact-footer-box text-center">
                                <ImPhone size={25} />
                                <br />
                                <br />
                                <h5>123-456-789-0</h5>
                            </div>
                        </Col>

                        <Col>
                            <div className="contact-footer-box text-center">
                                <ImMap size={25} />
                                <br />
                                <br />
                                <h5>New York City, USA</h5>
                            </div>
                        </Col>

                        <Col>
                            <div className="contact-footer-box text-center">
                                <GrMail size={25} />
                                <br />
                                <br />
                                <h5>emailaddress@domain.com</h5>
                            </div>
                        </Col>
                        <Col>
                            <div className="contact-footer-box text-center">
                                <ImClock2 size={25} />
                                <br />
                                <br />
                                <h5>Sunday-Thursday: 09:00-19:00</h5>
                            </div>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <div id="msgContactForm">
                        {show ?
                            renderComponent()
                            : <></>}
                    </div>
                    <div className='justify-center'>
                        <MDBValidation noValidate id='formContact' className='text-center' onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }} >

                            <MDBValidationItem invalid feedback='Please provide your name.'>
                                <MDBInput name='from' label='Name' value={msg.from} onChange={handleChange} wrapperclassname='mb-4' required />
                            </MDBValidationItem>
                            <br />
                            <MDBValidationItem invalid feedback='Please provide your email.'>
                                <MDBInput name='mail' type='email' label='Email address' value={msg.mail} onChange={handleChange} wrapperclassname='mb-4' required />
                            </MDBValidationItem>
                            <br />
                            <MDBValidationItem invalid feedback='Please provide subject.'>
                                <MDBInput name='subject' label='Subject' value={msg.subject} onChange={handleChange} wrapperclassname='mb-4' required />
                            </MDBValidationItem>
                            <br />
                            <MDBValidationItem invalid feedback='Please provide a message text.'>
                                <MDBTextArea name='content' wrapperclassname='mb-4' label='Message' value={msg.content} onChange={handleChange} required />
                            </MDBValidationItem>
                            <br />
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