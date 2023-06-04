import React, { useEffect } from 'react';
import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { addBook, getBook } from "../../DBHandle/repoBooks";
import { MDBInput, MDBCheckbox, MDBBtn, MDBValidation, MDBValidationItem, MDBTextArea } from 'mdb-react-ui-kit';
import { Container, Row, Col } from 'react-bootstrap';
import { CgArrowLeft } from 'react-icons/cg';
import { updateBooks } from '../../DBHandle/repoBooks';
import Swal from 'sweetalert2'

function UpdateBook({ setKey, bookId }) {

    const [series, setSeries] = useState("false");
    const [book, setBook] = useState({
        bookName: "",
        author: "",
        category: "",
        picBook: "default_book.png",
        publishing: "",
        publishingYear: "",
        numPages: "",
        summary: "",
        copies: "",
        language: "",
        location: "",
        seriesName: "",
    });

    useEffect(() => {
        async function fetchData() {
            var data = await getBook(bookId)

            if (data.seriesName !== null) {
                setSeries("true")
                document.getElementById('seriesCheck').checked = true
            } else {
                data.seriesName = ""
            }

            if (data.picBook === "default_book.png") {
                data.picBook = "/images/default_book.png"
            }
            setBook(data)

        }
        fetchData()
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                await updateBooks([book])
                //alert("Book updated successfully!");
                Swal.fire(
                    'Success!',
                    'Books updated successfully',
                    'success'
                )
                setKey("booksActions")
            } catch (error) {
                console.log(error);
                //alert("Failed to update the book");
                Swal.fire(
                    'Error!',
                    "Failed to update the book",
                    'error'
                )
            }

        }

    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    /* Load the book picture if added */
    const loadImg = (event) => {

        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const base64Image = e.target.result;
                setBook((prevBook) => ({
                    ...prevBook,
                    ["picBook"]: base64Image,
                }));
            };

            reader.readAsDataURL(file);
        } else {
            setBook((prevBook) => ({
                ...prevBook,
                ["picBook"]: "default_book.png",
            }));
        }
    }

    const handleSeries = (event) => {
        if (series === "false") {
            setSeries("true")
        } else {
            setSeries("false")
        }

    }

    return (
        <>
            <div>
                <Button variant='link' onClick={() => { setKey("booksActions") }} style={{ border: "1px solid" }}><CgArrowLeft></CgArrowLeft></Button>
            </div>
            <div className='justify-center'>
                <h1 className='text-uppercase' style={{ padding: "2rem" }}>Update Book</h1>
                <br />
            </div>

            <Row style={{ paddingLeft: "6rem" }}>
                <Col md="3">
                    <Image src={book.picBook == "default_book.png" ? "/images/default_book.png" : book.picBook} alt={`${book.bookName} cover`} fluid style={{ height: "25rem", width: "20rem" }} />
                </Col>
                <Col md="9">
                    <MDBValidation noValidate id='formUpdateBook' className='text-center' onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '900px' }}>
                        <Container>
                            <Row>
                                <Col>
                                    <MDBValidationItem invalid feedback='Please provide book name.'>
                                        <MDBInput name="bookName" label='Book Name' value={book.bookName} wrapperclassname='mb-4' onChange={handleChange} required />
                                    </MDBValidationItem>
                                    <br />
                                    <MDBValidationItem invalid feedback='Please provide author name.'>
                                        <MDBInput name="author" label='Author' value={book.author} wrapperclassname='mb-4' onChange={handleChange} required />
                                    </MDBValidationItem>
                                    <br />
                                    <MDBValidationItem invalid feedback='Please provide category.'>
                                        <MDBInput name="category" label='Category' value={book.category} wrapperclassname='mb-4' onChange={handleChange} required />
                                    </MDBValidationItem>
                                    <br />
                                    <MDBValidationItem invalid feedback='Please provide publishing.'>
                                        <MDBInput name="publishing" label='Publishing' value={book.publishing} wrapperclassname='mb-4' onChange={handleChange} required />
                                    </MDBValidationItem>
                                    <br />
                                    <MDBValidationItem invalid feedback='Please provide publishing year.'>
                                        <MDBInput name="publishingYear" label='Publishing Year' value={book.publishingYear} wrapperclassname='mb-4' onChange={handleChange} type='number' min='0' required />
                                    </MDBValidationItem>
                                    <br />
                                    <MDBValidationItem invalid feedback='Please provide Page Number.'>
                                        <MDBInput name="numPages" label='Page Number' value={book.numPages} wrapperclassname='mb-4' onChange={handleChange} type='number' min='0' required />
                                    </MDBValidationItem>
                                    <br />
                                </Col>
                                <Col>

                                    <MDBValidationItem invalid feedback='Please provide the book language.'>
                                        <MDBInput name="language" label='Language' value={book.language} wrapperclassname='mb-4' onChange={handleChange} required />
                                    </MDBValidationItem>
                                    <br />
                                    <MDBValidationItem invalid feedback='Please provide the book location in the library.'>
                                        <MDBInput name="location" label='Location' value={book.location} wrapperclassname='mb-4' onChange={handleChange} required />
                                    </MDBValidationItem>
                                    <br />
                                    <MDBValidationItem feedback=''>
                                        <MDBInput name="picBook" accept="image/png, image/jpeg" wrapperclassname='mb-4' type="file" onChange={loadImg} />
                                    </MDBValidationItem>
                                    <br />

                                    <MDBCheckbox id='seriesCheck' label='This book is part of a series' onChange={handleSeries} />

                                    {series === "false" && <br />}
                                    {series !== "false" &&
                                        <>
                                            <MDBValidationItem invalid feedback='Please provide the series name.'>
                                                <MDBInput name="seriesName" label='Series Name' value={book.seriesName} wrapperclassname='mb-4' onChange={handleChange} required />
                                            </MDBValidationItem>
                                            <br />
                                        </>
                                    }


                                </Col>
                            </Row>
                            <Row>
                                <MDBValidationItem invalid feedback='Please provide a summary.'>
                                    <MDBTextArea rows={5} name="summary" label='Summary' value={book.summary} wrapperclassname='mb-4' onChange={handleChange} required />
                                </MDBValidationItem>
                                <br />
                            </Row>
                            <Row className="justify-center">
                                <MDBBtn type='submit' color='primary' block className='my-4' style={{ maxWidth: '40%' }}>Update Book</MDBBtn>
                            </Row>
                        </Container>

                    </MDBValidation>
                </Col>
            </Row>


        </>
    )
}

export default UpdateBook;

