const express = require('express')
const mysql = require('mysql')
const db = require('../config/db.config')

const connection = mysql.createConnection(db.database)
connection.connect(function(err)  {
    if (err){
        console.log(err)
    }else {
        console.log('connected to my sql')
        var customerTableQuery = "CREATE TABLE IF NOT EXISTS ITEM (id VARCHAR(255) PRIMARY KEY ,name VARCHAR(255),price DOUBLE,qty int(10))"
        connection.query(customerTableQuery, function (err,result){
            if (err) throw err;
            if (result.warningCount === 0)
            console.log("item table created");
        })
    }
})

const router = express.Router()

router.get('/', (req, res) =>{
    var query = "SELECT * FROM item";
    connection.query(query, (err, rows) =>{
        if (err) throw err
        res.send(rows)
    })

})

router.post('/', (req, res) =>{
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const qty = req.body.qty;
    var query = "INSERT INTO item (id, name, price, qty ) VALUES (?, ?, ?, ?)";
    connection.query(query, [id, name, price, qty ], (err)=>{
        if (err){
            res.send({'message':'duplicate Entry'})
        }else {
            res.send({'message':'item created'})
        }
    })
})

//----------------------
router.put('/', (req, res) =>{
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const qty = req.body.qty;
    var query = "UPDATE item SET name=?, price=?, qty=? WHERE id=?";
    connection.query(query, [name, price, qty, id ], (err, rows)=>{
        if (err) throw err;

        if (rows.affectedRows > 0){
            res.send({'message': 'item updated'})
        }else{
            res.send({'message': 'item not found'})
        }
    })
})

router.delete('/:id', (req, res) =>{
    const id =req.params.id
    var query = "DELETE FROM item WHERE id=?";
    connection.query(query, [id], (err, rows)=>{
        if (err) throw err;
        if (rows.affectedRows>0){
            res.send({'message':'item deleted'})
        }else {
            res.send({'message':'no such item'})
        }
    })
})

router.get('/:id', (req, res) =>{
    const id=req.params.id;
    var query="SELECT * FROM item WHERE id=?";
    connection.query(query,[id],(err,rows)=>{
        if (err)throw err;
        res.send(rows)
    })
})

//-----------------------
module.exports = router
