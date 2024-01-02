import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './editTask.css';
import { ToastContainer, toast } from 'react-toastify';

const EditTask = ({ display, edit }) => {
  const [editInputs, setEditInputs] = useState({
    title: "",
    body: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditInputs({ ...editInputs, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(`${window.location.origin}/api/v1/task/edit-task/${edit._id}`, editInputs);
    const { status, message } = response.data;
    if (status === 'success') {      
      toast.success(message);    
    } else {
      toast.error(message);
    }
    display('none');
  }
  useEffect(() => {
    setEditInputs({
      title: edit.title, body: edit.body
    });
  }, [edit]);
  return (
    <>
      <ToastContainer />
      <div className='p-5 d-flex justify-content-center align-items-start flex-column'>
        <h3>Edit task</h3>
        <input type="text" className='my-4 p-3 w-100 todo-inputs' name='title' value={editInputs.title} onChange={handleChange}
        />
        <textarea className='p-3 w-100 todo-inputs' name="body" value={editInputs.body} onChange={handleChange} />
        <div>
          <button className="btn btn-dark my-4" onClick={handleSubmit}>UPDATE</button>
          <button className='btn btn-danger my-4 mx-3' onClick={() => display("none")}>CANCEL</button>
        </div>
      </div>
    </>
  )
}

export default EditTask
