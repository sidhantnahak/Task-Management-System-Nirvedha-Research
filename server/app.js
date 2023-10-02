const express = require('express');
const app = express();
const cors=require('cors')
const bodyparser=require('body-parser')
const tasks=require('./Tasks/TaskController');
const users=require('./Tasks/userController')
const dotenv=require('dotenv')
const cookieparser=require("cookie-parser")



app.use(cookieparser())
app.use(express.json())
app.use(cors())
app.use(bodyparser.urlencoded({extended:true}))

app.use('/api/v1',tasks)
app.use('/api/v1',users)

module.exports = app