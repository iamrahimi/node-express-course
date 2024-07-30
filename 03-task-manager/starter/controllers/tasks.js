const express = require("express");
const Task = require('../models/tasks');

 const GetAllTasks = async (req, res) => {
    try {
        const task = await Task.find({})
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error})
    }
 }
 
 const AddTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({"msg": error})
    }
    
 }

 const GetTask = async (req, res) => {
    try {
        const {id:TaskID} = req.params;
        const task = await Task.findOne({_id:TaskID})
        if(!task)
            return res.status(404).json({msg: `No task with id ${TaskID}`});
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg:error});
        
    }
 }

 const EditTask = async (req, res) => {
    try {
        
        const {id:TaskID} = req.params;
        
        const task = await Task.findOneAndUpdate({_id:TaskID}, req.body, {new: true, runValidators: true});
        if(!task)
            return res.status(404).json({msg: `No task with id ${TaskID}`});

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg:error});
    }
 }

 const DeleteTask = async (req, res) => {
    try {
        const {id:TaskID} = req.params;
        const task = await Task.findOneAndDelete({_id:TaskID});
        if(!task)
            return res.status(404).json({msg: `No task with id ${TaskID}`});

        res.status(200).json({msg: "successfully deleted"});
    } catch (error) {
        res.status(500).json({msg:error});
    }
 }




 module.exports  = {
    GetAllTasks, 
    AddTask, 
    GetTask,
    EditTask,
    DeleteTask
 }


