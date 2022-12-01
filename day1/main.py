def readElvesList():
    # todo: read input txt into array of arrays
    with open('input.txt') as f:
        return f.readlines()

#aggregateCaloriesPerElv(elvesCaloriesFlat):
    # todo: add up inner arrays

def main():
    elvesCaloriesFlat = readElvesList()
    print(elvesCaloriesFlat)
    #totalCaloriesPerElve = aggregateCaloriesPerElv()
    #maximum = max(totalCaloriesPerElve)

if __name__ == "__main__":
    main()
