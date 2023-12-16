const fs = require('fs')

const charCodeZero = "0".charCodeAt()
const charCodeNine = "9".charCodeAt()
const charCodeDot = ".".charCodeAt()

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
        // console.log('shouldCheckNorthWest')
        // console.log('y, northY: ', y, ',' , northY)
        // console.log('x, northWestX', x , ',', northWestX)
        // console.log('matrix[northY][northWestX]: ', matrix[northY][northWestX])
        is_valid = isSymbol(matrix[northY][northWestX])
    }
    if (is_valid) {
        // console.log('Is valid in line 91: ', is_valid)
        return true
    }
    if (shouldCheckNorth) {
        // console.log('shouldCheckNorth')
        // console.log('y, northY: ', y, ',' , northY)
        // console.log('x', x)
        // console.log('matrix[northY][x]: ', matrix[northY][x])
        is_valid = isSymbol(matrix[northY][x])
    }
    if (is_valid) {
        // console.log('Is valid in line 102: ', is_valid)
        return true
    }
    if (shouldCheckNorthEast) {
        // console.log('shouldCheckNorthEast')
        // console.log('y, northY: ', y, ',' , northY)
        // console.log('x, northEastsX', x , ',', northEastX)
        // console.log('matrix[northY][northEastX]: ', matrix[northY][northEastX])
        is_valid = isSymbol(matrix[northY][northEastX])
    }
    if (is_valid) {
        // console.log('Is valid in line 113: ', is_valid)
        return true
    }

    // SAME ROW CHECKS
    if (shouldCheckWest) {
        // console.log('shouldCheckWest')
        // console.log('y', y)
        // console.log('x, westX', x , ',', westX)
        // console.log('matrix[y][westX]: ', matrix[y][westX])
        is_valid = isSymbol(matrix[y][westX])
    }
    if (is_valid) {
        // console.log('Is valid in line 126: ', is_valid)
        return true
    }
    if (shouldCheckEast) {
        // console.log('shouldCheckEast')
        // console.log('y', y)
        // console.log('x, eastX', x , ',', eastX)
        // console.log('matrix[y][eastX]: ', matrix[y][eastX])
        is_valid = isSymbol(matrix[y][eastX])
    }
    if (is_valid) {
        // console.log('Is valid in line 137: ', is_valid)
        return true
    }

    // SOUTH CHECKS
    if (shouldCheckSouthWest) {
        // console.log('shouldCheckSouthWest')
        // console.log('y , southY', y, ',', southY)
        // console.log('x, southWestX', x , ',', southWestX)
        // console.log('matrix[southY][southWestX]: ', matrix[southY][southWestX])
        is_valid = isSymbol(matrix[southY][southWestX])
    }
    if (is_valid){
        // console.log('Is valid in line 150: ', is_valid)
        return true
    }
    if (shouldCheckSouth) {
        // console.log('shouldCheckSouth')
        // console.log('y , southY', y, ',', southY)
        // console.log('x', x )
        // console.log('matrix[southY][x]: ', matrix[southY][x])
        is_valid = isSymbol(matrix[southY][x])
    }
    if (is_valid) {
        // console.log('Is valid in line 161: ', is_valid)
        return true
    }
    if (shouldCheckSouthEast) {
        // console.log('shouldCheckSouthEast')
        // console.log('y , southY', y, ',', southY)
        // console.log('x, southEastX', x , ',', southEastX)
        // console.log('matrix[southY][southEastX]: ', matrix[southY][southEastX])
        is_valid = isSymbol(matrix[southY][southEastX])
    }
    if (is_valid) {
        // console.log('Is valid in line 172: ', is_valid)
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
            // console.log('current char: ', char)
            // console.log('x,y: ', x, ',', y)
            if (isNumber(char)) {
                // concatenate found number to numString
                num['numString']+= char
                // find out if current number under investigation has an adjacent symbol
                const hasAdjacentSymbol = checkForAdjacentSymbol(matrix,x,y)
                // set is_valid to true if it was not true yet && if an adjacent symbol was found
                if (hasAdjacentSymbol) {
                    num['is_valid'] = true
                }
                // if next symbol is not a number, add num to array and rest it
                const isNextSymbolNumber = checkNextSymbol(matrix,x,y)
                if (!isNextSymbolNumber) {
                    // console.log('next symbol ist NaN')
                    validNumberObjects.push(num)
                    num = { 'numString': '', 'is_valid': false }
                }
            }

        })
    });
    
    return validNumberObjects
}
 

function main() {
    const input = fs.readFileSync('test_input.txt', 'utf8').trimEnd();
    const matrix = createMatrix(input)

    const validNumbers = findValidNumbers(matrix)
    console.log(validNumbers)
    // const sum = sum(validNumbers)
    // console.log(sum)
}


main()