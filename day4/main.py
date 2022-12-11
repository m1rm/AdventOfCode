def readInput():
    with open('challenge_input.txt') as f:
        return f.readlines()

def main():
    # Part One
    input = readInput()
    score = 0
    # '31-69,35-55\n'
    for pairs in input:
        pairs = pairs.strip()
        splitPairs = pairs.split(',')
        splitPair1 = splitPairs[0].split('-')
        splitPair2 = splitPairs[1].split('-')
        if ((splitPair1[0] >= splitPair2[0] and splitPair1[1] <= splitPair2[1]) or (splitPair1[0] <= splitPair2[0] and splitPair1[1] >= splitPair2[1])):
            score = score +1


    print(score)

if __name__ == "__main__":
    main()
