const fs = require('fs')

const charCodeZero = "0".charCodeAt()
const charCodeNine = "9".charCodeAt()
const charCodeDot = ".".charCodeAt()
const charCodeGear = "*".charCodeAt()

function createMatrix(input) {
    let matrix = []
    const lines = input.split("\n")
    for (line of lines) {
        const splitLine = line.split("")
        matrix.push(splitLine)
    }

    return matrix
}

function isNumber(n) {
    const charcode = n.charCodeAt()
    return (charcode >= charCodeZero && charcode <= charCodeNine);
}

// the matrix has either numbers, dots or any symbol
function isSymbol(n) {
    const charcode = n.charCodeAt()
    return (!isNumber(n) && charcode !== charCodeDot)
}

function isGear(n) {
    const charcode = n.charCodeAt()
    return (charcode === charCodeGear)
}

// an index (x or y) can never be negative
// an index (x) cannot be bigger than the current row lenght
// an index (y) cannot be bigger than the length of the matrix
function checkForAdjacentSymbol(matrix,x,y) {

    const rowLength = matrix[y].length
    const matrixLength = matrix.length

    // NORTH = above row
    const northWestX = x-1
    const northEastX = x+1
    // northX = x
    const northY = y-1

    let shouldCheckNorthWest = false
    let shouldCheckNorth = false
    let shouldCheckNorthEast = false
    // assert validity of northern coordinates
    if (northY > 0 && northY < matrixLength) {
        shouldCheckNorthWest = northWestX > 0 && northWestX < rowLength
        shouldCheckNorth = x > 0 && x < rowLength
        shouldCheckNorthEast = northEastX > 0 && northEastX < rowLength
    }

    // SAME row
    const westX = x-1
    const eastX = x+1
    // sameY = y

    let shouldCheckWest = false
    let shouldCheckEast = false
    if (y > 0 && y < matrixLength) {
        shouldCheckWest = westX > 0 && westX < rowLength
        shouldCheckEast = eastX > 0 && eastX < rowLength
    }

    // SOUTH = below row
    const southWestX = x-1
    const southEastX = x+1
    // southX = x
    const southY = y+1

    let shouldCheckSouthWest = false
    let shouldCheckSouth = false
    let shouldCheckSouthEast = false
    if (southY > 0 && southY < matrixLength) {
        shouldCheckSouthWest = southWestX > 0 && southWestX < rowLength
        shouldCheckSouth = x > 0 && x < rowLength
        shouldCheckSouthEast = southEastX > 0 && southEastX < rowLength
    }


    let is_valid = false
    // NORTH CHECKS
    if (shouldCheckNorthWest) {
        is_valid = isSymbol(matrix[northY][northWestX])
    }
    if (is_valid) {
        return true
    }
    if (shouldCheckNorth) {
        is_valid = isSymbol(matrix[northY][x])
    }
    if (is_valid) {
        return true
    }
    if (shouldCheckNorthEast) {
        is_valid = isSymbol(matrix[northY][northEastX])
    }
    if (is_valid) {
        return true
    }

    // SAME ROW CHECKS
    if (shouldCheckWest) {
        is_valid = isSymbol(matrix[y][westX])
    }
    if (is_valid) {
        return true
    }
    if (shouldCheckEast) {
        is_valid = isSymbol(matrix[y][eastX])
    }
    if (is_valid) {
        return true
    }

    // SOUTH CHECKS
    if (shouldCheckSouthWest) {
        is_valid = isSymbol(matrix[southY][southWestX])
    }
    if (is_valid){
        return true
    }
    if (shouldCheckSouth) {
        is_valid = isSymbol(matrix[southY][x])
    }
    if (is_valid) {
        return true
    }
    if (shouldCheckSouthEast) {
        is_valid = isSymbol(matrix[southY][southEastX])
    }
    if (is_valid) {
        return true
    }
    return false
}

function checkNextSymbol(matrix,x,y) {
    if (matrix[y][x+1] && isNumber(matrix[y][x+1])) {
        return true
    } else {
        return false
    }
}

function findValidNumbers(matrix) {
    
    validNumberObjects = []
    matrix.forEach(function (line, y) 
    {
        let num = { 'numString': '', 'is_valid': false }

        line.forEach(function(char, x)
        {
            if (isNumber(char)) {
                num['numString']+= char

                const hasAdjacentSymbol = checkForAdjacentSymbol(matrix,x,y)
                if (hasAdjacentSymbol) {
                    num['is_valid'] = true
                }

                const isNextSymbolNumber = checkNextSymbol(matrix,x,y)
                if (!isNextSymbolNumber) {
                    validNumberObjects.push(num)
                    num = { 'numString': '', 'is_valid': false }
                }
            }

        })
    });
    
    return validNumberObjects
}

function solvePartOne(matrix) {
    const numbers = findValidNumbers(matrix)
    numbers1 = []

    for (numObj of numbers) {
        if(numObj['is_valid']) {
            numbers1.push(parseInt(numObj['numString']))
        }
    }

    const resultPart1 = numbers1.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      },0);

    console.log(resultPart1)
}

function solvePartTwo(matrix) {
    let gearNumbers = []
    matrix.forEach(function(line, y) {
        line.forEach(function(char, x) {
            if(isGear(char)) {
                let numbers = [];
                // thx https://github.com/TheCarbophile/Advent-of-Code-2023/blob/main/Day%203/index.js#L60C65-L60C65
                for (let j = y - 1; j <= y + 1; j++) {
                    if (matrix[j] !== undefined) {
                        for (let k = x - 1; k <= x + 1; k++) {
                            if (matrix[j][k] !== undefined) {
                                if (isNumber(matrix[j][k])) {
    
                                    //Backtrack from the digit touching the gear to find the beginning of the number and construct it from there
                                    let number = '';
                                    // if matrix[j][k] is undefined, regex.test() can handle it
                                    // nonetheless
                                    while (/\d/.test(matrix[j][k])) {
                                        k--;
                                    }
                                    k++;
                                    while (/\d/.test(matrix[j][k])) {
                                        number += matrix[j][k];
                                        k++;
                                    }
                                    numbers.push(parseInt(number));
                                }
                            }
                        }
                    }
                }
                if (numbers.length === 2) {
                    gearNumbers.push(numbers[0] * numbers[1]);
                }
            }
        })
    })
    const resultPart2 = gearNumbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      },0);

    console.log(resultPart2)

}
 

function main() {
    const input = fs.readFileSync('challenge_input.txt', 'utf8').trimEnd();
    const matrix = createMatrix(input)

    // solvePartOne(matrix)
    solvePartTwo(matrix)

}


main()