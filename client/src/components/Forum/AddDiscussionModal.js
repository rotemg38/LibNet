import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
import { addDiscussion } from '../../DBHandle/repoDiscussions';
import { connectedUserId } from '../../DBHandle/repoUtils';
import Swal from 'sweetalert2'

export default function AddDiscussionModal({ forumId, show, setShow }) {
  const [discName, setDiscName] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {

        await addDiscussion({ "idForum": forumId, "discName": discName, "idUserOwner": connectedUserId })

        //alert("Discussion added successfully!");
        Swal.fire(
          'Success!',
          'Discussion added successfully',
          'success'
        )
        handleClose()
      } catch (error) {
        console.log(error);
        //alert("Failed to add new discussion");
        Swal.fire(
          'Error!',
          "Failed to add new discussion",
          'error'
        )
      }

    }

  };

  const handleClose = () => {
    setShow(false)
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDiscName(value);
  };


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <MDBValidation noValidate id='formAddDisc' className='text-center' onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Discussion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MDBValidationItem invalid feedback='Please provide discussion name.'>
              <MDBInput name="discName" label='Discussion Name' value={discName} wrapperclassname='mb-4' onChange={handleChange} required />
            </MDBValidationItem>

          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="light" style={{ border: "1px solid" }} onClick={handleClose}>
              Close
            </Button>
            <Button type='submit' variant="primary">
              Add
            </Button>
          </Modal.Footer>
        </MDBValidation>
      </Modal>
    </>
  );
}
