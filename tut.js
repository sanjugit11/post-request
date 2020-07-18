// const http = require('http');
// const fs = require ('fs');

// const read = fs.readFileSync("tut.html", "utf-8");

// const server = http.createServer((req,res)=>{
//     res.end(read);
// });
// server.listen(3000 ,()=>{
//     console.log("servers");
// });
// const tut = require("./tut.html")
const path = require("path");
const express = require("express");
const app = express();
const port = 3030;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DanceContact',{useNewUrlParser:true ,useUnifiedTopology: true });

var danceSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: Number,
    kuch:String,
    address: String
});

var danceModel = mongoose.model('DContact',danceSchema);


// app.use('/static' , express.static('static'))
//  app.set('view engine', 'pug')
// app.set('view', path.join(__dirname,'views'))


app.get("/", (req,res)=>{
    res.sendFile( path.join(__dirname, '/tut.html'));
});

app.post('/',(req,res)=>{
    var myData = new danceModel(req.body);
    myData.save().then(()=>{
        res.send("data is now saved");

    }).catch(()=>{
        res.status(400).send("items have error");
    })
})

//app.use('/static' ,express.static('public'));
app.use(express.static(path.join(__dirname,"public")));

app.listen(port ,()=>{
   console.log(`server is runnning on ${port}`);

});
