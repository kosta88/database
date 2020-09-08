const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer') //image filter
const sharp = require('sharp');  // image crop and resize
const { sendWelcomeMail, sendCancelMail } = require('../emails/account')

const router = new express.Router();    //important to create a router

const upload = multer({
    // dest: 'images',          //chooose local dir
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        // if( (!file.originalname.endsWith('.jpg')) && (!file.originalname.endsWith('.pdf')) )
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {  //>>>>>>>>>>>>>> MATCH ALLOWS>>> REGULAR EXPRESSIONS!!!!!!
            return cb(new Error('must be a >.jpg or >.png file'))
        }
        cb(undefined, true)
    }
})

//  >>>>>SIGNUP
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        sendWelcomeMail(user.email, user.name)          //can await cAUSE A PROMISE IS RETURNED
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
        updates.forEach((update) => { req.user[update] = req.body[update] })
        await req.user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // if (!user) { return res.status(404).send() }
        res.send(req.user)
    } catch (e) { res.status(400).send(e) }
})

//>>>>>>>>>>>>>>>> DELETE A USER
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.removeTasks();
        await User.deleteOne({ _id: req.user._id })
        sendCancelMail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) { res.status(500).send() }
})

//>>>>>>>>>>>>>>>>      UPLOAD PIC
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // req.user.avatar = req.file.buffer
    const bufferModifiedIMG = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = bufferModifiedIMG
    await req.user.save()
    res.send()
}, (error, req, res, next) => {         //<<<<<   COMES AT THE END AND HAVE A CERTAIN CALL ARRANGMENT
    res.status(400).send({ error: error.message })
})

//>>>>>>>>>>>>>>>> DELETE A photo
router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch (e) { res.status(500).send() }
})


router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')      //express uses that to parse the res
        res.send(user.avatar)
    } catch (e) {

    }
})

module.exports = router