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
    inputPairs = split(output, 2)
    for pair in inputPairs:
        pair[0] = ast.literal_eval(pair[0])
        pair[1] = ast.literal_eval(pair[1])
        print(pair)
    return inputPairs

def split(inputList, chunkSize):
    for i in range(0, len(inputList), chunkSize):
        yield inputList[i:i+chunkSize]

def main():
    raw_input = readInput('exemplary_input.txt')
    input_pairs = convertStringInputToLiteralInput(raw_input)
    for pair in input_pairs:
        print(pair)

if __name__ == "__main__":
    main()
