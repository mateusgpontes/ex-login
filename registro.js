//Chamadas dos pacotes:
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usuario = require('./app/models/usuario');
const app = express();

//URI: Mlab:
/*mongoose.connect('mongodb://<mateus>:mateus12>@ds227853.mlab.com:27853/bancologin', {
    useNewUrlParser: true
});*/

//Local: mongoDb:
mongoose.connect('mongodb://localhost:27017/bancologin', {
    useNewUrlParser: true
} );

//Configuração do app para usar o 'bodyParser()':
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//Definindo rota e criando rota via Express:
const port = process.env.port || 3000;
const router = express.Router();

//Rota de exemplo:
router.get('/teste', (req, res) => {
    res.json({ message: 'Testando API'})
});

/*
app.use(expressMongoDb('mongodb://mateus:mateus12@ds227853.mlab.com:27853/bancologin?authSource=admin'));

function fichaUsuario(dados){
 
    let UsuarioLogin = {
        nome: dados.nome,
        senha: dados.senha
    }

}

function buscaID(dados){

    let query = {
        _id: mongodb(dados)
    }

}

router.post('/registrar', (req, res) => {

    let novoUsuario = fichaUsuario(req.body);

    req.db.collection('usuarios').insert(novoUsuario, (error) => {

        if(error){
            res.status(500).send("Erro ao registrar usuário");
            return;
        }

            res.send(req.body);

    })
});

router.get('/registrados', (req, res) => {

    req.db.collection('usuarios').find().toArray((error, data))

        if(error){
            res.status(500).send("erro ao acessar o banco de dados");
            return;
        }

            res.send(data);

});

router.get('/registrados/:id', (req, res) => {

    let query = buscaID(req.params.id);

    req.db.collection('usuarios').findOne(query, (error, data) => {
        
        if(error){
            res.status(500).send("erro ao acessar o banco de dados");
            return;
        }
        
        if(!data){
            res.status(404).send("esse usuario não existe");
            return;
        }

            res.send(data);

    })
    
});

router.put('/registrados/:id', (req, res) => {

    let usuario = fichaUsuario(req.body);

    let query = buscaID(req.params.id);

    req.db.collection('usuarios').updateOne(query, usuario, (error, data) => {

        if(error){
            res.status(500).send("erro ao acessar o banco de dados");
            return;
        }
        
        if(!data){
            res.status(404).send("esse usuario não existe");
            return;
        }

            res.send(data);

    })

});

router.delete('/registrados/:id', (req, res) => {

    let query = buscaID(req.params.id);

    req.db.collecton('usuarios').deleteOne(query, (error, data) => {

        if(error){
            res.status(500).send('erro ao acessar o banco de dados');
            return;
        }

        res.send(data);

    })

});
*/

//Definindo um padrão rotas prefixadas: '/api':
app.use('/api', router);

//Iniciando a Aplicação:
app.listen(port);
console.log('Rodando na porta:' + port);