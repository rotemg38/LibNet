import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
import { updateUser } from '../../DBHandle/repoUsers';
import Swal from 'sweetalert2'

export default function UpdateUserModal({ userId, userInfo, setUserInfo, show, setShow }) {
    const [img, setImg] = useState();
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(JSON.stringify(userInfo)))
    }, [userInfo]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                await updateUser(userId, user)

                //alert("User updated successfully!");
                Swal.fire(
                    'Success!',
                    'User updated successfully',
                    'success'
                )
                setUserInfo(user)
                setShow(false)
            } catch (error) {
                console.log(error);
                //alert("Failed to update the user");
                Swal.fire(
                    'Error!',
                    "Failed to update the user",
                    'error'
                )
            }

        }

    };

    const handleClose = () => {
        setUser(JSON.parse(JSON.stringify(userInfo)))
        setShow(false)
    };
    const handleChange = (event) => {
        const { name, value } = event.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    /* Load the user picture if added */
    const loadImg = (event) => {
        const value = URL.createObjectURL(event.target.files[0])
        user.picBook = value
        setImg(event.target.files[0])
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <MDBValidation noValidate id='formUpdateUser' className='text-center' onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MDBValidationItem invalid feedback='Please provide first name.'>
                            <MDBInput name="firstName" label='First Name' value={user.firstName} wrapperclassname='mb-4' onChange={handleChange} required />
                        </MDBValidationItem>
                        <br />
                        <MDBValidationItem invalid feedback='Please provide last name.'>
                            <MDBInput name="lastName" label='Last Name' value={user.lastName} wrapperclassname='mb-4' onChange={handleChange} required />
                        </MDBValidationItem>
                        <br />
                        <MDBValidationItem invalid feedback='Please provide address.'>
                            <MDBInput name="address" label='Address' value={user.address} wrapperclassname='mb-4' onChange={handleChange} required />
                        </MDBValidationItem>
                        <br />
                        <MDBValidationItem invalid feedback='Please provide age.'>
                            <MDBInput name="age" label='Age' value={user.age} wrapperclassname='mb-4' onChange={handleChange} type='number' min='0' required />
                        </MDBValidationItem>
                        <br />
                        <MDBValidationItem invalid feedback='Please provide Email.'>
                            <MDBInput name="mail" label='Email' value={user.mail} wrapperclassname='mb-4' onChange={handleChange} type='email' required />
                        </MDBValidationItem>
                        <br />
                        <MDBValidationItem feedback=''>
                            <MDBInput name="picBook" value={img} wrapperclassname='mb-4' type="file" onChange={loadImg} />
                        </MDBValidationItem>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" variant="light" style={{ border: "1px solid" }} onClick={handleClose}>
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
