readElvesList():
    # todo: read input txt into array of arrays

aggregateCaloriesPerElv(elvesCaloriesFlat):
    # todo: add up inner arrays

main():
    elvesCaloriesFlat = readElvesList()
    totalCaloriesPerElve = aggregateCaloriesPerElv()
    maximum = max(totalCaloriesPerElve)

if __name__ == "__main__":
    main()
