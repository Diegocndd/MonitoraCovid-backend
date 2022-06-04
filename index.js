require('dotenv').config();
const database = require('./src/database/index');

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(require('cors')());
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.post('/register', (req, res) => {
    /**
     * TODO:
     * 1. Verificar se os tipos que chegam no endpoint estão corretos
     * 2. Retornar o código correto
     */
    database.addUser(req.body);
    res.status(200).send('User added');
});

app.post('/create-room', (req, res) => {
    /**
     * TODO:
     * 1. Verificar se os tipos que chegam no endpoint estão corretos
     * 2. Retornar o código correto
     */
    database.addRoom(req.body);
    res.status(200).send('Room added');
});

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});
