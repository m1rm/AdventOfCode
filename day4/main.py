def readInput():
    with open('challenge_input.txt') as f:
        return f.readlines()

def isFullyOverlapping(splitPair1, splitPair2):
    if int(splitPair1[0]) >= int(splitPair2[0]) and int(splitPair1[1]) <= int(splitPair2[1]) or int(splitPair1[0]) <= int(splitPair2[0]) and int(splitPair1[1]) >= int(splitPair2[1]):
        return True
    else:
        return False

def isPartlyOverlapping(splitPair1, splitPair2):
    start1 = int(splitPair1[0])
    end1 = int(splitPair1[1])
    start2 = int(splitPair2[0])
    end2 = int(splitPair2[1])

    if isFullyOverlapping(splitPair1, splitPair2):
        return True
    else:
        if (start1 < start2 and end1 < end2 and start2 < end1) or (start2 < start1 and start1 < end2 and end2 < end1) or (start2 < start1 and end2 < end1 and start1 < end2) or (start1 < start2 and start2 < end1 and end1 < end2):
            return True
        else:
            return False

def main():
    # Part One
    input = readInput()
    fullyScore = 0
    partlyScore = 0
    # '31-69,35-55\n'
    for pairs in input:
        pairs = pairs.strip()
        splitPairs = pairs.split(',')
        splitPair1 = splitPairs[0].split('-')
        splitPair2 = splitPairs[1].split('-')

        fullyOverlapping = isFullyOverlapping(splitPair1, splitPair2)
        partlyOverlapping = isPartlyOverlapping(splitPair1, splitPair2)

        if fullyOverlapping:
            fullyScore += 1

        if partlyOverlapping:
            partlyScore += 1


    print('Pairs fully overlapping: ', fullyScore)
    print('Pairs partly overlapping: ', partlyScore)

if __name__ == "__main__":
    main()
