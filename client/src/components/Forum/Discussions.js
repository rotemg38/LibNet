import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState }  from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getDiscussionsByFilter, getDiscussionsByForumWithReplies } from '../../DBHandle/repoDiscussions';
import { getForumByFilter } from '../../DBHandle/repoForums';
import { getMessagesByFilter } from '../../DBHandle/repoMessages';
import TableSearchPagin from '../Utils/TableSearchPagin';
import AddDiscussionModal from './AddDiscussionModal';
import ForumCard from './ForumCard';

export default function Discussions() {
    const [forum, setForum] = useState(null)
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)

    const { idForum } = useParams();
    
    const columns = 
    [
        {
            Header: "ID",
            accessor: "idDisc",
        },
        {
            Header: "Topic",
            accessor: "discName",
        },
        {
            Header: "Created At",
            accessor: "createdAt",
        },
        {
            Header: "Replies",
            accessor: "replies",
        },
        {
            Header: "Views",
            accessor: "seenNum",
        },
        {
            Header: "",
            accessor: "action",
        },
    ]

    useEffect(()=>{
        async function fetchData(){
            let forum = await getForumByFilter({idForum:idForum})
            setForum(forum)
            console.log(forum)
            let data = await getDiscussionsByForumWithReplies(idForum)
            
            let discs = data.map((disc)=>{
                let strId = "disc"+ disc.idDisc
                disc["action"] =  <Link to={`/forum/${idForum}/${disc.idDisc}`}><MDBBtn 
                id={strId}
                color='link' 
                rounded 
                size='sm' 
                style={{fontSize: "small"}} 
                >
                    Open
                </MDBBtn> </Link>
                disc.createdAt = new Date(disc.createdAt).toLocaleDateString()
                
                return disc
                
            })
            setData(discs)
        }

        fetchData()
    },[idForum, show])

    const renderBtn = ()=>{
        return <Button onClick={()=>{setShow(true)}}>Add Discussion</Button>
    }

    return (
    <>
    {forum !== null?
    <>
        <AddDiscussionModal forumId={idForum} show={show} setShow={setShow}></AddDiscussionModal>
        <div className='justify-center'>
            <h1 className='text-uppercase' style={{padding: "2rem"}}>{forum.forumName}</h1>
        </div>
        <Container>
            <Alert variant='info' className='text-center'>
                {forum.description}
            </Alert>
        {data.length === 0?
        
            <Alert variant="warning" className='text-center'><h4>Be The First To Add Discussion!</h4> <p>{renderBtn()}</p></Alert>
            :
            <TableSearchPagin dataTable={data} columns={columns} sizePage={10} infoMsg="No discussions yet" renderBtn={renderBtn}></TableSearchPagin>
        }
        </Container>
    </>
    :<></>}
    </>
  
    );
  }