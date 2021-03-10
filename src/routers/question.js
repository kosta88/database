const express = require('express')
const Question = require('../models/questions')
const randomNumEveryDay = require('../middleware/runOnceAday')


const router = new express.Router();

router.get('/questions', async (req, res) => {
    var questions;
    try {
        var randomNum = Math.floor(Math.random() * 100) % 5;
        if (randomNum == 0) {
            questions = await Question.find().sort({ question: 1 });
        } else if (randomNum == 1) {
            questions = await Question.find().sort({ question: -1 });
        } else if (randomNum == 2) {
            questions = await Question.find().sort({ correct: 1 });
        } else if (randomNum == 3) {
            questions = await Question.find().sort({ correct: -1 });
        } else if (randomNum == 4) {
            questions = await Question.find().sort({ a: 1 });
        } else {
            questions = await Question.find().sort({ by: 1 });
        }
        res.send(questions)
    } catch (e) { res.status(500).send() }
})


// router.get('/questionOfTheDay', async (req, res) => {
//     try {
//             var randomNum = Math.floor(Math.random()* 1000) % 33
//         const questions = await Question.find();
//         const rndNumber = randomNumEveryDay.job();
//         res.send(questions[rndNumber])
//     } catch (e) {    res.status(500).send()    }
// })

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