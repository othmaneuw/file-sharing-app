require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const File = require('./models/file');


const app = express();

app.use(cors());
app.use(express.static("uploads"))


app.use('/api/files',require('./routes/files'));
app.use('/api/files/download',require('./routes/download'));


app.use('/test',(req,res)=>{
       res.download("./hello.txt");
})

mongoose.connect(process.env.MONGO_CONNECTION_URL)
       .then(res =>{
        app.listen(PORT,()=>console.log('Listening on port 4000...'))
       })
       .catch(err => console.log(err))

const PORT = process.env.PORT || 4000;

