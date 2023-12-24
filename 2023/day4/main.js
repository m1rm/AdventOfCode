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

function findWonCopies(n, game) {
    console.log('Game ', n, ': ', game)
    let wonCopies = []
    const filteredArray = game[0].filter(value => game[1].includes(value));
    console.log('filteredArray: ', filteredArray)
    if (filteredArray.length > 0) {
        for (let i = 0; i < filteredArray.length; i++) {
            wonCopy = n+i+1
            wonCopies.push(wonCopy)
        }
    }
    return wonCopies
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

function evaluateScratchcards(matrix) {

    let wonCopiesPerGame = []
    // TODO: loop this & abort if no more copies are yielded
    for(let i = 0; i < matrix.length; i++) {
        const game = matrix[i]
        const wonCopies = findWonCopies(i+1, game)
        wonCopiesPerGame.push(wonCopies)
    }
    return wonCopiesPerGame
}

function main() {
    const input = fs.readFileSync('test_input.txt', 'utf8').trimEnd();
    
    const matrix = parseInput(input)

    const winningNumbersPerGame = evaluateGames(matrix)
    const points = countPoints(winningNumbersPerGame)
    console.log('Part 1: ', points)

    const processScratchcards = evaluateScratchcards(matrix)
    console.log(processScratchcards)
    // const totalCards = countScratchcards(processScratchcards)
    // console.log('Part 2: ', totalCards)
    
}


main()