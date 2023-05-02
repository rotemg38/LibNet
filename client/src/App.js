import './App.css';
import React, { useEffect, useState }  from 'react';
import Home from './components/home/Home';
import Navb from './components/Navigation';
import Catalogue from './components/Catalogue/Catalogue';
import LogIn from './components/LogIn/LogIn';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import BookInfo from './components/Books/BookPage';
import Profile from './components/Profile/Profile';
import DashboardManager from './components/DashboardManager/Dashboard';
import Inbox from './components/Inbox/Inbox';
import Forums from './components/Forum/Forums';
import Discussions from './components/Forum/Discussions';
import Chat from './components/Forum/Discussion/Chat';
import { connectedIsAdmin, connectedUserId } from './DBHandle/repoUtils';

function App() {
  const [connected, setConnected] = useState(false)
  useEffect(()=>{
    
      if(connectedUserId!==null){
          setConnected(true)
      }else{
          setConnected(false)
      }
      
  },[])

  return (
   
    <>
      <Navb connected={connected}></Navb>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          {!connected?
          <Route path='/login' element={<LogIn setConnected={setConnected}/>}></Route>
          :<></>}
          {connected?
          <>
            <Route path='/profile' element={<Profile setKey={undefined} userId={connectedUserId}/>}></Route>
            <Route path='/forum' element={<Forums />}></Route>
            <Route path='/forum/:idForum' element={<Discussions />}></Route>
            <Route path='/forum/:idForum/:idDisc' element={<Chat />}></Route>
          </>
          :<></>}
          <Route path='/catalogue' element={<Catalogue />}></Route>
          <Route path='/book/:id' element={<BookInfo />}></Route> 
          {connected && connectedIsAdmin === 'true'?
          <>
          <Route path='/dashboardManager' element={<DashboardManager/>}></Route>
          <Route path='/inbox' element={<Inbox/>}></Route>
          </>
          :<></>}
          
        </Routes>
      </BrowserRouter>
      
   
    </>
  );
}

export default App;
