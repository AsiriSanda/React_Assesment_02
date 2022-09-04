const express = require('express')
const mysql = require('mysql')
const db = require('../config/db.config')

const connection = mysql.createConnection(db.database)
connection.connect(function(err)  {
    if (err){
        console.log(err)
    }else {
        console.log('connected to my sql')
    }
})

const router = express.Router()

router.get('/', (req, res) =>{
    res.send("customer get")
})

router.post('/', (req, res) =>{
    res.send("customer Post")
})

//----------------------
router.put('/', (req, res) =>{
    res.send("customer Put")
})

router.delete('/:id', (req, res) =>{
    console.log(req.params.id)
    res.send("customer delete")
})

router.get('/:id', (req, res) =>{
    res.send("customer Post")
})

//-----------------------
module.exports = router
