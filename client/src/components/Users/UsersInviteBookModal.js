import React, {useEffect, useState } from "react";
import TableSearchPagin from "../Utils/TableSearchPagin";
import { getAllOrderUsersByFilter, updateArriveBook } from "../../DBHandle/repoOrderBooks";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import './StyleModals.css'

export default function UsersOrder({bookId, show, setShow}) {
  
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
            Header: "Invite Date",
            accessor: "dateInv",
        },
        {
            Header: "Arrive to Library",
            accessor: "dateArrive",
        }
        
    ]

    useEffect(() => {
        async function fetchData() {
        try {
            let res = await getAllOrderUsersByFilter({idBook: bookId, status: "waiting"})
            let data = res.map((user)=>{
                user["dateInv"] = new Date(user.dateInv).toLocaleDateString()
                if(user.dateArrive !== null)
                    user["dateArrive"] = new Date(user.dateArrive).toLocaleDateString()
                return user
            })
            setData(data);
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
        <Modal id="modalOrderUser" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Order Users For Book ID - {bookId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TableSearchPagin dataTable={data} columns={columns} sizePage={4} infoMsg={"There is no order users"} renderBtn={()=>{}}></TableSearchPagin>
            </Modal.Body>
            {data.length !== 0 ? 
             <Modal.Footer className="justify-center">
             <Button type='button' variant="primary" onClick={async () => {
                try{
                    await updateArriveBook(bookId)
                    alert("Arrive book updated successfully!");
                } catch (error) {
                    console.log(error);
                    alert("Failed to update the arrived book");
                }
                handleClose()
                
                /*var date  = null
                var firstUser = 
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    if(date === null){
                        date = new Date(element.dateArrive)
                    }
                }*/
            
             }}>
                Book Arrive
             </Button>
             </Modal.Footer>
            
            :<></>}
           
        </Modal>
        </>

    );
}
