import { MDBBtn, MDBCard } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getAllForums, getAllForumsWithDiscNum } from "../../DBHandle/repoForums";
import TableSearchPagin from "../Utils/TableSearchPagin";

const ForumsTable = ({setKey}) => {
    const [data, setData] = useState([]);

    const columns = 
    [
        {
            Header: "ID",
            accessor: "idForum",
        },
        {
            Header: "Forum Name",
            accessor: "forumName",
        },
        {
            Header: "Description",
            accessor: "description",
        },
        {
            Header: "Create At",
            accessor: "createdAt"
        },
        {
            Header: "Discussions No.",
            accessor: "discussionsNum"
        }
    ]
    useEffect(() => {
        async function fetchData() {
          try {
            
            const forums = await getAllForumsWithDiscNum()
            
            let filteredForums = forums.map((forum)=>{
                forum["createdAt"] = new Date(forum.createdAt).toLocaleDateString()
                return forum
            })
            setData(filteredForums);
          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
      }, []);

      const renderBtn = ()=>{
        return <Button onClick={()=>{setKey("addForum")}}>Add New Forum</Button>
      }
  return (
    <>
    <div className="justify-center">
        <h1>Forums</h1>
    </div>
   {data.length === 0?
        <Alert variant="warning" className='text-center'><p>Found No Forums</p> <p>{renderBtn()}</p></Alert>
    :
        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' , padding: '2rem'}}>
            <TableSearchPagin dataTable={data} columns={columns} sizePage={10} infoMsg={"Loading Forums..."} renderBtn={renderBtn}></TableSearchPagin>
        </MDBCard>
    }
    </>
  );
} 
export default ForumsTable;