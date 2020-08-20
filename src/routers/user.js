const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')

const router = new express.Router();    //important to create a router

const avatar = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if( (!file.originalname.endsWith('.jpg')) && (!file.originalname.endsWith('.pdf')) ) {
            return cb(new Error('must be a *.jpg file'))
        }
        cb(undefined, true)
    }
})

//  >>>>>SIGNUP
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token })
    } catch (e) { res.status(400).send(e) }
})

//  >>>>>LOGIN
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        // res.send(user)
        const token = await user.generateAuthToken();
        // res.send({user: user.getPublicProfile(), token })      //optional
        res.send({ user, token })
    } catch (e) { res.status(400).send() }
})

//  >>>>>LOGOUT
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokenArr) => {   //giving filter a function
            return tokenArr !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) { res.status(500).send('ohh ohh') }
})

//  >>>>>LOGOUT ALL
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send()
    } catch (e) { res.status(500).send('ohh fuckkk') }
})

//  >>>>>GET MY DATA
router.get('/users/me', auth, async (req, res) => {
    try {
        // const users = await User.find({})
        res.send(req.user)
    } catch (e) { res.status(500).send() }
})

//  >>>>>UPDATE USER
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) { return res.status(400).send({ error: 'Invalid updates!' }) }
    try {
        updates.forEach((update) => {    req.user[update] = req.body[update]    })
        await req.user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // if (!user) { return res.status(404).send() }
        res.send(req.user)
    } catch (e) { res.status(400).send(e) }
})

//>>>>>>>>>>>>>>>> DELETE A USER
router.delete('/users/me', auth , async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) { return res.status(404).send() }
        await req.user.remove()
        res.send(req.user)
    } catch (e) { res.status(500).send() }
} )

router.post('/users/me/avatar', avatar.single('upload') , (req, res) => {
    res.send()
})

module.exports = router