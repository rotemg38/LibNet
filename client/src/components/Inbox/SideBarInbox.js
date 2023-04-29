import React, { useEffect, useState }  from 'react';
import Nav from 'react-bootstrap/Nav';
import { getAllRequests } from '../../DBHandle/repoRequests';
import SideBarReq from './SideBarReq';

export default function SideBarInbox({keyState, setKey}) {
    const [requests, setRequests] = useState([])

    useEffect(()=>{
        async function fetchData(){
            try{
                let data = await getAllRequests()
                data = data.sort((a,b) => (new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : ((new Date(b.createdAt) < new Date(a.createdAt)) ? -1 : 0))
                setRequests(data)
            }catch(error){
                console.log(error)
            }
        }
       fetchData()
    },[])
    return (
    <>
        <Nav variant="pills" className="bg-light sidebar flex-column vh-100" onSelect={(selectedKey) => setKey(selectedKey)}>
            {requests.map((req, index)=>{
                return <Nav.Item key={index} className="p-2 border-bottom">
                    <Nav.Link eventKey={req.idReq}>
                        <SideBarReq selectedKey={keyState} idReq={req.idReq}></SideBarReq>
                    </Nav.Link>
                </Nav.Item>
            })}
        
        </Nav>
    
    </>
    );
}






