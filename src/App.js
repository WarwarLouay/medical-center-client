import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import AddAppoinmtent from './pages/Home/AddAppointment';
import 'bootstrap/dist/css/bootstrap.min.css';
import Doctors from './pages/Home/Doctors';
import Chat from './pages/Home/Chat';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4250');

function App() {
  
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Home socket={socket} />} />
            <Route path='/appointment' element={<AddAppoinmtent />} />
            <Route exact path='/speciality/:id' element={<Doctors socket={socket} />} />
            <Route exact path='/chat' element={<Chat socket={socket} />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
