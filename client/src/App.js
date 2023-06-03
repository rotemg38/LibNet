import './App.css';
import React, { useEffect, useState } from 'react';
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
import { connectedIsAdmin, connectedUserId, connectedUserName } from './DBHandle/repoUtils';
import Recommended from './components/Recommended/Recommended';
import NotFound from './components/NotFound';

function App() {
  const [connected, setConnected] = useState(false)
  const [adminConnected, setAdminConnected] = useState(false)
  const [username, setUsername] = useState(null)
  useEffect(() => {

    if (connectedUserId !== null) {
      setConnected(true)
    } else {
      setConnected(false)
    }

    if (connectedIsAdmin !== null) {
      if (connectedIsAdmin == "true") {
        setAdminConnected(true)
      } else {
        setAdminConnected(false)
      }

    }

    setUsername(connectedUserName)



  }, [])

  return (
    <>
      <Navb connected={connected} adminConnected={adminConnected} username={username}></Navb>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          {!connected ?
            <Route path='/login' element={<LogIn setConnected={setConnected} setAdminConnected={setAdminConnected} setUsername={setUsername} />}></Route>
            : <></>}
          {connected ?
            <>
              <Route path='/profile' element={<Profile setKey={undefined} userId={connectedUserId} />}></Route>
              <Route path='/recommended' element={<Recommended userId={connectedUserId} />}></Route>
              <Route path='/forum' element={<Forums />}></Route>
              <Route path='/forum/:idForum' element={<Discussions />}></Route>
              <Route path='/forum/:idForum/:idDisc' element={<Chat />}></Route>
            </>
            : <></>}
          <Route path='/catalogue' element={<Catalogue />}></Route>
          <Route path='/book/:id' element={<BookInfo />}></Route>
          {connected && connectedIsAdmin === 'true' ?
            <>
              <Route path='/dashboardManager' element={<DashboardManager />}></Route>
              <Route path='/inbox' element={<Inbox />}></Route>
            </>
            : <></>}

          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
