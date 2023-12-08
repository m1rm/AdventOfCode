const fs = require('fs')

function parseNodes(nodeDefinitions) {
    let nodes = []
    for (nodeDefinition of nodeDefinitions) {
        const splitDefinition = nodeDefinition.split('=').map(function(item) {
            return item.trim();
        });
        const adjacentNodes = splitDefinition[1].split(',').map(function(item) {
            return item.trim().replace('(', '').replace(')', '');
        });
        nodes[splitDefinition[0]] = {'L': adjacentNodes[0], 'R': adjacentNodes[1]}
    }
    console.log(nodes)
}

function main() {
    const input = fs.readFileSync('test_input.txt', 'utf8').trimEnd();

    const lines = input.split("\n").filter(element => element);
    const instructions = lines[0]
    const nodeDefinitions = lines.splice(1,)
    parseNodes(nodeDefinitions)


    // console.log(instructions, nodeDefinitions)
}


main()