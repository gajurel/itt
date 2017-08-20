const User = require('../models/user');
const Project = require('../models/project');
const Task = require('../models/task');
const config = require('../config/database');

module.exports = (router) => {

    router.post('/createTask', (req, res) => {
        if (!req.body.name) {
            res.json({ success: false, message: 'You must provide task name' });
        }
        else {
            if (!req.body.description) {
                res.json({ success: false, message: 'You must provide task description' });
            } else {
                if (!req.body.createdLoginId) {
                    res.json({ success: false, message: 'LoginId not provided' });
                } else {
                    if (!req.body.createdBy) {
                        res.json({ success: false, message: 'Username not provided' });
                    } else {
                        if (!req.body.status) {
                            res.json({ success: false, message: 'Task priority is required!' });
                        } else {
                            if (!req.body.assignee) {
                                res.json({ success: false, message: 'Assignee name is needed!' });
                            } else {
                                if (!req.body.startDate) {
                                    res.json({ success: false, message: 'Task start date is required!' });
                                } else {
                                    if (!req.body.dueDate) {
                                        res.json({ success: false, message: 'Task due date is required' });
                                    } else {
                                        let task = new Task({
                                            name: req.body.name,
                                            description: req.body.description,
                                            createdLoginId: req.body.createdLoginId,
                                            createdBy: req.body.createdBy,
                                            status: req.body.status,
                                            priority: req.body.priority,
                                            assignee: req.body.assignee,
                                            startDate: req.body.startDate,
                                            dueDate: req.body.dueDate,
                                            estimatedTime: req.body.estimatedTime,
                                            percentDone: req.body.percentDone,
                                        });

                                        task.save((err, data) => {
                                            if (err) {
                                                if (err.errors) {
                                                    if (err.errors.status) {
                                                        res.json({ success: false, message: err.errors.status.message });
                                                    } else {
                                                        if (err.errors.priority) {
                                                            res.json({ success: false, message: err.errors.priority.message });
                                                        } else {
                                                            if (err.errors.assignee) {
                                                                res.json({ success: false, message: err.errors.assignee.message });
                                                            } else {
                                                                if (err.errors.startDate) {
                                                                    res.json({ success: false, message: err.errors.name.startDate });
                                                                } else
                                                                    res.json({ success: false, message: err });
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    res.json({ success: false, message: 'Could not save user. Error: ', err });
                                                }
                                            } else {
                                                res.json({ success: true, data: data, message: 'New Task has been created! Redirecting to task page' });
                                            }
                                        });
                                    }
                                }
                            }
                        }


                    }
                }
            }
        }
    });

    router.get('/getSingleTask/:taskId', (req, res) => {
        if (!req.params.taskId) {
            res.json({ success: false, message: 'Task id not provided!' });
        } else {
            Project.find({ _id: req.params.taskId }, (err, task) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (!task) {
                        res.json({ success: false, message: 'Task does not exist' });
                    } else {
                        res.json({ success: true, task: task });
                    }
                }
            });
        }
    });
    return router;
}
