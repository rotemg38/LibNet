import { MDBBadge, MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { getAllOrderBooksByFilter, updateOrderBook } from "../../DBHandle/repoOrderBooks";
import TableSearchPagin from "../Utils/TableSearchPagin";

const InvitedBooks = ({userId}) => {
  const [data, setData] = useState([]);
  const [selectedBook, setSelectedBook] = useState(-1)
  const [selectedBookDate, setSelectedBookDate] = useState(-1)

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
      Header: "Invite Date",
      accessor: "dateInv",
    },
    {
      Header: "Status",
      accessor: "status"
    },
    {
      Header: "Action",
      accessor: "action"
    }
  ]
  async function fetchData() {
    
    try {
      
      let res = await getAllOrderBooksByFilter({idUser: userId, status: "waiting"})
      let d = res.map((book)=>{
        if(book.dateArrive !== null){
          book["status"] = <MDBBadge color='info' pill title={book.dateArrive}>arrived</MDBBadge>
        }else{
          book["status"] = <MDBBadge color='warning' pill>{book["status"]}</MDBBadge>
        }
        book["dateInv"] = new Date(book.dateInv).toLocaleDateString()
        let strId = "btnCancle"+book.idBook
        book["action"] = <MDBBtn 
                            id={strId}
                            color='link' 
                            rounded 
                            size='sm' 
                            style={{fontSize: "small"}} 
                            onClick={() => {
                                setSelectedBook(book.idBook)
                                setSelectedBookDate(book.dateInv)
                            }}
                            >
                              <ImCancelCircle></ImCancelCircle>
                          </MDBBtn> 
        return book
      })
      setData(d);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    
    fetchData();
  }, []);

  //hanlde the cancle of the ordered book
  useEffect(()=>{
    async function handleCancle(){
      if(selectedBook !== -1){
        await updateOrderBook(selectedBook,userId,{"filter":{"status": "waiting", "dateInv": selectedBookDate},"status":"cancle"})
        fetchData()
      }
    }
    handleCancle()
    
  },[selectedBook])

  return (
    
    <TableSearchPagin dataTable={data} columns={columns} sizePage={2} infoMsg={"There is no invited books"} renderBtn={()=>{}}></TableSearchPagin>
    
  );
} 
export default InvitedBooks;