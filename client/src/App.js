import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginContextProvider from './contexts/LoginContextProvider';
import Home from './pages/Home'
import Join from './pages/Join'
import User from './pages/User'
import About from './pages/About'
import Login from './pages/Login'
import Profile from './pages/mypage/Profile';
import QnaList from './pages/mypage/QnaList';


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
          <Route path="/mypage/Profile" element={<Profile/>}></Route>
          <Route path="/mypage/QnaList" element={<QnaList/>}></Route>
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
