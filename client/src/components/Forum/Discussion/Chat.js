import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
  MDBScrollspy
} from "mdb-react-ui-kit";
import { useParams } from "react-router";
import { CgArrowLeft } from "react-icons/cg";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Message from "./Message";
import { getDiscussionsByFilter } from "../../../DBHandle/repoDiscussions";
import { getForumByFilter } from "../../../DBHandle/repoForums";
import { addMessage, getMessagesByFilter } from "../../../DBHandle/repoMessages";
import { connectedUserId } from "../../../DBHandle/repoUsers";

export default function Chat() {
  const [forum, setForum] = useState(null)
  const [discussion, setDiscussion] = useState(null)
  const [msg, setMsg] = useState("")
  const [msgs, setMsgs] = useState([])

  const { idForum, idDisc } = useParams();
  const navigate = useNavigate()
  useEffect(()=>{
    async function fetchData(){
      let forum = await getForumByFilter({idForum:idForum})
      setForum(forum)
      let disc = await getDiscussionsByFilter({idDisc:idDisc, idForum: idForum})
      
      if(disc.length !== 0)
        setDiscussion(disc[0])

      let data = await getMessagesByFilter({idDisc:idDisc})
      let msgsData = data.map((msg)=>{
        if(String(msg.idUser) === connectedUserId){
          msg["sender"] = true
        }else{
          msg["sender"] = false
        }
        return msg
      })
      setMsgs(msgsData)
      console.log(msgsData)
    }

    fetchData()
},[idForum, idDisc])

const handleChange = (event) => {
  const { name, value } = event.target; 
  setMsg(value);
};

const handleSend =()=>{
  async function addMsg(){
    try {
        
      await addMessage({"idDisc":idDisc, "content": msg, "idUser": connectedUserId})
    
      setMsgs(oldArray => [...oldArray,{"idDisc":idDisc, "content": msg, "idUser": connectedUserId, "sender":true, "createdAt":new Date()}] );
      setMsg("")
     
    } catch (error) {
      console.log(error);
      alert("Failed to send new message");
    }
  }

  if(msg !== ""){
    addMsg()
  }
}
return (
  <>
  {forum !== null && discussion !== null?
  <Container>
  <div>
      <Button variant='link' onClick={()=>navigate(`/forum/${idForum}`)} style={{border:"1px solid"}}><CgArrowLeft></CgArrowLeft></Button>
  </div>
  
  <div className='justify-center'>
      <h1 className='text-uppercase' style={{padding: "2rem"}}>{forum.forumName + " / " + discussion.discName}</h1>
  </div>
  <MDBContainer fluid className="py-5">
    <MDBRow>
  
      <MDBCol>
        <MDBTypography listUnStyled>
          <div style={{overflowY:"auto", height:"35rem"}}>
          {msgs.map((msg, index)=>{
            let render = (msg["sender"])? 
              // means if i am the sender of this message
              <li key={index} className="d-flex mb-4" style={{justifyContent:"right"}}>
                  <Message key={index} idUser={msg.idUser} sender={msg.sender} createdAt={msg.createdAt} content={msg.content}></Message>
                </li>
            :
              <li key={index} className="d-flex mb-4">
                <Message key={index} idUser={msg.idUser} sender={msg.sender} createdAt={msg.createdAt} content={msg.content}></Message>
              </li>
            return render
          })}
          
          </div>
          <li className="bg-white mb-3">
            <MDBTextArea label="Message" id="textAreaExample" value={msg} onChange={handleChange} rows={4} />
          </li>
          <MDBBtn rounded className="float-end" onClick={handleSend}>
            Send
          </MDBBtn>
        </MDBTypography>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  
  </Container>
  :<></>}
  </>
);
}