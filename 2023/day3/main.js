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
    return (n.charCodeAt() >= charCodeZero && n.charCodeAt() <= charCodeNine);
}

function isSymbol(n) {
    return (!isNumber(n) || n.charCodeAt()!== charCodeDot)
}

function checkForAdjacentSymbol(matrix,x,y) {
    if ( matrix[x-1][y] && isSymbol(matrix[x-1][y]) ||
         matrix[x+1][y] && isSymbol(matrix[x+1][y]) ||
         matrix[x-1][y+1] && isSymbol(matrix[x-1][y+1]) ||
         matrix[x][y+1] && isSymbol(matrix[x][y+1]) ||
         matrix[x+1][y+1] && isSymbol(matrix[x+1][y+1]) ||
         matrix[x-1][y-1] && isSymbol(matrix[x-1][y-1]) ||
         matrix[x][y-1] && isSymbol(matrix[x][y-1]) ||
         matrix[x+1][y-1] && isSymbol(matrix[x+1][y-1])
    )
    {
        return true
    } else {
        return false
    }
}

function checkNextSymbol(matrix,x,y) {
    if (matrix[x+1][y] && isNumber(matrix[x+1][y])) {
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
                // concatenate found number to numString
                num['numString']= num['numString']+ char
                // find out if current number under investigation has an adjacent symbol
                const hasAdjacentSymbol = checkForAdjacentSymbol(matrix,x,y)
                // set is_valid to true if it was not true yet && if an adjacent symbol was found
                if(!num['is_valid'] && hasAdjacentSymbol) {
                    num['is_valid'] = true
                }
                // if next symbol is not a number, add num to array and rest it
                const isNextSymbolNumber = checkNextSymbol(matrix,x,y)
                if (!isNextSymbolNumber) {
                    validNumberObjects.push(num)
                    num = { 'numString': '', 'is_valid': false }
                }
            }

        })
    });
    
    return []
}
 

function main() {
    const input = fs.readFileSync('test_input.txt', 'utf8').trimEnd();
    const matrix = createMatrix(input)

    const validNumbers = findValidNumbers(matrix)
    const sum = sum(validNumbers)
    console.log(sum)
}


main()