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

function evaluateScratchcards(matrix) {

    let amountOfCardsWonPerCard = []
    for (let i = 0; i < matrix.length; i++) {
        const game = matrix[i]
        const winningCards = findIntersection(game)
        const amountOfWonCards = winningCards.length
        amountOfCardsWonPerCard.push(amountOfWonCards)
    }

    // @see https://github.com/TineArconn/advent_of_code/blob/main/day4.js#L24
    // idk if I will ever understand this :D
    let total = 0
    const recursiveCount = (subList, completeList, actualPosition) => {
        let subTotal = 0;
        for (let i in subList) {
          const index = Number(i);
          const nextPart = completeList.slice(
            actualPosition + index + 1,
            actualPosition + index + subList[i] + 1
          );
          subTotal +=
            1 + recursiveCount(nextPart, completeList, actualPosition + index + 1);
        }
        return subTotal;
      };

      for (let cardIndex = 0; cardIndex < amountOfCardsWonPerCard.length; cardIndex++) {
        const start = cardIndex + 1
        const end = cardIndex + 1 + amountOfCardsWonPerCard[cardIndex]
        const nextPart = amountOfCardsWonPerCard.slice(start, end);
        total += 1 + recursiveCount(nextPart, amountOfCardsWonPerCard, cardIndex + 1);
      }

    return total
}

function main() {
    const input = fs.readFileSync('challenge_input.txt', 'utf8').trimEnd();
    
    const matrix = parseInput(input)

    const winningNumbersPerGame = evaluateGames(matrix)
    const points = countPoints(winningNumbersPerGame)
    console.log('Part 1: ', points)

    const totalWonCards = evaluateScratchcards(matrix)
    console.log('Part 2: ', totalWonCards)
}


main()