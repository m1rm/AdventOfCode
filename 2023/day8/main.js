const fs = require('fs')

function parseNodes(nodeDefinitions) {
    let nodes = new Map()
    for (nodeDefinition of nodeDefinitions) {
        const splitDefinition = nodeDefinition.split('=').map(function(item) {
            return item.trim();
        });
        const adjacentNodes = splitDefinition[1].split(',').map(function(item) {
            return item.trim().replace('(', '').replace(')', '');
        });
        nodes.set(splitDefinition[0], {'L': adjacentNodes[0], 'R': adjacentNodes[1]})
    }
    // console.log(nodes)
    return nodes
}

function walkPath(nodes, instructions) {
    // console.log(instructions)
    // console.log(nodes)
    let nextNode = 'AAA'
    let steps = 0
    for (let i = 0; i <= instructions.length; i++) {
        if (nextNode === 'ZZZ') {
            return steps
        }         
        // reset i to keep looping over instructions if 
        // 'ZZZ' was not yet reached
        if (i === instructions.length) {
            i = 0
        } 

        nodeVal = nodes.get(nextNode)
        tmp = nodeVal[instructions[i]]
        steps +=1
        nextNode = tmp    
    }
}

function main() {
    const input = fs.readFileSync('challenge_input.txt', 'utf8').trimEnd();

    const lines = input.split("\n").filter(element => element);

    const instructionString = lines[0]
    const instructions = instructionString.split('')
    const nodeDefinitions = lines.splice(1,)

    const nodes = parseNodes(nodeDefinitions)
    // console.log(nodes)

    const steps = walkPath(nodes, instructions)
    console.log(steps)

    
    
}


main()