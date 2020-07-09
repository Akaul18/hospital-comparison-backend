require('dotenv').config()
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')

const Hospital = require('./model/hospital')
const Clinic = require('./model/clinic')

const app = express()

app.use(cors())
app.use(bodyparser.json())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

var db = mongoose.connection

db.on('error', () => {
    console.log('error')
})

db.once('open', () => {
    console.log('connected to mongodb')
})

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`)
    next()
})

app.post('/searchQuery', (req, res) => {
    console.log(req.body.searchinput)
    Hospital.find()
        .and([
            {
                $or: [
                    {
                        hospName: {
                            $regex: req.body.searchinput,
                            $options: 'i',
                        },
                    },
                    { city: { $regex: req.body.searchinput, $options: 'i' } },
                    {
                        department: {
                            $regex: req.body.searchinput,
                            $options: 'i',
                        },
                    },
                    {
                        diseases: {
                            $regex: req.body.searchinput,
                            $options: 'i',
                        },
                    },
                ],
            },
            { city: req.body.searchcity },
        ])
        .sort({ rating: -1 })
        .exec((err, docs) => {
            if (!err) {
                res.send(docs)
                console.log(docs)
                console.log(docs.length)
            }
        })
})

app.get('/searchQuery', (req, res) => {
    // Hospital.find({hospName: { $in: [
    //     mongoose.Types.ObjectId('5d3896a9b0fb2809211ec3ec'),

    Hospital.find({
        hospName: {
            $in: [
                'Surrey Memorial Hospital',
                "BC Children's Hospital",
                'Vancouver General Hospital - Willow Pavilion',
            ],
        },
    }).then((docs) => {
        res.send(docs)
    })
})

app.post('/querySearch/singleHospital', (req, res) => {
    Hospital.find({ hospName: req.body.hospName }, (err, docs) => {
        if (!err) {
            res.json(docs)
        }
    })
})

app.post('/searchQuery2', (req, res) => {
    console.log(req.body.hospCheck)
    console.log(hospCheck)
    if (req.body.hospCheck == 'true') {
        Hospital.find({
            $or: [
                { hospName: req.body.searchcity1.trim() },
                { hospName: req.body.searchcity2.trim() },
            ],
        }).exec((err, docs) => {
            if (err) {
                console.log(err)
            } else {
                res.json(docs)
            }
        })
    } else {
        Clinic.find({
            $or: [
                { clinicName: req.body.searchcity1.trim() },
                { clinicName: req.body.searchcity2.trim() },
            ],
        }).exec((err, docs) => {
            if (err) {
                console.log(err)
            } else {
                res.json(docs)
            }
        })
    }
})
let hospCheck

app.post('/searchQueryfilter', (req, res) => {
    console.log(req.body)

    let city1, city2, city3, city4
    let dept1, dept2, dept3, dept4, dept5

    hospCheck = req.body.hospital

    if (req.body.vancouver == true) {
        city1 = req.body.vancouver1
    } else {
        city1 = ''
    }

    if (req.body.surrey == true) {
        city2 = req.body.surrey1
    } else {
        city2 = ''
    }

    if (req.body.langley == true) {
        city3 = req.body.langley1
    } else {
        city3 = ''
    }

    if (req.body.burnaby == true) {
        city4 = req.body.burnaby1
    } else {
        city4 = ''
    }

    if (req.body.cardiology == true) {
        dept1 = req.body.cardiology1
    } else {
        dept1 = ''
    }
    if (req.body.ent == true) {
        dept2 = req.body.ent1
    } else {
        dept2 = ''
    }
    if (req.body.gas == true) {
        dept3 = req.body.gas1
    } else {
        dept3 = ''
    }
    if (req.body.gynae == true) {
        dept4 = req.body.gynae1
    } else {
        dept4 = ''
    }
    if (req.body.ortho == true) {
        dept5 = req.body.ortho1
    } else {
        dept5 = ''
    }

    if (req.body.hospital === true) {
        Hospital.find({
            $and: [
                { city: { $in: [city1, city2, city3, city4] } },
                {
                    department: {
                        $in: [dept1, dept2, dept3, dept4, dept5],
                    },
                },
            ],
        })
            .sort({ rating: -1 })
            .exec((err, docs) => {
                if (!err) {
                    res.send(docs)
                    console.log(docs)
                    console.log(docs.length)
                }
            })
    } else if (req.body.walkin == true) {
        Clinic.find({
            $and: [
                { city: { $in: [city1, city2, city3, city4] } },
                {
                    department: {
                        $in: [dept1, dept2, dept3, dept4, dept5],
                    },
                },
            ],
        })
            .sort({ rating: -1 })
            .exec((err, docs) => {
                if (!err) {
                    res.send(docs)
                    console.log(docs)
                    console.log(docs.length)
                }
            })
    }
})
app.listen(3000, () => console.log('Server Running'))
