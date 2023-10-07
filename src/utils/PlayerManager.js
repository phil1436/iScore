import Player from './Player';

class PlayerManager {
    static players = [];
    static currentPlayer = undefined;

    static addPlayer(name, color) {
        this.players.forEach((player) => {
            if (player.name === name) {
                return false;
            }
        });
        this.players.push(new Player(name, color));
        return true;
    }

    static setCurrentPlayer(name) {
        this.players.forEach((player) => {
            if (player.name === name) {
                PlayerManager.currentPlayer = player;
            }
        });
    }
    static rotate() {
        let index = this.players.indexOf(this.currentPlayer);
        // remove player at index
        this.players.splice(index, 1);
        // add player at index to end of array
        this.currentPlayer.round++;
        this.players.push(this.currentPlayer);
        // set currentPlayer to first player in array
        this.currentPlayer = this.players[0];
    }

    static getCurrentRound() {
        let round = undefined;
        this.players.forEach((player) => {
            if (round === undefined) {
                round = player.round;
            } else if (round > player.round) {
                round = player.round;
            }
        });
        if (round === undefined) {
            round = 1;
        }
        return round;
    }
}

export default PlayerManager;