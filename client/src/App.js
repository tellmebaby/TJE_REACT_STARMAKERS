import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginContextProvider from './contexts/LoginContextProvider';
import Home from './pages/Home/Home'
import Join from './pages/Join'
import User from './pages/User'
import IntroPage from './pages/IntroPage'
import Login from './pages/Login'
import Profile from './pages/mypage/Profile';
import QnaList from './pages/mypage/QnaList';
import ReviewInsert from './pages/board/reviewInsert';
import AnInsert from './pages/board/anInsert';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import EventList from './pages/board/EventList';
import Test from './pages/board/Test';
import ProfileUpdate from './pages/mypage/ProfileUpdate';
import AnList from './pages/board/AnList';
import ReviewList from './pages/board/ReviewList';
import UserDelete from './pages/mypage/UserDelete';

function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/Join" element={<Join/>}></Route>
          <Route path="/User" element={<User/>}></Route>
          <Route path="/IntroPage" element={<IntroPage/>}></Route>
          <Route path="/mypage/Profile" element={<Profile/>}></Route>
          <Route path="/mypage/ProfileUpdate" element={<ProfileUpdate/>}></Route>
          <Route path="/mypage/QnaList" element={<QnaList/>}></Route>
          <Route path="/mypage/UserDelete" element={<UserDelete/>}></Route>
          <Route path="/event" element={<EventList/>} />
          <Route path="/anInsert" element={<AnInsert/>}></Route>
          <Route path="/reviewInsert" element={<ReviewInsert/>}></Route>
          <Route path="/an" element={<AnList />}/>
          <Route path="/review" element={<ReviewList />}/>
          <Route path="/test" component={<Test/>} />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
