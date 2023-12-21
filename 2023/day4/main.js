const fs = require('fs')

function parseInput(input) {
    const lines = input.split("\n");
    const ret = []
    const regex = /^Card [0-9]+: /;    
    lines.forEach(function(line) {
        tmp = line.replace(regex, "")
        const splitSidesArray = tmp.split("|").map((element) => element.trim())
        tmp2 = splitSidesArray.map((side) => side.split(/ +/))
        ret.push(tmp2)
    })
    return ret
}

function evaluateGames(matrix) {
    let intersections = []
    matrix.forEach(function(game) {
        const intersection = findIntersection(game)
        intersections.push(intersection)
    }) 
    return intersections
}

function findIntersection(game) {
    const filteredArray = game[0].filter(value => game[1].includes(value));
    return filteredArray
}

function calculatePoints(result) {
    if (result.length === 0) {
        return 0
    }
    return Math.pow(2, result.length-1)
}

function countPoints(winningNumbers) {
    const pointsPerGame = winningNumbers.map(result => calculatePoints(result))

    const sum = pointsPerGame.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      },0);
    
      return sum
}

function main() {
    const input = fs.readFileSync('challenge_input.txt', 'utf8').trimEnd();
    
    const matrix = parseInput(input)

    const winningNumbersPerGame = evaluateGames(matrix)

    const points = countPoints(winningNumbersPerGame)
    console.log('Part 1: ', points)
    
}


main()