import React from 'react'
import './task.css';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Task = ({ title, body, id, display, handleDelete, index, handleEdit }) => {
  return (
    <div className='p-3 task'>
      <div>
        <h5>{title}</h5>
        <p className='task-p'>{body.split("", 77)}...</p>
      </div>
      <div className='d-flex justify-content-around'>
        <div
          className='d-flex justify-content-center align-items-center task-icons-heading px-2 py-1'
          onClick={() => {
            display("block");
            handleEdit(index);
          }
          }
        >
          <FaEdit className='task-icons' />
        </div>
        <div
          className='d-flex justify-content-center align-items-center task-icons-heading px-2 py-1'
          onClick={() => handleDelete(id)}
        >
          <MdDelete className='task-icons del' />
        </div>
      </div>
    </div>
  )
}

export default Task
