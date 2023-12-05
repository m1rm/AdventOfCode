const fs = require('fs')
const readline = require('readline')

const redCubes = 12 
const greenCubes = 13
const blueCubes = 14

/**
 * 
 * @param {*} draws 
 * @returns zero if the draw is impossible, 1 if it is possible
 */
function evaluateDraws(draws) {
    let r = 1
    for (const draw of draws) {
        const tmp = draw.split(' ') // 15 red
        const drawNum = +tmp[1] //bc. I failed to trim the whitespace

        if (draw.indexOf('red') !== -1 && drawNum > redCubes){ r = 0 }  
        if (draw.indexOf('blue') !== -1 && drawNum > blueCubes) { r = 0 }
        if (draw.indexOf('green') !== -1 && drawNum > greenCubes) { r = 0 }
    }
    return r
}

/**
 * 
 * @param {*} line 
 * @returns game number if the game is possible, zero if not
 */
function evaluateGame(line){
    const tmp = line.split(':')
    const game = tmp[0].trim()
    const gameNum = game.split(' ')[1].trim()
    const gameResults = tmp[1].split(';')

    r = 1
    for (const round of gameResults) { // 15 red, 5 blue, 3 green
        const draws = round.split(',')
        const drawEvResult = evaluateDraws(draws)
        if (drawEvResult === 0) {
            r = 0
            break
        } else {
            r = +gameNum
        }
    }
    return r
}

async function processLineByLine() {

    const fileStream = fs.createReadStream('challenge_input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let nums = []
    for await (const line of rl) {
        const num = evaluateGame(line)
        nums.push(num)
    }

    const sum = nums.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    },0);

    console.log(sum)
}

processLineByLine()