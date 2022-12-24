# challenge: sum of indices of pairs that are already in right order in input
import ast

def readInput(file):
    with open(file) as f:
        for line in f.readlines():
            line = line.strip()
            if line != '':
                yield line

def convertStringInputToLiteralInput(input):
    output = []
    for line in input:
        line = line.strip()
        output.append(line)
    inputPairs = split(output, 2)
    output_pairs = []
    for pair in inputPairs:
        p1 = ast.literal_eval(pair[0])
        p2 = ast.literal_eval(pair[1])
        output_pairs.append([p1, p2])
    return output_pairs

def split(inputList, chunkSize):
    for i in range(0, len(inputList), chunkSize):
        yield inputList[i:i+chunkSize]

def compare_integers(x, y):
    if x == y:
        return True, False # condition met and loop breaker
    if x < y:
        return True, True
    elif x > y:
        return False, True

def compare_list(l1, l2):
    for x, y in zip(l1, l2):
        if type(x) == "int" and type(y) == "int":
            correctly_ordered, break_loop = compare_integers(x, y)
        elif type(x) == "list" and type(y) == "list":
            correctly_ordered, break_loop = compare_list(x, y)

# If both values are integers, the lower integer should come first -> right order: x < y
# If both values are lists, compare the lists element wise -> right order: x < y
# If exactly one value is an integer, convert the integer to a list which contains that integer as its only value, then retry the comparison
# The side that runs out of items first "loses" -> right order: x runs out of items first
def main():
    raw_input = readInput('exemplary_input.txt')
    input_pairs = convertStringInputToLiteralInput(raw_input)
    correctly_ordered_pairs = []
    for index,pair in enumerate(input_pairs):
        for x, y in zip(pair[0], pair[1]):
            if isinstance(x, int) and isinstance(y, int):
                correctly_ordered, break_loop = compare_integers(x, y)
            elif isinstance(x, list)and isinstance(y, list):
                correctly_ordered, break_loop = compare_list(x, y)
            elif isinstance(x, int) and isinstance(y, list):
                list_x = [x]
                correctly_ordered, break_loop = compare_list(list_x, y)
            elif isinstance(x, list) and isinstance(y, int):
                list_y = [y]
                correctly_ordered, break_loop = compare_list(x, list_y)
            else:
                print("unexpected input detected for pair at index: ", index)
                correctly_ordered = False
                break_loop = True

            if break_loop:
                if correctly_ordered:
                    correctly_ordered_pairs.append(index+1)
                    break
                else:
                    break
    print(sum(correctly_ordered_pairs))



if __name__ == "__main__":
    main()
