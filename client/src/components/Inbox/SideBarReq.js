import React, { useEffect, useState }  from 'react';
import { Badge} from 'react-bootstrap';
import { CgMail } from 'react-icons/cg';
import { getRequestByFilter } from '../../DBHandle/repoRequests';

export default function SideBarReq({selectedKey, idReq}) {
    const [req, setReq] = useState({from:"", subject:"", createdAt:"", seen:true})
    const [seen, setSeen] = useState(true)
    useEffect(()=>{
        async function fetchData(){
            let request = await getRequestByFilter({"idReq": idReq})
            setReq(request)
            setSeen(request.seen)
        }
        fetchData()
    },[])

    useEffect(()=>{
        function func(){
            if(selectedKey !== ""){
                if(selectedKey == idReq){
                    setSeen(true)
                }
            }
        }
        func()
    },[selectedKey])

    return (
      <>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row">
            <div className="pt-2">
                <CgMail size={60} color="rgba(59, 113, 202)"></CgMail>
            </div>
            
            <div className="pt-3">
                <h6 className="fw-bold mb-0" style={{color:"rgba(59, 113, 202)"}}>
                    {req.from}
                </h6>
                <h6 className="text-muted">
                   <small>{req.subject}</small>
                </h6>
            </div>
        </div>
        <div className="pt-3">
            <p className="small text-muted mb-1">{
            (new Date(req.createdAt)).toLocaleDateString() === new Date().toLocaleDateString()?
            (new Date(req.createdAt)).toLocaleTimeString():(new Date(req.createdAt)).toLocaleDateString()}</p>
            {!req.seen && !seen?
                <Badge className='float-end' bg='primary' pill={true}>new</Badge>
            :<></>}
        </div>
        </div>
      
      </>
  
    );
  }