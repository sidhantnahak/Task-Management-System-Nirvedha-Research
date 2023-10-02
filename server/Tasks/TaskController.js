const express = require('express');
const { taskDataValidation } = require('./task_user.validation');
const { validationResult } = require('express-validator')
const router = express.Router();
const Task = require('./TaskSchema');
const axios = require('axios');
const { isAuthenticated } = require('./isAuth');


router.post('/addtask', taskDataValidation,isAuthenticated, async (req, res) => {

    try {
        const { title, description, status } = req.body;

        if (!title || !description) {
            return res.status(401).json({ message: "enter required fields", sucess: false })
        }
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg, sucess: false })

        }
        await Task.create({
            user:req.id,
            title,
            description,
            status

        })
        return res.status(200).json({ message: "Task created successfully", sucess: true });

    } catch (error) {
        return res.status(500).json({ message: error.message, sucess: false });

    }
})


router.get('/task/:id',isAuthenticated, async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        return res.status(200).json({ task: task, sucess: true });

    } catch (error) {
        return res.status(500).json({ message: error.message, sucess: true });

    }
})


router.put('/task/:id', taskDataValidation,isAuthenticated, async (req, res) => {

    try {
        const { title, description, status } = req.body;
        const { id } = req.params
        if (!title || !description) {
            return res.status(401).json({ message: "enter required fields", sucess: false })
        }
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg, sucess: false })

        }
        await Task.findByIdAndUpdate(id, { title, description, status });
        return res.status(200).json({ message: "Task updated successfully", sucess: true });

    } catch (error) {
        return res.status(500).json({ message: error.message, sucess: false });

    }
})


router.delete('/task/:id',isAuthenticated, async (req, res) => {

    try {
        const { id } = req.params
        const task = await Task.findById(id);
        if (!task) {
            return res.status(400).json({ message: "Task not found", sucess: true });

        }
        await Task.findByIdAndDelete(id);
        return res.status(200).json({ message: "Task deleted successfully", sucess: true });

    } catch (error) {
        return res.status(500).json({ message: error.message, sucess: false });

    }
})


router.get('/getalltask',isAuthenticated, async (req, res) => {

    try {
        const tasks = await Task.find({user:req.id});
        return res.status(200).json({ tasks: tasks, sucess: true });

    } catch (error) {
        return res.status(500).json({ message: error.message, sucess: true });

    }
})



module.exports = router