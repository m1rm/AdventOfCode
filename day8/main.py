import math

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

# exemplary input
#      0  1  2  3  4
#  0 [[3, 0, 3, 7, 3],
#  1 [2, 5, 5, 1, 2],
#  2 [6, 5, 3, 3, 2],
#  3 [3, 3, 5, 4, 9],
#  4 [3, 5, 3, 9, 0]]
def calcNumOfVisibleInnerTrees(input):
    sumInnerTrees = 0
    lenRow = 0
    for rowIndex, row in enumerate(input):
        lenRow = len(row)
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
                    upperRows = input[:rowIndex]
                    lowerRows = input[rowIndex+1:]
                    #print(leftInRow)
                    #print(rightInRow)
                    #print('upper rows: ')
                    #print(upperRows)
                    #print('lower rows: ')
                    #print(lowerRows)

                    if (value > max(leftInRow) or value > max(rightInRow)):
                        sumInnerTrees += 1
                    else:
                        tmp = []
                        tmp2 = []
                        for row in upperRows:
                            tmp.append(row[colIndex])
                        for row in lowerRows:
                            tmp2.append(row[colIndex])

                        if (value > max(tmp) or value > max(tmp2)):
                            sumInnerTrees += 1
    return sumInnerTrees, lenRow


def main():
    input = readInput('exemplary_input.txt')
    scenicScoreArrays = []
    for rowIndex, row in enumerate(input):
        if (rowIndex == 0 or rowIndex+1 == len(input)):
            continue #bc. outer rows might not count
        else:
            for colIndex, value in enumerate(row):
                if(colIndex == 0 or colIndex+1 == len(row)):
                    continue #bc. outer cols might not count
                else:
                    print('current tree under investigation: ', value)
                    currentTreeScenicScoreValues = []
                    # make ranges for left, right, upper and lower
                    # neighbours and check if max of value is highest
                    # as soon as it is highest for one direction of neighbour
                    # add one to the sum of visible trees from outside the grid

                    # left is all lower col indices and equal row index
                    # right is vice versa left
                    # up is all lower row indices and equal col index
                    # down is vice versa
                    rawLeftInRow = input[rowIndex][:colIndex]
                    leftInRow = rawLeftInRow[::-1] # reverse left in row since we look from the tree
                    rightInRow = input[rowIndex][colIndex+1:]
                    rawUpperRows = input[:rowIndex]
                    upperRows = rawUpperRows[::-1] # reverse upper row since we look from the tree
                    lowerRows = input[rowIndex+1:]

                    # value == current tree under investigation
                    # row wise
                    for index,tree in enumerate(leftInRow):
                        print('left in row ', tree)
                        if value > tree:
                            continue
                        elif value <= tree:
                            currentTreeScenicScoreValues.append(index+1)
                            break
                        
                    print(currentTreeScenicScoreValues)
                    for index,tree in enumerate(rightInRow):
                        print('right in row ', tree)
                        if value > tree:
                            continue
                        elif value <= tree:
                            currentTreeScenicScoreValues.append(index+1)
                            break
                    print(currentTreeScenicScoreValues)
                    # column wise
                    for index, row in enumerate(upperRows):
                        print('upper ', tree)
                        if value > row[colIndex]:
                            continue
                        elif value <= row[colIndex]:
                            currentTreeScenicScoreValues.append(index+1)
                            break
                    print(currentTreeScenicScoreValues)

                    for index,row in enumerate(lowerRows):
                        print('lower ', tree)
                        if value > row[colIndex]:
                            continue
                        elif value <= row[colIndex]:
                            currentTreeScenicScoreValues.append(index+1)
                            break
                    print(currentTreeScenicScoreValues)

                    scenicScoreArrays.append(currentTreeScenicScoreValues)


    scenicScores = []
    for scoreList in scenicScoreArrays:
        print(scoreList)
        product = math.prod(scoreList)
        scenicScores.append(product)

    print(max(scenicScores))




    #sumInnerTrees, lenRow = calcNumOfVisibleInnerTrees(input)
    #sumTrees = sumInnerTrees + len(input) + len(input) + lenRow + lenRow - 4
    #print(sumTrees, sumInnerTrees)


if __name__ == "__main__":
    main()
