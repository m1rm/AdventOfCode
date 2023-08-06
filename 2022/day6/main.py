def readInput():
    with open('challenge_input.txt') as f:
        return f.readlines()

def findUniqueSequence(input, targetSequenceLength):
    for line in input:
        for i in range(1, len(line)):
            uniqueSequenceSet = set(line[i:i+targetSequenceLength])
            if(len(uniqueSequenceSet) == targetSequenceLength):
                return (i+targetSequenceLength)
    return 0

def main():
    input = readInput()
    partOne = findUniqueSequence(input, 4)
    partTwo = findUniqueSequence(input, 14)
    print(partOne, partTwo)


if __name__ == "__main__":
    main()
