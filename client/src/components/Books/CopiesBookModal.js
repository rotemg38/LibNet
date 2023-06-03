import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
import { getBook, updateBooks } from '../../DBHandle/repoBooks';
import Swal from 'sweetalert2'

export default function CopiesBookModal({ bookId, show, setShow }) {
    const [copies, setCopies] = useState(0)
    const [copyAvailable, setCopyAvailable] = useState(0)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                await updateBooks([{ "idBook": bookId, "copies": copies, "copyAvailable": copyAvailable }])
                //alert("Book copies updated successfully!");
                Swal.fire(
                    'Success!',
                    'Book copies updated successfully',
                    'success'
                )
                handleClose()
            } catch (error) {
                console.log(error);
                //alert("Failed to update the book copies");
                Swal.fire(
                    'Error!',
                    'Failed to update the book copies',
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
        if (name === "copies") {
            //if we add new copy the availables increas
            if (copies < value) {
                setCopyAvailable(copyAvailable + 1);
            } else if (copies > value && copyAvailable > 0) {
                //if we remove copy the availables decreas
                setCopyAvailable(copyAvailable - 1);
            }
            setCopies(value);
        }
        else {
            setCopyAvailable(value);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const book = await getBook(bookId)
            setCopies(book.copies)
            setCopyAvailable(book.copyAvailable)
        }
        fetchData()
    }, [show]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <MDBValidation noValidate id='formUpdateCopiesBook' className='text-center' onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Copies Books</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MDBValidationItem invalid feedback='Please provide copies number.'>
                            <MDBInput name="copies" label='Copies Books' type="number" min="0" value={copies} wrapperclassname='mb-4' onChange={handleChange} required />
                        </MDBValidationItem>
                        <br />
                        <MDBValidationItem invalid feedback='Please provide available copies (maximum as copies number).'>
                            <MDBInput name="copyAvailable" label='Available Copies Books' type="number" min="0" max={copies} value={copyAvailable} wrapperclassname='mb-4' onChange={handleChange} required />
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
