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
    print(elvesCaloriesFlat)
    totalCaloriesPerElv = aggregateCaloriesPerElv(elvesCaloriesFlat)
    print(totalCaloriesPerElv)
    #maximum = max(totalCaloriesPerElve)

if __name__ == "__main__":
    main()
