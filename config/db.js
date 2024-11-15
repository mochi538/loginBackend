const mongoose = require('mongoose');

const conexionDB = async()=>{
    try{
        mongoose.conncet("mongodb+srv://mochi5384:AALTBTPX_X@cluster0.rkfo3qm.mongodb.net/loginUsers?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Coneixión a la base de datos exitosa")
    }
    catch(e){
        console.log("Erroso al conectar la base de datos")
    }
}

module.exports = conexionDB;