const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const LoginModel = require('./model/LoginModel')
const dotenv = require('dotenv') 
const app = express()
const path = require('path')

app.use(bodyParser.json())
app.use(cors())
dotenv.config();

mongoose.connect(process.env.CONNECTION_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
   // useCreateIndex:true
})
.then(console.log("Connect To  database"))
.catch((err => console.log(`Error 20setr  ${err}`)))





app.get('/api/login',(req,res)=>{
    
    LoginModel.find().then(logins => res.json(logins));
       
})



app.post('/api/register', async (req,res)=>{
    const name = req.body.name
    const password = req.body.password
    try{
    const newLogin = new LoginModel({
        name: name,
        password:password
    })

    const loginin = await newLogin.save();
    res.status(200).json(loginin)
    }catch(err){
        console.log(`Error ${err}`);
    }
})






app.use(express.static(path.join(__dirname, "/client/build")));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

const PORT = process.env.PORT || 3002

app.listen(PORT,()=>{
    console.log(`Run http://localhost:${PORT}`)
})