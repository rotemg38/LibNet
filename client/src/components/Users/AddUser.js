import React  from 'react';
import { useState } from "react";
import { Button } from "react-bootstrap";
import { addUser } from "../../DBHandle/repoUsers";
import { MDBInput, MDBBtn, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
import { Container, Row, Col } from 'react-bootstrap';
import { CgArrowLeft } from 'react-icons/cg';

function AddUser({setKey}) {
  
  const [img, setImg] = useState();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    picUser: "",
    age: "",
    address: "",
    mail: "",
    password: ""
  });
 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
        try {
            await addUser(user);
            // reset the form after adding the user
            setUser({
                firstName: "",
                lastName: "",
                picUser: "",
                age: "",
                address: "",
                mail: "",
                password: ""
            });
            
            alert("User added successfully!");
          } catch (error) {
            console.log(error);
            alert("Failed to add the user");
          }
     
    }
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target; 
    if(name === "firstName"){
        setUser((prevUser) => ({
            ...prevUser,
            ["password"]: value+'123',
          }));
    }
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  /* Load the user picture if added */
  const loadImg = (event) => {
    const value = URL.createObjectURL(event.target.files[0])
    user.picUser = value
    setImg(event.target.files[0])
    }


  return (
    <>
    <div>
      <Button variant='link' onClick={()=>{setKey("users")}} style={{border:"1px solid"}}><CgArrowLeft></CgArrowLeft></Button>
    </div>
    <div className='justify-center'>
      <h1 className='text-uppercase' style={{padding: "2rem"}}>Add User</h1>
      <br/>
    </div>
    <div className='justify-center'>
    <MDBValidation noValidate id='formAddUser' className='text-center' onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '900px' }}>
        <Container>
            <Row>
            <Col>
                <MDBInput disabled name="password" label='Password' value={user.firstName + '123'} wrapperclassname='mb-4' required />
                <br/>
                <MDBValidationItem invalid feedback='Please provide first name.'>
                    <MDBInput name="firstName" label='First Name' value={user.firstName} wrapperclassname='mb-4' onChange={handleChange} required />
                </MDBValidationItem>
                <br/>
                <MDBValidationItem invalid feedback='Please provide last name.'>
                    <MDBInput name="lastName" label='Last Name' value={user.lastName} wrapperclassname='mb-4' onChange={handleChange} required />
                </MDBValidationItem>
                <br/>
                <MDBValidationItem invalid feedback='Please provide address.'>
                    <MDBInput name="address" label='Address' value={user.address} wrapperclassname='mb-4' onChange={handleChange} required />
                </MDBValidationItem>
                <br/>
               
                <MDBValidationItem invalid feedback='Please provide age.'>
                    <MDBInput name="age" label='Age' value={user.age} wrapperclassname='mb-4' onChange={handleChange} type='number' min='0' required />
                </MDBValidationItem>
                <br/>
                <MDBValidationItem invalid feedback='Please provide Email.'>
                    <MDBInput name="mail" label='Email' value={user.mail} wrapperclassname='mb-4' onChange={handleChange} type='email' required />
                </MDBValidationItem>
                <br/>
                <MDBValidationItem feedback=''>
                    <MDBInput name="picBook" value={img} wrapperclassname='mb-4' type="file" onChange={loadImg}/>
                </MDBValidationItem>
            </Col>
           
            </Row>
           
            <Row className="justify-center">
                <MDBBtn type='submit' color='primary' block className='my-4' style={{maxWidth: '40%'}}>Add User</MDBBtn>
            </Row>
        </Container>
    
    </MDBValidation>

    </div>
   
    </>
  )
}

export default AddUser;

