const mongoose = require('mongoose');
const Task = require('../models/task');

exports.list_all_tasks = function (req, res) {
    Task.find({}, function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
}

exports.create_task = function (req, res) {
    const newTask = new Task(req.body);
    newTask.save(function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
}

exports.read_task = function (req, res) {
    Task.findById(req.params.taskId, function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
}

exports.update_task = function (req, res) {
    Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true },
        function (err, task) {
            if (err) res.send(err);
            res.json(task);
        });
}

exports.delete_task = function (req, res) {
    Task.deleteOne({ _id: req.params.taskId }, function(err, task) {
        if (err) res.send(err);
        res.json({ message: 'Task deleted' });
    });
}

