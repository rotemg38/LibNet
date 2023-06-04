import React, { useState, useEffect, useRef } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBTypography,
  MDBTextArea
} from "mdb-react-ui-kit";
import { useParams } from "react-router";
import { CgArrowLeft } from "react-icons/cg";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Message from "./Message";
import { addView, getDiscussionsByFilter } from "../../../DBHandle/repoDiscussions";
import { getForumByFilter } from "../../../DBHandle/repoForums";
import { addMessage, getMessagesByFilter } from "../../../DBHandle/repoMessages";
import { connectedUserId } from "../../../DBHandle/repoUtils";
import { io } from 'socket.io-client';
import { ENDPOINT } from "../../../DBHandle/repoUtils";
import Swal from 'sweetalert2'

export default function Chat() {
  const [forum, setForum] = useState(null)
  const [discussion, setDiscussion] = useState(null)
  const [msg, setMsg] = useState("")
  const [msgs, setMsgs] = useState([])
  const socket = useRef()

  const { idForum, idDisc } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchData() {
      let forum = await getForumByFilter({ idForum: idForum })
      setForum(forum)
      let disc = await getDiscussionsByFilter({ idDisc: idDisc, idForum: idForum })

      if (disc.length !== 0)
        setDiscussion(disc[0])

      let data = await getMessagesByFilter({ idDisc: idDisc })
      let msgsData = data.map((msg) => {
        if (String(msg.idUser) === connectedUserId) {
          msg["sender"] = true
        } else {
          msg["sender"] = false
        }
        return msg
      })
      setMsgs(msgsData)

    }
    // update the view to this discussion
    async function updateView() {
      // try to add connectedUserId to the views
      await addView(idDisc, connectedUserId)
    }
    updateView()
    fetchData()

  }, [idForum, idDisc])

  useEffect(() => {

    socket.current = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

    socket.current.on('message', (message) => {
      //show only if this is message that i didnt send
      if (message.idUser !== connectedUserId) {
        message["sender"] = false
        setMsgs((messages) => [...messages, message]);
      }
    });


    return () => {
      socket.current.disconnect();
    };

  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMsg(value);
  };

  const handleSend = () => {
    async function addMsg() {
      try {
        let newMsg = { "idDisc": idDisc, "content": msg, "idUser": connectedUserId, "sender": true, "createdAt": new Date() }
        await addMessage({ "idDisc": idDisc, "content": msg, "idUser": connectedUserId })

        socket.current.emit('message', newMsg);

        setMsgs(oldArray => [...oldArray, newMsg]);
        setMsg("")

      } catch (error) {
        console.log(error);
        //alert("Failed to send new message");
        Swal.fire(
          'Error!',
          "Failed to send new message",
          'error'
        )
      }
    }

    if (msg !== "") {
      addMsg()
    }
  }
  return (
    <>
      {forum !== null && discussion !== null ?
        <Container>
          <div>
            <Button variant='link' onClick={() => navigate(`/forum/${idForum}`)} style={{ border: "1px solid" }}><CgArrowLeft></CgArrowLeft></Button>
          </div>

          <div className='justify-center'>
            <h1 className='text-uppercase' style={{ padding: "2rem" }}>{forum.forumName + " / " + discussion.discName}</h1>
          </div>
          <MDBContainer fluid className="py-5">
            <MDBRow>

              <MDBCol>
                <MDBTypography listUnStyled>
                  <div style={{ overflowY: "auto", height: "35rem" }}>
                    {msgs.map((msg, index) => {
                      let render = (msg["sender"]) ?
                        // means if i am the sender of this message
                        <li key={index} className="d-flex mb-4" style={{ justifyContent: "right" }}>
                          <Message msgIndex={index} idUser={msg.idUser} sender={msg.sender} createdAt={msg.createdAt} content={msg.content}></Message>
                        </li>
                        :
                        <li key={index} className="d-flex mb-4">
                          <Message msgIndex={index} idUser={msg.idUser} sender={msg.sender} createdAt={msg.createdAt} content={msg.content}></Message>
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
        : <></>}
    </>
  );
}