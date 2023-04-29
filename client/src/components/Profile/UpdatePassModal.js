import React, { useState,useMemo,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput, MDBBtn, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
import { updateUserPass } from '../../DBHandle/repoUsers';

export default function UpdatePassModal({userId, show, setShow}) {
    const [pass, setPass] = useState({pre:"", new:""})

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
            try {
                //await updateUser(userId, user)
                await updateUserPass(userId, pass)
                alert("Password updated successfully!");
                
                setPass({pre:"", new:""})
                setShow(false)
              } catch (error) {
                console.log(error);
                alert("Failed to update the password");
                setPass({pre:"", new:""})
              }
         
        }
        
    };

    const handleClose = () => {
        setPass({pre:"", new:""})
        setShow(false)
    };
   
    const handleChange = (event) => {
        const { name, value } = event.target; 
       
        setPass((prevPass) => ({
            ...prevPass,
            [name]: value,
        }));
    };

    return (
        <>
        <Modal show={show} onHide={handleClose}>
        <MDBValidation noValidate id='formUpdatePass' className='text-center' onSubmit={handleSubmit}>
            <Modal.Header closeButton>
            <Modal.Title>Update Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MDBValidationItem invalid feedback='Please provide current password.'>
                    <MDBInput name="pre" label='Previous Password' type="password" value={pass.pre} wrapperclassname='mb-4' onChange={handleChange} required />
                </MDBValidationItem>
                <br/>
                <MDBValidationItem invalid feedback='Please provide new password.'>
                    <MDBInput name="new" label='New Password' type="password" value={pass.new} wrapperclassname='mb-4' onChange={handleChange} required />
                </MDBValidationItem>
               
            </Modal.Body>
            <Modal.Footer>
            <Button type="button" variant="light" style={{border:"1px solid"}} onClick={handleClose}>
                Close
            </Button>
            <Button type='submit' variant="primary">
                Save Changes
            </Button>
            </Modal.Footer>
            </MDBValidation>
        </Modal>
        </>
    );
}
