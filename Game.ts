import { v4 as uuid } from 'uuid';

const TEAM_X = 'X';
const TEAM_O = 'O';

export class Game {
    public gameId: any;
    public teamX: any = null;
    public teamO: any = null;
    public finished: boolean = false;
    public teamWinner: 'X' | 'O' | null = null;
    public activeTeam: 'X' | 'O' = TEAM_X;

    public state: any = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    constructor() {
        this.gameId = uuid();
    }

    join(team: 'X' | 'O') {
        if (team === 'X' && !this.teamX) {
            return this.teamX = uuid()
        } else if (team === 'O' && !this.teamO) {
            return this.teamO = uuid()
        }

        return false
    }

    isValidPlayer(playerId) {
        return playerId === this.teamX || playerId === this.teamO;
    }

    move(playerId, x, y) {
        if (this.finished) {
            return false;
        }

        const team = playerId === this.teamX ? TEAM_X : playerId === this.teamO ? TEAM_O : null;

        if (team !== this.activeTeam) {
            console.log('Wrong Team trying to move')
            return false;
        }

        if (this.state[x]?.[y] !== 0) {
            console.log('Incorrect coordinates')
            return false;
        }

        this.state[x][y] = team;
        this.activeTeam = team === TEAM_X ? TEAM_O : TEAM_X;


        if (this.isTeamWon(team)) {
            this.finished = true;
            this.teamWinner = team;
        } else if (!this.hasMoves()) {
            this.finished = true;
        }

        return true;
    }

    hasMoves() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.state[i][j] === 0) {
                    return true;
                }
            }
        }

        return false;
    }

    isTeamWon(team: 'X' | 'O') {
        for (let i = 0; i < 3; i++) {
            if (this.state[i][0] === team && this.state[i][1] === team && this.state[i][2] === team) {
                return true; //columns
            }

            if (this.state[0][i] === team && this.state[1][i] === team && this.state[2][i] === team) {
                return true; //rows
            }
        }

        //crosses
        return ( this.state[0][0] === team && this.state[1][1] === team && this.state[2][2] === team ) ||
            ( this.state[0][2] === team && this.state[1][1] === team && this.state[2][0] === team )
    }

    serialize() {
        return {
            state: this.state,
            isGameReady: !!(this.teamO && this.teamX),
            isTeamOReady: !!this.teamO,
            isTeamXReady: !!this.teamX,
            isGameFinished: this.finished,
            winner: this.teamWinner,
            activeTeam: this.activeTeam,
        }
    }
}
