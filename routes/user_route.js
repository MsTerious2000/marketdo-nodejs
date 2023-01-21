const express = require('express')
const router = express.Router()

const User = require('../models/user_model')

// create
router.post('/addUser', (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        username: req.body.username,
    })

    User.findOne({ username: req.body.username }).then(_user => {
        if (_user) {
            return res.json({ success: false, message: `USERNAME ALREADY TAKEN!` })
        } else {
            user.save().then(_user => {
                return res.json({ success: true, message: `USER ADDED!` })
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
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            username: req.body.username,
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