const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const ToDoModel = require('./models/todoModel')

require('dotenv').config()
app.use(cors())
app.use(express.json())

//connect database
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('database is connected'))
.catch((err)=> console.log(err))

//CRUD operations
//1- create user in db
app.post('/create', async(req,res)=>{
    const {text}= req.body;
    const newUser = new ToDoModel({text})
    await newUser.save()
    res.send('added successfuly')
})

//2- read from db
app.get('/users', async(req,res)=>{
    const users = await ToDoModel.find()
    res.send(users)
})

//3- update 
app.put('/update', async(req,res)=>{
    const {_id , text}= req.body;
     await ToDoModel.findByIdAndUpdate(_id, text)
    res.send('updated successfully')
})

//4-delete
app.delete('/delete',async(req,res)=>{
    const {_id}= req.body;
    await ToDoModel.findByIdAndDelete(_id)
    res.send('deleted successfully')
})

const PORT = process.env.PORT || 5000

app.listen(process.env.PORT, ()=>{
    console.log('server is ruuning')
})