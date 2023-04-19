import React, {useEffect, useState, useMemo } from "react";
//import axios from "axios";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { Table, Form, FormGroup, Input, Label, Button } from "reactstrap";
import TableSearchPagin from "../Utils/TableSearchPagin";
import { getAllBorrowedBooksByFilter } from "../../DBHandle/repoBorrowBooks.js";
//import { Table, Form, FormGroup, Input, Label, Button } from "react-bootstrap";
  

export default function HistoryBooks() {
  
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
      Header: "Author",
      accessor: "author",
    },
    {
      Header: "Borrow Date",
      accessor: "dateBorrow",
    },
    {
        Header: "Return Date",
        accessor: "returnDate",
      },
  ]

  useEffect(() => {
    async function fetchData() {
      try {
        
        let res = await getAllBorrowedBooksByFilter({idUser: localStorage.getItem("userId"), status: "returned"})
        
        setData(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    
    <TableSearchPagin dataTable={data} columns={columns} sizePage={4} infoMsg={"There is no borrowed books"} renderBtn={()=>{}}></TableSearchPagin>
    
  );
}
