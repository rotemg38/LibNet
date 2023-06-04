import React, {useEffect, useState } from "react";
import TableSearchPagin from "../Utils/TableSearchPagin";
import { getAllBorrowedBooksByFilter } from "../../DBHandle/repoBorrowBooks.js";
  

export default function HistoryBooks({userId}) {
  
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
        
        let res = await getAllBorrowedBooksByFilter({idUser: userId, status: "returned"})
        let books = res.map((book)=>{
          book["dateBorrow"] = new Date(book.dateBorrow).toLocaleDateString()
          book["returnDate"] = new Date(book.returnDate).toLocaleDateString()
          return book
        })
        setData(books);
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
