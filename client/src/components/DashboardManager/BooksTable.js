import { MDBBadge, MDBBtn, MDBCard } from "mdb-react-ui-kit";
import React, { useMemo, useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import TableSearchPagin from "../Utils/TableSearchPagin";
import { getAllBooks } from "../../DBHandle/repoBooks";

const BooksTable = ({setKey, setBookId}) => {
    const [data, setData] = useState([]);


    const columns = 
    [
        {
            Header: "ID",
            accessor: "idBook",
        },
        {
            Header: "Book Name",
            accessor: "bookName",
        },
        {
            Header: "Category",
            accessor: "category",
        },
        {
            Header: "Author",
            accessor: "author",
        },
        {
            Header: "Copies",
            accessor: "copies"
        },
        {
            Header: "Available Copies",
            accessor: "copyAvailable"
        },
        {
            Header: "Library Location",
            accessor: "location"
        },
        {
            Header: "Action",
            accessor: "action"
        }
    ]
    useEffect(() => {
        async function fetchData() {
          try {
            let books = await getAllBooks()

            let filteredUsers = books.map((book)=>{
                let b = {"action": <MDBBtn color='link' rounded size='sm' style={{fontSize: "small"}} onClick={()=>{setKey("booksActions"); setBookId(book.idBook)}}> actions </MDBBtn> }
                b["idBook"] = book.idBook
                b["bookName"] = book.bookName
                b["category"] = book.category
                b["author"] = book.author
                b["copies"] = book.copies
                b["copyAvailable"] = book.copyAvailable
                b["location"] = book.location

                return b
            })
            setData(filteredUsers);
          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
      }, []);

    const renderBtn = ()=>{
        return <Button onClick={()=>{setKey("addBook")}}>Add New Book</Button>
    }
  return (
    <>
    <div className="justify-center">
        <h1>Books</h1>
    </div>
    
    <MDBCard className="mb-3" style={{ borderRadius: '.5rem' , padding: '2rem'}}>
        <TableSearchPagin dataTable={data} columns={columns} sizePage={10} infoMsg={"Loading Books..."} renderBtn={renderBtn}></TableSearchPagin>
    </MDBCard>
    </>
  );
} 
export default BooksTable;