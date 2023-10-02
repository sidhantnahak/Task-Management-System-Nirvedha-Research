const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"To Do"

    }
})

module.exports=mongoose.model("Task",taskSchema);