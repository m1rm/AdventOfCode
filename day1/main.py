def readElvesList():
    with open('input.txt') as f:
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
    elvesCaloriesFlat = readElvesList()
    totalCaloriesPerElv = aggregateCaloriesPerElv(elvesCaloriesFlat)
    maximum = max(totalCaloriesPerElv)
    maximum_index = totalCaloriesPerElv.index(maximum)
    print('The elve at position ', maximum_index+1, 'is carring the most calories, a total of: ', maximum)

if __name__ == "__main__":
    main()
