import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import GameDao from "./GameDao";
import process from "process";
const app = express();

app.use(cors())
app.use(bodyParser.json())

app.get('/game/:gameId', function (req, resp) {
    const game = GameDao.getGame(req.params.gameId);

    if (game) {
        resp.json({
            state: game.state,
            isFinished: game.isGameFinished()
        });
    } else {
        resp.status(404).send();
    }
})

app.post('/game/:gameId/checkWon', function (req, resp) {
    const id = req.params.gameId;
    const game = GameDao.getGame(id);
    const userId = req.body.userId;

    if (game) {
        resp.json({
            player_won: game.checkUserWon(userId)
        })
    } else {
        resp.status(404).send();
    }
})

app.post('/game/create', function (req, resp) {
    const game = GameDao.createGame();

    resp.json({
        id: game.id,
        userId: game.user1Id
    });
});

app.post('/game/:gameId/join', function (req, resp) {
    const id = req.params.gameId;
    const game = GameDao.getGame(id);

    if (game) {
        resp.json({
            userId: game.joinUser()
        })
    } else {
        resp.status(404).json({
            status: 'Not Found'
        });
    }
})

app.post('/game/:gameId/move', function (req, resp) {
    const id = req.params.gameId;

    const userId = req.body.userId;
    const [x, y] = req.body.move;

    const game = GameDao.getGame(id);

    if (game) {
        resp.json({
            success: game.move(userId, x, y)
        });
    } else {
        resp.status(404).send();
    }
})

const server = app.listen(process.env.PORT || '8888', () => {
    const {port} = server.address() as any;

    console.log(`Server is running port: ${port}`)
})
