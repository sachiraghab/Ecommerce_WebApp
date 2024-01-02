const User = require('./../models/userModel');
const Task = require('./../models/taskModel');

//creating task
const addTaskController = async (req, res) => {
  try {
    const { title, body } = req.body;
    const { id } = req.params;
    const existingUser = await User.findById({ _id:id });
    const task = new Task({ title, body, user: existingUser });
    const taskAdded = await task.save();
    existingUser.list.push(task);
    existingUser.save();
    res.status(200).json({ taskAdded, message: "Task added successfully", status: "success" });
  } catch (err) {
    res.status(401).send({ message: "task adding error", error: err, status: "error" });
  }
}

//updating task
const updateTaskController = async (req, res) => {
  try {
    const { title, body } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, body });
    await updatedTask.save();
    res.status(200).send({ message: "task updated successfully", status:'success' });    
  } catch (error) {
    res.status(500).send({ message: 'task updating error', status: 'error' });
  }
}

//deleting task
const deleteTaskController = async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndUpdate(
      userId, { $pull: { list: req.params.id } }
    );
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Task deleted successfully", status:'success'});
  } catch (error) {
    
    res.status(500).send({ status: 'error', message: 'task deleting error' });
  }
}

//getting tasks
const getTasksController = async (req, res) => {
  try {
    const { id } = req.params;
    
    const list = await Task.find({ user:  id}).sort({ createdAt: -1 });
    if (list.length < 1) {
      res.status(200).json({ message: "No tasks found", status: "empty" });
    } else {
      res.status(200).send({ message: `${list.length} tasks found`, list, status: "success" });
    }
  } catch (error) {
    
    res.status(500).send({ message: error.message, status: "error" });
  }
}

module.exports = {
  addTaskController, updateTaskController, deleteTaskController, getTasksController
};