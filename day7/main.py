import copy

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
def isDirectoryReplacementIncomplete(directories):
    if (any(isinstance(x, str) for directory in directories.values() for x in directory)):
        return True
    else:
        return False

# at each step in this challenge, we will have a maximum nesting of one
def flattenList(nestedList):
    tmp = []
    for entry in nestedList:
        if (type(entry) == list):
            for item in entry:
                tmp.append(item)
        else:
            tmp.append(entry)
    return tmp


def main():
    input = readInput('challenge_input.txt')
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

# print(directories) # {'/': ['a', 14848514, 8504156, 'd'], 'a': ['e', 29116, 2557, 62596], 'e': [584], 'd': [4060174, 8033020, 5626152, 7214296]}
    directoriesClone = copy.deepcopy(directories)

    while (True):
        for key, directory in directories.items():
            for entry in directory:
                if (entry in directories.keys()):
                    # if current entry is a key, replace it with with original entries value at that key
                    entryIndex = directory.index(entry)
                    directory[entryIndex] = directoriesClone[entry]

        # flatten dict values
        for key, directory in directories.items():
            directories[key] = flattenList(directory)
        # check if all strings in values == nested dirs have been resolved
        keepLooping = (isDirectoryReplacementIncomplete(directories))
        if not keepLooping:
            break

    total = 0
    for directory in directories.values():
        if (sum(directory) <= 100000):
            total += sum(directory)
    print(total)

if __name__ == "__main__":
    main()
