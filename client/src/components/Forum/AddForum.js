import React from 'react';
import { useState } from "react";
import { Button } from "react-bootstrap";
import { MDBInput, MDBBtn, MDBValidation, MDBValidationItem, MDBTextArea } from 'mdb-react-ui-kit';
import { Container, Row, Col } from 'react-bootstrap';
import { CgArrowLeft } from 'react-icons/cg';
import { addForum } from '../../DBHandle/repoForums';
import Swal from 'sweetalert2'

function AddForum({ setKey }) {
  const [forum, setForum] = useState({
    forumName: "",
    description: ""
  });


  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        await addForum(forum)
        // reset the form after adding the forum
        setForum({
          forumName: "",
          description: ""
        });

        //alert("Forum added successfully!");
        Swal.fire(
          'Success!',
          'Forum added successfully',
          'success'
        )
      } catch (error) {
        console.log(error);
        //alert("Failed to add the forum");
        Swal.fire(
          'Error!',
          "Failed to add the forum",
          'error'
        )
      }

    }

  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForum((prevForum) => ({
      ...prevForum,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <Button variant='link' onClick={() => { setKey("forums") }} style={{ border: "1px solid" }}><CgArrowLeft></CgArrowLeft></Button>
      </div>
      <div className='justify-center'>
        <h1 className='text-uppercase' style={{ padding: "2rem" }}>Add Forum</h1>
        <br />
      </div>
      <div className='justify-center'>
        <MDBValidation noValidate id='formAddForum' className='text-center' onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '900px' }}>
          <Container>
            <Row>
              <Col>

                <MDBValidationItem invalid feedback='Please provide forum name.'>
                  <MDBInput name="forumName" label='Forum Name' value={forum.forumName} wrapperclassname='mb-4' onChange={handleChange} required />
                </MDBValidationItem>
                <br />
                <MDBValidationItem invalid feedback='Please provide forum description.'>
                  <MDBTextArea name="description" label='Description' value={forum.description} wrapperclassname='mb-4' onChange={handleChange} required />
                </MDBValidationItem>

              </Col>

            </Row>

            <Row className="justify-center">
              <MDBBtn type='submit' color='primary' block className='my-4' style={{ maxWidth: '40%' }}>Add Forum</MDBBtn>
            </Row>
          </Container>

        </MDBValidation>

      </div>

    </>
  )
}

export default AddForum;

