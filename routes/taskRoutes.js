const express = require('express');
const router = express.Router();
const {
  addTaskController, updateTaskController, deleteTaskController, getTasksController
} = require('./../controllers/taskController');

router.post('/add-task/:id', addTaskController);
router.put('/edit-task/:id', updateTaskController);
router.delete('/delete-task/:id', deleteTaskController);
router.get('/get-tasks/:id', getTasksController);

module.exports = router;
