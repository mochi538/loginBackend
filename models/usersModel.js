const mongoose =  require('mongoose')

const schema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
    },
    correo:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require: true
    }
})

const User = mongoose.model('users', schema)

model.exports = User;