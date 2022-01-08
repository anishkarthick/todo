const express = require('express')
const Task = require('../models/Task')
const router = new express.Router()
const {ensureAuthenticated} = require('../middleware/auth');

//task routes
router.post('/addTask', ensureAuthenticated, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        })
        await task.save()
        res.json({ msg: 'success' });
    } catch (e) {
        res.json({ msg: 'error' });
    }
})

router.get('/getTasks', ensureAuthenticated, async (req, res) => {
    try {
        await req.user.populate('tasks')
        res.json({ msg: 'success', data: req.user.tasks });
    } catch (e) {
        res.json({ msg: 'error' });
    }
})

router.get('/getTask/:id', ensureAuthenticated, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        res.json({ msg: 'success', data: task });
    } catch (e) {
        res.json({ msg: 'error' });
    }
})

router.put('/updateTask/:id', ensureAuthenticated, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'status']
    const isValidOperations = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperations) {
        return res.json({ msg: 'error' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owmer: req.user._id })
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.json({ msg: 'success' });
    } catch (e) {
        console.log(e)
        res.json({ msg: 'error' });
    }
})

router.delete('/deleteTask/:id', ensureAuthenticated, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.body.id, owmer: req.user._id })      //web
     //   const task = await Task.findOneAndDelete({ _id: req.params.id, owmer: req.user._id }) //api
        res.json({ msg: 'success'});
    } catch (e) {
        console.log(e)
        res.json({ msg: 'error' });
    }
})

module.exports = router