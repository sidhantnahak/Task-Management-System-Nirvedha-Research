import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Notfound from './Components/Loader&Notfound/Notfound';
import { useEffect, useState } from 'react';
import { getall_task } from './redux/taskAction';
import { useDispatch, useSelector } from 'react-redux';
import Main  from './Components/Main/Main';
import Protect from './Components/Loader&Notfound/Protect';
import { getUser } from './redux/useraction';
import Login from './Components/LoginSignup/Login';
import Signup from './Components/LoginSignup/Signup';
import HomePage from './Components/HomePages/HomePage';
import Home from '../src/Components/Main/Home'


function App() {
  const [note, setnote] = useState("All Tasks")

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getall_task())
    dispatch(getUser())

  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route element={<Protect />}>

            <Route path='/dashboard' element={<Home setnote={setnote} note={note} />} />

          </Route>
          <Route path='*' element={<Notfound />} />

        </Routes>
      </BrowserRouter>

    </>
  );
}
export default App;
