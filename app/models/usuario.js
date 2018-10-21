//Chamadas dos pacotes:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsuarioSchema = new Schema({
    nome: String,
    sehna: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);