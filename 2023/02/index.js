const { getInput } = require("../../utils/index.js");

const input = getInput(__dirname);



function parseGame() {
    return input.map(parseGameLine);
}

// Example input
// Game #: 1 red, 19 green; 4 blue, 6 green; 12 green, 2 red
function parseGameLine(line) {
    // split the line between the Game number and the info about the game
    const [game, gameInfo] = line.split(': ');
    const gameId = parseInt(game.split(" ")[1]);
    const sets = gameInfo.split(";").map(parseGameSet);

    const maximums = sets.reduce((maximums, set) => {
        Object.keys(set.colors).forEach(color => {
            maximums[color] = Math.max(maximums[color] || 0, set.colors[color]);
        });
        return maximums;
    }, {});

    const power = Object.values(maximums).reduce((power, val) => {
        return power * val;
    }, 1);

    return { game, gameId, sets, maximums, power }
}

function parseGameSet(gameInfo) {
    const picks = gameInfo.split(",").map(pick => {
        const [count, color] = pick.trim().split(" ");
        return { count: parseInt(count), color };
    });

    const colors = picks.reduce((colors, pick) => {
        colors[pick.color] = (colors[pick.color] || 0) + pick.count;
        return colors;
    }, {});

    return { colors };
}



function solvePartOne() {
    const games = parseGame(input);

    const available = {
      red: 12,
      green: 13,
      blue: 14,
    };

    const validGames = games.filter(game => {
        return Object.keys(game.maximums).every(color => {
           return game.maximums[color] <= available[color];
        });
    }) ;

   return validGames.reduce((sum, game) =>  sum + game.gameId, 0);
}

function solvePartTwo() {
    const games = parseGame(input);
    return games.reduce((sum, game) => sum + game.power, 0);
}


console.log("Part 1 Solution:", solvePartOne());
console.log("Part 2 Solution:", solvePartTwo());
