def readInput(filename):
    tmp = []
    with open(filename) as f:
        for line in f.readlines():
            tmpLine = []
            line = line.strip()
            if line != '':
                for letter in line:
                    tmpLine.append(int(letter))
            tmp.append(tmpLine)
    return tmp

def main():
    input = readInput('exemplary_input.txt')
    #      0  1  2  3  4
    #  0 [[3, 0, 3, 7, 3],
    #  1 [2, 5, 5, 1, 2],
    #  2 [6, 5, 3, 3, 2],
    #  3 [3, 3, 5, 4, 9],
    #  4 [3, 5, 3, 9, 0]]

    sumTrees = 0
    for rowIndex, row in enumerate(input):
        print(row)
        if (rowIndex == 0 or rowIndex+1 == len(input)):
            continue #bc. outer rows are always visible
        else:
            for colIndex, value in enumerate(row):
                if(colIndex == 0 or colIndex+1 == len(row)):
                    continue #bc. outer cols are always visible
                else:
                    # make ranges for left, right, upper and lower
                    # neighbours and check if max of value is highest
                    # as soon as it is highest for one direction of neighbour
                    # add one to the sum of visible trees from outside the grid

                    # left is all lower col indices and equal row index
                    # right is vice versa left
                    # up is all lower row indices and equal col index
                    # down is vice versa
                    leftInRow = input[rowIndex][:colIndex]
                    rightInRow = input[rowIndex][colIndex+1:]
                    upperRows = input[:rowIndex-1]
                    lowerRows = input[rowIndex+1:]
                    print(leftInRow)
                    print(rightInRow)
                    print(upperRows)
                    print(lowerRows)

                    if (value > max(leftInRow) or value > max(rightInRow)):
                        print('Item at: ', rowIndex ,'|', colIndex, 'is visible due to row check')
                        sumTrees += 1
                    else:
                        tmp = []
                        for row in upperRows:
                            tmp.append(row[colIndex])
                        if (value > max(tmp)):
                            sumTress += 1
                        else:
                            tmp = []
                            for row in lowerRows:
                                tmp.append(row[colIndex])
                                if (value > max(tmp)):
                                    sumTress += 1


    print(sumTrees)
if __name__ == "__main__":
    main()
