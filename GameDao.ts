import {Game} from "./Game";

const games = {};

export default class {
    public static getGame(id): Game | null {
        return games[id];
    }

    public static createGame() {
        const game = new Game();

        games[game.id] = game;

        return game;
    }
}
