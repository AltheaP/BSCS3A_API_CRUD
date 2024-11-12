//instantiation
//import express API framework
const express = require("express")
const app = express();
const moment = require('moment')
//importing mysql
const mysql = require("mysql")
//port number
const PORT = process.env.PORT || 5000;

const logger = (req, res, next) =>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()} `)
    next()
}

app.use(logger)
//connection to mysql
const connection = mysql.createConnection({
    host: "bmix5lkljpjozaesn25j-mysql.services.clever-cloud.com",
    user: "ucxd8z4ufrksc4cm",
    password: "pTZyaV36KWhUUaIkL3mE",
    database: "bmix5lkljpjozaesn25j",
});

//initilization of connection
connection.connect();


//API - REPORT
//GET request and response are the parameters
app.get("/api/members", (req, res) =>{
    //create a query
    connection.query("SELECT * FROM userdata",(err, rows, fields)=>{
        //checking errors
        if(err) throw err;
        //response
        //key value pair
        res.json(rows);
    });
});

//API - REPORT - SEARCH
//passing the id parameter
//request - >>> front-end ID
app.get("/api/members/:id",(req, res)=>{
    const id=req.params.id; 
    connection.query(`SELECT * FROM product WHERE id='${id}'`, (err, rows, fields)=>{
        if(err) throw err;

        if(rows.length > 0){
            res.json(rows);
        }else{
            res.status(400).json({msg: `${id} id not found!`})
        }
    })
    //res.send(id);
})

//DELETE API
app.use(express.urlencoded({ extended: false}));
app.delete("/api/members", (req, res) =>{
    const id=req.body.id;
    connection.query(`DELETE FROM product`, (err, rows, fields)=>{
        if(err) throw err
        res.json({msg: `Successfully deleted!`})
    })
})


app.listen(5000, () => {
    console.log(`Server is running in port ${PORT}`);
})
