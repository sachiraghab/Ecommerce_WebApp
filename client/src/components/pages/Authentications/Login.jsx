import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/store';
import './signup.css';

const Login = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "", password: ""
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${window.location.origin}/api/v1/user/login`, inputs);
    const { status, message } = response.data;
    if (status === "success") {
      localStorage.setItem("id", response.data.data._id);
      dispatch(authActions.login());
      toast.success(message);
      setInputs({ email: "", password: "" });
      history("/todo");
    }else{
      toast.error(message);
    }
  }
  return (
    <div className='signup'>
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col-lg-4 column d-lg-flex justify-content-center align-items-center d-none">
            <h1 className="text-center signup-heading">
              Login
            </h1>
          </div>
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className='d-flex flex-column w-100 p-3'>
              <input
                type="text"
                className='p-2 my-3 input-signup'
                placeholder='Enter your email'
                name="email"
                value={inputs.email}
                onChange={handleChange}
                required
              />

              <input
                type={passwordVisible ? 'text' : 'password'}
                className='p-2 my-3 input-signup'
                placeholder='Enter your password'
                name="password"
                value={inputs.password}
                onChange={handleChange}
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
              <button className="signup-btn" onClick={handleSubmit}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
