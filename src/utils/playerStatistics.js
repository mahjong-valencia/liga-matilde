// src/utils/playerStatistics.js

import { calculateRanking } from "./ranking.js";

export function getPlayerStatistics(data, playerId) {

    playerId = Number(playerId);

    const player = data.players.find(p => p.id === playerId);

    const ranking = calculateRanking(data);

    const rankingPosition =
        ranking.findIndex(p => p.id === playerId) + 1;

    const games = [];

    data.games.forEach(game => {

        const result = game.results.find(r => r.playerId === playerId);

        if (result) {

            games.push({

                date: game.date,
                tp: result.tp,
                sp: result.sp

            });

        }

    });

    const totalGames = games.length;

    const wins = games.filter(g => g.tp === 4).length;

    const averageTp =
        totalGames
            ? games.reduce((s, g) => s + g.tp, 0) / totalGames
            : 0;

    const averageSp =
        totalGames
            ? games.reduce((s, g) => s + g.sp, 0) / totalGames
            : 0;

    const bestGame =
        totalGames
            ? games.reduce((a, b) => a.sp > b.sp ? a : b)
            : null;

    const worstGame =
        totalGames
            ? games.reduce((a, b) => a.sp < b.sp ? a : b)
            : null;

    const positions = {

        first: games.filter(g => g.tp === 4).length,
        second: games.filter(g => g.tp === 2).length,
        third: games.filter(g => g.tp === 1).length,
        fourth: games.filter(g => g.tp === 0).length

    };

    return {

        player,

        rankingPosition,

        totalGames,

        wins,

        winRate:
            totalGames
                ? wins * 100 / totalGames
                : 0,

        averageTp,

        averageSp,

        bestGame,

        worstGame,

        positions,

        games

    };

}