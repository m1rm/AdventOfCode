def readInput():
    with open('challenge_input.txt') as f:
        return f.readlines()

def isFullyOverlapping(splitPair1, splitPair2):
    if int(splitPair1[0]) >= int(splitPair2[0]) and int(splitPair1[1]) <= int(splitPair2[1]) or int(splitPair1[0]) <= int(splitPair2[0]) and int(splitPair1[1]) >= int(splitPair2[1]):
        return True
    else:
        return False

def isPartlyOverlapping(splitPair1, splitPair2):
    set1 = set(range(int(splitPair1[0]),  int(splitPair1[1])+1))
    set2 = set(range(int(splitPair2[0]), int(splitPair2[1])+1))
    intersection = set1.intersection(set2)

    if (intersection):
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
