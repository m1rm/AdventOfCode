def readInput():
    with open('challenge_input.txt') as f:
        return f.readlines()

def moveOneByOne(crateStacks):
    for instruction in input:
        instruction = instruction.strip()
        splitInstructions = instruction.split(' ')
        # index 1 = num to move
        # index 3 = pile to move from -> pop out of list
        # index 5 = pile to move to -> push to list
        for i in range(1, int(splitInstructions[1])+1):
            toMove = crateStacks[int(splitInstructions[3])-1].pop()
            crateStacks[int(splitInstructions[5])-1].append(toMove)

    for crate in crateStacks:
        print(crate[-1])

def main():
    # Part One
    input = readInput()
    crateStacks = [
        ['G', 'T', 'R', 'W'],
        ['G', 'C', 'H', 'P', 'M', 'S', 'V', 'W'],
        ['C', 'L', 'T', 'S', 'G', 'M'],
        ['J', 'H', 'D', 'M', 'W', 'R', 'F'],
        ['P', 'Q', 'L', 'H', 'S', 'W', 'F', 'J'],
        ['P', 'J', 'D', 'N', 'F', 'M', 'S'],
        ['Z', 'B', 'D', 'F', 'G', 'C', 'S', 'J'],
        ['R', 'T', 'B'],
        ['H', 'N', 'W', 'L', 'C']
    ]

    for instruction in input:
        tmp = []
        instruction = instruction.strip()
        splitInstructions = instruction.split(' ')
        for i in range(1, int(splitInstructions[1])+1):
            toMove = crateStacks[int(splitInstructions[3])-1].pop()
            tmp.insert(0, toMove)
        crateStacks[int(splitInstructions[5])-1].extend(tmp)

    for stack in crateStacks:
        print(stack[-1])
if __name__ == "__main__":
    main()
