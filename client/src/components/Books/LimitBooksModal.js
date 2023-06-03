import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
import { getUser, updateUser } from '../../DBHandle/repoUsers';
import Swal from 'sweetalert2'

export default function LimitBookModal({ userId, show, setShow }) {
    const [limit, setLimit] = useState(2)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                await updateUser(userId, { "limitBooks": limit })
                //alert("Limit books updated successfully!");
                Swal.fire(
                    'Success!',
                    'Limit books updated successfully',
                    'success'
                )
                handleClose()
            } catch (error) {
                console.log(error);
                //alert("Failed to update the limit books");
                Swal.fire(
                    'Error!',
                    'Failed to update the limit books',
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
        setLimit(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUser(userId)
            setLimit(user.limitBooks)
        }
        fetchData()
    }, [show]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <MDBValidation noValidate id='formUpdateLimitBook' className='text-center' onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Limit Books</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MDBValidationItem invalid feedback='Please provide current password.'>
                            <MDBInput name="limit" label='Limit Books' type="number" min="0" value={limit} wrapperclassname='mb-4' onChange={handleChange} required />
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
