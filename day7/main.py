def readInput(filename):
    with open(filename) as f:
        return f.readlines()

def isInteger(string):
    string = string.strip()
    try:
        int(string)
        return True
    except ValueError:
        return False

def main():
    input = readInput('exemplary_input.txt')
    directories = {}
    fileSizesSum = 0
    tmpIndex = 0
    for index,line in enumerate(input):
        lineContent = line.split(' ')
        if (lineContent[1].strip() == 'ls'):
            tmpIndex = index
            directories[tmpIndex] = []
        if (isInteger(lineContent[0])):
            directories[tmpIndex].append(int(lineContent[0]))

    for directoryList in directories.values():
        if(sum(directoryList) <= 100000):
            print(sum(directoryList))
            fileSizesSum += sum(directoryList)

    print(fileSizesSum)



    # Todo: if an ls occours, make directory_sum first and check that one against condition


if __name__ == "__main__":
    main()
