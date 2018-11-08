//Chamadas dos pacotes:
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
let usuarioColl = require('./app/models/usuario');

mongoose.Promise = global.Promise;

//URI: Mlab:
mongoose.connect('mongodb://mateus:mateus12@ds227853.mlab.com:27853/bancologin', {
    useNewUrlParser: true
});

//Local: mongoDb:
/*mongoose.connect('mongodb://localhost:27017/bancologin', {
    useNewUrlParser: true
});*/

//Configuração do app para usar o 'bodyParser()':
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Definindo rota e criando rota via Express:
const port = process.env.port || 3000;
const router = express.Router();

router.use((req, res, next) => {
    console.log('Rota iniciada');
    next();
});

//Adiciona e busca o nome e a senha do usuario ao banco de dados:
router.route('/usuarios')

    .post((req, res) => {

        let usuario = usuarioColl();

        usuario.nome = req.body.nome;
        usuario.senha = req.body.senha;

        usuario.save((error) => {
            if(error){
                res.status(500).send('Erro ao tentar salvar o usuario...' + error);
                return;
            }

            res.json({ message: 'Usuario salvo com sucesso'});
        });
    })

    .get((req, res) => {
        usuarioColl.find((error, usuarios) => {
            if(error){
                res.status(500).send('Erro ao acessar banco de dados...' + error);
                return;
            }

            res.json(usuarios);
        });
    });

    //Loga usuario:
    router.route('/usuarios/login')

    .post((req, res) => {

        let query = {
            nome: req.body.nome,
            senha: req.body.senha
        }

        usuarioColl.findOne(query, (error, data) =>{
            if(error){
                res.status(500).send('Error ao acessa banco de dados...' + error);

            }
            if(!data){
                res.status(401).send('Nome ou senha não encontrados');

            }else(data)
                res.json({ menssage: 'Logado com sucesso'});

        });
            
    })

    //Busca/atualiza e deleta por id
    router.route('/usuarios/:usuario_id')

    .get((req, res) => {

        usuarioColl.findById(req.params.usuario_id, (error, usuario) => {
            if(error){
                res.status(500).send('Id do usuario não encontrado...' + error);
                return;
            }

            res.json(usuario);
        });
    })

    .put((req, res) => {

        usuarioColl.findById(req.params.usuario_id, (error, usuario) => {
            if(error){
                res.status(500).send('Id do usuario não encontrado' + error);
                return;
            }

            usuario.nome = req.body.nome;
            usuario.senha = req.body.senha;

            usuario.save((error) => {
                if(error){
                    res.status(500).send('Erro ao atualizar o usuario...' + error);
                    return;
                }

                res.json({ message: 'Usuario atualizado com sucesso.'});
            });
        });
    })

    .delete((req, res) => {
        usuarioColl.deleteOne({
            _id: req.params.usuario_id
        },
        (error) => {
            if(error){
                res.status(500).send('Id não encontrado...' + error);
                return;
            }
            
            res.json({ menssage: 'Usuario excluido com sucesso.' })
        })
    });

//Definindo um padrão rotas prefixadas: '/api':
app.use('/api', router);

//Iniciando a Aplicação:
app.listen(port);
console.log('Rodando na porta:' + port);