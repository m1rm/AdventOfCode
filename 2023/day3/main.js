const fs = require('fs')

const charCodeZero = "0".charCodeAt()
const charCodeNine = "9".charCodeAt()

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
    return(n >= charCodeZero && n <= charCodeNine);
}

function findValidNumbers(matrix) {
    
    validNumberObjects = []
    matrix.forEach(function (line, y) 
    {
        let num = { numString: '', is_valid: false }

        line.forEach(function(char, x)
        {
            if (isNumber(char)) {
                // concatenate found number to numString
                num[numString]= num[numString]+ char
                // find out if current number under investigation has an adjacent symbol
                const hasAdjacentSymbol = findAdjacentSymbol(x,y)
                // set is_valid to true if it was not true yet && if an adjacent symbol was found
                if(!num[is_valid] && hasAdjacentSymbol) {
                    num[is_valid] = true
                }
                // if next symbol is not a number, add num to array and rest it
                const isNextSymbolNumber = checkNextSymbol(x,y)
                if (!isNextSymbolNumber) {
                    validNumberObjects.push(num)
                    num = { numString: '', is_valid: false }
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