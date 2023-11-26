import React from 'react';
import Player from '../utils/Player.ts';
//import PlayerManager from '../utils/PlayerManager';

const PlayerContext = React.createContext({
    players: Player.getEmptyPlayerArray(),

    // eslint-disable-next-line no-unused-vars
    addPlayer: (name: string, color: string): boolean => {
        return false;
    },
    getCurrentPlayer: (): Player | undefined => {
        return undefined;
    },
    getNextPlayer: (): Player | undefined => {
        return undefined;
    },
    // eslint-disable-next-line no-unused-vars
    setCurrentPlayer: (name: string) => {},
    rotate: () => {},
    reset: () => {},
    getCurrentRound: (): number => {
        return 0;
    },
});

// costum hook
export function usePlayers(): Player[] {
    const context = React.useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayers must be used within a PlayingProvider');
    }
    return context.players;
}

export function useAddPlayer() {
    const context = React.useContext(PlayerContext);
    if (!context) {
        throw new Error('useAddPlayer must be used within a PlayingProvider');
    }
    return context.addPlayer;
}

export function useGetCurrentPlayer() {
    const context = React.useContext(PlayerContext);
    if (!context) {
        throw new Error(
            'useGetCurrentPlayer must be used within a PlayingProvider'
        );
    }
    return context.getCurrentPlayer;
}
export function useGetNextPlayer() {
    const context = React.useContext(PlayerContext);
    if (!context) {
        throw new Error(
            'useGetNextPlayer must be used within a PlayingProvider'
        );
    }
    return context.getNextPlayer;
}

export function useSetCurrentPlayer() {
    const context = React.useContext(PlayerContext);
    if (!context) {
        throw new Error(
            'useSetCurrentPlayer must be used within a PlayingProvider'
        );
    }
    return context.setCurrentPlayer;
}

export function useRotate() {
    const context = React.useContext(PlayerContext);
    if (!context) {
        throw new Error('useRotate must be used within a PlayingProvider');
    }
    return context.rotate;
}

export function useGetCurrentRound() {
    const context = React.useContext(PlayerContext);
    if (!context) {
        throw new Error(
            'useGetCurrentRound must be used within a PlayingProvider'
        );
    }
    return context.getCurrentRound;
}

export function usePlayerReset() {
    const context = React.useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayerReset must be used within a PlayingProvider');
    }
    return context.reset;
}

export function PlayerProvider({ children }) {
    const [players, setPlayers] = React.useState<Player[]>(
        Player.getEmptyPlayerArray()
    );

    const [currentPlayer, setCurrentPlayer] = React.useState<
        Player | undefined
    >(undefined);

    const addPlayer = (name: string, color: string): boolean => {
        for (let i = 0; i < players.length; i++) {
            if (players[i].name === name) {
                return false;
            }
        }
        const newPlayer = new Player(name, color);
        players.push(newPlayer);
        setPlayers(players);

        if (currentPlayer === undefined) {
            setCurrentPlayer(newPlayer);
        }
        return true;
    };

    const getCurrentPlayer = (): Player | undefined => {
        return currentPlayer;
    };
    const getNextPlayer = (): Player | undefined => {
        if (currentPlayer === undefined) {
            return undefined;
        }

        let index = players.indexOf(currentPlayer);
        // remove player at index
        players.splice(index, 1);
        players.push(currentPlayer);
        return players[0];
    };

    const setCurrentPlayerName = (name: string) => {
        players.forEach((player) => {
            if (player.name === name) {
                setCurrentPlayer(player);
                return;
            }
        });
    };

    const rotate = async () => {
        if (currentPlayer === undefined) {
            return;
        }

        let index = players.indexOf(currentPlayer);
        // remove player at index
        players.splice(index, 1);
        // add player at index to end of array
        currentPlayer.round++;
        players.push(currentPlayer);
        await setCurrentPlayer(players[0]);
        await setPlayers(players);
    };

    const getCurrentRound = (): number => {
        let round = 1;
        players.forEach((player, index) => {
            if (index === 0) {
                round = player.round;
                return;
            }

            if (round > player.round) {
                round = player.round;
            }
        });
        return round;
    };

    const reset = () => {
        setPlayers(Player.getEmptyPlayerArray());
    };

    return (
        <PlayerContext.Provider
            value={{
                players: players,
                addPlayer: addPlayer,
                getCurrentPlayer: getCurrentPlayer,
                rotate: rotate,
                setCurrentPlayer: setCurrentPlayerName,
                getCurrentRound: getCurrentRound,
                getNextPlayer: getNextPlayer,
                reset: reset,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
}
