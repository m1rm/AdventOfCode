# challenge: sum of indices of pairs that are already in right order in input
import ast

def readInput(file):
    with open(file) as f:
        for line in f.readlines():
            line = line.strip()
            if line != '':
                yield line

def convertStringInputToLiteralInput(input):
    output = []
    for line in input:
        line = line.strip()
        output.append(line)
    return output

def split(inputList, chunkSize):
    for i in range(0, len(inputList), chunkSize):
        yield inputList[i:i+chunkSize]

def main():
    rawInput = readInput('exemplary_input.txt')
    input = convertStringInputToLiteralInput(rawInput)
    inputPairs = split(input, 2)
    for pair in inputPairs:
        print(pair)

            # loop and compare i and i+1 and skip every even i (if loop starts at 1)


if __name__ == "__main__":
    main()
