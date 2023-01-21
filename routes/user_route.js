const express = require('express')
const router = express.Router()

const User = require('../models/user_model')

// create
router.post('/addUser', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    User.findOne({ email: req.body.email }).then(_user => {
        if (_user) {
            return res.json({ success: false, message: `EMAIL ALREADY TAKEN!` })
        } else {
            user.save().then(_user => {
                return res.json({ success: true, message: `USER ADDED! NAME: ${_user.name}` })
            }).catch(error => { 
                console.log('AN ERROR OCCURED!', error)
                return res.json({ success: false, message: `AN ERROR OCCURRED! ${error}` })
            })
        }
    })
})

// read
router.get('/getUsers', (req, res) => {
    User.find({}).then(_users => {
        if (_users) {
            return res.json({ success: true, users: _users })
        } else {
            return res.json({ success: false, message: `NO USERS FOUND!` })
        }
    }).catch(error => {
        console.log('AN ERROR OCCURED!', error)
        return res.json({ success: false, message: `AN ERROR OCCURRED! ${error}` })
    })
})

// update
router.patch('/updateUser/:id', (req, res) => {
    let id = req.params.id

    User.findByIdAndUpdate({ _id: id }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
    }, { $new: true }).then(_update => {
        if (_update) {
            return res.json({success: true, message: 'USER UPDATED!'})
        } else {
            return res.json({ success: false, message: 'UPDATED FAILED!' })
        }
    }).catch(error => {
        console.log('AN ERROR OCCURED!', error)
        return res.json({ success: false, message: `AN ERROR OCCURRED! ${error}` })
    })
})

// delete
router.post('/deleteUser/:id', (req, res) => {
    let id = req.params.id

    User.findByIdAndRemove({ _id: id }).then((_user) => {
        if (_user) {
            return res.json({ success: true, message: 'USER DELETED!' })
        } else {
            return res.json({ success: false, message: 'USER NOT FOUND!' })
        }
    }).catch(error => {
        console.log('AN ERROR OCCURED!', error)
        return res.json({ success: false, message: `AN ERROR OCCURRED! ${error}` })
    })
})

module.exports = router