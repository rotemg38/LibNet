import { MDBBtn, MDBCard } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getAllUsers } from "../../DBHandle/repoUsers";
import TableSearchPagin from "../Utils/TableSearchPagin";

const UsersTable = ({setKey, setUserId}) => {
    const [data, setData] = useState([]);
    const navigate = useNavigate()

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
            Header: "Create At",
            accessor: "createdAt"
        },
        {
            Header: "Limit Books",
            accessor: "limitBooks"
        },
        {
            Header: "Action",
            accessor: "action"
        }
    ]
    useEffect(() => {
        async function fetchData() {
          try {
           
            const users = await getAllUsers()
            
            let filteredUsers = users.map((user)=>{
                let u = {"action": <MDBBtn color='link' rounded size='sm' style={{fontSize: "small"}} onClick={()=>{setKey("usersActions"); setUserId(user.idUser)}}> actions </MDBBtn> }
                u["idUser"] = user.idUser
                u["firstName"] = user.firstName
                u["lastName"] = user.lastName
                u["mail"] = user.mail
                u["createdAt"] = user.createdAt
                u["limitBooks"] = user.limitBooks

                return u
            })
            setData(filteredUsers);
          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
      }, []);

      const renderBtn = ()=>{
        return <Button onClick={()=>{setKey("addUser")}}>Add New User</Button>
      }
  return (
    <>
    <div className="justify-center">
        <h1>Users</h1>
    </div>
   
    <MDBCard className="mb-3" style={{ borderRadius: '.5rem' , padding: '2rem'}}>
        <TableSearchPagin dataTable={data} columns={columns} sizePage={10} infoMsg={"Loading Users..."} renderBtn={renderBtn}></TableSearchPagin>
    </MDBCard>
    
    </>
  );
} 
export default UsersTable;