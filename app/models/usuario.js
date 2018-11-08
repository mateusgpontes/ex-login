//Chamadas dos pacotes:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Usuario = new Schema({
    nome: String,
    senha: String
});

module.exports = mongoose.model('Usuario', Usuario);