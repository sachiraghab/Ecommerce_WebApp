import React, { useEffect } from 'react'
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Signup from './components/pages/Authentications/Signup';
import Login from './components/pages/Authentications/Login';
import Footer from './components/layout/Footer';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Todo from './components/pages/Todo';
import { useDispatch } from 'react-redux';
import { authActions } from './store/store';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  }, []);
  return (
    <Router>
      <Navbar />
      <ToastContainer/>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/todo' element={<Todo />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
