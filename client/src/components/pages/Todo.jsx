import React, { useEffect, useState } from 'react'
import './todo.css';
import Task from '../utils/Task';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import EditTask from '../utils/EditTask';
import { useSelector } from 'react-redux';

let toUpdateArray = [];

const Todo = () => {
  const id = useSelector((state) => state.userId);
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [tasks, setTasks] = useState([]);

  const show = () => {
    document.getElementById('textarea').style.display = "block";
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!id) {
      toast.error('Please sign-in first');
    }
    else if (inputs.title === "" || inputs.body === "") {
      toast.error("Title or body should not be empty");
      return;
    }
    else {
      let response = await axios.post(`${window.location.origin}/api/v1/task/add-task/${id}`,
        { ...inputs });
      const { message, status } = response.data;
      
      if (status === 'success') {        
        toast.success(message);
      } else {
        toast.error(message);        
      }
      setTasks([...tasks, inputs]);
      setInputs({ title: "", body: "" });
    }
  };
  const handleDelete = async (taskId) => {
    if (id) {
      const response = await axios.delete(`${window.location.originL}/api/v1/task/delete-task/${taskId}`, {
        userId: id
      });
      const {message, status} = response.data;
      if (status === 'success') {
        toast.success(message);      
        if (tasks.length === 1) {
          setTasks([]);
        }
      } else {
        toast.error(message);
      }
    }
    else {
      toast.error("Please signin first");
    }
  };
  const handleEditDisplay = (value) => {
    // console.log(value);
    document.getElementById("edit-task").style.display = value;
  };
  const handleEdit = (i) => {
    toUpdateArray = tasks[i];
  }
  
  useEffect(() => {
    if (id) {
      const fetch = async () => {
        const response = await axios.get(`${window.location.origin}/api/v1/task/get-tasks/${id}`);
        if (response.data.status === 'empty') {
          return;
        }
        setTasks(response.data.list);
      };
      fetch();
    }
  }, [tasks]);

  return (
    <>
      <div className='todo-container'>
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="d-flex flex-column input-container w-100 p-1">
            <input
              type="text"
              placeholder='Title'
              className='my-2 p-2 todo-inputs'
              onClick={show}
              onChange={handleChange}
              name='title'
              value={inputs.title}
            />
            <textarea
              id='textarea'
              type="text"
              placeholder='Body'
              className='p-2 todo-inputs'
              name='body'
              onChange={handleChange}
              value={inputs.body}
            />
          </div>
          <div className="w-lg-50 w-100 d-flex justify-content-end my-3">
            <button className="add-btn px-2 py-1" onClick={handleAdd}>Add</button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {id && !tasks.length && (
                <div className="text-center text-danger mt-3" style={{ fontSize: '1.9rem' }}>
                  No tasks found
                </div>
              )}
              {!id && (
                <div className="text-center text-danger mt-3" style={{ fontSize: '1.9rem' }}>
                  Please sign in to add or see your to do list.
                </div>
              )}
              {tasks && tasks.map((task, index) => (
                <div className='col-lg-3 col-11 mx-lg-5 mx-3 my-2' key={index}>
                  <Task
                    title={task.title}
                    body={task.body}
                    id={task._id}
                    handleDelete={handleDelete}
                    display={handleEditDisplay}
                    index={index}
                    handleEdit={handleEdit}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="edit-task" id='edit-task'>
        <div className="edit container">
          <EditTask
            display={handleEditDisplay}
            edit={toUpdateArray} />
        </div>
      </div>
    </>
  )
}

export default Todo
