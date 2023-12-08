const fs = require('fs')

// nice but not useful
function createMatrix(input) {
    let matrix = []
    const lines = input.split("\n")
    for (line of lines) {
        const splitLine = line.split("")
        matrix.push(splitLine)
    }

    return matrix
}
 

function main() {
    const input = fs.readFileSync('test_input.txt', 'utf8').trimEnd();
    const matrix = createMatrix(input)
    console.log(matrix)
    console.log(input)
}


main()