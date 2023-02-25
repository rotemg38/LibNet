import './App.css';
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

function App() {
  return (
   
    <>
      
      <Navb></Navb>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<LogIn />}></Route>
          <Route path='/catalogue' element={<Catalogue />}></Route>
          <Route path='/events' element={<Events />}></Route>
        </Routes>
      </BrowserRouter>
      
   
    </>
  );
}

export default App;
