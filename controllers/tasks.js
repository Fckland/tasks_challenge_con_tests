const { request, response } = require("express");
const jwt_decode = require("jwt-decode");

const Task = require("../models/task");

// GET /tasks: Retrieve a list of all tasks. The list should be returned in JSON format.
const getTasks = async (req, res) => {
  const { limit = 5, from = 0, ...data } = req.query;

  if (Object.keys(data).length > 0) {
    const generalFilter = await Task.find(data);
    return res.json({
      generalFilter,
    });
  } else {
    const [total, task] = await Promise.all([
      // Cuenta cuantos datos guardados hay
      Task.countDocuments(),
      // Filtra segun el query, con skip dice desde donde y limit dice cuantos
      Task.find()
        //skip saltea y limit da la cantidad
        .skip(Number(from))
        .limit(Number(limit)),
    ]);
    res.json({
      total,
      task,
    });
  }
};

// GET /tasks/:id: Retrieve a single task by ID. The task should be returned in JSON format.
const getTaskId = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  try {
    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Error retrieving task",
    });
  }

  res.json(task);
};

/**
 *POST /tasks: Create a new task. The request body should contain the task details in JSON format. The task should have the following fields:
name: The name of the task (required).
description: A description of the task (optional).
completed: A boolean indicating whether the task has been completed (default: false).
 */
const postTasks = async (req, res) => {
  let { name, description = "", completed = false } = req.body;
  const { token } = req.headers;

  const tokenDecoded = jwt_decode(token);
  const { uid } = tokenDecoded;
  name = name.trim().toUpperCase();
  description = description.trim().toUpperCase();

  // TENGO QUE AGREGAR EL PATH USUARIO
  const newTask = new Task({ name, description, completed, uid });

  await newTask.save();

  res.json({
    newTask,
  });
};

// PUT /tasks/:id: Update a single task by ID. The request body should contain the updated task details in JSON format.
const putTasks = async (req = request, res = response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const actualizacion = await Task.findByIdAndUpdate(id, data, { new: true });
  res.json(actualizacion);
};

// DELETE /tasks/:id: Delete a single task by ID.
const deleteTasks = async (req, res) => {
  const { id } = req.params;
  const borrar = await Task.findByIdAndDelete(id);
  res.json(borrar);
};

module.exports = {
  getTasks,
  getTaskId,
  postTasks,
  putTasks,
  deleteTasks,
};
