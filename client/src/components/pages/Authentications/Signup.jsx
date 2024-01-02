import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "", username: "", password: ""
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${window.location.origin}/api/v1/user/register`, inputs);
    const { status, message } = response.data;
    if (status === "error") {
      toast.error(message);
    }
    else {
      toast.success(message);
      setInputs({ email: "", username: "", password: "" });
      history("/login");
    }
  }
  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  }
  return (
    <div className='signup'>
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className='d-flex flex-column w-100 p-3'>
              <input
                type="text"
                className='p-2 my-3 input-signup'
                placeholder='Enter your email'
                name="email"
                onChange={handleChange}
                value={inputs.email}
                required
              />
              <input
                type="text"
                className='p-2 my-3 input-signup'
                placeholder='Enter your username'
                name="username"
                onChange={handleChange}
                value={inputs.username}
              />
              <input
                type={passwordVisible ? 'text' : 'password'}
                className='p-2 my-3 input-signup '
                placeholder='Enter your password'
                name="password"
                onChange={handleChange}
                value={inputs.password}
                required
              />
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id='passwordVisibility'
                  onClick={showPassword}
                />
                <label htmlFor="passwordVisibility" className="form-check-label">
                  Show password
                </label>
              </div>
              <button
                type='submit'
                className="signup-btn"
                onClick={handleSubmit}
              >Signup</button>
            </div>
          </div>
          <div className="col-lg-4 column d-lg-flex justify-content-center align-items-center d-none">
            <h1 className="text-center signup-heading">
              Sign <br />Up
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
