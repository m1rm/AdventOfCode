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
    return nodes
}

function walkPath(nodes, instructions, startNode = 'AAA', puzzle = 1) {
    let nextNode = startNode
    let steps = 0
    for (let i = 0; i <= instructions.length; i++) {

        if (puzzle === 1 && nextNode === 'ZZZ') {
            return steps
        }

        if (puzzle === 2 && nextNode.endsWith('Z')) {
            return steps
        }          
        // reset i to keep looping over instructions if 
        // 'ZZt' was not yet reached
        if (i === instructions.length) {
            i = 0
        }

        nodeVal = nodes.get(nextNode)
        tmp = nodeVal[instructions[i]]
        steps +=1
        nextNode = tmp    
    }
}


function findStarts(nodes) {
    ret = []
    for (const key of nodes.keys()) {
        const res = key.endsWith('A')
        if (res) ret.push(key);
    }
    // console.log(ret)
    return ret

}

function walkPathsSeparately(nodes, instructions) {
    const startNodes = findStarts(nodes)
    let steps = []
    startNodes.forEach(node => {
        tmp = walkPath(nodes, instructions, node, 2)
        steps.push(tmp)
    });
    return steps
}

function calculateLCM(...arr) {
    const gcd2 = (a, b) => {
       // Greatest common divisor of 2 integers
       if(!b) return b===0 ? a : NaN;
          return gcd2(b, a%b);
    };
    const lcm2 = (a, b) => {
       // Least common multiple of 2 integers
       return a * b / gcd2(a, b);
    }
    // Least common multiple of a list of integers
    let n = 1;
    for(let i = 0; i < arr.length; ++i){
       n = lcm2(arr[i], n);
    }
    return n;
 };


// simple to read but would take ~120d to complete (1 Core, 40GB RAM)
function walkPathsNaive(nodes, instructions) {
   // use findStarts to get them printed and then use them
    let nextNode1 = 'DVA'
    let nextNode2 = 'JQA'
    let nextNode3 = 'PTA'
    let nextNode4 = 'CRA'
    let nextNode5 = 'AAA'
    let nextNode6 = 'BGA'

    let visitedNodes1 = ''
    let visitedNodes2 = ''
    let visitedNodes3 = ''
    let visitedNodes4 = ''
    let visitedNodes5 = ''
    let visitedNodes6 = ''

    let steps = 0

    for (let i = 0; i <= instructions.length; i++) {
        if (visitedNodes1.endsWith('Z') &&
            visitedNodes2.endsWith('Z') &&
            visitedNodes3.endsWith('Z') &&
            visitedNodes4.endsWith('Z') &&
            visitedNodes5.endsWith('Z') &&
            visitedNodes6.endsWith('Z')) {
            return steps
        }         
        // reset i to keep looping over instructions if 
        // 'ZZZ' was not yet reached at every path
        if (i === instructions.length) {
            i = 0
        }

        nodeVal1 = nodes.get(nextNode1)
        nodeVal2 = nodes.get(nextNode2)
        nodeVal3 = nodes.get(nextNode3)
        nodeVal4 = nodes.get(nextNode4)
        nodeVal5 = nodes.get(nextNode5)
        nodeVal6 = nodes.get(nextNode6)

        tmp1 = nodeVal1[instructions[i]]
        tmp2 = nodeVal2[instructions[i]]
        tmp3 = nodeVal3[instructions[i]]
        tmp4 = nodeVal4[instructions[i]]
        tmp5 = nodeVal5[instructions[i]]
        tmp6 = nodeVal6[instructions[i]]

        nextNode1 = tmp1
        visitedNodes1 = tmp1
        nextNode2 = tmp2
        visitedNodes2 = tmp2  
        nextNode3 = tmp3 
        visitedNodes3 = tmp3  
        nextNode4 = tmp4
        visitedNodes4 = tmp4   
        nextNode5 = tmp5
        visitedNodes5 = tmp5 
        nextNode6 = tmp6  
        visitedNodes6 = tmp6 

        steps +=1
        if(steps%1000000 === 0) {
            console.log(steps)
        }
    }
}

function main() {
    const input = fs.readFileSync('challenge_input.txt', 'utf8').trimEnd();

    const lines = input.split("\n").filter(element => element);

    const instructionString = lines[0]
    const instructions = instructionString.split('')
    const nodeDefinitions = lines.splice(1,)

    const nodes = parseNodes(nodeDefinitions)

    // cotst steps = walkPath(nodes, instructions)
    // console.log('Part 1: ', steps)

    // findStarts(nodes)

    // const steps2 = walkPathsNaive(nodes, instructions)
    const steps2 = walkPathsSeparately = walkPathsSeparately(nodes, instructions)
    // console.log(steps2)
    const lcm = calculateLCM(11309, 19199, 12361, 16043, 13939, 18673)
    console.log('Part 2: ', lcm) 
    
}


main()