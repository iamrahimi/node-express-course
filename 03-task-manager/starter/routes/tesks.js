const express = require('express');
const router = express.Router();
const {GetAllTasks, 
    AddTask,
    GetTask,
    EditTask, 
    DeleteTask} = require('../controllers/tasks')

router.route('/').get(GetAllTasks).post(AddTask);

router.route('/:id').get(GetTask).patch(EditTask).delete(DeleteTask);


module.exports = router;