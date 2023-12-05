const fs = require('fs')
const readline = require('readline')

const charCodeZero = "0".charCodeAt()
const charCodeNine = "9".charCodeAt()

let numsAtIndices = {} // for the second part

const numberWords = {
    'one' : 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
}

function findNumWord(line) {
    for (numWord in numberWords) {
        const re = new RegExp(numWord, 'gi')
        while (re.exec(line)) {
            let obj = {}
            obj[re.lastIndex-numWord.length] = numberWords[numWord]
            if (numsAtIndices.hasOwnProperty(line)){
                numsAtIndices[line].push(obj)
            } else {
                numsAtIndices[line] = [obj]
            }
        }
    }
}

function findNumber(line) {
    const inversedLine = line.split("").reverse().join("")
    let firstNumber;
    let lastNumber;

    for (letter of line) {
        if (isDigitCode(letter.charCodeAt())) {
            const letterIndex = line.indexOf(letter)
            firstNumber = parseInt(letter)
            let obj = {}
            obj[letterIndex] = firstNumber
            if (numsAtIndices.hasOwnProperty(line)) {
                numsAtIndices[line].push(obj)
            } else {
                numsAtIndices[line] = [obj]
            }
            break
        }
    }

    for (letter of inversedLine) {
        if (isDigitCode(letter.charCodeAt())) {
            const inversedLetterIndex = inversedLine.indexOf(letter)
            const letterIndex = inversedLine.length - inversedLetterIndex - 1 //bc. we start at 0
            lastNumber = parseInt(letter)
            let obj = {}
            obj[letterIndex] = lastNumber
            if (numsAtIndices.hasOwnProperty(line)) {
                numsAtIndices[line].push(obj)
            } else {
                numsAtIndices[line] = [obj]
            }
            break
        }
    }

    return parseInt(`${firstNumber}${lastNumber}`) // for the first part
}

function isDigitCode(n) {
    return(n >= charCodeZero && n <= charCodeNine);
}

function findMinMax(arrayOfObjects) {
    let minKey
    let minValue
    let maxKey
    let maxValue
    arrayOfObjects.forEach(function (obj) {
        for ([key, value] of Object.entries(obj)) {
            key = parseInt(key)
            value = parseInt(value)
            if ((minKey !== undefined && minKey > key) || minKey === undefined) {
                console.log(minKey,'>',key,'TRUTHY')
                minKey = key
                minValue = value
            }
            if ((maxKey !== undefined && maxKey < key) || maxKey === undefined) {
                maxKey = key
                maxValue = value
            }
        }
    })

    console.log(arrayOfObjects)
    console.log(`${minValue}${maxValue}`)
    return parseInt(`${minValue}${maxValue}`)
}

//@see https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
async function processLineByLine() {

    let numbers = [] // for the first part
    const fileStream = fs.createReadStream('test_input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        findNumWord(line) // for the second part
        const lineNumber = findNumber(line)
        numbers.push(lineNumber)
    }

    let numbers2 = []
    for (const value of Object.values(numsAtIndices)) {
        concatenatedNum = findMinMax(value)
        numbers2.push(concatenatedNum)
    }

    const sum2 = numbers2.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      },0);

    console.log('Sum 2: ', sum2 )

    // first part
    const sum = numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      },0);
    console.log('Sum 1: ', sum)
}

processLineByLine();
