import React, {useEffect, useState } from "react";
import TableSearchPagin from "../Utils/TableSearchPagin";
import { getAllBorrowUsersByFilter } from "../../DBHandle/repoBorrowBooks.js";
import Modal from 'react-bootstrap/Modal';
import './StyleModals.css'

export default function UsersBorrow({bookId, show, setShow}) {
  
    const [data, setData] = useState([]);
    const columns = 
    [
        {
            Header: "ID",
            accessor: "idUser",
        },
        {
            Header: "First Name",
            accessor: "firstName",
        },
        {
            Header: "Last Name",
            accessor: "lastName",
        },
        {
            Header: "Mail",
            accessor: "mail"
        },
        {
            Header: "Borrow Date",
            accessor: "dateBorrow"
        }
    ]

    useEffect(() => {
        async function fetchData() {
        try {
            
            let res = await getAllBorrowUsersByFilter({idBook: bookId, status: "borrowed"})
            
            setData(res);
        } catch (error) {
            console.log(error);
        }
        }
        fetchData();
    }, [show]);

    const handleClose = () => {
        setShow(false)
    };

    return (

        <>
        <Modal id="modalBorrowUser" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Borrowes Users For Book ID - {bookId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TableSearchPagin dataTable={data} columns={columns} sizePage={4} infoMsg={"There is no borrowes users"} renderBtn={()=>{}}></TableSearchPagin>
            </Modal.Body>
        </Modal>
        </>

    );
}
