// src/utils/ranking.js

export function calculateRanking(data) {

    const players = {};

    data.players.forEach(player => {

        players[player.id] = {

            id: player.id,
            name: player.name,
            games: []

        };

    });

    data.games.forEach(game => {

        game.results.forEach(result => {

            players[result.playerId].games.push({

                tp: result.tp,
                sp: result.sp,
                date: game.date

            });

        });

    });

    const ranking = Object.values(players).map(player => {

        const last10 = [...player.games]

            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10);

        const best7 = [...last10]

            .sort((a, b) => b.tp - a.tp)

            .slice(0, 7);

        while (best7.length < 7) {

            best7.push({
                tp: 0,
                sp: 0
            });

        }

        const avgTp = best7.reduce((sum, game) => sum + game.tp, 0) / 7;

        const avgSp = best7.reduce((sum, game) => sum + game.sp, 0) / 7;

        return {

            id: player.id,
            name: player.name,
            avgTp,
            avgSp

        };

    });

    ranking.sort((a, b) => {

        if (b.avgTp !== a.avgTp)
            return b.avgTp - a.avgTp;

        return b.avgSp - a.avgSp;

    });

    return ranking;

}