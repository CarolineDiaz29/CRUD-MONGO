const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    animal : {
        type : String,
        required: true
    },
    raza : {
        type : String,
        required: true
    },
    age : {
        type : Number,
        required: true
    },
    service : {
        type : String,
        required: true
    },
    name2 : {
        type : String,
        required: true
    },
    phone : {
        type : Number,
        required: true
    },
    email : {
        type: String,
        required: true,
    }
    
})

const Mascotas = mongoose.model('mascotas', schema);

module.exports = Mascotas;