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

def isDirectory(string):
    string = string.strip()
    if (string == 'dir'):
        return True
    else:
        return False

def main():
    input = readInput('exemplary_input.txt')
    directories = {}
    fileSizesSum = 0
    tmpIndex = ''
    for index,line in enumerate(input):
        line = line.strip()
        lineContent = line.split(' ')
        if (lineContent[1] == 'cd' and lineContent[2] != '..'):
            if(lineContent[2] not in directories):
                directories[lineContent[2]] = []
                tmpIndex = lineContent[2]
        if(lineContent[0] != '$'): # not a dollar = after ls
            if (isInteger(lineContent[0])):
                directories[tmpIndex].append(int(lineContent[0]))
            if (isDirectory(lineContent[0])):
                directories[tmpIndex].append(lineContent[1].strip())


    print(directories)



    # Todo: if an ls occours, make directory_sum first and check that one against condition


if __name__ == "__main__":
    main()
