import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import process from "process";
import {Game} from "./Game";
const app = express();

app.use(cors())
app.use(bodyParser.json())

const games = {};

app.get('/game/:gameId', function (req, resp) {
    const game = games[req.params.gameId];

    if (!game) {
        resp.status(404).send();
        return;
    }

    resp.json(game.serialize())
})

app.post('/game/create', function (req, resp) {
    const game = new Game();

    games[game.gameId] = game;

    resp.status(201).send(game.gameId);
});

app.post('/game/join', function (req, resp) {
    const game = games[req.body.gameId];

    if (!game) {
        resp.status(404).send();
        return;
    }

    const playerId = game.join(req.body.team)

    if (!playerId) {
        resp.status(400).send();
        return;
    }

    resp.send(playerId);
})

app.post('/game/move', function (req, resp) {
    const game = games[req.body.gameId];
    const playerId = req.body.playerId;
    const X = parseInt(req.body.X, 10);
    const Y = parseInt(req.body.Y, 10);

    if (!game) {
        resp.status(404).send();
        return;
    }

    if (!game.isValidPlayer(playerId)) {
        resp.status(403).send();
        return;
    }

    resp.send(game.move(playerId, X, Y));
});

const server = app.listen(process.env.PORT || '8888', () => {
    const {port} = server.address() as any;

    console.log(`Server is running port: ${port}`)
})
