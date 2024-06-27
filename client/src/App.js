import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginContextProvider from './contexts/LoginContextProvider';
import Home from './pages/Home'
import Join from './pages/Join'
import User from './pages/User'
import About from './pages/About'
import Login from './pages/Login'
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import InsertForm from './components/board/InsertForm';
=======
import Insert from './pages/board/Insert';

>>>>>>> 7903d3f252679d157c290af50c6882f92d8ebb0c

function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/Join" element={<Join/>}></Route>
          <Route path="/User" element={<User/>}></Route>
          <Route path="/About" element={<About/>}></Route>
<<<<<<< HEAD
          <Route path="/inset" element={<InsertForm/>}></Route>
          
=======
          <Route path="/board/Insert" element={<Insert/>}></Route>
>>>>>>> 7903d3f252679d157c290af50c6882f92d8ebb0c
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
