import './App.css';
import React  from 'react';
import Home from './components/home/Home';
import Navb from './components/Navigation';
import Catalogue from './components/Catalogue/Catalogue';
import LogIn from './components/LogIn/LogIn';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Events from './components/Events/Events';
import BookInfo from './components/Books/BookPage';
import Profile from './components/Profile/Profile';
import DashboardManager from './components/DashboardManager/Dashboard';

function App() {
  return (
   
    <>
      <Navb></Navb>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<LogIn />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/catalogue' element={<Catalogue />}></Route>
          <Route path='/events' element={<Events />}></Route>
          <Route path='/book/:id' element={<BookInfo />}></Route> 
          <Route path='/DashboardManager' element={<DashboardManager/>}></Route>
        </Routes>
      </BrowserRouter>
      
   
    </>
  );
}

export default App;
