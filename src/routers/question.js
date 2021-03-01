const express = require('express')
const Question = require('../models/questions')

const router = new express.Router();


router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.send(questions)
    } catch (e) {    res.status(500).send()    }
})


router.post('/questions', async (req, res) => {
    const question = new Question({
        ...req.body,
    })
    try {
        await question.save()
        res.status(201).send(question)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router