import React, { useEffect, useState } from "react";
import {MDBCard, MDBCardHeader, MDBIcon, MDBCardBody} from 'mdb-react-ui-kit'
import MsgCard from "./MsgCard";
import { getUser } from "../../../DBHandle/repoUsers";


export default function Message({msgIndex, idUser, sender, createdAt, content}){
    const [user, setUser] = useState({})
    const [time, setTime] = useState("")
    useEffect(()=>{
        async function fetchData(){
            try{
                let userData = await getUser(idUser)
                
                if(userData!==null){
                    if(userData.picUser === "default_user.jpg"){
                        userData.picUser = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                    }
                }
                setUser(userData)

                let msgDate = new Date(createdAt)
                if(msgDate.toLocaleDateString() === new Date().toLocaleDateString()){
                    setTime(msgDate.toLocaleTimeString())
                }else{
                    setTime(msgDate.toLocaleDateString()+" ,"+ msgDate.toLocaleTimeString())
                }
            }catch(error){
                console.log(error)
            }
        }

        fetchData()

    },[msgIndex])

    return(
        <>
        {sender?
        <>
        {/**shadow-1-strong */}
            <MsgCard userName={user.firstName + " " + user.lastName} time={time} content={content}></MsgCard>
            <img
            src={user.picUser}
            alt="avatar"
            className="rounded-circle d-flex align-self-start me-3"
            width="60"
            />
        </>
        :
        <>
            <img
            src={user.picUser}
            alt="avatar"
            className="rounded-circle d-flex align-self-start me-3 "
            width="60"
            />
            <MsgCard userName={user.firstName + " " + user.lastName} time={time} content={content}></MsgCard>
        </>
        }
        
        
        </>

    );
}