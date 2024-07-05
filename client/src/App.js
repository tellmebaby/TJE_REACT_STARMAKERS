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
import QnaMainList from './pages/board/QnaMainList';
import ReviewList from './pages/board/ReviewList';
import UserDelete from './pages/mypage/UserDelete';
import StarInsert from './pages/board/StarInsert';
import StarList from './pages/board/StarList';
import QnaInsert from './pages/board/QnaInsert';
import Read from './pages/board/Read';
import StarPayment from './pages/board/StarPayment';
import { SessionProvider } from './contexts/SessionContext';
import EventInsert from './pages/board/EventInsert';
import QnaRead from './pages/board/QnaRead';
import Promotion from './pages/mypage/Promotion';
import Update from './pages/board/Update';
import QnaUpdate from './pages/board/QnaUpdate';

import StarPaymentSuccess from './pages/board/StarPaymentSuccess';
import StarPaymentFail from './pages/board/StarPaymentFail';
import MyReviewList from './pages/mypage/MyReviewList';
import StarUpdate from './pages/board/StarUpdate';
import Payment from './pages/mypage/Payment';
import MyPoint from './pages/mypage/MyPoint';
import UserPayment from './pages/mypage/UserPayment';
import UserPaymentSuccess from './pages/mypage/UserPaymentSuccess';

function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <SessionProvider>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/Join" element={<Join/>}></Route>
          <Route path="/User" element={<User/>}></Route>
          <Route path="/IntroPage" element={<IntroPage/>}></Route>
          <Route path="/mypage/Profile" element={<Profile/>}></Route>
          <Route path="/mypage/ProfileUpdate" element={<ProfileUpdate/>}></Route>
          <Route path="/mypage/QnaList" element={<QnaList/>}></Route>
          <Route path="/mypage/Promotion" element={<Promotion/>}></Route>
          <Route path="/mypage/Payment" element={<Payment/>}></Route>
          <Route path="/mypage/myReviewList" element={<MyReviewList/>}></Route>
          <Route path="/mypage/UserDelete" element={<UserDelete/>}></Route>

          <Route path="/event" element={<EventList/>} />
          
          <Route path="/review" element={<ReviewList />}/>
          <Route path="/reviewInsert" element={<ReviewInsert/>}></Route>

          <Route path="/qna/qnaList" element={<QnaMainList />}/>
          <Route path="qna/qnaRead/:qnaNo" element={<QnaRead/>}/>
          <Route path="/qna/update/:qnaNo" element={<QnaUpdate/>}></Route>
          <Route path="/an" element={<AnList />}/>
          <Route path="/anInsert" element={<AnInsert/>}></Route>
          
          <Route path="/test" component={<Test/>} />

          <Route path="/starList" element={<StarList />}></Route>
          <Route path="/:starNo" element={<Read/>}></Route>
          <Route path="/starInsert" element={<StarInsert/>}></Route>
          <Route path="/starUpdate/:starNo" element={<StarUpdate/>}></Route>

          <Route path="/qnaInsert" element={<QnaInsert/>}></Route>
          <Route path="/StarPayment/:starNo" element={<StarPayment/>}></Route>
          <Route path="/UserPayment" element={<UserPayment/>}></Route>
          <Route path="/UserPayment/success" element={<UserPaymentSuccess/>}></Route>
          <Route path="/payments/success" element={<StarPaymentSuccess/>}></Route>
          <Route path="/payments/fail" element={<StarPaymentFail/>}></Route>
          <Route path="/eventInsert" element={<EventInsert/>}></Route>
          <Route path="/update/:starNo" element={<Update/>}></Route>

          <Route path="/mypage/myPoint" element={<MyPoint/>}></Route>
        </Routes>
        </SessionProvider>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
