import React from 'react'
import './navbar.css';
import { RiContactsBook2Fill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/store';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  };
  return (
    <nav className='navbar navbar-expand-lg'>
      <div className="container">
        <Link to="/" className="navbar-brand">
          <b>
            <RiContactsBook2Fill />&nbsp; TrackList
          </b>
        </Link>
        <button
          className="navbar-toggler"
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls='navbarSupportedContent'
          aria-expanded="false"
          aria-label='toggle navigation'
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/about" className="nav-link active" aria-current="page">
                About us
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/todo" className="nav-link active" aria-current="page">
                Todo
              </Link>
            </li>
            {!isLoggedIn && <>
              <div className="d-flex">
                <li className="nav-item mx-2">
                  <Link
                    to="/signup"
                    className="nav-link active btn-nav p-2"
                    aria-current="page"
                  >
                    Sign up
                  </Link>
                </li>
              </div>
              <div className="d-flex my-lg-0 my-2">
                <li className="nav-item mx-2">
                  <Link
                    to="/login"
                    className="nav-link active btn-nav p-2"
                    aria-current="page"
                  >
                    Login
                  </Link>
                </li>
              </div>
            </>}
            {isLoggedIn &&
              <div className='d-flex'>
                <li className="nav-item mx-2" onClick={handleLogout}>
                  <Link
                    to="/logout"
                    className="nav-link active btn-nav p-2"
                    aria-current="page"
                  >
                    Logout
                  </Link>
                </li>
              </div>}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
