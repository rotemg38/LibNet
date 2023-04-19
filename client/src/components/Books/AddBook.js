import React  from 'react';
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addBook } from "../../DBHandle/repoBooks";
import { MDBInput, MDBCheckbox, MDBBtn, MDBValidation, MDBValidationItem,MDBTextArea } from 'mdb-react-ui-kit';
import { Container, Row, Col } from 'react-bootstrap';
import { CgArrowLeft } from 'react-icons/cg';

function AddBook({setKey}) {
  
  const [series, setSeries] = useState("false");
  const [img, setImg] = useState();
  const [book, setBook] = useState({
    bookName: "",
    author: "",
    category: "",
    picBook: "",
    publishing: "",
    publishingYear: "",
    numPages: "",
    summary: "",
    copies: "",
    copyAvailable: "",
    language: "",
    location: "",
    seriesName: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
        try {
            console.log(book)
            await addBook(book);
            // reset the form after adding the book
            setBook({
              bookName: "",
              author: "",
              category: "",
              picBook: "",
              publishing: "",
              publishingYear: "",
              numPages: "",
              summary: "",
              copies: "",
              copyAvailable: "",
              language: "",
              location: "",
              seriesName: "",
            });
            
            alert("Book added successfully!");
          } catch (error) {
            console.log(error);
            alert("Failed to add the book");
          }
     
    }
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name === "copies"){
        setBook((prevBook) => ({
            ...prevBook,
            ["copyAvailable"]: value,
          }));
    }
    
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  /* Load the book picture if added */
  const loadImg = (event) => {
    const value = URL.createObjectURL(event.target.files[0])
    book.picBook = value
    setImg(event.target.files[0])
    }

    const handleSeries = (event)=> {
        if(series === "false"){
            setSeries("true")
        }else{
            setSeries("false")
        }
        
    }

  return (
    <>
    <div>
      <Button variant='link' onClick={()=>{setKey("books")}} style={{border:"1px solid"}}><CgArrowLeft></CgArrowLeft></Button>
    </div>
    <div className='justify-center'>
      <h1 className='text-uppercase' style={{padding: "2rem"}}>Add Book</h1>
      <br/>
    </div>
    <div className='justify-center'>
    <MDBValidation noValidate id='formAddBook' className='text-center' onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '900px' }}>
        <Container>
            <Row>
            <Col>
                <MDBValidationItem invalid feedback='Please provide book name.'>
                    <MDBInput name="bookName" label='Book Name' value={book.bookName} wrapperclassname='mb-4' onChange={handleChange} required />
                </MDBValidationItem>
                <br/>
                <MDBValidationItem invalid feedback='Please provide author name.'>
                    <MDBInput name="author" label='Author' value={book.author} wrapperclassname='mb-4' onChange={handleChange} required />
                </MDBValidationItem>
                <br/>
                <MDBValidationItem invalid feedback='Please provide category.'>
                    <MDBInput name="category" label='Category' value={book.category} wrapperclassname='mb-4' onChange={handleChange} required />
                </MDBValidationItem>
                <br/>
                <MDBValidationItem invalid feedback='Please provide publishing.'>
                    <MDBInput name="publishing" label='Publishing' value={book.publishing} wrapperclassname='mb-4' onChange={handleChange} required />
                </MDBValidationItem>
                <br/>
                <MDBValidationItem invalid feedback='Please provide publishing year.'>
                    <MDBInput name="publishingYear" label='Publishing Year' value={book.publishingYear} wrapperclassname='mb-4' onChange={handleChange} type='number' min='0' required />
                </MDBValidationItem>
                <br/>
                <MDBValidationItem invalid feedback='Please provide Page Number.'>
                    <MDBInput name="numPages" label='Page Number' value={book.numPages} wrapperclassname='mb-4' onChange={handleChange} type='number' min='0' required />
                </MDBValidationItem>
                <br/>
                
            </Col>
            <Col>
            
            <MDBValidationItem invalid feedback='Please provide the total number of copies.'>
                <MDBInput name="copies" label='Total Copies' value={book.copies} wrapperclassname='mb-4' onChange={handleChange} type='number' min='0' required />
            </MDBValidationItem>
            <br/>
            
            <MDBValidationItem invalid feedback='Please provide the book language.'>
                <MDBInput name="language" label='Language' value={book.language} wrapperclassname='mb-4' onChange={handleChange} required />
            </MDBValidationItem>
            <br/>
            <MDBValidationItem invalid feedback='Please provide the book location in the library.'>
                <MDBInput name="location" label='Location' value={book.location} wrapperclassname='mb-4' onChange={handleChange} required />
            </MDBValidationItem>
            <br/>
            <MDBValidationItem feedback=''>
                <MDBInput name="picBook" value={img} wrapperclassname='mb-4' type="file" onChange={loadImg}/>
            </MDBValidationItem>
            <br/>
         
            <MDBCheckbox label='This book is part of a series' onChange={handleSeries}  />
            
            {series === "false" && <br/>}
            {series !== "false" &&
                <>
                <MDBValidationItem invalid feedback='Please provide the series name.'>
                    <MDBInput name="seriesName" label='Series Name' value={book.seriesName} wrapperclassname='mb-4' onChange={handleChange} required/>
                </MDBValidationItem>
                <br/>
                </>
            }
            
            
            </Col>
            </Row>
            <Row>
            <MDBValidationItem invalid feedback='Please provide a summary.'>
                <MDBTextArea name="summary" label='Summary' value={book.summary} wrapperclassname='mb-4' onChange={handleChange} required />
            </MDBValidationItem>
            <br/>
            </Row>
            <Row className="justify-center">
                <MDBBtn type='submit' color='primary' block className='my-4' style={{maxWidth: '40%'}}>Add Book</MDBBtn>
            </Row>
        </Container>
    
    </MDBValidation>

    </div>
   
    </>
  )
}

export default AddBook;

