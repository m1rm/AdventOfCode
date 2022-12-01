def readElvesList():
    with open('challenge_input.txt') as f:
        return f.readlines()

def aggregateCaloriesPerElv(elvesCaloriesFlat):
    tmp = 0
    aggregate = []
    for item in elvesCaloriesFlat:
        if item != "\n":
            num = int(item.strip())
            tmp += num
        else:
            aggregate.append(tmp)
            tmp = 0
    aggregate.append(tmp)
    return aggregate

def main():
    # Part One
    elvesCaloriesFlat = readElvesList()
    totalCaloriesPerElv = aggregateCaloriesPerElv(elvesCaloriesFlat)
    maximum = max(totalCaloriesPerElv)
    maximum_index = totalCaloriesPerElv.index(maximum)
    print('The elve at position ', maximum_index+1, 'is carring the most calories, a total of: ', maximum)

    # Part Two
    sortedCalories = sorted(totalCaloriesPerElv)
    maxThree = sortedCalories[-3:]
    print('The elves with the three highest calories amounts carried are carrying in total: ', sum(maxThree))

if __name__ == "__main__":
    main()
