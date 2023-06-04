import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addRating, getRatingByFilter, updateRating } from '../../DBHandle/repoRatings';
import { Rating } from '@mui/material';
import { connectedUserId } from '../../DBHandle/repoUtils';
import Swal from 'sweetalert2'

export default function RateBookModal({ bookId, show, setShow }) {
    const [rate, setRate] = useState(0)
    const [action, setAction] = useState("Add")


    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                let userId = connectedUserId
                if (action === "Add") {
                    await addRating({ idBook: bookId, idUser: userId, rateNum: rate })
                    //alert("Rate added successfully!");
                    Swal.fire(
                        'Success!',
                        'Rate added successfully',
                        'success'
                    )
                } else {
                    await updateRating(userId, bookId, { rateNum: rate, createdAt: Date.now() })
                    //alert("Rate updated successfully!");
                    Swal.fire(
                        'Success!',
                        'Rate updated successfully',
                        'success'
                    )
                }

                handleClose()
            } catch (error) {
                console.log(error);
                //alert(`Failed to ${action} rating`);
                Swal.fire(
                    'Error!',
                    `Failed to ${action} rating`,
                    'error'
                )
            }

        }

    };

    const handleClose = () => {
        setShow(false)
    };


    useEffect(() => {
        const fetchData = async () => {
            const userRate = await getRatingByFilter({ idBook: bookId, idUser: connectedUserId })

            if (userRate !== null) {
                setRate(userRate["rateNum"])
                setAction("Update")
            }
        }
        fetchData()
    }, [show]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>{action} Your Rate</Modal.Title>
                </Modal.Header>
                <Modal.Body className='justify-center'>

                    <Rating
                        size='large'
                        name="simple-controlled"
                        value={rate}
                        onChange={(event, newValue) => {
                            setRate(newValue);
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" variant="light" style={{ border: "1px solid" }} onClick={handleClose}>
                        Close
                    </Button>
                    <Button type='submit' variant="primary" onClick={handleSubmit}>
                        {action}
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
}
