import React, {useEffect, useState } from "react";

import { getLateUsersBorrows } from "../../../DBHandle/repoBorrowBooks";
import TableSearchPagin from "../../Utils/TableSearchPagin";
//import { Table, Form, FormGroup, Input, Label, Button } from "react-bootstrap";
  

export default function LateUsersTable() {
  
  const [data, setData] = useState([]);
  const columns = 
    [
        {
            Header: "ID User",
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
            Header: "ID Book",
            accessor: "idBook",
        },
        {
            Header: "Book Name",
            accessor: "bookName",
        }
    ]

  useEffect(() => {
    async function fetchData() {
      try {
        
        let res = await getLateUsersBorrows()
        setData(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    
    <TableSearchPagin dataTable={data} columns={columns} sizePage={4} infoMsg={"There is no late users"} renderBtn={()=>{}}></TableSearchPagin>
    
  );
}
