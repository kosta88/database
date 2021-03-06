const express = require('express')
const Task = require('../models/tasks')
const auth = require('../middleware/auth')

const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=false
router.get('/tasks', auth, async (req, res) => {
    const match ={}
    match.completed = req.query.completed === 'true'
    const sortTypee = toString(req.query).includes('decs') ? 1 : -1
    try {
        // const userTasks = await Task.find({ owner: req.user._id}).populate('tasks')
        const userTasks = await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            },
            sort: {
                completed : sortTypee
            }
        }).execPopulate()
        res.send(userTasks.tasks)
    } catch (e) {    res.status(500).send()    }
})


router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        // const task = await Task.findById(req.params.id)
        if (!task) { return res.status(404).send() }
        updates.forEach((update) => { task[update] = req.body[update] })
        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router