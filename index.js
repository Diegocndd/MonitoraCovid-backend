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

app.post('/create-reservation', (req, res) => {
    /**
     * timestamp generated with the code example:
     * new Date(2022, 6, 14, 10, 15).getTime();
     */

    /**
     * TODO:
     * 1. Verificar se os tipos que chegam no endpoint estão corretos
     * 2. Retornar o código correto
     */
    database.addReservation(req.body);
    res.status(200).send('Reservation added');
});

app.get('/get-reservations', (req, res) => {
    if (req.query.user) {
        database.getReservationsByUser(req.query.user, (err, result) => {
            if (err) {
                res.status(400).send('Server error');
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
            return;
        });
    } else if (req.query.room) {
        database.getReservationsByRoom(req.query.room, (err, result) => {
            if (err) {
                res.status(400).send('Server error');
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
            return;
        });
    } else {
        res.status(400).send('Server error');
    }
});

app.get('/get-rooms', (req, res) => {
    database.getRooms((err, result) => {
        if (err) {
            res.status(400).send('Server error');
        } else {
            res.status(200).json(result);
        }
        return;
    });
});

app.post('/delete-reservation', (req, res) => {
    database.deleteReservation(req.body.id_reservation);
    res.status(200).send('Reservation deleted');
});

app.post('/enter-room', (req, res) => {
    database.confirmReservation(req.body, (err, result) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send('Acesso liberado!');
        }
        console.log(err);
    });
});

app.post('/login', (req, res) => {
    database.loginUser(req.body, (err, result) => {
        if (err) {
            res.status(400).send('Username or password incorret');
        } else if (result) {
            res.status(200).send(result);
        }
    });
})

app.listen(port, () => {
    /**
     * Converter para fuso certo
     * var d = new Date();
     * d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
     */
    console.log('Servidor rodando na porta ' + port);
});
