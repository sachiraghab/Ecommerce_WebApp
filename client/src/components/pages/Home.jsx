import React from 'react'
import './home.css';
import {useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/todo');
  }
  return (
    <div className='home-container d-flex justify-content-center align-item-center'>
      <div className="container d-flex justify-content-center align-item center flex-column">
        <h1>
          Organize your <br /> work and life, finally.
        </h1>
        <p className='text-center'>
          Become focused, organized, and calm with 
          todo app. The world's #1 task manager app.
        </p>
        <button className="btn-home p-2" onClick={handleClick}>Make todo list</button>
      </div>
    </div>
  )
}

export default Home
