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

# return False if any directory still contains a string == a nested dir key instead of the nested dirs values
def isDirectoryReplacementComplete(directories):
    if (any(isinstance(x, str) for directory in directories for x in directory)):
        return False
    else:
        return True


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

# {'/': [14848514, 8504156], 'a': [29116, 2557, 62596], 'e': [584], 'd': [4060174, 8033020, 5626152, 7214296]}
    print(directories)
    print(isDirectoryReplacementComplete(directories))

if __name__ == "__main__":
    main()
