import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput, MDBTextArea, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
import { addDiscussion, pushMessage } from '../../DBHandle/repoDiscussions';
import { addMessage } from '../../DBHandle/repoMessages';
import { pushDiscussion } from '../../DBHandle/repoForums';

export default function AddDiscussionModal({forumId,show, setShow}) {
  const [discName, setDiscName] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        
        await addDiscussion({"idForum":forumId, "discName": discName, "idUserOwner": localStorage.getItem("userId")})
        //let msgId = await addMessage({"idDisc":discId, "content": discussion.content, "idUser": localStorage.getItem("userId")})
        //await pushDiscussion(forumId, discId)
        //await pushMessage(discId, msgId)

        alert("Discussion added successfully!");
        handleClose()
      } catch (error) {
        console.log(error);
        alert("Failed to add new discussion");
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
        <Button type="button" variant="light" style={{border:"1px solid"}} onClick={handleClose}>
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
