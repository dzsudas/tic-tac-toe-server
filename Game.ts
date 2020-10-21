import { v4 as uuid } from 'uuid';

export class Game {
    public id: any;
    public state = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    private step = 0;
    public user1Id: any;
    public user2Id: any;
    public currentPlayer = null;
    public winner: any;

    constructor() {
        this.id = uuid();
        this.user1Id = uuid();
    }

    public joinUser() {
        if (!this.user1Id) {
            return this.user1Id = uuid()
        } else if (!this.user2Id) {
            this.currentPlayer = this.user1Id;

            return this.user2Id = uuid()
        }

        return false;
    }

    public isGameStarted() {
        return !!this.currentPlayer;
    }

    public checkUserWon(userId) {
        const code = userId === this.user1Id ? 1 : 2;

        for (let i = 0; i < 3; i++) {
            if (this.state[i][0] === code && this.state[i][1] === code && this.state[i][2] === code) {
                return true; //columns
            }

            if (this.state[0][i] === code && this.state[1][i] === code && this.state[2][i] === code) {
                return true; //rows
            }
        }

        //crosses
        return ( this.state[0][0] === code && this.state[1][1] === code && this.state[2][2] === code ) ||
            ( this.state[0][2] === code && this.state[1][1] === code && this.state[2][0] === code )
    }

    public isGameFinished() {
        return this.winner || this.step === 9;
    }

    public move(userId, x, y) {
        if (x < 0 || x > 2 || y < 0 || y > 2 || userId !== this.currentPlayer || this.state[x][y]) return false;

        this.state[x][y] = userId === this.user1Id ? 1 : 2;

        this.step++;

        if (this.checkUserWon(userId)) {
            return this.winner = userId;
        }

        this.currentPlayer = this.currentPlayer === this.user1Id ? this.user2Id : this.user1Id;

        return true;
    }
}
